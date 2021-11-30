import { Node } from '../../models/node';

export function file(ctx: CanvasRenderingContext2D, node: Node) {
  ctx.beginPath();
  const offsetX = node.rect.width / 6;
  ctx.moveTo(node.rect.x, node.rect.y);
  ctx.lineTo(node.rect.ex - offsetX, node.rect.y);
  ctx.lineTo(node.rect.ex, node.rect.y + offsetX);
  ctx.lineTo(node.rect.ex, node.rect.ey);
  ctx.lineTo(node.rect.x, node.rect.ey);
  ctx.closePath();

  ctx.moveTo(node.rect.ex - offsetX, node.rect.y);
  ctx.lineTo(node.rect.ex - offsetX, node.rect.y + offsetX);
  ctx.lineTo(node.rect.ex, node.rect.y + offsetX);

  (node.fillStyle || node.bkType) && ctx.fill();
  ctx.stroke();
}
