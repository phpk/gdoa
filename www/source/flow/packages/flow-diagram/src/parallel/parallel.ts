import { Node } from '@topology/core';

export function flowParallel(ctx: CanvasRenderingContext2D, node: Node) {
  ctx.beginPath();
  ctx.moveTo(node.rect.x, node.rect.y);
  ctx.lineTo(node.rect.ex, node.rect.y);
  ctx.moveTo(node.rect.x, node.rect.ey);
  ctx.lineTo(node.rect.ex, node.rect.ey);
  ctx.stroke();
}
