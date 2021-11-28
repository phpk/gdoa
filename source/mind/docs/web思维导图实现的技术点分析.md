![](./assets/swdt.jpg)



[TOC]

# 简介

思维导图是一种常见的表达发散性思维的有效工具，市面上有非常多的工具可以用来画思维导图，有免费的也有收费的，此外也有一些可以用来帮助快速实现的`JavaScript`类库，如：[jsMind](https://github.com/hizzgdev/jsmind)、[KityMinder](https://github.com/fex-team/kityminder)。

本文会完整的介绍如何从头实现一个简易的思维导图，最终成果预览：[https://wanglin2.github.io/mind-map/](https://wanglin2.github.io/mind-map/)。



# 技术选型

这种图形类的绘制一般有两种选择：`svg`和`canvas`，因为思维导图主要是节点与线的连接，使用与`html`比较接近的`svg`比较容易操作，`svg`的类库在试用了[svgjs](https://svgjs.dev/docs/3.0/)和[snap](http://snapsvg.io/)后，有些需求在`snap`里没有找到对应的方法，所以笔者最终选择了`svgjs`。

为了能跨框架使用，所以思维导图的主体部分作为一个单独的`npm`包来开发及发布，通过`类`的方式来组织代码，示例页面的开发使用的是`vue2.x`全家桶。



# 整体思路

笔者最初的思路是先写一个渲染器，根据输入的思维导图数据，渲染成`svg`节点，计算好各个节点的位置，然后显示到画布，最后给节点连上线即可，接下来对思维导图的操作都只需要维护这份数据，数据变化了就清空画布，然后重新渲染，这种数据驱动的思想很简单，在最初的开发中也没有任何问题，一切都很顺利，因为模拟数据就写了四五个节点，然而后来当我把节点数量增加到几十个的时候，发现凉了，太卡了，点击节点激活或者展开收缩节点的时候一秒左右才有反应，就算只是个`demo`也无法让人接受。

卡的原因一方面是因为计算节点位置，每种布局结构最少都需要三次遍历节点树，加上一些计算逻辑，会比较耗时，另一方面是因为渲染节点内容，因为一个思维导图节点除了文本，还要支持图片、图标、标签等信息、`svg`不像`html`会自动按流式布局来帮你排版，所以每种信息节点都需要手动计算它们的位置，所以也是很耗时的一个操作，并且因为`svg`元素也算是`dom`节点，所以数量多了又要频繁操作，当然就卡了。

卡顿的原因找到了，怎么解决呢？一种方法是不用`svg`，改用`canvas`，但是笔者发现该问题的时候已经写了较多代码，而且就算用`canvas`树的遍历也无法避免，所以笔者最后采用的方法的是不再每次都完全重新渲染，而是按需进行渲染，比如点击节点激活该节点的时候，不需要重新渲染其他节点，只需要重新渲染被点击的节点就可以了，又比如某个节点收缩或展开时，其他节点只是位置需要变化，节点内容并不需要重新渲染，所以只需要重新计算其他节点的位置并把它们移动过去即可，这样额外的好处是还可以让它们通过动画的方式移动过去，其他相关的操作也是如此，尽量只更新必要的节点和进行必要的操作，改造完后虽然还是会存在一定卡顿的现象，但是相比之前已经好了很多。



# 数据结构

思维导图可以看成就是一棵树，我把它称作渲染树，所以基本的结构就是树的结构，每个节点保存节点本身的信息再加上子节点的信息，具体来说，大概需要包含节点的各种内容（文本、图片、图标等固定格式）、节点展开状态、子节点等等，此外还要包括该节点的私有样式，用来覆盖主题的默认样式，这样可以对每个节点进行个性化：

```json
{
  "data": {
    "text": "根节点",
    "expand": true,
    "color": "#fff",
    // ...
    "children": []
  }
```

详细结构可参考：[节点结构](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/example/exampleData.js)。

仅有这棵渲染树是不够的，我们需要再定义一个节点类，当遍历渲染树的时候，每个数据节点都会创建一个节点实例，用来保存该节点的状态，以及执行渲染、计算宽高、绑定事件等等相关操作：

```js
// 节点类
class Node {
  constructor(opt = {}) {
    this.nodeData = opt.data// 节点真实数据，就是上述说的渲染树的节点
    this.isRoot =  opt.isRoot// 是否是根节点
    this.layerIndex = opt.layerIndex// 节点层级
    this.width = 0// 节点宽
    this.height = 0// 节点高
    this.left = opt.left || 0// left
    this.top = opt.top || 0// top
    this.parent = opt.parent || null// 父节点
    this.children = []// 子节点
    // ...
  }
  
  // ...
}
```

因为一个节点可能包含文本、图片等多种信息，所以我们使用一个`g`元素来作为节点容器，文本就创建一个`text`节点，需要边框的话就再创建一个`rect`节点，节点的最终大小就是文本节点的大小再加上内边距，比如我们要渲染一个带边框的只有文本的节点：

```js
import {
    G,
    Rect,
    Text
} from '@svgdotjs/svg.js'
class Node {
  constructor(opt = {}) {
    // ...
    this.group = new G()// 节点容器
    this.getSize()
    this.render()
  }
  // 计算节点宽高
  getSize() {
    let textData = this.createTextNode()
    this.width = textData.width + 20// 左右内边距各10
    this.height = textData.height + 10// 上下内边距各5
  }
  // 创建文本节点
  createTextNode() {
    let node = new Text().text(this.nodeData.data.text)
    let { width, height } = node.bbox()// 获取文本节点的宽高
    return {
      node,
      width,
      height
    }
  }
  // 渲染节点
  render() {
    let textData = this.createTextNode()
    textData.node.x(10).y(5)// 文字节点相对于容器偏移内边距的大小
    // 创建一个矩形来作为边框
    this.group.rect(this.width, this.height).x(0).y(0)
    // 文本节点添加到节点容器里
    this.group.add(textData.node)
    // 在画布上定位该节点
    this.group.translate(this.left, this.top)
    // 容器添加到画布上
    this.draw.add(this.group)
  }
}
```

如果还需要渲染图片的话，就需要再创建一个`image`节点，那么节点的总高度就需要再加上图片的高，节点的总宽就是图片和文字中较宽的那个大小，文字节点的位置计算也需要根据节点的总宽度及文字节点的宽度来计算，需要再渲染其他类型的信息也是一样，总之，所有节点的位置都需要自行计算，还是有点繁琐的。

节点类完整代码请看：[Node.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/Node.js)。



# 逻辑结构图

思维导图有多种结构，我们先看最基础的【逻辑结构图】如何进行布局计算，其他的几种会在下一篇里进行介绍。

![image-20210717174716810](./assets/image-20210717174716810.png)

逻辑结构图如上图所示，子节点在父节点的右侧，然后父节点相对于子节点总体来说是垂直居中的。



## 节点定位

这个思路源于笔者在网上看到的，首先根节点我们把它定位到画布中间的位置，然后遍历子节点，那么子节点的`left`就是根节点的`left `+根节点的`width`+它们之间的间距`marginX`，如下图所示：

![image-20210717202607786](./assets/image-20210717202607786.png)

然后再遍历每个子节点的子节点（其实就是递归遍历）以同样的方式进行计算`left`，这样一次遍历完成后所有节点的`left`值就计算好了。

```js
class Render {
  // 第一次遍历渲染树
  walk(this.renderer.renderTree, null, (cur, parent, isRoot, layerIndex) => {
    // 先序遍历
    // 创建节点实例
    let newNode = new Node({
      data: cur,// 节点数据
      layerIndex// 层级
    })
    // 节点实例关联到节点数据上
    cur._node = newNode
    // 根节点
    if (isRoot) {
      this.root = newNode
      // 定位在画布中心位置
      newNode.left = (this.mindMap.width - node.width) / 2
      newNode.top = (this.mindMap.height - node.height) / 2
    } else {// 非根节点
      // 互相收集
      newNode.parent = parent._node
      parent._node.addChildren(newNode)
      // 定位到父节点右侧
      newNode.left = parent._node.left + parent._node.width + marginX
    }
  }, null, true, 0)
}
```

接下来是`top`，首先最开始也只有根节点的`top`是确定的，那么子节点怎么根据父节点的`top`进行定位呢？上面说过每个节点是相对于其所有子节点居中显示的，那么如果我们知道所有子节点的总高度，那么第一个子节点的`top`也就确定了：

```js
firstChildNode.top = (node.top + node.height / 2) - childrenAreaHeight / 2
```

如图所示：

![image-20210717210355763](./assets/image-20210717210355763.png)

第一个子节点的`top`确定了，其他节点只要在前一个节点的`top`上累加即可。

那么怎么计算`childrenAreaHeight`呢？首先第一次遍历到一个节点时，我们会给它创建一个`Node`实例，然后触发计算该节点的大小，所以只有当所有子节点都遍历完回来后我们才能计算总高度，那么显然可以在后序遍历的时候来计算，但是要计算节点的`top`只能在下一次遍历渲染树时，为什么不在计算完一个节点的`childrenAreaHeight`后立即就计算其子节点的`top`呢？原因很简单，当前节点的`top`都还没确定，怎么确定其子节点的位置呢？

```js
// 第一次遍历
walk(this.renderer.renderTree, null, (cur, parent, isRoot, layerIndex) => {
  // 先序遍历
  // ...
}, (cur, parent, isRoot, layerIndex) => {
  // 后序遍历
  // 计算该节点所有子节点所占高度之和，包括节点之间的margin、节点整体前后的间距
  let len = cur._node.children
  cur._node.childrenAreaHeight = cur._node.children.reduce((h, node) => {
    return h + node.height
  }, 0) + (len + 1) * marginY
}, true, 0)
```

总结一下，在第一轮遍历渲染树时，我们在先序遍历时创建`Node`实例，然后计算节点的`left`，在后序遍历时计算每个节点的所有子节点的所占的总高度。

接下来开启第二轮遍历，这轮遍历可以计算所有节点的`top`，因为此时节点树已经创建成功了，所以可以不用再遍历渲染树，直接遍历节点树：

```js
// 第二次遍历
walk(this.root, null, (node, parent, isRoot, layerIndex) => {
  if (node.children && node.children.length > 0) {
    // 第一个子节点的top值 = 该节点中心的top值 - 子节点的高度之和的一半
    let top = node.top + node.height / 2 - node.childrenAreaHeight / 2
    let totalTop = top + marginY// node.childrenAreaHeight是包括子节点整体前后的间距的
    node.children.forEach((cur) => {
      cur.top = totalTop
      totalTop += cur.height + marginY// 在上一个节点的top基础上加上间距marginY和该节点的height
    })
  }
}, null, true)
```

事情到这里并没有结束，请看下图：

![image-20210717224527681](./assets/image-20210717224527681.png)

可以看到对于每个节点来说，位置都是正确的，但是，整体来看就不对了，因为发生了重叠，原因很简单，因为【二级节点1】的子节点太多了，子节点占的总高度已经超出了该节点自身的高，因为【二级节点】的定位是依据【二级节点】的总高度来计算的，并没有考虑到其子节点，解决方法也很简单，再来一轮遍历，当发现某个节点的子节点所占总高度大于其自身的高度时，就让该节点前后的节点都往外挪一挪，比如上图，假设子节点所占的高度比节点自身的高度多出了`100px`，那我们就让【二级节点2】向下移动`50px`，如果它上面还有节点的话也让它向上移动`50px`，需要注意的是，这个调整的过程需要一直往父节点上冒泡，比如：

![image-20210717230808662](./assets/image-20210717230808662.png)

【子节点1-2】的子元素总高度明显大于其自身，所以【子节点1-1】需要往上移动，这样显然还不够，假设上面还有【二级节点0】的子节点，那么它们可能也要发生重叠了，而且下方的【子节点2-1-1】和【子节点1-2-3】显然挨的太近了，所以【子节点1-1】自己的兄弟节点调整完后，父节点【二级节点1】的兄弟节点也需要同样进行调整，上面的往上移，下面的往下移，一直到根节点为止：

```js
// 第三次遍历
walk(this.root, null, (node, parent, isRoot, layerIndex) => {
  // 判断子节点所占的高度之和((除去子节点整体前后的margin))是否大于该节点自身
  let difference = node.childrenAreaHeight - marginY * 2 - node.height
  // 大于则前后的兄弟节点需要调整位置
  if (difference > 0) {
    this.updateBrothers(node, difference / 2)
  }
}, null, true)
```

`updateBrothers`用来向上递归移动兄弟节点：

```js
updateBrothers(node, addHeight) {
  if (node.parent) {
    let childrenList = node.parent.children
    // 找到自己处于第几个节点
    let index = childrenList.findIndex((item) => {
      return item === node
    })
    childrenList.forEach((item, _index) => {
      if (item === node) {
        return
      }
      let _offset = 0
      // 上面的节点往上移
      if (_index < index) {
        _offset = -addHeight
      } else if (_index > index) { // 下面的节点往下移
        _offset = addHeight
      }
      // 移动节点
      item.top += _offset
      // 节点自身移动了，还需要同步移动其所有下级节点
      if (item.children && item.children.length) {
        this.updateChildren(item.children, 'top', _offset)
      }
    })
    // 向上遍历，移动父节点的兄弟节点
    this.updateBrothers(node.parent, addHeight)
  }
}
```

```js
// 更新节点的所有子节点的位置
updateChildren(children, prop, offset) {
  children.forEach((item) => {
    item[prop] += offset
    if (item.children && item.children.length) {
      this.updateChildren(item.children, prop, offset)
    }
  })
}
```

到此【逻辑结构图】的整个布局计算就完成了，当然，有一个小小小的问题：

![image-20210718083616076](./assets/image-20210718083616076.png)

就是严格来说，某个节点可能不再相对于其所有子节点居中了，而是相对于所有子孙节点居中，其实这样问题也不大，实在有强迫症的话，可以自行思考一下如何优化（然后偷偷告诉笔者），这部分完整代码请移步[LogicalStructure.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/layouts/LogicalStructure.js)。



## 节点连线

节点定位好了，接下来就要进行连线，把节点和其所有子节点连接起来，连线风格有很多，可以使用直线，也可以使用曲线，直线的话很简单，因为所有节点的`left`、`top`、`width`、`height`都已经知道了，所以连接线的转折点坐标都可以轻松计算出来：

![image-20210718092817830](./assets/image-20210718092817830.png)

我们重点看一下曲线连接，如之前的图片所示，根节点的连线和其他节点的线是不一样的，根节点到其子节点的如下所示：

![image-20210718102434530](./assets/image-20210718102434530.png)

这种简单的曲线可以使用二次贝塞尔曲线，起点坐标为根节点的中间点：

```js
let x1 = root.left + root.width / 2
let y1 = root.top + root.height / 2
```

终点坐标为各个子节点的左侧中间：

```js
let x2 = node.left
let y2 = node.top + node.height / 2
```

那么只要确定一个控制点即可，具体这个点可以自己[调节](https://cubic-bezier.com/#0,0,.11,.9)，找一个看的顺眼的位置即可，笔者最终选择的是：

```js
let cx = x1 + (x2 - x1) * 0.2
let cy = y1 + (y2 - y1) * 0.8）
```

![image-20210718110652705](./assets/image-20210718110652705.png)

再看下级节点的连线：

![image-20210718111334085](./assets/image-20210718111334085.png)

可以看到有两段弯曲，所以需要使用三次贝塞尔曲线，也是一样，自己选择两个合适的控制点位置，笔者的选择如下图，两个控制点的`x`处于起点和终点的中间：

![image-20210718134525691](./assets/image-20210718134525691.png)

```js
  let cx1 = x1 + (x2 - x1) / 2
  let cy1 = y1
  let cx2 = cx1
  let cy2 = y2
```

接下来给`Node`类加个渲染连线的方法即可：

```js
class Node {
  // 渲染节点到其子节点的连线
  renderLine() {
    let { layerIndex, isRoot, top, left, width, height } = this
    this.children.forEach((item, index) => {
      // 根节点的连线起点在节点中间，其他都在右侧
      let x1 = layerIndex === 0 ? left + width / 2 : left + width
      let y1 = top + height / 2
      let x2 = item.left
      let y2 = item.top + item.height / 2
      let path = ''
      if (isRoot) {
        path = quadraticCurvePath(x1, y1, x2, y2)
      } else {
        path = cubicBezierPath(x1, y1, x2, y2)
      }
      // 绘制svg路径到画布
      this.draw.path().plot(path)
    })
  }
}

// 根节点到其子节点的连线
const quadraticCurvePath = (x1, y1, x2, y2) => {
  // 二次贝塞尔曲线的控制点
  let cx = x1 + (x2 - x1) * 0.2
  let cy = y1 + (y2 - y1) * 0.8
  return `M ${x1},${y1} Q ${cx},${cy} ${x2},${y2}`
}

// 其他节点到其子节点的连线
const cubicBezierPath = (x1, y1, x2, y2) => {
  // 三次贝塞尔曲线的两个控制点
  let cx1 = x1 + (x2 - x1) / 2
  let cy1 = y1
  let cx2 = cx1
  let cy2 = y2
  return `M ${x1},${y1} C ${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}`
}
```



# 节点激活

点击某个节点就相对于把它激活，为了能有点反馈，所以需要给它加一点激活的样式，通常都是给它加个边框，但是笔者不满足于此，笔者认为节点所有的样式，激活时都可以改变，这样可以更好的与主题融合，也就是节点的所有样式都有两种状态，普通状态和激活状态，缺点是激活和取消激活时的操作多了，会带来一点卡顿。

实现上可以监听节点的单击事件，然后设置节点的激活标志，因为同时是可以存在多个激活节点的，所以用一个数组来保存所有的激活节点。

```js
class Node {
  bindEvent() {
    this.group.on('click', (e) => {
      e.stopPropagation()
      // 已经是激活状态就直接返回
      if (this.nodeData.data.isActive) {
        return
      }
      // 清除当前已经激活节点的激活状态
      this.renderer.clearActive()
      // 执行激活 点击节点的激活状态 的命令
      this.mindMap.execCommand('SET_NODE_ACTIVE', this, true)
      // 添加到激活列表里
      this.renderer.addActiveNode(this)
    })
  }
}
```

`SET_NODE_ACTIVE`命令会重新渲染该节点，所以我们只要在渲染节点的逻辑里判断节点的激活状态来应用不同的样式即可，具体在后序的样式与主题小节里细说。



# 文字编辑

文字编辑比较简单，监听节点容器的双击事件，然后获取文字节点的宽高和位置，最后再盖一个同样大小的编辑层在上面即可，编辑完监听回车键，隐藏编辑层，修改节点数据然后重新渲染该节点，如果节点大小变化了就更新其他节点的位置。

```js
class Node {
  // 绑定事件
  bindEvent() {
    this.group.on('dblclick', (e) => {
      e.stopPropagation()
      this.showEditTextBox()
    })
  }
  
  // 显示文本编辑层
  showEditTextBox() {
    // 获取text节点的位置和尺寸信息
    let rect = this._textData.node.node.getBoundingClientRect()
    // 文本编辑层节点没有创建过就创建一个
    if (!this.textEditNode) {
      this.textEditNode = document.createElement('div')
      this.textEditNode.style.cssText = `
		position:fixed;
        box-sizing: border-box;
        background-color:#fff;
        box-shadow: 0 0 20px rgba(0,0,0,.5);
        padding: 3px 5px;
        margin-left: -5px;
        margin-top: -3px;
        outline: none;`
      // 开启编辑模式
      this.textEditNode.setAttribute('contenteditable', true)
      document.body.appendChild(this.textEditNode)
    }
    // 把文字的换行符替换成换行元素
    this.textEditNode.innerHTML = this.nodeData.data.text.split(/\n/img).join('<br>')
    // 定位和显示文本编辑框
    this.textEditNode.style.minWidth = rect.width + 10 + 'px'
    this.textEditNode.style.minHeight = rect.height + 6 + 'px'
    this.textEditNode.style.left = rect.left + 'px'
    this.textEditNode.style.top = rect.top + 'px'
    this.textEditNode.style.display = 'block'
  }
}
```

有个小细节，就是当节点支持个性化的时候，需要把节点文字的样式，比如`font-size`、`line-height`之类样式也设置到这个编辑节点上，这样可以尽量保持一致性，虽然是个盖上去的层，但是并不会让人感觉很突兀。

```js
class Node {
  // 注册快捷键
  registerCommand() {
    // 注册回车快捷键
    this.mindMap.keyCommand.addShortcut('Enter', () => {
      this.hideEditTextBox()
    })
  }

  // 关闭文本编辑框
  hideEditTextBox() {
    // 遍历当前激活的节点列表，修改它们的文字信息
    this.renderer.activeNodeList.forEach((node) => {
      // 这个方法会去掉html字符串里的标签及把br标签替换成\n
      let str = getStrWithBrFromHtml(this.textEditNode.innerHTML)
      // 执行 设置节点文本 的命令
      this.mindMap.execCommand('SET_NODE_TEXT', this, str)
      // 更新其他节点
      this.mindMap.render()
    })
    // 隐藏文本编辑层
    this.textEditNode.style.display = 'none'
    this.textEditNode.innerHTML = ''
  }
}
```

上面涉及到了其他两个概念，一个是注册快捷键，另一个是执行命令，这两个话题后面的小节里会进行介绍，节点编辑类完整代码：[TextEdit.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/TextEdit.js).



# 展开与收起

有时候节点太多了，我们不需要全部都显示，那么可以通过展开和收起来只显示需要的节点，首先需要给有子节点的节点渲染一个展开收起按钮，然后绑定点击事件，切换节点的展开和收缩状态：

```js
class Node {
  renderExpandBtn() {
    // 没有子节点或是根节点直接返回
    if (!this.nodeData.children || this.nodeData.children.length <= 0 || this.isRoot) {
      return
    }
    // 按钮容器
    this._expandBtn = new G()
    let iconSvg
    // 根据节点的展开状态来判断渲染哪个图标，oepn与close都是svg字符串
    if (this.nodeData.data.expand === false) {
      iconSvg = btnsSvg.open
    } else {
      iconSvg = btnsSvg.close
    }
    let node = SVG(iconSvg).size(this.expandBtnSize, this.expandBtnSize)
    // 因为图标都是路径path元素，鼠标很难点击到，所以渲染一个透明的圆来响应鼠标事件
    let fillNode = new Circle().size(this.expandBtnSize)
    // 添加到容器里
    this._expandBtn.add(fillNode).add(node)
    // 绑定点击事件
    this._expandBtn.on('click', (e) => {
      e.stopPropagation()
      // 执行展开收缩的命令
      this.mindMap.execCommand('SET_NODE_EXPAND', this, !this.nodeData.data.expand)
    })
    // 设置按钮的显示位置，显示到节点的右侧垂直居中的位置
    this._expandBtn.translate(width, height / 2)
    // 添加到节点的容器里
    this.group.add(this._expandBtn)
  }
}
```

![image-20210718184835414](./assets/image-20210718184835414.png)

`SET_NODE_EXPAND`命令会设置节点的展开收起状态，并渲染或删除其所有子孙节点，达到展开或收起的效果，并且还需要重新计算和移动其他所有节点的位置，此外遍历树计算位置的相关代码也需要加上展开收缩的判断：

```js
// 第一次遍历
walk(this.renderer.renderTree, null, (cur, parent, isRoot, layerIndex) => {
  // ...
}, (cur, parent, isRoot, layerIndex) => {
  // 后序遍历
  if (cur.data.expand) {// 展开状态
    cur._node.childrenAreaHeight = cur._node.children.reduce((h, node) => {
      return h + node.height
    }, 0) + (len + 1) * marginY
  } else {// 如果该节点为收起状态，那么其childrenAreaHeight显然应该为0
    cur._node.childrenAreaHeight = 0
  }
}, true, 0)
```

```js
// 第二次遍历
walk(this.root, null, (node, parent, isRoot, layerIndex) => {
  // 只计算展开状态节点的子节点
  if (node.nodeData.data.expand && node.children && node.children.length > 0) {
    let top = node.top + node.height / 2 - node.childrenAreaHeight / 2
    // ...
  }
}, null, true)
```

```js
// 第三次遍历
walk(this.root, null, (node, parent, isRoot, layerIndex) => {
  // 收起状态不用再去判断子节点高度
  if (!node.nodeData.data.expand) {
    return;
  }
  let difference = node.childrenAreaHeight - marginY * 2 - node.height
  // ...
  }, null, true)
```

![image-20210718191124627](./assets/image-20210718191124627.png)

到这里，一个基本可用的思维导图就完成了。

补充一个小细节，就是上面一直提到的移动节点，代码其实很简单：

```js
let t = this.group.transform()
this.group.animate(300).translate(this.left - t.translateX, this.top - t.translateY)
```

因为`translate`是在之前的基础上进行变换的，所以需要先获取到当前的变换，然后相减得到本次的增量，至于动画，使用`svgjs`只要顺便执行一下`animate`方法就可以了。

![snow9](./assets/1.gif)



# 命令

前面的代码已经涉及到几个命令了，我们把会修改节点状态的操作通过命令来调用，每调用一个命令就会保存一份当前的节点数据副本，用来回退和前进。

命令类似于发布订阅者，先注册命令，然后再触发命令的执行：

```js
class Command {
  constructor() {
    // 保存命令
    this.commands = {}
    // 保存历史副本
    this.history = []
    // 当前所在的历史位置
    this.activeHistoryIndex = 0
  }

  // 添加命令
  add(name, fn) {
    if (this.commands[name]) {
      this.commands[name].push(fn)
    } else[
      this.commands[name] = [fn]
    ]
  }

  // 执行命令
  exec(name, ...args) {
    if (this.commands[name]) {
      this.commands[name].forEach((fn) => {
        fn(...args)
      })
      // 保存当前数据副本到历史列表里
      this.addHistory()
    }
  }

  // 保存当前数据副本到历史列表里
  addHistory() {
    // 深拷贝一份当前数据
    let data = this.getCopyData()
    this.history.push(data)
    this.activeHistoryIndex = this.history.length - 1
  }
}
```

比如之前的`SET_NODE_ACTIVE`命令会先注册：

```js
class Render {
  registerCommand() {
    this.mindMap.command.add('SET_NODE_ACTIVE', this.setNodeActive)
  }

  // 设置节点是否激活
  setNodeActive(node, active) {
    // 设置节点激活状态
    this.setNodeData(node, {
      isActive: active
    })
    // 重新渲染节点内容
    node.renderNode()
  }
}
```



# 回退与前进

上一节的命令里已经保存了所有操作后的副本数据，所以回退和前进就只要操作指针`activeHistoryIndex`，然后获取到这个位置的历史数据，复制一份替换当前的渲染树，最后再触发重新渲染即可，这里会进行整体全部的重新渲染，所以会稍微有点卡顿。

```js
class Command {
  // 回退
  back(step = 1) {
    if (this.activeHistoryIndex - step >= 0) {
      this.activeHistoryIndex -= step
      return simpleDeepClone(this.history[this.activeHistoryIndex]);
    }
  }

  // 前进
  forward(step = 1) {
    let len = this.history.length
    if (this.activeHistoryIndex + step <= len - 1) {
      this.activeHistoryIndex += step
      return simpleDeepClone(this.history[this.activeHistoryIndex]);
    }
  }
}
```

```js
class Render {
  // 回退
  back(step) {
    let data = this.mindMap.command.back(step)
    if (data) {
      // 替换当前的渲染树
      this.renderTree = data
      this.mindMap.reRender()
    }
  }

  // 前进
  forward(step) {
    let data = this.mindMap.command.forward(step)
    if (data) {
      this.renderTree = data
      this.mindMap.reRender()
    }
  }
}
```



# 样式与主题

主题包括节点的所有样式，比如颜色、填充、字体、边框、内边距等等，也包括连线的粗细、颜色，及画布的背景颜色或图片等等。

一个主题的结构大致如下：

```js
export default {
    // 节点内边距
    paddingX: 15,
    paddingY: 5,
    // 连线的粗细
    lineWidth: 1,
    // 连线的颜色
    lineColor: '#549688',
    // 背景颜色
    backgroundColor: '#fafafa',
    // ...
    // 根节点样式
    root: {
        fillColor: '#549688',
        fontFamily: '微软雅黑, Microsoft YaHei',
        color: '#fff',
        // ...
        active: {
            borderColor: 'rgb(57, 80, 96)',
            borderWidth: 3,
            borderDasharray: 'none',
            // ...
        }
    },
    // 二级节点样式
    second: {
        marginX: 100,
        marginY: 40,
        fillColor: '#fff',
        // ...
        active: {
            // ...
        }
    },
    // 三级及以下节点样式
    node: {
        marginX: 50,
        marginY: 0,
        fillColor: 'transparent',
        // ...
        active: {
            // ...
        }
    }
}
```

最外层的是非节点样式，对于节点来说，也分成了三种类型，分别是根节点、二级节点及其他节点，每种节点里面又分成了常态样式和激活时的样式，它们能设置的样式是完全一样的，完整结构请看[default.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/themes/default.js)。

创建节点的每个信息元素时都会给它应用相关的样式，比如之前提到的文本元素和边框元素：

```js
class Node {
  // 创建文本节点
  createTextNode() {
    let node = new Text().text(this.nodeData.data.text)
    // 给文本节点应用样式
    this.style.text(node)
    let { width, height } = node.bbox()
    return {
      node: g,
      width,
      height
    }
  }
  
  // 渲染节点
  render() {
    let textData = this.createTextNode()
    textData.node.translate(10, 5)
    // 给边框节点应用样式
    this.style.rect(this.group.rect(this.width, this.height).x(0).y(0))
    // ...
  }
}
```

`style`是样式类`Style`的实例，每个节点都会实例化一个（其实没必要，后续可能会修改），用来给各种元素设置样式，它会根据节点的类型和激活状态来选择对应的样式：

```js
class Style {
  // 给文本节点设置样式
  text(node) {
    node.fill({
      color: this.merge('color')
    }).css({
      'font-family': this.merge('fontFamily'),
      'font-size': this.merge('fontSize'),
      'font-weight': this.merge('fontWeight'),
      'font-style': this.merge('fontStyle'),
      'text-decoration': this.merge('textDecoration')
    })
  }
}
```

`merge`就是用来判断使用哪个样式的方法：

```js
class Style {
  // 这里的root不是根节点，而是代表非节点的样式
  merge(prop, root) {
    // 三级及以下节点的样式
    let defaultConfig = this.themeConfig.node
    if (root) {// 非节点的样式
      defaultConfig = this.themeConfig
    } else if (this.ctx.layerIndex === 0) {// 根节点
      defaultConfig = this.themeConfig.root
    } else if (this.ctx.layerIndex === 1) {// 二级节点
      defaultConfig = this.themeConfig.second
    }
    // 激活状态
    if (this.ctx.nodeData.data.isActive) {
      // 如果节点有单独设置了样式，那么优先使用节点的
      if (this.ctx.nodeData.data.activeStyle && this.ctx.nodeData.data.activeStyle[prop] !== undefined) {
        return this.ctx.nodeData.data.activeStyle[prop];
      } else if (defaultConfig.active && defaultConfig.active[prop]) {// 否则使用主题默认的
        return defaultConfig.active[prop]
      }
    }
    // 优先使用节点本身的样式
    return this.ctx.nodeData.data[prop] !== undefined ? this.ctx.nodeData.data[prop] : defaultConfig[prop]
  }
}
```

我们会先判断一个节点自身是否设置了该样式，有的话那就优先使用自身的，这样来达到每个节点都可以进行个性化的能力。

样式编辑就是把所有这些可配置的样式通过可视化的控件来展示与修改，实现上，可以监听节点的激活事件，然后打开样式编辑面板，先回显当前的样式，然后当修改了某个样式就通过相应的命令设置到当前激活节点上：

![image-20210718222150055](./assets/image-20210718222150055.png)

可以看到区分了常态与选中态，这部分代码很简单，可以参考：[Style.vue](https://github.com/wanglin2/mind-map/blob/main/web/src/pages/Edit/components/Style.vue)。

除了节点样式编辑，对于非节点的样式也是同样的方式进行修改，先获取到当前的主题配置，然后进行回显，用户修改了就通过相应的方法进行设置：

![image-20210718222612078](./assets/image-20210718222612078.png)

这部分的代码在[BaseStyle.vue](https://github.com/wanglin2/mind-map/blob/main/web/src/pages/Edit/components/BaseStyle.vue)。



# 快捷键

快捷键简单来说就是监听到按下了特定的按键后执行特定的操作，实现上其实也是一种发布订阅模式，先注册快捷键，然后监听到了该按键就执行对应的方法。

首先键值都是数字，不容易记忆，所以我们需要维护一份键名到键值的映射表，像下面这样：

```js
const map = {
    'Backspace': 8,
    'Tab': 9,
    'Enter': 13,
  	// ...
}
```

完整映射表请点这里：[keyMap.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/utils/keyMap.js)。

快捷键包含三种：单个按键、组合键、多个”或“关系的按键，可以使用一个对象来保存键值及回调：

```js
{
  'Enter': [() => {}],
  'Control+Enter': [],
  'Del|Backspace': []
}
```

然后添加一个注册快捷键的方法：

```js
class KeyCommand {
  // 注册快捷键
  addShortcut(key, fn) {
    // 把或的快捷键转换成单个按键进行处理
    key.split(/\s*\|\s*/).forEach((item) => {
      if (this.shortcutMap[item]) {
        this.shortcutMap[item].push(fn)
      } else {
        this.shortcutMap[item] = [fn]
      }
    })
  }
}
```

比如注册一个删除节点的快捷键：

```js
this.mindMap.keyCommand.addShortcut('Del|Backspace', () => {
  this.removeNode()
})
```

有了注册表，当然需要监听按键事件才行：

```js
class KeyCommand {
  bindEvent() {
    window.addEventListener('keydown', (e) => {
      // 遍历注册的所有键值，看本次是否匹配，匹配到了哪个就执行它的回调队列
      Object.keys(this.shortcutMap).forEach((key) => {
        if (this.checkKey(e, key)) {
          e.stopPropagation()
          e.preventDefault()
          this.shortcutMap[key].forEach((fn) => {
            fn()
          })
        }
      })
    })
  }
}
```

`checkKey`方法用来检查注册的键值是否和本次按下的匹配，需要说明的是组合键一般指的是`ctrl`、`alt`、`shift`三个键和其他按键的组合，如果按下了这三个键，事件对象`e`里对应的字段会被置为`true`，然后再结合`keyCode`字段判断是否匹配到了组合键。

```js
class KeyCommand {
    checkKey(e, key) {
        // 获取事件对象里的键值数组
        let o = this.getOriginEventCodeArr(e)
        // 注册的键值数组，
        let k = this.getKeyCodeArr(key)
        // 检查两个数组是否相同，相同则说明匹配成功
        if (this.isSame(o, k)) {
            return true
        }
        return false
    }
}
```

`getOriginEventCodeArr`方法通过事件对象获取按下的键值，返回一个数组：

```js
getOriginEventCodeArr(e) {
    let arr = []
    // 按下了control键
    if (e.ctrlKey || e.metaKey) {
        arr.push(keyMap['Control'])
    }
    // 按下了alt键
    if (e.altKey) {
        arr.push(keyMap['Alt'])
    }
    // 按下了shift键
    if (e.shiftKey) {
        arr.push(keyMap['Shift'])
    }
    // 同时按下了其他按键
    if (!arr.includes(e.keyCode)) {
        arr.push(e.keyCode)
    }
    return arr
}
```

`getKeyCodeArr`方法用来获取注册的键值数组，除了组合键，其他都只有一项，组合键的话通过`+`把字符串切割成数组：

```js
getKeyCodeArr(key) {
    let keyArr = key.split(/\s*\+\s*/)
    let arr = []
    keyArr.forEach((item) => {
        arr.push(keyMap[item])
    })
    return arr
}
```



# 拖动、放大缩小

首先请看一下基本结构：

![image-20210720191943989](./assets/image-20210720191943989.png)

![image-20210720192008277](./assets/image-20210720192008277.png)

```js
// 画布
this.svg = SVG().addTo(this.el).size(this.width, this.height)
// 思维导图节点实际的容器
this.draw = this.svg.group()
```

所以拖动、放大缩小都是操作这个`g`元素，对它应用相关变换即可。拖动的话只要监听鼠标移动事件，然后修改`g`元素的`translate`属性：

```js
class View {
    constructor() {
        // 鼠标按下时的起始偏移量
        this.sx = 0
        this.sy = 0
        // 当前实时的偏移量
        this.x = 0
        this.y = 0
        // 拖动视图
        this.mindMap.event.on('mousedown', () => {
            this.sx = this.x
            this.sy = this.y
        })
        this.mindMap.event.on('drag', (e, event) => {
            // event.mousemoveOffset表示本次鼠标按下后移动的距离
            this.x = this.sx + event.mousemoveOffset.x
            this.y = this.sy + event.mousemoveOffset.y
            this.transform()
        })
    }
    
    // 设置变换
    transform() {
        this.mindMap.draw.transform({
            scale: this.scale,
            origin: 'left center',
            translate: [this.x, this.y],
        })
    }
}
```

![2.gif](./assets/2.gif)

放大缩小也很简单，监听鼠标的滚轮事件，然后增大或减小`this.scale`的值即可：

```js
this.scale = 1

// 放大缩小视图
this.mindMap.event.on('mousewheel', (e, dir) => {
    // // 放大
    if (dir === 'down') {
        this.scale += 0.1
    } else { // 缩小
        this.scale -= 0.1
    }
    this.transform()
})
```

![2.gif](./assets/3.gif)



# 多选节点

多选节点也是一个不可缺少的功能，比如我想同时删除多个节点，或者给多个节点设置同样的样式，挨个操作节点显然比较慢，市面上的思维导图一般都是鼠标左键按着拖动进行多选，右键拖动移动画布，但是笔者的个人习惯把它反了一下。

多选其实很简单，鼠标按下为起点，鼠标移动的实时位置为终点，那么如果某个节点在这两个点组成的矩形区域内就相当于被选中了，需要注意的是要考虑变换问题，比如拖动和放大缩小后，那么节点的`left`和`top`也需要变换一下：

```js
class Select {
    // 检测节点是否在选区内
    checkInNodes() {
        // 获取当前的变换信息
        let { scaleX, scaleY, translateX, translateY } = this.mindMap.draw.transform()
        let minx = Math.min(this.mouseDownX, this.mouseMoveX)
        let miny = Math.min(this.mouseDownY, this.mouseMoveY)
        let maxx = Math.max(this.mouseDownX, this.mouseMoveX)
        let maxy = Math.max(this.mouseDownY, this.mouseMoveY)
        // 遍历节点树
        bfsWalk(this.mindMap.renderer.root, (node) => {
            let { left, top, width, height } = node
            // 节点的位置需要进行相应的变换
            let right = (left + width) * scaleX + translateX
            let bottom = (top + height) * scaleY + translateY
            left = left * scaleX + translateX
            top = top * scaleY + translateY
            // 判断是否完整的在选区矩形内，你也可以改成部分区域重合也算选中
            if (
                left >= minx &&
                right <= maxx &&
                top >= miny &&
                bottom <= maxy
            ) {
                // 在选区内，激活节点
            } else if (node.nodeData.data.isActive) {
                // 不再选区内，如果当前是激活状态则取消激活
            }
        })
    }
}
```

另外一个细节是当鼠标移动到画布边缘时`g`元素需要进行移动变换，比如鼠标当前已经移底边旁边了，那么`g`元素自动往上移动（当然，鼠标按下的起点位置也需要同步变化），否则画布外的节点就没办法被选中了：

![2021-07-21-19-54-48](./assets/2021-07-21-19-54-48.gif)

完整代码请参考[Select.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/Select.js)。



# 导出

其实导出的范围很大，可以导出为`svg`、图片、纯文本、`markdown`、`pdf`、`json`、甚至是其他思维导图的格式，有些纯靠前端也很难实现，所以本小节只介绍如何导出为`svg`和`图片`。

## 导出svg

导出`svg`很简单，因为我们本身就是用`svg`绘制的，所以只要把`svg`整个节点转换成`html`字符串导出就可以了，但是直接这样是不行的，因为实际上思维导图只占画布的一部分，剩下的大片空白其实没用，另外如果放大后，思维导图部分已经超出画布了，那么导出的又不完整，所以我们想要导出的应该是下图阴影所示的内容，即完整的思维导图图形，而且是原本的大小，与缩放无关：

![image-20210720200816281](./assets/image-20210720200816281.png)

上面的【拖动、放大缩小】小节里介绍了思维导图所有的节点都是通过一个`g`元素来包裹的，相关变换效果也是应用在这个元素上，我们的思路是先去除它的放大缩小效果，这样能获取到它原本的宽高，然后把画布也就是`svg`元素调整成这个宽高，然后再想办法把`g`元素移动到`svg`的位置上和它重合，这样导出`svg`刚好就是原大小且完整的，导出成功后再把`svg`元素恢复之前的变换及大小即可。

接下来一步步图示：

1.初始状态

![image-20210721183307656](./assets/image-20210721183307656.png)

2.拖动+放大

![image-20210721183340310](./assets/image-20210721183340310.png)

3.去除它的放大缩小变换

```js
// 获取当前的变换数据
const origTransform = this.mindMap.draw.transform()
// 去除放大缩小的变换效果，和translate一样也是在之前的基础上操作的，所以除以当前的缩放得到1
this.mindMap.draw.scale(1 / origTransform.scaleX, 1 / origTransform.scaleY)
```

![image-20210721183823754](./assets/image-20210721183823754.png)

4.把`svg`画布调整为`g`元素的实际大小

```js
// rbox是svgjs提供的用来获取变换后的位置和尺寸信息，其实是getBoundingClientRect方法的包装方法
const rect = this.mindMap.draw.rbox()
this.mindMap.svg.size(rect.wdith, rect.height)
```

![image-20210721184140488](./assets/image-20210721184140488.png)

`svg`元素变成左上方阴影区域的大小，另外可以看到因为`g`元素超出当前的`svg`范围，已经看不见了。

5.把`g`元素移动到`svg`左上角

```js
const rect = this.mindMap.draw.rbox()
const elRect = this.mindMap.el.getBoundingClientRect()
this.mindMap.draw.translate(-rect.x + elRect.left, -rect.y + elRect.top)
```

![image-20210721185453825](./assets/image-20210721185453825.png)

这样`g`元素刚好可以完整显示：

![image-20210721190700979](./assets/image-20210721190700979.png)

6.导出`svg`元素即可

完整代码如下：

```js
class Export {
    // 获取要导出的svg数据
    getSvgData() {
        const svg = this.mindMap.svg
        const draw = this.mindMap.draw
        // 保存原始信息
        const origWidth = svg.width()
        const origHeight = svg.height()
        const origTransform = draw.transform()
        const elRect = this.mindMap.el.getBoundingClientRect()
        // 去除放大缩小的变换效果
        draw.scale(1 / origTransform.scaleX, 1 / origTransform.scaleY)
        // 获取变换后的位置尺寸信息，其实是getBoundingClientRect方法的包装方法
        const rect = draw.rbox()
        // 将svg设置为实际内容的宽高
        svg.size(rect.wdith, rect.height)
        // 把g移动到和svg刚好重合
        draw.translate(-rect.x + elRect.left, -rect.y + elRect.top)
        // 克隆一下svg节点
        const clone = svg.clone()
        // 恢复原先的大小和变换信息
        svg.size(origWidth, origHeight)
        draw.transform(origTransform)
        return {
            node: clone,// 节点对象
            str: clone.svg()// html字符串
        }
    }
    
    // 导出svg文件
    svg() {
        let { str } = this.getSvgData()
        // 转换成blob数据
        let blob = new Blob([str], {
            type: 'image/svg+xml'
        });
        let file = URL.createObjectURL(blob)
        // 触发下载
        let a = document.createElement('a')
        a.href = file
        a.download = fileName
        a.click()
    }
}
```



## 导出png

导出`png`是在导出`svg`的基础上进行的，我们上一步已经获取到了要导出的`svg`的内容，所以这一步就是要想办法把`svg`转成`png`，首先我们知道`img`标签是可以直接显示`svg`文件的，所以我们可以通过`img`标签来打开`svg`，然后再把图片绘制到`canvas`上，最后导出为`png`格式即可。

不过这之前还有另外一个问题要解决，就是如果`svg`里面存在`image`图片元素的话，且图片是通过外链方式引用的（无论同源还是非同源），绘制到`canvas`上一律都显示不出来，一般有两个解决方法：一是把所有图片元素从`svg`里面剔除，然后手动绘制到`canvas`上；二是把图片`url`都转换成`data:url`格式，简单起见，笔者选择的是第二种方法：

```js
class Export {
    async getSvgData() {
		// ...
        // 把图片的url转换成data:url类型，否则导出会丢失图片
        let imageList = clone.find('image')
        let task = imageList.map(async (item) => {
            let imgUlr = item.attr('href') || item.attr('xlink:href')
            let imgData = await imgToDataUrl(imgUlr)
            item.attr('href', imgData)
        })
        await Promise.all(task)
        return {
            node: clone,
            str: clone.svg()
        }
    }
}
```

`imgToDataUrl`方法也是通过`canvas`来把图片转换成`data:url`。这样转换后的`svg`内容再绘制到`canvas`上就能正常显示了：

```js
class Export {
    // 导出png
    async png() {
        let { str } = await this.getSvgData()
        // 转换成blob数据
        let blob = new Blob([str], {
            type: 'image/svg+xml'
        })
        // 转换成对象URL
        let svgUrl = URL.createObjectURL(blob)
        // 绘制到canvas上，转换成png
        let imgDataUrl = await this.svgToPng(svgUrl)
        // 下载
        let a = document.createElement('a')
        a.href = file
        a.download = fileName
        a.click()
    }
    
    // svg转png
    svgToPng(svgSrc) {
        return new Promise((resolve, reject) => {
            const img = new Image()
            // 跨域图片需要添加这个属性，否则画布被污染了无法导出图片
            img.setAttribute('crossOrigin', 'anonymous')
            img.onload = async () => {
                try {
                    let canvas = document.createElement('canvas')
                    canvas.width = img.width + this.exportPadding * 2
                    canvas.height = img.height + this.exportPadding * 2
                    let ctx = canvas.getContext('2d')
                    // 图片绘制到canvas里
                    ctx.drawImage(img, 0, 0, img.width, img.height, this.exportPadding, this.exportPadding, img.width, img.height)
                    resolve(canvas.toDataURL())
                } catch (error) {
                    reject(error)
                }
            }
            img.onerror = (e) => {
                reject(e)
            }
            img.src = svgSrc
        })
    }
}
```

到这里导出就完成了，不过上面省略了一个细节，就是背景的绘制，实际上我们之前背景相关样式都是设置到容器`el`元素上的，那么导出前就需要设置到`svg`或者`canvas`上，否则导出就没有背景了，相关代码可以阅读[Export.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/Export.js)。



# 总结

本文介绍了实现一个`web`思维导图涉及到的一些技术点，需要说明的是，因笔者水平限制，代码的实现上较粗糙，而且性能上存在一定问题，所以仅供参考，另外因为是笔者第一次使用`svg`，所以难免会有`svg`方面的错误，或者有更好的实现，欢迎留言探讨。

其他还有一些常见功能，比如小窗口导航、自由主题等，有兴趣的可以自行实现，下一篇主要会介绍一下另外三种变种结构的实现，敬请期待。

