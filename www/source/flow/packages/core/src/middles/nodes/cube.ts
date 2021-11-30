import { Node } from '../../models/node';
import { Cube } from './cube.model';

export function cube(ctx: CanvasRenderingContext2D, node: Node) {
  new Cube(node.rect, node.z, node.zRotate, node.fillStyle, node.strokeStyle).render(ctx);
}
