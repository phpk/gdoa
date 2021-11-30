import { Node } from '@topology/core';

export function flowSubprocess(ctx: CanvasRenderingContext2D, node: Node) {
  ctx.beginPath();
  const offsetX = node.rect.width / 7;
  ctx.moveTo(node.rect.x, node.rect.y);
  ctx.lineTo(node.rect.ex, node.rect.y);
  ctx.lineTo(node.rect.ex, node.rect.ey);
  ctx.lineTo(node.rect.x, node.rect.ey);
  ctx.closePath();

  ctx.moveTo(node.rect.x + offsetX, node.rect.y);
  ctx.lineTo(node.rect.x + offsetX, node.rect.ey);

  ctx.moveTo(node.rect.ex - offsetX, node.rect.y);
  ctx.lineTo(node.rect.ex - offsetX, node.rect.ey);

  (node.fillStyle || node.bkType) && ctx.fill();
  ctx.stroke();
}
