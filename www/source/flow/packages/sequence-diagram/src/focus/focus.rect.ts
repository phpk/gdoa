import { Node, Rect } from '@topology/core';

export function sequenceFocusIconRect(node: Node) {
  node.iconRect = new Rect(0, 0, 0, 0);
}

export function sequenceFocusTextRect(node: Node) {
  node.textRect = undefined;
  node.fullTextRect = node.textRect;
}
