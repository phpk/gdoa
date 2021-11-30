import { Node } from '../../models/node';
import { Rect } from '../../models/rect';

export function cubeIconRect(node: Node) {
  node.fullIconRect = node.fullTextRect;
  node.iconRect = new Rect(
    node.fullIconRect.x,
    node.fullIconRect.y,
    node.fullIconRect.width,
    (node.fullIconRect.height * 2) / 3
  );
}

export function cubeTextRect(node: Node) {
  const offset = node.z * Math.sin((45 * Math.PI) / 180);
  node.fullTextRect = new Rect(node.rect.x, node.rect.y + offset, node.rect.width - offset, node.rect.height - offset);

  node.textRect = new Rect(
    node.fullTextRect.x + 10,
    node.fullTextRect.y + (node.fullTextRect.height * 2) / 3,
    node.fullTextRect.width - 20,
    node.fullTextRect.height / 3 - 5
  );
}
