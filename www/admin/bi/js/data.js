/* 此处存放全局公共数据 */
var Width = 1200
var Height = 900
var hasmove = true //判断是否正在移动中
var wm = ''
var fd = null
// 设置appId和token, 后面需换成接口获取
// 获取url值
var appId = '' //appId
appId = getParams('appId', window.location.href)

// // 离开页面保存功能代码(移动至此处)
// if (window.location.host.indexOf('127.0.0') === -1) {
//   // 测试 && 开发：sycdev.com
//   // 正式： shengyc.com
//   // document.domain = 'sycdev.com' || '';
// }
window.addEventListener('message', goToBi, false)

function goToBi(event) {
  if (event.data && event.data.save && event.data.source === 'SLMSAVE') {
    save()
  }
}
// 测试环境appId APPDJLB_e39O token bff914c01c484e25b403b0bdbb7dfc22
appId = appId ? appId : 'TEST123_o582'
// 颜色选择器的个数
// var colordiv
var token = ''
token = getParams('token', window.location.href)
token = token ? token : 'cca20c8c-507b-43e0-8ca6-3571ae779698'
localStorage.setItem("token", token)

var tenantId = ''
tenantId = getParams('tenantId', window.location.href)
tenantId = tenantId ? tenantId : 'TEST123_o582'
localStorage.setItem("tenantId", tenantId)

var leg = 0 // 元素名称后面添加的标识, 此数值会不断累加,防止名称相同
// 仪表板设置部分数据
var permissionData = {} //权限数据    
var permissionList = [] //仪表板权限数据
var checkDeptArr = []
var jobArr = []
var peopleArr = []
var isresdata //判断是否请求有默认值
var cloneDepart = []
var cloneJob = []
var clonePeople = []
var keyCode = '' //当前key值
var zindex = 0; //层级
var revoke = [  // 1
]; //撤销的数据
var delIndex = null // 删除元素下标
var firstback = false;
var firsright = false;
var handtrue = false;
var viewpass = [1]
var backtmp = [] //中间存放数组
var localdata = {
  ControlList: [],
  Data: {

  }
} //局部渲染数据
var menu = document.querySelector("#rightMenu"); //获取自定义的右键菜单
// 储存copy数据
var copydata = []
// 储存cut数据
var cutdata = [];
// 储存恢复的数组
var recovery = [];  //1
var commonList = {
  Name: 'MainCanvas',
  Position: '',
  BackSetting: 'color',
  BackColor: '#f6f6f6',
  BackImg: './imgs/defuleUpload.png',
  Permision: 'public',
  Description: '',
  PermissionList: [],
  TreeNode: {},
  WrapWidth: '100%',
  GuideWidth: '0',
  GuideHeight: '0',
  IsShowCustoms: false,
  CustomWidth: '0',
  CustomHeight: '0',
}
// 线型
// var lineList = ['dotted','dashed','solid','double','groove','ridge','inset','outset']

// 此处放提示框方法
var appTips = {
  successMsg: function (message, style) {
    var css = {
      skin: 'layui-msg-success-style',
      offset: '20px'
    }
    css = $.extend(css, style);
    layer.msg(message, css);
  },
  warningMsg:function (message, style) {
    var css = {
      skin: 'layui-msg-warning-style',
      offset: '20px'
    }
    css = $.extend(css, style);
    layer.msg(message, css);
    
  },
  tipsMsg:function (message, style){
    var css = {
      skin: 'layui-msg-tips-style',
      offset: '20px'
    }
    css = $.extend(css, style);
    layer.msg(message, css);
  },
  errorMsg:function (message, style) {
    var css = {
      skin: 'layui-msg-error-style',
      offset: '20px'
    }
    css = $.extend(css, style);
    layer.msg(message, css);
  },
  alert: function () {
    layer.alert()
  },
}

// 按钮id
var buttonid = ''
// 判断是否按过ctrl
var type = ''
// 选中数据
var selectdata = []
// 组件按钮组
var btns = [{
    icon: 'icontupian',
    title: '静态图片',
    ComName: '静态图片', //组件名称
    ControlType: 'staticimage',
    Width: 100,
    Height: 30,
    Rotate: 0,
    TabEvent: 'style',
    Img: './imgs/动态图片.png',
    BorderColor: '#000',
    BackColor: '#fff',
    BorderWidth: 0,
    Style: 'solid',
    BorderRadius: 3,
    BoxShadow: '',
    Opacity: 100,
    ZIndex: 10,
  },
  {
    icon: 'icondongtaitupian',
    title: '动态图片',
    ComName: '动态图片', //组件名称
    ControlType: 'image',
    TabEvent: 'style',
    Width: 100,
    Height: 30,
    Rotate: 0,
    Img: './imgs/动态图片.png',
    BorderColor: '#000',
    BackColor: '#fff',
    BorderWidth: 0,
    Style: 'solid',
    BorderRadius: 3,
    BoxShadow: '',
    Opacity: 100,
    ZIndex: 10,
  },
  {
    icon: 'iconshuzhixianshi',
    title: '数值显示',
    ComName: '数值显示', //组件名称
    Text: '数值显示',
    TabEvent: 'style',
    ControlType: 'datatextblock',
    Width: 100,
    Height: 30,
    Rotate: 0,
    FontFamily: '微软雅黑',
    FontWeight: 'normal',
    FontSize: 12,
    TextDecoration: 'none',
    Color: '#000',
    BackColor: '#fff',
    BorderWidth: 1,
    BoxShadow: '',
    Style: 'solid',
    BorderColor: '#000',
    Opacity: 100,
    ZIndex: 10,
    BorderRadius: 3,
    TextAlign: 'left',
    JustifyContent: 'center',
    AlignItems: 'flex-start',
    // 日期时间组件数据
    type: 1,
    twoobject: { //动态时间数据格式
      twotime: new Date(),
      parentselect: '当前时间',
      childrenarr: [{
        status: false,
        num: 0,
        select: '前'
      }, {
        status: false,
        num: 0,
        select: '前'
      }, {
        status: false,
        num: 0,
        select: '前'
      }, {
        status: false,
        num: 0,
        select: '前'
      }, {
        status: false,
        num: 0,
        select: '前'
      }, {
        status: false,
        num: 0,
        select: '前'
      }, {
        status: false,
        num: 0,
        select: '前'
      }, {
        status: false,
        num: 0,
        select: '前'
      }]
    },
  },
  {
    icon: 'iconzhixian',
    title: '直线',
    TabEvent: 'style',
    ComName: '直线', //组件名称
    ControlType: 'line',
    Width: 100,
    Height: 2,
    BorderWidth: 1,
    Style: 'solid',
    BorderColor: '#000',
    Opacity: 100,
    ZIndex: 10,
    BackColor: '#fff',
    Rotate: 0,
  },
  {
    icon: 'iconkuangti1',
    title: '矩形',
    TabEvent: 'style',
    ComName: '矩形', //组件名称
    ControlType: 'solidrectangle',
    BackColor: '#fff',
    BorderWidth: 1,
    Rotate: 0,
    Style: 'solid',
    BorderColor: '#000',
    BoxShadow: '',
    Width: 100,
    Height: 30,
    Opacity: 100,
    ZIndex: 10,
    BorderRadius: 3,
    Rotate: 0,
    BackSetting: 'color',
    BackImg: '',
    FontFamily: '微软雅黑',
    FontWeight: 'normal',
    FontSize: 12,
  },
  {
    icon: 'iconbiaoti',
    title: '标题',
    TabEvent: 'style',
    ComName: '标题', //组件名称
    ControlType: 'titleCom',
    BackColor: '#fff',
    BorderWidth: 1,
    Rotate: 0,
    Style: 'dashed',
    BorderColor: '#000',
    BoxShadow: '',
    Width: 1630,
    Height: 85,
    Opacity: 100,
    ZIndex: 10,
    BorderRadius: 3,
    Rotate: 0,
    BackSetting: 'img',
    BackImg: '../imgs/tools/标题一.png',
    FontFamily: '微软雅黑',
    FontWeight: 'normal',
    FontSize: 12,
  },
  {
    icon: 'iconkuangti_yuan',
    title: '圆形',
    TabEvent: 'style',
    ComName: '圆形', //组件名称
    ControlType: 'solidellipse',
    BackColor: '#fff',
    BorderWidth: 1,
    Style: 'solid',
    BorderColor: '#000',
    Width: 30,
    Height: 30,
    Opacity: 100,
    ZIndex: 10,
    BorderRadius: 3,
    Rotate: 0,
    BackSetting: 'color',
    BackImg: ''
  },
  {
    icon: 'iconzhuangtaidian',
    title: '圆形状态灯',
    TabEvent: 'style',
    ComName: '圆形状态灯', //组件名称
    ControlType: 'ellipselamp',
    Width: 30,
    Height: 30,
    Rotate: 0,
    FontFamily: '微软雅黑',
    FontWeight: 'normal',
    FontSize: 12,
    TextDecoration: 'none',
    Color: '#000',
    BackColor: '#eee',
    BorderWidth: 1,
    BoxShadow: '',
    Style: 'solid',
    BorderColor: '#000',
    Opacity: 100,
    ZIndex: 10,
    BorderRadius: 3,
  },
  {
    icon: 'iconzhuangtaidian_juxing',
    title: '矩形状态灯',
    ComName: '矩形状态灯',
    TabEvent: 'style',
    ControlType: 'commonlamp',
    Width: 50,
    Height: 30,
    Rotate: 0,
    FontFamily: '微软雅黑',
    FontWeight: 'normal',
    FontSize: 12,
    TextDecoration: 'none',
    Color: '#000',
    BackColor: '#eee',
    BorderWidth: 1,
    BoxShadow: '',
    Style: 'solid',
    BorderColor: '#000',
    Opacity: 100,
    ZIndex: 10,
    BorderRadius: 3,
  },
  {
    icon: 'iconwenben',
    title: '静态文本',
    TabEvent: 'style',
    ControlType: 'statictextblock',
    Width: 100,
    Height: 30,
    FontFamily: '微软雅黑',
    FontWeight: 'normal',
    FontSize: 12,
    TextDecoration: 'none',
    Color: '#000',
    Opacity: 100,
    ComName: '静态文本', //组件名称
    BackColor: '#fff',
    BorderColor: '#000',
    BorderWidth: 1,
    Style: 'solid',
    BorderRadius: 3,
    BoxShadow: '',
    Rotate: 0,
    TextAlign: 'center',
    JustifyContent: 'center',
    AlignItems: 'flex-start',
    Text: '静态文本',
    ZIndex: 10,
  },
  {
    icon: 'icondongtaiwenben',
    title: '动态文本',
    TabEvent: 'style',
    ControlType: 'dynamictext',
    Width: 100,
    Height: 30,
    FontFamily: '微软雅黑',
    FontWeight: 'normal',
    FontSize: 12,
    TextDecoration: 'none',
    Color: '#000',
    Opacity: 100,
    ComName: '动态文本', //组件名称
    BackColor: '#fff',
    BorderColor: '#000',
    BorderWidth: 1,
    Style: 'solid',
    BorderRadius: 3,
    BoxShadow: '',
    Rotate: 0,
    TextAlign: 'center',
    JustifyContent: 'center',
    AlignItems: 'flex-start',
    Text: '动态文本',
    ZIndex: 10,
  },
  {
    Rotate: 0,
    icon: 'iconkongzhianniu',
    title: '控制按钮',
    TabEvent: 'style',
    ComName: '控制按钮',
    ControlType: 'cornerbutton',
    Width: 100,
    Height: 30,
    FontFamily: '微软雅黑',
    FontWeight: 'normal',
    Color: '#000',
    BackColor: '#ddd',
    FontSize: 12,
    TextAlign: 'center',
    BorderWidth: 1,
    Style: 'solid',
    BorderColor: '#000',
    BorderRadius: 10,
    Text: '控制按钮',
    Opacity: 100,
    ZIndex: 10,
  },
  {
    icon: 'iconduxiekuang',
    title: '读写框',
    TabEvent: 'style',
    ControlType: 'rwtextbox',
    Width: 100,
    Height: 30,
    FontFamily: '微软雅黑',
    FontWeight: 'normal',
    Color: '#000',
    BackColor: '#fff',
    FontSize: 12,
    TextAlign: 'center',
    BorderWidth: 1,
    Style: 'solid',
    BorderColor: '#ABADB3',
    BorderRadius: 0,
    Text: '读写框',
    Opacity: 100,
    ZIndex: 10,
    Rotate: 0,
    ComName: '读写框',
    // 日期时间组件数据
    type: 1,
    twoobject: { //动态时间数据格式
      twotime: new Date(),
      parentselect: '当前时间',
      childrenarr: [{
        status: false,
        num: 0,
        select: '前'
      }, {
        status: false,
        num: 0,
        select: '前'
      }, {
        status: false,
        num: 0,
        select: '前'
      }, {
        status: false,
        num: 0,
        select: '前'
      }, {
        status: false,
        num: 0,
        select: '前'
      }, {
        status: false,
        num: 0,
        select: '前'
      }, {
        status: false,
        num: 0,
        select: '前'
      }, {
        status: false,
        num: 0,
        select: '前'
      }]
    },
  },
  {
    icon: './imgs/icon_link.png',
    title: '跳转链接',
    TabEvent: 'style',
    ControlType: 'jumplink',
    Width: 100,
    Height: 30,
    ComName: '跳转链接',
    FontFamily: '微软雅黑',
    FontWeight: 'normal',
    FontSize: 12,
    BackColor: '#fff',
    Color: '#000',
    Text: '跳转链接',
    Opacity: 100,
    ZIndex: 10,
    jumpType: 'address', //跳转类型
    linkAddress: '', //链接地址
    panel: '', //仪表板
    panelId: '', //仪表板Id
    openAddress: '_self', //打开地址
    Rotate: 0,

  },
  {
    icon: 'iconwenbenchaxun',
    title: '文本查询',
    TabEvent: 'style',
    ControlType: 'textsearch',
    Width: 230,
    Height: 30,
    FontFamily: '微软雅黑',
    FontWeight: 'normal',
    FontSize: 12,
    BorderWidth: 1,
    Value: '等于',
    Placeholder: '请输入关键词',
    Style: 'solid',
    BorderColor: '#ABADB3',
    BackColor: '#fff',
    TextAlign: 'left',
    Color: '#000',
    BorderRadius: 0,
    Text: '',
    Opacity: 100,
    ZIndex: 10,
    Rotate: 0,
    datasetValue: 'eq',
    ComName: '文本查询',
    QueryFind: true,
  },
  {
    icon: 'iconriqishijian',
    title: '日期时间',
    TabEvent: 'style',
    ControlType: 'associatedatetimepicker',
    Width: 260,
    Height: 30,
    FontFamily: '微软雅黑',
    Rotate: 0,
    ComName: '时间日期',
    FontWeight: 'normal',
    FontSize: 12,
    BorderWidth: 1,
    Style: 'solid',
    BorderColor: '#ABADB3',
    BackColor: '#fff',
    TextAlign: 'left',
    Color: '#000',
    BorderRadius: 0,
    Text: '日期时间',
    // 日期时间组件数据
    type: 1,
    twoobject: { //动态时间数据格式
      twotime: new Date(),
      parentselect: '当前时间',
      childrenarr: [{
        status: false,
        num: 0,
        select: '前'
      }, {
        status: false,
        num: 0,
        select: '前'
      }, {
        status: false,
        num: 0,
        select: '前'
      }, {
        status: false,
        num: 0,
        select: '前'
      }, {
        status: false,
        num: 0,
        select: '前'
      }, {
        status: false,
        num: 0,
        select: '前'
      }, {
        status: false,
        num: 0,
        select: '前'
      }, {
        status: false,
        num: 0,
        select: '前'
      }]
    },
    // Date: formatDateTime(new Date()),
    Date: '',
    Opacity: 100,
    ZIndex: 10,
    QueryFind: true,
  },
  {
    icon: 'iconshuzhichaxun',
    title: '数值查询',
    Rotate: 0,
    ComName: '数值查询',
    TabEvent: 'style',
    ControlType: 'datasearch',
    Width: 330,
    Height: 30,
    FontFamily: '微软雅黑',
    FontWeight: 'normal',
    FontSize: 12,
    BorderWidth: 1,
    Placeholder: '请输入数值',
    Value: '等于',
    Num1: '',
    Num2: '',
    Style: 'solid',
    BorderColor: '#ABADB3',
    BackColor: '#fff',
    TextAlign: 'left',
    Color: '#000',
    BorderRadius: 0,
    Text: '数值查询',
    datasetValue: 'eq',
    Opacity: 100,
    ZIndex: 10,
    QueryFind: true, //开启即查询
  },
  {
    icon: 'iconxialachaxun',
    title: '下拉查询',
    ControlType: 'dropsearch',
    TabEvent: 'style',
    Rotate: 0,
    ComName: '下拉查询',
    Width: 260,
    Height: 30,
    FontFamily: '微软雅黑',
    FontWeight: 'normal',
    FontSize: 12,
    BorderWidth: 1,
    Placeholder: '请输入关键词',
    Value: '不限',
    CheckedValue: '',
    Style: 'solid',
    BorderColor: '#ABADB3',
    BackColor: '#fff',
    TextAlign: 'left',
    Color: '#000',
    datasetValue: 'no_limit',
    BorderRadius: 0,
    Disabled: true,
    Text: '',
    Opacity: 100,
    ZIndex: 10,
    QueryFind: true, //开启即查询

  },
  {
    icon: 'iconchaxunanniu',
    title: '查询按钮',
    TabEvent: 'style',
    Rotate: 0,
    ComName: '查询按钮',
    ControlType: 'searchbutton',
    Width: 100,
    Height: 30,
    FontFamily: '微软雅黑',
    FontWeight: 'normal',
    Color: '#000',
    BackColor: '#ddd',
    FontSize: 12,
    TextAlign: 'center',
    BorderWidth: 1,
    Style: 'solid',
    BorderColor: '#000',
    BorderRadius: 10,
    Text: '查询按钮',
    Opacity: 100,
    ZIndex: 10,
    graphList: ['0', '1'], //筛选的图表
  },
  {
    icon: 'iconzhongzhianniu',
    title: '重置按钮',
    TabEvent: 'style',
    Rotate: 0,
    ComName: '重置按钮',
    ControlType: 'resetbutton',
    Width: 100,
    Height: 30,
    FontFamily: '微软雅黑',
    FontWeight: 'normal',
    Color: '#000',
    BackColor: '#ddd',
    FontSize: 12,
    TextAlign: 'center',
    BorderWidth: 1,
    Style: 'solid',
    BorderColor: '#000',
    BorderRadius: 10,
    Text: '重置按钮',
    Opacity: 100,
    ZIndex: 10,
  },
  {
    icon: './imgs/icon_Pie.png',
    title: '饼图',
    ControlType: 'piechart',
    TabEvent: 'style',
    Width: 500,
    Height: 350,
    RotateAngle: 0,
    Opacity: 100,
    ZIndex: 10,
    Rotate: 0,
    ComName: '饼图',
  },
  {
    icon: './imgs/icon_dash.png',
    title: '仪表盘',
    TabEvent: 'style',
    ControlType: 'dashboardchart',
    Width: 350,
    Height: 350,
    RotateAngle: 0,
    Opacity: 100,
    ZIndex: 0,
    Rotate: 0,
    ComName: '仪表盘',
  },
  {
    icon: './imgs/icon_bar.png',
    title: '柱形图',
    TabEvent: 'style',
    ControlType: 'barchart',
    Width: 350,
    Height: 350,
    RotateAngle: 0,
    Opacity: 100,
    ZIndex: 0,
    Rotate: 0,
    ComName: '柱形图',
  },
  {
    icon: './imgs/icon_graph.png',
    title: '折线图',
    TabEvent: 'style',
    ControlType: 'linechart',
    Width: 350,
    Height: 350,
    RotateAngle: 0,
    Opacity: 100,
    ZIndex: 0,
    Rotate: 0,
    ComName: '折线图',
  }
]
var Controls = {
  ControlList: []
}
var cloneControls = {}
var tableData = []
var pageData = {}
pageData.pageIndex = 1
pageData.pageSize = 10
// 
async function getTableData(index, text) {
  let wantindex = index
  // for(let i=0;i<Controls.ControlList.length;i++){
  //     if (Controls.ControlList[i].PropertyList.ZIndex == wantindex) {
  //     wantindex = i
  //     break;
  //   }
  // }
  let nameOrCode = $('#datatextblockDevice').val()
  let deviceName = $('#datatextblockDevice').data('dataname')
  if (nameOrCode.trim() === '') {
    Controls.ControlList[wantindex].SearchData.device = ''
  }

  let postData = {
    appId,
    current: pageData.pageIndex,
    size: pageData.pageSize,
    deviceId: Controls.ControlList[wantindex].SearchData.device,
    nameOrCode,
    sourceId: Controls.ControlList[wantindex].SearchData.origin,
    variableName: Controls.ControlList[wantindex].SearchData.variteName,
    description: Controls.ControlList[wantindex].SearchData.describe
  }
  await request.get(`/bi/${appId}/variables`, {
    params: postData
  }).then(res => {
    let tbody = document.getElementById('popup-tbody')
    let html = ``
    if (res.data.data) {
      tableData = res.data.data.records ? res.data.data.records : []
    } else {
      tableData = []
      layer.msg(res.data.msg)
    }
    // tableData = res.data.data.records?res.data.data.records:[]
    tableData.forEach(item => {
      item.varTypeName = item.varType == 0 ? '瞬时' : item.varType == 1 ? '累计' : item.varType == 2 ? '计算瞬时' : item.varType == 3 ? '计算累计' : item.varType
      item.fromName = item.from == 1 ? '基础采集点' : item.from == 2 ? '配置变量/dc公式' : item.from == 6 ? '请选择变量来源' : item.from
    })

    let pagerInput = document.getElementById('pager-input')
    pagerInput = 1
    pageData = {
      totalCount: res.data.data.total, // 总条数
      totalPage: res.data.data.pages, // 总页数
      pageIndex: res.data.data.current, // 当前页
      pageSize: res.data.data.size, // 每页显示条数
    }

    let types = ['datatextblock','rwtextbox', 'dashboardchart']
    let singleTypes = ['image', 'dynamictext', 'ellipselamp', 'commonlamp'] // 组件 数据部分 表格值icon

    tableData.forEach((item, i) => {
      //<td rowspan="1" onmouseover="showTableTips(event, '${item.varTypeName}')" id="td5-${i}"  colspan="1"><div>${item.varTypeName}</div></td>
      html += `<tr onclick="choiceRow(event, ${i}, ${index})">
        ${types.includes(Controls.ControlList[wantindex].ControlType) || (singleTypes.includes(Controls.ControlList[wantindex].ControlType) && text === 'text')
          ? `<td rowspan="1" colspan="1" class="table-checkbox" ><div><input type="radio" name="pop-check" ${check.id == item.id ? 'checked' : ''}  ></div></td>`
          : `<td rowspan="1" colspan="1" class="table-checkbox" ><div><input type="checkbox" name="pop-check" ${check.id == item.id ? 'checked' : ''}  ></div></td>` }
        
        <td rowspan="1" onmouseover="showTableTips(event, '${item.fromName}')" id="td0-${i}"  colspan="1"><div>${item.fromName}</div></td>
        <td rowspan="1" onmouseover="showTableTips(event, '${item.name}')" id="td1-${i}"  colspan="1"><div>${item.name}</div></td>
        <td rowspan="1" onmouseover="showTableTips(event, '${item.desc}')" id="td2-${i}"  colspan="1"><div>${item.desc}</div></td>
        <td rowspan="1" onmouseover="showTableTips(event, '${item.unit}')" id="td3-${i}"  colspan="1"><div>${item.unit}</div></td>
        <td rowspan="1" onmouseover="showTableTips(event, '${item.type}')" id="td4-${i}"  colspan="1"><div>${item.type}</div></td>
        <td rowspan="1" onmouseover="showTableTips(event, '${item.customerName}')" id="td6-${i}"  colspan="1"><div>${item.customerName}</div></td>
        <td rowspan="1" onmouseover="showTableTips(event, '${item.equipmentName}')" id="td7-${i}"  colspan="1"><div>${item.equipmentName}</div></td>
        <td rowspan="1" onmouseover="showTableTips(event, '${item.equipmentCode}')" id="td8-${i}"  colspan="1"><div>${item.equipmentCode}</div></td>
      </tr>`
    })
    tbody.setAttribute('data-index', index)
    tbody.innerHTML = html

    renderPagination(wantindex, 'popup-pagination')
    renderLis()
    // 设置默认勾选
    // var list = document.getElementsByName("pop-check");
    // list.forEach((item, i) => {
    //   if (tableData[i].id == check.id) {
    //     item.checked = true
    //   }
    // })
  })
}

Controls.Data = {
  "PieChartItemList": [],
  "DashBoardChartItemList": [],
  "LineChartItemList": [],
  "BarChartItemList": []
}

function showTableTips (e, tip) {
  tip = tip || ""
  let target = e.currentTarget;
  let textTarget = target.firstElementChild
  let containerWidth = target.clientWidth;
  let textWidth = textTarget.scrollWidth;
  if (containerWidth < textWidth) {
    let tips = layer.tips(tip, '#' + e.currentTarget.id, {
      tips: 1,
      time: 0,
      area: 'auto',
      maxWidth: 500,
      skin: 'table-tips',
    });
  
    e.currentTarget.onmouseleave = function () {
      layer.close(tips);
    }
  }
}


// 获取url参数
function getParams(key, str) {
  var result = {};
  var paramStr = ''
  let params
  if (str) {
    paramStr = str.split('?')[1]
    if (paramStr) {
      params = paramStr.split('&');
      params.forEach(item => {
        result[item.split('=')[0]] = unescape(item.split('=')[1])
      })
    }
  } else {
    paramStr = encodeURI(window.document.location.search);
    if (paramStr) {
      paramStr = paramStr.substring(1);
      params = paramStr.split('&');
      for (var p = 0; p < params.length; p++) {
        result[params[p].split('=')[0]] = unescape(params[p].split('=')[1]);
      }
    }
  }
  return result[key];
}

// 日期时间转换函数
function formatDateTime(date) {

  var y = date.getFullYear();

  var m = date.getMonth() + 1;

  m = m < 10 ? ('0' + m) : m;

  var d = date.getDate();

  d = d < 10 ? ('0' + d) : d;

  var h = date.getHours();

  h = h < 10 ? ('0' + h) : h;

  var minute = date.getMinutes();

  minute = minute < 10 ? ('0' + minute) : minute;

  var second = date.getSeconds();

  second = second < 10 ? ('0' + second) : second;

  // return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute

};