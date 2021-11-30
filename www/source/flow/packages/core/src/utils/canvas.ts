import { Point } from '../models/point';
import { Pen } from '../models/pen';
import { Node } from '../models/node';
import { Line } from '../models/line';

export function flatNodes(
  nodes: Pen[]
): {
  nodes: Node[];
  lines: Line[];
} {
  const result = {
    nodes: [],
    lines: [],
  };

  for (const item of nodes) {
    if (item.type) {
      result.lines.push(item);
      continue;
    }
    result.nodes.push(item);
    if ((item as Node).children) {
      result.nodes.push.apply(result.nodes, flatNodes((item as Node).children).nodes);
      result.lines.push.apply(result.lines, flatNodes((item as Node).children).lines);
    }
  }
  return result;
}

export function find(idOrTag: string, pens: Pen[]) {
  const result: Pen[] = [];
  pens.forEach((item) => {
    if (item.id === idOrTag || item.tags.indexOf(idOrTag) > -1) {
      result.push(item);
    }

    if ((item as any).children) {
      result.push(...find(idOrTag, (item as any).children));
    }
  });

  return result;
}

export function del(idOrTag: string, pens: Pen[]) {
  const deleted: Pen[] = [];
  for (let i = 0; i < pens.length; i++) {
    if (pens[i].id === idOrTag || pens[i].tags.indexOf(idOrTag) > -1) {
      deleted.push(pens[i]);
      pens.splice(i, 1);
      --i;
    } else if ((pens[i] as any).children) {
      deleted.push.apply(deleted, del(idOrTag, (pens[i] as any).children));
    }
  }

  return deleted;
}

export function getParent(pens: Pen[], child: Pen): Node {
  let parent: Node;
  for (const item of pens) {
    if (item.type) {
      continue;
    }
    if (!(item as Node).children) {
      continue;
    }

    for (const subItem of (item as Node).children) {
      if (subItem.id === child.id) {
        return item as Node;
      }

      if (subItem.type) {
        continue;
      }
      if ((subItem as Node).children) {
        parent = getParent((subItem as Node).children, child);
        if (parent) {
          return parent;
        }
      }
    }
  }

  return parent;
}

export function pointInRect(point: { x: number; y: number; }, vertices: Point[]): boolean {
  if (vertices.length < 3) {
    return false;
  }
  let isIn = false;

  let last = vertices[vertices.length - 1];
  for (const item of vertices) {
    if (((last.y > point.y) !== (item.y > point.y))) {
      if (item.x + ((point.y - item.y) * (last.x - item.x)) / (last.y - item.y) > point.x) {
        isIn = !isIn;
      }
    }

    last = item;
  }

  return isIn;
}

export function pointInLine(point: Point, from: Point, to: Point, padding = 1): boolean {
  const angle = Math.atan2(from.y - to.y, to.x - from.x);
  padding = padding > 5 ? padding : 5;
  let x = Math.sin(angle) * padding;
  const y = Math.cos(angle) * padding;

  let points = [
    new Point(from.x - x, from.y - y),
    new Point(to.x - x, to.y - y),
    new Point(to.x + x, to.y + y),
    new Point(from.x + x, from.y + y)
  ];

  return pointInRect(point, points);
}

export function lineLen(from: Point, to: Point): number {
  const len = Math.sqrt(Math.pow(Math.abs(from.x - to.x), 2) + Math.pow(Math.abs(from.y - to.y), 2));
  return len | 0;
}

export function curveLen(from: Point, cp1: Point, cp2: Point, to: Point): number {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', `M${from.x} ${from.y} C${cp1.x} ${cp1.y} ${cp2.x} ${cp2.y} ${to.x} ${to.y}`);
  return path.getTotalLength() | 0;
}
