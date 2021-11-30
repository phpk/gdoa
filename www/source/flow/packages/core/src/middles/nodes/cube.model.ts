import { Point } from '../../models/point';
import { Rect } from '../../models/rect';
import { pSBC } from '../../utils/math';

export class Surface {
  points: Point[] = [];
  fillStyle = '';
  strokeStyle = '';
  constructor(pt1: Point, pt2: Point, pt3: Point, pt4: Point, fillStyle = '', strokeStyle = '') {
    this.points.push(pt1);
    this.points.push(pt2);
    this.points.push(pt3);
    this.points.push(pt4);
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle || fillStyle;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.fillStyle = this.fillStyle;
    ctx.strokeStyle = this.strokeStyle;
    ctx.beginPath();
    for (let i = 0; i < this.points.length; ++i) {
      if (i) {
        ctx.lineTo(this.points[i].x, this.points[i].y);
      } else {
        ctx.moveTo(this.points[i].x, this.points[i].y);
      }
    }
    ctx.closePath();
    this.fillStyle && ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}

export class Cube {
  surfaces: Surface[] = [];
  constructor(rect: Rect, z: number, zRotate: number, fillStyle = '#ddd', strokeStyle = '#ccc') {
    const offset = z * Math.sin((45 * Math.PI) / 180);

    const p1 = new Point(rect.x, rect.y + offset);
    const p2 = new Point(rect.ex - offset, rect.y + offset);
    const p3 = new Point(rect.ex - offset, rect.ey);
    const p4 = new Point(rect.x, rect.ey);

    // front
    this.surfaces.push(new Surface(p1, p2, p3, p4, fillStyle, strokeStyle));

    // up
    this.surfaces.push(
      new Surface(
        p1,
        new Point(rect.x + offset, rect.y),
        new Point(rect.ex, rect.y),
        p2,
        pSBC(0.5, fillStyle),
        strokeStyle
      )
    );

    // right
    this.surfaces.push(
      new Surface(
        p2,
        new Point(rect.ex, rect.y),
        new Point(rect.ex, rect.ey - offset),
        p3,
        pSBC(0.6, fillStyle),
        strokeStyle
      )
    );
  }

  render(ctx: CanvasRenderingContext2D) {
    for (const item of this.surfaces) {
      item.render(ctx);
    }
  }
}
