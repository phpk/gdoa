import { Node } from '../models/node';
import { Rect } from '../models/rect';

export function defaultIconRect(node: Node) {
  if (node.image && node.imageWidth) {
    node.iconRect = new Rect(
      node.rect.x + node.paddingLeftNum,
      node.rect.y + node.paddingTopNum,
      node.imageWidth,
      node.imageHeight
    );
  } else if (node.icon && node.iconSize) {
    node.iconRect = new Rect(
      node.rect.x + node.paddingLeftNum,
      node.rect.y + node.paddingTopNum,
      node.iconSize,
      node.iconSize
    );
  } else {
    node.iconRect = new Rect(
      node.rect.x + node.paddingLeftNum,
      node.rect.y + node.paddingTopNum,
      node.rect.width - node.paddingLeftNum - node.paddingRightNum,
      (node.rect.height * 3) / 4 - node.paddingTopNum - node.paddingBottomNum
    );
  }

  node.fullIconRect = new Rect(
    node.rect.x + node.paddingLeftNum,
    node.rect.y + node.paddingTopNum,
    node.rect.width - node.paddingLeftNum - node.paddingRightNum,
    node.rect.height - node.paddingTopNum - node.paddingBottomNum
  );
}

export function defaultTextRect(node: Node) {
  const height = node.rect.height - node.paddingTopNum - node.paddingBottomNum;
  node.textRect = new Rect(
    node.rect.x + node.paddingLeftNum,
    node.rect.y + node.paddingTopNum + (height * 3) / 4,
    node.rect.width - node.paddingLeftNum - node.paddingRightNum,
    height / 4
  );
  node.fullTextRect = new Rect(
    node.rect.x + node.paddingLeftNum,
    node.rect.y + node.paddingTopNum,
    node.rect.width - node.paddingLeftNum - node.paddingRightNum,
    height
  );
}
