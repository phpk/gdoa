import { Point } from '../../models/point';
import { Node } from '../../models/node';
import { Direction } from '../../models/direction';

export function arrowAnchors(node: Node) {
  node.anchors.push(new Point(node.rect.x, node.rect.y + node.rect.height / 2, Direction.Left));
  node.anchors.push(new Point(node.rect.x + node.rect.width, node.rect.y + node.rect.height / 2, Direction.Right));
}
