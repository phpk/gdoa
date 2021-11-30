import { Node } from '../../models/node';

export function mindLine(ctx: CanvasRenderingContext2D, node: Node) {
  ctx.beginPath();
  ctx.moveTo(node.rect.x, node.rect.y + node.rect.height);
  ctx.lineTo(node.rect.x + node.rect.width, node.rect.y + node.rect.height);
  ctx.closePath();
  ctx.stroke();
}
