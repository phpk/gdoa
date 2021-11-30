import { Node } from '../../models/node';

export function diamond(ctx: CanvasRenderingContext2D, node: Node) {
  ctx.beginPath();
  ctx.moveTo(node.rect.x + node.rect.width / 2, node.rect.y);
  ctx.lineTo(node.rect.x + node.rect.width, node.rect.y + node.rect.height / 2);
  ctx.lineTo(node.rect.x + node.rect.width / 2, node.rect.y + node.rect.height);
  ctx.lineTo(node.rect.x, node.rect.y + node.rect.height / 2);
  ctx.closePath();
  (node.fillStyle || node.bkType) && ctx.fill();
  ctx.stroke();
}
