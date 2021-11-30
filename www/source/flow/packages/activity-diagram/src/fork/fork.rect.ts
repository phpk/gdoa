import { Node, Rect } from '@topology/core';

export function forkIconRect(node: Node) {
  node.iconRect = new Rect(0, 0, 0, 0);
}

export function forkTextRect(node: Node) {
  node.textRect = new Rect(node.rect.x, node.rect.y, node.rect.width, node.rect.height);
  node.fullTextRect = node.textRect;
}
