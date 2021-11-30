import { Point } from '../models/point';
import { Pen } from '../models/pen';
import { Node } from '../models/node';
import { Line } from '../models/line';
import { getBezierPoint } from '../middles/lines/curve';
import { Rect } from '../models/rect';

/**
 * 不包含画布偏移量
 * */
export function getRect(pens: Pen[]) {

  const points: Point[] = [];
  for (const item of pens) {
    if (item instanceof Node) {
      const pts = item.rect.toPoints();
      if (item.rotate) {
        for (const pt of pts) {
          pt.rotate(item.rotate, item.rect.center);
        }
      }
      points.push.apply(points, pts);
    } else if (item instanceof Line) {
      if (item.children) {
        item.children.forEach((child: Line) => {
          points.push(child.from);
          points.push(child.to);
          if (Array.isArray(child.controlPoints)) {
            points.push(...child.controlPoints);
          }
          if (child.name === 'curve') {
            for (let i = 0.01; i < 1; i += 0.02) {
              points.push(getBezierPoint(i, child.from, child.controlPoints[0], child.controlPoints[1], child.to));
            }
          }
        });
      } else if (item.from) {
        points.push(item.from);
        points.push(item.to);
        if (Array.isArray(item.controlPoints)) {
          points.push(...item.controlPoints);
        }
        if (item.name === 'curve') {
          for (let i = 0.01; i < 1; i += 0.02) {
            points.push(getBezierPoint(i, item.from, item.controlPoints[0], item.controlPoints[1], item.to));
          }
        }
      }
    }
  }
  const { x1, y1, x2, y2 } = getBboxOfPoints(points);

  return new Rect(x1, y1, x2 - x1, y2 - y1);
}


export function getBboxOfPoints(points: Point[]) {
  let x1 = Infinity;
  let y1 = Infinity;
  let x2 = -Infinity;
  let y2 = -Infinity;

  for (const item of points) {
    const { x, y } = item;
    if(isNaN(x) || isNaN(y))
      continue;
    x1 = Math.min(x1, x);
    y1 = Math.min(y1, y);
    x2 = Math.max(x2, x);
    y2 = Math.max(y2, y);
  }
  return { x1, y1, x2, y2 };
}
export function rectInRect(source: Rect, target: Rect) {
  return !(
    // 括号内表明 在范围外的 四个区域
    source.x > target.ex || source.ex < target.x || source.ey < target.y || source.y > target.ey
  );
}

/**
 * 合并大小全部传入的 rects
 * */
export function getMoreRect(...rects: Rect[]): Rect{
  const rect = new Rect(rects[0].x, rects[0].y ,rects[0].width , rects[0].height);
  for (let i = 1; i < rects.length; i++) {
    const currentRect = rects[i];
    if(currentRect){
      rect.x > currentRect.x && (rect.x = currentRect.x);
      rect.y > currentRect.y && (rect.y = currentRect.y);
      rect.ex < currentRect.ex && (rect.ex = currentRect.ex);
      rect.ey < currentRect.ey && (rect.ey = currentRect.ey);
    }
  }

  return new Rect(rect.x, rect.y, rect.ex - rect.x, rect.ey - rect.y);
}
