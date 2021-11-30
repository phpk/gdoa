import { Node } from '../../models/node';

export function people(ctx: CanvasRenderingContext2D, node: Node) {
  ctx.beginPath();

  const r = node.rect.width / 4;
  const middle = node.rect.x + node.rect.width / 2;
  ctx.arc(middle, node.rect.y + r, r, 0, Math.PI * 2);

  ctx.moveTo(node.rect.x, node.rect.y + r * 3);
  ctx.lineTo(node.rect.ex, node.rect.y + r * 3);

  ctx.moveTo(middle, node.rect.y + r * 2);
  ctx.lineTo(middle, node.rect.y + r * 4);

  ctx.moveTo(middle, node.rect.y + r * 4);
  ctx.lineTo(node.rect.x, node.rect.ey);

  ctx.moveTo(middle, node.rect.y + r * 4);
  ctx.lineTo(node.rect.ex, node.rect.ey);

  (node.fillStyle || node.bkType) && ctx.fill();
  ctx.stroke();
}
