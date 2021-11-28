# web思维导图的简单实现

## 特性

- [x] 支持逻辑结构图、思维导图、组织结构图、目录组织图四种结构

- [x] 内置多种主题，允许高度自定义样式

- [x] 支持快捷键

- [x] 节点内容支持图片、图标、超链接、备注、标签

- [x] 支持前进后退

- [x] 支持拖动、缩放

- [x] 支持右键多选

- [x] 支持节点拖拽

## 目录介绍

1.simple-mind-map

思维导图工具库。

2.web

使用`simple-mind-map`工具库，基于vue2.x、ElementUI搭建的在线思维导图。

3.dist

打包后的资源文件夹。

4.docs

文档等。

## 开发

本地开发

```bash
git clone https://github.com/wanglin2/mind-map.git
cd simple-mind-map
npm i
npm link
cd ..
cd web
npm i
npm link simple-mind-map
npm run serve
```

打包

```bash
cd web
npm run build
```
会自动把`index.html`移动到根目录。

## 相关文章

[Web思维导图实现的技术点分析](https://juejin.cn/post/6987711560521089061)

# 安装

```bash
npm i simple-mind-map
```

# API

## 实例化

```html
<div id="mindMapContainer"></div>
```

```js
import MindMap from "simple-mind-map";

const mindMap = new MindMap({
  el: document.getElementById('mindMapContainer'),
  data: data
});
```



### 实例化选项：

| 字段名称             | 类型    | 默认值           | 描述                                                         | 是否必填 |
| -------------------- | ------- | ---------------- | ------------------------------------------------------------ | -------- |
| el                   | Element |                  | 容器元素，必须为DOM元素                                      | 是       |
| data                 | Object  | {}               | 思维导图数据，可参考：[https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/example/exampleData.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/example/exampleData.js) |          |
| layout               | String  | logicalStructure | 布局类型，可选列表：logicalStructure（逻辑结构图）、mindMap（思维导图）、catalogOrganization（目录组织图）、organizationStructure（组织结构图） |          |
| theme                | String  | default          | 主题，可选列表：default（默认）、classic（脑图经典）、minions（小黄人）、pinkGrape（粉红葡萄）、mint（薄荷）、gold（金色vip）、vitalityOrange（活力橙）、greenLeaf（绿叶）、dark2（暗色2）、skyGreen（天清绿）、classic2（脑图经典2）、classic3（脑图经典3）、classicGreen（经典绿）、classicBlue（经典蓝）、blueSky（天空蓝）、brainImpairedPink（脑残粉）、dark（暗色）、earthYellow（泥土黄）、freshGreen（清新绿）、freshRed（清新红）、romanticPurple（浪漫紫） |          |
| themeConfig          | Object  | {}               | 主题配置，会和所选择的主题进行合并，可用字段可参考：[https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/themes/default.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/themes/default.js) |          |
| scaleRatio           | Number  | 0.1              | 放大缩小的增量比例                                           |          |
| maxTag               | Number  | 5                | 节点里最多显示的标签数量，多余的会被丢弃                     |          |
| exportPadding        | Number  | 20               | 导出图片时的内边距                                           |          |
| imgTextMargin        | Number  | 5                | 节点里图片和文字的间距                                       |          |
| textContentMargin    | Number  | 2                | 节点里各种文字信息的间距，如图标和文字的间距                 |          |
| selectTranslateStep  | Number  | 3                | 多选节点时鼠标移动到边缘时的画布移动偏移量                   |          |
| selectTranslateLimit | Number  | 20               | 多选节点时鼠标移动距边缘多少距离时开始偏移                   |          |



### 实例方法：

#### render()

触发整体渲染，会进行节点复用，性能较`reRender`会更好一点，如果只是节点位置变化了可以调用该方法进行渲染



#### reRender()

整体重新渲染，会清空画布，节点也会重新创建，性能不好，慎重使用



#### resize()

容器尺寸变化后，需要调用该方法进行适应



#### on(event, fn)

监听事件，事件列表：

| 事件名称                    | 描述                                       | 回调参数                                                     |
| --------------------------- | ------------------------------------------ | ------------------------------------------------------------ |
| data_change                 | 渲染树数据变化，可以监听该方法获取最新数据 | data（当前渲染树数据）                                       |
| view_data_change（v0.1.1+） | 视图变化数据，比如拖动或缩放时会触发       | data（当前视图状态数据）                                     |
| back_forward                | 前进或回退                                 | activeHistoryIndex（当前在历史数据数组里的索引）、length（当前历史数据数组的长度） |
| draw_click                  | *画布的单击事件*                           | e（事件对象）                                                |
| svg_mousedown               | svg画布的鼠标按下事件                      | e（事件对象）                                                |
| mousedown                   | el元素的鼠标按下事件                       | e（事件对象）、this（Event事件类实例）                       |
| mousemove                   | el元素的鼠标移动事件                       | e（事件对象）、this（Event事件类实例）                       |
| drag                        | 如果是按住左键拖动的话会触发拖动事件       | e（事件对象）、this（Event事件类实例）                       |
| mouseup                     | el元素的鼠标松开事件                       | e（事件对象）、this（Event事件类实例）                       |
| mousewheel                  | 鼠标滚动事件                               | e（事件对象）、dir（向上up还是向下down滚动）、this（Event事件类实例） |
| contextmenu                 | svg画布的鼠标右键菜单事件                  | e（事件对象）                                                |
| node_click                  | 节点的单击事件                             | this（节点实例）、e（事件对象）                              |
| node_mousedown              | 节点的鼠标按下事件                         | this（节点实例）、e（事件对象）                              |
| node_mouseup                | 节点的鼠标松开事件                         | this（节点实例）、e（事件对象）                              |
| node_dblclick               | 节点的双击事件                             | this（节点实例）、e（事件对象）                              |
| node_contextmenu            | 节点的右键菜单事件                         | e（事件对象）、this（节点实例）                              |
| before_node_active          | 节点激活前事件                             | this（节点实例）、activeNodeList（当前激活的所有节点列表）   |
| node_active                 | 节点激活事件                               | this（节点实例）、activeNodeList（当前激活的所有节点列表）   |
| expand_btn_click            | 节点展开或收缩事件                         | this（节点实例）                                             |
| before_show_text_edit       | 节点文本编辑框即将打开事件                 |                                                              |
| hide_text_edit              | 节点文本编辑框关闭事件                     | textEditNode（文本编辑框DOM节点）、activeNodeList（当前激活的所有节点列表） |
| scale                       | 放大缩小事件                               | scale（缩放比例）                                            |



#### emit(event, ...args)

触发事件，可以是上面表格里的事件，也可以是自定义事件



#### off(event, fn)

解绑事件



#### setTheme(theme)

切换主题，可选主题见上面的选项表格



#### getTheme()

获取当前主题



#### setThemeConfig(config)

设置主题配置，`config`同上面选项表格里的选项`themeConfig`

#### getCustomThemeConfig()

获取自定义主题配置

#### getThemeConfig(prop)

获取某个主题配置属性值



#### getLayout()

获取当前的布局结构



#### setLayout(layout)

设置布局结构，可选值见上面选项表格的`layout`字段



#### execCommand(name, ...args)

执行命令，每执行一个命令就会在历史堆栈里添加一条记录用于回退或前进。所有命令如下：

| 命令名称                 | 描述                                                         | 参数                                                         |
| ------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| SELECT_ALL               | 全选                                                         |                                                              |
| BACK                     | 回退指定的步数                                               | step（要回退的步数，默认为1）                                |
| FORWARD                  | 前进指定的步数                                               | step（要前进的步数，默认为1）                                |
| INSERT_NODE              | 插入同级节点，操作节点为当前激活的节点，如果有多个激活节点，只会对第一个有效 |                                                              |
| INSERT_CHILD_NODE        | 插入子节点，操作节点为当前激活的节点                         |                                                              |
| UP_NODE                  | 上移节点，操作节点为当前激活的节点，如果有多个激活节点，只会对第一个有效，对根节点或在列表里的第一个节点使用无效 |                                                              |
| DOWN_NODE                | 操作节点为当前激活的节点，如果有多个激活节点，只会对第一个有效，对根节点或在列表里的最后一个节点使用无效 |                                                              |
| REMOVE_NODE              | 删除节点，操作节点为当前激活的节点                           |                                                              |
| PASTE_NODE               | 粘贴节点到节点，操作节点为当前激活的节点                     | data（要粘贴的节点数据，一般通过`renderer.copyNode()`方法和`renderer.cutNode()`方法获取） |
| CUT_NODE                 | 剪切节点，操作节点为当前激活的节点，如果有多个激活节点，只会对第一个有效，对根节点使用无效 | callback(回调函数，剪切的节点数据会通过调用该函数并通过参数返回) |
| SET_NODE_STYLE           | 修改节点样式                                                 | node（要设置样式的节点）、prop（样式属性）、value（样式属性值）、isActive（布尔值，是否设置的是激活状态的样式） |
| SET_NODE_ACTIVE          | 设置节点是否激活                                             | node（要设置的节点）、active（布尔值，是否激活）             |
| CLEAR_ACTIVE_NODE        | 清除当前已激活节点的激活状态，操作节点为当前激活的节点       |                                                              |
| SET_NODE_EXPAND          | 设置节点是否展开                                             | node（要设置的节点）、expand（布尔值，是否展开）             |
| EXPAND_ALL               | 展开所有节点                                                 |                                                              |
| UNEXPAND_ALL             | 收起所有节点                                                 |                                                              |
| SET_NODE_DATA            | 更新节点数据，即更新节点数据对象里`data`对象的数据           | node（要设置的节点）、data（对象，要更新的数据，如`{expand: true}`） |
| SET_NODE_TEXT            | 设置节点文本                                                 | node（要设置的节点）、text（要设置的文本字符串，换行可以使用`\n`） |
| SET_NODE_IMAGE           | 设置节点图片                                                 | node（要设置的节点）、imgData（对象，图片信息，结构为：`{url, title, width, height}`，图片的宽高必须要传） |
| SET_NODE_ICON            | 设置节点图标                                                 | node（要设置的节点）、icons（数组，预定义的图片名称组成的数组，可用图标可在[https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/svg/icons.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/svg/icons.js)文件里的`nodeIconList`列表里获取到，图标名称为`type_name`，如`['priority_1']`） |
| SET_NODE_HYPERLINK       | 设置节点超链接                                               | node（要设置的节点）、link（超链接地址）、title（超链接名称，可选） |
| SET_NODE_NOTE            | 设置节点备注                                                 | node（要设置的节点）、note（备注文字）                       |
| SET_NODE_TAG             | 设置节点标签                                                 | node（要设置的节点）、tag（字符串数组，内置颜色信息可在[https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/utils/constant.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/utils/constant.js)里获取到） |
| INSERT_AFTER（v0.1.5+）  | 将节点移动到另一个节点的后面                                 | node（要移动的节点）、 exist（目标节点）                     |
| INSERT_BEFORE（v0.1.5+） | 将节点移动到另一个节点的前面                                 | node（要移动的节点）、 exist（目标节点）                     |
| MOVE_NODE_TO（v0.1.5+）  | 移动一个节点作为另一个节点的子节点                           | node（要移动的节点）、 toNode（目标节点）                    |


#### setData(data)

动态设置思维导图数据

`data`：思维导图结构数据


#### export(type, isDownload)

导出

`type`：要导出的类型，可选值：png、svg

`isDownload`：是否需要直接触发下载，布尔值，默认为`false`

#### toPos(x, y)

v0.1.5+

将浏览器可视窗口的坐标转换成相对于画布的坐标

## render实例

`render`实例负载整个渲染过程，可通过`mindMap.renderer`获取到



### 属性

#### activeNodeList

获取当前激活的节点列表



#### root

获取节点树的根节点



### 方法

#### addActiveNode(node)

添加节点到激活列表里



#### removeActiveNode(node)

在激活列表里移除某个节点



#### findActiveNodeIndex(node)

检索某个节点在激活列表里的索引



#### getNodeIndex(node)

获取节点在同级里的位置索引



#### removeOneNode(node)

删除某个指定节点



#### copyNode()

复制节点，操作节点为当前激活节点，有多个激活节点只会操作第一个节点



#### setNodeDataRender(node, data)

设置节点数据，即`data`字段的数据，并会根据节点大小是否变化来判断是否需要重新渲染该节点，`data`为对象，如：`{text: '我是新文本'}`



#### moveNodeTo(node, toNode)

v0.1.5+

移动一个节点作为另一个节点的子节点



#### insertBefore(node, exist)

v0.1.5+

将节点移动到另一个节点的前面



#### insertAfter(node, exist)

v0.1.5+

将节点移动到另一个节点的后面



## keyCommand实例

`keyCommand`实例负责快捷键的添加及触发，内置了一些快捷键，也可以自行添加。可通过`mindMap.keyCommand`获取到该实例。



### 方法

#### keyCommand(key, fn)

添加快捷键

`key`：快捷键按键，按键值可以通过[https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/utils/keyMap.js](https://github.com/wanglin2/mind-map/blob/main/simple-mind-map/src/utils/keyMap.js)查看。示例：

```js
// 单个按键
mindMap.keyCommand..addShortcut('Enter', () => {})
// 或
mindMap.keyCommand.addShortcut('Del|Backspace', () => {})
// 组合键
mindMap.keyCommand.addShortcut('Control+Enter', () => {})
```

`fn`：要执行的方法



## command实例

`command`实例负责命令的添加及执行，内置了很多命令，也可以自行添加，命令指需要在历史堆栈数据里添加副本的操作。可通过`mindMap.command`获取到该实例



### 方法

#### add(name, fn)

添加命令。

`name`：命令名称

`fn`：命令要执行的方法



#### remove(name, fn)

移除命令。

`name`：要移除的命令名称

`fn`：要移除的方法，不传的话移除该命令所有的方法



#### getCopyData()

获取渲染树数据副本

#### clearHistory()

清空历史堆栈数据


## view实例

`view`实例负责视图操作，可通过`mindMap.view`获取到该实例



### 方法

#### translateX(step)

`x`方向进行平移，`step`：要平移的像素



#### translateY(step)

`y`方向进行平移，`step`：要平移的像素



#### reset()

恢复到默认的变换



#### narrow()

缩小



#### enlarge()

放大



#### getTransformData()

v0.1.1+

获取当前变换数据，可用于回显



#### setTransformData(data)

v0.1.1+

动态设置变换数据，可以通过getTransformData方法获取变换数据



## doExport实例

`doExport`实例负责导出，可通过`mindMap.doExport`获取到该实例



### 方法

#### png()

导出为`png`，异步方法，返回图片数据，`data:url`数据，可以自行下载或显示



#### svg()

导出为`svg`，异步方法，返回`svg`数据，`data:url`数据，可以自行下载或显示



#### getSvgData()

获取`svg`数据，异步方法，返回一个对象：

```js
{
  node// svg对象
  str// svg字符串
}
```



## select实例

`select`实例负责鼠标右键多选节点操作，可通过`mindMap.select`获取到该实例



### 方法

#### toPos(x, y)

转换鼠标位置为相对于容器`el`的位置



## batchExecution实例

`batchExecution`用来批量异步的执行一些操作，如果某个操作同时多次调用，那么只会在下一个事件循环里执行一次。可以通过`mindMap.batchExecution`获取到该实例



### 方法

#### push(name, fn)

添加任务。

`name`：任务名称

`fn`：任务



## node实例

每个节点都会实例化一个`node`实例



### 属性

#### nodeData

该节点对应的真实数据



#### uid

该节点唯一的标识



#### isRoot

是否是根节点



#### layerIndex

节点层级



#### width

节点的宽



#### height

节点的高



#### left

节点的`left`位置



#### top

节点的`top`位置



#### parent

节点的父节点



#### children

节点的子节点列表



#### group

节点是内容容器，`svg`对象



#### isDrag

v0.1.5+

节点是否正在拖拽中



### 方法

#### addChildren(node)

添加子节点



#### getSize()

计算节点的宽高，返回一个布尔值，代表是否宽高发生了变化



#### renderNode()

渲染节点到画布，会移除旧的内容节点，创建新的



#### render()

递归渲染该节点及其所有子节点，第一次调用会创建节点内容，后续只会更新节点位置，想要重新渲染内容，可以先把`initRender`属性设为`true`



#### remove()

递归删除该节点及其所有子节点



#### renderLine()

重新渲染该节点到其子节点之间的连线



#### removeLine()

移除该节点到其子节点之间的连线



#### renderExpandBtn()

渲染展开收缩按钮的内容



#### removeExpandBtn()

移除展开收缩按钮



#### getStyle(prop, root, isActive)

获取某个最终应用到该节点的样式值

`prop`：要获取的样式属性

`root`：是否是根节点，默认`false`

`isActive`：获取的是否是激活状态的样式值，默认`false`



#### setStyle(prop, value, isActive)

修改节点的某个样式，`SET_NODE_STYLE`命令的快捷方法



#### getData(key)

获取该节点真实数据`nodeData`的`data`对象里的指定值，`key`不传返回这个`data`对象



#### setData(data)

设置节点数据，`SET_NODE_DATA`命令的快捷方法



#### setText(text)

设置节点文本，`SET_NODE_TEXT`命令的快捷方法



#### setImage(imgData)

设置节点图片，`SET_NODE_IMAGE`命令的快捷方法



#### setIcon(icons)

设置节点图标，`SET_NODE_ICON`命令的快捷方法



#### setHyperlink(link, title)

设置节点超链接，`SET_NODE_HYPERLINK`命令的快捷方法



#### setNote(note)

设置节点备注，`SET_NODE_NOTE`命令的快捷方法



#### setTag(tag)

设置节点标签，`SET_NODE_TAG`的快捷方法



#### hide()

v0.1.5+

隐藏节点及其下级节点



#### show()

v0.1.5+

显示节点及其下级节点



#### isParent(node)

v0.1.5+

检测当前节点是否是某个节点的祖先节点



#### isBrother(node)

v0.1.5+

检测当前节点是否是某个节点的兄弟节点



## 内置工具方法

引用：

```js
import {walk, ...} from 'simple-mind-map/src/utils'
```



### 方法

#### walk(root, parent, beforeCallback, afterCallback, isRoot, layerIndex = 0, index = 0)

深度优先遍历树

`root`：要遍历的树的根节点

`parent`：父节点

`beforeCallback`：前序遍历回调函数，回调参数为：root, parent, isRoot, layerIndex, index

`afterCallback`：后序遍历回调函数，回调参数为：root, parent, isRoot, layerIndex, index

`isRoot`：是否是根节点

`layerIndex`：节点层级

`index`：节点在同级节点里的索引

示例：

```js
walk(tree, null, () => {}, () => {}, false, 0, 0)
```



#### bfsWalk(root, callback)

广度优先遍历树



#### resizeImgSize(width, height, maxWidth, maxHeight)

缩放图片的尺寸

`width`：图片原本的宽

`height`：图片原本的高

`maxWidth`：要缩放到的宽

`maxHeight`：要缩放到的高

`maxWidth`和`maxHeight`可以同时都传，也可以只传一个



#### resizeImg(imgUrl, maxWidth, maxHeight)

缩放图片，内部先加载图片，然后调用`resizeImgSize`方法，返回一个`promise`



#### simpleDeepClone(data)

极简的深拷贝方法，只能针对全是基本数据的对象，否则会报错



#### copyRenderTree(tree, root)

复制渲染树数据，示例：

```js
copyRenderTree({}, this.mindMap.renderer.renderTree)
```



#### copyNodeTree(tree, root)

复制节点树数据，主要是剔除其中的引用`node`实例的`_node`，然后复制`data`对象的数据，示例：

```js
copyNodeTree({}, node)
```



#### imgToDataUrl(src)

图片转成dataURL



#### downloadFile(file, fileName)

下载文件



#### throttle(fn, time = 300, ctx)

节流函数



#### asyncRun(taskList, callback = () => {})

异步执行任务队列，多个任务是同步执行的，没有先后顺序



# 特别说明

本项目较粗糙，未进行完整测试，功能尚不是很完善，性能也存在一些问题，仅用于学习和参考，请勿用于实际项目。

项目内置的主题和图标来自于：

[百度脑图](https://naotu.baidu.com/)

[知犀思维导图](https://www.zhixi.com/)

