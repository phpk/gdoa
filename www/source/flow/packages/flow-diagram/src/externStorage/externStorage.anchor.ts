import { Node, Point, Direction } from '@topology/core';

export function flowExternStorageAnchors(node: Node) {
  node.anchors.push(new Point(node.rect.x, node.rect.y + node.rect.height / 2, Direction.Left));
  node.anchors.push(new Point(node.rect.x + (node.rect.width * 8) / 15, node.rect.y, Direction.Up));
  node.anchors.push(
    new Point(node.rect.x + (node.rect.width * 13) / 14, node.rect.y + node.rect.height / 2, Direction.Right)
  );

  node.anchors.push(new Point(node.rect.x + (node.rect.width * 8) / 15, node.rect.ey, Direction.Bottom));
}
