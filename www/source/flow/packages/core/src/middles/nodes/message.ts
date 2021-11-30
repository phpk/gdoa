import { Node } from '../../models/node';

export function message(ctx: CanvasRenderingContext2D, node: Node) {
  ctx.beginPath();
  ctx.moveTo(node.rect.x, node.rect.y);
  ctx.lineTo(node.rect.x + node.rect.width, node.rect.y);
  ctx.lineTo(node.rect.x + node.rect.width, node.rect.y + (node.rect.height * 3) / 4);
  ctx.lineTo(node.rect.x + (node.rect.width * 8) / 16, node.rect.y + (node.rect.height * 3) / 4);
  ctx.lineTo(node.rect.x + node.rect.width / 4, node.rect.ey);
  ctx.lineTo(node.rect.x + (node.rect.width * 5) / 16, node.rect.y + (node.rect.height * 3) / 4);
  ctx.lineTo(node.rect.x, node.rect.y + (node.rect.height * 3) / 4);
  ctx.closePath();
  (node.fillStyle || node.bkType) && ctx.fill();
  ctx.stroke();
}
