import { images, Pen, PenType } from './pen';
import { Line } from './line';
import { Rect } from './rect';
import { Point } from './point';
import { anchorsFns, iconRectFns, textRectFns, drawNodeFns } from '../middles';
import { defaultAnchors } from '../middles/default.anchor';
import { defaultIconRect, defaultTextRect } from '../middles/default.rect';
import { text, iconfont } from '../middles/nodes/text';
import { Store } from 'le5le-store';
import { abs, distance } from '../utils/math';
import { s8 } from '../utils/uuid';
import { pointInRect } from '../utils/canvas';
import { Direction } from './direction';

// 动画帧不涉及的属性
const animateOutsides = [
  'TID',
  'events',
  'wheres',
  'text',
  'fontFamily',
  'fontSize',
  'lineHeight',
  'fontStyle',
  'fontWeight',
  'textAlign',
  'textBaseline',
  'textBackground',
  'iconFamily',
  'icon',
  'iconSize',
];

export class Node extends Pen {
  is3D: boolean;
  z: number;
  zRotate: number;

  borderRadius: number;

  // icon
  icon: string;
  iconFamily: string;
  iconSize: number;
  iconColor: string;
  iconRotate: number;

  image: string;
  lastImage: string;
  imgNaturalWidth: number;
  imgNaturalHeight: number;
  imageWidth: number;
  imageHeight: number;
  imageRatio = true;
  imageAlign: string;
  imageHide:boolean;
  img: HTMLImageElement;

  // 0 - 纯色；1 - 线性渐变；2 - 径向渐变
  bkType: number;
  gradientFromColor: string;
  gradientToColor: string;
  gradientAngle: number;
  gradientRadius: number;

  paddingTop: number | string;
  paddingBottom: number | string;
  paddingLeft: number | string;
  paddingRight: number | string;

  disableSizeX?: boolean;
  disableSizeY?: boolean;

  iconRect: Rect;
  fullIconRect: Rect;

  points: Point[] = [];

  anchors: Point[] = [];
  manualAnchors: Point[] = [];
  rotatedAnchors: Point[] = [];

  // nodes移动时，停靠点的参考位置
  // dockWatchers: Point[];
  
  get dockWatchers() : Point[] {
    return [this.rect.center, ...this.rect.toPoints()];
  }
  // 不做任何处理，兼容以前版本中节点属性存在该值的
  set dockWatchers(v : Point[]) {
  }
  
  

  animateDuration = 0;
  animateFrames: {
    duration: number;
    start?: number;
    end?: number;
    initState?: Node;
    linear: boolean;
    state: Node;
    offsetRect: Rect;
  }[] = [];
  animateAlone: boolean;
  animateReady: Node;
  animateFrame = 0;
  private _animateFrame: number;
  private _animatePos: number;

  gif: boolean;
  video: string;
  audio: string;
  // 0 - 人工播放；1 - auto自动播放；2 - animate play
  playType: number;
  playLoop: boolean;
  nextPlay: string;

  iframe: string;
  // 和节点绑定的（多是临时生成）的dom元素
  elementId: string;
  // 外部dom是否完成初始化（用于第三方库辅助变量）
  elementLoaded: any;
  // 外部dom是否已经渲染。当需要重绘时，设置为false（用于第三方库辅助变量）
  elementRendered: boolean;

  constructor(json: any, cloneState?: boolean) {
    super();

    const defaultData: any = {
      zRotate: 0,
      borderRadius: 0,
      imageAlign: 'center',
      gradientAngle: 0,
      gradientRadius: 0.01,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
      animateFrame: 0,
      children: [],
    };

    this.fromData(defaultData, json);
    this.type = PenType.Node;
    if (!cloneState) {
      delete this.elementLoaded;
      delete this.elementRendered;
    }
    delete this.animateReady;

    // 兼容老数据
    if (json.children && json.children[0] && json.children[0].parentRect) {
      this.paddingLeft = json.children[0].parentRect.offsetX;
      this.paddingRight = 0;
      this.paddingTop = json.children[0].parentRect.offsetY;
      this.paddingBottom = 0;
    }

    if (json.parentRect) {
      this.rectInParent = {
        x: json.parentRect.x * 100 + '%',
        y: json.parentRect.y * 100 + '%',
        width: json.parentRect.width * 100 + '%',
        height: json.parentRect.height * 100 + '%',
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
        rotate: json.parentRect.rotate,
      };
      this.paddingTop = json.parentRect.marginY;
      this.paddingBottom = json.parentRect.marginY;
      this.paddingLeft = json.parentRect.marginX;
      this.paddingRight = json.parentRect.marginX;
    }
    // 兼容老数据 end

    if (json.points) {
      this.points = [];
      json.points.forEach((pt: any) => {
        this.points.push(new Point(pt.x, pt.y));
      });
    }

    if (json.manualAnchors) {
      this.manualAnchors = [];
      json.manualAnchors.forEach((pt: any) => {
        const point = new Point(pt.x, pt.y);
        point.id = json.id;
        this.manualAnchors.push(point);
      });
    }

    if (cloneState) {
      this.animateFrames = undefined;
    }
    if (!cloneState && json.animateFrames && json.animateFrames.length) {
      for (const item of json.animateFrames) {
        item.children = undefined;
        if (item.initState) {
          item.initState = Node.cloneState(item.initState);
        }
        item.state = Node.cloneState(item.state);
      }
      this.animateFrames = json.animateFrames;
    }
    this.animateType = json.animateType
      ? json.animateType
      : json.animateDuration
      ? 'custom'
      : '';
    this.init(cloneState);

    if (json.init && json.img && !json.image) {
      this.img = json.img;
    }

    if (json.children) {
      this.children = [];
      json.children.forEach((item: Pen) => {
        let child: Pen;
        item.TID = this.TID;
        switch (item.type) {
          case PenType.Line:
            child = new Line(item);
            child.calcRectByParent(this);
            break;
          default:
            Node.prototype.calcRectByParent.apply(item, [this]);
            child = new Node(item);
            child.parentId = this.id;
            (child as Node).init(cloneState);
            break;
        }
        this.children.push(child);
      });
    }
  }

  static cloneState(json: any) {
    const n = new Node(json, true);
    animateOutsides.forEach((item) => {
      delete n[item];
    });

    return n;
  }

  restore(state?: Node) {
    if (!state && this.animateReady) {
      state = Node.cloneState(this.animateReady);
    }
    if (!state) {
      return;
    }
    for (const key in this) {
      if (
        (state as any)[key] !== undefined &&
        key.indexOf('animate') < 0 &&
        key.indexOf('Animate') < 0
      ) {
        if (animateOutsides.includes(key)) {
          continue;
        }
        this[key] = (state as any)[key];

        if (key === 'rect') {
          this.rect = new Rect(
            this.rect.x,
            this.rect.y,
            this.rect.width,
            this.rect.height
          );
        }
      }
    }

    this.init(true);
  }

  checkData() {
    this.rect.width = this.rect.width < 0 ? 0 : this.rect.width;
    this.rect.height = this.rect.height < 0 ? 0 : this.rect.height;

    if (!this.rect.calcCenter) {
      this.rect = new Rect(
        this.rect.x,
        this.rect.y,
        this.rect.width,
        this.rect.height
      );
    }
  }

  init(cloneState?: boolean) {
    this.checkData();

    this.calcAbsPadding();

    // Calc rect of text.
    if (textRectFns[this.name]) {
      textRectFns[this.name](this);
    } else {
      defaultTextRect(this);
    }

    // Calc rect of icon.
    if (iconRectFns[this.name]) {
      iconRectFns[this.name](this);
    } else {
      defaultIconRect(this);
    }

    this.calcAnchors();
    this.elementRendered = false;

    if (!cloneState) {
      this.addToDiv();
    }
  }

  addToDiv() {
    if (this.audio || this.video || this.iframe || this.elementId || this.gif) {
      Store.set(this.generateStoreKey('LT:addDiv'), this);
    }
  }

  removeFromDiv() {
    Store.set(this.generateStoreKey('LT:removeDiv'), this);
  }

  hasGif() {
    if (this.gif) {
      return true;
    }

    if (this.children) {
      for (const item of this.children) {
        if (
          item.type === PenType.Node &&
          (item as any).hasGif &&
          (item as Node).hasGif()
        ) {
          return true;
        }
      }
    }

    return false;
  }

  calcAbsPadding() {
    this.paddingLeftNum = abs(this.rect.width, this.paddingLeft);
    this.paddingRightNum = abs(this.rect.width, this.paddingRight);
    this.paddingTopNum = abs(this.rect.height, this.paddingTop);
    this.paddingBottomNum = abs(this.rect.height, this.paddingBottom);
  }

  // setChildrenIds() {
  //   if (!this.children) {
  //     return;
  //   }

  //   for (const item of this.children) {
  //     item.id = s8();
  //     switch (item.type) {
  //       case PenType.Node:
  //         (item as Node).setChildrenIds();
  //         break;
  //     }
  //   }
  // }

  draw(ctx: CanvasRenderingContext2D) {
    if (!drawNodeFns[this.name]) {
      return;
    }

    // DrawBk
    switch (this.bkType) {
      case 1:
        this.drawBkLinearGradient(ctx);
        break;
      case 2:
        this.drawBkRadialGradient(ctx);
        break;
    }

    switch(this.strokeType){
      case 1:
        this.strokeLinearGradient(ctx);
        break;
    }


    // Draw shape.
    drawNodeFns[this.name](ctx, this);

    // Draw image.
    if (this.image || (this.img && this.elementId === '')) {
      this.drawImg(ctx);
    } else if (this.icon) {
      ctx.save();
      ctx.shadowColor = '';
      ctx.shadowBlur = 0;
      iconfont(ctx, this);
      ctx.restore();
    }

    // Draw text.
    if (this.name !== 'text' && this.text) {
      text(ctx, this);
    }
  }

  strokeLinearGradient(ctx: CanvasRenderingContext2D) {
    if (!this.lineGradientFromColor || !this.lineGradientToColor) {
      return;
    }
    const from = new Point(this.rect.x, this.rect.center.y);
    const to = new Point(this.rect.ex, this.rect.center.y);
    if (this.lineGradientAngle % 90 === 0 && this.lineGradientAngle % 180) {
      if (this.lineGradientAngle % 270) {
        from.x = this.rect.center.x;
        from.y = this.rect.y;
        to.x = this.rect.center.x;
        to.y = this.rect.ey;
      } else {
        from.x = this.rect.center.x;
        from.y = this.rect.ey;
        to.x = this.rect.center.x;
        to.y = this.rect.y;
      }
    } else if (this.lineGradientAngle) {
      from.rotate(this.lineGradientAngle, this.rect.center);
      to.rotate(this.lineGradientAngle, this.rect.center);
    }

    // contributor: https://github.com/sunnyguohua/topology
    const grd = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
    grd.addColorStop(0, this.lineGradientFromColor);
    grd.addColorStop(1, this.lineGradientToColor);
    ctx.strokeStyle = grd;
  }

  drawBkLinearGradient(ctx: CanvasRenderingContext2D) {
    if (!this.gradientFromColor || !this.gradientToColor) {
      return;
    }
    const from = new Point(this.rect.x, this.rect.center.y);
    const to = new Point(this.rect.ex, this.rect.center.y);
    if (this.gradientAngle % 90 === 0 && this.gradientAngle % 180) {
      if (this.gradientAngle % 270) {
        from.x = this.rect.center.x;
        from.y = this.rect.y;
        to.x = this.rect.center.x;
        to.y = this.rect.ey;
      } else {
        from.x = this.rect.center.x;
        from.y = this.rect.ey;
        to.x = this.rect.center.x;
        to.y = this.rect.y;
      }
    } else if (this.gradientAngle) {
      from.rotate(this.gradientAngle, this.rect.center);
      to.rotate(this.gradientAngle, this.rect.center);
    }

    // contributor: https://github.com/sunnyguohua/topology
    const grd = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
    grd.addColorStop(0, this.gradientFromColor);
    grd.addColorStop(1, this.gradientToColor);
    ctx.fillStyle = grd;
  }

  drawBkRadialGradient(ctx: CanvasRenderingContext2D) {
    if (!this.gradientFromColor || !this.gradientToColor) {
      return;
    }

    let r = this.rect.width;
    if (r < this.rect.height) {
      r = this.rect.height;
    }
    r *= 0.5;
    const grd = ctx.createRadialGradient(
      this.rect.center.x,
      this.rect.center.y,
      r * this.gradientRadius,
      this.rect.center.x,
      this.rect.center.y,
      r
    );
    grd.addColorStop(0, this.gradientFromColor);
    grd.addColorStop(1, this.gradientToColor);

    ctx.fillStyle = grd;
  }

  drawImg(ctx: CanvasRenderingContext2D) {
    if (this.lastImage !== this.image) {
      this.img = undefined;
      if (this.lastImage && this.lastImage.indexOf('.gif') > 0) {
        Store.set(this.generateStoreKey('LT:addDiv'), this);
      }
    }

    const gif = this.image && this.image.indexOf('.gif') > 0;
    if (!gif) {
      if (this.img) {
        ctx.save();
        ctx.shadowColor = '';
        ctx.shadowBlur = 0;
        const rect = this.getIconRect();
        let x = rect.x;
        let y = rect.y;
        let w = rect.width;
        let h = rect.height;
        if (this.imageWidth) {
          w = this.imageWidth;
        }
        if (this.imageHeight) {
          h = this.imageHeight;
        }
        if (this.imgNaturalWidth && this.imgNaturalHeight && this.imageRatio) {
          if (this.imageWidth) {
            h = (this.imgNaturalHeight / this.imgNaturalWidth) * w;
          } else {
            w = (this.imgNaturalWidth / this.imgNaturalHeight) * h;
          }
        }
        x += (rect.width - w) / 2;
        y += (rect.height - h) / 2;

        switch (this.imageAlign) {
          case 'top':
            y = rect.y;
            break;
          case 'bottom':
            y = rect.ey - h;
            break;
          case 'left':
            x = rect.x;
            break;
          case 'right':
            x = rect.ex - w;
            break;
          case 'left-top':
            x = rect.x;
            y = rect.y;
            break;
          case 'right-top':
            x = rect.ex - w;
            y = rect.y;
            break;
          case 'left-bottom':
            x = rect.x;
            y = rect.ey - h;
            break;
          case 'right-bottom':
            x = rect.ex - w;
            y = rect.ey - h;
            break;
        }

        if (this.iconRotate) {
          ctx.translate(rect.center.x, rect.center.y);
          ctx.rotate((this.iconRotate * Math.PI) / 180);
          ctx.translate(-rect.center.x, -rect.center.y);
        }
        if(this.imageHide){
          //  在业务层面去自定义绘制图片
        }else{
          ctx.drawImage(this.img, x, y, w, h);

        }
        ctx.restore();
        return;
      } else if (images[this.image]) {
        this.img = images[this.image].img;
        this.lastImage = this.image;
        this.imgNaturalWidth = this.img.naturalWidth;
        this.imgNaturalHeight = this.img.naturalHeight;
        this.drawImg(ctx);
        return;
      }
    } else if (this.img) {
      if (this.TID && !this.elementLoaded) {
        this.elementLoaded = true;
        Store.set(this.generateStoreKey('LT:addDiv'), this);
      }
      return;
    }

    if (!this.image) {
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      this.lastImage = this.image;
      this.imgNaturalWidth = img.naturalWidth;
      this.imgNaturalHeight = img.naturalHeight;
      this.img = img;
      images[this.image] = {
        img,
      };
      Store.set(this.generateStoreKey('LT:imageLoaded'), true);
      if (!this.gif && gif) {
        this.gif = true;
        if (this.TID) {
          this.elementLoaded = true;
          Store.set(this.generateStoreKey('LT:addDiv'), this);
        }
      }
    };
  }

  calcAnchors() {
    this.anchors = [];
    if (anchorsFns[this.name]) {
      anchorsFns[this.name](this);
    } else {
      defaultAnchors(this);
    }

    if (this.manualAnchors) {
      this.manualAnchors.forEach((pt: Point) => {
        const x = Math.abs(pt.x - this.rect.center.x);
        const y = Math.abs(pt.y - this.rect.center.y);
        if (x > y) {
          if (pt.x < this.rect.center.x) {
            pt.direction = Direction.Left;
          } else {
            pt.direction = Direction.Right;
          }
        } else {
          if (pt.y < this.rect.center.y) {
            pt.direction = Direction.Up;
          } else {
            pt.direction = Direction.Bottom;
          }
        }

        this.anchors.push(pt);
      });
    }

    this.calcRotateAnchors();
  }

  calcRotateAnchors(angle?: number) {
    if (angle === undefined) {
      angle = this.rotate;
    }
    this.rotatedAnchors = [];
    for (const item of this.anchors) {
      this.rotatedAnchors.push(item.clone().rotate(angle, this.rect.center));
    }
  }

  getTextRect() {
    let textRect = this.textRect;
    if (!this.icon && !this.image) {
      textRect = this.fullTextRect;
    }

    return textRect;
  }

  getIconRect() {
    let rect = this.iconRect;
    if (!this.text) {
      rect = this.fullIconRect || this.fullTextRect || this.rect;
    }

    return rect;
  }

  // 根据父节点rect计算自己（子节点）的rect
  calcRectByParent(parent: Pen) {
    if (!this.rectInParent) {
      return;
    }
    const parentW =
      parent.rect.width - parent.paddingLeftNum - parent.paddingRightNum;
    const parentH =
      parent.rect.height - parent.paddingTopNum - parent.paddingBottomNum;
    let x =
      parent.rect.x +
      parent.paddingLeftNum +
      abs(parentW, this.rectInParent.x) +
      abs(parentW, this.rectInParent.marginLeft);
    let y =
      parent.rect.y +
      parent.paddingTopNum +
      abs(parentH, this.rectInParent.y) +
      abs(parentW, this.rectInParent.marginTop);
    const w = abs(parentW, this.rectInParent.width);
    const h = abs(parentH, this.rectInParent.height);
    if (
      this.rectInParent.marginLeft === undefined &&
      this.rectInParent.marginRight
    ) {
      x -= abs(parentW, this.rectInParent.marginRight);
    }
    if (
      this.rectInParent.marginTop === undefined &&
      this.rectInParent.marginBottom
    ) {
      y -= abs(parentW, this.rectInParent.marginBottom);
    }
    this.rect = new Rect(x, y, w, h);

    if (!this.rectInParent.rotate) {
      this.rectInParent.rotate = 0;
    }

    const offsetR = parent.rotate + parent.offsetRotate;
    this.rotate = this.rectInParent.rotate + offsetR;

    if (!this.rectInParent.rect) {
      this.rectInParent.rect = this.rect.clone();
    }
  }

  calcChildrenRect() {
    if (!this.children) {
      return;
    }
    for (const item of this.children) {
      item.calcRectByParent(this);
      if (item.type === PenType.Node) {
        (item as Node).init();
        (item as Node).calcChildrenRect();
      }
    }
  }

  calcRectInParent(parent: Pen) {
    const parentW =
      parent.rect.width - parent.paddingLeftNum - parent.paddingRightNum;
    const parentH =
      parent.rect.height - parent.paddingTopNum - parent.paddingBottomNum;
    this.rectInParent = {
      x:
        ((this.rect.x - parent.rect.x - parent.paddingLeftNum) * 100) /
          parentW +
        '%',
      y:
        ((this.rect.y - parent.rect.y - parent.paddingTopNum) * 100) / parentH +
        '%',
      width: (this.rect.width * 100) / parentW + '%',
      height: (this.rect.height * 100) / parentH + '%',
      rotate: this.rectInParent
        ? this.rectInParent.rotate || 0
        : this.rotate || 0,
      rect: this.rect.clone(),
    };
  }

  // getDockWatchers() {
  //   this.dockWatchers = this.rect.toPoints();
  //   this.dockWatchers.unshift(this.rect.center);
  // }

  initAnimate() {
    if (!this.animateFrames) {
      return;
    }

    let passed = 0;
    for (let i = 0; i < this.animateFrames.length; ++i) {
      this.animateFrames[i].start = passed;
      passed += this.animateFrames[i].duration;
      this.animateFrames[i].end = passed;
      this.animateFrames[i].initState = Node.cloneState(
        i ? this.animateFrames[i - 1].state : this
      );
      this.animateFrames[i].offsetRect = new Rect(
        this.animateFrames[i].state.rect.x -
          this.animateFrames[i].initState.rect.x,
        this.animateFrames[i].state.rect.y -
          this.animateFrames[i].initState.rect.y,
        this.animateFrames[i].state.rect.width -
          this.animateFrames[i].initState.rect.width,
        this.animateFrames[i].state.rect.height -
          this.animateFrames[i].initState.rect.height
      );
    }
    this.animateDuration = passed;

    this.animateReady = Node.cloneState(this);
    this.animatePos = 0;
    this.animateFrame = 0;
  }

  pauseAnimate() {
    this.animateFrame = this._animateFrame;
    this.animatePos = this._animatePos;
    Store.set(this.generateStoreKey('LT:AnimatePlay'), {
      pen: this,
      stop: true,
    });
  }

  stopAnimate() {
    this.animateStart = 0;
    Store.set(this.generateStoreKey('LT:AnimatePlay'), {
      pen: this,
      stop: true,
    });

    this.restore();
    this.initAnimate();

    Store.set(this.generateStoreKey('LT:render'), {
      pen: this,
      stop: true,
    });
  }

  animate(now: number) {
    if (this.animateStart < 1) {
      return;
    }

    let timeline = now - this.animateStart;
    if (this.animateFrame > 0) {
      this.animateFrames.forEach((item, index) => {
        if (this.animateFrame < index + 1) {
          timeline += item.duration;
        }
      });

      timeline += this.animatePos;
    }

    // Finished on animate.
    if (timeline > this.animateDuration) {
      this.animatePos = 0;
      this.animateFrame = 0;
      this.restore();
      if (
        this.animateCycle > 0 &&
        ++this.animateCycleIndex >= this.animateCycle
      ) {
        this.animateStart = 0;
        this.animateCycleIndex = 0;
        Store.set(this.generateStoreKey('animateEnd'), this);
        if (!this.animateAlone) {
          Store.set(this.generateStoreKey('LT:rectChanged'), this);
        }
        return;
      }
      this.animateStart = now;
      timeline = 0;
    }

    let rectChanged = false;
    for (let i = 0; i < this.animateFrames.length; ++i) {
      const item = this.animateFrames[i];
      if (timeline >= item.start && timeline < item.end) {
        item.state.dash && (this.dash = item.state.dash);
        item.state.strokeStyle && (this.strokeStyle = item.state.strokeStyle);
        item.state.fillStyle && (this.fillStyle = item.state.fillStyle);
        item.state.text && (this.text = item.state.text);
        item.state.fontColor && (this.fontColor = item.state.fontColor);
        item.state.fontFamily && (this.fontFamily = item.state.fontFamily);
        item.state.fontSize && (this.fontSize = item.state.fontSize);
        item.state.lineHeight && (this.lineHeight = item.state.lineHeight);
        item.state.fontStyle && (this.fontStyle = item.state.fontStyle);
        item.state.fontWeight && (this.fontWeight = item.state.fontWeight);
        item.state.textAlign && (this.textAlign = item.state.textAlign);
        item.state.textBaseline &&
          (this.textBaseline = item.state.textBaseline);
        item.state.textBackground &&
          (this.textBackground = item.state.textBackground);
        item.state.iconFamily && (this.iconFamily = item.state.iconFamily);
        item.state.icon && (this.icon = item.state.icon);
        item.state.iconSize && (this.iconSize = item.state.iconSize);
        item.state.iconColor && (this.iconColor = item.state.iconColor);

        this.visible = item.state.visible;

        this._animateFrame = i + 1;
        if (this._animateFrame > this.animateFrame) {
          this.animateFrame = 0;
          this.animatePos = 0;
        }
        this._animatePos = timeline - item.start;
        const rate = this._animatePos / item.duration;

        if (item.linear) {
          if (item.state.rect.x !== item.initState.rect.x) {
            this.rect.x = item.initState.rect.x + item.offsetRect.x * rate;
            rectChanged = true;
          }
          if (item.state.rect.y !== item.initState.rect.y) {
            this.rect.y = item.initState.rect.y + item.offsetRect.y * rate;
            rectChanged = true;
          }
          if (item.state.rect.width !== item.initState.rect.width) {
            this.rect.width =
              item.initState.rect.width + item.offsetRect.width * rate;
            rectChanged = true;
          }
          if (item.state.rect.height !== item.initState.rect.height) {
            this.rect.height =
              item.initState.rect.height + item.offsetRect.height * rate;
            rectChanged = true;
          }
          this.rect.ex = this.rect.x + this.rect.width;
          this.rect.ey = this.rect.y + this.rect.height;
          this.rect.calcCenter();

          if (
            item.initState.z !== undefined &&
            item.state.z !== item.initState.z
          ) {
            this.z =
              item.initState.z + (item.state.z - item.initState.z) * rate;
            rectChanged = true;
          }

          if (item.state.borderRadius !== item.initState.borderRadius) {
            this.borderRadius =
              item.initState.borderRadius +
              (item.state.borderRadius - item.initState.borderRadius) * rate;
          }

          if (item.state.lineWidth !== item.initState.lineWidth) {
            this.lineWidth =
              item.initState.lineWidth +
              (item.state.lineWidth - item.initState.lineWidth) * rate;
          }

          if (item.state.rotate !== item.initState.rotate) {
            this.rotate =
              item.initState.rotate +
              (item.state.rotate - item.initState.rotate) * rate;
            rectChanged = true;
          }

          if (item.state.globalAlpha !== item.initState.globalAlpha) {
            this.globalAlpha =
              item.initState.globalAlpha +
              (item.state.globalAlpha - item.initState.globalAlpha) * rate;
          }
          if (item.state.lineDashOffset) {
            if (!this.lineDashOffset) {
              this.lineDashOffset = item.state.lineDashOffset;
            } else {
              this.lineDashOffset += item.state.lineDashOffset;
            }
          }

          if (item.state.value !== item.initState.value) {
            this.value =
              (item.initState.value || 0) +
              ((item.state.value || 0) - (item.initState.value || 0)) * rate;
          }

          if (item.state.num !== item.initState.num) {
            this.num =
              (item.initState.num || 0) +
              ((item.state.num || 0) - (item.initState.num || 0)) * rate;
          }

          if (item.state.num1 !== item.initState.num1) {
            this.num1 =
              (item.initState.num1 || 0) +
              ((item.state.num1 || 0) - (item.initState.num1 || 0)) * rate;
          }

          if (item.state.num2 !== item.initState.num2) {
            this.num2 =
              (item.initState.num2 || 0) +
              ((item.state.num2 || 0) - (item.initState.num2 || 0)) * rate;
          }

          if (item.state.num3 !== item.initState.num3) {
            this.num3 =
              (item.initState.num3 || 0) +
              ((item.state.num3 || 0) - (item.initState.num3 || 0)) * rate;
          }

          if (item.state.data) {
            for (let key in item.state.data) {
              if (typeof item.state.data[key] === 'number') {
                this.data[key] =
                  (item.initState.data[key] || 0) +
                  ((item.state.data[key] || 0) -
                    (item.initState.data[key] || 0)) *
                    rate;
              } else if (
                item.state.data[key] !== undefined &&
                item.state.data[key] !== undefined
              ) {
                this.data[key] = item.state.data[key];
              }
            }
          }
        } else {
          this.rect = item.state.rect;
          this.lineWidth = item.state.lineWidth;
          this.rotate = item.state.rotate;
          this.globalAlpha = item.state.globalAlpha;
          this.lineDashOffset = item.state.lineDashOffset;
        }
      }
    }

    if (rectChanged) {
      this.init(true);
      if (!this.animateAlone) {
        Store.set(this.generateStoreKey('LT:rectChanged'), this);
      }
    }
  }

  scale(scale: number, center?: { x: number; y: number }) {
    if (!center) {
      center = this.rect.center;
    }
    this['oldRect'] = this.rect.clone();
    this.rect.x = center.x - (center.x - this.rect.x) * scale;
    this.rect.y = center.y - (center.y - this.rect.y) * scale;
    this.textOffsetX *= scale;
    this.textOffsetY *= scale;
    this.z *= scale;
    this.rect.width *= scale;
    this.rect.height *= scale;
    this.rect.ex = this.rect.x + this.rect.width;
    this.rect.ey = this.rect.y + this.rect.height;
    this.lineWidth *= scale;
    if (this.imageWidth) {
      this.imageWidth *= scale;
    }
    if (this.imageHeight) {
      this.imageHeight *= scale;
    }
    this.lastImage = undefined;
    this.fontSize *= scale;
    this.iconSize *= scale;
    if (typeof this.paddingLeft === 'number') {
      this.paddingLeft *= scale;
    }
    if (typeof this.paddingTop === 'number') {
      this.paddingTop *= scale;
    }
    if (typeof this.paddingRight === 'number') {
      this.paddingRight *= scale;
    }
    if (typeof this.paddingBottom === 'number') {
      this.paddingBottom *= scale;
    }

    if (this.rectInParent) {
      if (typeof this.rectInParent.x === 'number') {
        this.rectInParent.x *= scale;
      }
      if (typeof this.rectInParent.y === 'number') {
        this.rectInParent.y *= scale;
      }
      if (typeof this.rectInParent.width === 'number') {
        this.rectInParent.width *= scale;
      }
      if (typeof this.rectInParent.height === 'number') {
        this.rectInParent.height *= scale;
      }
      if (typeof this.rectInParent.marginLeft === 'number') {
        this.rectInParent.marginLeft *= scale;
      }
      if (typeof this.rectInParent.marginTop === 'number') {
        this.rectInParent.marginTop *= scale;
      }
      if (typeof this.rectInParent.marginRight === 'number') {
        this.rectInParent.marginRight *= scale;
      }
      if (typeof this.rectInParent.marginBottom === 'number') {
        this.rectInParent.marginBottom *= scale;
      }
    }

    this.rect.calcCenter();

    if (this.animateFrames && this.animateFrames.length) {
      for (const item of this.animateFrames) {
        if (item.initState) {
          if (!item.initState.scale) {
            item.initState = new Node(item.initState);
          }
          item.initState.scale(scale, center);
        }
        if (item.state) {
          if (!item.state.scale) {
            item.state = new Node(item.state);
          }
          item.state.scale(scale, center);
        }

        if (item.initState && item.state) {
          item.state.fontSize = item.initState.fontSize;
        }
      }
    }

    this.scalePoints(scale, scale);

    this.elementRendered = false;
    this.init();

    if (this.children) {
      for (const item of this.children) {
        item.scale(scale, center);
      }
    }

    if (this.animateReady && this.animateReady.scale) {
      this.animateReady.scale(scale, center);
    }
  }

  scalePoints(scaleX?: number, scaleY?: number) {
    if ((this.points || this.manualAnchors) && this['oldRect']) {
      if (!scaleX) {
        scaleX = this.rect.width / this['oldRect'].width;
      }
      if (!scaleY) {
        scaleY = this.rect.height / this['oldRect'].height;
      }

      if (this.points) {
        this.points.forEach((pt: Point) => {
          pt.x = this.rect.x + (pt.x - this['oldRect'].x) * scaleX;
          pt.y = this.rect.y + (pt.y - this['oldRect'].y) * scaleY;
        });
      }

      if (this.manualAnchors) {
        this.manualAnchors.forEach((pt: Point) => {
          pt.x = this.rect.x + (pt.x - this['oldRect'].x) * scaleX;
          pt.y = this.rect.y + (pt.y - this['oldRect'].y) * scaleY;
        });
      }
    }
  }

  translate(x: number, y: number) {
    this.rect.x += x;
    this.rect.y += y;
    this.rect.ex = this.rect.x + this.rect.width;
    this.rect.ey = this.rect.y + this.rect.height;
    this.rect.calcCenter();

    if (this.animateReady) {
      this.animateReady.translate(x, y);
    }

    if (this.animateFrames && this.animateFrames.length) {
      for (const frame of this.animateFrames) {
        const { initState, state } = frame;
        if (initState && initState.translate) {
          initState.translate(x, y);
        }
        if (state && state.translate) {
          state.translate(x, y);
        }
      }
    }

    if (this.points) {
      this.points.forEach((pt: Point) => {
        pt.x += x;
        pt.y += y;
      });
    }

    if (this.manualAnchors) {
      this.manualAnchors.forEach((pt: Point) => {
        pt.x += x;
        pt.y += y;
      });
    }

    this.init();

    if (this.children) {
      for (const item of this.children) {
        item.translate(x, y);
      }
    }
  }

  initRect() {
    this.rect.init();
    if (this.children) {
      this.calcChildrenRect();
      for (const item of this.children) {
        if (item instanceof Node) {
          item.initRect();
        }
      }
    }
  }

  pushPoint(pt: Point) {
    this.points.push(pt);
    if (!this.rect) {
      this.rect = new Rect(0, 0, 0, 0);
    }

    this.points.forEach((p: Point) => {
      if (!this.rect.x || this.rect.x > p.x) {
        this.rect.x = p.x;
      }
      if (!this.rect.y || this.rect.y > p.y) {
        this.rect.y = p.y;
      }
      if (this.rect.ex < p.x) {
        this.rect.ex = p.x;
      }
      if (this.rect.ey < p.y) {
        this.rect.ey = p.y;
      }
    });

    this.rect.width = this.rect.ex - this.rect.x;
    this.rect.height = this.rect.ey - this.rect.y;
  }

  nearestAnchor(pt: Point) {
    let dis = 99999;
    let index = 0;
    for (let i = 0; i < this.rotatedAnchors.length; ++i) {
      const d = distance(pt, this.rotatedAnchors[i]);
      if (dis > d) {
        dis = d;
        index = i;
      }
    }

    return {
      index,
      direction: this.rotatedAnchors[index].direction,
    };
  }

  hitInSelf(point: { x: number; y: number }, padding = 0) {
    if (this.rotate % 360 === 0) {
      return this.rect.hit(point, padding);
    }

    const pts = this.rect.toPoints();
    for (const pt of pts) {
      pt.rotate(this.rotate, this.rect.center);
    }
    return pointInRect(point, pts);
  }

  hit(pt: { x: number; y: number }, padding = 0) {
    let node: any;
    if (this.hitInSelf(pt, padding)) {
      node = this;
    }

    if (this.children) {
      const len = this.children.length;
      for (let i = len - 1; i > -1; --i) {
        const pen = this.children[i];
        const p = pen.hit(pt, padding);
        if (p) {
          node = p;
          break;
        }
      }
    }

    return node;
  }

  round() {
    this.rect.round();
    if (this.children) {
      for (const item of this.children) {
        item.rect.round();
      }
    }
  }

  clone() {
    const n = new Node(this);
    n.setTID(this.TID);
    n.elementRendered = false;
    n.elementLoaded = false;
    if (this.name !== 'div') {
      n.elementId = '';
    }
    return n;
  }
}
