import { Node, Rect } from '@topology/core';

export function simpleClassIconRect(node: Node) {
  node.iconRect = new Rect(0, 0, 0, 0);
}

export function simpleClassTextRect(node: Node) {
  const topHeight = 0.2 * node.rect.height;
  node.textRect = new Rect(node.rect.x, node.rect.y, node.rect.width, topHeight);
  node.fullTextRect = node.textRect;
}

export function interfaceClassIconRect(node: Node) {
  node.iconRect = new Rect(0, 0, 0, 0);
}

export function interfaceClassTextRect(node: Node) {
  const topHeight = 0.2 * node.rect.height;
  node.textRect = new Rect(node.rect.x, node.rect.y, node.rect.width, topHeight);
  node.fullTextRect = node.textRect;
}
