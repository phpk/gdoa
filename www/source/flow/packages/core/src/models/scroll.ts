import { Topology } from '@topology/core';
import { getRect } from '../utils/rect';
import { Rect } from './rect';

export class Scroll {
  h: HTMLElement;
  v: HTMLElement;
  isDownH: number;
  isDownV: number;
  x: number;
  y: number;
  hSize: number;
  vSize: number;
  scrollX: number;
  scrollY: number;
  lastScrollX: number;
  lastScrollY: number;
  rect: Rect;
  isShow: boolean;
  constructor(public parent: Topology) {
    this.h = document.createElement('div');
    this.v = document.createElement('div');

    this.parent.parentElem.appendChild(this.h);
    this.parent.parentElem.appendChild(this.v);

    this.h.className = 'topology-scroll h';
    this.h.onmousedown = this.onMouseDownH;

    this.v.className = 'topology-scroll v';
    this.v.onmousedown = this.onMouseDownV;

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);

    let sheet: any;
    for (let i = 0; i < document.styleSheets.length; i++) {
      if (document.styleSheets[i].title === 'le5le/scroll') {
        sheet = document.styleSheets[i];
      }
    }

    if (!sheet) {
      let style = document.createElement('style');
      style.type = 'text/css';
      style.title = 'le5le.com/scroll';
      document.head.appendChild(style);

      style = document.createElement('style');
      style.type = 'text/css';
      document.head.appendChild(style);
      sheet = style.sheet;
      sheet.insertRule(
        '.topology-scroll{position:absolute;width:8px;height:200px;background:#dddddd;border-radius:10px;z-index:20;cursor:default;}'
      );
      sheet.insertRule('.topology-scroll:hover{background:#cccccc;cursor:pointer}');
      sheet.insertRule('.topology-scroll.v{right:0;top:calc(50% - 100px);}');
      sheet.insertRule('.topology-scroll.h{bottom:2px;left:calc(50% - 100px);width:200px;height:8px;}');
    }

    this.init();
  }

  init() {
    this.resize();
    this.initPos();
  }

  private onMouseDownH = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    this.isDownH = e.x;
    this.x = this.parent.data.x || 0;
    this.lastScrollX = this.scrollX;
  };

  private onMouseDownV = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    this.isDownV = e.y;
    this.y = this.parent.data.y || 0;
    this.lastScrollY = this.scrollY;
  };

  private onMouseMove = (e: MouseEvent) => {
    if (this.isDownH) {
      const x = e.x - this.isDownH;
      this.scrollX = this.lastScrollX + x;
      this.h.style.left = `${this.scrollX}px`;
      this.parent.data.x = this.x - (x * this.rect.width) / this.parent.parentElem.clientWidth;
    }

    if (this.isDownV) {
      const y = e.y - this.isDownV;
      this.scrollY = this.lastScrollY + y;
      this.v.style.top = `${this.scrollY}px`;
      this.parent.data.y = this.y - (y * this.rect.height) / this.parent.parentElem.clientHeight;
    }

    if (this.isDownH || this.isDownV) {
      this.parent.render();
      this.parent.divLayer.render();
    }
  };

  private onMouseUp = (e: MouseEvent) => {
    if (!this.isDownH && !this.isDownV) {
      return;
    }

    this.isDownH = undefined;
    this.isDownV = undefined;

    if (this.scrollX < 20) {
      this.scrollX = 20;
      this.h.style.left = `${this.scrollX}px`;
    } else if (this.scrollX > this.parent.parentElem.clientWidth - this.hSize - 20) {
      this.scrollX = this.parent.parentElem.clientWidth - this.hSize - 20;
      this.h.style.left = `${this.scrollX}px`;
    }

    if (this.scrollY < 20) {
      this.scrollY = 20;
      this.v.style.top = `${this.scrollY}px`;
    } else if (this.scrollY > this.parent.parentElem.clientHeight - this.vSize - 20) {
      this.scrollY = this.parent.parentElem.clientHeight - this.vSize - 20;
      this.v.style.top = `${this.scrollY}px`;
    }

    this.resize();
  };

  initPos() {
    this.scrollX = (this.parent.parentElem.clientWidth - this.hSize) / 2;
    this.scrollY = (this.parent.parentElem.clientHeight - this.vSize) / 2;
    this.h.style.left = `${this.scrollX}px`;
    this.v.style.top = `${this.scrollY}px`;
  }

  resize() {
    this.rect = getRect(this.parent.data.pens);
    if (this.rect.width < 1400) {
      this.rect.width = 1400;
    }
    if (this.rect.height < 900) {
      this.rect.height = 900;
    }

    if (this.parent.data.x > 0) {
      this.rect.width += this.parent.data.x + (this.rect.x > 0 ? 0 : this.rect.x);
    } else {
      this.rect.width -= this.parent.data.x + (this.rect.x > 0 ? 0 : this.rect.x);
    }

    if (this.parent.data.y > 0) {
      this.rect.height += this.parent.data.y + (this.rect.y > 0 ? 0 : this.rect.y);
    } else {
      this.rect.height -= this.parent.data.y + (this.rect.y > 0 ? 0 : this.rect.y);
    }

    if (this.rect.width < 1400) {
      this.rect.width = 1400;
    }
    if (this.rect.height < 900) {
      this.rect.height = 900;
    }

    this.hSize = (1000 * this.parent.parentElem.clientWidth) / this.rect.width / 3;
    this.vSize = (1000 * this.parent.parentElem.clientHeight) / this.rect.height / 3;
    this.h.style.width = this.hSize + 'px';
    this.v.style.height = this.vSize + 'px';
  }

  show() {
    this.isShow = true;
    this.h.style.display = `block`;
    this.v.style.display = `block`;
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  hide() {
    this.isShow = false;
    this.h.style.display = `none`;
    this.v.style.display = `none`;
    this.destroy();
  }

  translate(x: number, y: number) {
    if (x) {
      this.scrollX -= (x * this.parent.parentElem.clientWidth) / this.rect.width;
      this.h.style.left = `${this.scrollX}px`;
    }

    if (y) {
      this.scrollY -= (y * this.parent.parentElem.clientHeight) / this.rect.height;
      this.v.style.top = `${this.scrollY}px`;
    }
  }

  wheel(up?: boolean) {
    let y = 10;
    if (up) {
      y = -10;
    }

    this.scrollY += y;
    this.v.style.top = `${this.scrollY}px`;
    this.parent.data.y -= (y * this.rect.height) / this.parent.parentElem.clientHeight;

    this.parent.render();
    this.parent.divLayer.render();
  }

  destroy() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }
}
