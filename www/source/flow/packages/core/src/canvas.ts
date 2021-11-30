import { Observer, Store } from 'le5le-store';

import { TopologyData } from './models/data';
import { Options } from './options';
import { Layer } from './layer';

declare const window: any;

export class Canvas extends Layer {
  static dpiRatio = 0;

  protected data: TopologyData;
  canvas = document.createElement('canvas');
  width = 0;
  height = 0;
  subcribe: Observer;
  constructor(public parentElem: HTMLElement, public options: Options = {}, TID: string) {
    super(TID);
    this.subcribe = Store.subscribe(this.generateStoreKey('topology-data'), (val) => {
      this.data = val;
    });
    this.canvas.style.position = 'absolute';
    this.canvas.style.left = '0';
    this.canvas.style.top = '0';
    this.canvas.style.outline = 'none';

    if (!Canvas.dpiRatio) {
      if (!options.extDpiRatio && options.extDpiRatio !== 0) {
        if (window && window.devicePixelRatio > 1) {
          options.extDpiRatio = 0.25;
        } else {
          options.extDpiRatio = 0;
        }
      }
      Canvas.dpiRatio = (window ? window.devicePixelRatio : 0) + options.extDpiRatio;


      if (Canvas.dpiRatio < 1) {
        Canvas.dpiRatio = 1;
      }
    }
  }

  resize(size?: { width: number; height: number; }) {
    if (size) {
      this.width = size.width | 0;
      this.height = size.height | 0;
    } else {
      if (this.options.width && this.options.width !== 'auto') {
        this.width = +this.options.width;
      } else {
        this.width = this.parentElem.clientWidth;
      }
      if (this.options.height && this.options.height !== 'auto') {
        this.height = +this.options.height;
      } else {
        this.height = this.parentElem.clientHeight;
      }
    }

    this.canvas.style.width = this.width + 'px';
    this.canvas.style.height = this.height + 'px';
    this.canvas.width = (this.width * Canvas.dpiRatio) | 0;
    this.canvas.height = (this.height * Canvas.dpiRatio) | 0;
    this.canvas.getContext('2d').scale(Canvas.dpiRatio, Canvas.dpiRatio);

    Store.set(this.generateStoreKey('LT:size'), { width: this.canvas.width, height: this.canvas.height });
  }

  render() {
    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  getDpiRatio() {
    return Canvas.dpiRatio;
  }

  destroy() {
    this.subcribe.unsubscribe();
  }
}
