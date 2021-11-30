import { Node } from '../../models/node';
import { Point } from '../../models/point';
import { Direction } from '../../models/direction';
import { Topology } from '@topology/core';

declare const topology:Topology;

export function lineAnchors(node: Node) {
  const y = node.rect.y + node.rect.height / 2;
  node.anchors.push(new Point(node.rect.x, y, Direction.Left));
  node.anchors.push(new Point(node.rect.x + node.rect.width, y, Direction.Right));
  const scale = topology.data.scale || 1; // 取全局的 scale 属性
  for (let i = node.rect.x + 5 * scale; i < node.rect.ex; i += 5 * scale) {
    const pt = new Point(
      i,
      y,
      Direction.Bottom
    );
    pt.hidden = true;
    node.anchors.push(pt);
  }
}
