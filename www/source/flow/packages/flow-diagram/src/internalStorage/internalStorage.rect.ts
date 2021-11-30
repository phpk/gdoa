import { Node, Rect } from '@topology/core';

export function flowInternalStorageIconRect(node: Node) {
  node.iconRect = new Rect(0, 0, 0, 0);
}

export function flowInternalStorageTextRect(node: Node) {
  const offset = node.rect.width / 7;
  node.textRect = new Rect(
    node.rect.x + offset,
    node.rect.y + offset,
    node.rect.width - offset,
    node.rect.height - offset
  );
  node.fullTextRect = node.textRect;
}
