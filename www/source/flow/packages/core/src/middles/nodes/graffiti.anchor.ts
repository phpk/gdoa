import { Node } from '../../models/node';
import { Point } from '../../models/point';
import { Direction } from '../../models/direction';

export function graffitiAnchors(node: Node) {
  if (!node.points || !node.points.length) {
    return;
  }
  const pt1 = node.points[0];
  const pt2 = node.points[node.points.length - 1];
  if (pt1.x < pt2.x) {
    node.anchors.push(new Point(pt1.x, pt1.y, Direction.Left));
    node.anchors.push(new Point(pt2.x, pt2.y, Direction.Right));
  } else {
    node.anchors.push(new Point(pt1.x, pt1.y, Direction.Right));
    node.anchors.push(new Point(pt2.x, pt2.y, Direction.Left));
  }
}
