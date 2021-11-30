import { Node } from '../../models/node';
import { Rect } from '../../models/rect';

export function leftArrowIconRect(node: Node) {
  node.iconRect = new Rect(0, 0, 0, 0);
}

export function leftArrowTextRect(node: Node) {
  node.textRect = new Rect(
    node.rect.x + node.rect.height / 2,
    node.rect.y + node.rect.height / 3,
    node.rect.width - node.rect.height / 2,
    node.rect.height / 3
  );
  node.fullTextRect = node.textRect;
}

export function rightArrowIconRect(node: Node) {
  node.iconRect = new Rect(0, 0, 0, 0);
}

export function rightArrowTextRect(node: Node) {
  node.textRect = new Rect(
    node.rect.x,
    node.rect.y + node.rect.height / 3,
    node.rect.width - node.rect.height / 2,
    node.rect.height / 3
  );
  node.fullTextRect = node.textRect;
}

export function twowayArrowIconRect(node: Node) {
  node.iconRect = new Rect(0, 0, 0, 0);
}

export function twowayArrowTextRect(node: Node) {
  node.textRect = new Rect(
    node.rect.x + node.rect.height / 2,
    node.rect.y + node.rect.height / 3,
    node.rect.width - node.rect.height,
    node.rect.height / 3
  );
  node.fullTextRect = node.textRect;
}
