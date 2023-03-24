## layui表单设计器
<div align="center">
<img src="https://www.swiftadmin.net/static/images/sademo/110400_6a5e130d_904542.png" width="100" height="100"/>
</div>
<p align="center"><strong>价值源自分享</strong></p>

<p align="center">
   <a href="https://meystack.github.io/layui-form-design/" rel="nofollow" style="color:red;" >表单在线演示</a>
	<a href="https://www.swiftadmin.net" target="_blank">SAPHP官方平台</a> 
</p>

> 简介

因维护自己的swiftadmin开源项目时需要一款基于layui的表单设计器，发现已有的开源项目并不太适合自己使用,<br/>
所以只能重复造这个轮子了，主要用于在一键CURD过程中快速设计表单，自定义生成表单布局，支持远程<b>JSON</b>加载，并且代码简洁易懂！

注：本表单设计器完全开源，如若功能不符合您的需求，完全可以自行二次开发或提交PR~~~

<a href="https://gitee.com/meystack/layui-form-design/"><img src="https://img.shields.io/badge/License-Apache-blue.svg" alt="swiftadmin"></a>
<a href="https://gitee.com/meystack/layui-form-design/"><img src="https://img.shields.io/badge/Layui-2.7RC5-red.svg" alt="layui"></a>
<a href="https://gitee.com/meystack/layui-form-design/"><img src="https://img.shields.io/badge/Sortable-1.14-brightgreen.svg" alt="thinkphp"></a>
<a href="https://gitee.com/meystack/layui-form-design/stargazers"><img src="https://gitee.com/meystack/layui-form-design/badge/star.svg?theme=gvp" alt="star"></a>
<a href="https://gitee.com/meystack/layui-form-design/members"><img src="https://gitee.com/meystack/layui-form-design/badge/fork.svg?theme=gvp" alt="fork"></a>
<a href="https://qm.qq.com/cgi-bin/qm/qr?k=Idivrh-log25t0ryx19nWeqUk8oFrI-X&jump_from=webapi"><img src="https://img.shields.io/badge/QQ群-68221484-blue.svg" alt="一群"></a>


> 软件架构

基于layui2.7RC5 Sortable拖拽组件开发的一款简洁易用，功能强大的表单设计器，其中除了包含layui自身常用的属性之外；<br/>
还包括级联选择器（城市）、富文本编辑器、TAGS标签(原创)等其他可用于生产环境下的优秀组件。熟悉layui即可轻松上手，开箱即用！<br/>
<font size="3" color="red">增加了font-awesome图标库，开源不易，请右上角点击Star支持，感谢你的支持！！！</font>

> 使用说明

本项目使用Sortable拖拽组件，并结合layui自身模块化编写。组件直接写HTML代码即可<br/>
尽量在项目中HTML的代码部分跟JavaScript分开，不然代码会看起来特别混乱，维护比较麻烦！


### 配置信息
---

``` JS
  //默认配置
  Class.prototype.config = {
    id: null,
    data: [],         // 当前元素集合
    eval: '',         // 当前HTML数据 
    count: 0,         // 当前组件总数
    state: null,      // 当前活动实例
    index: [],        // 组件分类索引
    itemIndex: {},    // 子组件元素索引
    master: undefined // 主界面拖拽实例
  };
```
1、在HTML设计模板中增加你所需要的组件，并定义data-tag的值
``` html
    <div class="component">
        <div class="head">表单组件</div>
        <div class="component-group" id="sort_1">
            <ol data-tag="input"><div class="icon"><i class="layui-icon layui-icon-layer"></i></div><div class="name">单行输入</div></ol>
            <ol data-tag="textarea"><div class="icon"><i class="layui-icon layui-icon-align-left"></i></div><div class="name">多行输入</div></ol>
            <ol data-tag="radio"><div class="icon"><i class="layui-icon layui-icon-radio"></i></div><div class="name">单选框</div></ol>
            <ol data-tag="checkbox"><div class="icon"><i class="layui-icon layui-icon-table"></i></div><div class="name">多选框</div></ol>
            <ol data-tag="select"><div class="icon"><i class="layui-icon layui-icon-print"></i></div><div class="name">下拉框</div></ol>
            <ol data-tag="date"><div class="icon"><i class="layui-icon layui-icon-time"></i></div><div class="name">日期组件</div></ol>
            <!-- // 需要的组件可以自己添加 -->
            <!-- // 并且按照已有流程进行代码render的编写即可 -->
        </div>
    </div>
```
2、在正常加载layuiJS以及CSS后，需要自行在尾部将非layui模块规范的JS组件加载到页面中<br/>
``` js
<script src="/layui.js?v=v"></script>
<!-- // 全局加载第三方JS -->
<script src="/cascadata.js"></script>
<script src="/tinymce/tinymce.min.js"></script>
<!-- // 加载font-awesome图标 -->
<link href="/css/font-awesome.css" rel="stylesheet" type="text/css" />
<script src="/Sortable/Sortable.js?v=1.14"></script>
```

3、在formDesignJS中编写你所需要增加的组件的render实现以及其他需要二次开发的属性<br/>
然后在模板首页使用如下调用方式即可完成组件的渲染工作！

``` js
  layui.use(['form','jquery','flow','formDesign'],function() {
    var form = layui.form;
    var $ = layui.jquery;
    
    var formDesign = layui.formDesign;
    // 加载即可
    formDesign.render({
        elem: '#formBuilder'
        ,eval: '#formdesign'
    });
  })
```


### 图片预览
---

<table>
    <tr>
        <td><img src="https://www.swiftadmin.net/static/form/1.png"/></td>
        <td><img src="https://www.swiftadmin.net/static/form/2.png"/></td>
    </tr>
    <tr>
        <td><img src="https://www.swiftadmin.net/static/form/3.png"/></td>
        <td><img src="https://www.swiftadmin.net/static/form/33.png"/></td>
    </tr>
    <tr>
        <td><img src="https://www.swiftadmin.net/static/form/4.png"/></td>
        <td><img src="https://www.swiftadmin.net/static/form/5.png"/></td>
    </tr>	
</table>

> 参与贡献<br/>
> 欢迎Fork 本仓库有好的需求可以提交PR

### 使用协议

1. 本软件支持个人/企业免费商用，二次开发，但必须遵循Apache2开源协议，保留代码版权（logo、素材、代码注释）
2. 使用本框架不得用于开发违反国家有关政策的相关软件和应用，否则要付法律责任！
3. 本软件依法享有国家著作权保护，故使用本软件者不得恶意篡改本源码，包括但不限于（植入木马病毒，编写违法应用）进行恶意传播。
4. 不得对本软件进行恶意篡改或倒卖，不得对本软件进行二次包装后声称为自己的产品等，请尊重国家著作权法！
5. 用户承诺接受并遵守本协议的约定。如果用户不同意本协议的约定，应立即停止使用。
   
<font color="red">当您使用这款软件的时候，默认视为您同意上述条款</font>

