import { Node } from '../../models/node';
import { Point } from '../../models/point';
import { Direction } from '../../models/direction';

export function triangleAnchors(node: Node) {
  node.anchors.push(new Point(node.rect.x + node.rect.width / 2, node.rect.y, Direction.Up));
  node.anchors.push(
    new Point(node.rect.x + (node.rect.width * 3) / 4, node.rect.y + node.rect.height / 2, Direction.Right)
  );
  node.anchors.push(new Point(node.rect.x + node.rect.width / 2, node.rect.y + node.rect.height, Direction.Bottom));
  node.anchors.push(new Point(node.rect.x + node.rect.width / 4, node.rect.y + node.rect.height / 2, Direction.Left));
}
