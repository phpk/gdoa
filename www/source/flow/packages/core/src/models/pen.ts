import { Store } from 'le5le-store';

import { s8 } from '../utils/uuid';
import { Rect } from './rect';
import { EventType, EventAction } from './event';

import { deepClone } from '../utils/clone';
import { Lock } from './status';

export enum PenType {
  Node,
  Line,
}

export interface Action {
  do?: string;
  url?: string;
  _blank?: string;
  tag?: string;
  fn?: string | Function;
  params?: any;
}

export interface Event {
  type: EventType;
  action: EventAction;
  value: string | Function;
  params: string;
  name?: string;
}

export interface Where {
  key?: string;
  comparison?: string;
  value?: any;
  fn?: string | Function;
  actions?: Action[];
}

const eventFns: string[] = [
  'link',
  'doStartAnimate',
  'doFn',
  'doWindowFn',
  '',
  'doPauseAnimate',
  'doStopAnimate',
  'doEmit',
];

const defaultPen: any = {
  name: '',
  tags: [],
  visible: true,
  rect: new Rect(0, 0, 0, 0),
  fontColor: '',
  fontFamily:
    '"Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial',
  fontSize: 12,
  lineHeight: 1.5,
  fontStyle: 'normal',
  fontWeight: 'normal',
  textAlign: 'center',
  textBaseline: 'middle',
  textBackground: '',
  animateCycleIndex: 0,
  events: [],
  dash: 0,
  lineDashOffset: 0,
  lineWidth: 1,
  strokeStyle: '',
  fillStyle: '',
  globalAlpha: 1,
  rotate: 0,
  offsetRotate: 0,
  textMaxLine: 0,
  textOffsetX: 0,
  textOffsetY: 0,
  animatePos: 0,
};

export const images: {
  [key: string]: { img: HTMLImageElement };
} = {};

export abstract class Pen {
  TID: string;
  id: string;
  type: PenType;
  name: string;
  tags: string[];
  rect: Rect;
  lineWidth: number;
  rotate: number;
  offsetRotate: number;
  globalAlpha: number;

  dash: number;
  lineDash: number[];
  lineDashOffset: number;
  strokeStyle: string;
  fillStyle: string;
  lineCap: string;
  fontColor: string;
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  fontStyle: string;
  fontWeight: string;
  textAlign: string;
  textBaseline: string;
  textBackground: string;

  text: string;
  textMaxLine: number;
  whiteSpace: string;
  autoRect: boolean;
  textRect: Rect;
  fullTextRect: Rect;
  textOffsetX: number;
  textOffsetY: number;

  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;

  animateFn: string | Function;
  // animateType仅仅是辅助标识
  animateType: string;
  // Date.getTime
  animateStart: number;
  // Cycle count. Infinite if <= 0.
  animateCycle: number;
  animateCycleIndex: number;
  nextAnimate: string;
  // Auto-play
  animatePlay: boolean;

  animatePos: number;
  animateReverse: boolean;

  locked: Lock;
  // 作为子节点，是否可以直接点击选中
  stand: boolean;
  hideInput: boolean;
  hideRotateCP: boolean;
  hideSizeCP: boolean;
  hideAnchor: boolean;

  markdown: string;
  // 外部用于提示的dom id
  tipId: string;
  title: string;

  events: Event[];
  wheres: Where[];

  parentId: string;
  rectInParent: {
    x: number | string;
    y: number | string;
    width: number | string;
    height: number | string;
    marginTop?: number | string;
    marginRight?: number | string;
    marginBottom?: number | string;
    marginLeft?: number | string;
    rotate: number;
    rect?: Rect;
  };

  // 0 - 纯色；1 - 线性渐变
  strokeType: number;

  // 线条渐变
  lineGradientFromColor: string;
  lineGradientToColor: string;
  lineGradientAngle: number;  // 该属性节点才有意义

  paddingTopNum: number;
  paddingBottomNum: number;
  paddingLeftNum: number;
  paddingRightNum: number;

  visible: boolean;

  fillImage: string;
  strokeImage: string;
  fillImg: HTMLImageElement;
  strokeImg: HTMLImageElement;
  lastFillImage: string;
  lastStrokeImage: string;

  children: Pen[];

  // User data.
  data: any;
  value: number;
  num: number;
  num1: number;
  num2: number;
  num3: number;

  fromData(defaultData: any, json: any) {
    if (!json) {
      json = {};
    } else if (typeof json === 'string') {
      json = JSON.parse(json);
    }

    defaultPen.id = s8();
    defaultData = Object.assign({}, defaultPen, defaultData);
    for (let key in defaultData) {
      this[key] = defaultData[key];
    }
    for (let key in json) {
      this[key] = json[key];
    }

    if (Array.isArray(this.tags)) {
      this.tags = Object.assign([], this.tags);
    }

    if (this.rect) {
      this.rect = new Rect(
        this.rect.x,
        this.rect.y,
        this.rect.width,
        this.rect.height
      );
    }

    this.lineWidth = this.lineWidth || 1;

    // 兼容老格式
    if (!this.fontColor && json.font) {
      this.fontColor = json.font.color || this.fontColor;
      this.fontFamily = json.font.fontFamily || this.fontFamily;
      this.fontSize = json.font.fontSize || this.fontSize;
      this.lineHeight = json.font.lineHeight || this.lineHeight;
      this.fontStyle = json.font.fontStyle || this.fontStyle;
      this.fontWeight = json.font.fontWeight || this.fontWeight;
      this.textAlign = json.font.textAlign || this.textAlign;
      this.textBaseline = json.font.textBaseline || this.textBaseline;
      this.textBackground = json.font.background || this.textBackground;
      delete this['font'];
    }
    // end

    if (this.events) {
      this.events = deepClone(this.events);
    }
    if (this.wheres) {
      this.wheres = deepClone(this.wheres);
    }

    if (typeof this.data === 'object') {
      this.data = JSON.parse(JSON.stringify(this.data));
    }

    delete this['img'];
    delete this['animateStart'];
    delete this['animateReady'];
  }

  render(ctx: CanvasRenderingContext2D) {
    if (!this.visible) {
      return;
    }

    if ((this as any).from && !(this as any).to) {
      if (this.children) {
        for (const item of this.children) {
          item.render(ctx);
        }
      }
      return;
    }

    ctx.save();

    // for canvas2svg
    if ((ctx as any).setAttrs) {
      (ctx as any).setAttrs(this);
    }
    // end

    if (this.rotate || this.offsetRotate) {
      ctx.translate(this.rect.center.x, this.rect.center.y);
      ctx.rotate(((this.rotate + this.offsetRotate) * Math.PI) / 180);
      ctx.translate(-this.rect.center.x, -this.rect.center.y);
    }

    if (this.lineWidth > 1) {
      ctx.lineWidth = this.lineWidth;
    }

    if (this.strokeImage) {
      if (this.strokeImage === this.lastStrokeImage && this.strokeImg) {
        ctx.strokeStyle = ctx.createPattern(this.strokeImg, 'repeat');
      } else {
        this.loadStrokeImg();
      }
    } else {
      ctx.strokeStyle =
        this.strokeStyle || Store.get(this.generateStoreKey('LT:color'));
    }

    if (this.fillImage) {
      if (this.fillImage === this.lastFillImage && this.fillImg) {
        ctx.fillStyle = ctx.createPattern(this.fillImg, 'repeat');
      } else {
        this.loadFillImg();
      }
    } else if (this.fillStyle) {
      ctx.fillStyle = this.fillStyle;
    }

    if (this.lineCap) {
      ctx.lineCap = this.lineCap as CanvasLineCap;
    } else if (this.type === PenType.Line) {
      ctx.lineCap = 'round';
    }

    if (this.globalAlpha < 1) {
      ctx.globalAlpha = this.globalAlpha;
    }

    if (this.lineDash) {
      ctx.setLineDash(this.lineDash);
    } else {
      switch (this.dash) {
        case 1:
          ctx.setLineDash([5, 5]);
          break;
        case 2:
          ctx.setLineDash([10, 10]);
          break;
        case 3:
          ctx.setLineDash([10, 10, 2, 10]);
          break;
        case 4:
          ctx.setLineDash([1, 16]);
          break;
      }
    }
    if (this.lineDashOffset) {
      ctx.lineDashOffset = this.lineDashOffset;
    }

    if (this.shadowColor) {
      ctx.shadowColor = this.shadowColor;
      ctx.shadowOffsetX = this.shadowOffsetX;
      ctx.shadowOffsetY = this.shadowOffsetY;
      ctx.shadowBlur = this.shadowBlur;
    }

    this.draw(ctx);

    ctx.restore();

    if (this.children) {
      for (const item of this.children) {
        item.render(ctx);
      }
    }
  }

  loadFillImg() {
    if (!this.fillImage) {
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.fillImage;
    img.onload = () => {
      this.lastFillImage = this.fillImage;
      this.fillImg = img;
      images[this.fillImage] = {
        img,
      };
      Store.set(this.generateStoreKey('LT:imageLoaded'), true);
    };
  }

  loadStrokeImg() {
    if (!this.strokeImage) {
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.strokeImage;
    img.onload = () => {
      this.lastStrokeImage = this.strokeImage;
      this.strokeImg = img;
      images[this.strokeImage] = {
        img,
      };
      Store.set(this.generateStoreKey('LT:imageLoaded'), true);
    };
  }

  click() {
    if (!this.events) {
      return;
    }

    for (const item of this.events) {
      if (item.type !== EventType.Click) {
        continue;
      }

      this[eventFns[item.action]] &&
        this[eventFns[item.action]](item.value, item.params);
    }
  }

  mouseUp() {
    if (!this.events) {
      return;
    }

    for (const item of this.events) {
      if (item.type !== EventType.MouseUp) {
        continue;
      }

      this[eventFns[item.action]] &&
        this[eventFns[item.action]](item.value, item.params);
    }
  }

  dblclick() {
    if (!this.events) {
      return;
    }

    for (const item of this.events) {
      if (item.type !== EventType.DblClick) {
        continue;
      }

      this[eventFns[item.action]] &&
        this[eventFns[item.action]](item.value, item.params);
    }
  }

  moveIn() {
    if (!this.events) {
      return;
    }

    for (const item of this.events) {
      if (item.type !== EventType.MoveIn) {
        continue;
      }

      this[eventFns[item.action]] &&
        this[eventFns[item.action]](item.value, item.params);
    }
  }

  moveOut() {
    if (!this.events) {
      return;
    }

    for (const item of this.events) {
      if (item.type !== EventType.MoveOut) {
        continue;
      }

      this[eventFns[item.action]] &&
        this[eventFns[item.action]](item.value, item.params);
    }
  }

  doWheres() {
    if (!this.wheres) {
      return;
    }

    this.wheres.forEach((where) => {
      if(where.fn instanceof Function){ // 函数类型 fn
        if (where.fn(this)) {
          where.actions &&
            where.actions.forEach((action: any) => {
              this.doAction(action);
            });
        }
      } else if (where.fn && where.fn.trim()) {  // 字符串类型 fn
        const fn = new Function('pen', where.fn);
        if (fn(this)) {
          where.actions &&
            where.actions.forEach((action: any) => {
              this.doAction(action);
            });
        }
      } else {  // fn 为空
        const fn = new Function(
          'attr',
          `return attr ${where.comparison} ${where.value}`
        );
        if (fn(this[where.key])) {
          where.actions &&
            where.actions.forEach((action: any) => {
              this.doAction(action);
            });
        }
      }
    });
  }

  doAction(action: any) {
    switch (action.do || action.action) {
      case 0:
      case 'Link':
        this.link(action.url || action.value, action._blank || action.params);
        break;
      case 1:
      case 'StartAnimate':
        this.doStartAnimate(action.tag || action.value);
        break;
      case 5:
      case 'PauseAnimate':
        this.doPauseAnimate(action.tag || action.value);
        break;
      case 6:
      case 'StopAnimate':
        this.doStopAnimate(action.tag || action.value);
        break;
      case 2:
      case 'Function':
        this.doFn(action.fn || action.value, action.params);
        break;
      case 3:
      case 'WindowFn':
        this.doWindowFn(action.fn || action.value, action.params);
        break;
      case 7:
      case 'Emit':
        this.doEmit(action.fn || action.value, action.params);
        break;
    }
  }

  show() {
    this.visible = true;
    return this;
  }

  hide() {
    this.visible = false;
    return this;
  }

  isVisible() {
    return this.visible;
  }

  getTID() {
    return this.TID;
  }

  setTID(id: string) {
    this.TID = id;
    if ((this as any).children) {
      for (const item of (this as any).children) {
        item.setTID(id);
      }
    }

    return this;
  }

  startAnimate() {
    this.animateStart = Date.now();
    if (this.type === PenType.Node && !this['animateReady']) {
      this['initAnimate']();
    }

    Store.set(this.generateStoreKey('LT:AnimatePlay'), {
      pen: this,
    });

    // 跟随动画播放
    if (this['playType'] === 2) {
      this.play();
    }
  }

  play(pause?: boolean) {
    Store.set(this.generateStoreKey('LT:play'), {
      pen: this,
      pause,
    });
  }

  private link(url: string, params: string) {
    window.open(url, params === undefined ? '_blank' : params);
  }

  private doStartAnimate(tag: string, params?: string) {
    if (tag) {
      Store.set(this.generateStoreKey('LT:AnimatePlay'), {
        tag,
      });
    } else {
      this.startAnimate();
    }
  }

  private doPauseAnimate(tag: string, params?: string) {
    if (tag) {
      Store.set(this.generateStoreKey('LT:AnimatePlay'), {
        tag,
        stop: true,
      });
    } else {
      this.pauseAnimate();
    }
  }

  private doStopAnimate(tag: string, params?: string) {
    if (tag) {
      Store.set(this.generateStoreKey('LT:AnimatePlay'), {
        tag,
        stop: true,
      });
    } else {
      this.stopAnimate();
    }
  }

  private doFn(fn: string | Function, params: string) {
    if (fn instanceof Function) return fn(this, params);
    const func: Function = new Function('pen', 'params', fn);
    func(this, params);
  }

  private doWindowFn(fn: string, params: string) {
    (window as any)[fn](this, params);
  }

  private doEmit(event: string, params: string) {
    Store.set(this.generateStoreKey('LT:emit'), {
      event,
      params,
      pen: this,
    });
  }

  generateStoreKey(key) {
    return `${this.TID}-${key}`;
  }

  abstract getTextRect(): Rect;
  abstract calcRectInParent(parent: Pen): void;
  abstract calcRectByParent(parent: Pen): void;
  abstract draw(ctx: CanvasRenderingContext2D): void;
  abstract translate(x: number, y: number, noAnimate?: boolean): void;
  abstract scale(scale: number, center?: { x: number; y: number }): void;
  abstract hit(point: { x: number; y: number }, padding?: number): any;
  abstract clone(): Pen;
  abstract initAnimate(): void;
  abstract animate(now: number): void;
  abstract pauseAnimate(): void;
  abstract stopAnimate(): void;

  abstract strokeLinearGradient(ctx: CanvasRenderingContext2D): void;
}
