import { Line } from '../../models/line';

export function line(ctx: CanvasRenderingContext2D, l: Line) {
  ctx.beginPath();
  ctx.moveTo(l.from.x, l.from.y);
  ctx.lineTo(l.to.x, l.to.y);
  ctx.stroke();
}

export function lineControlPoints(ctx: CanvasRenderingContext2D, l: Line) { }

export function calcLineControlPoints(l: Line) {
  l.controlPoints = [];
}
