import { registerNode, Node, Rect } from '@topology/core';
import { textbox } from './textbox';

export function register() {
  registerNode('textbox', textbox);
}
