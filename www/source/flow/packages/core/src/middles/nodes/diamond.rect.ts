import { Node } from '../../models/node';
import { Rect } from '../../models/rect';

export function diamondIconRect(node: Node) {
  let w = node.rect.width / 3;
  let h = node.rect.height / 3;
  if (w > h) {
    w = h;
  } else {
    h = w;
  }
  let top = node.rect.width / 5;
  if (top < 10) {
    top = 10;
  }
  node.iconRect = new Rect(node.rect.x + (node.rect.width - w) / 2, node.rect.y + top, w, h);
}

export function diamondTextRect(node: Node) {
  let bottom = node.rect.height / 10;
  if (bottom < 5) {
    bottom = 0;
  }
  node.textRect = new Rect(
    node.rect.x + node.rect.width / 3,
    node.rect.y + (node.rect.height * 2) / 3 - bottom,
    node.rect.width / 3,
    node.rect.height / 3 - 5
  );

  const w = node.rect.width / 2;
  const h = (node.rect.height * 1) / 2;
  node.fullTextRect = new Rect(node.rect.x + (node.rect.width - w) / 2, node.rect.y + node.rect.height / 4, w, h);
}
