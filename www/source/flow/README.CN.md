[English](./README.md) | 简体中文

# Le5le-topology

Le5le-topology 是一个可视化在线绘图工具，使用 Canvas + Typescript。支持 topology, UML、微服务架构、动态流量、SCADA 场景等。

- [→ 在线使用](http://topology.le5le.com) ，网站可能比较慢，个人申请的云服务器带宽仅仅 1M。
- [→ 开发文档](https://le5le-com.github.io/topology/)
- [→ 压缩包下载](https://github.com/le5le-com/topology/releases)

- [→ Vue 入门教程](https://juejin.im/post/5dd73e85518825731c34b2ca)
- [→ React 入门教程](https://juejin.im/post/5dcc074151882559c8061905)
- [→ Es5 ](https://github.com/johnnyhhj/topolofy-es5)

![topology](https://img2018.cnblogs.com/blog/328506/201909/328506-20190904144733715-530893726.png)

# VS Code 插件

[查看](https://marketplace.visualstudio.com/items?itemName=Alsmile.le5le-topology-plugin)

# 特性

- 极易扩展 - 程序员可以以中间件方式编写自己的图表。框架实现了拖曳、缩放、旋转、自定义属性等基础操作，开发者只用关心图表绘画实现即可。
- 流畅、高性能 - 使用 canvas 和多个场景离屏，操作过程流畅；完全不用担心 SVG 方式 dom 元素过多，性能高效。
- 动画
- TypeScript

# 快速上手

## typescrypt/es6

```
import { Topology } from '@topology/core';

var canvas = new Topology('topology-dom', options);
canvas.open(data);

```

# es5

```
<script src="/bundle/topology.bundle.js"></script>

var canvas = new Le5leTopology.Topology('topology-dom', options);
canvas.open(data);

```

# 文档

[Todo]

[→ 中文文档](https://www.yuque.com/alsmile/topology/about)

# 开发与编译

```
// 采用的是 Monorepos + yarn workspaces 方式目录结构
$ yarn
$

// build
$ yarn build

```

# 贡献者

- [Nickbing Lao](https://github.com/giscafer)
- [ivanZzzz](https://github.com/ivan135)
- [johnnyhhj](https://github.com/johnnyhhj)
- [顽强的小强](https://github.com/FxLsoft)
- [sunnyguohua](https://github.com/sunnyguohua)


# 核心维护者

- [Alsmile](https://github.com/Alsmile)
- [hudeyi](https://github.com/deyihu)

# 如何贡献

- PR
- Docs
- Translate
- Share
- Writing (articles, demos, videos and so on)
- Social networks

微信：alsmile123  
邮箱：alsmile123@qq.com

# 谁在使用

- 海云捷迅
- 汇客互动
- 重庆环投生态环境监测网络与工程治理有限公司
- 恒安嘉新（北京）科技股份公司
- 北京翌普信息科技有限公司
- 天津辰思科技
- 上海层峰

# License

MIT © le5le.com
