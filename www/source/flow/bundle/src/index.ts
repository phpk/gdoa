import { Topology, registerNode, Pen, Node, Point, Line, Rect, s8, TopologyData } from '@topology/core';
import { Store, Observer } from 'le5le-store';

import { register as registerFlow } from '@topology/flow-diagram';
import { register as registerActivity } from '@topology/activity-diagram';
import { register as registerClass } from '@topology/class-diagram';
import { register as registerSequence } from '@topology/sequence-diagram';
import { register as registerChart } from '@topology/chart-diagram';
import { layout, alignNodes, spaceBetween } from '@topology/layout';

registerFlow();
registerActivity();
registerClass();
registerSequence();
registerChart();
// Compatible with older versions
(window as any).Le5leTopology = {
  Topology,
  registerNode,
  Pen,
  Node,
  Point,
  Line,
  Rect,
  Store,
  Observer,
  s8,
  layout,
  alignNodes,
  spaceBetween,
};
export {
  Topology,
  registerNode,
  TopologyData,
  Pen,
  Node,
  Point,
  Line,
  Rect,
  Store,
  Observer,
  s8,
  layout,
  alignNodes,
  spaceBetween,
};
