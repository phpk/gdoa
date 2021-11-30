import { Node } from '../../models/node';
import { Rect } from '../../models/rect';

export function triangleIconRect(node: Node) {
  let w = (node.rect.width * 2) / 7;
  let h = (node.rect.height * 2) / 7;
  if (w > h) {
    w = h;
  } else {
    h = w;
  }
  let top = w;
  if (top < 10) {
    top = 10;
  }
  node.iconRect = new Rect(node.rect.x + (node.rect.width - w) / 2, node.rect.y + top, w, h);
}

export function triangleTextRect(node: Node) {
  node.textRect = new Rect(
    node.rect.x + node.rect.width / 4,
    node.rect.y + (node.rect.height * 2) / 3,
    node.rect.width / 2,
    node.rect.height / 3 - 5
  );

  const w = node.rect.width / 2;
  const h = (node.rect.height * 3) / 7;
  node.fullTextRect = new Rect(node.rect.x + (node.rect.width - w) / 2, node.rect.y + node.rect.height / 2 - 5, w, h);
}
