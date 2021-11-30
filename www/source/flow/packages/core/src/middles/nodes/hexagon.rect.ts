import { Node } from '../../models/node';
import { Rect } from '../../models/rect';

export function hexagonIconRect(node: Node) {
  const w = (node.rect.width * 3) / 5;
  const h = (node.rect.height * 3) / 4;
  node.iconRect = new Rect(
    node.rect.x + node.rect.width / 5 + node.paddingLeftNum,
    node.rect.y + node.paddingTopNum,
    w - node.paddingLeftNum - node.paddingRightNum,
    h - node.paddingTopNum - node.paddingBottomNum
  );
  node.fullIconRect = new Rect(
    node.rect.x + node.rect.width / 5 + node.paddingLeftNum,
    node.rect.y + node.paddingTopNum,
    w - node.paddingLeftNum - node.paddingRightNum,
    node.rect.height - node.paddingTopNum - node.paddingBottomNum
  );
}

export function hexagonTextRect(node: Node) {
  const w = (node.rect.width * 3) / 5;
  const h = node.rect.height / 4;
  node.textRect = new Rect(
    node.rect.x + node.rect.width / 5 + node.paddingLeftNum,
    node.rect.y + node.rect.height - h + node.paddingTopNum,
    w - node.paddingLeftNum - node.paddingRightNum,
    h
  );

  node.fullTextRect = new Rect(
    node.rect.x + node.rect.width / 5 + node.paddingLeftNum,
    node.rect.y + node.paddingTopNum,
    w - node.paddingLeftNum - node.paddingRightNum,
    node.rect.height - node.paddingTopNum - node.paddingBottomNum
  );
}
