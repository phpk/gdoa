import { Rect } from './models/rect';
import { Point } from './models/point';
import { Line } from './models/line';
import { Node } from './models/node';
import { Pen, PenType } from './models/pen';
import { Store } from 'le5le-store';
import { Options } from './options';
import { Lock } from './models/status';
import { Layer } from './layer';
import { rgba } from './utils/math';

export class HoverLayer extends Layer {
  line: Line;
  // for move line.
  initLine: Line;
  node: Node;
  hoverLineCP: Point;
  lasthoverLineCP: Point;
  // The dock of to point of line.
  dockAnchor: Point;

  hoverAnchorIndex = -1;

  dockLineX = 0;
  dockLineY = 0;

  root: Node;
  dragRect: Rect;
  constructor(public options: Options = {}, TID: string) {
    super(TID);
    Store.set(this.generateStoreKey('LT:HoverLayer'), this);
  }

  lineTo(to: Point, toArrow: string = 'triangleSolid') {
    if (!this.line || this.line.locked) {
      return;
    }
    this.line.setTo(to, toArrow);
    if (this.line.from.id || this.line.to.id) {
      this.line.calcControlPoints();
    }
    Store.set(this.generateStoreKey('pts-') + this.line.id, undefined);
    Store.set(this.generateStoreKey('LT:updateLines'), [this.line]);
  }

  lineFrom(from: Point) {
    if (this.line.locked) {
      return;
    }

    this.line.setFrom(from, this.line.fromArrow);
    if (this.line.from.id || this.line.to.id) {
      this.line.calcControlPoints();
    }
    Store.set(this.generateStoreKey('pts-') + this.line.id, undefined);
    Store.set(this.generateStoreKey('LT:updateLines'), [this.line]);
  }

  render(ctx: CanvasRenderingContext2D) {
    if (this.data.locked === Lock.NoEvent || this.options.hoverColor === 'transparent') {
      return;
    }

    ctx.fillStyle = this.options.hoverColor;

    ctx.save();
    // anchors
    if (this.options.alwaysAnchor) {
      this.data.pens.forEach((pen: Pen) => {
        if (pen.type === PenType.Line) {
          return;
        }

        if (pen.hideAnchor) {
          return;
        }

        for (const anchor of (pen as Node).rotatedAnchors) {
          if (anchor.hidden) {
            continue;
          }
          ctx.beginPath();
          ctx.arc(anchor.x, anchor.y, anchor.radius || this.options.anchorRadius, 0, Math.PI * 2);
          ctx.strokeStyle = anchor.strokeStyle || this.options.hoverColor;
          ctx.fillStyle = anchor.fillStyle || this.options.anchorFillStyle;
          ctx.fill();
          ctx.stroke();
        }

        if (this.options.autoAnchor) {
          ctx.beginPath();
          ctx.arc(
            (pen as Node).rect.center.x,
            (pen as Node).rect.center.y,
            (pen as Node).rect.center.radius || this.options.anchorRadius,
            0,
            Math.PI * 2
          );
          ctx.strokeStyle = this.options.hoverColor;
          ctx.fillStyle = this.options.anchorFillStyle;
          ctx.fill();
          ctx.stroke();
        }
      });
    }
    ctx.restore();

    if (this.node && !this.data.locked) {
      if (!this.node.getTID()) {
        this.node.setTID(this.TID);
      }
      this.root = this.getRoot(this.node) || this.node;
      if (this.root) {
        ctx.save();
        ctx.strokeStyle = this.options.dragColor;
        ctx.globalAlpha = 0.2;
        if (this.root.rotate) {
          ctx.translate(this.root.rect.center.x, this.root.rect.center.y);
          ctx.rotate(((this.root.rotate + this.root.offsetRotate) * Math.PI) / 180);
          ctx.translate(-this.root.rect.center.x, -this.root.rect.center.y);
        }
        ctx.beginPath();
        ctx.strokeRect(this.root.rect.x, this.root.rect.y, this.root.rect.width, this.root.rect.height);
        ctx.restore();
      }

      if (!this.options.hideAnchor) {
        for (let i = 0; i < this.node.rotatedAnchors.length; ++i) {
          if (
            this.node.locked ||
            this.node.hideAnchor ||
            (this.node.rotatedAnchors[i].hidden && this.hoverAnchorIndex !== i)
          ) {
            continue;
          }
          ctx.beginPath();
          ctx.arc(
            this.node.rotatedAnchors[i].x,
            this.node.rotatedAnchors[i].y,
            this.node.rotatedAnchors[i].radius || this.options.anchorRadius,
            0,
            Math.PI * 2
          );
          ctx.strokeStyle = this.node.rotatedAnchors[i].strokeStyle || this.options.hoverColor;
          ctx.fillStyle = this.node.rotatedAnchors[i].fillStyle || this.options.anchorFillStyle;
          ctx.fill();
          ctx.stroke();
        }
      }

      if (this.options.autoAnchor) {
        ctx.beginPath();
        ctx.arc(
          this.node.rect.center.x,
          this.node.rect.center.y,
          this.node.rect.center.radius || this.options.anchorRadius,
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = this.options.hoverColor;
        ctx.fillStyle = this.options.anchorFillStyle;
        ctx.fill();
        ctx.stroke();
      }
    }
    if (this.line && !this.data.locked) {

      this.root = this.getRoot(this.line);
      if (this.root) {
        ctx.save();
        ctx.strokeStyle = this.options.dragColor;
        ctx.globalAlpha = 0.2;
        if (this.root.rotate) {
          ctx.translate(this.root.rect.center.x, this.root.rect.center.y);
          ctx.rotate(((this.root.rotate + this.root.offsetRotate) * Math.PI) / 180);
          ctx.translate(-this.root.rect.center.x, -this.root.rect.center.y);
        }
        ctx.beginPath();
        ctx.strokeRect(this.root.rect.x, this.root.rect.y, this.root.rect.width, this.root.rect.height);
        ctx.restore();
      }
    }

    if (this.dockAnchor) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(
        this.dockAnchor.x,
        this.dockAnchor.y,
        this.dockAnchor.radius || this.options.anchorRadius,
        0,
        Math.PI * 2
      );
      ctx.strokeStyle = this.options.dockStrokeStyle;
      ctx.fillStyle = this.options.dockFillStyle;
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    if (this.hoverLineCP) {
      ctx.beginPath();
      ctx.arc(this.hoverLineCP.x, this.hoverLineCP.y, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.strokeStyle = rgba(0.5, this.options.hoverColor);
    ctx.lineWidth = 1;

    if (this.dockLineX > 0) {
      const size = Store.get(this.generateStoreKey('LT:size'));
      ctx.beginPath();
      ctx.moveTo(this.dockLineX, -this.data.y);
      ctx.lineTo(this.dockLineX, size.height);
      ctx.stroke();
    }

    if (this.dockLineY > 0) {
      const size = Store.get(this.generateStoreKey('LT:size'));
      ctx.beginPath();
      ctx.moveTo(-this.data.x, this.dockLineY);
      ctx.lineTo(size.width, this.dockLineY);
      ctx.stroke();
    }

    // Select nodes by drag.
    if (this.dragRect) {
      ctx.fillStyle = rgba(0.2, this.options.dragColor);
      ctx.strokeStyle = this.options.dragColor;
      ctx.beginPath();
      ctx.strokeRect(this.dragRect.x, this.dragRect.y, this.dragRect.width, this.dragRect.height);
      ctx.fillRect(this.dragRect.x, this.dragRect.y, this.dragRect.width, this.dragRect.height);
    }
  }

  getRoot(pen: Pen) {
    if (!pen.parentId) {
      return null;
    }
    for (const item of this.data.pens) {
      if (item.id === pen.parentId) {
        const n = this.getRoot(item);
        return n ? n : item;
      }
    }

    return null;
  }

  clear() {
    this.node = undefined;
    this.line = undefined;
  }
}
