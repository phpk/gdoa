import { Node, Rect } from '@topology/core';

export function flowDataIconRect(node: Node) {
  node.iconRect = new Rect(0, 0, 0, 0);
}

export function flowDataTextRect(node: Node) {
  node.textRect = new Rect(
    node.rect.x + node.rect.width / 7,
    node.rect.y,
    (node.rect.width * 5) / 7,
    node.rect.height
  );
  node.fullTextRect = node.textRect;
}
