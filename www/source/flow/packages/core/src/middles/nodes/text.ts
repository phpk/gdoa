import { Store } from 'le5le-store';

import { Node } from '../../models/node';
import { Pen } from '../../models/pen';

// getWords: Get the word array from text. A single Chinese character is a word.
export function getWords(txt: string) {
  const words = [];
  let word = '';
  if (!txt) {
    txt = '';
  }
  for (let i = 0; i < txt.length; ++i) {
    const ch = txt.charCodeAt(i);
    if (ch < 33 || ch > 126) {
      if (word) {
        words.push(word);
        word = '';
      }
      words.push(txt[i]);
      continue;
    } else {
      word += txt[i];
    }
  }

  if (word) {
    words.push(word);
  }

  return words;
}

// getWrapLines: Get the lines by wrap.
// words - the word array of text, to avoid spliting a word.
// maxWidth - the max width of the rect.
export function getWrapLines(ctx: CanvasRenderingContext2D, words: string[], maxWidth: number, fontSize: number) {
  const lines = [];
  let currentLine = words[0] || '';
  for (let i = 1; i < words.length; ++i) {
    const word = words[i] || '';
    const text = currentLine + word;
    const chinese = text.match(/[\u4e00-\u9fa5]/g) || '';
    const chineseLen = chinese.length;
    if ((text.length - chineseLen) * fontSize * 0.5 + chineseLen * fontSize < maxWidth) {
      currentLine += word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

export function getLines(ctx: CanvasRenderingContext2D, pen: Pen) {
  if (pen.text && !pen.text.split) {
    pen.text += '';
  }
  let lines = [];

  switch (pen.whiteSpace) {
    case 'nowrap':
      lines.push(pen.text);
      break;
    case 'pre-line':
      lines = pen.text.split(/[\n]/g);
      break;
    default:
      const textRect = pen.getTextRect();
      const paragraphs = pen.text.split(/[\n]/g);
      for (let i = 0; i < paragraphs.length; ++i) {
        const l = getWrapLines(ctx, getWords(paragraphs[i]), textRect.width, pen.fontSize);
        lines.push.apply(lines, l);
      }
      break;
  }

  return lines;
}

export function calcTextRect(ctx: CanvasRenderingContext2D, pen: Pen) {
  const lines = getLines(ctx, pen);
  let width = 0;
  for (const item of lines) {
    ctx.font = `${pen.fontStyle || 'normal'} normal ${pen.fontWeight || 'normal'} ${pen.fontSize}px/${pen.lineHeight
      } ${pen.fontFamily}`;
    const r = ctx.measureText(item);
    const w = r.width;
    if (w > width) {
      width = w;
    }
  }

  return {
    width,
    height: lines.length * pen.fontSize * pen.lineHeight,
  };
}

function textBk(ctx: CanvasRenderingContext2D, str: string, x: number, y: number, height: number, color?: string) {
  if (!str || !color) {
    return;
  }
  const w = ctx.measureText(str).width;

  ctx.save();
  ctx.fillStyle = color;
  let l = x - w / 2;
  let t = y - height / 2;
  switch (ctx.textAlign) {
    case 'left':
      l = x;
      break;
    case 'right':
      l = x - w;
      break;
  }
  switch (ctx.textBaseline) {
    case 'top':
      t = y;
      break;
    case 'bottom':
      t = y - height;
      break;
  }
  ctx.fillRect(l, t, w, height);
  ctx.restore();
}

export function fillText(
  ctx: CanvasRenderingContext2D,
  lines: string[],
  x: number,
  y: number,
  width: number,
  height: number,
  lineHeight: number,
  maxLineLen?: number,
  bk?: string
) {
  if (!maxLineLen || maxLineLen > lines.length) {
    maxLineLen = lines.length;
  } else {
    maxLineLen = Math.ceil(maxLineLen);
  }

  for (let i = 0; i < maxLineLen - 1; ++i) {
    if (bk) {
      textBk(ctx, lines[i], x, y + i * lineHeight, lineHeight, bk);
    }
    ctx.fillText(lines[i], x, y + i * lineHeight);
  }

  if (maxLineLen < lines.length) {
    let str = (lines[maxLineLen - 1] || '') + '...';
    if (lines[maxLineLen - 1] && ctx.measureText(str).width > width) {
      str = lines[maxLineLen - 1].substr(0, lines[maxLineLen - 1].length - 2) + '...';
    }
    if (bk) {
      textBk(ctx, str, x, y + (maxLineLen - 1) * lineHeight, lineHeight, bk);
    }
    ctx.fillText(str, x, y + (maxLineLen - 1) * lineHeight);
  } else {
    if (bk) {
      textBk(ctx, lines[maxLineLen - 1], x, y + (maxLineLen - 1) * lineHeight, lineHeight, bk);
    }
    ctx.fillText(lines[maxLineLen - 1], x, y + (maxLineLen - 1) * lineHeight);
  }
}

export function text(ctx: CanvasRenderingContext2D, node: Pen) {
  if (!node.text) {
    return;
  }
  if (!node.text.split) {
    node.text += '';
  }

  ctx.save();
  ctx.beginPath();
  delete ctx.shadowColor;
  delete ctx.shadowBlur;
  ctx.font = `${node.fontStyle || 'normal'} normal ${node.fontWeight || 'normal'} ${node.fontSize}px/${node.lineHeight
    } ${node.fontFamily}`;

  if (node.fontColor) {
    ctx.fillStyle = node.fontColor;
  } else {
    ctx.fillStyle = Store.get(node.generateStoreKey('LT:fontColor'));
  }
  if (node.textAlign) {
    ctx.textAlign = node.textAlign as any;
  }
  if (node.textBaseline) {
    ctx.textBaseline = node.textBaseline as any;
  }

  const textRect = node.getTextRect();
  if(!textRect){
    ctx.restore();
    return;
  }
  const lines = getLines(ctx, node);

  const lineHeight = node.fontSize * node.lineHeight;
  const maxLineLen = node.textMaxLine > 0 && node.textMaxLine < lines.length ? node.textMaxLine : lines.length;

  // By default, the text is center aligned.
  let x = textRect.x + textRect.width / 2;
  let y = textRect.y + (textRect.height - lineHeight * maxLineLen) / 2 + (lineHeight * 4) / 7;
  switch (ctx.textAlign) {
    case 'left':
      x = textRect.x;
      break;
    case 'right':
      x = textRect.x + textRect.width;
      break;
  }
  switch (ctx.textBaseline) {
    case 'top':
      y = textRect.y + (lineHeight - node.fontSize) / 2;
      break;
    case 'bottom':
      y = textRect.ey - lineHeight * maxLineLen + lineHeight;
      break;
  }
  fillText(
    ctx,
    lines,
    x + node.textOffsetX,
    y + node.textOffsetY,
    textRect.width,
    textRect.height,
    lineHeight,
    maxLineLen,
    node.textBackground
  );
  ctx.restore();
}

export function iconfont(ctx: CanvasRenderingContext2D, node: Node) {
  ctx.save();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const iconRect = node.getIconRect();
  let x = iconRect.x + iconRect.width / 2;
  let y = iconRect.y + iconRect.height / 2;
  switch (node.imageAlign) {
    case 'top':
      y = iconRect.y;
      ctx.textBaseline = 'top';
      break;
    case 'bottom':
      y = iconRect.ey;
      ctx.textBaseline = 'bottom';
      break;
    case 'left':
      x = iconRect.x;
      ctx.textAlign = 'left';
      break;
    case 'right':
      x = iconRect.ex;
      ctx.textAlign = 'right';
      break;
    case 'left-top':
      x = iconRect.x;
      y = iconRect.y;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      break;
    case 'right-top':
      x = iconRect.ex;
      y = iconRect.y;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'top';
      break;
    case 'left-bottom':
      x = iconRect.x;
      y = iconRect.ey;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      break;
    case 'right-bottom':
      x = iconRect.ex;
      y = iconRect.ey;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      break;
  }

  if (node.iconSize > 0) {
    ctx.font = `${node.iconSize}px ${node.iconFamily}`;
  } else if (iconRect.width > iconRect.height) {
    ctx.font = `${iconRect.height}px ${node.iconFamily}`;
  } else {
    ctx.font = `${iconRect.width}px ${node.iconFamily}`;
  }
  ctx.fillStyle = node.iconColor || Store.get(node.generateStoreKey('LT:iconColor')) || node.fontColor;

  if (node.iconRotate) {
    ctx.translate(iconRect.center.x, iconRect.center.y);
    ctx.rotate((node.iconRotate * Math.PI) / 180);
    ctx.translate(-iconRect.center.x, -iconRect.center.y);
  }

  ctx.beginPath();
  ctx.fillText(node.icon, x, y);
  ctx.restore();
}
