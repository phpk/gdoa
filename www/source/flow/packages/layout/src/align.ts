import { Pen, Node, Rect } from '@topology/core';

export function alignNodes(pens: Pen[], rect: Rect, align: string) {
  for (const item of pens) {
    if (!(item instanceof Node)) {
      continue;
    }
    switch (align) {
      case 'left':
        item.rect.x = rect.x;
        break;
      case 'right':
        item.rect.x = rect.ex - item.rect.width;
        break;
      case 'top':
        item.rect.y = rect.y;
        break;
      case 'bottom':
        item.rect.y = rect.ey - item.rect.height;
        break;
      case 'center':
        item.rect.x = rect.center.x - item.rect.width / 2;
        break;
      case 'middle':
        item.rect.y = rect.center.y - item.rect.height / 2;
        break;
    }

    item.rect.floor();
    item.rect.calcCenter();
    item.init();
    item.calcChildrenRect();
  }
}

export function spaceBetween(pens: Pen[], width: number) {
  pens = pens.sort((a: Pen, b: Pen) => {
    return a.rect.x - b.rect.x;
  });
  let space = 0;
  let cnt = 0;
  for (const item of pens) {
    if (!(item instanceof Node)) {
      continue;
    }

    space += item.rect.width;
    ++cnt;
  }
  space = (width - space) / (cnt - 1);

  let left = 0;
  for (const item of pens) {
    if (!(item instanceof Node)) {
      continue;
    }

    if (!left) {
      left = item.rect.x;
    }
    item.rect.x = left;
    left += item.rect.width + space;

    item.rect.floor();
    item.rect.calcCenter();
    item.init();
    item.calcChildrenRect();
  }
}
export function spaceBetweenColumn(pens: Pen[], height: number) {
  pens = pens.sort((a: Pen, b: Pen) => {
    return a.rect.y - b.rect.y;
  });
  let space = 0;
  let cnt = 0;
  for (const item of pens) {
    if (!(item instanceof Node)) {
      continue;
    }
    space += item.rect.height;
    ++cnt;
  }
  space = (height - space) / (cnt - 1);
  let top = 0;
  for (const item of pens) {
    if (!(item instanceof Node)) {
      continue;
    }
    if (!top) {
      top = item.rect.y;
    }
    item.rect.y = top;
    top += item.rect.height + space;
    item.rect.floor();
    item.rect.calcCenter();
    item.init();
    item.calcChildrenRect();
  }
}
