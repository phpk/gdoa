import { Pen, PenType, getRect } from '@topology/core';

import { alignNodes, spaceBetween } from './align';

export function layout(pens: Pen[], params: {
  maxWidth: number,     // 最大宽度
  nodeWidth?: number,    // 节点宽度
  nodeHeight?: number,   // 节点高度
  maxCount?: number,     // 水平个数
  spaceWidth?: number,   // 水平间距
  spaceHeight?: number;  // 垂直间距
}) {
  const spaceWidth = params.spaceWidth || 30;
  const spaceHeight = params.spaceHeight || 30;

  const rect = getRect(pens);
  let left = rect.x;
  let top = rect.y;

  const rows: any[] = [];
  let row: any[] = [];
  let maxHeight = 0;
  for (const item of pens) {
    if (item.type === PenType.Line) {
      continue;
    }

    if (params.nodeWidth > 0) {
      item.rect.width = params.nodeWidth;
    }
    if (params.nodeHeight > 0) {
      item.rect.height = params.nodeHeight;
    }

    if (item.rect.height > maxHeight) {
      maxHeight = item.rect.height;
    }

    item.rect.x = left;
    item.rect.y = top;
    item.rect.init();

    row.push(item);

    left += item.rect.width + spaceWidth;
    if (left > params.maxWidth || (params.maxCount > 0 && row.length >= params.maxCount)) {
      rows.push(row);
      row = [];

      left = rect.x;
      top += maxHeight + spaceHeight;
      maxHeight = 0;
    }
  }
  rows.push(row);

  for (const item of rows) {
    const r = getRect(item);
    r.width = params.maxWidth;
    alignNodes(item, r, 'middle');
    if (params.maxCount > 0) {
      spaceBetween(item, params.maxWidth);
    }
  }
}
