import { IBarChartOptions, ILineChartOptions, IPieChartOptions } from 'chartist'

export const enum ElementTypes {
  TEXT = 'text',
  IMAGE = 'image',
  SHAPE = 'shape',
  LINE = 'line',
  CHART = 'chart',
  TABLE = 'table',
  LATEX = 'latex',
  VIDEO = 'video',
}

/**
 * 元素阴影
 * 
 * h: 水平偏移量
 * 
 * v: 垂直偏移量
 * 
 * blur: 模糊程度
 * 
 * color: 阴影颜色
 */
export interface PPTElementShadow {
  h: number;
  v: number;
  blur: number;
  color: string;
}

/**
 * 元素边框
 * 
 * style?: 边框样式（实线或虚线）
 * 
 * width?: 边框宽度
 * 
 * color?: 边框颜色
 */
export interface PPTElementOutline {
  style?: 'dashed' | 'solid';
  width?: number;
  color?: string;
}


/**
 * 元素通用属性
 * 
 * id: 元素ID
 * 
 * left: 元素水平方向位置（距离画布左侧）
 * 
 * top: 元素垂直方向位置（距离画布顶部）
 * 
 * lock?: 锁定元素
 * 
 * groupId?: 组合ID（拥有相同组合ID的元素即为同一组合元素成员）
 * 
 * width: 元素宽度
 * 
 * height: 元素高度
 * 
 * rotate: 旋转角度
 * 
 * link?: 超链接地址
 */
interface PPTBaseElement {
  id: string;
  left: number;
  top: number;
  lock?: boolean;
  groupId?: string;
  width: number;
  height: number;
  rotate: number;
  link?: string;
}


/**
 * 文本元素
 * 
 * type: 元素类型（text）
 * 
 * content: 文本内容（HTML字符串）
 * 
 * defaultFontName: 默认字体（会被文本内容中的HTML内联样式覆盖）
 * 
 * defaultColor: 默认颜色（会被文本内容中的HTML内联样式覆盖）
 * 
 * outline?: 边框
 * 
 * fill?: 填充色
 * 
 * lineHeight?: 行高（倍），默认1.5
 * 
 * wordSpace?: 字间距，默认0
 * 
 * opacity?: 不透明度，默认1
 * 
 * shadow?: 阴影
 */
export interface PPTTextElement extends PPTBaseElement {
  type: 'text';
  content: string;
  defaultFontName: string;
  defaultColor: string;
  outline?: PPTElementOutline;
  fill?: string;
  lineHeight?: number;
  wordSpace?: number;
  opacity?: number;
  shadow?: PPTElementShadow;
}


/**
 * 图片翻转、形状翻转
 * 
 * flipH?: 水平翻转
 * 
 * flipV?: 垂直翻转
 */
export interface ImageOrShapeFlip {
  flipH?: boolean;
  flipV?: boolean;
}

/**
 * 图片滤镜
 * 
 * https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter
 * 
 * 'blur'?: 模糊，默认0（px）
 * 
 * 'brightness'?: 亮度，默认100（%）
 * 
 * 'contrast'?: 对比度，默认100（%）
 * 
 * 'grayscale'?: 灰度，默认0（%）
 * 
 * 'saturate'?: 饱和度，默认100（%）
 * 
 * 'hue-rotate'?: 色相旋转，默认0（deg）
 * 
 * 'opacity'?: 不透明度，默认100（%）
 */
export interface ImageElementFilters {
  'blur'?: string;
  'brightness'?: string;
  'contrast'?: string;
  'grayscale'?: string;
  'saturate'?: string;
  'hue-rotate'?: string;
  'opacity'?: string;
}

/**
 * 图片裁剪
 * 
 * range: 裁剪范围，例如：[[10, 10], [90, 90]] 表示裁取原图从左上角 10%, 10% 到 90%, 90% 的范围
 * 
 * shape: 裁剪形状，见 configs/imageClip.ts CLIPPATHS 
 */
export interface ImageElementClip {
  range: [[number, number], [number, number]];
  shape: string;
}

/**
 * 图片元素
 * 
 * type: 元素类型（image）
 * 
 * fixedRatio: 固定图片宽高比例
 * 
 * src: 图片地址
 * 
 * outline?: 边框
 * 
 * filters?: 图片滤镜
 * 
 * clip?: 裁剪信息
 * 
 * flipH?: 水平翻转
 * 
 * flipV?: 垂直翻转
 * 
 * shadow?: 阴影
 */
export interface PPTImageElement extends PPTBaseElement {
  type: 'image';
  fixedRatio: boolean;
  src: string;
  outline?: PPTElementOutline;
  filters?: ImageElementFilters;
  clip?: ImageElementClip;
  flipH?: boolean;
  flipV?: boolean;
  shadow?: PPTElementShadow;
}


/**
 * 形状渐变
 * 
 * type: 渐变类型（径向、线性）
 * 
 * color: 渐变颜色
 * 
 * rotate: 渐变角度（线性渐变）
 */
export interface ShapeGradient {
  type: 'linear' | 'radial';
  color: [string, string];
  rotate: number;
}

/**
 * 形状内文本
 * 
 * content: 文本内容（HTML字符串）
 * 
 * defaultFontName: 默认字体（会被文本内容中的HTML内联样式覆盖）
 * 
 * defaultColor: 默认颜色（会被文本内容中的HTML内联样式覆盖）
 * 
 * align: 文本对齐方向（垂直方向）
 */
export interface ShapeText {
  content: string;
  defaultFontName: string;
  defaultColor: string;
  align: 'top' | 'middle' | 'bottom';
}

/**
 * 形状元素
 * 
 * type: 元素类型（shape）
 * 
 * viewBox: SVG的viewBox属性，默认为正方形，例如 1000 表示 '0 0 1000 1000'
 * 
 * path: 形状路径，SVG path 的 d 属性
 * 
 * fixedRatio: 固定形状宽高比例
 * 
 * fill: 填充，不存在渐变时生效
 * 
 * gradient?: 渐变，该属性存在时将优先作为填充
 * 
 * outline?: 边框
 * 
 * opacity?: 不透明度
 * 
 * flipH?: 水平翻转
 * 
 * flipV?: 垂直翻转
 * 
 * shadow?: 阴影
 * 
 * special?: 特殊形状（标记一些难以解析的形状，例如路径使用了 L Q C A 以外的类型，该类形状在导出后将变为图片的形式）
 * 
 * text?: 形状内文本
 */
export interface PPTShapeElement extends PPTBaseElement {
  type: 'shape';
  viewBox: number;
  path: string;
  fixedRatio: boolean;
  fill: string;
  gradient?: ShapeGradient;
  outline?: PPTElementOutline;
  opacity?: number;
  flipH?: boolean;
  flipV?: boolean;
  shadow?: PPTElementShadow;
  special?: boolean;
  text?: ShapeText;
}


export type LinePoint = '' | 'arrow' | 'dot' 

/**
 * 线条元素
 * 
 * type: 元素类型（line）
 * 
 * start: 起点位置（[x, y]）
 * 
 * end: 终点位置（[x, y]）
 * 
 * style: 线条样式（实线、虚线）
 * 
 * color: 线条颜色
 * 
 * points: 端点样式（[起点样式, 终点样式]，可选：无、箭头、圆点）
 * 
 * shadow?: 阴影
 * 
 * broken?: 折线中点位置（[x, y]）
 * 
 * curve?: 曲线中点位置（[x, y]）
 */
export interface PPTLineElement extends Omit<PPTBaseElement, 'height' | 'rotate'> {
  type: 'line';
  start: [number, number];
  end: [number, number];
  style: 'solid' | 'dashed';
  color: string;
  points: [LinePoint, LinePoint];
  shadow?: PPTElementShadow;
  broken?: [number, number];
  curve?: [number, number];
}


export type ChartType = 'bar' | 'line' | 'pie'
export interface ChartData {
  labels: string[];
  legends: string[];
  series: number[][];
}

/**
 * 图表元素
 * 
 * type: 元素类型（chart）
 * 
 * fill?: 填充色
 * 
 * chartType: 图表类型
 * 
 * data: 图表数据
 * 
 * options?: 图表配置项
 * 
 * outline?: 边框
 * 
 * themeColor: 主题色
 * 
 * gridColor?: 网格&坐标颜色
 * 
 * legend?: 图例/位置
 */
export interface PPTChartElement extends PPTBaseElement {
  type: 'chart';
  fill?: string;
  chartType: ChartType;
  data: ChartData;
  options?: ILineChartOptions & IBarChartOptions & IPieChartOptions;
  outline?: PPTElementOutline;
  themeColor: string[];
  gridColor?: string;
  legend?: '' | 'top' | 'bottom',
}


/**
 * 表格单元格样式
 * 
 * bold?: 加粗
 * 
 * em?: 斜体
 * 
 * underline?: 下划线
 * 
 * strikethrough?: 删除线
 * 
 * color?: 字体颜色
 * 
 * backcolor?: 填充色
 * 
 * fontsize?: 字体大小
 * 
 * fontname?: 字体
 * 
 * align?: 对齐方式
 */
export interface TableCellStyle {
  bold?: boolean;
  em?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  color?: string;
  backcolor?: string;
  fontsize?: string;
  fontname?: string;
  align?: 'left' | 'center' | 'right';
}


/**
 * 表格单元格
 * 
 * id: 单元格ID
 * 
 * colspan: 合并列数
 * 
 * rowspan: 合并行数
 * 
 * text: 文字内容
 * 
 * style?: 单元格样式
 */
export interface TableCell {
  id: string;
  colspan: number;
  rowspan: number;
  text: string;
  style?: TableCellStyle;
}

/**
 * 表格主题
 * 
 * color: 主题色
 * 
 * rowHeader: 标题行
 * 
 * rowFooter: 汇总行
 * 
 * colHeader: 第一列
 * 
 * colFooter: 最后一列
 */
export interface TableTheme {
  color: string;
  rowHeader: boolean;
  rowFooter: boolean;
  colHeader: boolean;
  colFooter: boolean;
}

/**
 * 表格元素
 * 
 * type: 元素类型（table）
 * 
 * outline: 边框
 * 
 * theme?: 主题
 * 
 * colWidths: 列宽数组，如[30, 50, 20]表示三列宽度分别为30%, 50%, 20%
 * 
 * data: 表格数据
 */
export interface PPTTableElement extends PPTBaseElement {
  type: 'table';
  outline: PPTElementOutline;
  theme?: TableTheme;
  colWidths: number[];
  data: TableCell[][];
}


/**
 * LaTeX元素（公式）
 * 
 * type: 元素类型（latex）
 * 
 * latex: latex代码
 * 
 * path: svg path
 * 
 * color: 颜色
 * 
 * strokeWidth: 路径宽度
 * 
 * viewBox: SVG的viewBox属性
 * 
 * fixedRatio: 固定形状宽高比例
 */
export interface PPTLatexElement extends PPTBaseElement {
  type: 'latex';
  latex: string;
  path: string;
  color: string;
  strokeWidth: number;
  viewBox: [number, number];
  fixedRatio: boolean;
}

/**
 * 视频元素
 * 
 * type: 元素类型（video）
 * 
 * src: 视频地址
 * 
 * poster: 预览封面
 */
export interface PPTVideoElement extends PPTBaseElement {
  type: 'video';
  src: string;
  poster?: string;
}


export type PPTElement = PPTTextElement | PPTImageElement | PPTShapeElement | PPTLineElement | PPTChartElement | PPTTableElement | PPTLatexElement | PPTVideoElement


/**
 * 元素动画
 * 
 * elId: 元素ID
 * 
 * type: 动画类型
 * 
 * duration: 动画持续时间
 */
export interface PPTAnimation {
  elId: string;
  type: string;
  duration: number;
}

/**
 * 幻灯片背景
 * 
 * type: 背景类型（纯色、图片、渐变）
 * 
 * color?: 背景颜色（纯色）
 * 
 * image?: 图片地址（图片）
 * 
 * imageSize?: 图片填充方式
 * 
 * gradientType?: 渐变类型（线性、径向）
 * 
 * gradientColor?: 渐变颜色
 * 
 * gradientRotate?: 渐变角度（线性）
 */
export interface SlideBackground {
  type: 'solid' | 'image' | 'gradient';
  color?: string;
  image?: string;
  imageSize?: 'cover' | 'contain' | 'repeat';
  gradientType?: 'linear' | 'radial';
  gradientColor?: [string, string];
  gradientRotate?: number;
}


export type TurningMode = 'no' | 'fade' | 'slideX' | 'slideY'

/**
 * 幻灯片页面
 * 
 * id: 页面ID
 * 
 * elements: 元素集合
 * 
 * remark?: 备注
 * 
 * background?: 页面背景
 * 
 * animations?: 元素动画集合
 * 
 * turningMode?: 翻页方式
 */
export interface Slide {
  id: string;
  elements: PPTElement[];
  remark?: string;
  background?: SlideBackground;
  animations?: PPTAnimation[];
  turningMode?: TurningMode;
}

/**
 * 幻灯片主题
 * 
 * backgroundColor: 页面背景颜色
 * 
 * themeColor: 主题色，用于默认创建的形状颜色等
 * 
 * fontColor: 字体颜色
 * 
 * fontName: 字体
 */
export interface SlideTheme {
  backgroundColor: string;
  themeColor: string;
  fontColor: string;
  fontName: string;
}