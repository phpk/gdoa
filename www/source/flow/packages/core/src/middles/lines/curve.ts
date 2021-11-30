import { Store } from 'le5le-store';

import { Point } from '../../models/point';
import { Pen } from '../../models/pen';
import { Line } from '../../models/line';
import { Direction } from '../../models/direction';
import { pointInLine } from '../../utils/canvas';
import { rgba } from '../../utils/math';

const distance = 80;

export function curve(ctx: CanvasRenderingContext2D, l: Line) {
  ctx.beginPath();
  ctx.moveTo(l.from.x, l.from.y);
  ctx.bezierCurveTo(
    l.controlPoints[0].x,
    l.controlPoints[0].y,
    l.controlPoints[1].x,
    l.controlPoints[1].y,
    l.to.x,
    l.to.y
  );
  ctx.stroke();
}

export function curveControlPoints(ctx: CanvasRenderingContext2D, l: Line) {
  ctx.save();
  ctx.fillStyle = rgba(0.5, ctx.strokeStyle + '');
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(l.from.x, l.from.y);
  ctx.lineTo(l.controlPoints[0].x, l.controlPoints[0].y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(l.to.x, l.to.y);
  ctx.lineTo(l.controlPoints[1].x, l.controlPoints[1].y);
  ctx.stroke();

  ctx.fillStyle = '#fff';
  ctx.lineWidth = 2;
  for (const item of l.controlPoints) {
    ctx.beginPath();
    ctx.arc(item.x, item.y, 4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();
  }
  ctx.restore();
}

export function calcCurveControlPoints(l: Line) {
  if (!l.from.direction) {
    l.from.direction = Direction.Bottom;
  }
  if (!l.to.direction) {
    l.to.direction = (l.from.direction + 2) % 4;
    if (!l.to.direction) {
      l.to.direction = Direction.Left;
    }
  }
  l.controlPoints = [getControlPt(l.from, l.to), getControlPt(l.to, l.from)];
  Store.set(generateStoreKey(l, 'pts-') + l.id, undefined);
}

export function pointInCurve(point: Point, l: Line) {
  let points: Point[] = Store.get(generateStoreKey(l, 'pts-') + l.id) as Point[];
  if (!points) {
    points = [l.from];
    if (l.controlPoints) {
      for (let i = 0.01; i < 1; i += 0.01) {
        points.push(getBezierPoint(i, l.from, l.controlPoints[0], l.controlPoints[1], l.to));
      }
    }

    points.push(l.to);
    Store.set(generateStoreKey(l, 'pts-') + l.id, points);
  }
  const cnt = points.length - 1;
  for (let i = 0; i < cnt; ++i) {
    if (pointInLine(point, points[i], points[i + 1])) {
      return true;
    }
  }
  return false;
}

// Get a point in bezier.
// pos - The position of point in bezier. It is expressed as a percentage(0 - 1).
export function getBezierPoint(pos: number, from: Point, cp1: Point, cp2: Point, to: Point) {
  const { x: x1, y: y1 } = from;
  const { x: x2, y: y2 } = to;
  const { x: cx1, y: cy1 } = cp1;
  const { x: cx2, y: cy2 } = cp2;
  const x =
    x1 * (1 - pos) * (1 - pos) * (1 - pos) +
    3 * cx1 * pos * (1 - pos) * (1 - pos) +
    3 * cx2 * pos * pos * (1 - pos) +
    x2 * pos * pos * pos;
  const y =
    y1 * (1 - pos) * (1 - pos) * (1 - pos) +
    3 * cy1 * pos * (1 - pos) * (1 - pos) +
    3 * cy2 * pos * pos * (1 - pos) +
    y2 * pos * pos * pos;
  return new Point(x, y);
}

export function getControlPt(pt: Point, to: Point) {
  const point: Point = new Point(pt.x, pt.y, pt.direction, pt.anchorIndex, pt.id);

  let dis = (window as any).topologyControlPtDistance || distance;
  if ((pt.direction === Direction.Up || pt.direction === Direction.Bottom) && Math.abs(pt.x - to.x) < 3) {
    if (to.y > pt.y) {
      dis = Math.round((to.y - pt.y) / 3);
      point.y += dis;
    } else {
      dis = Math.round((pt.y - to.y) / 3);
      point.y -= dis;
    }
    return point;
  }

  if ((pt.direction === Direction.Left || pt.direction === Direction.Right) && Math.abs(pt.y - to.y) < 3) {
    if (to.x > pt.x) {
      dis = Math.round((to.x - pt.x) / 3);
      point.x += dis;
    } else {
      dis = Math.round((pt.x - to.x) / 3);
      point.x -= dis;
    }
    return point;
  }

  switch (pt.direction) {
    case Direction.Up:
      point.y -= dis;
      break;
    case Direction.Right:
      point.x += dis;
      break;
    case Direction.Bottom:
      point.y += dis;
      break;
    case Direction.Left:
      point.x -= dis;
      break;
  }

  return point;
}

export function generateStoreKey(pen: Pen, key: String) {
  return `${pen.getTID()}-${key}`;
}
