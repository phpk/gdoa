import { Node } from '../../models/node';

export function lines(ctx: CanvasRenderingContext2D, node: Node) {
  if (!node.points || !node.points[1]) {
    return;
  }

  ctx.beginPath();
  ctx.moveTo(node.points[0].x, node.points[0].y);
  for (let i = 1; i < node.points.length;) {
    // curve 控制点
    if (node.points[i].data) {
      if (node.points[i + 2]) {
        ctx.bezierCurveTo(
          node.points[i].x,
          node.points[i].y,
          node.points[i + 1].x,
          node.points[i + 1].y,
          node.points[i + 2].x,
          node.points[i + 2].y
        );
        i += 2;
      } else {
        break;
      }
    } else {
      ctx.lineTo(node.points[i].x, node.points[i].y);
      ++i;
    }
  }
  node['closePath'] && !node['doing'] && ctx.closePath();
  (node.fillStyle || node.bkType) && ctx.fill();
  ctx.stroke();
}
