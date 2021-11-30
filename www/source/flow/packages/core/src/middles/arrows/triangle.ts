import { Store } from 'le5le-store';
import { Point } from '../../models/point';

export function triangleSolid(
  ctx: CanvasRenderingContext2D,
  from: Point,
  to: Point,
  size?: number,
  fillStyle?: string
) {
  size += ctx.lineWidth * 3;
  let arrowWidth = ctx.lineWidth / 10;
  if (ctx.lineWidth < 2) {
    ctx.lineWidth = 2;
    arrowWidth = 0;
  }
  ctx.translate(to.x, to.y);
  ctx.rotate(Math.atan2(to.y - from.y, to.x - from.x));
  ctx.translate(-to.x - ctx.lineWidth + arrowWidth * 5, -to.y);
  ctx.moveTo(to.x, to.y + arrowWidth);
  ctx.lineTo(to.x, to.y - arrowWidth);
  ctx.lineTo(to.x - size, to.y - size / 3);
  ctx.lineTo(to.x - size, to.y + size / 3);

  ctx.closePath();
  ctx.stroke();
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
  } else {
    ctx.fillStyle = ctx.strokeStyle;
  }
  ctx.fill();
}

export function triangle(ctx: CanvasRenderingContext2D, from: Point, to: Point, size: number) {
  triangleSolid(ctx, from, to, size, Store.get('LT:bkColor') || '#fff');
}
