import { registerNode, loadJS, Node, Rect } from '@topology/core';
import { echarts, echartsObjs } from './echarts';

export function register(_echarts?: any) {
  echartsObjs.echarts = _echarts;
  if (!echartsObjs.echarts && !(echarts as any)) {
    loadJS(
      'https://cdn.bootcdn.net/ajax/libs/echarts/4.8.0/echarts.min.js',
      undefined,
      true
    );
  }
  registerNode('echarts', echarts, undefined, (node: Node) => {
    node.iconRect = new Rect(node.rect.x, node.rect.y, node.rect.width, node.rect.height);
    node.fullIconRect = node.rect;
  }, undefined);
}
