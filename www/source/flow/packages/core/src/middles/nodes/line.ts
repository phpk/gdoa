import { Node } from '../../models/node';

export function line(ctx: CanvasRenderingContext2D, node: Node) {
  ctx.beginPath();
  const y = node.rect.y + node.rect.height / 2;
  ctx.moveTo(node.rect.x, y);
  ctx.lineTo(node.rect.x + node.rect.width, y);
  ctx.stroke();
}
