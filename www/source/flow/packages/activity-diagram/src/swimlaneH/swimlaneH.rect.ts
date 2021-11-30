import { Node, Rect } from '@topology/core';
declare const window: any;
export function swimlaneHIconRect(node: Node) {
  node.iconRect = new Rect(0, 0, 0, 0);
}

export function swimlaneHTextRect(node: Node) {
  node.textRect = new Rect(
    node.rect.x + (2 / 100) * node.rect.width,
    node.rect.y,
    (4 / 100) * node.rect.width,
    node.rect.height
  );
  node.fullTextRect = node.textRect;
}
