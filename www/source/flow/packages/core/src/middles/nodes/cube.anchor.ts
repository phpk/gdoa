import { Point } from '../../models/point';
import { Node } from '../../models/node';
import { Direction } from '../../models/direction';

export function cubeAnchors(node: Node) {
  const offset = node.z * Math.sin((45 * Math.PI) / 180);

  node.anchors.push(new Point(node.rect.x, node.rect.ey - (node.rect.height - offset) / 2, Direction.Left));
  node.anchors.push(new Point(node.rect.x + node.rect.width / 2, node.rect.y + offset / 2, Direction.Up));
  node.anchors.push(new Point(node.rect.ex - offset / 2, node.rect.y + node.rect.height / 2, Direction.Right));
  node.anchors.push(
    new Point(node.rect.x + (node.rect.width - offset) / 2, node.rect.y + node.rect.height, Direction.Bottom)
  );
}
