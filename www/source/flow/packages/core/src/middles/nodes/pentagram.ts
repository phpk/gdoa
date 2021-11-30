import { Node } from '../../models/node';

export function pentagram(ctx: CanvasRenderingContext2D, node: Node) {
  ctx.beginPath();
  for (let i = 0; i < 5; ++i) {
    ctx.lineTo(
      (Math.cos(((18 + 72 * i) / 180) * Math.PI) * node.rect.width) / 2 + node.rect.x + node.rect.width / 2,
      (-Math.sin(((18 + 72 * i) / 180) * Math.PI) * node.rect.width) / 2 + node.rect.y + node.rect.height / 2
    );
    ctx.lineTo(
      (Math.cos(((54 + 72 * i) / 180) * Math.PI) * node.rect.width) / 4 + node.rect.x + node.rect.width / 2,
      (-Math.sin(((54 + 72 * i) / 180) * Math.PI) * node.rect.width) / 4 + node.rect.y + node.rect.height / 2
    );
  }
  ctx.closePath();
  (node.fillStyle || node.bkType) && ctx.fill();
  ctx.stroke();
}
