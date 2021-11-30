Please follow the topology-v1 that will better！

English | [简体中文](./README.CN.md)

# Le5le-topology

Le5le-topology is a diagram visualization framework uses canvas and typescript. Developers are able to build diagram (topology, UML), micro-services architecture, SCADA and so on.

- [→ Online](http://topology.le5le.com) . It is very slow while open the site for my network speed is 1Mb/s.
- [→ Docs](https://le5le-com.github.io/topology/)
- [→ Download](https://github.com/le5le-com/topology/releases)

* [→ Vue Guide](https://juejin.im/post/5dd73e85518825731c34b2ca)
* [→ React Guide](https://juejin.im/post/5dcc074151882559c8061905)
* [→ Es5](https://github.com/johnnyhhj/topolofy-es5)

![topology](https://img2018.cnblogs.com/blog/328506/201909/328506-20190904144733715-530893726.png)

# VS Code extension

[VS Code extension](https://marketplace.visualstudio.com/items?itemName=Alsmile.le5le-topology-plugin)

# Why le5le-topology

- Extensible - Developers are able to make own diagrams easily. You just have to focus on your core logic in the framework.
- Fast rendering
- Animate
- TypeScript

# Getting Started

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

# Docs

[Todo]

[→ Chinese docs](https://www.yuque.com/alsmile/topology/about)

# Development

```
// Monorepos + yarn workspaces
$ yarn
$

// build
$ yarn build

```

# Contributors

- [Nickbing Lao](https://github.com/giscafer)
- [ivanZzzz](https://github.com/ivan135)
- [johnnyhhj](https://github.com/johnnyhhj)
- [FxLsoft](https://github.com/FxLsoft)
- [sunnyguohua](https://github.com/sunnyguohua)

# Core Maintainers

- [Alsmile](https://github.com/Alsmile)
- [hudeyi](https://github.com/deyihu)


# Contributing

- PR
- Docs
- Translate
- Share
- Writing (articles, demos, videos and so on)
- Social networks

Wechat: alsmile123  
Email: alsmile123@qq.com

# Who is using

- 海云捷迅
- 汇客互动
- 重庆环投生态环境监测网络与工程治理有限公司
- 恒安嘉新（北京）科技股份公司
- 北京翌普信息科技有限公司
- 天津辰思科技
- 上海层峰

# License

MIT © le5le.com
