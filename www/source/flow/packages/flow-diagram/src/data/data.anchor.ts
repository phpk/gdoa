import { Point, Node, Direction } from '@topology/core';

export function flowDataAnchors(node: Node) {
  node.anchors.push(new Point(node.rect.x + node.rect.width / 14, node.rect.y + node.rect.height / 2, Direction.Left));
  node.anchors.push(new Point(node.rect.x + (node.rect.width * 4) / 7, node.rect.y, Direction.Up));
  node.anchors.push(
    new Point(node.rect.x + (node.rect.width * 13) / 14, node.rect.y + node.rect.height / 2, Direction.Right)
  );

  node.anchors.push(new Point(node.rect.x + (node.rect.width * 3) / 7, node.rect.ey, Direction.Bottom));
}
