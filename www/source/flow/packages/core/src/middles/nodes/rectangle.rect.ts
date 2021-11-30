import { Node } from '../../models/node';
import { Rect } from '../../models/rect';

export function rectangleIconRect(node: Node) {
  node.iconRect = new Rect(
    node.rect.x + node.paddingLeftNum,
    node.rect.y + node.paddingTopNum,
    node.rect.height - node.paddingTopNum - node.paddingBottomNum,
    node.rect.height - node.paddingTopNum - node.paddingBottomNum
  );
  node.fullIconRect = new Rect(
    node.rect.x + node.paddingLeftNum,
    node.rect.y + node.paddingTopNum,
    node.rect.width - node.paddingLeftNum - node.paddingRightNum,
    node.rect.height - node.paddingTopNum - node.paddingBottomNum
  );
}

export function rectangleTextRect(node: Node) {
  const height = node.rect.height - node.paddingTopNum - node.paddingBottomNum;
  node.textRect = new Rect(
    node.rect.x + node.paddingLeftNum + height,
    node.rect.y + node.paddingTopNum,
    node.rect.width - node.paddingLeftNum - node.paddingRightNum - height,
    height
  );
  node.fullTextRect = new Rect(
    node.rect.x + node.paddingLeftNum,
    node.rect.y + node.paddingTopNum,
    node.rect.width - node.paddingLeftNum - node.paddingRightNum,
    height
  );
}
