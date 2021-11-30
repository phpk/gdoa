import { Store } from 'le5le-store';

import { Pen, PenType } from './models/pen';
import { Node } from './models/node';
import { Line } from './models/line';
import { Options } from './options';
import { Layer } from './layer';
import { s8 } from './utils/uuid';
import { find } from './utils/canvas';

declare const window: any;

export class AnimateLayer extends Layer {
  pens = new Map();

  private timer: any;
  private lastNow = 0;
  private subscribeUpdate: any;
  private subscribePlay: any;
  constructor(public options: Options = {}, TID: string) {
    super(TID);
    Store.set(this.generateStoreKey('LT:AnimateLayer'), this);

    if (!this.options.animateColor) {
      this.options.animateColor = '#ff6600';
    }

    this.subscribeUpdate = Store.subscribe(this.generateStoreKey('LT:updateLines'), (lines: Line[]) => {
      this.updateLines(lines);
    });
    this.subscribePlay = Store.subscribe(
      this.generateStoreKey('LT:AnimatePlay'),
      (params: { stop?: boolean; tag?: string; pen?: Pen; }) => {
        if (params.stop) {
          if (params.tag) {
            const pens = find(params.tag, this.data.pens);
            pens.forEach((item) => {
              if (this.pens.has(item.id)) {
                this.pens.get(item.id).animateStart = 0;
              }
            });
          }

          if (params.pen && this.pens.has(params.pen.id)) {
            this.pens.get(params.pen.id).animateStart = 0;
          }
        } else {
          if (params.pen) {
            if (this.pens.has(params.pen.id)) {
              this.pens.get(params.pen.id).animateStart = Date.now();
            } else {
              if (params.pen.type) {
                this.pens.set(params.pen.id, this.getAnimateLine(params.pen));
              } else {
                this.pens.set(params.pen.id, params.pen);
              }
            }
          }
          if (params.tag) {
            this.readyPlay(params.tag, false);
          }
        }

        this.animate();
      }
    );
  }

  getAnimateLine(item: Pen) {
    const l = new Line(item);
    l.data = l.id;
    l.id = s8();
    l.setTID(this.TID);
    l.isAnimate = true;
    l.toArrow = '';
    if (l.fromArrow && l.fromArrow.indexOf('line') < 0) {
      l.animateFromSize = l.fromArrowSize + l.lineWidth * 5;
    }
    if (l.toArrow && l.toArrow.indexOf('line') < 0) {
      l.animateToSize = l.toArrowSize + l.lineWidth * 5;
    }
    l.animateStart = item.animateStart;
    l.lineCap = 'round';
    l.fillStyle = '#fff';
    l.strokeStyle = l.animateColor || this.options.animateColor;
    l.length = l.getLen();
    if (!l.fromArrowColor) {
      l.fromArrowColor = l.strokeStyle || Store.get(this.generateStoreKey('LT:color'));
    }
    if (!l.toArrowColor) {
      l.toArrowColor = l.strokeStyle || Store.get(this.generateStoreKey('LT:color'));
    }

    return l;
  }

  findLine(pen: Pen) {
    for (const item of this.data.pens) {
      if (item.id === pen.data) {
        return item;
      }
    }
  }

  readyPlay(tag?: string, auto?: boolean, pens?: Pen[]) {
    const readyPens = new Map();
    if (!pens) {
      pens = this.data.pens;
    }

    pens.forEach((pen: Pen) => {
      pen.setTID(this.TID);
      if (!pen.visible || readyPens.get(pen.id)) {
        return;
      }

      if ((auto && pen.animatePlay) || (tag && pen.tags.indexOf(tag) > -1)) {
        if (!pen.animateStart || pen.animateStart < 1) {
          pen.animateStart = Date.now();
        }
      }

      if (pen instanceof Node) {
        if (pen.animateStart > 0) {
          if (!pen.animateReady) {
            pen.initAnimate();
          }

          readyPens.set(pen.id, pen);
        }
        if (pen.children && pen.children.length) {
          this.readyPlay(tag, auto, pen.children);
        }
      } else {
        if (pen.animateStart > 0) {
          readyPens.set(pen.id, this.getAnimateLine(pen));
        } else if (this.pens.has(pen.id)) {
          this.pens.get(pen.id).animateStart = 0;
        }
      }
    });

    readyPens.forEach((pen: Pen) => {
      if (pen.type) {
        this.pens.set(pen.data, pen);
      } else {
        this.pens.set(pen.id, pen);
      }
    });
  }

  animate() {
    if (this.timer) {
      cancelAnimationFrame(this.timer);
    }

    this.timer = requestAnimationFrame(() => {
      const now = Date.now();
      if (now - this.lastNow < this.options.refresh) {
        this.animate();
        return;
      }
      this.lastNow = now;
      let animated = false;
      this.pens.forEach((pen: Pen) => {
        if (!pen.animateStart || pen.animateStart < 1) {
          if (pen.type) {
            this.pens.delete(pen.data);
            const line = this.findLine(pen);
            if (line) {
              line.animateStart = 0;
              (line as any).animatePos = (pen as any).animatePos;
            }
          } else {
            this.pens.delete(pen.id);
          }
          return;
        }

        if (pen.animateStart > now) {
          return;
        }

        if (pen.animateFn) {
          if (typeof pen.animateFn === 'function') {
            pen.animateFn();
          } else if (window && window[pen.animateFn]) {
            window[pen.animateFn]();
          } else {
            // pen.render();
          }
        } else {
          pen.animate(now);
        }
        if (pen.animateStart < 1) {
          if (pen.type) {
            this.pens.delete(pen.data);
          } else {
            this.pens.delete(pen.id);
          }
          if (pen.type === PenType.Line) {
            const line = this.findLine(pen);
            if (line) {
              line.animateStart = 0;
              (line as any).animatePos = (pen as any).animatePos;
            }
          }
          if (pen.nextAnimate) {
            this.readyPlay(pen.nextAnimate, false);
          }
        }
        animated = true;
      });

      if (animated) {
        Store.set(this.generateStoreKey('LT:render'), true);
        this.animate();
      }
    });
  }

  updateLines(lines: Line[]) {
    this.pens.forEach((line: Pen, key) => {
      if (!(line instanceof Line)) {
        return;
      }

      for (const item of lines) {
        if (line.data === item.id) {
          line.from = item.from;
          line.to = item.to;
          line.controlPoints = item.controlPoints;
          line.length = line.getLen();
        }
      }
    });
  }

  render(ctx: CanvasRenderingContext2D) {
    this.pens.forEach((line: Pen, key) => {
      if (line.visible && line instanceof Line) {
        if (!line.getTID()) {
          line.setTID(this.TID);
        }
        line.render(ctx);
      }
    });
  }

  stop() {
    this.pens.clear();
    if (this.timer) {
      cancelAnimationFrame(this.timer);
      this.timer = null;
    }
  }

  destroy() {
    this.stop();
    this.subscribeUpdate.unsubscribe();
    this.subscribePlay.unsubscribe();
  }
}
