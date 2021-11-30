import { Node, Rect } from '@topology/core';

export function flowExternStorageIconRect(node: Node) {
  node.iconRect = new Rect(0, 0, 0, 0);
}

export function flowExternStorageTextRect(node: Node) {
  node.textRect = new Rect(
    node.rect.x + node.rect.width / 6,
    node.rect.y,
    (node.rect.width * 3) / 4,
    node.rect.height
  );
  node.fullTextRect = node.textRect;
}
