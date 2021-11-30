import { Node } from '../../models/node';
import { Point } from '../../models/point';

export function mindLineAnchors(node: Node) {
  node.anchors.push(new Point(node.rect.x, node.rect.y + node.rect.height, 4));

  node.anchors.push(
    new Point(node.rect.x + node.rect.width, node.rect.y + node.rect.height, 2)
  );
}
