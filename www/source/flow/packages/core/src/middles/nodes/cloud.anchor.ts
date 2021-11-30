import { Point } from '../../models/point';
import { Node } from '../../models/node';
import { Direction } from '../../models/direction';

export function cloudAnchors(node: Node) {
  node.anchors.push(new Point(node.rect.x, node.rect.y + (node.rect.height * 3) / 5, Direction.Left));
  node.anchors.push(new Point(node.rect.x + node.rect.width / 2, node.rect.y + node.rect.height / 9, Direction.Up));
  node.anchors.push(
    new Point(node.rect.x + node.rect.width, node.rect.y + (node.rect.height * 3) / 5, Direction.Right)
  );

  node.anchors.push(
    new Point(node.rect.x + node.rect.width / 2, node.rect.y + (node.rect.height * 4) / 5, Direction.Bottom)
  );
}
