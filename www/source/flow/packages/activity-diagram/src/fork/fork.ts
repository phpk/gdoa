import { Node } from '@topology/core';

export function fork(ctx: CanvasRenderingContext2D, node: Node) {
  let wr = node.borderRadius;
  let hr = node.borderRadius;
  if (node.borderRadius < 1) {
    wr = node.rect.width * node.borderRadius;
    hr = node.rect.height * node.borderRadius;
  }
  let r = wr < hr ? wr : hr;
  if (node.rect.width < 2 * r) {
    r = node.rect.width / 2;
  }
  if (node.rect.height < 2 * r) {
    r = node.rect.height / 2;
  }

  ctx.beginPath();
  ctx.moveTo(node.rect.x + r, node.rect.y);
  ctx.arcTo(
    node.rect.x + node.rect.width,
    node.rect.y,
    node.rect.x + node.rect.width,
    node.rect.y + node.rect.height,
    r
  );
  ctx.arcTo(
    node.rect.x + node.rect.width,
    node.rect.y + node.rect.height,
    node.rect.x,
    node.rect.y + node.rect.height,
    r
  );
  ctx.arcTo(node.rect.x, node.rect.y + node.rect.height, node.rect.x, node.rect.y, r);
  ctx.arcTo(node.rect.x, node.rect.y, node.rect.x + node.rect.width, node.rect.y, r);
  ctx.closePath();

  (node.fillStyle || node.bkType) && ctx.fill();
  ctx.stroke();
}
