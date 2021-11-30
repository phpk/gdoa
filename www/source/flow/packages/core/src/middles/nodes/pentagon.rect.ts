import { Node } from '../../models/node';
import { Rect } from '../../models/rect';

export function pentagonIconRect(node: Node) {
  let w = node.rect.width / 2;
  let h = node.rect.height / 2;
  if (w > h) {
    w = h;
  } else {
    h = w;
  }
  let top = node.rect.height / 7;
  if (top < 10) {
    top = 10;
  }
  node.iconRect = new Rect(node.rect.x + (node.rect.width - w) / 2, node.rect.y + top, w, h);
}

export function pentagonTextRect(node: Node) {
  node.textRect = new Rect(
    node.rect.x + node.rect.width / 5,
    node.rect.y + (node.rect.height * 5) / 7,
    (node.rect.width * 3) / 5,
    node.rect.height / 4
  );

  const w = (node.rect.width * 3) / 5;
  const h = (node.rect.height * 3) / 5;
  node.fullTextRect = new Rect(node.rect.x + (node.rect.width - w) / 2, node.rect.y + node.rect.height / 4, w, h);
}
