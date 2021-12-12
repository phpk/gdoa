## MAC_UI

MAC_UI基于WIN10UI打造的mac风格的后台UI,让你轻松搭建一个眼前一亮的后台界面

 | [点击链接加入群【MAC-UI官方交流群】](https://jq.qq.com/?_wv=1027&k=4Er0u8i)

## 版本

v1.1.2.5

> 该版本为小更新，针对插件开发作了一些准备，添加了一些语法糖（具体改动请参考更新日志）。
> 更新方式：基本无须修改html文件，覆盖css和win10.js文件。
> 关于html文件的修改，只是添加一行代码。在#win10>.desktop div下，添加一个div `<div id="win10-desktop-scene"></div>`到末尾。
> 对于实在不想修改html的用户，我们在js中添加了自动修正的代码，所以不修改也会有正常的效果。但是这种修正代码将会在未来版本被取消，只作为临时使用。

## 预览

 ![1] http://mac.apecloud.cn
 
 

## 特性

* macUI界面
* 桌面图标自动排序
* 任务栏结合iframe子窗口，与windows一致的窗口管理体验
* 开始菜单+消息提示中心，满足后台UI的设计需求
* 极少的API，大部分功能可用html元素定义完成
* 响应式兼容，在手机浏览器也有不错的观感
* 目前只保证对主流现代浏览器的兼容性支持
* 支持 class 配置高斯模糊 blur background_blur

## 前置组件

* layer(v3.0.3)
* animated.css
* jquery(v2.2.4)
* font-awesome

## 快速入门

#### 如何自定义桌面图标？

```html
<div id="win10-shortcuts">
     <div class="shortcut" onclick="//do something...">
           <img src="图片地址" class="icon" />
           <div class="title">图标底部文字</div>
     </div>
     <div class="shortcut" onclick="//do something...">
           <div class="icon">自定义任意html内容</div>
           <div class="title">图标底部文字</div>
     </div>
</div>
```
> 图标应设置为图片或自定义html填充div

#### 如何自定义开始菜单列表?

```html
<div class="list win10-menu-hidden animated animated-slideOutLeft">
     <div class="item">一级菜单</div>
     <div class="item">一级菜单</div>
     <div class="sub-item">二级菜单</div>
     <div class="sub-item">二级菜单</div>
     <div class="sub-item">二级菜单</div>
     <div class="item">一级菜单</div>
     <div class="item">一级菜单</div>
</div>
```
>一级菜单添加类item，二级添加sub-item。不需要用一级菜单“包裹”二级菜单，将自动识别二级菜单的归属，请注意排序。


## API
* 调用：Win10-ui的api应当在其初始化之后被调用
```html
<script>
    Win10.onReady(function () {
        //Win10-ui初始化完成后将执行此处代码
    });
</script>
```
> 所有方法都需要加``Win10.``前缀。

* setBgUrl(bgs) 设置背景图片 ``Win10.setBgUrl({main:'宽屏壁纸url',mobile:'竖屏壁纸url',})``
* openUrl(url,title,areaAndOffset) ** 打开一个子窗口,参数列表：url,标题，[尺寸，区域]\(同layer的area和offset的设置格式，也可以传入'max'强制最大化，例如``[['30%','30%'],['50px','50px']]``\)
* onReady(handle) win10-ui初始化完毕后的回调
* menuOpen() 开始菜单打开
* menuClose() 开始菜单关闭
* menuToggle() 开始菜单打开/关闭
* commandCenterOpen() 信息中心打开
* commandCenterClose() 信息中心关闭
* commandCenterToggle() 信息中心打开/关闭
* renderShortcuts() 重新渲染桌面图标(可用与动态添加或删除了桌面图标之后)
* renderMenuBlocks() 重新渲染磁贴(可用与动态添加或删除了磁贴之后)
* buildList() 重新预处理菜单列表(可用与动态添加或删除了菜单项之后)
* newMsg(title, content,handle_click) 发送一个消息提醒，handle_click是点击回调
* isSmallScreen() 如果屏幕宽度小于768px返回true，否则返回false
* setAnimated(animated_classes,animated_liveness) 用css的类来设置磁贴动画。animated_liveness设置动画的触发概率(0~1)。animated_classes中存放css class数组，如``['class1','class2','class3-1 class3-2']``。磁贴将随机选择一个动画来播放（最多3秒）。
* exit() 关闭整个页面（有确认提示）
* aboutUs() 关于信息
* lang(cn,en) 简单的双语支持，如果是中文环境返回cn，否则返回en
* getLayeroByIndex(index) 根据openUrl返回的索引，返回窗体的jq对象
* hideWins() 最小化所有窗口
* setContextMenu(jq_dom, menu) 右键菜单配置（详见进阶篇）
* getDesktopScene() 返回桌面舞台的jq对象（用于高级用户diy壁纸）

## 进阶篇

>推荐仔细查看demo的代码，很多用法都有所提及

#### 设计思路

* Win10-UI应当作为你网站模块的主入口，而具体功能页面适合用子窗口的形式打开。子窗口是以iframe实现的，减少了js、css冲突，保证了独立性。同时父子页之间也可以通过Win10_child.js的API进行沟通
* 桌面图标适用于最常用的操作，菜单适用于构建所有操作的清单（这里的操作不限于打开子窗口）
* 小磁贴视觉冲击力强，除了可以做出醒目的按钮，也可以用作信息展板，甚至于在磁贴的方块空间内构建复杂的应用（如音乐播放器）

#### icon辅助类

本着极简的设计风格，所有图标相关的辅助类都设置为'icon'
```html
<div class="shortcut">
     <img class="icon" src="./img/icon/win10.png"/>
     <div class="title">Win10-UI官网</div>
</div>
```
>在桌面图标中，设置img.icon声明该图片是一个图标

```html
<div class="shortcut">
     <i class="fa fa-camera-retro icon"></i>
     <div class="title">Win10-UI官网</div>
</div>
```
>在桌面图标中，用.icon声明一个字体图标（以font awesome为例）

```html
Win10.openUrl("http://win10ui.yuri2.cn","<img class=\"icon\" src=\"./img/icon/win10.png\"/>Win10-UI官网");
Win10.openUrl("http://win10ui.yuri2.cn","<i class=\"fa fa-camera-retro icon\"></i>字体图标");
```
>没错！你也可以在openUrl函数的title参数中插入图片图标或者字体图标！

```html
<div class="item"><i class=" icon fa fa-wrench fa-fw"></i><span>API测试</span></div>
<div class="item"><img class="icon" src="./img/icon/doc.png"><span>文档图片图标</span></div>
```
>在开始菜单项中，使用icon一样可以定义图片图标和字体图标

#### 小磁贴设计

* 小磁贴的尺寸固定位44px/格，方便开发者设计自己想要的样式
* 灵活使用setAnimated函数
* 自定义一些hover的动画能起到很好的效果哦
* vue等前端神器的支持

#### 小磁贴辅助类

你可以放置两个content，并赋予detail和cover的辅助类，将得到炫酷的封面切换主体的动画效果。

~~~html
<div loc="1,1" size="6,3" class="block">
   <div class="content red detail" >
       我是主体
   </div>
   <div class="content red cover">
       我是封面
   </div>
</div>
~~~

#### 父子页沟通

* 要使用子页工具集，请先引入win10.child.js
* 自由的使用Win10_child对象吧，目前包含close、newMsg、openUrl函数；也可以使用Win10_parent对象，将指向父页的Win10对象。
* 父页打开子窗口的函数openUrl会返回索引index，使用getLayeroByIndex(index)获得子窗口对象,然后就可以方便的控制子窗口的行为了。

#### 颜色预定义

各种颜色 具体效果见 https://www.kancloud.cn/qq85569256/xzui/350010
* black-green{background:#009688}
* green{background:#5FB878}
* black{background:#393D49}
* blue{background:#1E9FFF}
* orange{background:#F7B824}
* red{background:#FF5722}
* dark{background:#2F4056}
* blur 高斯模糊 前置模糊
* backgroud_blur 背景高斯模糊

#### 右键菜单配置

Win10.setContextMenu(jq_dom, menu) 可接管系统默认的右键菜单。
其中jq_dom是jq对象或选择器字符串,menu是菜单配置项(true表示禁用默认菜单,null表示恢复默认菜单,[数组]表示自定义菜单)
~~~js
//典型用法(桌面菜单)
Win10.setContextMenu('#win10>.desktop',[
   '菜单标题', //单字符串，不带回调
   ['进入全屏',function () {Win10.enableFullScreen()}], //菜单项+点击回调
   ['退出全屏',function () {Win10.disableFullScreen()}],
   '|', //分隔符
   ['关于',function () {Win10.aboutUs()}],
]);

//设置menu为true会起到禁用系统默认菜单的作用
Win10.setContextMenu('#win10',true);
~~~
> 点击回调函数可以声明一个参数e,将传入点击事件的对象。特别的，e.data是触发右键菜单的对象。

#### 桌面舞台

为了让广大开发者能更自由的定义自己的桌面，Win10-UI自v1.1.2.3版本起加入桌面舞台。
桌面舞台是一个`id`为`win10-desktop-scene`的div，位于`#win10>.desktop`下。桌面舞台预定义了css，使其浮动于桌面图标的下方。
借助此特性，你甚至可以发挥想象力，制作出动态壁纸。
> 使用`getDesktopScene`函数可以快捷获取桌面舞台的jq对象。
> v1.1.2.3之前的版本，如果想要临时体验桌面舞台的支持特性，可以去官方群下载补丁`win10_desktop_scene_support.js`。

#### 子窗口事件自动绑定

所有#win10下的元素加入类win10-open-window即可自动绑定openUrl函数，无须用onclick手动绑定
> v1.1.2.3之前的版本，如果想要临时体验桌面子窗口事件自动绑定支持特性，可以去官方群下载插件`win10_bind_open_windows.js`。

 * 标签属性说明
 * data-title:窗口标题
 * data-url:窗口url地址
 * data-icon-image:图片图标的url
 * data-icon-font:字体图标名 如star
 * data-icon-bg:图标背景色 black-green,green,black,blue,orange,red,dark,purple
 * data-area-offset:窗口 [区域,偏移]
 *
 * 特别的，如果子节点有icon和title的css类，可以自动识别为图标和标题，无须设置data-title和data-icon-image(font)

~~~html
<div class="shortcut win10-open-window"
        data-url="http://www.baidu.com"
        data-title="我是百度"
        data-icon-image="https://www.baidu.com/img/bd_logo1.png"
        data-icon-font="star"
        data-icon-bg="red"
        data-area-offset="[['300px', '380px'],'rt']">
        <i class="icon fa fa-fw fa-user-circle blue" ></i>
        <div class="title">百度</div>
</div>
~~~
> 这是所有可选项都用上的完整写法。

~~~html
<div class="shortcut win10-open-window" data-url="www.baidu.com" >
        <i class="icon fa fa-fw fa-user-circle blue" ></i>
        <div class="title">百度</div>
</div>
~~~
> 这是推荐的简洁写法，可以满足大部分场景的需要。


## 联系作者

联系邮箱：1099438829@qq.com
