[English](./README.md) | 简体中文

# chart-diagram

chart-diagram 在 le5le-topology 中使用第三方 chart 的工具

# 使用

## echarts

1. 节点 name = 'echarts'
2. 定义自定义数据 data 为 json，其中包含 echarts 属性，为 echarts 提过数据

```
{
  text: '折线图',
  rect: {
    width: 300,
    height: 200
  },
  name: 'echarts',
  data: {
    echarts: {
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      }
    }
  }
}
```

# 如何开发其他图表控件

参考此目录下 echarts。

## 1. 注册、并加载图形库 js

```
// register.ts

import { registerNode, loadJS} from '@topology/core';
import {
  echarts
} from './echarts';

export function register() {
  if (!(echarts as any)) {
    loadJS('https://cdn.bootcss.com/echarts/4.3.0/echarts.min.js', null, true);
  }
  registerNode('echarts', echarts, null, null, null);
}
```

## 2. 定义绘图函数

```
export function echarts(ctx: CanvasRenderingContext2D, node: Node) {
  // 绘制一个底图，类似于占位符。
  rectangle(ctx, node);
}
```

## 3. 设置 elementId，divLayer 通过此 elementId 查找 node

```
if (!node.elementId) {
    node.elementId = s8();
  }
```

## 4. 初始化图表控件

```
if (!node.elementLoaded) {
    node.elementLoaded = {
      div: createDiv(node)
    };
    document.body.appendChild(node.elementLoaded.div);
    // 添加当前节点到div层
    node.addToDiv();
    node.elementLoaded.chart = echarts.init(node.elementLoaded.div, node.data.echarts.theme);
    node.elementRendered = false;

    // 等待父div先渲染完成，避免初始图表控件太大
    setTimeout(() => {
      node.elementLoaded.chart.resize();
    });
  }
```

其中， 先创建了一个图表控件的父 div 容器，然后通过 addToDiv 添加到 divLayer 层（不在 divLayer 层的 div 可能无法显示和管理）；然后初始化图表控件

## 5. 渲染数据

resize 时，会自动设置 elementRendered 为 false；数据更新需要人工设置

```
if (!node.elementRendered) {
    // 初始化时，等待父div先渲染完成，避免初始图表控件太大。
    setTimeout(() => {
      node.elementLoaded.chart.setOption(node.data.echarts.option);
      node.elementLoaded.chart.resize();
      node.elementRendered = true;
    });
  }
```

# 如何开发

# How to Contribute

If you have any comment or advice, please report your issue, or make any change as you wish and submit an PR.

alsmile123@qq.com

# License

MIT © le5le.com
