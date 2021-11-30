import { Node } from '@topology/core';

export function flowInternalStorage(ctx: CanvasRenderingContext2D, node: Node) {
  ctx.beginPath();

  ctx.moveTo(node.rect.x, node.rect.y);
  ctx.lineTo(node.rect.ex, node.rect.y);
  ctx.lineTo(node.rect.ex, node.rect.ey);
  ctx.lineTo(node.rect.x, node.rect.ey);
  ctx.closePath();

  const offset = node.rect.width / 7;
  ctx.moveTo(node.rect.x, node.rect.y + offset);
  ctx.lineTo(node.rect.ex, node.rect.y + offset);

  ctx.moveTo(node.rect.x + offset, node.rect.y);
  ctx.lineTo(node.rect.x + offset, node.rect.ey);

  (node.fillStyle || node.bkType) && ctx.fill();
  ctx.stroke();
}
