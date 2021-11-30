import { Node, Rect } from '@topology/core';

declare const window: any;

export function swimlaneVIconRect(node: Node) {
  node.iconRect = new Rect(0, 0, 0, 0);
}

export function swimlaneVTextRect(node: Node) {
  node.textRect = new Rect(
    node.rect.x,
    node.rect.y,
    node.rect.width,
    (8 / 100) * node.rect.height
  );
  node.fullTextRect = node.textRect;
}
