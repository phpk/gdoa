import { Point } from '../../models/point';
import { Node } from '../../models/node';
import { Direction } from '../../models/direction';

export function messageAnchors(node: Node) {
  node.anchors.push(new Point(node.rect.x, node.rect.y + (node.rect.height * 3) / 8, Direction.Left));
  node.anchors.push(new Point(node.rect.x + node.rect.width / 2, node.rect.y, Direction.Up));
  node.anchors.push(
    new Point(node.rect.x + node.rect.width, node.rect.y + (node.rect.height * 3) / 8, Direction.Right)
  );

  node.anchors.push(new Point(node.rect.x + node.rect.width / 4, node.rect.ey, Direction.Bottom));
}
