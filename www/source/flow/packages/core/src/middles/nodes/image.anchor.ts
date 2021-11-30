import { Node } from '../../models/node';
import { Point } from '../../models/point';
import { Direction } from '../../models/direction';

export function imageAnchors(node: Node) {
  let textWidth = 0;
  let textHeight = 0;
  if (node.text) {
    if (node.paddingRightNum) {
      textWidth = node.paddingRightNum;
    } else {
      textHeight = node.paddingBottomNum || node.lineHeight * node.fontSize * (node.textMaxLine || 1);
    }
  }

  node.anchors.push(new Point(node.rect.x, node.rect.y + (node.rect.height - textHeight) / 2, Direction.Left));
  node.anchors.push(new Point(node.rect.x + (node.rect.width - textWidth) / 2, node.rect.y, Direction.Up));
  node.anchors.push(
    new Point(
      node.rect.x + node.rect.width - textWidth,
      node.rect.y + (node.rect.height - textHeight) / 2,
      Direction.Right
    )
  );
  node.anchors.push(
    new Point(
      node.rect.x + (node.rect.width - textWidth) / 2,
      node.rect.y + node.rect.height - textHeight,
      Direction.Bottom
    )
  );
}
