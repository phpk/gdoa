import { Node } from '../../models/node';
import { Rect } from '../../models/rect';

export function messageIconRect(node: Node) {
  node.iconRect = new Rect(0, 0, 0, 0);
  node.fullIconRect = node.iconRect;
}

export function messageTextRect(node: Node) {
  node.textRect = new Rect(
    node.rect.x + node.paddingLeftNum,
    node.rect.y + node.paddingTopNum,
    node.rect.width - node.paddingLeftNum - node.paddingRightNum,
    (node.rect.height * 3) / 4 - node.paddingTopNum - node.paddingBottomNum
  );
  node.fullTextRect = node.textRect;
}
