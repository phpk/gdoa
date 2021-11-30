import { Store } from 'le5le-store';

import { Point } from '../../models/point';
import { Line } from '../../models/line';
import { Direction } from '../../models/direction';
import { generateStoreKey } from './curve';

const distance = 20;

export function calcMindControlPoints(l: Line) {
  if (!l.from.direction) {
    l.from.direction = Direction.Bottom;
  }
  if (!l.to.direction) {
    l.to.direction = (l.from.direction + 2) % 4;
    if (!l.to.direction) {
      l.to.direction = Direction.Left;
    }
  }

  switch (l.from.direction) {
    case Direction.Up:
      l.controlPoints = [new Point(l.from.x, l.from.y - distance), new Point(l.from.x, l.to.y)];
      break;
    case Direction.Right:
      l.controlPoints = [new Point(l.from.x + distance, l.from.y), new Point(l.from.x, l.to.y)];
      break;
    case Direction.Bottom:
      l.controlPoints = [new Point(l.from.x, l.from.y + distance), new Point(l.from.x, l.to.y)];
      break;
    case Direction.Left:
      l.controlPoints = [new Point(l.from.x - distance, l.from.y), new Point(l.from.x, l.to.y)];
      break;
  }

  Store.set(generateStoreKey(l, 'pts-') + l.id, undefined);
}

