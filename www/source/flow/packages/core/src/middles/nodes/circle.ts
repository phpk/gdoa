import { Node } from '../../models/node';

export function circle(ctx: CanvasRenderingContext2D, node: Node) {
  ctx.beginPath();
  ctx.ellipse(
    node.rect.x + node.rect.width / 2,
    node.rect.y + node.rect.height / 2,
    node.rect.width / 2,
    node.rect.height / 2,
    0,
    0,
    Math.PI * 2
  );
  (node.fillStyle || node.bkType) && ctx.fill();
  ctx.stroke();
}
