import { Node } from '../../models/node';
import { Point } from '../../models/point';
import { Direction } from '../../models/direction';

export function pentagramAnchors(node: Node) {
  node.anchors.push(
    new Point(
      (Math.cos((18 / 180) * Math.PI) * node.rect.width) / 2 + node.rect.x + node.rect.width / 2,
      (-Math.sin((18 / 180) * Math.PI) * node.rect.width) / 2 + node.rect.y + node.rect.height / 2,
      Direction.Right
    )
  );
  node.anchors.push(
    new Point(
      (Math.cos(((18 + 72) / 180) * Math.PI) * node.rect.width) / 2 + node.rect.x + node.rect.width / 2,
      (-Math.sin(((18 + 72) / 180) * Math.PI) * node.rect.width) / 2 + node.rect.y + node.rect.height / 2,
      Direction.Up
    )
  );
  node.anchors.push(
    new Point(
      (Math.cos(((18 + 72 * 2) / 180) * Math.PI) * node.rect.width) / 2 + node.rect.x + node.rect.width / 2,
      (-Math.sin(((18 + 72 * 2) / 180) * Math.PI) * node.rect.width) / 2 + node.rect.y + node.rect.height / 2,
      Direction.Left
    )
  );
  node.anchors.push(
    new Point(
      (Math.cos(((18 + 72 * 3) / 180) * Math.PI) * node.rect.width) / 2 + node.rect.x + node.rect.width / 2,
      (-Math.sin(((18 + 72 * 3) / 180) * Math.PI) * node.rect.width) / 2 + node.rect.y + node.rect.height / 2,
      Direction.Bottom
    )
  );
  node.anchors.push(
    new Point(
      (Math.cos(((18 + 72 * 4) / 180) * Math.PI) * node.rect.width) / 2 + node.rect.x + node.rect.width / 2,
      (-Math.sin(((18 + 72 * 4) / 180) * Math.PI) * node.rect.width) / 2 + node.rect.y + node.rect.height / 2,
      Direction.Bottom
    )
  );
}
