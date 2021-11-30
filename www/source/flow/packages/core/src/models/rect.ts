import { Point } from './point';
import { pointInRect } from '../utils/canvas';

export class Rect {
  ex: number;
  ey: number;
  center: Point = new Point(0, 0);
  constructor(public x: number, public y: number, public width: number, public height: number) {
    if (width < 0) {
      width = 0;
    }
    if (height < 0) {
      height = 0;
    }
    this.init();
  }

  init() {
    this.ex = this.x + this.width;
    this.ey = this.y + this.height;
    this.calcCenter();
  }

  floor() {
    this.x |= 0;
    this.y |= 0;
    this.width |= 0;
    this.height |= 0;
    this.init();
  }

  round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    this.init();
  }

  clone(): Rect {
    return new Rect(this.x, this.y, this.width, this.height);
  }

  hit(pt: { x: number; y: number; }, padding = 0) {
    return pt && pt.x > this.x - padding && pt.x < this.ex + padding && pt.y > this.y - padding && pt.y < this.ey + padding;
  }

  hitByRect(rect: Rect) {
    return (
      (rect.x > this.x && rect.x < this.ex && rect.y > this.y && rect.y < this.ey) ||
      (rect.ex > this.x && rect.ex < this.ex && rect.y > this.y && rect.y < this.ey) ||
      (rect.ex > this.x && rect.ex < this.ex && rect.ey > this.y && rect.ey < this.ey) ||
      (rect.x > this.x && rect.x < this.ex && rect.ey > this.y && rect.ey < this.ey)
    );
  }

  hitRotate(point: { x: number; y: number; }, rotate: number, center: Point) {
    const pts = this.toPoints();
    for (const pt of pts) {
      pt.rotate(rotate, center);
    }

    return pointInRect(point, pts);
  }

  calcCenter() {
    this.center.x = this.x + this.width / 2;
    this.center.y = this.y + this.height / 2;
  }

  toPoints() {
    return [
      new Point(this.x, this.y),
      new Point(this.ex, this.y),
      new Point(this.ex, this.ey),
      new Point(this.x, this.ey),
    ];
  }

  translate(x: number, y: number) {
    this.x += x;
    this.y += y;
    this.ex += x;
    this.ey += y;
    this.calcCenter();
  }

  scale(scale: number, center?: { x: number, y: number; }, scaleY?: number) {
    if (!center) {
      center = this.center;
    }

    if (scaleY === undefined) {
      scaleY = scale;
    }

    this.x = center.x - (center.x - this.x) * scale;
    this.y = center.y - (center.y - this.y) * scaleY;
    this.width *= scale;
    this.height *= scaleY;
    this.init();
  }
}

(window as any).topologyRect = Rect;
