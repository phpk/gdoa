import { Node } from '@topology/core';

export function sequenceFocus(ctx: CanvasRenderingContext2D, node: Node) {
  ctx.beginPath();
  ctx.rect(node.rect.x, node.rect.y, node.rect.width, node.rect.height);
  if (this.fillStyle) {
    ctx.fillStyle = this.fillStyle;
  } else {
    ctx.fillStyle = '#fff';
  }
  (node.fillStyle || node.bkType) && ctx.fill();
  ctx.stroke();
}
