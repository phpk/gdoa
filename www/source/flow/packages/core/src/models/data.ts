import { Pen } from './pen';
import { Node } from './node';
import { Line } from './line';
import { Lock } from './status';
import { s8 } from '../utils';
import { Store } from 'le5le-store';
import { Rect } from './rect';

export interface TopologyData {
  pens: Pen[];
  lineName: string;
  fromArrow: string;
  toArrow: string;
  lineWidth?: number;
  x: number;   // 画布的相对位置
  y: number;
  scale: number;
  locked: Lock;
  bkImage?: string;
  bkImageRect?: Rect;
  bkImageStatic?: boolean;
  bkColor?: string;
  grid?: boolean;
  gridColor?: string;
  gridSize?: number;
  rule?: boolean;
  ruleColor?: string;
  websocket?: string;
  mqttUrl?: string;
  mqttOptions?: {
    clientId?: string;
    username?: string;
    password?: string;
    customClientId?: boolean;
  };
  mqttTopics?: string;
  manualCps?: boolean;
  tooltip?: boolean | number;
  socketEvent?: boolean | number;
  socketFn?: string;
  initJS?: string;   // 初始化时所执行 js
  data?: any;
}

export function createData(json?: any, tid?: string) {
  let data: TopologyData = {
    pens: [],
    lineName: 'curve',
    fromArrow: '',
    toArrow: 'triangleSolid',
    scale: 1,
    locked: Lock.None,
    x: 0,
    y: 0,
  };

  if (typeof json === 'string') {
    json = JSON.parse(json);
  }

  data = Object.assign(data, json);
  data.pens = [];

  if (json) {
    // for old data.
    if (json.nodes) {
      for (const item of json.nodes) {
        item.TID = tid;
        data.pens.push(new Node(item));
      }
      for (const item of json.lines) {
        item.TID = tid;
        data.pens.push(new Line(item));
      }
    }
    // end.

    json.pens && json.pens.forEach((item: any) => {
      tid && (item.TID = tid);
      if (!item.type) {
        data.pens.push(new Node(item));
      } else {
        data.pens.push(new Line(item));
      }
    });

    if (json.bkImageRect) {
      data.bkImageRect = new Rect(json.bkImageRect.x, json.bkImageRect.y, json.bkImageRect.width, json.bkImageRect.height);
    }
  }

  if (data.mqttOptions) {
    let opts = '';
    if (typeof data.mqttOptions === 'object') {
      opts = JSON.stringify(data.mqttOptions);
    } else {
      opts = data.mqttOptions + '';
    }
    data.mqttOptions = JSON.parse(opts);
  } else {
    data.mqttOptions = { clientId: s8() };
  }

  tid && Store.set(tid + '-topology-data', data);

  return data;
}
