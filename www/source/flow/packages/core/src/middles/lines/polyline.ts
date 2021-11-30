import { Point } from '../../models/point';
import { Line } from '../../models/line';
import { Direction } from '../../models/direction';
import { pointInLine } from '../../utils/canvas';

const minDistance = 50;

export function polyline(ctx: CanvasRenderingContext2D, l: Line) {
  ctx.beginPath();
  ctx.moveTo(l.from.x, l.from.y);
  for (const item of l.controlPoints) {
    ctx.lineTo(item.x, item.y);
  }
  ctx.lineTo(l.to.x, l.to.y);
  ctx.stroke();
}

export function polylineControlPoints(ctx: CanvasRenderingContext2D, l: Line) {
  ctx.save();
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

export function calcPolylineControlPoints(l: Line) {
  l.controlPoints = [];
  const from = getDirectionPoint(l.from, l.to);
  if (l.from.direction) {
    l.controlPoints.push(from);
  }
  const to = getDirectionPoint(l.to, l.from);
  let pts: Point[];
  switch (from.direction) {
    case Direction.Up:
      pts = getNextPointByUp(from, to);
      break;
    case Direction.Right:
      pts = getNextPointByRight(from, to);
      break;
    case Direction.Bottom:
      pts = getNextPointByBottom(from, to);
      break;
    case Direction.Left:
      pts = getNextPointByLeft(from, to);
      break;
  }
  l.controlPoints.push.apply(l.controlPoints, pts);
  if (l.to.direction) {
    l.controlPoints.push(to);
  }
}

export function pointInPolyline(point: Point, l: Line): boolean {
  if (!l.controlPoints || !l.controlPoints.length) {
    return pointInLine(point, l.from, l.to, l.lineWidth / 2);
  }
  if (pointInLine(point, l.from, l.controlPoints[0])) {
    return true;
  }

  if (pointInLine(point, l.to, l.controlPoints[l.controlPoints.length - 1])) {
    return true;
  }

  for (let i = 0; i < l.controlPoints.length - 1; ++i) {
    if (pointInLine(point, l.controlPoints[i], l.controlPoints[i + 1])) {
      return true;
    }
  }

  return false;
}

export function dockPolylineControlPoint(point: Point, l: Line) {
  const pts: Point[] = [l.from];
  pts.push.apply(pts, l.controlPoints);
  pts.push(l.to);
  for (const item of pts) {
    if (Math.abs(point.x - item.x) < 7) {
      point.x = item.x;
    }
    if (Math.abs(point.y - item.y) < 7) {
      point.y = item.y;
    }
  }
}

function getDirectionPoint(pt: Point, to: Point) {
  const point = pt.clone();
  switch (pt.direction) {
    case Direction.Up:
      if (to.y < pt.y) {
        point.y -= Math.round((pt.y - to.y) / 2);
      } else {
        point.y -= minDistance;
      }
      break;
    case Direction.Right:
      if (to.x > pt.x) {
        point.x += Math.round((to.x - pt.x) / 2);
      } else {
        point.x += minDistance;
      }
      break;
    case Direction.Bottom:
      if (to.y > pt.y) {
        point.y += Math.round((to.y - pt.y) / 2);
      } else {
        point.y += minDistance;
      }
      break;
    case Direction.Left:
      if (to.x < pt.x) {
        point.x -= Math.round((pt.x - to.x) / 2);
      } else {
        point.x -= minDistance;
      }
      break;
  }
  return point;
}

function getNextPointByUp(from: Point, to: Point) {
  if (from.x === to.x || from.y === to.y) {
    return [];
  }

  // The to point above the from point.
  if (from.y > to.y) {
    if (to.direction === Direction.Up && from.y - to.y > 3 * minDistance) {
      if (from.x < to.x) {
        if (to.x - from.x < minDistance) {
          return [new Point(from.x - 2 * minDistance, from.y), new Point(from.x - 2 * minDistance, to.y)];
        }
        return [new Point(from.x, to.y)];
      } else {
        if (from.x - to.x < minDistance) {
          return [new Point(from.x + 2 * minDistance, from.y), new Point(from.x + 2 * minDistance, to.y)];
        }

        return [new Point(from.x, to.y)];
      }
    } else {
      // Left top
      if ((to.direction === Direction.Left && from.x > to.x) || (to.direction === Direction.Right && from.x < to.x)) {
        return [new Point(to.x, from.y)];
      }
      return [new Point(from.x, to.y)];
    }

    // The to point below the from point.
  } else {
    if (to.direction === Direction.Bottom) {
      if (from.x < to.x) {
        return getHorizontalPoints(from, to);
      } else {
        const pts = getHorizontalPoints(to, from);
        return [pts[1], pts[0]];
      }
    } else {
      return [new Point(to.x, from.y)];
    }
  }
}

function getNextPointByBottom(from: Point, to: Point) {
  if (from.x === to.x || from.y === to.y) {
    return [];
  }

  // The to point below the from point.
  if (from.y < to.y) {
    if (to.direction === Direction.Bottom && to.y - from.y > 3 * minDistance) {
      if (from.x < to.x) {
        if (to.x - from.x < minDistance) {
          return [new Point(from.x - 2 * minDistance, from.y), new Point(from.x - 2 * minDistance, to.y)];
        }
        return [new Point(from.x, to.y)];
      } else {
        if (from.x - to.x < minDistance) {
          return [new Point(from.x + 2 * minDistance, from.y), new Point(from.x + 2 * minDistance, to.y)];
        }
        return [new Point(from.x, to.y)];
      }
    } else {
      if ((to.direction === Direction.Left && from.x > to.x) || (to.direction === Direction.Right && from.x < to.x)) {
        return [new Point(to.x, from.y)];
      }
      return [new Point(from.x, to.y)];
    }

    // The to point below the from point.
  } else {
    if (to.direction === Direction.Up) {
      if (from.x < to.x) {
        return getHorizontalPoints(from, to);
      } else {
        const pts = getHorizontalPoints(to, from);
        return [pts[1], pts[0]];
      }
    } else {
      return [new Point(to.x, from.y)];
    }
  }
}

function getNextPointByLeft(from: Point, to: Point) {
  if (from.x === to.x || from.y === to.y) {
    return [];
  }

  // The to point is on the left.
  if (from.x > to.x) {
    if (to.direction === Direction.Left && from.x - to.x > 3 * minDistance) {
      if (from.y < to.y) {
        if (to.y - from.y < minDistance) {
          return [new Point(from.x, from.y + 2 * minDistance), new Point(to.x, from.y + 2 * minDistance)];
        }
        return [new Point(to.x, from.y)];
      } else {
        if (from.y - to.y < minDistance) {
          return [new Point(from.x, from.y - 2 * minDistance), new Point(to.x, from.y - 2 * minDistance)];
        }

        return [new Point(to.x, from.y)];
      }
    } else {
      if (
        to.direction === Direction.Left ||
        (to.direction === Direction.Up && from.y < to.y) ||
        (to.direction === Direction.Bottom && from.y > to.y)
      ) {
        return [new Point(to.x, from.y)];
      }
      return [new Point(from.x, to.y)];
    }

    // The to point is on the right.
  } else {
    if (to.direction === Direction.Right) {
      if (from.y < to.y) {
        return getVerticalPoints(from, to);
      } else {
        const pts = getVerticalPoints(to, from);
        return [pts[1], pts[0]];
      }
    } else {
      return [new Point(from.x, to.y)];
    }
  }
}

function getNextPointByRight(from: Point, to: Point) {
  if (from.x === to.x || from.y === to.y) {
    return [];
  }

  // The to point is on the right.
  if (from.x < to.x) {
    if (to.direction === Direction.Right && to.x - from.x > 3 * minDistance) {
      if (from.y < to.y) {
        if (to.y - from.y < minDistance) {
          return [new Point(from.x, from.y - 2 * minDistance), new Point(to.x, from.y - 2 * minDistance)];
        }
        return [new Point(to.x, from.y)];
      } else {
        if (from.y - to.y < minDistance) {
          return [new Point(from.x, from.y + 2 * minDistance), new Point(to.x, from.y + 2 * minDistance)];
        }

        return [new Point(to.x, from.y)];
      }
    } else {
      if (
        to.direction === Direction.Right ||
        (to.direction === Direction.Up && from.y < to.y) ||
        (to.direction === Direction.Bottom && from.y > to.y)
      ) {
        return [new Point(to.x, from.y)];
      }
      return [new Point(from.x, to.y)];
    }

    // The to point is on the left.
  } else {
    if (to.direction === Direction.Left) {
      if (from.y < to.y) {
        return getVerticalPoints(from, to);
      } else {
        const pts = getVerticalPoints(to, from);
        return [pts[1], pts[0]];
      }
    } else {
      return [new Point(from.x, to.y)];
    }
  }
}

function getHorizontalPoints(left: Point, right: Point) {
  const x = left.x + (right.x - left.x) / 2;
  return [new Point(x, left.y), new Point(x, right.y)];
}

function getVerticalPoints(up: Point, bottom: Point) {
  const y = up.y + (bottom.y - up.y) / 2;
  return [new Point(up.x, y), new Point(bottom.x, y)];
}
