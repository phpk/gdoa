import { Node } from '@topology/core';

export function flowDb(ctx: CanvasRenderingContext2D, node: Node) {
  ctx.beginPath();
  const offsetY = node.rect.height / 7;
  ctx.moveTo(node.rect.x, node.rect.y + offsetY);
  ctx.bezierCurveTo(
    node.rect.x,
    (node.rect.y - offsetY / 2) | 0,
    node.rect.ex,
    (node.rect.y - offsetY / 2) | 0,
    node.rect.ex,
    node.rect.y + offsetY
  );
  ctx.lineTo(node.rect.ex, node.rect.ey - offsetY);
  ctx.bezierCurveTo(
    node.rect.ex,
    (node.rect.ey + offsetY / 2) | 0,
    node.rect.x,
    (node.rect.ey + offsetY / 2) | 0,
    node.rect.x,
    node.rect.ey - offsetY
  );
  ctx.closePath();
  ctx.moveTo(node.rect.x, node.rect.ey - offsetY);
  ctx.bezierCurveTo(
    node.rect.x,
    (node.rect.ey - offsetY * 2) | 0,
    node.rect.ex,
    (node.rect.ey - offsetY * 2) | 0,
    node.rect.ex,
    node.rect.ey - offsetY
  );
  (node.fillStyle || node.bkType) && ctx.fill();
  ctx.stroke();
}
