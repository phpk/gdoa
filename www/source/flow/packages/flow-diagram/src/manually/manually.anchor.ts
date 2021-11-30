import { Point, Node, Direction } from '@topology/core';

export function flowManuallyAnchors(node: Node) {
  node.anchors.push(new Point(node.rect.x, node.rect.y + (node.rect.height * 5) / 8, Direction.Left));
  node.anchors.push(new Point(node.rect.x + node.rect.width / 2, node.rect.y + node.rect.height / 8, Direction.Up));
  node.anchors.push(new Point(node.rect.ex, node.rect.y + node.rect.height / 2, Direction.Right));
  node.anchors.push(new Point(node.rect.x + node.rect.width / 2, node.rect.ey, Direction.Bottom));
}
