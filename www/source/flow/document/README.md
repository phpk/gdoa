# X-Flowchart-Vue

> A visual graph editor based on G6 and Vue.

## Version

| XFC |
| :-------- |
| [v3.0.0](https://github.com/OXOYO/X-Flowchart-Vue/tree/v3.0.0) |
| [v2.0.0](https://github.com/OXOYO/X-Flowchart-Vue/tree/v2.0.0) |
| [v1.0.0](https://github.com/OXOYO/X-Flowchart-Vue/tree/v1.0.0) |

## TODO
- [x] 1.升级G6版本至最新版（3.5.x）。
- [x] 2.xfc核心架构优化。
- [x] 3.性能优化。
- [ ] 4.图形丰富，支持更多的 path 节点，支持 dom 节点。
- [x] 5.遗留BUG修复。
- [x] 6.属性面板扩展，支持画板设置，支持节点、边的属性、文本等配置；
- [ ] 7.属性面板多语言支持。
- [x] 8.工具栏优化、精简，工具项功能完善。
- [x] 9.可配置化，支持工具栏、邮件菜单、属性面板、图形等的初始化配置。
- [x] 10.打包lib。

## Preview

[online](http://oxoyo.co/X-Flowchart-Vue/)

![](./document/FlowChart/20200101101220.png)

## Example

``` bash
# git clone https://github.com/OXOYO/X-Flowchart-Vue.git

# install dependencies
yarn install

### Compiles and hot-reloads for development
yarn run serve
```

## Features

| 功能       | 默认启用 | 快捷键            | 工具栏 | 右键菜单 | 备注   |
| :--------- | :--- | :--------------- | :----- | :----- | :---- |
| logo       | ✔   |                   | ✔     | ✖      | Logo | 
| undo       | ✔   | ctrl + z          | ✔     | ✔      | 撤销 | 
| clearLog   | ✔   | ctrl + shift + l  | ✔     | ✔      | 清空操作日志 | 
| history    | ✔   | ctrl + shift + h  | ✔     | ✔      | 操作日志 | 
| redo       | ✔   | ctrl + shift + z  | ✔     | ✔      | 重做 | 
| copy       | ✔   | ctrl + c          | ✔     | ✔      | 复制 | 
| paste      | ✔   | ctrl + v          | ✔     | ✔      | 粘贴 | 
| delete     | ✔   | Delete            | ✖     | ✔      | 删除 | 
| clear      | ✔   | ctrl + shift + c  | ✔     | ✔      | 清空画布 |
| zoom       | ✔   |                   | ✔     | ✔      | 缩放 |
| zoomIn     | ✔   | ctrl + +          | ✔     | ✔      | 放大 |
| zoomOut    | ✔   | ctrl + -          | ✔     | ✔      | 缩小 |
| fit        | ✔   | ctrl + 0          | ✔     | ✔      | 适应屏幕 |
| actualSize | ✔   | ctrl + 1          | ✔     | ✔      | 实际大小 |
| canvasBackground | ✔   |                   | ✔     | ✔      | 画布背景 |
| fill       | ✔   |                   | ✔     | ✔      | 填充颜色 |
| lineColor  | ✔   |                   | ✔     | ✔      | 线条颜色 |
| lineWidth  | ✔   |                   | ✔     | ✔      | 线条宽度 |
| lineDash   | ✔   |                   | ✔     | ✔      | 线条样式 |
| lineType   | ✔   |                   | ✔     | ✔      | 线条类型 |
| startArrow | ✔   |                   | ✔     | ✔      | 起点 |
| endArrow   | ✔   |                   | ✔     | ✔      | 终点 |
| toFront    | ✔   |                   | ✔     | ✔      | 置于顶层 |
| toBack     | ✔   |                   | ✔     | ✔      | 置于底层 |
| selectAll  | ✔   | ctrl + a          | ✔     | ✔      | 全选 |
| edit       | ✔   |                   | ✔     | ✔      | 编辑模式 |
| preview    | ✔   |                   | ✔     | ✔      | 预览模式 |
| upload     | ✔   |                   | ✔     | ✔      | 上传 |
| download   | ✔   |                   | ✔     | ✔      | 下载 |
| fullscreen | ✔   |                   | ✔     | ✔      | 全屏 |
| language   | ✔   |                   | ✔     | ✔      | 语言 |
| github     | ✖   |                   | ✔     | ✔      | Github |
| feedback   | ✖   |                   | ✔     | ✔      | 反馈 |
| help       | ✔   |                   | ✔     | ✔      | 帮助 |
| up         | ✔   | up                | ✖     | ✖      | 上 |
| down       | ✔   | down              | ✖     | ✖      | 下 |
| left       | ✔   | left              | ✖     | ✖      | 左 |
| right      | ✔   | right             | ✖     | ✖      | 右 |

## Reference
[@antvis/g6](https://github.com/antvis/g6)

[@alibaba/GGEditor](https://github.com/alibaba/GGEditor)

[@guozhaolong/wfd](https://github.com/guozhaolong/wfd)

[grapheditor](http://jgraph.github.io/mxgraph/javascript/examples/grapheditor/www/index.html)

## Thank
[guozhaolong](https://github.com/guozhaolong)

## Contribution

我们目前接受 GitHub Pull Request ，并且所有开发提交的合并均通过 Pull Request 进行，故你可以直接点击该项目的 Fork 按钮得到你自己的 Fork ，在其上进行提交，并在修改完毕后直接通过 GitHub 网页发起 Pull Request 即可。对于 Pull Request 的介绍和使用方式，可以参阅 [GitHub 帮助文档中的 “关于 Pull Request” 部分](https://help.github.com/en/articles/about-pull-requests)。

**感谢所有为此项目做出贡献的人们！**

[curiosity-hyf](https://github.com/curiosity-hyf) 

[lzygit18](https://github.com/lzygit18)

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019-present, OXOYO

## Contact

点击链接加入群【Web全栈QQ群 333765077】：https://jq.qq.com/?_wv=1027&k=53iWbrr
