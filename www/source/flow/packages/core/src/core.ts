import { Store, Observer } from 'le5le-store';
// https://github.com/developit/mitt
import { default as mitt, Emitter, EventType, Handler } from 'mitt';
import { Options, KeyType, KeydownType, DefalutOptions, Padding, fontKeys } from './options';
import { Pen, PenType } from './models/pen';
import { Node } from './models/node';
import { Point } from './models/point';
import { Line } from './models/line';
import { createData, TopologyData } from './models/data';
import { Lock, AnchorMode } from './models/status';
import { drawNodeFns, drawLineFns, calcTextRect } from './middles';
import { Offscreen } from './offscreen';
import { RenderLayer } from './renderLayer';
import { HoverLayer } from './hoverLayer';
import { ActiveLayer } from './activeLayer';
import { AnimateLayer } from './animateLayer';
import { DivLayer } from './divLayer';
import { Rect } from './models/rect';
import { s8 } from './utils/uuid';
import { del, find, getParent, pointInRect } from './utils/canvas';
import { getBboxOfPoints, getMoreRect, getRect } from './utils/rect';
import { formatPadding } from './utils/padding';
import { Socket } from './socket';
import { MQTT } from './mqtt';
import { Direction, EventType as SocketEventType } from './models';
import { createCacheTable, getCache, isMobile, pushCache, spliceCache } from './utils';
import pkg from './../package.json';
import { Scroll } from './models/scroll';

declare const window: any;

const resizeCursors = ['nw-resize', 'ne-resize', 'se-resize', 'sw-resize'];
enum MoveInType {
  None,
  Line,
  LineFrom,
  LineTo,
  LineControlPoint,
  Nodes,
  ResizeCP,
  HoverAnchors,
  AutoAnchor,
  Rotate,
  GraffitiReady,
  Graffiti,
  LinesReady,
  Lines,
}

interface ICaches {
  index: number;
  dbIndex: number;   // indexDB 中实际的 index
  list: TopologyData[];
}

const dockOffset = 10;

export class Topology {
  VERSION: string = pkg.version;
  id = s8();
  data: TopologyData = createData(undefined, this.id);
  clipboard: TopologyData;
  caches: ICaches = {
    index: 0,
    dbIndex: 0,
    list: [],
  };
  options: Options;
  cacheTimer:any;

  parentElem: HTMLElement;
  canvas: RenderLayer;
  offscreen: Offscreen;
  hoverLayer: HoverLayer;
  activeLayer: ActiveLayer;
  animateLayer: AnimateLayer;
  divLayer: DivLayer;

  private subcribe: Observer;
  private subcribeRender: Observer;
  private subcribeImage: Observer;
  private imageTimer: any;
  private subcribeAnimateEnd: Observer;
  private subcribeAnimateMoved: Observer;
  private subcribeMediaEnd: Observer;
  private subcribeEmit: Observer;

  touchedNode: any;
  lastHoverNode: Node;
  lastHoverLine: Line;
  touches?: TouchList;
  touchScale?: number;
  touchStart = 0;
  touchCenter?: { x: number; y: number };

  input = document.createElement('textarea');
  inputObj: Pen;
  mouseDown: { x: number; y: number; restore?: boolean };
  spaceDown: boolean;
  lastTranlated = { x: 0, y: 0 };
  moveIn: {
    type: MoveInType;
    activeAnchorIndex: number;
    hoverAnchorIndex: number;
    hoverNode: Node;
    hoverLine: Line;
    activeNode: Node;
    lineControlPoint: Point;
  } = {
    type: MoveInType.None,
    activeAnchorIndex: 0,
    hoverAnchorIndex: 0,
    hoverNode: undefined,
    hoverLine: undefined,
    activeNode: undefined,
    lineControlPoint: undefined,
  };
  canvasPos?: DOMRect;

  needCache = false;

  private tip = '';
  private raf: number;
  tipMarkdown: HTMLElement;
  tipMarkdownContent: HTMLElement;
  tipMarkdownArrowUp: HTMLElement;
  tipMarkdownArrowDown: HTMLElement;
  tipElem: HTMLElement;

  socket: Socket;
  mqtt: MQTT;
  scrollDom: Scroll;

  // 内存中的 caches 数量
  get ramCaches() : number {
    return 5;
  }

  // 需要清除 elementId 的图形，复制时用
  get clearElementIdPensName(): string[]{
    return ['echarts', 'textbox'];
  }

  private socketFn: Function;

  _emitter: Emitter;

  private scheduledAnimationFrame = false;
  private scrolling = false;
  private rendering = false;
  private actionTimer: any;

  // true 已经复制
  private alreadyCopy: boolean = false;
  constructor(parent: string | HTMLElement, options: Options = {}) {
    this._emitter = mitt();
    this.options = Object.assign({}, DefalutOptions, options);
    Store.set(this.generateStoreKey('LT:color'), this.options.color || '#222222');
    Store.set(this.generateStoreKey('LT:fontColor'), this.options.fontColor || '#222222');

    this.setupDom(parent);
    this.setupSubscribe();
    this.setupMouseEvent();

    // Wait for parent dom load
    setTimeout(() => {
      this.canvasPos = this.divLayer.canvas.getBoundingClientRect();
    }, 500);
    setTimeout(() => {
      this.canvasPos = this.divLayer.canvas.getBoundingClientRect();
    }, 1000);

    this.cache();

    window.topology = this;
    this.dispatch('loaded');
  }

  private setupDom(parent: string | HTMLElement) {
    if (typeof parent === 'string') {
      this.parentElem = document.getElementById(parent);
    } else {
      this.parentElem = parent;
    }
    this.parentElem.style.position = 'relative';
    this.parentElem.style.overflow = 'auto';
    this.parentElem.onresize = this.winResize;
    window.addEventListener('resize', this.winResize);

    const id = this.id;
    this.activeLayer = new ActiveLayer(this.options, id);
    this.activeLayer.topology = this;
    this.hoverLayer = new HoverLayer(this.options, id);
    this.animateLayer = new AnimateLayer(this.options, id);
    this.offscreen = new Offscreen(this.parentElem, this.options, id);
    this.canvas = new RenderLayer(this.parentElem, this.options, id);
    this.divLayer = new DivLayer(this.parentElem, this.options, id);
    this.options.scroll && (this.scrollDom = new Scroll(this));

    this.input.style.position = 'absolute';
    this.input.style.zIndex = '-1';
    this.input.style.left = '-1000px';
    this.input.style.width = '0';
    this.input.style.height = '0';
    this.input.style.outline = 'none';
    this.input.style.border = '1px solid #cdcdcd';
    this.input.style.resize = 'none';
    this.parentElem.appendChild(this.input);

    this.createMarkdownTip();

    this.resize();
  }

  private setupSubscribe() {
    this.subcribe = Store.subscribe(this.generateStoreKey('LT:render'), () => {
      this.render();
    });
    this.subcribeRender = Store.subscribe('LT:render', () => {
      this.render();
    });
    this.subcribeImage = Store.subscribe(this.generateStoreKey('LT:imageLoaded'), () => {
      if (this.imageTimer) {
        clearTimeout(this.imageTimer);
      }
      this.imageTimer = setTimeout(() => {
        this.render();
      }, 100);
    });
    this.subcribeAnimateMoved = Store.subscribe(this.generateStoreKey('LT:rectChanged'), (e: any) => {
      this.activeLayer.updateLines([e]);
    });
    this.subcribeMediaEnd = Store.subscribe(this.generateStoreKey('mediaEnd'), (node: Node) => {
      if (node.nextPlay) {
        this.animateLayer.readyPlay(node.nextPlay);
        this.animateLayer.animate();
      }
      this.dispatch('mediaEnd', node);
    });
    this.subcribeAnimateEnd = Store.subscribe(this.generateStoreKey('animateEnd'), (pen: Pen) => {
      if (!pen) {
        return;
      }
      switch (pen.type) {
        case PenType.Node:
          this.offscreen.render();
          break;
      }
      this.dispatch('animateEnd', pen);
    });
    this.subcribeEmit = Store.subscribe(
      this.generateStoreKey('LT:emit'),
      (e: { event: string; pen: Pen; params: string }) => {
        // TODO: 此处为何不使用 dispatch
        this.emit(e.event, e);
      }
    );
  }

  private setupMouseEvent() {
    this.canvasPos = this.divLayer.canvas.getBoundingClientRect();
    this.parentElem.addEventListener('scroll', this.onScroll);
    window.addEventListener('scroll', this.onScroll);

    this.divLayer.canvas.ondragover = (event) => event.preventDefault();
    this.divLayer.canvas.ondrop = (event) => {
      if (this.data.locked) {
        return;
      }
      try {
        const json = event.dataTransfer.getData('Topology') || event.dataTransfer.getData('Text');
        if (!json) return;
        const obj = JSON.parse(json);
        event.preventDefault();

        const pt = this.calibrateMouse({x: event.offsetX, y: event.offsetY});
        this.dropNodes(
          Array.isArray(obj) ? obj : [obj],
          pt.x,
          pt.y
        );
        this.activeLayer.calcActiveRect();
      } catch { }
    };

    if (isMobile()) {
      this.options.refresh = 50;

      // ipad
      document.addEventListener('gesturestart', this.preventDefault);
      // end

      this.divLayer.canvas.ontouchstart = (event) => {
        this.touchStart = Date.now();
        const pos = new Point(
          event.changedTouches[0].pageX - window.scrollX - (this.canvasPos.left || this.canvasPos.x),
          event.changedTouches[0].pageY - window.scrollY - (this.canvasPos.top || this.canvasPos.y)
        );

        if (event.touches.length > 1) {
          this.touches = event.touches;
          this.touchScale = this.data.scale;

          this.lastTranlated.x = pos.x;
          this.lastTranlated.y = pos.y;

          return;
        }

        const pt = this.calibrateMouse({x: pos.x, y: pos.y});
        this.getMoveIn(pt);
        this.hoverLayer.node = this.moveIn.hoverNode;
        this.hoverLayer.line = this.moveIn.hoverLine;

        this.lastTranlated.x = pos.x;
        this.lastTranlated.y = pos.y;
        this.onmousedown({
          x: pos.x,
          y: pos.y,
          ctrlKey: event.ctrlKey || event.metaKey,
          shiftKey: event.shiftKey,
          altKey: event.altKey,
          button: 0,
        });
      };

      this.divLayer.canvas.ontouchmove = (event) => {
        event.stopPropagation();

        const touches = event.changedTouches;
        const len = touches.length;
        if (!this.touchCenter && len > 1) {
          this.touchCenter = {
            x: touches[0].pageX + (touches[1].pageX - touches[0].pageX) / 2,
            y: touches[0].pageY + (touches[1].pageY - touches[0].pageY) / 2,
          };
          // 计算鼠标位置根据画布偏移
          this.calibrateMouse(this.touchCenter);
        }

        const timeNow = Date.now();
        if (timeNow - this.touchStart < 50) {
          return;
        }

        if (len > 1) {
          if (len === 2) {
            const scale =
              (event as any).scale ||
              Math.hypot(touches[0].pageX - touches[1].pageX, touches[0].pageY - touches[1].pageY) /
                Math.hypot(
                  this.touches[0].pageX - this.touches[1].pageX,
                  this.touches[0].pageY - this.touches[1].pageY
                );
            event.preventDefault();
            this.scaleTo(scale * this.touchScale, this.touchCenter);
          } else if (len === 3) {
            const pos = new Point(
              touches[0].pageX - window.scrollX - (this.canvasPos.left || this.canvasPos.x),
              touches[0].pageY - window.scrollY - (this.canvasPos.top || this.canvasPos.y)
            );

            this.translate(pos.x, pos.y, true);
          }

          return;
        }

        event.preventDefault();

        const pos = new Point(
          event.changedTouches[0].pageX - window.scrollX - (this.canvasPos.left || this.canvasPos.x),
          event.changedTouches[0].pageY - window.scrollY - (this.canvasPos.top || this.canvasPos.y)
        );

        this.onMouseMove({
          x: pos.x,
          y: pos.y,
          ctrlKey: event.ctrlKey || event.metaKey,
          shiftKey: event.shiftKey,
          altKey: event.altKey,
          buttons: 1,
        });
      };

      this.divLayer.canvas.ontouchend = (event) => {
        this.touches = undefined;
        this.ontouchend(event);
      };
    } else {
      this.divLayer.canvas.onmousedown = (event: MouseEvent) => {
        if((event.target as any).nodeName ==='INPUT' && (event.target as any).type ==='range' && this.data.locked){
          return;
        }

        if (this.touchedNode) {
          if (this.touchedNode.name === 'graffiti') {
            this.touchedNode.rect = new Rect(0, 0, 0, 0);
            this.addNode(this.touchedNode);
            this.touchedNode = undefined;
          } else if (this.touchedNode.name === 'lines') {
            this.addLine(this.touchedNode);
            this.touchedNode = undefined;
          }
        }

        const e = {
          x: event.pageX - window.scrollX - (this.canvasPos.left || this.canvasPos.x),
          y: event.pageY - window.scrollY - (this.canvasPos.top || this.canvasPos.y),
          ctrlKey: event.ctrlKey || event.metaKey,
          shiftKey: event.shiftKey,
          altKey: event.altKey,
          button: event.button,
          pageX:event.pageX,
          pageY:event.pageY
        };
        this.lastTranlated.x = e.x;
        this.lastTranlated.y = e.y;
        this.onmousedown(e);
      };
      this.divLayer.canvas.onmousemove = (event: MouseEvent) => {
        this.onMouseMove({
          x: event.pageX - window.scrollX - (this.canvasPos.left || this.canvasPos.x),
          y: event.pageY - window.scrollY - (this.canvasPos.top || this.canvasPos.y),
          ctrlKey: event.ctrlKey || event.metaKey,
          shiftKey: event.shiftKey,
          altKey: event.altKey,
          buttons: event.buttons,
          pageX: event.pageX,
          pageY: event.pageY,
        });
      };
      this.divLayer.canvas.onmouseup = (event: MouseEvent) => {
        const e = {
          x: event.pageX - window.scrollX - (this.canvasPos.left || this.canvasPos.x),
          y: event.pageY - window.scrollY - (this.canvasPos.top || this.canvasPos.y),
          ctrlKey: event.ctrlKey || event.metaKey,
          shiftKey: event.shiftKey,
          altKey: event.altKey,
          button: event.button,
        };
        this.onmouseup(e);

        if (!this.touchedNode) {
          return;
        }

        this.touchedNode.rect.x = event.pageX - window.scrollX - this.canvasPos.x - this.touchedNode.rect.width / 2;
        this.touchedNode.rect.y = event.pageY - window.scrollY - this.canvasPos.y - this.touchedNode.rect.height / 2;

        const node = new Node(this.touchedNode);
        this.addNode(node, true);
        this.touchedNode = undefined;
      };
    }

    this.divLayer.canvas.ondblclick = this.ondblclick;
    this.divLayer.canvas.tabIndex = 0;
    this.divLayer.canvas.onblur = () => {
      this.mouseDown = undefined;
    };
    this.divLayer.canvas.onwheel = (event) => {
      if (this.options.scroll && !event.ctrlKey && this.scrollDom) {
        this.scrollDom.wheel(event.deltaY < 0);
        return;
      }
      if(this.data.locked === Lock.NoEvent) return;
      const timeNow = new Date().getTime();
      if (timeNow - this.touchStart < 20) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      this.touchStart = new Date().getTime();

      if (this.options.disableScale) {
        return;
      }
      switch (this.options.scaleKey) {
        case KeyType.Ctrl:
          if (!event.ctrlKey && !event.metaKey) {
            return;
          }
          break;
        case KeyType.Shift:
          if (!event.shiftKey) {
            return;
          }
          break;
        case KeyType.Alt:
          if (!event.altKey) {
            return;
          }
          break;
      }

      event.preventDefault();
      event.stopPropagation();

      const pos = new Point(
        event.x - window.scrollX - (this.canvasPos.left || this.canvasPos.x),
        event.y - window.scrollY - (this.canvasPos.top || this.canvasPos.y)
      );
      // 计算鼠标位置根据画布偏移
      this.calibrateMouse(pos);
      let scale = this.data.scale;
      if (event.deltaY < 0) {
        scale += 0.1;
      } else {
        scale -= 0.1;
      }
      this.scaleTo(scale, pos);
      this.divLayer.canvas.focus();

      return false;
    };

    switch (this.options.keydown) {
      case KeydownType.Document:
        document.addEventListener('keydown', this.onkeydown);
        document.addEventListener('keyup', () => {
          this.spaceDown = false;
        });
        break;
      case KeydownType.Canvas:
        this.divLayer.canvas.addEventListener('keydown', this.onkeydown);
        break;
    }
  }

  private onScroll = () => {
    this.canvasPos = this.divLayer.canvas.getBoundingClientRect();
  };

  private preventDefault = (event: any) => {
    event.preventDefault();
  };

  private ontouchend(event: TouchEvent) {
    const pos = new Point(
      event.changedTouches[0].pageX - window.scrollX - (this.canvasPos.left || this.canvasPos.x),
      event.changedTouches[0].pageY - window.scrollY - (this.canvasPos.top || this.canvasPos.y)
    );

    this.onmouseup({
      x: pos.x,
      y: pos.y,
      ctrlKey: event.ctrlKey || event.metaKey,
      shiftKey: event.shiftKey,
      altKey: event.altKey,
      button: 0,
    });

    if (!this.touchedNode) {
      return;
    }

    this.touchedNode.rect.x =
      event.changedTouches[0].pageX - window.scrollX - this.canvasPos.x - this.touchedNode.rect.width / 2;
    this.touchedNode.rect.y =
      event.changedTouches[0].pageY - window.scrollY - this.canvasPos.y - this.touchedNode.rect.height / 2;

    const node = new Node(this.touchedNode);
    this.addNode(node, true);
    this.touchedNode = undefined;
  }

  winResize = () => {
    let timer: any;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      this.resize();
    }, 100);
  };

  resize(size?: { width: number; height: number }) {
    this.canvas.resize(size);
    this.offscreen.resize(size);
    this.divLayer.resize(size);

    this.render();
    this.dispatch('resize', size);

    if (this.scrollDom && this.scrollDom.isShow) {
      this.scrollDom.init();
    }
  }

  dropNodes(jsonList: any[], offsetX: number, offsetY: number) {
    let x = 0,
      y = 0;
    if (jsonList.length && jsonList[0].rect) {
      const rect = jsonList[0].rect;
      x = rect.x;
      y = rect.y;
    }
    let firstNode;
    jsonList.forEach((json) => {
      json.id = s8();
      if (json.name === 'graffiti') {
        json.rect = new Rect(0, 0, 0, 0);
        this.addNode(json);
        return;
      } else if (json.name === 'lines') {
        this.addLine(json);
        this.mouseDown = {
          x: offsetX,
          y: offsetY,
        };
        this.onmouseup(this.mouseDown);
        return;
      }

      if (!firstNode) {
        json.rect.x = (offsetX - json.rect.width / 2) << 0;
        json.rect.y = (offsetY - json.rect.height / 2) << 0;
        firstNode = json;
      } else {
        //Layout relative to the first node
        const rect = json.rect;
        const dx = rect.x - x,
          dy = rect.y - y;
        json.rect.x = firstNode.rect.x + dx;
        json.rect.y = firstNode.rect.y + dy;
      }

      if (json.type === PenType.Line) {
        this.addLine(
          Object.assign(
            {
              name: 'line',
              from: new Point(json.rect.x, json.rect.y),
              fromArrow: this.data.fromArrow,
              to: new Point(json.rect.x + json.rect.width, json.rect.y + json.rect.height),
              toArrow: this.data.toArrow,
              strokeStyle: this.options.color,
            },
            json
          ),
          true
        );
      } else {
        this.addNode(json, true);
      }
    });

    this.divLayer.canvas.focus();
  }

  addNode(node: Node | any, focus = false) {
    if (!drawNodeFns[node.name]) {
      return null;
    }

    node.TID = this.id;

    // if it's not a Node
    if (!node.init) {
      node = new Node(node);
    }

    if (!node.strokeStyle && this.options.color) {
      node.strokeStyle = this.options.color;
    }

    fontKeys.forEach((key: string) => {
      if (!node[key]) {
        node[key] = this.options[key];
      }
    });

    if (this.data.scale !== 1) {
      node.scale(this.data.scale);
    }

    this.data.pens.push(node);

    if (focus) {
      // fix bug: add echart
      if (node.name === 'echarts') {
        setTimeout(() => {
          this.activeLayer.pens = [node];
          this.render();
        }, 50);
      } else {
        this.activeLayer.pens = [node];
      }
    }

    if (node.name !== 'graffiti' || !node.doing) {
      this.render();
      this.animate(true);
      this.cache();
    } else {
      this.moveIn.type = MoveInType.Graffiti;
      this.moveIn.hoverNode = node;
    }

    this.dispatch('addNode', node);

    return node;
  }

  addLine(line: any, focus = false) {
    if (line.type === PenType.Node) {
      line.isNode = true;
    }

    line.TID = this.id;
    if (!line.clone) {
      line = new Line(line);
      line.calcControlPoints(true);
    }

    if (this.data.scale !== 1) {
      if (line.name !== 'lines') {
        line.scale(this.data.scale, line.getCenter());
      } else {
        line.fontSize *= this.data.scale;
      }
    }
    this.data.pens.push(line);

    if (line.name !== 'lines' || !line.doing) {
      if (focus) {
        this.activeLayer.setPens([line]);
        this.render();
        this.animate(true);
        this.cache();
        this.dispatch('addLine', line);
      }
    } else {
      this.activeLayer.clear();
      this.hoverLayer.line = undefined;
      this.moveIn.type = MoveInType.Lines;
      this.moveIn.hoverLine = line;
    }

    return line;
  }

  // Render or redraw
  render(noFocus?: boolean) {
    if (noFocus) {
      this.activeLayer.pens = [];
      this.hoverLayer.node = undefined;
      this.hoverLayer.line = undefined;
    }
    if (this.rendering) {
      return this;
    }
    this.rendering = true;
    // 获取 ctx 对象
    const ctx= this.offscreen.canvas.getContext('2d');
    ctx.clearRect(0,0,this.offscreen.canvas.width,this.offscreen.canvas.height);
    ctx.save();
    ctx.translate(this.data.x,this.data.y);
    this.offscreen.render();
    ctx.restore();
    this.canvas.render();
    this.rendering = false;
  }

  calibrateMouse = (pt: {x : number, y: number}) => {
    pt.x -= this.data.x;
    pt.y -= this.data.y;

    return pt;
  };

  // open - redraw by the data
  open(data?: TopologyData | string) {
    if (typeof data !== 'string' && data && data.mqttOptions && !data.mqttOptions.customClientId) {
      data.mqttOptions.clientId = s8();
    }
    this.canvas.clearBkImg();
    this.data = createData(data, this.id);
    this.subscribeSocket();

    Store.set(this.generateStoreKey('LT:scale'), this.data.scale);
    this.dispatch('scale', this.data.scale);
    Store.set('LT:bkColor', this.data.bkColor);
    this.lock(this.data.locked);

    this.caches.list = [];
    createCacheTable();  // 清空数据
    this.caches.dbIndex = -1;
    this.cache();

    this.divLayer.clear();
    this.animateLayer.stop();
    this.render(true);

    this.parentElem.scrollLeft = 0;
    this.parentElem.scrollTop = 0;

    this.animate(true);
    this.openSocket();
    this.openMqtt();

    this.doInitJS();
    this.dispatch('opened');

    if (this.scrollDom && this.scrollDom.isShow) {
      this.scrollDom.init();
    }
  }

  /**
   * 执行初始化函数 initJS
   * */
  private doInitJS() {
    if (this.data.initJS && this.data.initJS.trim()) {
      // 字符串类型存在
      const fn = new Function(this.data.initJS);
      fn();
    }
  }

  subscribeSocket = () => {
    if (!this.data.socketFn) {
      return false;
    }

    if (!this.data.socketEvent) {
      this.data.socketEvent = true;
    }
    try {
      const socketFn = new Function('e', this.data.socketFn);
      if (this.socketFn) {
        this.off('websocket', this.socketFn as any);
        this.off('mqtt', this.socketFn as any);
      }
      this.on('websocket', socketFn as any);
      this.on('mqtt', socketFn as any);
      this.socketFn = socketFn;
    } catch (e) {
      console.error('Create the function for socket:', e);
      return false;
    }

    return true;
  };

  openSocket(url?: string) {
    this.closeSocket();
    if (url || this.data.websocket) {
      this.socket = new Socket(url || this.data.websocket, (e) => {
        if (this.data.socketEvent !== 1) {
          this.doSocket(e.data);
        }
        this.data.socketEvent && this.dispatch('websocket', e.data);
      });
    }
  }

  closeSocket() {
    if (this.socket) {
      this.socket.close();
    }
  }

  openMqtt(url?: string, options?: any) {
    this.closeMqtt();
    if (url || this.data.mqttUrl) {
      this.mqtt = new MQTT(
        url || this.data.mqttUrl,
        options || this.data.mqttOptions,
        this.data.mqttTopics,
        (topic: string, message: any) => {
          if (this.data.socketEvent !== 1) {
            this.doSocket(message.toString(), SocketEventType.Mqtt);
          }
          this.data.socketEvent && this.dispatch('mqtt', { topic, message });
        }
      );
    }
  }

  closeMqtt() {
    if (this.mqtt) {
      this.mqtt.close();
    }
  }

  doSocket(message: any, type = SocketEventType.WebSocket) {
    try {
      message = JSON.parse(message);
      if (!Array.isArray(message)) {
        message = [message];
      }
      message.forEach((item: any) => {
        let actions = [];

        if (item.actions) {
          actions = item.actions;
          delete item.actions;
        }

        const pens = find(item.id || item.tag, this.data.pens);
        pens.forEach((pen) => {
          if (pen.id === item.id || (pen.tags && pen.tags.indexOf(item.tag) > -1)) {
            pen.fromData(pen, item);
            pen.doWheres();

            if (pen.events) {
              pen.events.forEach((event) => {
                if (event.type === type) {
                  event.params = item;
                  actions.push(event);
                }
              });
            }
            actions &&
              actions.forEach((action: any) => {
                pen.doAction(action);
              });
          }
        });

        this.willRender();
      });
    } catch (error) {
      console.warn(error);
    }
  }

  overflow(padding = 50) {
    const rect = this.getRect();
    let { width, height } = rect;
    if (width < rect.ex) {
      width = rect.ex + padding;
    }
    if (width < this.canvas.width) {
      width = this.canvas.width;
    }
    if (height < rect.ey) {
      height = rect.ey + padding;
    }
    if (height < this.canvas.height) {
      height = this.canvas.height;
    }
    const size = { width, height };
    this.resize(size);
    return size;
  }

  private setNodeText() {
    this.inputObj.text = this.input.value;
    if (this.inputObj.name === 'image') {
      (this.inputObj as Node).init();
    }
    this.input.style.zIndex = '-1';
    this.input.style.left = '-1000px';
    this.input.style.width = '0';
    this.cache();
    this.offscreen.render();

    this.dispatch('setText', this.inputObj);

    this.inputObj = undefined;
  }

  onMouseMove = (e: {
    x: number;
    y: number;
    buttons?: number;
    ctrlKey?: boolean;
    shiftKey?: boolean;
    altKey?: boolean;
    pageX?: number;
    pageY?: number;
  }) => {
    if (this.scheduledAnimationFrame || this.data?.locked === Lock.NoEvent) {
      return;
    }

    // https://caniuse.com/#feat=mdn-api_mouseevent_buttons
    if (this.mouseDown && !this.mouseDown.restore && e.buttons !== 1 && e.buttons !== 2) {
      // 防止异常情况导致mouseup事件没有触发
      this.onmouseup(e);
      return;
    }

    if (this.mouseDown && (this.data.locked || this.spaceDown || !this.moveIn.type)) {
      let b = !!this.data.locked;
      switch (this.options.translateKey) {
        case KeyType.Right:
          if (e.buttons == 2) {
            b = true;
          }
          break;
        case KeyType.Any:
          b = true;
          break;
        case KeyType.Ctrl:
          if (e.ctrlKey) {
            b = true;
          }
          break;
        case KeyType.Shift:
          if (e.shiftKey) {
            b = true;
          }
          break;
        case KeyType.Alt:
          if (e.altKey) {
            b = true;
          }
          break;
        default:
          if (e.ctrlKey || e.altKey || e.buttons == 2) {
            b = true;
          }
      }

      if (this.spaceDown || (!this.options.disableTranslate && b && this.data.locked < Lock.NoMove)) {
        this.translate(e.x, e.y, true);
        return false;
      }
    }

    if (this.data.locked && this.mouseDown) {
      return;
    }

    this.scheduledAnimationFrame = true;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(() => {
      this.raf = undefined;

      const pt = this.calibrateMouse({ x: e.x, y: e.y });
      if (this.moveIn.type === MoveInType.Lines) {  // 钢笔工具
        if (this.hoverLayer.line) {
          this.hoverLayer.lineTo(new Point(pt.x, pt.y), '');
          if (e.shiftKey || e.ctrlKey || e.altKey || e.buttons == 2) {
            this.hoverLayer.line.name = 'curve';
            this.hoverLayer.line.calcControlPoints();
          } else {
            this.hoverLayer.line.name = 'line';
          }

          this.render();
        }
        this.scheduledAnimationFrame = false;
        return;
      }

      if (!this.mouseDown) {
        this.getMoveIn(pt);

        // Render hover anchors.
        if (this.moveIn.hoverNode !== this.lastHoverNode) {
          if (this.lastHoverNode) {
            this.lastHoverNode.moveOut();
            // Send a move event.
            this.dispatch('moveOutNode', this.lastHoverNode);

            this.hideTip();

            // Clear hover anchors.
            this.hoverLayer.node = undefined;
          }
          if (this.moveIn.hoverNode) {
            this.hoverLayer.node = this.moveIn.hoverNode;
            this.moveIn.hoverNode.moveIn();

            // Send a move event.
            this.dispatch('moveInNode', Object.assign(this.moveIn.hoverNode, {
              evs: {
                x: e.pageX,
                y: e.pageY,
              }
            }));

            this.showTip(this.moveIn.hoverNode, pt);
          }
        }

        if (this.moveIn.hoverLine !== this.lastHoverLine && !this.moveIn.hoverNode) {
          if (this.lastHoverLine) {
            this.lastHoverLine.moveOut();
            this.dispatch('moveOutLine', this.lastHoverLine);
            this.hideTip();
          }
          if (this.moveIn.hoverLine) {
            this.hoverLayer.line = this.moveIn.hoverLine;
            this.moveIn.hoverLine.moveIn();
            this.dispatch('moveInLine', Object.assign(this.moveIn.hoverLine,{
              evs: {
                x: e.pageX,
                y: e.pageY,
              }
            }));

            this.showTip(this.moveIn.hoverLine, pt);
          }
        }

        if (this.moveIn.type === MoveInType.LineControlPoint) {
          this.hoverLayer.hoverLineCP = this.moveIn.lineControlPoint;
        } else if (this.hoverLayer.hoverLineCP) {
          this.hoverLayer.hoverLineCP = undefined;
        }
        if (
          this.moveIn.hoverNode !== this.lastHoverNode ||
          this.moveIn.type === MoveInType.HoverAnchors ||
          this.hoverLayer.lasthoverLineCP !== this.hoverLayer.hoverLineCP
        ) {
          this.hoverLayer.lasthoverLineCP = this.hoverLayer.hoverLineCP;
          this.render();
        }

        this.scheduledAnimationFrame = false;
        return;
      }

      // Move out parent element.
      const moveOutX =
        e.x + 50 > this.parentElem.clientWidth + this.parentElem.scrollLeft;
      const moveOutY =
        e.y + 50 > this.parentElem.clientHeight + this.parentElem.scrollTop;
      if (!this.options.disableMoveOutParent && (moveOutX || moveOutY)) {
        this.dispatch('moveOutParent', e);

        let x = 0;
        let y = 0;
        if (e.x + 50 > this.divLayer.canvas.clientWidth) {
          x = -5;
        }
        if (e.y + 50 > this.divLayer.canvas.clientHeight) {
          y = -5;
        }
        this.translate(x, y, false);
      }
      this.hideTip();
      switch (this.moveIn.type) {
        case MoveInType.None:
          this.hoverLayer.dragRect = new Rect(
            this.mouseDown.x - this.data.x,
            this.mouseDown.y - this.data.y,
            e.x - this.mouseDown.x,
            e.y - this.mouseDown.y
          );
          break;
        case MoveInType.Nodes:
          if (this.activeLayer.locked() || this.data.locked) {
            break;
          }
          if(e.ctrlKey && !this.alreadyCopy){
            // 按住 ctrl，复制一个新节点
            this.alreadyCopy = true;
            this.copy();
            this.paste();
            this.needCache = true;
          } else {
            const x = e.x - this.mouseDown.x;
            const y = e.y - this.mouseDown.y;
            if (x || y) {
              const offset = this.getDockPos(x, y, e.ctrlKey || e.shiftKey || e.altKey);
              this.activeLayer.move(offset.x ? offset.x : x, offset.y ? offset.y : y);
              this.needCache = true;
            }
          }
          break;
        case MoveInType.ResizeCP: {
          const x = e.x - this.mouseDown.x;
          const y = e.y - this.mouseDown.y;
          if (x || y) {
            const offset = this.getDockPos(x, y, e.ctrlKey || e.shiftKey || e.altKey);
            const offsetE = Object.assign({}, e);
            offset.x && (offsetE.x = offset.x + this.mouseDown.x);
            offset.y && (offsetE.y = offset.y + this.mouseDown.y);
            this.activeLayer.resize(this.moveIn.activeAnchorIndex, this.mouseDown, offsetE);
            this.dispatch('resizePens', this.activeLayer.pens);
            this.needCache = true;
          }
          break;
        }
        case MoveInType.LineTo:
        case MoveInType.HoverAnchors:
        case MoveInType.AutoAnchor:
          if (this.hoverLayer.dockAnchor && this.hoverLayer.dockAnchor.hit(e, 10)) {
            break;
          }
          let arrow = this.data.toArrow;
          if (this.moveIn.hoverLine) {
            arrow = this.moveIn.hoverLine.toArrow;
          }
          if (this.hoverLayer.line) {
            arrow = this.hoverLayer.line.toArrow;
          }
          if (this.hoverLayer.line) {
            this.activeLayer.pens = [this.hoverLayer.line];
          }
          let toId = this.hoverLayer.line.to.id;
          if (e.ctrlKey || e.shiftKey || e.altKey) {
            this.hoverLayer.lineTo(new Point(pt.x, pt.y), arrow);
          } else {
            const to = this.getLineDock(new Point(pt.x, pt.y), AnchorMode.In);
            toId = to.id;
            // 即使是自己连接自己，也为 to 配置 anchorIndex
            this.hoverLayer.lineTo(to, arrow);
          }
          this.hoverLayer.line.to.id = toId;
          if (this.hoverLayer.line.parentId) {
            const line = this.find(toId as string) as Line;
            if (line && line.from) {
              line.from.x = this.hoverLayer.line.to.x;
              line.from.y = this.hoverLayer.line.to.y;
            }
          }
          this.needCache = true;
          break;

        case MoveInType.LineFrom:
          let fromId = this.hoverLayer.line.from.id;
          if (e.ctrlKey || e.shiftKey || e.altKey) {
            this.hoverLayer.lineFrom(new Point(pt.x, pt.y));
          } else {
            const from = this.getLineDock(new Point(pt.x, pt.y), AnchorMode.Out);
            fromId = from.id;
            this.hoverLayer.lineFrom(from);
          }
          this.hoverLayer.line.from.id = fromId;
          if (this.hoverLayer.line.parentId) {
            const line = this.find(fromId as string) as Line;
            if (line && line.to) {
              line.to.x = this.hoverLayer.line.from.x;
              line.to.y = this.hoverLayer.line.from.y;
            }
          }
          this.needCache = true;
          break;
        case MoveInType.Line:
          {
            const x = e.x - this.mouseDown.x;
            const y = e.y - this.mouseDown.y;
            if (x || y) {
              this.activeLayer.move(x, y);
              if (this.hoverLayer.line.children) {
                this.animateLayer.updateLines(this.hoverLayer.line.children as Line[]);
              } else {
                this.animateLayer.updateLines([this.hoverLayer.line]);
              }

              this.needCache = true;
            }
          }
          break;
        case MoveInType.LineControlPoint:
          this.moveIn.hoverLine.controlPoints[
            this.moveIn.lineControlPoint.id
          ].x = pt.x;
          this.moveIn.hoverLine.controlPoints[
            this.moveIn.lineControlPoint.id
          ].y = pt.y;
          this.moveIn.hoverLine.textRect = undefined;
          if (drawLineFns[this.moveIn.hoverLine.name] && drawLineFns[this.moveIn.hoverLine.name].dockControlPointFn) {
            drawLineFns[this.moveIn.hoverLine.name].dockControlPointFn(
              this.moveIn.hoverLine.controlPoints[this.moveIn.lineControlPoint.id],
              this.moveIn.hoverLine
            );
          }
          this.needCache = true;
          Store.set(this.generateStoreKey('LT:updateLines'), [this.moveIn.hoverLine]);
          break;
        case MoveInType.Rotate:
          if (this.activeLayer.pens.length) {
            this.activeLayer.offsetRotate(this.getAngle(pt));
            this.activeLayer.updateLines();
          }
          this.needCache = true;
          break;
        case MoveInType.Graffiti:
          this.moveIn.hoverNode.pushPoint(new Point(pt.x, pt.y));
          break;
      }

      this.render();
      this.scheduledAnimationFrame = false;
    });
  };

  onmousedown = (e: {
    x: number;
    y: number;
    button?: number;
    ctrlKey?: boolean;
    shiftKey?: boolean;
    altKey?: boolean;
    pageX?:number,
    pageY?:number
  }) => {
    if (e.button !== 0 && e.button !== 2) return;

    this.mouseDown = e;
    if (e.altKey) {
      this.divLayer.canvas.style.cursor = 'move';
    }

    if (this.inputObj) {
      this.setNodeText();
    }

    switch (this.moveIn.type) {
      // Click the space.
      case MoveInType.None:
        this.activeLayer.clear();
        this.hoverLayer.clear();
        this.dispatch('space', this.mouseDown);
        break;
      // Click a line.
      case MoveInType.Line:
      case MoveInType.LineControlPoint:
        if (e.ctrlKey || e.shiftKey) {
          this.activeLayer.add(this.moveIn.hoverLine);
          this.dispatch('multi', this.activeLayer.pens);
        } else {
          this.activeLayer.pens = [this.moveIn.hoverLine];
          this.dispatch(
            'line' + (e.button === 2 ? 'RightClick' : ''),
            Object.assign(this.moveIn.hoverLine,{
              evs: {
                x: e.pageX,
                y: e.pageY,
              }
            })
          );
        }
        this.hoverLayer.line = this.moveIn.hoverLine;
        this.hoverLayer.initLine = new Line(this.moveIn.hoverLine);
        if (this.data.locked || this.moveIn.hoverLine.locked) {
          this.moveIn.hoverLine.click();
        }

        break;
      // tslint:disable-next-line:no-switch-case-fall-through
      case MoveInType.LineFrom:
      case MoveInType.LineTo:
        this.activeLayer.pens = [this.moveIn.hoverLine];
        this.dispatch('line', this.moveIn.hoverLine);

        this.hoverLayer.line = this.moveIn.hoverLine;

        break;
      case MoveInType.HoverAnchors:
        this.hoverLayer.line = this.addLine({
          name: this.data.lineName,
          from: new Point(
            this.moveIn.hoverNode.rotatedAnchors[this.moveIn.hoverAnchorIndex].x,
            this.moveIn.hoverNode.rotatedAnchors[this.moveIn.hoverAnchorIndex].y,
            this.moveIn.hoverNode.rotatedAnchors[this.moveIn.hoverAnchorIndex].direction,
            this.moveIn.hoverAnchorIndex,
            this.moveIn.hoverNode.id
          ),
          fromArrow: this.data.fromArrow,
          to: new Point(
            this.moveIn.hoverNode.rotatedAnchors[this.moveIn.hoverAnchorIndex].x,
            this.moveIn.hoverNode.rotatedAnchors[this.moveIn.hoverAnchorIndex].y
          ),
          toArrow: this.data.toArrow,
          strokeStyle: this.options.color,
          lineWidth: this.data.lineWidth,
        });
        this.dispatch('anchor', {
          anchor: this.moveIn.hoverNode.rotatedAnchors[this.moveIn.hoverAnchorIndex],
          anchorIndex: this.moveIn.hoverAnchorIndex,
          node: this.moveIn.hoverNode,
          line: this.hoverLayer.line,
        });
        break;

      case MoveInType.AutoAnchor:
        this.hoverLayer.line = this.addLine({
          name: this.data.lineName,
          from: new Point(
            this.moveIn.hoverNode.rect.center.x,
            this.moveIn.hoverNode.rect.center.y,
            Direction.None,
            0,
            this.moveIn.hoverNode.id
          ),
          fromArrow: this.data.fromArrow,
          to: new Point(this.moveIn.hoverNode.rect.center.x, this.moveIn.hoverNode.rect.center.y),
          toArrow: this.data.toArrow,
          strokeStyle: this.options.color,
          lineWidth: this.data.lineWidth,
        });
        this.hoverLayer.line.from.autoAnchor = true;
        this.dispatch('nodeCenter', this.moveIn.hoverNode);
        break;
      // tslint:disable-next-line:no-switch-case-fall-through
      case MoveInType.Nodes:
        if (!this.moveIn.activeNode) {
          break;
        }

        if (e.ctrlKey || e.shiftKey) {
          if (this.moveIn.hoverNode && this.activeLayer.hasInAll(this.moveIn.hoverNode)) {
            this.activeLayer.setPens([this.moveIn.hoverNode]);
            this.dispatch('node' + (e.button === 2 ? 'RightClick' : ''), this.moveIn.hoverNode);
          } else if (!this.activeLayer.has(this.moveIn.activeNode)) {
            this.activeLayer.add(this.moveIn.activeNode);
            if (this.activeLayer.pens.length > 1) {
              this.dispatch('multi', this.activeLayer.pens);
            } else {
              this.dispatch('node' + (e.button === 2 ? 'RightClick' : ''), this.moveIn.activeNode);
            }
          }
        } else if (e.altKey) {
          if (this.moveIn.hoverNode) {
            this.activeLayer.setPens([this.moveIn.hoverNode]);
            this.dispatch('node' + (e.button === 2 ? 'RightClick' : ''), this.moveIn.hoverNode);
          } else if (this.moveIn.hoverLine) {
            this.activeLayer.setPens([this.moveIn.hoverLine]);
            this.dispatch('line', this.moveIn.hoverLine);
          }
        } else if (this.activeLayer.pens.length < 2) {
          this.activeLayer.setPens([this.moveIn.activeNode]);
          this.dispatch(
            'node' + (e.button === 2 ? 'RightClick' : ''),
            Object.assign(this.moveIn.activeNode,{
              evs: {
                x: e.pageX,
                y: e.pageY,
              }
            })
          );
        }

        if (this.data.locked || this.moveIn.activeNode.locked) {
          this.moveIn.activeNode.click();
        }
        this.activeLayer.calcActiveRect();
        break;
      case MoveInType.Graffiti:  // 涂鸦起点
        const pt = this.calibrateMouse({ x: e.x, y: e.y });
        this.moveIn.hoverNode.pushPoint(new Point(pt.x, pt.y));
        break;
    }

    // Save node rects to move.
    if (this.activeLayer.pens.length) {
      this.activeLayer.saveNodeRects();
    }

    this.render();
  };

  onmouseup = (e: {
    x: number;
    y: number;
    button?: number;
    ctrlKey?: boolean;
    shiftKey?: boolean;
    altKey?: boolean;
  }) => {
    if (!this.mouseDown) return;

    this.mouseDown = undefined;
    this.lastTranlated.x = 0;
    this.lastTranlated.y = 0;
    this.hoverLayer.dockAnchor = undefined;
    this.hoverLayer.dockLineX = 0;
    this.hoverLayer.dockLineY = 0;
    this.divLayer.canvas.style.cursor = 'default';
    this.alreadyCopy = false;

    if (this.hoverLayer.dragRect) {
      this.getPensInRect(this.hoverLayer.dragRect);

      if (this.activeLayer.pens && this.activeLayer.pens.length > 1) {
        this.dispatch('multi', this.activeLayer.pens);
      } else if (this.activeLayer.pens && this.activeLayer.pens[0] && this.activeLayer.pens[0].type === PenType.Line) {
        this.dispatch('line' + (e.button === 2 ? 'RightClick' : ''), this.activeLayer.pens[0]);
      } else if (this.activeLayer.pens && this.activeLayer.pens[0] && this.activeLayer.pens[0].type === PenType.Node) {
        this.dispatch('node' + (e.button === 2 ? 'RightClick' : ''), this.activeLayer.pens[0]);
      }
      this.activeLayer.calcActiveRect();
    } else {
      const pt = this.calibrateMouse({ x: e.x, y: e.y });
      switch (this.moveIn.type) {
        case MoveInType.Nodes:
          if (e.ctrlKey && e.shiftKey && e.altKey) {
            if (!this.moveIn.hoverNode.manualAnchors) {
              this.moveIn.hoverNode.manualAnchors = [];
            }

            const point = new Point(pt.x, pt.y);
            point.id = this.moveIn.hoverNode.id;
            this.moveIn.hoverNode.manualAnchors.push(point);
            this.moveIn.hoverNode.calcAnchors();
            this.needCache = true;
          }
          if (this.data.locked || this.moveIn.activeNode.locked) {
            this.moveIn.activeNode.mouseUp();
          }
          break;
        case MoveInType.Line:
        case MoveInType.LineControlPoint:
          if (this.data.locked || this.moveIn.hoverLine.locked) {
            this.moveIn.hoverLine.mouseUp();
          }
          break;

        // Add the line.
        case MoveInType.HoverAnchors:
          // New active.
          if (this.hoverLayer.line) {
            let willAddLine: boolean;
            const { from, to } = this.hoverLayer.line;
            if (this.hoverLayer.line.to.id) {
              if (!this.options.disableRepeatLine) {
                willAddLine = true;
              } else {
                const lines = this.data.pens.filter(
                  (pen) =>
                    pen.type === PenType.Line &&
                    (pen as Line).from.isSameAs(this.hoverLayer.line.from) &&
                    (pen as Line).to.isSameAs(this.hoverLayer.line.to)
                );
                willAddLine = lines.length <= 1;
              }
              // 判断是否是当前锚点连接当前锚点
              if(from.id === to.id && from.anchorIndex === to.anchorIndex){
                willAddLine = false;
              }
            } else {
              willAddLine = !this.options.disableEmptyLine && !this.hoverLayer.line.disableEmptyLine;
              // from 与 to 的距离若小于等于 5 认为是误操作，不会添加连线
              willAddLine = willAddLine && (from.x - to.x) ** 2 + (from.y - to.y) ** 2 > 25;
            }

            if (willAddLine) {
              this.activeLayer.pens = [this.hoverLayer.line];
              this.dispatch('addLine', this.hoverLayer.line);
            } else {
              this.data.pens.pop();
              this.activeLayer.clear();
            }
          }

          this.offscreen.render();

          this.hoverLayer.line = undefined;
          break;
        case MoveInType.AutoAnchor:
          if (
            (this.hoverLayer.line.disableEmptyLine || this.options.disableEmptyLine) &&
            (!this.hoverLayer.line.from.id || !this.hoverLayer.line.to.id)
          ) {
            this.needCache = true;
            this.activeLayer.clear();
            this.data.pens.splice(this.findIndex(this.hoverLayer.line), 1);
          } else {
            this.activeLayer.updateLines();
            this.dispatch('addLine', this.hoverLayer.line);
          }

          break;
        case MoveInType.Rotate:
          this.activeLayer.updateRotate();
          break;

        case MoveInType.LineControlPoint:
          Store.set(this.generateStoreKey('pts-') + this.moveIn.hoverLine.id, undefined);
          break;

        case MoveInType.LineFrom:
        case MoveInType.LineTo:
          if (
            (this.hoverLayer.line.disableEmptyLine || this.options.disableEmptyLine) &&
            (!this.hoverLayer.line.from.id || !this.hoverLayer.line.to.id)
          ) {
            this.needCache = true;
            this.activeLayer.clear();
            this.data.pens.splice(this.findIndex(this.hoverLayer.line), 1);
          }
         if(this.hoverLayer.line.from.id && this.hoverLayer.line.to.id){
            this.dispatch('lineOn', Object.assign(this.hoverLayer.line,{
              lineOnDirection: this.moveIn.type
            }));
          }
          break;
        case MoveInType.Graffiti:
          if (!this.moveIn.hoverNode.points || this.moveIn.hoverNode.points.length < 2) {
            this.moveIn.type = MoveInType.None;
            this.data.pens.pop();
          } else {
            this.moveIn.type = MoveInType.Nodes;
            this.moveIn.hoverNode['doing'] = undefined;
            this.moveIn.hoverNode.calcAnchors();
            this.activeLayer.setPens([this.moveIn.hoverNode]);
            this.hoverLayer.node = this.moveIn.hoverNode;
            this.needCache = true;
          }
          break;
        case MoveInType.Lines:
          let previous: any;
          if (this.moveIn.hoverLine.children && this.moveIn.hoverLine.children.length) {
            previous = this.moveIn.hoverLine.children[this.moveIn.hoverLine.children.length - 1];
          }
          if (!previous) {
            this.moveIn.hoverLine.children = [];
          }
          const line = new Line({
            parentId: this.moveIn.hoverLine.id,
            name: 'line',
            from: new Point(pt.x, pt.y),
            fromArrow: previous ? '' : this.data.fromArrow,
            to: new Point(pt.x, pt.y),
            toArrow: '',
            strokeStyle: this.options.color,
            lineWidth: this.data.lineWidth,
          });
          if (previous) {
            line.from.id = previous.id;
            line.from.x = previous.to.x;
            line.from.y = previous.to.y;
            previous.to.id = line.id;
          }
          this.moveIn.hoverLine.children.push(line);
          this.hoverLayer.line = line;
          this.dispatch('addLineInLines', {previous, line} );
      }
    }

    this.hoverLayer.dragRect = undefined;
    this.activeLayer.lastOffsetX = 0;
    this.activeLayer.lastOffsetY = 0;
    this.render();

    if (this.needCache) {
      this.cache();
    }
    this.needCache = false;
  };

  private ondblclick = () => {
    if (this.moveIn.hoverNode) {
      this.dispatch('dblclick', this.moveIn.hoverNode);
      if (
        !(this.data.locked || this.moveIn.hoverNode.locked || this.moveIn.hoverNode.hideInput || this.options.hideInput)
      ) {
        this.showInput(this.moveIn.hoverNode);
      }
      this.moveIn.hoverNode.dblclick();
    } else if (this.moveIn.hoverLine) {
      this.dispatch('dblclick', this.moveIn.hoverLine);
      if (
        !(this.data.locked || this.moveIn.hoverLine.locked || this.moveIn.hoverLine.hideInput || this.options.hideInput)
      ) {
        this.showInput(this.moveIn.hoverLine);
      }
      this.moveIn.hoverLine.dblclick();
    }
  };

  private onkeydown = (key: KeyboardEvent) => {
    if (
      this.data.locked ||
      (key.target as HTMLElement).tagName === 'INPUT' ||
      (key.target as HTMLElement).tagName === 'TEXTAREA'
    ) {
      return;
    }

    let done = false;
    let moveX = 0;
    let moveY = 0;
    switch (key.key) {
      case ' ':
        this.spaceDown = true;
        break;
      case 'a':
      case 'A':
        this.activeLayer.setPens(this.data.pens);
        done = true;
        break;
      case 'Delete':
      case 'Backspace':
        if (key.ctrlKey || key.metaKey) {
          this.deleteAnchors();
        } else {
          this.delete();
        }
        break;
      case 'ArrowLeft':
        moveX = -5;
        if (key.ctrlKey || key.metaKey) {
          moveX = -1;
        }
        done = true;
        break;
      case 'ArrowUp':
        moveY = -5;
        if (key.ctrlKey || key.metaKey) {
          moveY = -1;
        }
        done = true;
        break;
      case 'ArrowRight':
        moveX = 5;
        if (key.ctrlKey || key.metaKey) {
          moveX = 1;
        }
        done = true;
        break;
      case 'ArrowDown':
        moveY = 5;
        if (key.ctrlKey || key.metaKey) {
          moveY = 1;
        }
        done = true;
        break;
      case 'x':
      case 'X':
        this.cut();
        break;
      case 'c':
      case 'C':
        this.copy();
        break;
      case 'v':
      case 'V':
        this.paste();
        break;
      case 'y':
      case 'Y':
        if (key.ctrlKey || key.metaKey) {
          this.redo();
        }
        break;
      case 'z':
      case 'Z':
        if (key.shiftKey) {
          this.redo();
        } else if (key.ctrlKey || key.metaKey) {
          this.undo();
        }
        break;
      case 'Enter':
        if (this.moveIn.type === MoveInType.Lines) {
          this.moveIn.type = MoveInType.None;
          this.moveIn.hoverLine['doing'] = '';
          if (this.hoverLayer.line.getLen() < 10) {
            this.moveIn.hoverLine.children.pop();
            this.hoverLayer.line = this.moveIn.hoverLine.children[this.moveIn.hoverLine.children.length - 1] as Line;
          }
          if (this.moveIn.hoverLine['isNode']) {
            const pts: any[] = [];
            this.moveIn.hoverLine.children.forEach((l: Line) => {
              pts.push(l.from);
              if (l.controlPoints) {
                l.controlPoints.forEach((pt: Point) => {
                  pt.data = true;
                  pts.push(pt);
                });
              }
              pts.push(l.to);
            });

            const { x1, y1, x2, y2 } = getBboxOfPoints(pts);
            const n = new Node({
              name: 'lines',
              rect: new Rect(x1, y1, x2 - x1, y2 - y1),
              points: pts,
              closePath: this.moveIn.hoverLine['closePath'],
            });
            this.activeLayer.add(n);
            this.data.pens.pop();
            this.data.pens.push(n);
          } else {
            this.hoverLayer.line.toArrow = this.data.toArrow;
            this.activeLayer.add(this.moveIn.hoverLine);
          }
          this.moveIn.hoverLine = undefined;
        }

        done = true;
        break;
      case 'Escape':
        if (this.moveIn.type === MoveInType.Lines) {
          this.moveIn.type = MoveInType.None;
          this.moveIn.hoverLine.children.pop();
          this.hoverLayer.line = this.moveIn.hoverLine.children[this.moveIn.hoverLine.children.length - 1] as Line;
          this.hoverLayer.line.toArrow = this.data.toArrow;
          this.moveIn.hoverLine['doing'] = '';
          this.moveIn.hoverLine = undefined;
        }

        done = true;
        break;
    }

    if (!done) {
      return;
    }

    key.preventDefault();
    key.stopPropagation();

    if (moveX || moveY) {
      this.activeLayer.saveNodeRects();
      this.activeLayer.move(moveX, moveY);
      this.animateLayer.animate();
    }

    this.render();
    this.cache();
  };

  private getMoveIn(pt: { x: number; y: number }) {
    if (this.moveIn.type >= MoveInType.Graffiti) {
      return;
    }
    this.lastHoverNode = this.moveIn.hoverNode;
    this.lastHoverLine = this.moveIn.hoverLine;
    this.moveIn.type = MoveInType.None;
    this.moveIn.hoverNode = undefined;
    this.moveIn.lineControlPoint = undefined;
    this.moveIn.hoverLine = undefined;
    this.hoverLayer.hoverAnchorIndex = -1;

    if (
      !this.data.locked &&
      !(this.activeLayer.pens.length === 1 && this.activeLayer.pens[0].type) &&
      !this.activeLayer.locked() &&
      this.activeLayer.rotateCPs[0] &&
      this.activeLayer.rotateCPs[0].hit(pt, 15)
    ) {
      this.moveIn.type = MoveInType.Rotate;

      const cursor = this.options.rotateCursor;
      this.divLayer.canvas.style.cursor = cursor.includes('/') ? `url("${cursor}"), auto` : cursor;
      return;
    }

    if (this.activeLayer.pens.length > 1 && pointInRect(pt, this.activeLayer.sizeCPs)) {
      this.moveIn.type = MoveInType.Nodes;
    }

    if (!this.data.locked && !this.activeLayer.locked() && !this.options.hideSizeCP) {
      if (
        this.activeLayer.pens.length > 1 ||
        (!this.activeLayer.pens[0].type && !this.activeLayer.pens[0].hideSizeCP)
      ) {
        for (let i = 0; i < this.activeLayer.sizeCPs.length; ++i) {
          if (this.activeLayer.sizeCPs[i].hit(pt, 10)) {
            this.moveIn.type = MoveInType.ResizeCP;
            this.moveIn.activeAnchorIndex = i;
            this.divLayer.canvas.style.cursor = resizeCursors[i];
            return;
          }
        }
      }
    }

    // In active pen.
    if (!this.data.locked) {
      for (const item of this.activeLayer.pens) {
        if (item instanceof Line && !item.locked) {
          for (let i = 0; i < item.controlPoints.length; ++i) {
            if (!item.locked && item.controlPoints[i].hit(pt, 10)) {
              item.controlPoints[i].id = i;
              this.moveIn.type = MoveInType.LineControlPoint;
              this.moveIn.lineControlPoint = item.controlPoints[i];
              this.moveIn.hoverLine = item;
              this.divLayer.canvas.style.cursor = 'pointer';
              return;
            }
          }
          if (this.inLine(pt, item)) {
            return;
          }
        }
      }
    }

    this.divLayer.canvas.style.cursor = 'default';
    const len = this.data.pens.length;
    let inLine: Pen;
    for (let i = len - 1; i > -1; --i) {
      if (this.data.pens[i].type === PenType.Node && this.inNode(pt, this.data.pens[i] as Node)) {
        if (inLine && (this.moveIn.type as any) !== MoveInType.HoverAnchors) {
          this.inLine(pt, inLine as Line);
        }
        return;
      } else if (this.data.pens[i].type === PenType.Line && this.inLine(pt, this.data.pens[i] as Line)) {
        // 优先判断是否在节点锚点上
        inLine = this.data.pens[i];
      }
    }
  }

  inChildNode(pt: { x: number; y: number }, children: Pen[]) {
    if (!children) {
      return null;
    }

    const len = children.length;
    for (let i = len - 1; i > -1; --i) {
      const item = children[i];

      if (!item.visible || item.locked === Lock.NoEvent) {
        continue;
      }

      if (item.type === PenType.Line) {
        if (this.inLine(pt, item as Line)) {
          return item;
        }
        continue;
      }
      let node = this.inChildNode(pt, (item as Node).children);
      if (node) {
        return node;
      }

      node = this.inNode(pt, item as Node, true);
      if (node) {
        return node;
      }
    }

    return null;
  }

  inNode(pt: { x: number; y: number }, node: Node, inChild = false) {
    if (this.data.locked === Lock.NoEvent || !node.visible || node.locked === Lock.NoEvent) {
      return null;
    }

    const child = this.inChildNode(pt, node.children);
    if (child) {
      if (this.moveIn.type < MoveInType.HoverAnchors) {
        this.moveIn.type = MoveInType.Nodes;
        if (child.stand) {
          this.moveIn.activeNode = child;
        } else {
          this.moveIn.activeNode = node;
        }
      }
      return child;
    }

    if (node.hitInSelf(pt)) {
      this.moveIn.hoverNode = node;
      this.moveIn.type = MoveInType.Nodes;
      if (!this.data.locked && !node.locked) {
        this.divLayer.canvas.style.cursor = 'move';
      } else {
        this.divLayer.canvas.style.cursor = this.options.hoverCursor;
      }

      // Too small
      if (
        !this.data.locked &&
        !node.locked &&
        !(this.options.hideAnchor || node.hideAnchor || node.rect.width < 20 || node.rect.height < 20)
      ) {
        for (let j = 0; j < node.rotatedAnchors.length; ++j) {
          if (node.rotatedAnchors[j].hit(pt, this.options.anchorSize)) {
            if (!this.mouseDown && node.rotatedAnchors[j].mode === AnchorMode.In) {
              continue;
            }
            this.moveIn.type = MoveInType.HoverAnchors;
            this.moveIn.hoverAnchorIndex = j;
            this.hoverLayer.hoverAnchorIndex = j;
            this.divLayer.canvas.style.cursor = 'crosshair';
            break;
          }
        }

        if (this.options.autoAnchor && node.rect.center.hit(pt, this.options.anchorSize)) {
          this.moveIn.hoverNode = node;
          this.moveIn.type = MoveInType.AutoAnchor;
          this.divLayer.canvas.style.cursor = 'crosshair';
        }
      }

      if (!inChild) {
        this.moveIn.activeNode = this.moveIn.hoverNode;
      }

      return node;
    }

    if (this.options.hideAnchor || node.hideAnchor || this.data.locked || node.locked) {
      return null;
    }

    if (node.hitInSelf(pt, this.options.anchorSize)) {
      for (let j = 0; j < node.rotatedAnchors.length; ++j) {
        if (node.rotatedAnchors[j].hit(pt, this.options.anchorSize)) {
          if (!this.mouseDown && node.rotatedAnchors[j].mode === AnchorMode.In) {
            continue;
          }
          this.moveIn.hoverNode = node;
          this.moveIn.type = MoveInType.HoverAnchors;
          this.moveIn.hoverAnchorIndex = j;
          this.hoverLayer.hoverAnchorIndex = j;
          this.divLayer.canvas.style.cursor = 'crosshair';

          if (!inChild) {
            this.moveIn.activeNode = node;
          }

          return node;
        }
      }
    }

    return null;
  }

  inLine(point: { x: number; y: number }, line: Line) {
    if (this.data.locked === Lock.NoEvent || !line.visible || line.locked === Lock.NoEvent) {
      return null;
    }

    if (line.children) {
      for (let child of line.children) {
        const l = this.inLine(point, child as Line);
        if (l) {
          return l;
        }
      }
    }

    if (line.from) {
      if (line.from.hit(point, this.options.anchorSize)) {
        this.moveIn.type = MoveInType.LineFrom;
        this.moveIn.hoverLine = line;
        if (this.data.locked || line.locked) {
          this.divLayer.canvas.style.cursor = this.options.hoverCursor;
        } else {
          this.divLayer.canvas.style.cursor = 'move';
        }
        return line;
      }

      if (line.to.hit(point, this.options.anchorSize)) {
        this.moveIn.type = MoveInType.LineTo;
        this.moveIn.hoverLine = line;
        if (this.data.locked || line.locked) {
          this.divLayer.canvas.style.cursor = this.options.hoverCursor;
        } else {
          this.divLayer.canvas.style.cursor = 'move';
        }
        return line;
      }

      if (line.pointIn(point)) {
        this.moveIn.type = MoveInType.Line;
        this.moveIn.hoverLine = line;
        this.divLayer.canvas.style.cursor = this.options.hoverCursor;
        return line;
      }
    }

    return null;
  }

  private getLineDock(point: Point, mode: AnchorMode = AnchorMode.Default) {
    this.hoverLayer.dockAnchor = undefined;
    for (const item of this.data.pens) {
      if (item instanceof Node) {
        const pen = item.hit(point, 10);

        if (!pen) {
          continue;
        }
        if (pen.type === PenType.Line) {
          if (pen.from.hit(point, 10)) {
            point.x = pen.from.x;
            point.y = pen.from.y;
            this.hoverLayer.dockAnchor = pen.from;
            break;
          }

          if (pen.to.hit(point, 10)) {
            point.x = pen.to.x;
            point.y = pen.to.y;
            this.hoverLayer.dockAnchor = pen.to;
            break;
          }

          break;
        }

        this.hoverLayer.node = pen;
        if (this.options.autoAnchor && pen.rect.center.hit(point, 10)) {
          point.id = pen.id;
          point.autoAnchor = true;
          point.x = pen.rect.center.x;
          point.y = pen.rect.center.y;
          this.hoverLayer.dockAnchor = pen.rect.center;
        }

        for (let i = 0; i < pen.rotatedAnchors.length; ++i) {
          if (pen.rotatedAnchors[i].mode && pen.rotatedAnchors[i].mode !== mode) {
            continue;
          }

          if (pen.rotatedAnchors[i].hit(point, 10)) {
            point.id = pen.id;
            point.anchorIndex = i;
            point.autoAnchor = false;
            point.direction = pen.rotatedAnchors[i].direction;
            point.x = pen.rotatedAnchors[i].x;
            point.y = pen.rotatedAnchors[i].y;
            this.hoverLayer.dockAnchor = pen.rotatedAnchors[i];
            break;
          }
        }

        if (this.hoverLayer.dockAnchor) {
          break;
        }
      } else if (item instanceof Line) {
        if (item.id === this.hoverLayer.line.id) {
          continue;
        }

        if (item.children) {
          let found = false;
          for (let child of item.children as any) {
            if (child.from.hit(point, 10)) {
              point.x = child.from.x;
              point.y = child.from.y;
              this.hoverLayer.dockAnchor = child.from;
              found = true;
              break;
            }

            if (child.to.hit(point, 10)) {
              point.x = child.to.x;
              point.y = child.to.y;
              this.hoverLayer.dockAnchor = child.to;
              found = true;
              break;
            }

            if (child.controlPoints) {
              for (const cp of child.controlPoints) {
                if (cp.hit(point, 10)) {
                  point.x = cp.x;
                  point.y = cp.y;
                  this.hoverLayer.dockAnchor = cp;
                  found = true;
                  break;
                }
              }
            }
          }
          if (found) {
            continue;
          }
        } else {
          if (item.from.hit(point, 10)) {
            point.x = item.from.x;
            point.y = item.from.y;
            this.hoverLayer.dockAnchor = item.from;
            continue;
          }

          if (item.to.hit(point, 10)) {
            point.x = item.to.x;
            point.y = item.to.y;
            this.hoverLayer.dockAnchor = item.to;
            continue;
          }

          if (item.controlPoints) {
            for (const cp of item.controlPoints) {
              if (cp.hit(point, 10)) {
                point.x = cp.x;
                point.y = cp.y;
                this.hoverLayer.dockAnchor = cp;
                break;
              }
            }
          }
        }
      }
    }

    return point;
  }

  private getPensInRect(rect: Rect) {
    if (rect.width < 0) {
      rect.width = -rect.width;
      rect.x = rect.ex;
      rect.ex = rect.x + rect.width;
    }
    if (rect.height < 0) {
      rect.height = -rect.height;
      rect.y = rect.ey;
      rect.ey = rect.y + rect.height;
    }
    this.activeLayer.pens = [];
    for (const item of this.data.pens) {
      if (item.locked === Lock.NoEvent) {
        continue;
      }
      if (item instanceof Node) {
        if (rect.hitByRect(item.rect)) {
          this.activeLayer.add(item);
        }
      }
      if (item instanceof Line) {
        if (item.children) {
          item.children.forEach((child: Line) => {
            if (rect.hit(child.from) && rect.hit(child.to)) {
              this.activeLayer.add(child);
            }
          });
        } else if (rect.hit(item.from) && rect.hit(item.to)) {
          this.activeLayer.add(item);
        }
      }
    }
  }

  private getAngle(pt: { x: number; y: number }) {
    if (pt.x === this.activeLayer.rect.center.x) {
      return pt.y <= this.activeLayer.rect.center.y ? 0 : 180;
    }

    if (pt.y === this.activeLayer.rect.center.y) {
      return pt.x < this.activeLayer.rect.center.x ? 270 : 90;
    }

    const x = pt.x - this.activeLayer.rect.center.x;
    const y = pt.y - this.activeLayer.rect.center.y;
    let angle = (Math.atan(Math.abs(x / y)) / (2 * Math.PI)) * 360;
    if (x > 0 && y > 0) {
      angle = 180 - angle;
    } else if (x < 0 && y > 0) {
      angle += 180;
    } else if (x < 0 && y < 0) {
      angle = 360 - angle;
    }
    if (this.activeLayer.pens.length === 1) {
      return angle - this.activeLayer.pens[0].rotate;
    }

    return angle;
  }

  showInput(item: Pen) {
    this.inputObj = item;
    const textRect = item.getTextRect();
    if (!textRect) {
      return;
    }
    this.input.value = item.text || '';
    this.input.style.left = textRect.x + this.data.x + 'px';
    this.input.style.top = textRect.y + this.data.y + 'px';
    this.input.style.width = textRect.width + 'px';
    this.input.style.height = textRect.height + 'px';
    this.input.style.zIndex = '1000';
    if (item.rotate / 360) {
      this.input.style.transform = `rotate(${item.rotate}deg)`;
    } else {
      this.input.style.transform = undefined;
    }
    // 为 textarea 添加 class
    this.input.classList.add('set-text-input');
    this.input.focus();
  }

  // 包含画布偏移量的 Rect，相对与可视区域的内容
  getRect(pens?: Pen[]) {
    if (!pens) {
      pens = this.data.pens;
    }

    const rect = getRect(pens);
    return new Rect(rect.x + this.data.x, rect.y + this.data.y, rect.width , rect.height);
  }

  // Get a dock rect for moving nodes.
  getDockPos(offsetX: number, offsetY: number, noDock?: boolean) {
    this.hoverLayer.dockLineX = 0;
    this.hoverLayer.dockLineY = 0;

    const offset = {
      x: 0,
      y: 0,
    };

    if (noDock || this.options.disableDockLine) {
      return offset;
    }

    let x = 0;
    let y = 0;
    let disX = dockOffset;
    let disY = dockOffset;

    for (const activePt of this.activeLayer.dockWatchers) {
      for (const item of this.data.pens) {
        if (!(item instanceof Node) || this.activeLayer.has(item) || item.name === 'text') {
          continue;
        }

        // if (!item.dockWatchers) {
        //   item.getDockWatchers();
        // }
        for (const p of item.dockWatchers) {
          x = Math.abs(p.x - activePt.x - offsetX);
          if (x < disX) {
            disX = -99999;
            offset.x = p.x - activePt.x;
            this.hoverLayer.dockLineX = p.x | 0;
          }

          y = Math.abs(p.y - activePt.y - offsetY);
          if (y < disY) {
            disY = -99999;
            offset.y = p.y - activePt.y;
            this.hoverLayer.dockLineY = p.y | 0;
          }
        }
      }
    }

    return offset;
  }

  cache() {
    if (this.options.cacheLen == 0 || this.data.locked) return;
    if (this.caches.index < this.caches.list.length - 1) {
      this.caches.list.splice(this.caches.index + 1, this.caches.list.length - this.caches.index - 1);
      // 删除 indexDB 的值
      spliceCache(this.caches.dbIndex + 1);
    }
    const data = this.pureData();
    this.caches.list.push(data);
    pushCache(data, this.caches.dbIndex + 1, this.options.cacheLen);
    if (this.caches.list.length > this.ramCaches) {
      this.caches.list.shift();
    }

    this.caches.index = this.caches.list.length - 1;
    this.caches.dbIndex++;  // 向后移动
  }

  cacheReplace(pens: Pen[]) {
    if (this.options.cacheLen == 0) return;
    if (pens && pens.length) {
      const needPenMap = {};
      for (let i = 0, len = pens.length; i < len; i++) {
        const pen = pens[i];
        const id = pen.id;
        if (pen instanceof Node) {
          needPenMap[id] = new Node(pen);
        } else if (pen instanceof Line) {
          needPenMap[id] = new Line(pen);
        }
      }
      const cacheListData: TopologyData = this.caches.list[0];
      if (!cacheListData) {
        return;
      }
      for (let i = 0, len = cacheListData.pens.length; i < len; i++) {
        const id = cacheListData.pens[i].id;
        if (needPenMap[id]) {
          cacheListData.pens[i] = needPenMap[id];
        }
      }
    }
  }

  undo(noRedo = false, force?: boolean) {
    if (this.options.cacheLen == 0) return;
    if ((!force && this.data.locked) || this.caches.index < 1) {
      return;
    }

    this.divLayer.clear(true);
    this.animateLayer.stop();
    this.caches.dbIndex--;  // 数据库中的位置前移
    this.data = createData(this.caches.list[--this.caches.index], this.id);
    this.render(true);
    this.divLayer.render();

    if (noRedo) {
      this.caches.list.splice(this.caches.index + 1, this.caches.list.length - this.caches.index - 1);
      // 不允许恢复，同时删除数据库中的值
      spliceCache(this.caches.dbIndex);
    }
    // 当 index 到 list 中间时，开始向左侧添加 indexDB 中的内容
    if(this.caches.index <= this.caches.list.length / 2 - 1){
      const sub = this.caches.index - 0 + 1;  // 距离左侧前一个的差距
      getCache(this.caches.dbIndex - sub).then(data=>{
        if(data){
          this.caches.list.pop();
          this.caches.list.unshift(data);
          this.caches.index++;
        }
      });
    }

    this.dispatch('undo', this.data);
  }

  redo(force?: boolean) {
    if (this.options.cacheLen == 0) {
      return;
    }
    if ((!force && this.data.locked) || this.caches.index > this.caches.list.length - 2) {
      return;
    }
    this.divLayer.clear(true);
    this.caches.dbIndex++;  // 向后移动
    this.data = createData(this.caches.list[++this.caches.index], this.id);
    this.render(true);
    this.divLayer.render();

    // 当 index 到 list 中间时，开始向右侧加
    if(this.caches.index >= this.caches.list.length / 2){
      const add = this.caches.list.length - this.caches.index;  // 距离右侧的差距
      getCache(this.caches.dbIndex + add).then(data=>{
        if(data){
          this.caches.list.shift();
          this.caches.list.push(data);
          this.caches.index--;
        }
      });
    }

    this.dispatch('redo', this.data);
  }

  toImage(padding: Padding = 0, callback: any = undefined): string {
    let backRect: Rect;
    if(this.data.bkImageRect){
      // 背景图片相对于画布的 rect
      backRect = new Rect(this.data.bkImageRect.x - this.data.x, this.data.bkImageRect.y - this.data.y, this.data.bkImageRect.width, this.data.bkImageRect.height);
    }
    const rect = getMoreRect(getRect(this.data.pens), backRect);
    const p = formatPadding(padding || 0);
    rect.x -= p[3];
    rect.y -= p[0];
    rect.width += p[3] + p[1];
    rect.height += p[0] + p[2];
    rect.init();

    const dpi = this.offscreen.getDpiRatio();
    rect.scale(dpi);
    backRect && backRect.scale(dpi, rect.center);

    const canvas = document.createElement('canvas');
    canvas.width = rect.width;
    canvas.height = rect.height;
    const ctx = canvas.getContext('2d');

    if (this.data.bkColor || this.options.bkColor) {
      ctx.fillStyle = this.data.bkColor || this.options.bkColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    if (this.data.bkImage && backRect) {
      ctx.drawImage(this.canvas.bkImg, backRect.x - rect.x, backRect.y - rect.y, backRect.width, backRect.height);
    }

    for (const item of this.data.pens) {
      let pen: Pen;
      if (item.type) {
        pen = new Line(item);
      } else {
        pen = new Node(item, true);
        (pen as Node).animateFrames = [];
        (pen as Node).img = (item as Node).img;
        (pen as Node).elementId = '';
        (pen as Node).elementLoaded = true;
        (pen as Node).elementRendered = true;
      }
      pen.scale(dpi, rect.center);
      pen.translate(-rect.x, -rect.y, true);
      pen.render(ctx);
    }
    ctx.scale(1 / dpi, 1 / dpi);
    if (callback) {
      canvas.toBlob(callback);
    }
    return canvas.toDataURL('image/png', 1);
  }

  saveAsImage(name?: string, padding: Padding = 0) {
    const a = document.createElement('a');
    a.setAttribute('download', name || 'le5le.topology.png');
    a.setAttribute('href', this.toImage(padding));
    const evt = document.createEvent('MouseEvents');
    evt.initEvent('click', true, true);
    a.dispatchEvent(evt);
  }

  // param:
  //       - string ->idOrTag
  //       - Pen[]  -> will deletes
  delete(param?: string | Pen[], force?: boolean) {
    if (this.data.locked && !force) {
      return;
    }

    let deleted: Pen[] = [];
    if (typeof param === 'string') {
      deleted = del(param, this.data.pens);
    } else {
      const pens: Pen[] = param || this.activeLayer.pens;

      for (let i = 0; i < pens.length; i++) {
        let item = pens[i];
        if (item.type === PenType.Line && item.parentId) {
          const parent = find(item.parentId, this.data.pens)[0];
          if (parent && parent.name === 'lines') {
            item = parent;
          }
        }
        if (del(item.id, this.data.pens).length) {
          deleted.push(item);
          --i;
          if (item.type === PenType.Node) {
            this.divLayer.removeDiv(item as Node);
          }
          if (this.options.disableEmptyLine) {
            this.delEmptyLines(item.id);
          }
          this.animateLayer.pens.delete(item.id);
        }
      }
    }

    if (deleted.length) {
      this.render(true);
      this.cache();

      this.dispatch('delete', deleted);
    }
  }

  deleteAnchors(param?: Pen[], force?: boolean) {
    if (this.data.locked && !force) {
      return;
    }

    const pens: Pen[] = param || this.activeLayer.pens;
    pens.forEach((pen: Pen) => {
      if (pen.type === PenType.Node) {
        (pen as Node).manualAnchors = undefined;
        (pen as Node).calcAnchors();
      }
    });
  }

  delEmptyLines(deleteedId?: string) {
    for (let i = 0; i < this.data.pens.length; i++) {
      if (this.data.pens[i].type !== PenType.Line) {
        continue;
      }

      const line = this.data.pens[i] as Line;
      if (!line.from.id || !line.to.id || line.from.id === deleteedId || line.to.id === deleteedId) {
        this.data.pens.splice(i, 1);
        this.animateLayer.pens.delete(line.id);
        --i;
      }
    }
  }

  cut() {
    if (this.data.locked) {
      return;
    }

    this.clipboard = createData({
      pens: [],
    });
    for (let i = 0; i < this.activeLayer.pens.length; i++) {
      const pen = this.activeLayer.pens[i];
      this.clipboard.pens.push(pen.clone());
      const found = this.findIndex(pen);
      if (found > -1) {
        if (pen.type === PenType.Node) {
          this.divLayer.removeDiv(this.data.pens[found] as Node);
        }
        this.data.pens.splice(found, 1);
      }
    }
    this.cache();

    this.activeLayer.clear();
    this.hoverLayer.node = undefined;
    this.moveIn.hoverLine = undefined;
    this.moveIn.hoverNode = undefined;

    this.render();

    this.dispatch('delete', this.clipboard.pens);
  }

  copy() {
    this.clipboard = createData({
      pens: [],
    });
    for (const pen of this.activeLayer.pens) {
      this.clipboard.pens.push(pen.clone());
      pen.parentId = null;
    }
    this.dispatch('copy', this.clipboard);
  }

  paste() {
    if (!this.clipboard || this.data.locked) {
      return;
    }

    this.hoverLayer.node = undefined;
    this.hoverLayer.line = undefined;

    this.activeLayer.pens = [];

    const idMaps = {};
    for (const pen of this.clipboard.pens) {
      this.pastePen(pen, idMaps, 20);

      this.data.pens.push(pen);

      this.activeLayer.add(pen);
    }

    this.render();
    this.animate(true);
    this.cache();
    this.copy();

    this.dispatch('paste', this.clipboard.pens);
  }

  /**
   * 粘贴当前画笔，位置偏移 offset
   * */
  pastePen(pen: Pen, idMaps: any = {}, offset: number = 0, parentId?: string) {
    if (!pen.type) {
      const old = pen.id;
      pen.id = s8();
      idMaps[old] = pen.id;
      parentId && (pen.parentId = parentId);

      pen.rect.x += offset;
      pen.rect.ex += offset;
      pen.rect.y += offset;
      pen.rect.ey += offset;
      // 存在自定义瞄点
      if ((pen as Node).manualAnchors) {
        // 将 位置偏移 offset
        (pen as Node).manualAnchors.forEach((pt: Point) => {
          pt.x += offset;
          pt.y += offset;
        });
      }
      // 存在 points
      if ((pen as Node).points) {
        // 将 位置偏移 offset
        (pen as Node).points.forEach((pt: Point) => {
          pt.x += offset;
          pt.y += offset;
        });
      }
      // 若是 echarts 等 dom 元素 则清一下 elementId
      if (this.clearElementIdPensName.includes(pen.name)) {
        (pen as Node).elementId = undefined;
      }
      (pen as Node).init();
    } else if (pen instanceof Line) {
      pen.id = s8();
      parentId && (pen.parentId = parentId);
      pen.from = new Point(
        pen.from.x + offset,
        pen.from.y + offset,
        pen.from.direction,
        pen.from.anchorIndex,
        idMaps[pen.from.id]
      );
      pen.to = new Point(pen.to.x + offset, pen.to.y + offset, pen.to.direction, pen.to.anchorIndex, idMaps[pen.to.id]);
      const controlPoints = [];
      for (const pt of pen.controlPoints) {
        controlPoints.push(new Point(pt.x + offset, pt.y + offset));
      }
      pen.controlPoints = controlPoints;
    }
    if (pen.children) {
      for (const item of pen.children) {
        this.pastePen(item, idMaps, offset, pen.id);
      }
    }
  }

  // newId(node: any, idMaps: any) {
  //   const old = node.id;
  //   node.id = s8();
  //   idMaps[old] = node.id;
  //   if (node.children) {
  //     for (const item of node.children) {
  //       this.newId(item, idMaps);
  //     }
  //   }
  // }

  animate(autoplay = false) {
    this.animateLayer.readyPlay(undefined, autoplay);
    this.animateLayer.animate();
  }

  updateProps(cache: boolean = true, pens?: Pen[]) {
    if (!pens) {
      pens = this.activeLayer.pens;
    }
    for (const pen of pens) {
      if (pen instanceof Node) {
        if (pen.autoRect) {
          const ctx = this.canvas.canvas.getContext('2d');
          const rect = calcTextRect(ctx, pen);
          pen.rect.width = rect.width + pen.lineWidth * 2;
          pen.rect.height = rect.height;
        }

        pen.init();
        pen.initRect();
      }
    }

    this.activeLayer.updateLines(pens);
    this.activeLayer.calcControlPoints();
    this.activeLayer.saveNodeRects();

    this.render();
    // tslint:disable-next-line: no-unused-expression
    cache && this.cache();
  }

  lock(lock: Lock) {
    this.data.locked = lock;
    for (const item of this.data.pens) {
      (item as any).addToDiv && (item as any).addToDiv();
    }

    this.dispatch('locked', this.data.locked);
  }

  lockPens(pens: Pen[], lock: Lock) {
    for (const item of this.data.pens) {
      for (const pen of pens) {
        if (item.id === pen.id) {
          item.locked = lock;
          (item as any).addToDiv && (item as any).addToDiv();
          break;
        }
      }
    }

    this.dispatch('lockPens', {
      pens,
      lock,
    });
  }

  up(pen: Pen, pens?: Pen[]) {
    if (!pens) {
      pens = this.data.pens;
    }
    const i = this.findIndex(pen, pens);

    if (i > -1 && i !== pens.length - 1) {
      pens.splice(i + 2, 0, pens[i]);
      pens.splice(i, 1);
    } else {
      const parent = getParent(pens, pen);
      if (!parent) {
        return;
      }

      this.up(pen, parent.children);
    }
  }

  top(pen: Pen, pens?: Pen[]) {
    if (!pens) {
      pens = this.data.pens;
    }
    const i = this.findIndex(pen, pens);
    if (i > -1) {
      pens.push(pens[i]);
      pens.splice(i, 1);
    } else {
      const parent = getParent(pens, pen);
      if (!parent) {
        return;
      }

      this.top(pen, parent.children);
    }
  }

  down(pen: Pen, pens?: Pen[]) {
    if (!pens) {
      pens = this.data.pens;
    }
    const i = this.findIndex(pen, pens);
    if (i > -1 && i !== 0) {
      pens.splice(i - 1, 0, pens[i]);
      pens.splice(i + 1, 1);
    } else {
      const parent = getParent(pens, pen);
      if (!parent) {
        return;
      }

      this.down(pen, parent.children);
    }
  }

  bottom(pen: Pen, pens?: Pen[]) {
    if (!pens) {
      pens = this.data.pens;
    }
    const i = this.findIndex(pen, pens);
    if (i > -1) {
      pens.unshift(pens[i]);
      pens.splice(i + 1, 1);
    } else {
      const parent = getParent(pens, pen);
      if (!parent) {
        return;
      }

      this.bottom(pen, parent.children);
    }
  }

  getParent(pen: Pen) {
    return getParent(this.data.pens, pen);
  }

  combine(pens?: Pen[], stand = false) {
    if (!pens) {
      pens = this.activeLayer.pens;
    }

    const rect = getRect(pens);
    for (const item of pens) {
      const i = this.findIndex(item);
      if (i > -1) {
        this.data.pens.splice(i, 1);
      }
    }

    let node = new Node({
      name: 'combine',
      rect: new Rect(rect.x, rect.y, rect.width, rect.height),
      text: '',
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      strokeStyle: 'transparent',
      children: [],
    });

    for (let i = 0; i < pens.length; ++i) {
      if (pens[i].type === PenType.Node && rect.width === pens[i].rect.width && rect.height === pens[i].rect.height) {
        node = pens[i] as Node;
        if (!node.children) {
          node.children = [];
        }
        pens.splice(i, 1);
        break;
      }
    }

    for (const item of pens) {
      item.stand = stand;
      item.parentId = node.id;
      item.calcRectInParent(node);
      node.children.push(item);
    }
    this.data.pens.push(node);

    this.activeLayer.setPens([node]);

    this.dispatch('combine', node);

    this.cache();
  }

  uncombine(node?: Pen) {
    if (!node) {
      node = this.activeLayer.pens[0];
    }

    if (!(node instanceof Node)) {
      return;
    }

    for (const item of node.children) {
      item.parentId = undefined;
      item.rectInParent = undefined;
      item.locked = Lock.None;
      this.data.pens.push(item);
    }

    const i = this.findIndex(node);
    if (i > -1 && node.name === 'combine') {
      this.data.pens.splice(i, 1);
    } else {
      node.children = undefined;
    }

    this.cache();

    this.activeLayer.clear();
    this.hoverLayer.clear();

    this.dispatch('uncombine', node);
  }

  find(idOrTag: string, pens?: Pen[] | boolean, array?: boolean) {
    let list: Pen[];
    if (Array.isArray(pens)) {
      list = pens;
    } else {
      list = this.data.pens;
      array = pens;
    }

    const result = find(idOrTag, list);

    if (array) {
      return result;
    }

    if (result.length === 0) {
      return null;
    } else if (result.length === 1) {
      return result[0];
    }

    return result;
  }

  findIndex(pen: Pen, pens?: Pen[]) {
    if (!pens) {
      pens = this.data.pens;
    }

    return pens.findIndex((item: Pen) => item.id === pen.id);
  }

  play(idOrTag: string, pause?: boolean) {
    this.divLayer.play(idOrTag, pause);
  }

  translate(x: number, y: number, process?: boolean, noNotice?: boolean) {
    if (!process) {
      this.lastTranlated.x = 0;
      this.lastTranlated.y = 0;
    }
    const offsetX = x - this.lastTranlated.x;
    const offsetY = y - this.lastTranlated.y;

    this.data.x += offsetX;
    this.data.y += offsetY;

    // for (const item of this.data.pens) {
    //   item.translate(offsetX, offsetY);
    // }
    if (this.data.bkImageRect && !this.data.bkImageStatic) {
      this.data.bkImageRect.translate(offsetX, offsetY);
    }

    Store.set(this.generateStoreKey('LT:updateLines'), this.data.pens);

    this.lastTranlated.x = x;
    this.lastTranlated.y = y;
    this.render();
    this.divLayer.render();

    this.animateLayer.stop();
    if (this.cacheTimer) {
      clearTimeout(this.cacheTimer);
    }
    this.cacheTimer = setTimeout(() => {
      this.animateLayer.readyPlay(undefined, true);
      this.animateLayer.animate();
      this.cache?.();
    }, 300);
    if (!noNotice) {
      this.dispatch('translate', { x, y });
    }

    if (this.scrollDom && this.scrollDom.isShow) {
      this.scrollDom.translate(x, y);
    }
  }

  // scale for scaled canvas:
  //   > 1, expand
  //   < 1, reduce
  scale(scale: number, center?: { x: number; y: number }) {
    if (this.data.scale * scale < this.options.minScale) {
      scale = this.options.minScale / this.data.scale;
      this.data.scale = this.options.minScale;
    } else if (this.data.scale * scale > this.options.maxScale) {
      scale = this.options.maxScale / this.data.scale;
      this.data.scale = this.options.maxScale;
    } else {
      this.data.scale = Math.round(this.data.scale * scale * 100) / 100;
    }

    !center && (center = getRect(this.data.pens).center);

    for (const item of this.data.pens) {
      item.scale(scale, center);
    }
    if (this.data.bkImageRect && !this.data.bkImageStatic) {
      const backCenter = new Point(center.x + this.data.x, center.y + this.data.y);
      this.data.bkImageRect.scale(scale, backCenter);
    }
    Store.set(this.generateStoreKey('LT:updateLines'), this.data.pens);

    Store.set(this.generateStoreKey('LT:scale'), this.data.scale);

    this.render();
    this.cache();

    this.dispatch('scale', this.data.scale);
  }

  // scale for origin canvas:
  scaleTo(scale: number, center?: { x: number; y: number }) {
    this.scale(scale / this.data.scale, center);
  }

  round() {
    for (const item of this.data.pens) {
      if (item instanceof Node) {
        item.round();
      }
    }
  }

  centerView(padding?: Padding) {
    if (!this.hasView()) return;
    const rect = this.getRect();
    const viewCenter = this.getViewCenter(padding);
    const { center } = rect;
    this.translate(viewCenter.x - center.x, viewCenter.y - center.y);
    const { parentElem } = this.canvas;
    const x = (parentElem.scrollWidth - parentElem.offsetWidth) / 2;
    const y = (parentElem.scrollHeight - parentElem.offsetHeight) / 2;
    parentElem.scrollTo(x, y);
    return true;
  }

  fitView(viewPadding?: Padding) {
    if (!this.hasView()) return;
    // 1. 重置画布尺寸为容器尺寸
    const { parentElem } = this.canvas;
    const { offsetWidth: width, offsetHeight: height } = parentElem;
    this.resize({
      width,
      height,
    });
    // 2. 获取设置的留白值
    const padding = formatPadding(viewPadding || this.options.viewPadding);
    // 3. 获取图形尺寸
    const rect = this.getRect();
    // 4. 计算缩放比
    const w = (width - padding[1] - padding[3]) / rect.width;
    const h = (height - padding[0] - padding[2]) / rect.height;
    let ratio = w;
    if (w > h) {
      ratio = h;
    }

    this.scale(ratio);
    // 5. 图形居中
    this.centerView(viewPadding);
  }

  hasView() {
    return !!this.data.pens.length;
  }

  getViewCenter(viewPadding?: Padding) {
    const padding = formatPadding(viewPadding || this.options.viewPadding);
    const { width, height } = this.canvas;
    return {
      x: (width - padding[1] - padding[3]) / 2 + padding[3],
      y: (height - padding[0] - padding[2]) / 2 + padding[0],
    };
  }

  generateStoreKey(key: string) {
    return `${this.id}-${key}`;
  }

  private createMarkdownTip() {
    this.tipMarkdown = document.createElement('div');
    this.tipMarkdown.className = 'topology-markdown';
    this.tipMarkdown.style.position = 'fixed';
    this.tipMarkdown.style.zIndex = '-1';
    this.tipMarkdown.style.left = '-9999px';
    this.tipMarkdown.style.padding = '8px 0';

    this.tipMarkdownContent = document.createElement('div');
    this.tipMarkdownContent.style.maxWidth = '320px';
    this.tipMarkdownContent.style.outline = 'none';
    this.tipMarkdownContent.style.borderRadius = '4px';
    this.tipMarkdownContent.style.backgroundColor = 'rgba(0,0,0,.6)';
    this.tipMarkdownContent.style.color = '#fff';
    this.tipMarkdownContent.style.padding = '8px 16px';
    this.tipMarkdownContent.style.lineHeight = '1.8';
    this.tipMarkdownContent.style.overflowY = 'auto';
    this.tipMarkdownContent.style.minHeight = '30px';
    this.tipMarkdownContent.style.maxHeight = '400px';
    this.tipMarkdown.appendChild(this.tipMarkdownContent);

    this.tipMarkdownArrowUp = document.createElement('div');
    this.tipMarkdownArrowUp.className = 'arrow';
    this.tipMarkdownArrowUp.style.position = 'absolute';
    this.tipMarkdownArrowUp.style.border = '6px solid transparent';
    this.tipMarkdownArrowUp.style.backgroundColor = 'transparent';
    this.tipMarkdownArrowUp.style.left = '50%';
    this.tipMarkdownArrowUp.style.transform = 'translateX(-50%)';
    this.tipMarkdownArrowUp.style.top = '-4px';
    // this.tipMarkdownArrowUp.style.borderBottomColor = 'rgba(0,0,0,.6)';
    this.tipMarkdown.appendChild(this.tipMarkdownArrowUp);

    this.tipMarkdownArrowDown = document.createElement('div');
    this.tipMarkdownArrowDown.className = 'arrow';
    this.tipMarkdownArrowDown.style.position = 'absolute';
    this.tipMarkdownArrowDown.style.border = '6px solid transparent';
    this.tipMarkdownArrowDown.style.left = '50%';
    this.tipMarkdownArrowDown.style.transform = 'translateX(-50%)';
    this.tipMarkdownArrowDown.style.backgroundColor = 'transparent';
    this.tipMarkdownArrowDown.style.bottom = '-4px';
    // this.tipMarkdownArrowDown.style.borderTopColor = 'rgba(0,0,0,.6)';
    this.tipMarkdown.appendChild(this.tipMarkdownArrowDown);

    document.body.appendChild(this.tipMarkdown);
  }

  private showTip(data: Pen, pos: { x: number; y: number }) {
    if (!data || data.id === this.tip || this.data.tooltip === false || this.data.tooltip === 0) {
      return;
    }

    if (data.title) {
      this.divLayer.canvas.title = data.title;
      this.tip = data.id;
      return;
    }

    if (data.tipId) {
      this.tipElem = document.getElementById(data.tipId);
    }

    let elem = this.tipElem;
    if (data.markdown) {
      elem = this.tipMarkdown;
      const marked = window.marked;
      if (marked) {
        this.tipMarkdownContent.innerHTML = marked(data.markdown);
      } else {
        this.tipMarkdownContent.innerHTML = data.markdown;
      }
      const a = this.tipMarkdownContent.getElementsByTagName('A');
      for (let i = 0; i < a.length; ++i) {
        a[i].setAttribute('target', '_blank');
      }
    }

    if (!elem) {
      return;
    }

    const parentRect = this.parentElem.getBoundingClientRect();
    const elemRect = elem.getBoundingClientRect();
    let x = (parentRect.left || parentRect.x) - (elemRect.width - data.rect.width) / 2 + this.data.x;
    let y = (parentRect.top || parentRect.y) - elemRect.height - data.rect.height + this.data.y;
    x += !data.type ? data.rect.x : pos.x;
    y += !data.type ? data.rect.ey : pos.y;

    if (y > 0) {
      this.tipMarkdownArrowUp.style.borderBottomColor = 'transparent';
      this.tipMarkdownArrowDown.style.borderTopColor = 'rgba(0,0,0,.6)';
    } else {
      y += elemRect.height + data.rect.height;
      this.tipMarkdownArrowUp.style.borderBottomColor = 'rgba(0,0,0,.6)';
      this.tipMarkdownArrowDown.style.borderTopColor = 'transparent';
    }

    elem.style.display = 'block';
    elem.style.position = 'fixed';
    elem.style.left = x + 'px';
    elem.style.top = y + 'px';
    elem.style.zIndex = '100';

    this.tip = data.id;

    this.dispatch('tip', elem);
  }

  private hideTip() {
    if (!this.tip) {
      return;
    }
    this.tipMarkdown.style.left = '-9999px';
    this.tipMarkdown.style.zIndex = '-1';
    if (this.tipElem) {
      this.tipElem.style.left = '-9999px';
      this.tipElem.style.zIndex = '-1';
      this.tipElem = undefined;
    }
    this.divLayer.canvas.title = '';

    this.tip = '';
  }

  scroll(x: number, y: number) {
    if (this.scrolling) {
      return;
    }
    this.scrolling = true;
    this.parentElem.scrollLeft += x;
    this.parentElem.scrollTop += y;
    setTimeout(() => {
      this.scrolling = false;
    }, 700);
  }

  toComponent(pens?: Pen[]) {
    if (!pens) {
      pens = this.data.pens;
    }

    const rect = getRect(pens);
    let node = new Node({
      name: 'combine',
      rect: new Rect(rect.x, rect.y, rect.width, rect.height),
      text: '',
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      strokeStyle: 'transparent',
      children: [],
    });

    for (const item of pens) {
      if (item.type === PenType.Node && rect.width === item.rect.width && rect.height === item.rect.height) {
        node = item as Node;
        if (!node.children) {
          node.children = [];
        }
        break;
      }
    }

    for (const item of pens) {
      if (item !== node) {
        item.parentId = node.id;
        item.calcRectInParent(node);
        node.children.push(item);
      }
    }

    return node;
  }

  clearBkImg() {
    this.canvas.clearBkImg();
  }

  dispatch(event: string, data?: any) {
    if (this.options.on) {
      this.options.on(event, data);
    }
    this.emit(event, data);
    return this;
  }

  on(eventType: EventType, handler: Handler) {
    this._emitter.on(eventType, handler);
    return this;
  }

  off(eventType: EventType, handler: Handler) {
    this._emitter.off(eventType, handler);
    return this;
  }

  emit(eventType: EventType, params: any) {
    this._emitter.emit(eventType, params);
    return this;
  }

  getValue(idOrTag: string, attr = 'text') {
    let pen: Pen | Pen[] = this.find(idOrTag);
    if (!pen) {
      return;
    }

    if (Array.isArray(pen)) {
      pen = pen[0];
    }

    if (!pen) {
      return;
    }

    return pen[attr];
  }

  setValue(idOrTag: any, val: any, attr = 'text') {
    if (typeof idOrTag === 'object') {
      val = idOrTag;
      idOrTag = idOrTag.id || idOrTag.tag;
    }

    const pens = find(idOrTag, this.data.pens);
    pens.forEach((item) => {
      if (item.id === idOrTag || (item.tags && item.tags.indexOf(idOrTag) > -1)) {
        if (typeof val === 'object') {
          item.fromData(item, val);
        } else {
          item[attr] = val;
        }
        item.doWheres();

        if (item.type === PenType.Node) {
          (item as Node).animateReady = Node.cloneState(item);
        }
      }
    });

    this.willRender();
  }

  willRender() {
    if (this.actionTimer) {
      // 节流行为，保证每 100ms 执行一次
      return;
    }
    this.actionTimer = setTimeout(() => {
      this.render();
      this.actionTimer = undefined;
    }, 100);
  }

  setLineName(name: 'curve' | 'line' | 'polyline' | 'mind', render = true) {
    this.data.pens.forEach((pen: Pen) => {
      if (pen.type) {
        (pen as Line).name = name;
        (pen as Line).calcControlPoints();
      }
    });

    render && this.render();
  }

  setColor(color: string) {
    this.options.color = color;
    Store.set(this.generateStoreKey('LT:color'), color);

    this.options.fontColor = color;
    Store.set(this.generateStoreKey('LT:fontColor'), color);
  }

  setFontColor(color: string) {
    this.options.fontColor = color;
    Store.set(this.generateStoreKey('LT:fontColor'), color);
  }

  setIconColor(color: string) {
    Store.set(this.generateStoreKey('LT:iconColor'), color);
  }

  setBkColor(color: string) {
    this.data.bkColor = color;
    Store.set('LT:bkColor', color);
  }

  pureData() {
    const data = JSON.parse(JSON.stringify(this.data));
    data.pens.forEach((pen: any) => {
      for (const key in pen) {
        if (pen[key] === undefined || pen[key] === undefined) {
          delete pen[key];
        }
      }

      delete pen.TID;
      delete pen.animateCycleIndex;
      delete pen.img;
      delete pen.lastImage;
      delete pen.fillImg;
      delete pen.strokeImg;
      delete pen.lastFillImage;
      delete pen.lastStrokeImage;
      delete pen.imgNaturalWidth;
      delete pen.imgNaturalHeight;
      delete pen.anchors;
      delete pen.rotatedAnchors;
      delete pen.dockWatchers;
      delete pen.elementLoaded;
      delete pen.elementRendered;
      delete pen.animateReady;

      if (pen.animateFrames && pen.animateFrames.length) {
        for (const item of pen.animateFrames) {
          if (item.initState) {
            delete item.initState.TID;
            delete item.initState.animateCycleIndex;
            delete item.initState.img;
            delete item.initState.lastImage;
            delete item.initState.imgNaturalWidth;
            delete item.initState.imgNaturalHeight;
            delete item.initState.anchors;
            delete item.initState.rotatedAnchors;
            delete item.initState.dockWatchers;
            delete item.initState.elementLoaded;
            delete item.initState.elementRendered;
            delete item.initState.fillImg;
            delete item.initState.strokeImg;
            delete item.initState.lastFillImage;
            delete item.initState.lastStrokeImage;
          }
          if (item.state) {
            delete item.state.TID;
            delete item.state.animateCycleIndex;
            delete item.state.img;
            delete item.state.lastImage;
            delete item.state.imgNaturalWidth;
            delete item.state.imgNaturalHeight;
            delete item.state.anchors;
            delete item.state.rotatedAnchors;
            delete item.state.dockWatchers;
            delete item.state.elementLoaded;
            delete item.state.elementRendered;
            delete item.state.fillImg;
            delete item.state.strokeImg;
            delete item.state.lastFillImage;
            delete item.state.lastStrokeImage;
          }
        }
      }

      this.pureDataChildren(pen);
    });

    return data;
  }

  pureDataChildren(data: any) {
    if (!data.children) {
      return;
    }

    data.children.forEach((pen: any) => {
      for (const key in pen) {
        if (pen[key] === undefined || pen[key] === undefined || pen[key] === '') {
          delete pen[key];
        }
      }

      delete pen.TID;
      delete pen.animateCycleIndex;
      delete pen.img;
      delete pen.lastImage;
      delete pen.imgNaturalWidth;
      delete pen.imgNaturalHeight;
      delete pen.anchors;
      delete pen.rotatedAnchors;
      delete pen.dockWatchers;
      delete pen.elementLoaded;
      delete pen.elementRendered;
      delete pen.animateReady;

      this.pureDataChildren(pen);
    });
  }

  destroy() {
    this.scrollDom && this.scrollDom.destroy();
    this.subcribe.unsubscribe();
    this.subcribeRender.unsubscribe();
    this.subcribeImage.unsubscribe();
    this.subcribeAnimateEnd.unsubscribe();
    this.subcribeAnimateMoved.unsubscribe();
    this.subcribeMediaEnd.unsubscribe();
    this.subcribeEmit.unsubscribe();
    this.animateLayer.destroy();
    this.divLayer.destroy();
    this.canvas.destroy();
    this.activeLayer.destroy();
    this.hoverLayer.destroy();
    this.offscreen.destroy();
    document.body.removeChild(this.tipMarkdown);
    window.removeEventListener('resize', this.winResize);
    this.parentElem.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('scroll', this.onScroll);
    document.removeEventListener('gesturestart', this.preventDefault);

    switch (this.options.keydown) {
      case KeydownType.Document:
        document.removeEventListener('keydown', this.onkeydown);
        break;
      case KeydownType.Canvas:
        this.divLayer.canvas.removeEventListener('keydown', this.onkeydown);
        break;
    }
    this.closeSocket();
    this.closeMqtt();
    if (this.socketFn) {
      this.off('websocket', this.socketFn as any);
      this.off('mqtt', this.socketFn as any);
    }

    this.cache = undefined;
    this.data = undefined;

    window.topology = undefined;
  }
}
