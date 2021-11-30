import { Store } from 'le5le-store';
import { Options } from './options';
import { Canvas } from './canvas';
import { ActiveLayer } from './activeLayer';
import { HoverLayer } from './hoverLayer';
import { AnimateLayer } from './animateLayer';
import { rectInRect } from './utils/rect';
import { Rect, PenType } from './models';

export class Offscreen extends Canvas {
  public activeLayer: ActiveLayer;
  public hoverLayer: HoverLayer;
  public animateLayer: AnimateLayer;
  constructor(public parentElem: HTMLElement, public options: Options = {}, TID: string) {
    super(parentElem, options, TID);
    this.activeLayer = Store.get(this.generateStoreKey('LT:ActiveLayer'));
    this.hoverLayer = Store.get(this.generateStoreKey('LT:HoverLayer'));
    this.animateLayer = Store.get(this.generateStoreKey('LT:AnimateLayer'));
    Store.set(this.generateStoreKey('LT:offscreen'), this.canvas);
  }

  render() {
    super.render();

    const ctx = this.canvas.getContext('2d');
    ctx.strokeStyle = this.options.color;
    const canvasRect = new Rect(-this.data.x,-this.data.y,this.width,this.height);
    for (const item of this.data.pens) {
      if (!item.getTID()) {
        item.setTID(this.TID);
      }
      // 连线类型没有 rect，必渲染
      if (!rectInRect(item.rect, canvasRect) && item.type === PenType.Node) {
        continue;
      }
      item.render(ctx);
    }

    this.activeLayer.render(ctx);
    this.animateLayer.render(ctx);
    this.hoverLayer.render(ctx);
  }
}
