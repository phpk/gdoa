import { Node } from '../../models/node';
import { Point } from '../../models/point';

export function graffiti(ctx: CanvasRenderingContext2D, node: Node) {
  if (!node.points || !node.points[0]) {
    return;
  }

  ctx.beginPath();
  ctx.moveTo(node.points[0].x, node.points[0].y);
  node.points.forEach((pt: Point) => {
    ctx.lineTo(pt.x, pt.y);
  });
  node['closePath'] && !node['doing'] && ctx.closePath();
  (node.fillStyle || node.bkType) && ctx.fill();
  ctx.stroke();
}

