import { Store } from 'le5le-store';
import { Point } from '../../models/point';

export function circleSolid(ctx: CanvasRenderingContext2D, from: Point, to: Point, size: number, fillStyle?: string) {
  size += ctx.lineWidth * 3;
  const r = size / 2;
  if (ctx.lineWidth < 2) {
    ctx.lineWidth = 2;
  }
  ctx.translate(to.x, to.y);
  ctx.rotate(Math.atan2(to.y - from.y, to.x - from.x));
  ctx.translate(-to.x, -to.y - ctx.lineWidth / 10);
  ctx.arc(to.x - r - ctx.lineWidth / 2, to.y, r, 0, 2 * Math.PI);
  ctx.stroke();
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
  } else {
    ctx.fillStyle = ctx.strokeStyle;
  }
  ctx.fill();
}

export function circle(ctx: CanvasRenderingContext2D, from: Point, to: Point, size: number) {
  circleSolid(ctx, from, to, size, Store.get('LT:bkColor') || '#fff');
}
