import { Point, Node, Direction } from '@topology/core';

export function flowCommentAnchors(node: Node) {
  node.anchors.push(new Point(node.rect.x, node.rect.y + node.rect.height / 2, Direction.Left));
}
