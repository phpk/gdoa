import { Point } from '../../models/point';
import { Node } from '../../models/node';
import { Direction } from '../../models/direction';

export function mindNodeAnchors(node: Node) {
  let r = borderRadius(node);
  // 上四
  let topN = 5; // 上方节点个数，控制位置，实际节点数依然是 4 个
  for (let i = 0; i < topN; i++) {
    if (i === 2) {
      continue;
    }
    let x = node.rect.x + (node.rect.width * (i + 1)) / (topN + 1);
    let y = node.rect.y;
    if (x < node.rect.x + r) {
      // 在左侧圆角
      y = getYByCircle(node.rect.x + r, y + r, x, r, -1);
    } else if (x > node.rect.x + node.rect.width - r) {
      // 在右侧圆角
      y = getYByCircle(node.rect.x + node.rect.width - r, y + r, x, r, -1);
    }
    node.anchors.push(new Point(x, y, Direction.Up));
  }
  // 右三
  let rightN = 3; // 右侧节点数
  for (let i = 0; i < rightN; i++) {
    let y = node.rect.y + (node.rect.height * (i + 1)) / (rightN + 1);
    let x = node.rect.x + node.rect.width;
    if (y < node.rect.y + r) {
      // 在上侧圆角以内
      x = getXByCircle(x - r, node.rect.y + r, y, r);
    } else if (y > node.rect.y + node.rect.height - r) {
      // 下侧圆角
      x = getXByCircle(x - r, node.rect.y + node.rect.height - r, y, r);
    }
    node.anchors.push(new Point(x, y, Direction.Right));
  }
  // 下四
  let bottomN = 5; // 下侧节点数
  for (let i = 0; i < bottomN; i++) {
    if (i === 2) {
      continue;
    }
    let x = node.rect.x + (node.rect.width * (i + 1)) / (bottomN + 1);
    let y = node.rect.y + node.rect.height;
    if (x < node.rect.x + r) {
      // 在左侧圆角
      y = getYByCircle(node.rect.x + r, y - r, x, r);
    } else if (x > node.rect.x + node.rect.width - r) {
      // 在右侧圆角
      y = getYByCircle(node.rect.x + node.rect.width - r, y - r, x, r);
    }
    node.anchors.push(new Point(x, y, Direction.Bottom));
  }
  // 左三
  let leftN = 3; // 左侧节点数
  for (let i = 0; i < leftN; i++) {
    let y = node.rect.y + (node.rect.height * (i + 1)) / (leftN + 1);
    let x = node.rect.x;
    if (y < node.rect.y + r) {
      // 在上侧圆角以内
      x = getXByCircle(x + r, node.rect.y + r, y, r, -1);
    } else if (y > node.rect.y + node.rect.height - r) {
      // 下侧圆角
      x = getXByCircle(x + r, node.rect.y + node.rect.height - r, y, r, -1);
    }
    node.anchors.push(new Point(x, y, Direction.Left));
  }
}

/**
 * 得到元素实际计算半径
 * @param node 元素
 * @returns 元素实际半径
 */
function borderRadius(node: any): number {
  let wr = node.borderRadius;
  let hr = node.borderRadius;
  if (node.borderRadius < 1) {
    wr = node.rect.width * node.borderRadius;
    hr = node.rect.height * node.borderRadius;
  }
  let r = wr < hr ? wr : hr;
  if (node.rect.width < 2 * r) {
    r = node.rect.width / 2;
  }
  if (node.rect.height < 2 * r) {
    r = node.rect.height / 2;
  }
  return r;
}

/**
 * 获取圆的 x 坐标
 * @param ox 圆心x
 * @param oy 圆心y
 * @param y y
 * @param r 半径
 * @param sqrt 点可能在左侧，左侧填-1，右侧1（默认值）
 */
function getXByCircle(
  ox: number,
  oy: number,
  y: number,
  r: number,
  sqrt: number = 1
): number {
  return sqrt * Math.sqrt(r ** 2 - (y - oy) ** 2) + ox;
}

/**
 * 获取圆的 y 坐标
 * @param ox 圆心x
 * @param oy 圆心y
 * @param y y
 * @param r 半径
 * @param sqrt 点可以在上侧，也可能在下侧，上侧-1，下侧1（默认）
 */
function getYByCircle(
  ox: number,
  oy: number,
  x: number,
  r: number,
  sqrt: number = 1
): number {
  return sqrt * Math.sqrt(r ** 2 - (x - ox) ** 2) + oy;
}
