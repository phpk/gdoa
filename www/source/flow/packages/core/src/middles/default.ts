import { Rect } from '../models/rect';
import { Point } from '../models/point';
import { Node } from '../models/node';
import { Line } from '../models/line';
import { rectangle } from './nodes/rectangle';
import { circle } from './nodes/circle';
import { triangle } from './nodes/triangle';
import { diamond } from './nodes/diamond';
import { leftArrow, rightArrow, twowayArrow } from './nodes/arrow';
import { text } from './nodes/text';
import { line as nodeLine } from './nodes/line';
import { triangleAnchors } from './nodes/triangle.anchor';
import { arrowAnchors } from './nodes/arrow.anchor';
import { lineAnchors } from './nodes/line.anchor';
import { circleIconRect, circleTextRect } from './nodes/circle.rect';
import { triangleIconRect, triangleTextRect } from './nodes/triangle.rect';
import { diamondIconRect, diamondTextRect } from './nodes/diamond.rect';
import {
  twowayArrowIconRect,
  twowayArrowTextRect,
  leftArrowIconRect,
  leftArrowTextRect,
  rightArrowIconRect,
  rightArrowTextRect,
} from './nodes/arrow.rect';
import { lineIconRect, lineTextRect } from './nodes/line.rect';
import { line, lineControlPoints, calcLineControlPoints } from './lines/line';
import {
  polyline,
  polylineControlPoints,
  pointInPolyline,
  calcPolylineControlPoints,
  dockPolylineControlPoint,
} from './lines/polyline';
import {
  curve,
  curveControlPoints,
  pointInCurve,
  calcCurveControlPoints,
} from './lines/curve';
import {
  calcMindControlPoints,
} from './lines/mind';
import { triangleSolid, triangle as arrowTriangle } from './arrows/triangle';
import { diamondSolid, diamond as arrowDiamond } from './arrows/diamond';
import { circleSolid, circle as arrowCircle } from './arrows/circle';
import { circleAnchors } from './nodes/circle.anchor';
import { lineUp, lineDown, line as arrowLine } from './arrows/line';
import { pentagon } from './nodes/pentagon';
import { pentagonIconRect, pentagonTextRect } from './nodes/pentagon.rect';
import { pentagonAnchors } from './nodes/pentagon.anchor';
import { hexagon } from './nodes/hexagon';
import { hexagonAnchors } from './nodes/hexagon.anchor';
import { hexagonIconRect, hexagonTextRect } from './nodes/hexagon.rect';
import { pentagram } from './nodes/pentagram';
import { pentagramAnchors } from './nodes/pentagram.anchor';
import { pentagramIconRect, pentagramTextRect } from './nodes/pentagram.rect';
import { cloud } from './nodes/cloud';
import { cloudAnchors } from './nodes/cloud.anchor';
import { cloudIconRect, cloudTextRect } from './nodes/cloud.rect';
import { message } from './nodes/message';
import { messageIconRect, messageTextRect } from './nodes/message.rect';
import { messageAnchors } from './nodes/message.anchor';
import { file } from './nodes/file';
import { imageIconRect, imageTextRect } from './nodes/image.rect';
import { imageAnchors } from './nodes/image.anchor';
import { cube } from './nodes/cube';
import { cubeAnchors } from './nodes/cube.anchor';
import { cubeIconRect, cubeTextRect } from './nodes/cube.rect';
import { people } from './nodes/people';
import { peopleIconRect, peopleTextRect } from './nodes/people.rect';
import { rectangleIconRect, rectangleTextRect } from './nodes/rectangle.rect';
import { graffiti } from './nodes/graffiti';
import { graffitiAnchors } from './nodes/graffiti.anchor';
import { mindNodeAnchors } from './nodes/mindNode.anchor';
import { mindLine } from './nodes/mindLine';
import { mindLineAnchors } from './nodes/mindLine.anchor';
import { lines } from './nodes/lines';

// Functions of drawing a node.
export const drawNodeFns: any = {};
// Calc the occupy rect of icon.
export const iconRectFns: any = {};
// Calc the occupy rect of text.
export const textRectFns: any = {};
// Calc the anchors of node.
export const anchorsFns: any = {};

// Functions of drawing a line.
export const drawLineFns: any = {};

// Functions of drawing a arrow.
export const drawArrowFns: any = {};

function init() {
  // ********Default nodes.*******
  // Combine
  drawNodeFns.combine = rectangle;

  // Div
  drawNodeFns.div = rectangle;

  // graffiti
  drawNodeFns.graffiti = graffiti;
  anchorsFns.graffiti = graffitiAnchors;

  // lines
  drawNodeFns.lines = lines;

  // Square
  drawNodeFns.square = rectangle;

  // Rectangle
  drawNodeFns.rectangle = rectangle;
  iconRectFns.rectangle = rectangleIconRect;
  textRectFns.rectangle = rectangleTextRect;

  // Ciricle
  drawNodeFns.circle = circle;
  iconRectFns.circle = circleIconRect;
  textRectFns.circle = circleTextRect;
  anchorsFns.circle = circleAnchors;

  // Triangle
  drawNodeFns.triangle = triangle;
  anchorsFns.triangle = triangleAnchors;
  iconRectFns.triangle = triangleIconRect;
  textRectFns.triangle = triangleTextRect;

  // Diamond
  drawNodeFns.diamond = diamond;
  iconRectFns.diamond = diamondIconRect;
  textRectFns.diamond = diamondTextRect;

  // Hexagon
  drawNodeFns.hexagon = hexagon;
  iconRectFns.hexagon = hexagonIconRect;
  textRectFns.hexagon = hexagonTextRect;
  anchorsFns.hexagon = hexagonAnchors;

  // Pentagon
  drawNodeFns.pentagon = pentagon;
  iconRectFns.pentagon = pentagonIconRect;
  textRectFns.pentagon = pentagonTextRect;
  anchorsFns.pentagon = pentagonAnchors;

  // Pentagram
  drawNodeFns.pentagram = pentagram;
  iconRectFns.pentagram = pentagramIconRect;
  textRectFns.pentagram = pentagramTextRect;
  anchorsFns.pentagram = pentagramAnchors;

  // Left arrow
  drawNodeFns.leftArrow = leftArrow;
  anchorsFns.leftArrow = arrowAnchors;
  iconRectFns.leftArrow = leftArrowIconRect;
  textRectFns.leftArrow = leftArrowTextRect;

  // Right arrow
  drawNodeFns.rightArrow = rightArrow;
  anchorsFns.rightArrow = arrowAnchors;
  iconRectFns.rightArrow = rightArrowIconRect;
  textRectFns.rightArrow = rightArrowTextRect;

  // Two-way arrow
  drawNodeFns.twowayArrow = twowayArrow;
  anchorsFns.twowayArrow = arrowAnchors;
  iconRectFns.twowayArrow = twowayArrowIconRect;
  textRectFns.twowayArrow = twowayArrowTextRect;

  // Cloud
  drawNodeFns.cloud = cloud;
  anchorsFns.cloud = cloudAnchors;
  iconRectFns.cloud = cloudIconRect;
  textRectFns.cloud = cloudTextRect;

  // Message
  drawNodeFns.message = message;
  anchorsFns.message = messageAnchors;
  iconRectFns.message = messageIconRect;
  textRectFns.message = messageTextRect;

  // File
  drawNodeFns.file = file;

  // Text
  drawNodeFns.text = text;
  iconRectFns.text = lineIconRect;

  // Line
  drawNodeFns.line = nodeLine;
  anchorsFns.line = lineAnchors;
  iconRectFns.line = lineIconRect;
  textRectFns.line = lineTextRect;

  // Image
  drawNodeFns.image = (ctx: CanvasRenderingContext2D, node: Rect) => { };
  iconRectFns.image = imageIconRect;
  textRectFns.image = imageTextRect;
  anchorsFns.image = imageAnchors;

  // Cube
  drawNodeFns.cube = cube;
  anchorsFns.cube = cubeAnchors;
  iconRectFns.cube = cubeIconRect;
  textRectFns.cube = cubeTextRect;

  // People
  drawNodeFns.people = people;
  iconRectFns.people = peopleIconRect;
  textRectFns.people = peopleTextRect;

  // MindNode
  drawNodeFns.mindNode = rectangle;
  anchorsFns.mindNode = mindNodeAnchors;
  iconRectFns.mindNode = rectangleIconRect;
  textRectFns.mindNode = rectangleTextRect;

  // MindLine
  drawNodeFns.mindLine = mindLine;
  anchorsFns.mindLine = mindLineAnchors;
  // ********end********

  // ********Default lines.*******
  drawLineFns.line = {
    drawFn: line,
    drawControlPointsFn: lineControlPoints,
    controlPointsFn: calcLineControlPoints,
    pointIn: pointInPolyline,
  };
  drawLineFns.polyline = {
    drawFn: polyline,
    drawControlPointsFn: polylineControlPoints,
    controlPointsFn: calcPolylineControlPoints,
    dockControlPointFn: dockPolylineControlPoint,
    pointIn: pointInPolyline,
  };
  drawLineFns.curve = {
    drawFn: curve,
    drawControlPointsFn: curveControlPoints,
    controlPointsFn: calcCurveControlPoints,
    pointIn: pointInCurve,
  };
  drawLineFns.mind = {
    drawFn: curve,
    drawControlPointsFn: curveControlPoints,
    controlPointsFn: calcMindControlPoints,
    pointIn: pointInCurve,
  };
  // ********end********

  // ********Default nodes.*******
  drawArrowFns.triangleSolid = triangleSolid;
  drawArrowFns.triangle = arrowTriangle;

  drawArrowFns.diamondSolid = diamondSolid;
  drawArrowFns.diamond = arrowDiamond;

  drawArrowFns.circleSolid = circleSolid;
  drawArrowFns.circle = arrowCircle;

  drawArrowFns.line = arrowLine;
  drawArrowFns.lineUp = lineUp;
  drawArrowFns.lineDown = lineDown;
  // ********end********
}
init();

// registerNode: Register a custom node.
// name - The name of node.
// drawFn - How to draw.
// anchorsFn - How to get the anchors.
// iconRectFn - How to get the icon rect.
// textRectFn - How to get the text rect.
// protect - No overwirte the node if exists.
export function registerNode(
  name: string,
  drawFn: (ctx: CanvasRenderingContext2D, node: Node) => void,
  anchorsFn?: (node: Node) => void,
  iconRectFn?: (node: Node) => void,
  textRectFn?: (node: Node) => void,
  protect?: boolean
) {
  // Exist
  if (drawNodeFns[name] && protect) {
    return false;
  }

  drawNodeFns[name] = drawFn;
  anchorsFns[name] = anchorsFn;
  iconRectFns[name] = iconRectFn;
  textRectFns[name] = textRectFn;

  return true;
}

// registerLine: Register a custom line.
// name - The name of line.
// drawFn - How to draw.
// drawControlPointsFn - Draw the control points.
// controlPointsFn - How to get the controlPoints.
// dockControlPointFn - Dock a point to horizontal/vertial or related position.
// force - Overwirte the node if exists.
export function registerLine(
  name: string,
  drawFn: (ctx: CanvasRenderingContext2D, line: Line) => void,
  drawControlPointsFn?: (ctx: CanvasRenderingContext2D, line: Line) => void,
  controlPointsFn?: (line: Line) => void,
  dockControlPointFn?: (point: Point, line: Line) => void,
  pointInFn?: (point: Point, line: Line) => boolean,
  getLength?: (line: Line) => void,
  getCenter?: (line: Line) => void,
  getPointByPos?: (line: Line) => void,
  force = true
) {
  // Exist
  if (drawLineFns[name] && !force) {
    return false;
  }

  drawLineFns[name] = {
    drawFn: drawFn,
    drawControlPointsFn: drawControlPointsFn,
    controlPointsFn: controlPointsFn,
    dockControlPointFn,
    pointIn: pointInFn,
    getLength,
    getCenter,
    getPointByPos,
  };
  return true;
}

// registerArrow: Register a custom arrow.
// name - the name of arrow.
// drawFn - how to draw.
// force - Overwirte the node if exists.
export function registerArrow(
  name: string,
  drawFn: (
    ctx: CanvasRenderingContext2D,
    from: Point,
    to: Point,
    size: number
  ) => void,
  protect?: boolean
) {
  // Exist
  if (drawArrowFns[name] && protect) {
    return false;
  }

  drawArrowFns[name] = drawFn;
  return true;
}

(window as any).registerTopologyNode = registerNode;
(window as any).registerTopologyLine = registerLine;
