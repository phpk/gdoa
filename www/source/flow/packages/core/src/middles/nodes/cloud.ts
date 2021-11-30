import { Node } from '../../models/node';

export function cloud(ctx: CanvasRenderingContext2D, node: Node) {
  ctx.beginPath();
  ctx.moveTo(node.rect.x + node.rect.width / 5, node.rect.y + (node.rect.height * 13) / 16);
  ctx.bezierCurveTo(
    node.rect.x - node.rect.width / 15,
    node.rect.y + (node.rect.height * 13) / 16,
    node.rect.x - node.rect.width / 15,
    node.rect.y + (node.rect.height * 7) / 16,
    node.rect.x + node.rect.width / 5,
    node.rect.y + (node.rect.height * 7) / 16
  );
  ctx.bezierCurveTo(
    node.rect.x + node.rect.width / 5,
    node.rect.y,
    node.rect.x + (node.rect.width * 4) / 5,
    node.rect.y,
    node.rect.x + (node.rect.width * 4) / 5,
    node.rect.y + (node.rect.height * 7) / 16
  );
  ctx.bezierCurveTo(
    node.rect.x + (node.rect.width * 16) / 15,
    node.rect.y + (node.rect.height * 7) / 16,
    node.rect.x + (node.rect.width * 16) / 15,
    node.rect.y + (node.rect.height * 13) / 16,
    node.rect.x + (node.rect.width * 4) / 5,
    node.rect.y + (node.rect.height * 13) / 16
  );
  ctx.closePath();
  (node.fillStyle || node.bkType) && ctx.fill();
  ctx.stroke();
}
