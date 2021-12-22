var searchdata = '' //查询控件的数据
var varstarttime = ''; //查询开始时间
var varendtime = ''; //查询结束时间
var rwtextboxindex = null //读写框选中的index
var rwtextboxdiv = null //读写框选中的div
var warpList = []
var dataZoomVal = 60
// 获取url值
var appId = '' //appId
appId = getParams('appId', window.location.href)
// 测试 appId：APPDJLB_e39O token bff914c01c484e25b403b0bdbb7dfc22
appId = appId ? appId : 'TEST123_o582'

var token = ''
token = getParams('token', window.location.href)
token = token ? token : 'cca20c8c-507b-43e0-8ca6-3571ae779698'
localStorage.setItem("token", token)
var zoomValue = 100

var tenantId = ''
tenantId = getParams('tenantId', window.location.href)
tenantId = tenantId ? tenantId : 'TEST123_o582'
localStorage.setItem("tenantId", tenantId)

// var panelId = ""  // panelId写死，后面需修改为动态获取
// // 获取url值
// panelId = getParams('panelId', window.location.href)
// panelId = panelId ? panelId : '98050e59574c41868c3b17725ac168b0'
var index = 0
var currentBoardNode = {} //树选中的节点
var Controls = {}
var Common = {}
var time = 5000

// 添加定时器
var timer1 = null
var timer2 = null
var timer3 = null
var timer4 = null
var timer5 = null
var timer6 = null
var timer7 = null
var timer8 = null
var timer9 = null
var timer10 = null
var timer11 = null
var app = {
  msg: function (message, style) {
    var css = {
      time: 1000
    }

    css = $.extend(css, style);
    layer.msg(message, css);
  },
}
var appTips = {
  successMsg: function (message, style) {
    var css = {
      skin: 'layui-msg-success-style',
      offset: '20px'
    }
    css = $.extend(css, style);
    layer.msg(message, css);
  },
  warningMsg: function (message, style) {
    var css = {
      skin: 'layui-msg-warning-style',
      offset: '20px'
    }
    css = $.extend(css, style);
    layer.msg(message, css);

  },
  tipsMsg: function (message, style) {
    var css = {
      skin: 'layui-msg-tips-style',
      offset: '20px'
    }
    css = $.extend(css, style);
    layer.msg(message, css);
  },
  errorMsg: function (message, style) {
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

// var timeList = [] //定时器数组
// tree
var boardData = []
var boardSetting = {
  view: {

    showLine: false,
    fontCss: {
      color: "#333333"
    },
    // showIcon:true,
    // showIcon:showIconForTree
  },
  data: {
    // key:{
    //   icon:'iconSkin',

    // },
    simpleData: {
      enable: true,
      idKey: "id",
      pIdKey: "parentId",

    }
  },
  callback: {
    onClick: nodeCLick,
    beforeExpand: nodeCLick1,
    beforeCollapse: nodeCLick2
  },
  // view:{

  // }

}

function showIconForTree(treeId, treeNode) {
  // if(treeNode.nodeType == 'group'){
  //   treeNode.iconSkin = './iconTool/icon_monitor_nor.png'

  // } 
  // if(treeNode.nodeType == 'panel'){
  //   treeNode.iconSkin = './iconTool/icon_monitor_nor.png';
  // }
  // return './iconTool/icon_file.png'

}
// 查询变量
function searchvarible() {

  let postData = {
    endTime: new Date(varendtime).getTime(),
    startTime: new Date(varstarttime).getTime(),
    variableSearchList: [{
      deviceId: searchdata.CheckData.equipmentId ? searchdata.CheckData.equipmentId : searchdata.CheckData.equipmentid,
      variableId: searchdata.CheckData.id,
      variableName: searchdata.CheckData.name
    }]
  }
  request.post(`/bi/${Controls.User.appId}/variables/all/data`, postData).then(res => {

    let option = {
      title: {
        text: '描述_' + searchdata.CheckData.name,
        left: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '5%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        data: []
      },
      yAxis: {
        axisLine: {
          show: false
        },
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        }
      },
      series: [{
        data: [],
        type: 'line'
      }]
    };
    $("#popup-tbody").empty()
    let html = ''

    if (res.data.data.length !== 0) {
      option.xAxis.data = res.data.data.x;
      option.series[0].data = res.data.data[searchdata.CheckData.equipmentId ? searchdata.CheckData.equipmentId : searchdata.CheckData.equipmentid + ',' + searchdata.CheckData.name]
      for (let i = 0; i < res.data.data.x.length; i++) {
        html += ` <tr>
        <td style="padding-left:10px" class="table-checkbox">${i+1}</td>
        <td  style="text-align:center">${res.data.data.x[i]}</td>
        <td  style="text-align:center">${res.data.data[searchdata.CheckData.equipmentId ? searchdata.CheckData.equipmentId : searchdata.CheckData.equipmentid+','+searchdata.CheckData.name][i]}</td>
      </tr>`
      }

    }
    $("#popup-tbody").append(html)
    Chart1 = echarts.init(document.getElementById(`data-chart`));
    Chart1.clear()
    Chart1.resize()
    Chart1.setOption(option, true)
  })
}

function nodeCLick1(treeId, treeNode) {
  nodeCLick('', treeId, treeNode)
  // return true

}

function nodeCLick2(treeId, treeNode) {
  var zTree = $.fn.zTree.getZTreeObj("dashboardtree")
  zTree.removeChildNodes(treeNode)
  zTree.addNodes(treeNode, []);
}

function nodeCLick(e, treeId, treeNode, type) {
  // if (currentBoardNode.name === treeNode.name && (type && type !== 'reset')) {
  //   return
  // }
  warpList.push(treeNode.id)
  currentBoardNode = treeNode
  // if(treeNode.nodeType )
  if (treeNode.nodeType == 'group') {
    zoomValue = 100
    $('#zoom-input').val(`${zoomValue}%`)
    if (!$(".bi-input").val()) {
      let postData = {
        appId,
        name: $(".bi-input").val(),
        nodeId: treeNode.id
      }

      request.get(`/bi/${appId}/panel-tree/children`, {
        params: postData
      }).then(res => {
        if (res.data.code !== 0) {
          appTips.errorMsg(res.data.msg)
          return
        }
        if (res.data.data) {
          var zTree = $.fn.zTree.getZTreeObj("dashboardtree")

          zTree.removeChildNodes(treeNode)

          res.data.data.forEach(item => {
            if (item.nodeType != 'panel') {
              item.icon = "./styles/iconTool/icon_file.png"
              item.children = []
            } else {
              item.icon = "./styles/iconTool/icon_monitor_nor.png"
            }
            zTree.addNodes(treeNode, item);
          })


        }

      })

    } else {
      let postData = {
        appId,
        name: $(".bi-input").val(),
      }
      request.get(`/bi/${appId}/panel-tree/search`, {
        params: postData
      }).then(res => {
        if (res.data.data) {
          boardData = res.data.data
          boardData.forEach((item, index) => {
            if (item.nodeType != 'panel') {
              item.icon = "./styles/iconTool/icon_file.png"

            } else {
              item.icon = "./styles/iconTool/icon_monitor_nor.png"
            }

          })
          $.fn.zTree.init($("#dashboardtree"), boardSetting, boardData);
          var zTree = $.fn.zTree.getZTreeObj("dashboardtree");
          zTree.expandAll(true)
        }
      })
    }

  } else {
    $('#right-wrap').html('')
    $('#right-wrap').css('background-color', '#ffff')
    $('#right-wrap').css('background-image', '')
    // 清除定时器
    clearInterval(timer1)
    timer1 = null
    clearInterval(timer2)
    timer2 = null
    clearInterval(timer3)
    timer3 = null
    clearInterval(timer4)
    timer4 = null
    clearInterval(timer5)
    timer5 = null
    clearInterval(timer6)
    timer6 = null
    clearInterval(timer7)
    timer7 = null
    clearInterval(timer8)
    timer8 = null
    clearInterval(timer9)
    timer9 = null
    clearInterval(timer10)
    timer10 = null
    clearInterval(timer11)
    timer11 = null
    let postData = {
      appId,
      panelId: treeNode.id,
      // nodeId: treeNode.id
    }
    $("#right-wrap").empty()
    request.get(`/bi/${appId}/panel-tree/children-panel`, {
      params: postData
    }).then(res => {
      if (res.data.code !== 0) {
        appTips.errorMsg(res.data.msg)
        return
      }
      // console.log(treeNode.id)
      // console.log(warpList)
      if (treeNode.id !== warpList[warpList.length - 1]) {
        if (warpList.length > 2) {
          warpList.splice(0, 1)
        }
        return
      }
      if (res.data.data.configDetails) {
        Controls = JSON.parse(res.data.data.configDetails)
      } else {
        $("#right-wrap").empty()
        appTips.tipsMsg('无数据')
        return
      }

      Controls = JSON.parse(res.data.data.configDetails)

      if (Controls.ControlList.lenght !== 0) {
        Controls.ControlList.forEach(item => {
          item.PropertyList.TrueWidth = item.PropertyList.Width
          item.PropertyList.TrueHeight = item.PropertyList.Height
        })
      }

      Common = {
        Name: Controls.Name,
        Position: Controls.Position,
        BackSetting: Controls.BackSetting,
        BackColor: Controls.BackColor,
        BackImg: Controls.BackImg,
        Permision: Controls.Permision,
        Description: Controls.Description,
        WrapWidth: Controls.WrapWidth ? Controls.WrapWidth : '100%'
      }
      zoomValue = parseInt(Common.WrapWidth)
      $('#zoom-input').val(`${zoomValue}%`)
      initCanvas()
      // 注释Zoom
      if (parseInt(Common.WrapWidth) >= 100) {
        $('#right-wrap').css({
          // 'width': zoomValue + '%',
          // 'hiehgt': zoomValue + '%'
          'transform-origin': '0% 0%',
          'transform': `scale(${parseInt(Common.WrapWidth) * 0.01})`
        })
      } else {
        $('#right-wrap').css({
          // 'width': zoomValue + '%',
          // 'hiehgt': zoomValue + '%'
          'transform-origin': 'unset',
          'transform': `scale(${parseInt(Common.WrapWidth) * 0.01})`
        })
      }
      
      warpList.splice(0, 1)
    })
  }
}

function initCanvas() {
  if (!Controls.ControlList) {
    return
  }
  let html = ''
  let dateList = []
  let wrap = document.getElementById('right-wrap')
  Controls.ControlList.forEach((item, index) => {
    //  index = item.PropertyList.ZIndex
    if (item.ControlType === 'solidrectangle') { //矩形样式
      html += `<div class="commonModule" draggable="false" data-id="${index}"
      style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;transform: rotate(${item.PropertyList.Rotate}deg);
      border-style: ${item.PropertyList.Style}; border-color: ${item.PropertyList.BorderColor}; border-width: ${item.PropertyList.BorderWidth}px;border-radius: ${item.PropertyList.BorderRadius}px;
      ${item.PropertyList.BackSetting !== 'img' ? `background-color: ${item.PropertyList.BackColor}`: '' };box-shadow: ${item.PropertyList.BoxShadow}; height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};
      opacity: ${Number(item.PropertyList.Opacity) / 100};">
        <div class="moduleShape" style="${item.PropertyList.BackSetting === 'img' ? `background-image:url(${item.PropertyList.BackImg});background-size:100% 100%;background-repeat: no-repeat;`: '' }"></div>
      </div>`
    } else if (item.ControlType === 'titleCom') { // 标题样式
      html += `<div class="commonModule" draggable="false" data-id="${index}"
      style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;transform: rotate(${item.PropertyList.Rotate}deg);
      border-style: ${item.PropertyList.Style}; border-color: ${item.PropertyList.BorderColor}; border-width: ${item.PropertyList.BorderWidth}px;border-radius: ${item.PropertyList.BorderRadius}px;
      ${item.PropertyList.BackSetting !== 'img' ? `background-color: ${item.PropertyList.BackColor}`: '' };box-shadow: ${item.PropertyList.BoxShadow}; height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};
      opacity: ${Number(item.PropertyList.Opacity) / 100};">
        <div class="moduleShape" style="${item.PropertyList.BackSetting === 'img' ? `background-image:url(${item.PropertyList.BackImg});background-size:100% 100%;background-repeat: no-repeat;`: '' }"></div>
      </div>
      `
    } else if (item.ControlType === 'line') { //直线样式
      html += `<div class="commonModule" draggable="false" data-id="${index}"
        style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px; z-index: ${item.PropertyList.ZIndex};
        border-top-style: ${item.PropertyList.Style}; border-top-color: ${item.PropertyList.BorderColor}; border-top-width: ${item.PropertyList.BorderWidth}px;
        opacity: ${Number(item.PropertyList.Opacity) / 100};">
        <div class="moduleShape">
          </div>
        </div>
        `
    } else if (item.ControlType === 'staticimage' || item.ControlType === 'image') { //静态图片和动态图片
      html += `<div class="commonModule" draggable="false" data-id="${index}"
        style="transform: rotate(${item.PropertyList.Rotate}deg);left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;
        height: ${item.PropertyList.Height}px; border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor}; border-width: ${item.PropertyList.BorderWidth}px;
        z-index: ${item.PropertyList.ZIndex};border-radius: ${item.PropertyList.BorderRadius}px;opacity: ${Number(item.PropertyList.Opacity) / 100};">
        <div class="img-div" style="box-shadow: ${item.PropertyList.BoxShadow};" >
          <img class="moduleShape" id="image-img${index}" src="${item.PropertyList.Img}" style="position: relative; vertical-align: top; z-index: ${item.PropertyList.ZIndex - 1 };border-radius: ${item.PropertyList.BorderRadius}px;" alt="图片" />
        </div>
      </div>
        `
      renderImage(index)
      // timer1 = setInterval(() => {
      //   renderImage(index)
      // }, time)
    } else if (item.ControlType === 'datatextblock') { //数值显示
      let align = ''
      if (item.PropertyList.JustifyContent === 'flex-start') {
        align = 'left'
      } else if (item.PropertyList.JustifyContent === 'center') {
        align = 'center'
      } else if (item.PropertyList.JustifyContent === 'flex-end') {
        align = 'right'
      }
      html += `<div class="commonModule" draggable="false" data-id="${index}" id="dbl-datatextblock${index}" 
        style="background-color: ${item.PropertyList.BackColor};left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;border-radius: ${item.PropertyList.BorderRadius}px;
          height: ${item.PropertyList.Height}px;box-shadow: ${item.PropertyList.BoxShadow};z-index: ${item.PropertyList.ZIndex};opacity: ${Number(item.PropertyList.Opacity) / 100}; 
          border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor}; border-width: ${item.PropertyList.BorderWidth}px; transform: rotate(${item.PropertyList.Rotate}deg);
          font-family: ${item.PropertyList.FontFamily};color: ${item.PropertyList.Color}; font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration};
          display: flex;justify-content: ${item.PropertyList.JustifyContent};text-align:${align}; align-items: ${item.PropertyList.AlignItems};"
          >
        <span id="datatextblock${index}" style="font-family: ${item.PropertyList.FontFamily};font-size: ${item.PropertyList.FontSize}px" >
          ${item.CheckData.name}
        </span>
        </div>`

      renderDataText(index)
      // timer2 = setInterval(() => {
      //   renderDataText(index)
      // }, time)

    } else if (item.ControlType === 'statictextblock') { //静态文本
      let align = ''
      if (item.PropertyList.JustifyContent === 'flex-start') {
        align = 'left'
      } else if (item.PropertyList.JustifyContent === 'center') {
        align = 'center'
      } else if (item.PropertyList.JustifyContent === 'flex-end') {
        align = 'right'
      }
      html += `<div class="commonModule" draggable="false" data-id="${index}"
        style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};transform: rotate(${item.PropertyList.Rotate}deg);">
        <div class="moduleShape common-input" contenteditable="true" style="padding:0;background-color: ${item.PropertyList.BackColor};border-radius:${item.PropertyList.BorderRadius}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor}; border-width: ${item.PropertyList.BorderWidth}px;font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration};
        font-weight: ${item.PropertyList.FontWeight};opacity: ${Number(item.PropertyList.Opacity) / 100};box-shadow: ${item.PropertyList.BoxShadow};
        color: ${item.PropertyList.Color};font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};position:absolute;top:0px;
        text-align:${item.PropertyList.TextAlign};display: flex;justify-content: ${item.PropertyList.JustifyContent};align-items: ${item.PropertyList.AlignItems};
        text-align:${align};left:0px" onmousedown="inputdown(this,event,${index})" >
          <span>${item.PropertyList.Text}</span>
        </div>
        </div>
        `
    } else if (item.ControlType === 'dynamictext') { //动态文本
      let align = ''
      if (item.PropertyList.JustifyContent === 'flex-start') {
        align = 'left'
      } else if (item.PropertyList.JustifyContent === 'center') {
        align = 'center'
      } else if (item.PropertyList.JustifyContent === 'flex-end') {
        align = 'right'
      }
      html += `<div class="commonModule" draggable="false" data-id="${index}"
        style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;height: ${item.PropertyList.Height}px;transform: rotate(${item.PropertyList.Rotate}deg); box-shadow: ${item.PropertyList.BoxShadow};z-index: ${item.PropertyList.ZIndex};">
        <div id="dynamictext-text${index}" class="moduleShape common-input" contenteditable="true" style="padding:0;background-color: ${item.PropertyList.BackColor};border-radius:${item.PropertyList.BorderRadius}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor}; border-width: ${item.PropertyList.BorderWidth}px;font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration};
        text-align:${item.PropertyList.TextAlign};font-weight: ${item.PropertyList.FontWeight};opacity: ${Number(item.PropertyList.Opacity) / 100};
        box-shadow: ${item.PropertyList.BoxShadow};color: ${item.PropertyList.Color};font-size: ${item.PropertyList.FontSize}px;
        font-family: ${item.PropertyList.FontFamily};position:absolute;top:0px;display: flex;justify-content: ${item.PropertyList.JustifyContent};align-items: ${item.PropertyList.AlignItems};
        text-align:${align};left:0px" 
        onmousedown="inputdown(this,event,${index})">
          <span>${item.PropertyList.Text}</span>
        </div>
        </div>
        `
      renderDynamicText(index)
      // timer3 = setInterval(() => {
      //   renderDynamicText(index)
      // }, time)

    } else if (item.ControlType === 'solidellipse') { //圆形
      html += `<div class="commonModule" draggable="false" data-id="${index}"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;border-radius: 50%;
          border-style: ${item.PropertyList.Style}; border-color: ${item.PropertyList.BorderColor}; border-width: ${item.PropertyList.BorderWidth}px;
          ${item.PropertyList.BackSetting !== 'img' ? `background-color: ${item.PropertyList.BackColor}`: '' };box-shadow: ${item.PropertyList.BoxShadow}; height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};
          opacity: ${Number(item.PropertyList.Opacity) / 100};transform: rotate(${item.PropertyList.Rotate}deg);">
          <div class="moduleShape" style="${item.PropertyList.BackSetting === 'img' ? `background-image:url(${item.PropertyList.BackImg});background-size:100% 100%;background-repeat: no-repeat;`: '' } border-radius: 50%;"></div>
           
          </div>
          `
    } else if (item.ControlType === 'ellipselamp') { //圆形状态灯
      html += `<div class="commonModule" id="ellipselamp${index}" draggable="false" data-id="${index}"
        style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;border-radius: 50%;
        height: ${item.PropertyList.Height}px;box-shadow: ${item.PropertyList.BoxShadow};z-index: ${item.PropertyList.ZIndex};background-color: #DDDDDD;
        opacity: ${Number(item.PropertyList.Opacity) / 100};">
          <div class="moduleShape">
          </div>
        </div>
        `

      renderEllipselamp(index)
      // timer4 = setInterval(() => {
      //   renderEllipselamp(index)
      // }, time)

    } else if (item.ControlType === 'commonlamp') { //矩形状态灯
      html += `<div class="commonModule" id="commonlamp${index}" draggable="false" data-id="${index}"
        style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;border-radius: ${item.PropertyList.BorderRadius}px;
        height: ${item.PropertyList.Height}px;box-shadow: ${item.PropertyList.BoxShadow};z-index: ${item.PropertyList.ZIndex};background-color: #DDDDDD;
        opacity: ${Number(item.PropertyList.Opacity) / 100};">
          <div class="moduleShape">
          </div>
        </div>
        `
      renderCommonlamp(index)
      // timer5 = setInterval(() => {
      //   renderCommonlamp(index)
      // }, time)


    } else if (item.ControlType === 'cornerbutton') { //控制按钮
      // if()

      html += `<div class="commonModule div-btn" draggable="false" data-id="${index}" id="cornerbutton${index}"
        style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px;color: ${item.PropertyList.Color}; width: ${item.PropertyList.Width}px;line-height: ${item.PropertyList.Height - (item.PropertyList.BorderWidth * 2)}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};background: ${item.PropertyList.BackColor}; text-align: ${item.PropertyList.TextAlign}; border-radius: ${item.PropertyList.BorderRadius}px; opacity: ${Number(item.PropertyList.Opacity) / 100};">
        <div onclick="renderCornerbutton(${index})" class="moduleShape common-input"  style="font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration};
          font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};box-shadow: ${item.PropertyList.BoxShadow};" >
          <span>${item.PropertyList.Text}</span>
        </div>
        </div>`

      // renderCornerbutton(index)
      // timer6 = setInterval(() => {
      //   renderCornerbutton(index)
      // }, time)

    } else if (item.ControlType === 'rwtextbox') { //读写框
      let inputType = item.CheckData.type == 'string' || item.CheckData.type == 'boolean' ? 'text' : 'number'
      html += `<div class="commonModule div-text" draggable="false" data-id="${index}" id="dbl-rwtextbox${index}"
        style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px;width: ${item.PropertyList.Width}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};">
        <input type="${inputType}" autocomplete="off" id="rwtextbox-text${index}" class="moduleShape common-input" contenteditable="true" style="padding:0;background-color: ${item.PropertyList.BackColor};border-radius:${item.PropertyList.BorderRadius}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor}; border-width: ${item.PropertyList.BorderWidth}px;font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration};
          text-align:${item.PropertyList.TextAlign};font-weight: ${item.PropertyList.FontWeight};line-height: ${item.PropertyList.Height}px;opacity: ${Number(item.PropertyList.Opacity) / 100};box-shadow: ${item.PropertyList.BoxShadow};color: ${item.PropertyList.Color};font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};position:absolute;top:0px;left:0px" value='${item.PropertyList.Text}' onmousedown="inputdown(this,event,${index})" >
          </input>
        </div>`
      renderRwtextbox(index)
      // timer7 = setInterval(() => {
      //   renderRwtextbox(index)
      // }, time)

    } else if (item.ControlType === 'jumplink') { //跳转链接
      html += `<div class="commonModule div-text" draggable="false" data-id="${index}"
        style="cursor:pointer;left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px;color: ${item.PropertyList.Color}; width: ${item.PropertyList.Width}px;line-height: ${item.PropertyList.Height}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};background: ${item.PropertyList.BackColor};  opacity: ${Number(item.PropertyList.Opacity) / 100};">
        <div class="moduleShape common-input flexLayout"  style="font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration};
          font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" onclick="jumpLinkFun(${index})">
          <span>${item.PropertyList.Text} ></span>
        </div>
        </div>`
    } else if (item.ControlType === 'textsearch') { //文本查询
      // 添加初始值
      // if (item.FilterConditions) {
      //   item.PropertyList.Value = item.FilterConditions
      // }
      // if(item.FilterConditionNum) {
      //   item.PropertyList.Text = item.FilterConditionNum
      // }
      let dropList = TextSearchList.map(d => {
        return `<li class="dropdown-item ${d.name === item.PropertyList.Value ? 'selected' : ''}" data-value="${d.value}" >${d.name}</li>`
      }).join('')
      html += `<div class="commonModule" draggable="false" data-id="${index}"
        style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;line-height: ${item.PropertyList.Height - (item.PropertyList.BorderWidth * 2)}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex}; text-align: ${item.PropertyList.TextAlign};  opacity: ${Number(item.PropertyList.Opacity) / 100};">
        <div style="width: 100%;height:100%;display: flex">
        <div class="global-select" style="height: 100%; margin-right: 10px;" >
        <div class="global-input" onmousedown="toggleItem(event, ${index})" style="height:100%;position:relative">
          <input type="text" class="search-input input-inner" value="${item.PropertyList.Value}"  readonly="readonly" autocomplete="off"
          style="left:0px;text-align: ${item.PropertyList.TextAlign};position:absolute;top:0;height:100%;box-shadow: ${item.PropertyList.BoxShadow};
          color: ${item.PropertyList.Color};border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};
          border-color: ${item.PropertyList.BorderColor};border-radius: ${item.PropertyList.BorderRadius}px;text-align: ${item.PropertyList.TextAlign};
          font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration}; font-size: ${item.PropertyList.FontSize}px;
          font-family: ${item.PropertyList.FontFamily};background: ${item.PropertyList.BackColor}" placeholder="请选择" ></input>
          <span class="input-suffix">
          <span class="input-suffix-inner">
            <i class="iconfont iconxialajiantou"></i>
          </span>
        </span>
            </div>
            <ul class="select-dropdown" onmousedown="selectValue(event, ${index}, 'Value')" style="width: ${item.PropertyList.Width}px;" >
                ${dropList}
            </ul>
          </div>
          <input class="search-input" id="textsearch-input${index}" style="text-align: ${item.PropertyList.TextAlign};box-shadow: ${item.PropertyList.BoxShadow};height:100%;
          color: ${item.PropertyList.Color};border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};
          border-color: ${item.PropertyList.BorderColor};border-radius: ${item.PropertyList.BorderRadius}px;text-align: ${item.PropertyList.TextAlign};
          font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration}; font-size: ${item.PropertyList.FontSize}px;
          font-family: ${item.PropertyList.FontFamily};background: ${item.PropertyList.BackColor}" placeholder="${item.PropertyList.Placeholder}"
        value="${item.PropertyList.Text}" ${item.Disabled ? 'disabled' : '' } onblur="changeText(event, ${index}, 'Text')"/>
        </div>
        </div>`
    } else if (item.ControlType === 'associatedatetimepicker') { //日期时间
      let date = ""
      if (item.StartTime && item.EndTime) {
        date = item.StartTime + ' - ' + item.EndTime
      } else {
        date = item.Date
      }
      // <input class="search-input" type="text" id="dateTime${index}" style="box-shadow: ${item.PropertyList.BoxShadow};width: 50%;color: ${item.PropertyList.Color};height: 100%;border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};border-radius: ${item.PropertyList.BorderRadius}px;text-align: ${item.PropertyList.TextAlign};font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration}; font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};"
      // value="${date}" />
      html += `<div class="commonModule" draggable="false" data-id="${index}"
        style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;line-height: ${item.PropertyList.Height - (item.PropertyList.BorderWidth * 2)}px;height: ${item.PropertyList.Height}px;z-index: ${99};background: ${item.PropertyList.BackColor}; text-align: ${item.PropertyList.TextAlign};  opacity: ${Number(item.PropertyList.Opacity) / 100};">
          <div class="r-date-group" style="height: 100%;font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};color: ${item.PropertyList.Color};font-weight: ${item.PropertyList.FontWeight};" >
            <div class="bi-datePicker date-wrap" >
              <input type="text" name="startTime" style="background: ${item.PropertyList.BackColor};color: ${item.PropertyList.Color};box-shadow: ${item.PropertyList.BoxShadow};border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};border-radius: ${item.PropertyList.BorderRadius}px;text-decoration: ${item.PropertyList.TextDecoration}; text-align: ${item.PropertyList.TextAlign}; " data-dateid="${index}" onfocus="getDate('startPicker',${index}, 'StartTime')" class="startPicker" autocomplete="off" value="${Controls.ControlList[index].StartTime}"  placeholder="请选择">
            </div>
            <div class="bi-datePicker date-wrap" >
              <input type="text" name="endTime" style="background: ${item.PropertyList.BackColor};color: ${item.PropertyList.Color};box-shadow: ${item.PropertyList.BoxShadow};border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};border-radius: ${item.PropertyList.BorderRadius}px;text-decoration: ${item.PropertyList.TextDecoration}; text-align: ${item.PropertyList.TextAlign}; " data-dateid="${index}" onfocus="getDate('endPicker',${index}, 'EndTime')" class="endPicker" autocomplete="off" value="${Controls.ControlList[index].EndTime}"  placeholder="请选择">
            </div> 
          </div>
        </div>`
      dateList.push({
        ...item,
        elem: `dateTime${index}`
      })
    } else if (item.ControlType === 'datasearch') { //数值查询
      let emptys = ['为空', '不为空']
      let equals = ['等于', '不等于', '大于等于', '小于等于']
      let dropList = DataSearchList.map(d => {
        return `<li class="dropdown-item ${d.name === item.PropertyList.Value ? 'selected' : ''}" data-value="${d.value}" >${d.name}</li>`
      }).join('')
      html += `<div class="commonModule" draggable="false" data-id="${index}"
        style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;transform: rotate(${item.PropertyList.Rotate}deg);height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};
        background: ${item.PropertyList.BackColor}; opacity: ${Number(item.PropertyList.Opacity) / 100};">
        <div style="width:100%;height:100%;display: flex; line-height: ${item.PropertyList.Height - (item.PropertyList.BorderWidth * 2)}px;">
        <div class="global-select" style="height:100%; margin-right: 10px; flex: 2">
          <div class="global-input" onmousedown="toggleItem(event, ${index})"  style="height:100%;position:relative;">
            <input type="text" class="search-input input-inner" value="${item.PropertyList.Value}" readonly="readonly" autocomplete="off"
            style="left:0px;text-align: ${item.PropertyList.TextAlign}; position:absolute;top:0;color: ${item.PropertyList.Color};box-shadow: ${item.PropertyList.BoxShadow};
            height: ${item.PropertyList.Height}px;border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};border-radius: ${item.PropertyList.BorderRadius}px;text-align: ${item.PropertyList.TextAlign};font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration}; font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" placeholder="请选择" ></input>
            <span class="input-suffix">
            <span class="input-suffix-inner">
              <i class="iconfont iconxialajiantou"></i>
            </span>
          </span>
            </div>
            <ul class="select-dropdown" onmousedown="selectValue(event, ${index}, 'Value')" style="width: ${item.PropertyList.Width}px;text-align: ${item.PropertyList.TextAlign}; " >
                ${dropList}
            </ul>
          </div>
          <input class="search-input" id="datasearch-left${index}" ${emptys.includes(item.PropertyList.Value) ? 'disabled': ''}  style="color: ${item.PropertyList.Color};flex: 1;box-shadow: ${item.PropertyList.BoxShadow};height: 100%;border-width: ${item.PropertyList.BorderWidth}px;
          border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};border-radius: ${item.PropertyList.BorderRadius}px;height: ${item.PropertyList.Height}px;
          text-align: ${item.PropertyList.TextAlign};font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration}; 
          font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" placeholder="${item.PropertyList.Placeholder}"
            value="${item.PropertyList.Num1}" onblur="changeText(event, ${index}, 'Num1')" />
            <div class="short" style="position:relative;line-height:0;"><span style="position:absolute;top:0px;bottom:0px;margin:auto;width:3px;display:inline-block;height:2px;right:2px;">-</span></div>
          <input class="search-input" id="datasearch-right${index}" ${emptys.includes(item.PropertyList.Value) || equals.includes(item.PropertyList.Value)  ? 'disabled': ''} style="flex: 1;box-shadow: ${item.PropertyList.BoxShadow};height: ${item.PropertyList.Height}px;border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};border-radius: ${item.PropertyList.BorderRadius}px;text-align: ${item.PropertyList.TextAlign};font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration}; font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" placeholder="${item.PropertyList.Placeholder}"
            value="${item.PropertyList.Num2}" onblur="changeText(event, ${index}, 'Num2')" />
        </div>
        </div>`
    } else if (item.ControlType === 'dropsearch') { //下拉查询
      if (item.PropertyList.Value === '不限') {
        item.Disabled = true
        item.ChoiceList = []
      }
      let dropList = DropSearchList.map(d => {
        return `<li class="dropdown-item ${d.name === item.PropertyList.Value ? 'selected' : ''}" data-value="${d.value}" >${d.name}</li>`
      }).join('')
      let filterList = item.dropList.map(d => {
        return `<li class="dropdown-item ${item.ChoiceList.includes(d.value) ? 'selected' : ''}">${d.value}</li>`
      }).join('')
      let dataList = item.ChoiceList.map(d => {
        return `<span class="tag" ><span >${d}</span><i onmousedown="delChoice(event, ${index})" class="iconfont iconguanbi2"></i></span>`
      }).join('')
      let leftHtml = ``
      if (item.EchartList.length <= 1) {
        leftHtml = `
          <div class="global-select" style="height:100%; flex: 1.1" >
          <div class="select__tags">
            <span id="tags__span">
              ${dataList}
            </span>
            <input type="text" id="dropsearch-input${index}" style="background: ${item.PropertyList.BackColor};color: ${item.PropertyList.Color}; height: 34%; min-width: 38px  width: calc(100% - 5px)"  placeholder="${item.ChoiceList.length === 0 ? '请选择' : ''}" ${item.Disabled ? 'disabled' : '' } class="select-drop-input${index} ${item.Disabled ? 'is-forbid' : '' }" ></input>
          </div>
          <div class="global-input select-drop-input${index} ${item.Disabled ? 'is-triger' : '' }" onmousedown="toggleItem(event, ${index})" onclick="refreshDrop(event, ${index})" >
            <input type="text"   ${item.Disabled ? 'disabled' : '' }  class="input-inner select-drop-input${index} ${item.Disabled ? 'is-forbid' : '' }  " value="${item.PropertyList.CheckedValue}" autocomplete="off" readonly="readonly")"
            style="background: ${item.PropertyList.BackColor};box-shadow: ${item.PropertyList.BoxShadow};height: ${item.PropertyList.Height}px;color: ${item.PropertyList.Color};border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};border-radius: ${item.PropertyList.BorderRadius}px;text-align: ${item.PropertyList.TextAlign};font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration}; font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" ></input>
            <span class="input-suffix select-drop-input${index} ${item.Disabled ? 'is-forbid' : '' } ">
            <span class="input-suffix-inner">
              <i class="iconfont iconxialajiantou"></i>
            </span>
          </div>
          <ul class="select-dropdown" id="s-drop${index}" style="width: ${item.PropertyList.Width/2}px;position: absolute;" onmousedown="addSelectChoice(event, ${index}, 'CheckedValue')" >
          </ul>
        </div>`
      } else {
        leftHtml = `
        <div class="global-select" style="height: 100%; flex: 1.1" >
          <input class="search-input ${item.Disabled ? 'is-forbid' : '' }" ${item.Disabled ? 'disabled' : '' } id="drop-right-input${index}" value="${item.ChoiceList[0] ? item.ChoiceList[0] : ''}" onblur="getSelectValue(event, ${index})" style="position: absolute;top: 0px;background: ${item.PropertyList.BackColor};box-shadow: ${item.PropertyList.BoxShadow};height: 100%;color: ${item.PropertyList.Color};border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};border-radius: ${item.PropertyList.BorderRadius}px;text-align: ${item.PropertyList.TextAlign};font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration}; font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};"" ></input>
        </div>
        `
      }

      html += `<div class="commonModule" draggable="false" data-id="${index}"
        style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;line-height: ${item.PropertyList.Height - (item.PropertyList.BorderWidth * 2)}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};background: ${item.PropertyList.BackColor}; text-align: ${item.PropertyList.TextAlign};  opacity: ${Number(item.PropertyList.Opacity) / 100};">
        <div style="width:100%; height:100%; display: flex" >
        <div class="global-select" style="height:100%; flex: 0.9; margin-right: 10px" >
        <div class="global-input"  onmousedown="toggleItem(event, ${index})" style="height:100%;">
                <input type="text" value="${item.PropertyList.Value}" readonly="readonly" autocomplete="off" 
                style="position:absolute;top:0;background: ${item.PropertyList.BackColor};box-shadow: ${item.PropertyList.BoxShadow};height: 100%;color: ${item.PropertyList.Color};border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};border-radius: ${item.PropertyList.BorderRadius}px;text-align: ${item.PropertyList.TextAlign};font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration}; font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" placeholder="请选择" class="input-inner" ></input>
                <span class="input-suffix">
                <span class="input-suffix-inner">
                  <i class="iconfont iconxialajiantou"></i>
                </span>
              </span>
              </div>
              <ul class="select-dropdown" onmousedown="selectValue(event, ${index}, 'Value')" style="width: ${item.PropertyList.Width/2}px;" >
                ${dropList}
              </ul>
            </div>
            ${leftHtml}
          </div>
          </div>
        </div>`
    } else if (item.ControlType === 'searchbutton') { //查询按钮
      html += `<div class="commonModule div-btn" draggable="false" data-id="${index}"
       onclick="trggerData(${index})"
        style="box-shadow: ${item.PropertyList.BoxShadow};left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;line-height: ${item.PropertyList.Height - (item.PropertyList.BorderWidth * 2)}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};background: ${item.PropertyList.BackColor}; text-align: ${item.PropertyList.TextAlign}; border-radius: ${item.PropertyList.BorderRadius}px; opacity: ${Number(item.PropertyList.Opacity) / 100};">
        <div class="moduleShape common-input" style="color: ${item.PropertyList.Color};font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration};
          font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" >
          <span>${item.PropertyList.Text}</span>
        </div>
        </div>`
    } else if (item.ControlType === 'resetbutton') { //重置按钮
      html += `<div class="commonModule div-btn" draggable="false" data-id="${index}"
        onclick="resetData(${index})"
        style="box-shadow: ${item.PropertyList.BoxShadow};left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;line-height: ${item.PropertyList.Height - (item.PropertyList.BorderWidth * 2)}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};background: ${item.PropertyList.BackColor}; text-align: ${item.PropertyList.TextAlign}; border-radius: ${item.PropertyList.BorderRadius}px; opacity: ${Number(item.PropertyList.Opacity) / 100};">
        <div class="moduleShape common-input" style="color: ${item.PropertyList.Color};font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration};
          font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" >
          <span>${item.PropertyList.Text}</span>
        </div>
        </div>`
    } else if (item.ControlType === 'piechart') {
      html += `<div  class="commonModule" draggable="false" data-id="${index}"
        style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};transform: rotate(${item.PropertyList.Rotate}deg);">
        <div id="${item.Name}" class="chartModule" style="width:100%;height:100%"></div>
        </div>
        <div  class="commonModule" draggable="false" data-id="${index}"
        style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex-1};">
        <div id="${item.Name}pie" style="width:100%;height:100%"></div>
        </div>`

      renderPieChart(item)
      // timer8 = setInterval(() => {
      //   renderPieChart(item)
      // }, time)
      // timer8 = setTimeout (function () {
      //   // do something
      //   renderPieChart(item)
      //   setTimeout (arguments.callee, time)
      // }, time)

    } else if (item.ControlType === 'dashboardchart') {
      html += `<div  class="commonModule" draggable="false" data-id="${index}"
        style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};transform: rotate(${item.PropertyList.Rotate}deg);">
        <div id="${item.Name}" class="chartModule" style="width:100%;height:100%"></div>
        </div>`

      renderDashChart(item)
      // timer9 = setInterval(() => {
      //   renderDashChart(item)
      // }, time)


    } else if (item.ControlType === 'barchart') {
      html += `<div  class="commonModule" draggable="false" data-id="${index}"
        style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};transform: rotate(${item.PropertyList.Rotate}deg);">
        <div id="${item.Name}" class="chartModule" style="width:100%;height:100%"></div>
        </div>`
      renderBarChart(item)
      // timer10 = setInterval(() => {
      //   renderBarChart(item)
      // }, time)

    } else if (item.ControlType === 'linechart') {
      html += `<div  class="commonModule" draggable="false" data-id="${index}"
        style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};transform: rotate(${item.PropertyList.Rotate}deg);">
        <div id="${item.Name}" class="chartModule" style="width:100%;height:100%"></div>
        </div>`

      renderLineChart(item)
      // timer11 = setInterval(() => {
      //   renderLineChart(item)
      // }, time)
    }




  })
  wrap.innerHTML = html
  // wrap.style.width = Common.WrapWidth
  // wrap.style.height = Common.WrapWidth
  if (Common.BackSetting !== 'color') {
    wrap.style.backgroundImage = `url(${Common.BackImg})`
    wrap.style.backgroundRepeat = `norepear`
    wrap.style.backgroundSize = `100% 100%`
  } else {
    wrap.style.backgroundColor = Common.BackColor
    wrap.style.backgroundImage = ''
  }

  dateList.forEach(df => {
    let type = formatType(df.DateTimeType)
    if (df.DateTimeType === 'year') {
      layui.use('laydate', function () {
        var laydate = layui.laydate;
        laydate.render({
          elem: `#${df.elem}`,
          range: true,
          type,
          // format: '',
          done: function (value, date, endDate) {
            let startTime = value.split(' - ')[0]
            let endTime = value.split(' - ')[1]
            let index = Number(df.elem.replace(/[^0-9]/ig, ""))
            Controls.ControlList[index].StartTime = startTime
            Controls.ControlList[index].EndTime = endTime
            manualTrigger(df)
          }
        })
      })
    } else if (df.DateTimeType === 'yyyy-MM') {
      layui.use('laydate', function () {
        var laydate = layui.laydate;
        laydate.render({
          elem: `#${df.elem}`,
          range: true,
          type,
          done: function (value, date, endDate) {
            let startTime = value.split(' - ')[0]
            let endTime = value.split(' - ')[1]
            let index = Number(df.elem.replace(/[^0-9]/ig, ""))
            Controls.ControlList[index].StartTime = startTime
            Controls.ControlList[index].EndTime = endTime
            manualTrigger(df)
          }
        })
      })
    } else {
      layui.use('laydate', function () {
        var laydate = layui.laydate;
        laydate.render({
          elem: `#${df.elem}`,
          range: true,
          type,
          format: df.DateTimeType,
          done: function (value, date, endDate) {
            let startTime = value.split(' - ')[0]
            let endTime = value.split(' - ')[1]
            let index = Number(df.elem.replace(/[^0-9]/ig, ""))
            Controls.ControlList[index].StartTime = startTime
            Controls.ControlList[index].EndTime = endTime

            manualTrigger(df)
            // if (df.PropertyList.QueryFind) {  // 添加即时刷新功能
            //   df.EchartList.forEach(dd => {
            //     if (dd.name.indexOf('linechart') !== -1) {  // 折线图即时刷新
            //       Controls.ControlList.forEach((cf, cfi) => {
            //         if (cf.Name === dd.name) {
            //           renderLineChart(cf)
            //         }
            //       })  
            //     } else if (dd.name.indexOf('barchart') !== -1){ // 柱状图即时刷新
            //       Controls.ControlList.forEach((cf, cfi) => {
            //         if (cf.Name === dd.name) {
            //           renderBarChart(cf)
            //         }
            //       })
            //     } else if (dd.name.indexOf('dashboardchart') !== -1){ // 仪表盘即时刷新
            //       Controls.ControlList.forEach((cf, cfi) => {
            //         if (cf.Name === dd.name) {
            //           renderDashChart(cf)
            //         }
            //       })

            //     } else if (dd.name.indexOf('piehart') !== -1){ // 饼图即时刷新
            //       Controls.ControlList.forEach((cf, cfi) => {
            //         if (cf.Name === dd.name) {
            //           renderPieChart(cf)
            //         }
            //       })

            //     }
            //   })

            //   // renderBarChart()
            // }

          }
        })
      })
    }
  })


  setTimeout(() => {
    PieChartDataFun('tool')
    DashChartDataFun('tool')
    BarChartDataFun('tool')
    LineChartDataFun('tool')
  }, 20)
  clearInterval(timer1)
  setTimer()


  // wrap.style.background = Common.BackColor
}
//添加定时器
function setTimer() {
  timer1 = setInterval(() => {
    // clearInterval(timer1)
    Controls.ControlList.forEach((item, index) => {
      if (item.ControlType === 'staticimage' || item.ControlType === 'image') {
        renderImage(index)
      }
      if (item.ControlType === 'datatextblock') {
        renderDataText(index)
      }
      if (item.ControlType === 'dynamictext') {
        renderDynamicText(index)
      }
      if (item.ControlType === 'ellipselamp') {
        renderEllipselamp(index)
      }
      if (item.ControlType === 'commonlamp') {
        renderCommonlamp(index)
      }
      if (item.ControlType === 'rwtextbox') {
        renderRwtextbox(index)
      }
      if (item.ControlType === 'piechart') {
        Controls.Data.PieChartItemList.forEach(chart => {
          if (chart.name === item.Name) {
            if (chart.defaultDataConfig.datatype === '实时数据') {
              renderPieChart(item)
            }
          }
        })
      }
      if (item.ControlType === 'dashboardchart') {
        Controls.Data.DashBoardChartItemList.forEach(chart => {
          if (chart.name === item.Name) {
            if (chart.defaultDataConfig.datatype === '实时数据') {
              renderDashChart(item)
            }
          }
        })
      }
      if (item.ControlType === 'linechart') {
        Controls.Data.LineChartItemList.forEach(chart => {
          if (chart.name === item.Name) {
            if (chart.defaultDataConfig.datatype === '实时数据') {
              renderLineChart(item)
            }
          }
        })
      }
      if (item.ControlType === 'barchart') {
        Controls.Data.BarChartItemList.forEach(chart => {
          if (chart.name === item.Name) {
            if (chart.defaultDataConfig.datatype === '实时数据') {
              renderBarChart(item)
            }
          }
        })
      }

    })

  }, time);

}

// 点击触发刷新功能
function manualTrigger(item, type) {
  if (!type) {
    if (item.PropertyList.QueryFind) {
      item.EchartList.forEach(dd => {
        if (dd.name.indexOf('linechart') !== -1) { // 折线图触发刷新
          Controls.ControlList.forEach((cf, cfi) => {
            if (cf.Name === dd.name) {
              renderLineChart(cf)
            }
          })
        } else if (dd.name.indexOf('barchart') !== -1) { // 柱状图触发刷新
          Controls.ControlList.forEach((cf, cfi) => {
            if (cf.Name === dd.name) {
              renderBarChart(cf)
            }
          })
        } else if (dd.name.indexOf('dashboardchart') !== -1) { // 仪表盘触发刷新
          Controls.ControlList.forEach((cf, cfi) => {
            if (cf.Name === dd.name) {
              renderDashChart(cf)
            }
          })

        } else if (dd.name.indexOf('piehart') !== -1) { // 饼图触发刷新
          Controls.ControlList.forEach((cf, cfi) => {
            if (cf.Name === dd.name) {
              renderPieChart(cf)
            }
          })

        }
      })

      item.HistoryList.forEach(dd => {
        if (dd.name.indexOf('linechart') !== -1) { // 折线图触发刷新
          Controls.ControlList.forEach((cf, cfi) => {
            if (cf.Name === dd.name) {
              renderLineChart(cf)
            }
          })
        } else if (dd.name.indexOf('barchart') !== -1) { // 柱状图触发刷新
          Controls.ControlList.forEach((cf, cfi) => {
            if (cf.Name === dd.name) {
              renderBarChart(cf)
            }
          })
        } else if (dd.name.indexOf('dashboardchart') !== -1) { // 仪表盘触发刷新
          Controls.ControlList.forEach((cf, cfi) => {
            if (cf.Name === dd.name) {
              renderDashChart(cf)
            }
          })
  
        } else if (dd.name.indexOf('piechart') !== -1) { // 饼图触发刷新
          Controls.ControlList.forEach((cf, cfi) => {
            if (cf.Name === dd.name) {
              renderPieChart(cf)
            }
          })
  
        }
      })

    }
  }else {
    // 查询组件触发刷新
    item.EchartList.forEach(dd => {
      if (dd.name.indexOf('linechart') !== -1) { // 折线图触发刷新
        Controls.ControlList.forEach((cf, cfi) => {
          if (cf.Name === dd.name) {
            renderLineChart(cf)
          }
        })
      } else if (dd.name.indexOf('barchart') !== -1) { // 柱状图触发刷新
        Controls.ControlList.forEach((cf, cfi) => {
          if (cf.Name === dd.name) {
            renderBarChart(cf)
          }
        })
      } else if (dd.name.indexOf('dashboardchart') !== -1) { // 仪表盘触发刷新
        Controls.ControlList.forEach((cf, cfi) => {
          if (cf.Name === dd.name) {
            renderDashChart(cf)
          }
        })

      } else if (dd.name.indexOf('piechart') !== -1) { // 饼图触发刷新
        Controls.ControlList.forEach((cf, cfi) => {
          if (cf.Name === dd.name) {
            renderPieChart(cf)
          }
        })

      }
    })
    item.HistoryList.forEach(dd => {
      if (dd.name.indexOf('linechart') !== -1) { // 折线图触发刷新
        Controls.ControlList.forEach((cf, cfi) => {
          if (cf.Name === dd.name) {
            renderLineChart(cf)
          }
        })
      } else if (dd.name.indexOf('barchart') !== -1) { // 柱状图触发刷新
        Controls.ControlList.forEach((cf, cfi) => {
          if (cf.Name === dd.name) {
            renderBarChart(cf)
          }
        })
      } else if (dd.name.indexOf('dashboardchart') !== -1) { // 仪表盘触发刷新
        Controls.ControlList.forEach((cf, cfi) => {
          if (cf.Name === dd.name) {
            renderDashChart(cf)
          }
        })

      } else if (dd.name.indexOf('piechart') !== -1) { // 饼图触发刷新
        Controls.ControlList.forEach((cf, cfi) => {
          if (cf.Name === dd.name) {
            renderPieChart(cf)
          }
        })

      }
    })

  }
}

//链接跳转
function jumpLinkFun(index) {
  if (Controls.ControlList[index].PropertyList.jumpType == 'address') {
    let key="&amp;";
    Controls.ControlList[index].PropertyList.linkAddress = Controls.ControlList[index].PropertyList.linkAddress.replace(new RegExp(key,'g'),"&");
    // 将&amp;转码成&
    
    if (Controls.ControlList[index].PropertyList.linkAddress.indexOf('http') <= -1 || Controls.ControlList[index].PropertyList.linkAddress.indexOf('https') <= -1) {
      Controls.ControlList[index].PropertyList.linkAddress = 'http://' + Controls.ControlList[index].PropertyList.linkAddress
    }
    window.open(Controls.ControlList[index].PropertyList.linkAddress, Controls.ControlList[index].PropertyList.openAddress)
  } else if (Controls.ControlList[index].PropertyList.jumpType == 'panel') {
    if (Controls.ControlList[index].PropertyList.openAddress == '_self') {
      let postData = {
        appId,
        panelId: Controls.ControlList[index].PropertyList.panelId,
      }
      let zTree = $.fn.zTree.getZTreeObj("dashboardtree");
      let node3 = zTree.getNodeByParam('id', postData.panelId)
      zTree.selectNode(node3);
      request.get(`/bi/${appId}/panel-tree/children-panel`, {
        params: postData
      }).then(res => {
        if (res.data.code !== 0) {
          appTips.errorMsg(res.data.msg)
          return
        }

        if (res.data.data.configDetails) {
          Controls = JSON.parse(res.data.data.configDetails)
        } else {
          $("#right-wrap").empty()
          appTips.tipsMsg('无数据')
          return
        }

        Controls = JSON.parse(res.data.data.configDetails)
        Common = {
          Name: Controls.Name,
          Position: Controls.Position,
          BackSetting: Controls.BackSetting,
          BackColor: Controls.BackColor,
          BackImg: Controls.BackImg,
          Permision: Controls.Permision,
          Description: Controls.Description
        }
        initCanvas()
      })

    } else {
      window.parent.postMessage({
        source: 'SYCOPENNEWBIKANBAN',
        id: Controls.ControlList[index].PropertyList.panelId,
        name: Controls.ControlList[index].PropertyList.panel ? Controls.ControlList[index].PropertyList.panel : '看板'
      }, '*')
      // window.open(`./dashboard.html?panelId=${Controls.ControlList[index].PropertyList.panelId}&appId=${appId}&token=${token}`, Controls.ControlList[index].PropertyList.openAddress)
    }


  }



}

function formatType(val) {
  let type = ''
  if (val === 'yyyy-MM-dd HH:mm:ss') {
    type = 'datetime'
  } else if (val === 'yyyy-MM-dd HH:mm') {
    type = 'datetime'
  } else if (val === 'yyyy-MM-dd HH') {
    type = 'datetime'
  } else if (val === 'yyyy-MM-dd') {
    type = 'date'
  } else if (val === 'yyyy-MM') {
    type = 'month'
  } else if (val === 'yyyy') {
    type = 'year'
  }
  return type
}

// 读写框实时刷新
async function renderRwtextbox(index) {
  let item = Controls.ControlList[index]
  // if (item.conCheck) {
  let times = 0
  if (item.DataList.length !== 0) {
    for (let i = 0; i < item.DataList.length; i++) {
      if (item.CheckData && item.CheckData.name !== '') {
        await request.get(`/bi/${appId}/variables/${item.CheckData.equipmentId ? item.CheckData.equipmentId : item.CheckData.equipmentid }/${item.CheckData.id}/${item.CheckData.name}/status`).then(res => {
          let Data = res.data.data[item.CheckData.name]
          if (JSON.stringify(res.data.data) !== "{}") {
            item.DataList[i].flag = transFlag(item.DataList[i].flag)
            if (item.DataList[i].flag === '=') {
              if (Data == item.DataList[i].num) {
                $(`#rwtextbox-text${index}`).val(res.data.data[item.CheckData.name])
                if (item.conCheck) {
                  $(`#rwtextbox-text${index}`).css('color', item.DataList[i].backColor)
                }
                times++
              } else {
                $(`#rwtextbox-text${index}`).css('color', '#000')
              }
            } else if (item.DataList[i].flag === '>=') {
              if (Data >= item.DataList[i].num) {
                $(`#rwtextbox-text${index}`).val(res.data.data[item.CheckData.name])
                if (item.conCheck) {
                  $(`#rwtextbox-text${index}`).css('color', item.DataList[i].backColor)
                }
                times++
              } else {
                $(`#rwtextbox-text${index}`).css('color', '#000')
              }
            } else if (item.DataList[i].flag === '<=') {
              if (Data <= item.DataList[i].num) {
                $(`#rwtextbox-text${index}`).val(res.data.data[item.CheckData.name])
                if (item.conCheck) {
                  $(`#rwtextbox-text${index}`).css('color', item.DataList[i].backColor)
                }
                times++
              } else {
                // 实时变化条件不满足 还原颜色
                $(`#rwtextbox-text${index}`).css('color', '#000')
              }
            } else if (item.DataList[i].flag === '>') {
              if (Data > item.DataList[i].num) {
                $(`#rwtextbox-text${index}`).val(res.data.data[item.CheckData.name])
                if (item.conCheck) {
                  $(`#rwtextbox-text${index}`).css('color', item.DataList[i].backColor)
                }
                times++
              } else {
                $(`#rwtextbox-text${index}`).css('color', '#000')
              }
            } else if (item.DataList[i].flag === '<') {
              if (Data < item.DataList[i].num) {
                $(`#rwtextbox-text${index}`).val(res.data.data[item.CheckData.name])
                if (item.conCheck) {
                  $(`#rwtextbox-text${index}`).css('color', item.DataList[i].backColor)
                }
                times++
              } else {
                $(`#rwtextbox-text${index}`).css('color', '#000')
              }
            } else if (item.DataList[i].flag === '!=') {
              if (item.DataList[i].num != Data) {
                $(`#rwtextbox-text${index}`).val(res.data.data[item.CheckData.name])
                if (item.conCheck) {
                  $(`#rwtextbox-text${index}`).css('color', item.DataList[i].backColor)
                }
                times++
              } else {
                $(`#rwtextbox-text${index}`).css('color', '#000')
              }
            }
            if (i === item.DataList.length - 1 && times === 0) {
              $(`#rwtextbox-text${index}`).val(res.data.data[item.CheckData.name])
            }
          }
        })
        if (times !== 0) {
          break
        }
      }
    }
  } else {
    await request.get(`/bi/${appId}/variables/${item.CheckData.equipmentId ? item.CheckData.equipmentId : item.CheckData.equipmentid}/${item.CheckData.id}/${item.CheckData.name}/status`).then(res => {
      let Data = res.data.data[item.CheckData.name]
      $(`#rwtextbox-text${index}`).val(res.data.data[item.CheckData.name])
      if (item.conCheck) {
        $(`#rwtextbox-text${index}`).css('color', '#000')
      }
    })
  }
  // }
  if (item.dblCheck) {
    setTimeout(() => {
      $(`#dbl-rwtextbox${index}`).dblclick(function () {
        dblOpen(item, index)
      })
    })
  }
}

function getInputType(type) {
  let type1 = 'text'
  if (type == 'string' || type == 'boolean') {
    type1 = 'text'
  } else {
    type1 = 'number'
  }
  return type1
}

// 控制按钮实时刷新
function renderCornerbutton(index) {
  let item = Controls.ControlList[index]
  if (item.IsOpen) {
    // $(`#cornerbutton${index}`).click(function () {
    let area = ''
    let content = item.IsOpenText
    if (item.radioType == '2') {
      content = `<div>`
      item.ButtonTypeThreeList.forEach((i, index1) => {
        content += `<div>${i.ButtonTypeThreeTitle}</div><div style="display: flex;flex-wrap: wrap;justify-content:space-between">`
        i.DataList.forEach((j, index) => {
          let type = getInputType(j.CheckData.type)
          content += `<div id="buttonDataList${index1}${index}" data-id="${j.CheckData.id}" style="width: 48%;">
              <div><span>${j.title}</span></div>
              <div><input type="${type}"></div>
              </div>`
        })
        // i.
        content += `</div>`
      })
      content += `</div>`
      area = ['700px', '500px']

    }


    layer.open({
      title: '提示',
      content: content,
      closeBtn: 1,
      btn: ['取消', '确定'],
      area: area,
      success: function (layero, index) {
        this.enterConfirm = function (event) {
          if (event.keyCode === 13) {
            $(".layui-layer-btn1").click();
            return false; //阻止系统默认回车事件
          }
        };
        $(document).on('keydown', this.enterConfirm); //监听键盘事件

        // 点击确定按钮回调事件
        $(".layui-layer-btn1").on("click", function () {
          this.btn2
        })
      },

      btn2: function (index, layero) {
        let commandMap = {}
        let times = 0
        if (item.radioType == '0' || item.radioType == '1') {
          if (item.radioType == '1') {
            item.ButtonTypeList[1].DataList.forEach(df => {
              Controls.ControlList.forEach((cf, cfi) => {
                if (cf.PropertyList.ComName === df.rwtextbox) {
                  if (cf.TriggerCondition === '2') {
                    Object.assign(commandMap, {
                      [cf.CheckData.id]: $(`#rwtextbox-text${cfi}`).val()
                    })
                  } else {
                    times++
                  }
                }

              })
            })

          } else {
            item.ButtonTypeList[item.radioType].DataList.forEach(ii => {
              Object.assign(commandMap, {
                [ii.CheckData.id]: ii.issuedValue
              })
            })
          }
        } else {
          item.ButtonTypeThreeList.forEach((i, index1) => {
            i.DataList.forEach((j, index) => {
              if ($("#buttonDataList" + index1 + index).find('input').val() != '') {
                let id = $("#buttonDataList" + index1 + index).data('id')
                let value = $("#buttonDataList" + index1 + index).find('input').val()
                if ($("#buttonDataList" + index1 + index).find('input').type == "number") {
                  value = Number(value)
                }
                Object.assign(commandMap, {
                  [id]: value
                })
              }


            })
          })

        }
        if (times !== 0) {
          appTips.errorMsg('该控制按钮下存在未绑定的关联组件，请前往编辑页面进行绑定')
          return
        }
        let postData = {
          control: 1,
          accessType: item.OperationPermission,
          commandMap,
          permissions: item.OperationPermission === 'custom' ? item.operatData.opetaPermissions : []
        }
        if (item.OperationPermission === 'private') {
          postData.userId = Controls.User.uid
        }
        request.post(`/bi/${appId}/variables/send`, postData).then(res => {
          if (res.data.code === 0) {
            appTips.successMsg('下发成功!')
          } else {
            appTips.errorMsg(res.data.msg)
          }
        })
      },
      end: function () {
        $(document).off('keydown', this.enterConfirm); //解除键盘关闭事件
      }
    });



    // })
  }
}



//矩形状态灯实时刷新
async function renderCommonlamp(index) {
  let item = Controls.ControlList[index]
  let times = 0
  for (let i = 0; i < item.DataList.length; i++) {
    if (item.DataList[i].variable !== '选择') {
      if (item.DataList[i].CheckData) {
        await request.get(`/bi/${appId}/variables/${item.DataList[i].CheckData.equipmentId ? item.DataList[i].CheckData.equipmentId : tem.DataList[i].CheckData.equipmentid}/${item.DataList[i].CheckData.id}/${item.DataList[i].CheckData.name}/status`).then(res => {
          // res.data.data[item.DataList[i].CheckData.id]= 0
          let Data = res.data.data[item.DataList[i].CheckData.name]
          if (JSON.stringify(res.data.data) !== "{}") {
            item.DataList[i].flag = transFlag(item.DataList[i].flag)
            if (item.DataList[i].flag === '=') {
              if (item.DataList[i].num == Data) {
                $(`#commonlamp${index}`).css('background-color', item.DataList[i].backColor)
                if (item.DataList[i].flashing) { // 判读闪烁
                  $(`#commonlamp${index}`).addClass('animated-flash')
                }
                times++
              }
            } else if (item.DataList[i].flag === '>=') {
              if (Data >= item.DataList[i].num) {
                $(`#commonlamp${index}`).css('background-color', item.DataList[i].backColor)
                if (item.DataList[i].flashing) {
                  $(`#commonlamp${index}`).addClass('animated-flash')
                }
                times++
              }
            } else if (item.DataList[i].flag === '<=') {
              if (Data <= item.DataList[i].num) {
                $(`#commonlamp${index}`).css('background-color', item.DataList[i].backColor)
                if (item.DataList[i].flashing) {
                  $(`#commonlamp${index}`).addClass('animated-flash')
                }
                times++
              }
            } else if (item.DataList[i].flag === '>') {
              if (Data > item.DataList[i].num) {
                $(`#commonlamp${index}`).css('background-color', item.DataList[i].backColor)
                if (item.DataList[i].flashing) {
                  $(`#commonlamp${index}`).addClass('animated-flash')
                }
                times++
              }
            } else if (item.DataList[i].flag === '<') {
              if (Data < item.DataList[i].num) {
                $(`#commonlamp${index}`).css('background-color', item.DataList[i].backColor)
                if (item.DataList[i].flashing) {
                  $(`#commonlamp${index}`).addClass('animated-flash')
                }
                times++
              }
            } else if (item.DataList[i].flag === '!=') {
              if (item.DataList[i].num != Data) {
                $(`#commonlamp${index}`).css('background-color', item.DataList[i].backColor)
                if (item.DataList[i].flashing) {
                  $(`#commonlamp${index}`).addClass('animated-flash')
                }
                times++
              }
            }
            if (i === item.DataList.length - 1 && times === 0) {
              $(`#commonlamp${index}`).css('background-color', item.DefaultColor)
              if (item.DefaultFlashing) { // 默认闪烁
                $(`#commonlamp${index}`).addClass('animated-flash')
              }
            }
          } else {
            $(`#commonlamp${index}`).css('background-color', item.DefaultColor)
            if (item.DefaultFlashing) { // 默认闪烁
              $(`#commonlamp${index}`).addClass('animated-flash')
            }
          }
        })
        if (times !== 0) {
          break
        }
      }
    } else {
      // appTips.warningMsg('该节点下' + item.PropertyList.ComName + '组件数据不完整, 请前往编辑页面补全!');
    }
  }
}

// 圆形状态灯实时刷新
async function renderEllipselamp(index) {
  let times = 0
  let item = Controls.ControlList[index]
  for (let i = 0; i < item.DataList.length; i++) {
    if (item.DataList[i].variable !== '选择') {
      if (item.DataList[i].CheckData) {
        await request.get(`/bi/${appId}/variables/${item.DataList[i].CheckData.equipmentId ? item.DataList[i].CheckData.equipmentId : item.DataList[i].CheckData.equipmentid}/${item.DataList[i].CheckData.id}/${item.DataList[i].CheckData.name}/status`).then(res => {
          // res.data.data[item.DataList[i].CheckData.name] = 2
          if (res.data.data) {
            let Data = res.data.data[item.DataList[i].CheckData.name]
            if (JSON.stringify(res.data.data) !== '{}') {
              item.DataList[i].flag = transFlag(item.DataList[i].flag)
              if (item.DataList[i].flag === '=') {
                if (item.DataList[i].num == Data) {
                  $(`#ellipselamp${index}`).css('background-color', item.DataList[i].backColor)
                  if (item.DataList[i].flashing) { // 判读闪烁
                    $(`#ellipselamp${index}`).addClass('animated-flash')
                  }
                  times++
                }
              } else if (item.DataList[i].flag === '>=') {
                if (Data >= item.DataList[i].num) {
                  $(`#ellipselamp${index}`).css('background-color', item.DataList[i].backColor)
                  if (item.DataList[i].flashing) {
                    $(`#ellipselamp${index}`).addClass('animated-flash')
                  }
                  times++
                }
              } else if (item.DataList[i].flag === '<=') {
                if (Data <= item.DataList[i].num) {
                  $(`#ellipselamp${index}`).css('background-color', item.DataList[i].backColor)
                  if (item.DataList[i].flashing) {
                    $(`#ellipselamp${index}`).addClass('animated-flash')
                  }
                  times++
                }
              } else if (item.DataList[i].flag === '>') {
                if (Data > item.DataList[i].num) {
                  $(`#ellipselamp${index}`).css('background-color', item.DataList[i].backColor)
                  if (item.DataList[i].flashing) {
                    $(`#ellipselamp${index}`).addClass('animated-flash')
                  }
                  times++
                }
              } else if (item.DataList[i].flag === '<') {
                if (Data < item.DataList[i].num) {
                  $(`#ellipselamp${index}`).css('background-color', item.DataList[i].backColor)
                  if (item.DataList[i].flashing) {
                    $(`#ellipselamp${index}`).addClass('animated-flash')
                  }
                  times++
                }
              } else if (item.DataList[i].flag === '!=') {
                if (item.DataList[i].num != Data) {
                  $(`#ellipselamp${index}`).css('background-color', item.DataList[i].backColor)
                  if (item.DataList[i].flashing) { // 默认闪烁
                    $(`#ellipselamp${index}`).addClass('animated-flash')
                  }
                  times++
                }
              }
              if (i === item.DataList.length - 1 && times === 0) {
                $(`#ellipselamp${index}`).css('background-color', item.DefaultColor)
                if (item.DefaultFlashing) {
                  $(`#ellipselamp${index}`).addClass('animated-flash')
                }
              }
            } else {
              $(`#ellipselamp${index}`).css('background-color', item.DefaultColor)
              if (item.DefaultFlashing) {
                $(`#ellipselamp${index}`).addClass('animated-flash')
              }
            }
          }
        })
        if (times !== 0) {
          break
        }
      } else {
        // appTips.warningMsg('该节点下' + item.PropertyList.ComName + '组件数据不完整, 请前往编辑页面补全!');
      }
    }
  }
}

// 动态文本实时刷新
async function renderDynamicText(index) {
  let item = Controls.ControlList[index]
  let times = 0
  for (let i = 0; i < item.DataList.length; i++) {
    if (item.DataList[i].variable !== '选择') {
      if (item.DataList[i].CheckData) {
        await request.get(`/bi/${appId}/variables/${item.DataList[i].CheckData.equipmentId ? item.DataList[i].CheckData.equipmentId: item.DataList[i].CheckData.equipmentid}/${item.DataList[i].CheckData.id}/${item.DataList[i].CheckData.name}/status`).then(res => {
          // res.data.data[item.DataList[i].CheckData.id]= 0
          let Data = res.data.data[item.DataList[i].CheckData.name]
          if (JSON.stringify(res.data.data) !== "{}") {
            item.DataList[i].flag = transFlag(item.DataList[i].flag)
            if (item.DataList[i].flag === '=') {
              if (item.DataList[i].num == Data) {
                $(`#dynamictext-text${index}`).text(item.DataList[i].presetText)
                $(`#dynamictext-text${index}`).css('color', item.DataList[i].backColor)
                times++
              }
            } else if (item.DataList[i].flag === '>=') {
              if (Data >= item.DataList[i].num) {
                $(`#dynamictext-text${index}`).text(item.DataList[i].presetText)
                $(`#dynamictext-text${index}`).css('color', item.DataList[i].backColor)
                times++
              }
            } else if (item.DataList[i].flag === '<=') {
              if (Data <= item.DataList[i].num) {
                $(`#dynamictext-text${index}`).text(item.DataList[i].presetText)
                $(`#dynamictext-text${index}`).css('color', item.DataList[i].backColor)
                times++
              }
            } else if (item.DataList[i].flag === '>') {
              if (Data > item.DataList[i].num) {
                $(`#dynamictext-text${index}`).text(item.DataList[i].presetText)
                $(`#dynamictext-text${index}`).css('color', item.DataList[i].backColor)
                times++
              }
            } else if (item.DataList[i].flag === '<') {
              if (Data < item.DataList[i].num) {
                $(`#dynamictext-text${index}`).text(item.DataList[i].presetText)
                $(`#dynamictext-text${index}`).css('color', item.DataList[i].backColor)
                times++
              }
            } else if (item.DataList[i].flag === '!=') {
              if (item.DataList[i].num != Data) {
                $(`#dynamictext-text${index}`).text(item.DataList[i].presetText)
                $(`#dynamictext-text${index}`).css('color', item.DataList[i].backColor)
                times++
              }
            }
            if (i === item.DataList.length - 1 && times === 0) {
              $(`#dynamictext-text${index}`).text(item.DefaultText)
              $(`#dynamictext-text${index}`).css('color', item.DefaultColor)
            }
          } else {
            $(`#dynamictext-text${index}`).text(item.DefaultText)
            $(`#dynamictext-text${index}`).css('color', item.DefaultColor)
          }
        })
        if (times !== 0) {
          break
        }
      } else {
        // appTips.warningMsg('该节点下' + item.PropertyList.ComName + '组件数据不完整, 请前往编辑页面补全!');
      }
    }
  }
}

// 数值显示实时刷新
async function renderDataText(index) {
  let item = Controls.ControlList[index]
  let dight = item.DecimalDigits === null ? 0 : item.DecimalDigits 
  // if (item.conCheck) {
  let times = 0
  if (item.DataList.length !== 0) {
    for (let i = 0; i < item.DataList.length; i++) {
      if (item.CheckData && item.CheckData.name !== '') {
        await request.get(`/bi/${appId}/variables/${item.CheckData.equipmentId ? item.CheckData.equipmentId : item.CheckData.equipmentid}/${item.CheckData.id}/${item.CheckData.name}/status`).then(res => {
          // res.data.data[item.CheckData.name] = 1
          if (res.data.data) {
            try{
              res.data.data[item.CheckData.name] = res.data.data[item.CheckData.name].toFixed(dight)
            }catch(e){
              console.log('error')
            }
            let Data = res.data.data[item.CheckData.name]
            if (JSON.stringify(res.data.data) !== "{}") {
              item.DataList[i].flag = transFlag(item.DataList[i].flag)
              if (item.DataList[i].flag === '=') {
                if (item.DataList[i].num == Data) {
                  $(`#datatextblock${index}`).text(res.data.data[item.CheckData.name])
                  if (item.conCheck) {
                    $(`#datatextblock${index}`).css('color', item.DataList[i].backColor)
                  }
                  times++
                } else {
                  $(`#datatextblock${index}`).css('color', '#000')
                }
              } else if (item.DataList[i].flag === '>=') {
                if (Data >= item.DataList[i].num) {
                  $(`#datatextblock${index}`).text(res.data.data[item.CheckData.name])
                  if (item.conCheck) {
                    $(`#datatextblock${index}`).css('color', item.DataList[i].backColor)
                  }
                  times++
                } else {
                  $(`#datatextblock${index}`).css('color', '#000')
                }
              } else if (item.DataList[i].flag === '<=') {
                if (Data <= item.DataList[i].num) {
                  $(`#datatextblock${index}`).text(res.data.data[item.CheckData.name])
                  if (item.conCheck) {
                    $(`#datatextblock${index}`).css('color', item.DataList[i].backColor)
                  }
                  times++
                } else {
                  $(`#datatextblock${index}`).css('color', '#000')
                }
              } else if (item.DataList[i].flag === '>') {
                if (Data > item.DataList[i].num) {
                  $(`#datatextblock${index}`).text(res.data.data[item.CheckData.name])
                  if (item.conCheck) {
                    $(`#datatextblock${index}`).css('color', item.DataList[i].backColor)
                  }
                  times++
                } else {
                  $(`#datatextblock${index}`).css('color', '#000')
                }
              } else if (item.DataList[i].flag === '<') {
                if (Data < item.DataList[i].num) {
                  $(`#datatextblock${index}`).text(res.data.data[item.CheckData.name])
                  if (item.conCheck) {
                    $(`#datatextblock${index}`).css('color', item.DataList[i].backColor)
                  }
                  times++
                } else {
                  $(`#datatextblock${index}`).css('color', '#000')
                }
              } else if (item.DataList[i].flag === '!=') {
                if (item.DataList[i].num != Data) {
                  $(`#datatextblock${index}`).text(res.data.data[item.CheckData.name])
                  if (item.conCheck) {
                    $(`#datatextblock${index}`).css('color', item.DataList[i].backColor)
                  }
                  times++
                } else {
                  $(`#datatextblock${index}`).css('color', '#000')
                }
              }
              if (i === item.DataList.length - 1 && times === 0) {
                $(`#datatextblock${index}`).text(res.data.data[item.CheckData.name])
              }
            }
          }
        })

        if (times !== 0) {
          break
        }
      }
    }
  } else {
    await request.get(`/bi/${appId}/variables/${item.CheckData.equipmentId ? item.CheckData.equipmentId : item.CheckData.equipmentid}/${item.CheckData.id}/${item.CheckData.name}/status`).then(res => {
      // res.data.data[item.CheckData.name] = 1
      if (res.data.data) {
        try{
          res.data.data[item.CheckData.name] = res.data.data[item.CheckData.name].toFixed(dight)
        }catch(e){
          console.log('error')
        }

        let Data = res.data.data[item.CheckData.name]
        $(`#datatextblock${index}`).text(res.data.data[item.CheckData.name])
        if (item.conCheck) {
          $(`#datatextblock${index}`).css('color', '#000')
        }

      }
    })
  }
  // }
  if (item.dblCheck) {
    setTimeout(() => {
      $(`#dbl-datatextblock${index}`).dblclick(function () {
        dblOpen(item, index)
      })
    })
  }
}

// 动态图片实时刷新
async function renderImage(index) {
  let item = Controls.ControlList[index]
  if (item.ControlType === 'image') {
    let times = 0
    for (let i = 0; i < item.DataList.length; i++) {
      if (item.DataList[i].variable !== '选择') {
        if (item.DataList[i].CheckData) {
          await request.get(`/bi/${appId}/variables/${item.DataList[i].CheckData.equipmentId ? item.DataList[i].CheckData.equipmentId : item.DataList[i].CheckData.equipmentid}/${item.DataList[i].CheckData.id}/${item.DataList[i].CheckData.name}/status`).then(res => {
            if (res.data.data) {
              let Data = res.data.data[item.DataList[i].CheckData.name]
              if (JSON.stringify(res.data.data) !== "{}") {
                item.DataList[i].flag = transFlag(item.DataList[i].flag)
                if (item.DataList[i].flag === '=') {
                  if (Data == item.DataList[i].presetText) {
                    $(`#image-img${index}`).attr('src', item.DataList[i].img)
                    times++
                  }
                } else if (item.DataList[i].flag === '>=') {
                  if (Data >= item.DataList[i].presetText) {
                    $(`#image-img${index}`).attr('src', item.DataList[i].img)
                    times++
                  }
                } else if (item.DataList[i].flag === '<=') {
                  if (Data <= item.DataList[i].presetText) {
                    $(`#image-img${index}`).attr('src', item.DataList[i].img)
                    times++
                  }
                } else if (item.DataList[i].flag === '>') {
                  if (Data > item.DataList[i].presetText) {
                    $(`#image-img${index}`).attr('src', item.DataList[i].img)
                    times++
                  }
                } else if (item.DataList[i].flag === '<') {
                  if (Data < item.DataList[i].presetText) {
                    $(`#image-img${index}`).attr('src', item.DataList[i].img)
                    times++
                  }
                } else if (item.DataList[i].flag === '!=') {
                  if (item.DataList[i].presetText != Data) {
                    $(`#image-img${index}`).attr('src', item.DataList[i].img)
                    times++
                  }
                }
                if (i === item.DataList.length - 1 && times === 0) {
                  $(`#image-img${index}`).attr('src', item.DefaultImg)
                }
              } else {
                $(`#image-img${index}`).attr('src', item.DefaultImg)
              }
            }
          })
          if (times !== 0) {
            break
          }
        } else {
          // appTips.warningMsg('该节点下' + item.PropertyList.ComName + '组件数据不完整, 请前往编辑页面补全!');
        }
      }
    }
  }
}

function transFlag(str) {
  str = str.replace(/&gt;/, '>')
  str = str.replace(/&lt;/, '<')
  return str
}

// 清除折线图图表数据
function resetLineChart(name) {
  if (document.getElementById(`${name}`)) {
    let restChart = echarts.init(document.getElementById(`${name}`));
    let restChartOption = restChart.getOption()
    restChartOption.series.forEach((item, i) => {
      item.data = []
      restChartOption.legend[0].data[i] = []
    })
    restChart.setOption(restChartOption, true);
  }
}

function getTextWidth(str, fontSize) {
  let result = 60;
  let ele = document.createElement('span')
  //字符串中带有换行符时，会被自动转换成<br/>标签，若需要考虑这种情况，可以替换成空格，以获取正确的宽度
  //str = str.replace(/\\n/g,' ').replace(/\\r/g,' ');
  ele.innerText = str;
  //不同的大小和不同的字体都会导致渲染出来的字符串宽度变化，可以传入尽可能完备的样式信息
  ele.style.fontSize = fontSize;

  //由于父节点的样式会影响子节点，这里可按需添加到指定节点上
  document.documentElement.append(ele);

  result = ele.offsetWidth;

  document.documentElement.removeChild(ele);
  if (result < 60) {
    result = 60
  }

  return result;
}

function getBottomWidth (str) {
  str = str.length >= 6 ? str.substr(0, 6) : str
  let result = dataZoomVal;
  let ele = document.createElement('span')
  //字符串中带有换行符时，会被自动转换成<br/>标签，若需要考虑这种情况，可以替换成空格，以获取正确的宽度
  //str = str.replace(/\\n/g,' ').replace(/\\r/g,' ');
  ele.innerText = str;
  //由于父节点的样式会影响子节点，这里可按需添加到指定节点上
  document.documentElement.append(ele);

  result = ele.offsetWidth;
  document.documentElement.removeChild(ele);
  if (result < dataZoomVal) {
    result = dataZoomVal
  } else {
    result -= 18
  }
  return result
}

// 折线图实时刷新
function renderLineChart(item) {
  Controls.Data.LineChartItemList.forEach((c, cIndex) => {
    if (c.name === item.Name) {
      if (c.defaultDataConfig.datatype === '业务数据') { //业务数据
        let statisticsList = []
        let chartData = {}
        let whereData = []
        Controls.Data.LineChartItemList[cIndex].option.Variables.forEach((d, dIndex) => {
          chartData = {
            // statisticsType: d.rangevalue, // 统计类型
            table: c.defaultDataConfig.tablevalue,
            x: Controls.Data.LineChartItemList[cIndex].fieldData.FieldValue,
            // y: d.FieldValue,
            // format: c.defaultDataConfig.timedate,
          }
          statisticsList.push({
            field: d.FieldValue,
            statisticsType: d.rangevalue
          })
        })
        Controls.ControlList.forEach(item => {
          if (item.ControlType === 'associatedatetimepicker') {
            item.DateTimeType = changeDateFormat(item.DateTimeType)
            if (Controls.Data.LineChartItemList[cIndex].fieldData.CheckData.type === 'time') {
              chartData.format = item.DateTimeType
            }
            // let types = ['yyyy-MM', 'yyyy'] // 年、月结束时间不需要加一天
            // let value = ''
            // if (types.includes(item.DateTimeType)) {
            //   value = new Date(item.EndTime).getTime()
            // } else {
            //   value = new Date(item.EndTime).getTime() + 24 * 3600 * 1000
            // }
            let value = changeAddTime(item.DateTimeType, item.EndTime)
            item.EchartList.forEach(f => {
              if (f.name === c.name) {
                whereData.push({
                  and: [{
                      key: f.field,
                      queryType: "gte",
                      value: new Date(item.StartTime).getTime()
                    },
                    {
                      key: f.field,
                      queryType: "lte",
                      value,
                    }
                  ]
                })
              }
            })

          } else if (item.ControlType === 'datasearch') {
            item.EchartList.forEach(f => {
              if (f.name === c.name) {
                if (item.PropertyList.Num2 !== '') {
                  whereData.push({
                    and: [{
                        key: f.field,
                        queryType: 'gte',
                        value: item.PropertyList.Num1
                      },
                      {
                        key: f.field,
                        queryType: 'lte',
                        value: item.PropertyList.Num2
                      }
                    ]
                  })
                } else {
                  whereData.push({
                    and: [{
                      key: f.field,
                      queryType: item.PropertyList.datasetValue,
                      value: item.PropertyList.Num1
                    }]
                  })
                }
              }
            })
          } else if (item.ControlType === 'textsearch') {
            item.EchartList.forEach(f => {
              if (f.name === c.name) {
                whereData.push({
                  and: [{
                    key: f.field,
                    queryType: item.PropertyList.datasetValue,
                    value: item.PropertyList.Text
                  }]
                })
              }
            })
          } else if (item.ControlType === 'dropsearch') { // 下拉查询
            let types = ['ins', 'no_ins']
            item.EchartList.forEach(f => {
              if (f.name === c.name) {
                whereData.push({
                  and: [{
                    key: f.field,
                    queryType: item.PropertyList.datasetValue,
                    value: types.includes(item.PropertyList.datasetValue) ? item.ChoiceList : item.ChoiceList[0]
                  }]
                })
              }
            })
          }
        })
        chartData.statisticsList = statisticsList
        chartData.where = whereData
        if (chartData.where.length === 0) {
          // appTips.warningMsg('暂无数据，已还原为初始图表。请检查图表数据或关联查询组件是否已配置！', {
          //   time: 2000
          // })
          return
        }
        request.post(`/bi/${appId}/business/filed`, chartData).then(res => {
          if (res.data.code !== 0) {
            // 清除图表数据
            resetLineChart(c.name)
            // appTips.errorMsg(res.data.msg)
            return
          }
          let chart = {}
          if (document.getElementById(`${c.name}`)) {
            chart = echarts.init(document.getElementById(`${c.name}`));
            let a = chart.getOption();
            let keys = Object.keys(res.data.data).filter(f => f != 'x')
            // a.xAxis[0].data = res.data.data.x.flat(Infinity)
            a.xAxis[0].data = res.data.data.x.flat(Infinity).length > 0 ? res.data.data.x.flat(Infinity) : Controls.Data.LineChartItemList[cIndex].option.XData
            // a.legend[0].data = keys
            a.series = []
            let serireData = []
            keys.forEach((k, ki) => {
              serireData.push({
                name: a.legend[0].data[ki],
                data: res.data.data[k],
                type: 'line'
              })
            })
            let dateArr =  judegData(a.xAxis[0].data)
            let bottom = dataZoomVal
            if (dateArr.length > 0) {
              a.xAxis[0].axisLabel.rotate = -45
              // let leni = getMaxLen(a.xAxis[0].data)
              // bottom = getBottomWidth(a.xAxis[0].data[leni])
              bottom = getMaxWidth(dateArr)
            }
            a.dataZoom = addDataZoom()
            a.grid[0].bottom = bottom
            // a.grid[0].bottom = dataZoomVal
            a.series = serireData
            chart.setOption(a, true);
          }

        })

      } else if (c.defaultDataConfig.datatype === '实时数据') { // 实时数据 && 历史数据
        let variableSearchList = []
        let list = Controls.Data.LineChartItemList[cIndex].option.Variables
        for (let i = 0; i < list.length; i++) {
          let d = list[i]
          if (d.CheckData) {
            variableSearchList.push({
              deviceId: d.CheckData.equipmentId ? d.CheckData.equipmentId : d.CheckData.equipmentid,
              variableId: d.CheckData.id,
              variableName: d.CheckData.name
            })

          } else {
            return
          }
        }

        // Controls.Data.LineChartItemList[cIndex].option.Variables.forEach((d, dIndex) => {
        //   variableSearchList.push({
        //     deviceId: d.CheckData.equipmentId,
        //     variableId: d.CheckData.id,
        //     variableName: d.CheckData.name
        //   })
        // })

        let postData = {
          limit: c.DataCount,
          variableSearchList
        }
        request.post(`/bi/${appId}/variables/real-time/data`, postData).then(res => {
          if (res.data.code !== 0) {
            // 清除图表数据
            resetLineChart(c.name)
            // appTips.errorMsg(res.data.msg)
            return
          }
          c.defaultDataConfig.timedate = changerealTimeFormat(c.defaultDataConfig.timedate)

          res.data.data.x.forEach((rx, rxi) => { // 此处遍历修改x轴显示格式
            res.data.data.x[rxi] = dayjs(rx).format(c.defaultDataConfig.timedate)
          })
          let chart = {}
          if (document.getElementById(`${c.name}`)) {
            chart = echarts.init(document.getElementById(`${c.name}`));
            let a = chart.getOption();
            let keys = []
            Object.keys(res.data.data).filter(f => f != 'x').forEach(kk => {
              keys.push(kk.split(',')[1])
            })
            a.xAxis[0].data = res.data.data.x.flat(Infinity)
            // a.legend[0].data = keys
            
            let serireData = []
            let d = Controls.Data.LineChartItemList[cIndex].option.Variables
            let left = Controls.Data.LineChartItemList[cIndex].option.DrawContent.LeftMargin
            variableSearchList.forEach((k, ki) => {
              let dataList = res.data.data[k.deviceId + ',' + k.variableName]
              dataList = dataList.map(item1 => {
                if (item1) {
                  if (left <= getTextWidth(String(item1*100), 16)) {
                    left = getTextWidth(String(item1*100), 16)
                  }
                  item1 = item1.toFixed(d[ki].d ? d[ki].d : 0)
                }
                return item1
              })
              serireData.push({
                name: a.legend[0].data[ki],
                data: dataList,
                type: 'line',
                label: a.series[0].label,
                emphasis: a.series[0].emphasis
              });

            })
           
            if (Controls.Data.LineChartItemList[cIndex].option.Legend.Position == "RightCenter") {
              a.grid = {
                left: left,
                right: Controls.Data.LineChartItemList[cIndex].option.DrawContent.RightMargin
              }

            }
            a.series = []
            let dateArr =  judegData(a.xAxis[0].data)
            let bottom = dataZoomVal
            if (dateArr.length > 0) {
              a.xAxis[0].axisLabel.rotate = -45
              // let leni = getMaxLen(a.xAxis[0].data)
              // bottom = getBottomWidth(a.xAxis[0].data[leni])
              bottom = getMaxWidth(dateArr)
            }
            a.dataZoom = addDataZoom()
            a.grid.bottom = bottom
            // a.grid.bottom = dataZoomVal

            a.series = serireData
            chart.setOption(a, true);
          }

        })

      } else { // 历史数据
        let variableSearchList = []
        let seriesName = []
        // let list =  c.option.Variables
        // for(let i= 0;i<list.lenght;i++){
        //   let d = list[i]
        //   if(d.CheckData){
        //       variableSearchList.push({
        //     deviceId: d.CheckData.equipmentId,
        //     variableId: d.CheckData.id,
        //     variableName: d.CheckData.name
        //   })
        //   seriesName.push(d.DimensionName)

        //   }else{
        //     return

        //   }
        // }
        c.option.Variables.forEach(d => {
          variableSearchList.push({
            deviceId: d.CheckData.equipmentId ? d.CheckData.equipmentId : d.CheckData.equipmentid,
            variableId: d.CheckData.id,
            variableName: d.CheckData.name
          })
          seriesName.push(d.DimensionName)
        })

        if (c.defaultDataConfig.xaxistype === '变量') {
          let startTime = ''
          let endTime = ''
          Controls.ControlList.forEach(item => {
            if (item.ControlType === 'associatedatetimepicker') {
              item.HistoryList.forEach(f => {
                if (f.name === c.name) {
                  startTime = dayjs(item.StartTime).valueOf()
                  endTime = dayjs(item.EndTime).valueOf()
                }
              })

            } else if (item.ControlType === 'datasearch') {
              item.EchartList.forEach(f => {
                if (f.name === c.name) {
                  if (item.PropertyList.Num2 !== '') {
                    whereData.push({
                      and: [{
                          key: c.filed,
                          queryType: 'gte',
                          value: item.PropertyList.Num1
                        },
                        {
                          key: c.filed,
                          queryType: 'lte',
                          value: item.PropertyList.Num2
                        }
                      ]
                    })
                  } else {
                    whereData.push({
                      and: [{
                        key: c.filed,
                        queryType: item.PropertyList.datasetValue,
                        value: item.PropertyList.Num1
                      }]
                    })
                  }
                }
              })
            } else if (item.ControlType === 'textsearch') {
              item.EchartList.forEach(f => {
                if (f.name === c.name) {
                  whereData.push({
                    and: [{
                      key: c.filed,
                      queryType: item.PropertyList.datasetValue,
                      value: item.PropertyList.Text
                    }]
                  })
                }
              })
            } else if (item.ControlType === 'dropsearch') { // 下拉查询
              let types = ['ins', 'no_ins']
              item.EchartList.forEach(f => {
                if (f.name === c.name) {
                  whereData.push({
                    and: [{
                      key: c.filed,
                      queryType: item.PropertyList.datasetValue,
                      value: types.includes(item.PropertyList.datasetValue) ? item.ChoiceList : item.ChoiceList[0]
                    }]
                  })
                }
              })
            }
          })
          let postData = {
            endTime,
            // format: c.defaultDataConfig.timedate,
            statisticsType: c.defaultDataConfig.datavariable,
            startTime,
            variableSearchList,
            // x: c.defaultDataConfig.xaxistype === '变量' ? 'variableCode' : 'time',
          }

          request.post(`/bi/${appId}/variables/variable-code/history`, postData).then(res => {
            if (res.data.code !== 0) {
              // 清除图表数据
              resetLineChart(c.name)
              // appTips.errorMsg(res.data.msg)
              return
            }
            let chart = {}
            if (document.getElementById(`${c.name}`)) {
              chart = echarts.init(document.getElementById(`${c.name}`));
              let a = chart.getOption();
              let keys = []
              let left = Controls.Data.LineChartItemList[cIndex].option.DrawContent.LeftMargin
              let y = res.data.data.y
              res.data.data.x.forEach((kk, i) => {
                c.option.Variables.forEach(d => {
                  let name = d.CheckData.equipmentId ? d.CheckData.equipmentId : d.CheckData.equipmentid  + ',' + d.CheckData.name
                  if (name == kk) {
                    keys.push(d.DimensionName)
                    if (y[i]) {
                      y[i] = Number(y[i]).toFixed(d.d ? d.d : 0)
                      if (left <= getTextWidth(String(y[i]*100), 16)) {
                        left = getTextWidth(String(y[i]*100), 16)
                      }

                    }
                    

                  }

                })
                // keys.push(kk.split(',')[1])
              })
              if (Controls.Data.LineChartItemList[cIndex].option.Legend.Position == "RightCenter") {
                a.grid = {
                  left: left,
                  right: Controls.Data.LineChartItemList[cIndex].option.DrawContent.RightMargin
                }
  
              }
              let label = a.series[0].label
              let emphasis = a.series[0].emphasis

              a.xAxis[0].data = keys
              // a.legend[0].data = keys
              a.series = []
              a.series = [{
                data: y,
                type: 'line',
                label:label,
                emphasis: emphasis
              }]
              let dateArr =  judegData(a.xAxis[0].data)
              let bottom = dataZoomVal
              if (dateArr.length > 0) {
                a.xAxis[0].axisLabel.rotate = -45
                // let leni = getMaxLen(a.xAxis[0].data)
                // bottom = getBottomWidth(a.xAxis[0].data[leni])
                bottom = getMaxWidth(dateArr)
              }
              a.dataZoom = addDataZoom()
              a.grid.bottom = bottom
              // a.grid.bottom = dataZoomVal
              chart.setOption(a, true);
            }

          })

        } else {//时间
          // let date = getFormatDate(c.defaultDataConfig.timedate, c.DateLately)
          // let startTime = date.startDate
          // let endTime = date.endDate
          let startTime = ''
          let endTime = ''
          let format = ''
          Controls.ControlList.forEach(item => {
            if (item.ControlType === 'associatedatetimepicker') {
              item.DateTimeType = changeDateFormat(item.DateTimeType)
              format = item.DateTimeType
              item.HistoryList.forEach(f => {
                if (f.name === c.name) {
                  startTime = dayjs(item.StartTime).valueOf()
                  endTime = changeAddTime(item.DateTimeType, item.EndTime)
                }
              })

            }
          })


          let postData = {
            endTime,
            format,
            startTime,
            variableSearchList,
            // x: c.defaultDataConfig.xaxistype === '变量' ? 'variableCode' : 'time',
          }
          request.post(`/bi/${appId}/variables/all/data`, postData).then(res => {
            if (res.data.code !== 0) {
              // 清除图表数据
              resetLineChart(c.name)
              // appTips.errorMsg(res.data.msg)
              return
            }
            let chart = {}
            if (document.getElementById(`${c.name}`)) {
              chart = echarts.init(document.getElementById(`${c.name}`));
              let a = chart.getOption();
              let keys = []
              let left = Controls.Data.LineChartItemList[cIndex].option.DrawContent.LeftMargin
              Object.keys(res.data.data).filter(f => f != 'x').forEach(kk => {
                keys.push(kk.split(',')[1])
              })
              let newFormat = changerealTimeFormat(format)
              res.data.data.x.forEach((rx, rxi) => { // 此处遍历修改x轴显示格式
                res.data.data.x[rxi] = dayjs(rx).format(newFormat)
              })

              a.xAxis[0].data = res.data.data.x
              // a.legend[0].data = keys
              
              let serireData = []
              let d = Controls.Data.LineChartItemList[cIndex].option.Variables
              variableSearchList.forEach((k, ki) => {
                let dataList = res.data.data[k.deviceId + ',' + k.variableName]
                dataList = dataList.map(item1 => {
                  if (item1) {
                    if (left <= getTextWidth(String(item1*100), 16)) {
                      left = getTextWidth(String(item1*100), 16)
                    }
                    item1 = item1.toFixed(d[ki].d ? d[ki].d : 0)
                  }
                  return item1
                })
                serireData.push({
                  name: a.legend[0].data[ki],
                  data: dataList,
                  type: 'line',
                  label: a.series[0].label,
                  emphasis: a.series[0].emphasis
                });

              })
              if (Controls.Data.LineChartItemList[cIndex].option.Legend.Position == "RightCenter") {
                a.grid = {
                  left: left,
                  right: Controls.Data.LineChartItemList[cIndex].option.DrawContent.RightMargin
                }
  
              }
              a.series = []
              a.series = serireData
              chart.setOption(a, true);
            }

          })
        }

      }
    }
  })
}

// 清除柱状图图表数据
function resetBarChart(name) {
  if (document.getElementById(`${name}`)) {
    let restChart = echarts.init(document.getElementById(`${name}`));
    let restChartOption = restChart.getOption()
    restChartOption.series.forEach((item, i) => {
      item.data = []
      restChartOption.legend[0].data[i] = []
    })
    restChart.setOption(restChartOption, true);
  }
}

// 柱状图实时刷新
function renderBarChart(item) {
  Controls.Data.BarChartItemList.forEach((c, cIndex) => {
    if (c.name === item.Name) {
      if (c.defaultDataConfig.datatype === '业务数据') { //业务数据
        let statisticsList = []
        let chartData = {}
        let whereData = []
        Controls.Data.BarChartItemList[cIndex].option.Variables.forEach((d, dIndex) => {
          chartData = {
            // statisticsType: d.rangevalue, // 统计类型
            table: c.defaultDataConfig.tablevalue,
            x: Controls.Data.BarChartItemList[cIndex].fieldData.FieldValue,
            // y: d.FieldValue,
          }
          statisticsList.push({
            field: d.FieldValue,
            statisticsType: d.rangevalue
          })
        })
        Controls.ControlList.forEach(item => {
          if (item.ControlType === 'associatedatetimepicker') {
            item.DateTimeType = changeDateFormat(item.DateTimeType)
            if (Controls.Data.BarChartItemList[cIndex].fieldData.CheckData.type === 'time') {
              chartData.format = item.DateTimeType
            }
            let value = changeAddTime(item.DateTimeType, item.EndTime)
            item.EchartList.forEach(f => {
              if (f.name === c.name) {
                whereData.push({
                  and: [{
                      key: f.field,
                      queryType: "gte",
                      value: new Date(item.StartTime).getTime()
                    },
                    {
                      key: f.field,
                      queryType: "lte",
                      value,
                    }
                  ]
                })
              }
            })

          } else if (item.ControlType === 'datasearch') {
            item.EchartList.forEach(f => {
              if (f.name === c.name) {
                if (item.PropertyList.Num2 !== '') {
                  whereData.push({
                    and: [{
                        key: f.field,
                        queryType: 'gte',
                        value: item.PropertyList.Num1
                      },
                      {
                        key: f.field,
                        queryType: 'lte',
                        value: item.PropertyList.Num2
                      }
                    ]
                  })
                } else {
                  whereData.push({
                    and: [{
                      key: f.field,
                      queryType: item.PropertyList.datasetValue,
                      value: item.PropertyList.Num1
                    }]
                  })
                }
              }
            })
          } else if (item.ControlType === 'textsearch') {
            item.EchartList.forEach(f => {
              if (f.name === c.name) {
                whereData.push({
                  and: [{
                    key: f.field,
                    queryType: item.PropertyList.datasetValue,
                    value: item.PropertyList.Text
                  }]
                })
              }
            })
          } else if (item.ControlType === 'dropsearch') { // 下拉查询
            let types = ['ins', 'no_ins']
            item.EchartList.forEach(f => {
              if (f.name === c.name) {
                whereData.push({
                  and: [{
                    key: f.field,
                    queryType: item.PropertyList.datasetValue,
                    value: types.includes(item.PropertyList.datasetValue) ? item.ChoiceList : item.ChoiceList[0]
                  }]
                })
              }
            })
          }
        })
        chartData.statisticsList = statisticsList
        chartData.where = whereData
        if (chartData.where.length === 0) {
          // app.msg('暂无数据，已还原为初始图表。 请检查图表数据或关联查询组件是否已配置！', { time: 2000 })
          return
        }
        request.post(`/bi/${appId}/business/filed`, chartData).then(res => {
          if (res.data.code !== 0) {
            // 清除图表数据
            resetBarChart(c.name)
            // appTips.errorMsg(res.data.msg)
            return
          }


          let chart = {}
          if (document.getElementById(`${c.name}`)) {
            chart = echarts.init(document.getElementById(`${c.name}`));
            let a = chart.getOption();
            let keys = []
            Object.keys(res.data.data).filter(f => f != 'x').forEach(kk => {
              keys.push(kk)
            })
            let IsTime = Controls.Data.BarChartItemList[cIndex].option.IsTime
            let left = Controls.Data.BarChartItemList[cIndex].option.DrawContent.LeftMargin
            if (Controls.Data.BarChartItemList[cIndex].option.AxisChartYAxis.yAxisData) {
              a.yAxis[0].data = res.data.data.x.flat(Infinity).length > 0 ? res.data.data.x.flat(Infinity) : Controls.Data.BarChartItemList[cIndex].option.BarChartData.option.AxisChartYAxis.yAxisData
              // let list = res.data.data.x[0]
              let leni = getMaxLen(res.data.data.x)

              let list = res.data.data.x[leni]
                if (left <= getTextWidth(list, 16)) {
                  left = getTextWidth(list, 16)
                }
            } else {
              a.xAxis[0].data = res.data.data.x.flat(Infinity).length > 0 ? res.data.data.x.flat(Infinity) : Controls.Data.BarChartItemList[cIndex].option.XData

            }


            // a.legend[0].data = keys

           
            let serireData = []
            Controls.Data.BarChartItemList[cIndex].option.Variables.forEach((item, index) => {
              let value = item.FieldValue + ',' + item.rangevalue
              keys.forEach((k, ki) => {
                if (value == k) {
                  if (!IsTime) {
                    serireData.push({
                      name: item.DimensionName,
                      data: res.data.data[k],
                      stack: '堆积',
                      type: 'bar',
                      label: a.series[0].label,
                      emphasis: a.series[0].emphasis
                    })

                  } else {
                    serireData.push({
                      name: item.DimensionName,
                      data: res.data.data[k],
                      type: 'bar',
                      label: a.series[0].label,
                      emphasis: a.series[0].emphasis
                    })

                  }

                }
              })

            })
            if (Controls.Data.BarChartItemList[cIndex].option.Legend.Position == "RightCenter") {
              a.grid = {
                left:left,
                right:Controls.Data.BarChartItemList[cIndex].option.DrawContent.RightMargin,
                // containLabel:true
              }

            }
            a.series = []
            let dateArr =  judegData(a.xAxis[0].data)
            let bottom = dataZoomVal
            if (dateArr.length > 0) {
              a.xAxis[0].axisLabel.rotate = -45
              // let leni = getMaxLen(a.xAxis[0].data)
              // bottom = getBottomWidth(a.xAxis[0].data[leni])
              bottom = getMaxWidth(dateArr)
            }
            a.dataZoom = addDataZoom()
            a.grid.bottom = bottom
            // a.grid.bottom = dataZoomVal
            a.series = serireData
            chart.setOption(a, true);
          }

          // dd.getTime()+24*3600*1000
        })
      } else if (c.defaultDataConfig.datatype === '实时数据') { // 实时数据 && 历史数据
        let variableSearchList = []
        Controls.Data.BarChartItemList[cIndex].option.Variables.forEach((d, dIndex) => {
          variableSearchList.push({
            deviceId: d.CheckData.equipmentId ? d.CheckData.equipmentId : d.CheckData.equipmentid,
            variableId: d.CheckData.id,
            variableName: d.CheckData.name
          })
        })
        let postData = {
          limit: c.DataCount,
          variableSearchList
        }
        request.post(`/bi/${appId}/variables/real-time/data`, postData).then(res => {
          if (res.data.code !== 0) {
            // 清除图表数据
            resetBarChart(c.name)
            // appTips.errorMsg(res.data.msg)
            return
          }
          let chart = {}
          if (document.getElementById(`${c.name}`)) {
            chart = echarts.init(document.getElementById(`${c.name}`));
            let a = chart.getOption();
            let keys = []
            Object.keys(res.data.data).filter(f => f != 'x').forEach(kk => {
              keys.push(kk.split(',')[1])
            })
            c.defaultDataConfig.timedate = changerealTimeFormat(c.defaultDataConfig.timedate)
            res.data.data.x.forEach((rx, rxi) => { // 此处遍历修改x轴显示格式
              res.data.data.x[rxi] = dayjs(rx).format(c.defaultDataConfig.timedate)
            })


            // a.xAxis[0].data = res.data.data.x
            // a.legend[0].data = keys
           

            let serireData = []
            let d = Controls.Data.BarChartItemList[cIndex].option.Variables
            let IsTime = Controls.Data.BarChartItemList[cIndex].option.IsTime
            let  left = Controls.Data.BarChartItemList[cIndex].option.DrawContent.LeftMargin
            variableSearchList.forEach((k, ki) => {
              let dataList = res.data.data[k.deviceId + ',' + k.variableName]
              dataList = dataList.map(i => {
                if (i) {
                  if (left <= getTextWidth(String(i), 16)) {
                    left = getTextWidth(String(i), 16)
                  }
                  i = i.toFixed(d[ki].d ? d[ki].d : 0)
                }
                return i
              })
              if (!IsTime) {
                serireData.push({
                  name: d[ki].DimensionName,
                  data: dataList,
                  stack: '堆积',
                  type: 'bar',
                  label: a.series[0].label,
                  emphasis: a.series[0].emphasis

                });
              } else {
                serireData.push({
                  name: d[ki].DimensionName,
                  data: dataList,
                  type: 'bar',
                  label:  a.series[0].label,
                  emphasis: a.series[0].emphasis
                });
              }

            })
          //  a.yAxis[0].axisLabel = a.yAxis[0].axisLabel
          
            if (Controls.Data.BarChartItemList[cIndex].option.AxisChartYAxis.yAxisData) {
              a.yAxis[0].data = res.data.data.x ? res.data.data.x : Controls.Data.BarChartItemList[cIndex].option.BarChartData.option.AxisChartYAxis.yAxisData
              let list =  a.yAxis[0].data[0]
              if (left <= getTextWidth(list, 16)) {
                left = getTextWidth(list, 16)
              }

              // for (let i = 0; i < list.lenght; i++) {
              //   if (left <= getTextWidth(list[i], 16)) {
              //     left = getTextWidth(list[i], 16)
              //   }

              // }

            } else {
              a.xAxis[0].data = res.data.data.x ? res.data.data.x : Controls.Data.BarChartItemList[cIndex].option.XData

            }
            a.series = []
            // a.xAxis[0].axisLabel = {
            //   interval:0,//代表显示所有x轴标签显示
            //     rotate:45, //代表逆时针旋转45度
            // }
            // a.yAxis[0].axisLabel = {
            //   interval:0,//代表显示所有x轴标签显示
            //     rotate:45, //代表逆时针旋转45度
            // }
            if (Controls.Data.BarChartItemList[cIndex].option.Legend.Position == "RightCenter") {
              a.grid = {
                left: left,
                right: Controls.Data.BarChartItemList[cIndex].option.DrawContent.RightMargin
              }

            }

            a.yAxis.type = 'value'
            a.yAxis.scale = true
            let dateArr =  judegData(a.xAxis[0].data)
            let bottom = dataZoomVal
            if (dateArr.length > 0) {
              a.xAxis[0].axisLabel.rotate = -45
              // let leni = getMaxLen(a.xAxis[0].data)
              // bottom = getBottomWidth(a.xAxis[0].data[leni])
              bottom = getMaxWidth(dateArr)
            }
            a.dataZoom = addDataZoom()
            a.grid.bottom = bottom
            // a.grid.bottom = dataZoomVal
            a.series = serireData
            chart.setOption(a, true);
          }

        })

      } else { // 历史数据
        let variableSearchList = []
        let seriesName = []
        c.option.Variables.forEach(d => {
          variableSearchList.push({
            deviceId: d.CheckData.equipmentId ? d.CheckData.equipmentId : d.CheckData.equipmentid ,
            variableId: d.CheckData.id,
            variableName: d.CheckData.name,
          })
          seriesName.push(d.DimensionName)
        })
        if (c.defaultDataConfig.xaxistype === '变量') {
          let startTime = ''
          let endTime = ''
          Controls.ControlList.forEach(item => {
            if (item.ControlType === 'associatedatetimepicker') {
              item.HistoryList.forEach(f => {
                if (f.name === c.name) {
                  startTime = dayjs(item.StartTime).valueOf()
                  endTime = dayjs(item.EndTime).valueOf()
                }
              })

            } else if (item.ControlType === 'datasearch') {
              item.EchartList.forEach(f => {
                if (f.name === c.name) {
                  if (item.PropertyList.Num2 !== '') {
                    whereData.push({
                      and: [{
                          key: c.filed,
                          queryType: 'gte',
                          value: item.PropertyList.Num1
                        },
                        {
                          key: c.filed,
                          queryType: 'lte',
                          value: item.PropertyList.Num2
                        }
                      ]
                    })
                  } else {
                    whereData.push({
                      and: [{
                        key: c.filed,
                        queryType: item.PropertyList.datasetValue,
                        value: item.PropertyList.Num1
                      }]
                    })
                  }
                }
              })
            } else if (item.ControlType === 'textsearch') {
              item.EchartList.forEach(f => {
                if (f.name === c.name) {
                  whereData.push({
                    and: [{
                      key: c.filed,
                      queryType: item.PropertyList.datasetValue,
                      value: item.PropertyList.Text
                    }]
                  })
                }
              })
            } else if (item.ControlType === 'dropsearch') { // 下拉查询
              let types = ['ins', 'no_ins']
              item.EchartList.forEach(f => {
                if (f.name === c.name) {
                  whereData.push({
                    and: [{
                      key: c.filed,
                      queryType: item.PropertyList.datasetValue,
                      value: types.includes(item.PropertyList.datasetValue) ? item.ChoiceList : item.ChoiceList[0]
                    }]
                  })
                }
              })
            }
          })
          let postData = {
            endTime,
            // format: c.defaultDataConfig.timedate,
            statisticsType: c.defaultDataConfig.datavariable,
            startTime,
            variableSearchList,
            // x: c.defaultDataConfig.xaxistype === '变量' ? 'variableCode' : 'time',
          }
          request.post(`/bi/${appId}/variables/variable-code/history`, postData).then(res => {
            if (res.data.code !== 0) {
              // 清除图表数据
              resetBarChart(c.name)
              // appTips.errorMsg(res.data.msg)
              return
            }
            let chart = {}
            if (document.getElementById(`${c.name}`)) {
              chart = echarts.init(document.getElementById(`${c.name}`));
              let a = chart.getOption();
              let keys = []
              let y = res.data.data.y
              let yList = []
              let left = Controls.Data.BarChartItemList[cIndex].option.DrawContent.LeftMargin
              res.data.data.x.forEach((rx, i) => {
                // keys.push(rx.split(',')[1])
                c.option.Variables.forEach(d => {
                  let name = d.CheckData.equipmentId ?d.CheckData.equipmentId: d.CheckData.equipmentid  + ',' + d.CheckData.name
                  if (name == rx) {
                    keys.push(d.DimensionName)
                    if (y[i]) {
                      y[i] = Number(y[i]).toFixed(d.d ? d.d : 0)
                      yList.push({
                        value: y[i],
                        itemStyle: {
                          color: d.Color.HtmlColor
                        }
                      })
                      if(left <= getTextWidth(String(y[i]*100), 16)){
                        left = getTextWidth(String(y[i]*100), 16)
                      }
                      // yList.push({
                      //   name: d.DimensionName,
                      //   data: y[i],
                      //   type: 'bar'
                      // })
                    }
                  }
                })
              })
              // let d = Controls.Data.BarChartItemList[cIndex].option.Variables
              let IsTime = Controls.Data.BarChartItemList[cIndex].option.IsTime
             
              if (Controls.Data.BarChartItemList[cIndex].option.AxisChartYAxis.yAxisData) {
                a.yAxis[0].data = keys ? keys : Controls.Data.BarChartItemList[cIndex].option.BarChartData.option.AxisChartYAxis.yAxisData
                let list =  a.yAxis[0].data
                for(let i = 0;i<list.lenght;i++){
                  if(left <= getTextWidth(String(list[i]), 16)){
                    left = getTextWidth(String(list[i]), 16)
                  }
                }

              } else {
                a.xAxis[0].data = keys ? keys : Controls.Data.BarChartItemList[cIndex].option.XData

              }
              a.grid = {
                left: left,
                right: Controls.Data.BarChartItemList[cIndex].option.DrawContent.RightMargin
              }
              // a.xAxis[0].data = keys
              // a.legend[0].data = keys
              a.tooltip = {
                  trigger: 'axis',
                },
                a.series = []
              if (!IsTime) {
                a.series = [{
                  name: '',
                  data: yList,
                  stack: '堆积',
                  type: 'bar'
                }]

              } else {
                a.series = [{
                  name: '',
                  data: yList,
                  type: 'bar'
                }]
              }

              let dateArr =  judegData(a.xAxis[0].data)
              let bottom = dataZoomVal
              if (dateArr.length > 0) {
                a.xAxis[0].axisLabel.rotate = -45
                // let leni = getMaxLen(a.xAxis[0].data)
                // bottom = getBottomWidth(a.xAxis[0].data[leni])
                bottom = getMaxWidth(dateArr)
              }
              a.dataZoom = addDataZoom()
              a.grid.bottom = bottom
              // a.grid.bottom = dataZoomVal

              // a.series = yList
              chart.setOption(a, true);
            }

          })

        } else {
          // let date = getFormatDate(c.defaultDataConfig.timedate, c.DateLately)
          // let startTime = date.startDate
          // let endTime = date.endDate
          let startTime = ''
          let endTime = ''
          let format = ''

          Controls.ControlList.forEach(item => {
            if (item.ControlType === 'associatedatetimepicker') {
              item.DateTimeType = changeDateFormat(item.DateTimeType)
              format = item.DateTimeType
              item.HistoryList.forEach(f => {
                if (f.name === c.name) {
                  startTime = dayjs(item.StartTime).valueOf()
                  endTime = changeAddTime(item.DateTimeType, item.EndTime)
                }
              })

            }
          })

          let postData = {
            endTime,
            format,
            startTime,
            variableSearchList,
            // x: c.defaultDataConfig.xaxistype === '变量' ? 'variableCode' : 'time',
          }
          request.post(`/bi/${appId}/variables/all/data`, postData).then(res => {
            if (res.data.code !== 0) {
              // 清除图表数据
              resetBarChart(c.name)
              // appTips.errorMsg(res.data.msg)
              return
            }
            let chart = {}
            if (document.getElementById(`${c.name}`)) {
              chart = echarts.init(document.getElementById(`${c.name}`));
              let a = chart.getOption();
              let keys = []
              Object.keys(res.data.data).filter(f => f != 'x').forEach(kk => {
                keys.push(kk.split(',')[1])
              })
              let newFormat = changerealTimeFormat(format)
              res.data.data.x.forEach((rx, rxi) => { // 此处遍历修改x轴显示格式
                res.data.data.x[rxi] = dayjs(rx).format(newFormat)
              })
              let left = Controls.Data.BarChartItemList[cIndex].option.DrawContent.LeftMargin
              let IsTime = Controls.Data.BarChartItemList[cIndex].option.IsTime
              if (Controls.Data.BarChartItemList[cIndex].option.AxisChartYAxis.yAxisData) {
                a.yAxis[0].data = res.data.data.x ? res.data.data.x : Controls.Data.BarChartItemList[cIndex].option.BarChartData.option.AxisChartYAxis.yAxisData
                let list = res.data.data.x
                left = getTextWidth(String(list[0]), 16)
              } else {
                a.xAxis[0].data = res.data.data.x ? res.data.data.x : Controls.Data.BarChartItemList[cIndex].option.XData


              }


              // a.xAxis[0].data = res.data.data.x
              // a.legend[0].data = keys
              a.series = []
              let serireData = []
              variableSearchList.forEach((k, ki) => {
                if (!IsTime) {
                  serireData.push({
                    name: a.legend[0].data[ki],
                    data: res.data.data[k.deviceId + ',' + k.variableName],
                    stack: '堆积',
                    type: 'bar'
                  });

                } else {
                  serireData.push({
                    name: a.legend[0].data[ki],
                    data: res.data.data[k.deviceId + ',' + k.variableName],
                    type: 'bar'
                  });
                }
              })
              a.grid = {
                left: left,
                right: Controls.Data.BarChartItemList[cIndex].option.DrawContent.RightMargin
              }
              a.series = serireData
              chart.setOption(a, true);
            }

          })
        }
      }
    }
  })
}

// 清除仪表盘图表数据
function resetDashboartChart(name) {
  if (document.getElementById(`${name}`)) {
    let restChart = echarts.init(document.getElementById(`${name}`));
    let restChartOption = restChart.getOption()
    // restChartOption.series.forEach((item, i) => {
    //   item.data[i] = {value:0, name: '无'}
    // })
    restChartOption.series[0].data[0] = {
      value: 0,
      name: '暂无数据'
    }
    restChart.setOption(restChartOption, true);
  }
}

//  仪表盘实时刷新
function renderDashChart(item) {
  Controls.Data.DashBoardChartItemList.forEach((c, cIndex) => {
    if (c.name === item.Name) {
      if (c.defaultDataConfig.datatype === '实时数据') {
        let postData = []
        if (Controls.Data.DashBoardChartItemList[cIndex].option.Variable.CheckData) {
          postData = [{
            deviceId: Controls.Data.DashBoardChartItemList[cIndex].option.Variable.CheckData.equipmentId ? Controls.Data.DashBoardChartItemList[cIndex].option.Variable.CheckData.equipmentId : Controls.Data.DashBoardChartItemList[cIndex].option.Variable.CheckData.equipmentid,
            variableCode: Controls.Data.DashBoardChartItemList[cIndex].option.Variable.CheckData.name,
            variableId: Controls.Data.DashBoardChartItemList[cIndex].option.Variable.CheckData.id
          }]
        } else {
          return
        }

        request.post(`/bi/${appId}/variables/status/real-time/data`, postData).then(res => {
          if (res.data.code !== 0) {
            // 清除图表数据
            resetDashboartChart(c.name)
            // appTips.errorMsg(res.data.msg)
            return
          }
          let chart = {}
          if (document.getElementById(`${c.name}`)) {
            chart = echarts.init(document.getElementById(`${c.name}`));
            let a = chart.getOption();
            let keys = []
            Object.keys(res.data.data).filter(f => f != 'x').forEach(kk => {
              keys.push(kk)
            })
            let serireData = []
            let d = Controls.Data.DashBoardChartItemList[cIndex].option.Variable
            postData.forEach((k, ki) => {
              // a.series[a.series.length - 1].min = Math.min(res.data.data[k.deviceId][k.variableCode])
              // a.series[a.series.length - 1].max = Math.max(res.data.data[k.deviceId][k.variableCode])
              // a.series[0].min = Math.min(res.data.data[k.deviceId][k.variableCode])
              // a.series[0].max = Math.max(res.data.data[k.deviceId][k.variableCode])
              serireData.push({
                value: res.data.data[k.deviceId][k.variableCode] ? res.data.data[k.deviceId][k.variableCode].toFixed(d.d ? d.d : 0) : 0,
                /* name: d.DimensionName */
              });

            })
            a.series[a.series.length - 1].data = serireData
            a.series[0].data = serireData
            a.series[0].detail.color = c.option.Variable.Tooltip.SeriesDetailColor ? c.option.Variable.Tooltip.SeriesDetailColor : '#000'
            chart.setOption(a, true);

          }

        })
      } else if (c.defaultDataConfig.datatype === '历史数据') { // 实时数据 && 历史数据
        let variableSearchList = []
        if (Controls.Data.DashBoardChartItemList[cIndex].option.Variable.CheckData) {
          variableSearchList = [{
            deviceId: Controls.Data.DashBoardChartItemList[cIndex].option.Variable.CheckData.equipmentId ? Controls.Data.DashBoardChartItemList[cIndex].option.Variable.CheckData.equipmentId : Controls.Data.DashBoardChartItemList[cIndex].option.Variable.CheckData.equipmentid,
            variableId: Controls.Data.DashBoardChartItemList[cIndex].option.Variable.CheckData.id,
            variableName: Controls.Data.DashBoardChartItemList[cIndex].option.Variable.CheckData.name
          }]
        } else {
          return
        }

        // let date =  getFormatDate(c.defaultDataConfig.timedate, c.DateLately)
        let startTime = ''
        let endTime = ''
        let format = ''
        Controls.ControlList.forEach(item => {
          if (item.ControlType === 'associatedatetimepicker') {
            item.HistoryList.forEach(f => {
              if (f.name === c.name) {
                format = item.DateTimeType
                startTime = dayjs(item.StartTime).valueOf()
                endTime = dayjs(item.EndTime).valueOf()
              }
            })

          } else if (item.ControlType === 'datasearch') {
            item.EchartList.forEach(f => {
              if (f.name === c.name) {
                if (item.PropertyList.Num2 !== '') {
                  whereData.push({
                    and: [{
                        key: c.filed,
                        queryType: 'gte',
                        value: item.PropertyList.Num1
                      },
                      {
                        key: c.filed,
                        queryType: 'lte',
                        value: item.PropertyList.Num2
                      }
                    ]
                  })
                } else {
                  whereData.push({
                    and: [{
                      key: c.filed,
                      queryType: item.PropertyList.datasetValue,
                      value: item.PropertyList.Num1
                    }]
                  })
                }
              }
            })
          } else if (item.ControlType === 'textsearch') {
            item.EchartList.forEach(f => {
              if (f.name === c.name) {
                whereData.push({
                  and: [{
                    key: c.filed,
                    queryType: item.PropertyList.datasetValue,
                    value: item.PropertyList.Text
                  }]
                })
              }
            })
          } else if (item.ControlType === 'dropsearch') { // 下拉查询
            let types = ['ins', 'no_ins']
            item.EchartList.forEach(f => {
              if (f.name === c.name) {
                whereData.push({
                  and: [{
                    key: c.filed,
                    queryType: item.PropertyList.datasetValue,
                    value: types.includes(item.PropertyList.datasetValue) ? item.ChoiceList : item.ChoiceList[0]
                  }]
                })
              }
            })
          }
        })
        let postData = {
          endTime,
          format,
          startTime,
          statisticsType: c.option.Variable.rangevalue,
          variableSearchList
          // x: c.defaultDataConfig.xaxistype === '变量' ? 'variableCode' : 'time',
        }
        request.post(`/bi/${appId}/variables/variable-code/history`, postData).then(res => {
          if (res.data.code !== 0) {
            // 清除图表数据
            resetDashboartChart(c.name)
            // appTips.errorMsg(res.data.msg)
            return
          }
          let chart = {}
          if (document.getElementById(`${c.name}`)) {
            chart = echarts.init(document.getElementById(`${c.name}`));
            let a = chart.getOption();
            let keys = []
            Object.keys(res.data.data).filter(f => f != 'x').forEach(kk => {
              keys.push(kk.split(',')[1])
            })
            let serireData = []
            let d = Controls.Data.DashBoardChartItemList[cIndex].option.Variable
            // variableSearchList.forEach((k, ki) => {
            //   // a.series[a.series.length - 1].min = Math.min(...res.data.data[k.deviceId+','+k.variableName])
            //   // a.series[a.series.length - 1].max = Math.max(...res.data.data[k.deviceId+','+k.variableName])
            //   // a.series[0].min = Math.min(...res.data.data[k.deviceId+','+k.variableName])
            //   // a.series[0].max = Math.max(...res.data.data[k.deviceId+','+k.variableName])
            //   serireData.push({
            //     value: res.data.data[k.deviceId + ',' + k.variableName] ? Number(res.data.data[k.deviceId + ',' + k.variableName]).toFixed(d.d?d.d:0) : 0,
            //     name:d.DimensionName
            //   });

            if (res.data.data) {
              let dashData = res.data.data
              dashData.x.forEach((item, index) => {
                // variableSearchList.forEach((k, ki) => {
                let name = d.CheckData.equipmentId ? d.CheckData.equipmentId: d.CheckData.equipmentid + ',' + d.CheckData.name
                if (item == name)
                  serireData.push({
                    value: dashData.y[index] ? Number(dashData.y[index]).toFixed(d.d ? d.d : 0) : 0,
                    /* name: d.DimensionName */
                  });

                // })
              })
            }

            // })
            a.series[a.series.length - 1].data = serireData
            a.series[0].data = serireData
            a.series[0].detail.color = c.option.Variable.Tooltip.SeriesDetailColor ? c.option.Variable.Tooltip.SeriesDetailColor : '#000'
            chart.setOption(a, true);
          }

        })

      } else if (c.defaultDataConfig.datatype === '业务数据') { //业务数据
        let statisticsList = []
        let chartData = {}
        let whereData = []
        Controls.Data.DashBoardChartItemList[cIndex].option.Variable
        chartData = {
          table: c.defaultDataConfig.tablevalue,
        }
        statisticsList.push({
          field: Controls.Data.DashBoardChartItemList[cIndex].option.Variable.FieldValue,
          statisticsType: Controls.Data.DashBoardChartItemList[cIndex].option.Variable.rangevalue
        })
        Controls.ControlList.forEach(item => {
          if (item.ControlType === 'associatedatetimepicker') {
            item.DateTimeType = changeDateFormat(item.DateTimeType)
            // if (Controls.Data.DashBoardChartItemList[cIndex].fieldData.CheckData.type === 'time') {
            //   chartData.format = item.DateTimeType
            // }
            let value = changeAddTime(item.DateTimeType, item.EndTime)
            item.EchartList.forEach(f => {
              if (f.name === c.name) {
                whereData.push({
                  and: [{
                      key: f.field,
                      queryType: "gte",
                      value: new Date(item.StartTime).getTime()
                    },
                    {
                      key: f.field,
                      queryType: "lte",
                      value,
                    }
                  ]
                })
              }
            })

          } else if (item.ControlType === 'datasearch') {
            item.EchartList.forEach(f => {
              if (f.name === c.name) {
                if (item.PropertyList.Num2 !== '') {
                  whereData.push({
                    and: [{
                        key: f.field,
                        queryType: 'gte',
                        value: item.PropertyList.Num1
                      },
                      {
                        key: f.field,
                        queryType: 'lte',
                        value: item.PropertyList.Num2
                      }
                    ]
                  })
                } else {
                  whereData.push({
                    and: [{
                      key: f.field,
                      queryType: item.PropertyList.datasetValue,
                      value: item.PropertyList.Num1
                    }]
                  })
                }
              }
            })
          } else if (item.ControlType === 'textsearch') {
            item.EchartList.forEach(f => {
              if (f.name === c.name) {
                whereData.push({
                  and: [{
                    key: f.field,
                    queryType: item.PropertyList.datasetValue,
                    value: item.PropertyList.Text
                  }]
                })
              }
            })
          } else if (item.ControlType === 'dropsearch') { // 下拉查询
            let types = ['ins', 'no_ins']
            item.EchartList.forEach(f => {
              if (f.name === c.name) {
                whereData.push({
                  and: [{
                    key: f.field,
                    queryType: item.PropertyList.datasetValue,
                    value: types.includes(item.PropertyList.datasetValue) ? item.ChoiceList : item.ChoiceList[0]
                  }]
                })
              }
            })
          }
        })
        chartData.statisticsList = statisticsList
        chartData.where = whereData
        if (chartData.where.length === 0) {
          // app.msg('暂无数据，已还原为初始图表。 请检查图表数据或关联查询组件是否已配置！',{time: 2000})
          return
        }
        request.post(`/bi/${appId}/business/data/field/statistics`, chartData).then(res => {
          if (res.data.code !== 0) {
            // 清除图表数据
            resetDashboartChart(c.name)
            // app.msg(res.data.msg)
            return
          }
          let chart = {}
          if (document.getElementById(`${c.name}`)) {
            chart = echarts.init(document.getElementById(`${c.name}`));
            let a = chart.getOption();
            let keys = []
            Object.keys(res.data.data).filter(f => f != 'x').forEach(kk => {
              keys.push(kk)
            })
            let serireData = []
            let d = Controls.Data.DashBoardChartItemList[cIndex].option.Variable
            chartData.statisticsList.forEach((k, ki) => {
              // a.series[a.series.length - 1].min = Math.min(res.data.data[k.field + "," + [k.statisticsType]])
              // a.series[a.series.length - 1].max = Math.max(res.data.data[k.field] + "," + [k.statisticsType])
              // a.series[0].min = Math.min(res.data.data[k.field + "," + [k.statisticsType]])
              // a.series[0].max = Math.max(res.data.data[k.field + "," + [k.statisticsType]])
              serireData.push({
                value: res.data.data[k.field + "," + [k.statisticsType]] ? res.data.data[k.field + "," + [k.statisticsType]] : 0,
                /* name: d.DimensionName */
              });

            })
            a.series[a.series.length - 1].data = serireData
            a.series[0].data = serireData
            a.series[0].detail.color = c.option.Variable.Tooltip.SeriesDetailColor ? c.option.Variable.Tooltip.SeriesDetailColor : '#000'
            chart.setOption(a, true);
          }

          // dd.getTime()+24*3600*1000
        })
      }

    }
  })
}

// 清除饼图图表数据
function resetPieChart(name) {
  if (document.getElementById(`${name}`)) {
    let restChart = echarts.init(document.getElementById(`${name}`));
    let restChartOption = restChart.getOption()
    restChartOption.series[0].data.forEach((item, i) => {
      item.value = '暂无数据'
      item.name = ''
    })
    restChart.setOption(restChartOption, true);
  }
}

// 饼图实时刷新
function renderPieChart(item) {
  Controls.Data.PieChartItemList.forEach((c, cIndex) => {
    if (c.name === item.Name) {
      if (c.defaultDataConfig.datatype === '实时数据') {
        let postData = []
        let list = Controls.Data.PieChartItemList[cIndex].option.Variables
        for (let i = 0; i < list.length; i++) {
          let cf = list[i]
          if (cf.CheckData) {
            postData.push({
              deviceId: cf.CheckData.equipmentId ? cf.CheckData.equipmentId : cf.CheckData.equipmentid,
              variableCode: cf.CheckData.name,
              variableId: cf.CheckData.id,
            })
          } else {
            return
          }
        }
        // Controls.Data.PieChartItemList[cIndex].option.Variables.forEach(cf => {
        // if(cf.CheckData){
        //   postData.push({
        //     deviceId: cf.CheckData.equipmentId,
        //     variableCode: cf.CheckData.name,
        //     variableId: cf.CheckData.id,
        //   })
        // }else{
        //   return
        // }

        // })
        request.post(`/bi/${appId}/variables/status/real-time/data`, postData).then(res => {
          if (res.data.code !== 0) {
            // 清除图表数据
            resetPieChart(c.name)
            // appTips.errorMsg(res.data.msg)
            return
          }
          let chart = {}
          if (document.getElementById(`${c.name}`)) {
            chart = echarts.init(document.getElementById(`${c.name}`));
            let a = chart.getOption()
            let prop = []
            let keys = []
            let serireData = []
            if (res.data.data) {
              Object.keys(res.data.data).filter(f => f != 'x').forEach(kk => {
                prop.push(kk)
              })

              // keys = Object.keys(res.data.data[prop])
              // a.legend[0].data = keys

              let d = Controls.Data.PieChartItemList[cIndex].option.Variables
              // for(let ki = 0 ;ki<postData.length ;ki++){
              //   let k = postData[ki]
              //   let value = res.data.data[k.deviceId][k.variableCode]
              //   if (value) {
              //     value.toFixed(d[ki] ? d[ki] : 0)
              //   }
              //   let data1 = a.series[0].data[0]
              //   data1.value = value
              //   data1.name = a.legend[0].data[ki]
              //   // let data2 = $.extend(data1,data)
              //   serireData.push(data1)

              // }
              postData.forEach((k, ki) => {
                let value = res.data.data[k.deviceId][k.variableCode]
                if (value) {
                  value.toFixed(d[ki] ? d[ki] : 0)
                }
                serireData.push({
                  value: value,
                  name: a.legend[0].data[ki],
                  label: a.series[0].data[ki].label,
                  emphasis: a.series[0].data[ki].emphasis
                })
              })
            } else {
              serireData.push({
                value: '',
                name: '暂无数据'
              })
            }
            a.series[0].data = $.extend(a.series[0].data, serireData)
            chart.setOption(a, true);
          }

        })

      } else if (c.defaultDataConfig.datatype === '历史数据') { // 实时数据 && 历史数据
        let variableSearchList = []
        let list = Controls.Data.PieChartItemList[cIndex].option.Variables
        for (let i = 0; i < list.length; i++) {
          let d = list[i]
          if (d.CheckData) {
            variableSearchList.push({
              deviceId: d.CheckData.equipmentId ? d.CheckData.equipmentId : d.CheckData.equipmentid,
              variableId: d.CheckData.id,
              variableName: d.CheckData.name
            })
          } else {
            return
          }
        }
        // Controls.Data.PieChartItemList[cIndex].option.Variables.forEach((d, dIndex) => {
        //   if(d.CheckData){
        //     variableSearchList.push({
        //       deviceId: d.CheckData.equipmentId,
        //       variableId: d.CheckData.id,
        //       variableName: d.CheckData.name
        //     })
        //   }else{
        //     return
        //   }

        // })

        // let date =  getFormatDate(c.defaultDataConfig.timedate, c.DateLately)
        // let startTime = date.startDate
        // let endTime = date.endDate
        let startTime = ''
        let endTime = ''
        let format = ''
        Controls.ControlList.forEach(item => {
          if (item.ControlType === 'associatedatetimepicker') {
            item.HistoryList.forEach(f => {
              if (f.name === c.name) {
                format = item.DateTimeType
                startTime = dayjs(item.StartTime).valueOf()
                endTime = dayjs(item.EndTime).valueOf()
              }
            })

          } else if (item.ControlType === 'datasearch') {
            item.EchartList.forEach(f => {
              if (f.name === c.name) {
                if (item.PropertyList.Num2 !== '') {
                  whereData.push({
                    and: [{
                        key: c.filed,
                        queryType: 'gte',
                        value: item.PropertyList.Num1
                      },
                      {
                        key: c.filed,
                        queryType: 'lte',
                        value: item.PropertyList.Num2
                      }
                    ]
                  })
                } else {
                  whereData.push({
                    and: [{
                      key: c.filed,
                      queryType: item.PropertyList.datasetValue,
                      value: item.PropertyList.Num1
                    }]
                  })
                }
              }
            })
          } else if (item.ControlType === 'textsearch') {
            item.EchartList.forEach(f => {
              if (f.name === c.name) {
                whereData.push({
                  and: [{
                    key: c.filed,
                    queryType: item.PropertyList.datasetValue,
                    value: item.PropertyList.Text
                  }]
                })
              }
            })
          } else if (item.ControlType === 'dropsearch') { // 下拉查询
            let types = ['ins', 'no_ins']
            item.EchartList.forEach(f => {
              if (f.name === c.name) {
                whereData.push({
                  and: [{
                    key: c.filed,
                    queryType: item.PropertyList.datasetValue,
                    value: types.includes(item.PropertyList.datasetValue) ? item.ChoiceList : item.ChoiceList[0]
                  }]
                })
              }
            })
          }
        })
        let postData = {
          endTime,
          format,
          startTime,
          statisticsType: c.defaultDataConfig.datavariable,
          variableSearchList,
          // x: c.defaultDataConfig.xaxistype === '变量' ? 'variableCode' : 'time',
        }
        request.post(`/bi/${appId}/variables/variable-code/history`, postData).then(res => {
          if (res.data.code !== 0) {
            // 清除图表数据
            resetPieChart(c.name)
            // appTips.errorMsg(res.data.msg)
            return
          }
          let chart = {}
          if (document.getElementById(`${c.name}`)) {
            chart = echarts.init(document.getElementById(`${c.name}`));
            let a = chart.getOption();
            // a.backgroundColor = 'red'
            let keys = []
            // a.legend[0].data = keys
            if (res.data.data) {
              Object.keys(res.data.data).filter(f => f != 'x').forEach(kk => {
                keys.push(kk.split(',')[1])
              })

            }
            let serireData = []
            let titleData = []
            if (res.data.data && res.data.data.x) {
              res.data.data.x.forEach((xf, xfi) => {
                Controls.Data.PieChartItemList[cIndex].option.Variables.forEach((d, dIndex) => {
                  let name = d.CheckData.equipmentId ? d.CheckData.equipmentId : d.CheckData.equipmentid + ',' + d.CheckData.name
                  if (name == xf) {
                    serireData.push({
                      value: res.data.data.y[xfi] === null ? 0 : Number(res.data.data.y[xfi]).toFixed(d.d ? d.d : 0),
                      name: d.DimensionName,
                      label: a.series[0].data[0].label,
                      emphasis: a.series[0].data[0].emphasis
                    });
                    titleData.push(d.DimensionName)

                  }

                })

              })
              a.legend[0].data = titleData
              a.series[0].data = serireData
            }
            // variableSearchList.forEach((k, ki) => {
            //   if (res.data.data) {
            //     res.data.data[k.deviceId + ',' + k.variableName].forEach((r, ri) => {
            //       serireData.push({
            //         value: r,
            //         name: a.legend[0].data[ki]
            //       });
            //     })
            //   }
            // })

            chart.setOption(a, true);
          }

        })

      } else { // 业务数据
        let statisticsList = []
        let chartData = {}
        let whereData = []
        Controls.Data.PieChartItemList[cIndex].option.Variables.forEach((d, dIndex) => {
          chartData = {
            // statisticsType: d.rangevalue, // 统计类型
            table: c.defaultDataConfig.tablevalue,
            x: Controls.Data.PieChartItemList[cIndex].fieldData.FieldValue,
            // y: d.FieldValue,
            // format: c.defaultDataConfig.timedate,
          }
          statisticsList.push({
            field: d.FieldValue,
            statisticsType: d.rangevalue
          })
        })
        Controls.ControlList.forEach(item => {
          if (item.ControlType === 'associatedatetimepicker') {
            item.DateTimeType = changeDateFormat(item.DateTimeType)
            if (Controls.Data.PieChartItemList[cIndex].fieldData.CheckData.type === 'time') {
              chartData.format = item.DateTimeType
            }
            let value = changeAddTime(item.DateTimeType, item.EndTime)
            item.EchartList.forEach(f => {
              if (f.name === c.name) {
                whereData.push({
                  and: [{
                      key: f.field,
                      queryType: "gte",
                      value: new Date(item.StartTime).getTime()
                    },
                    {
                      key: f.field,
                      queryType: "lte",
                      value
                    }
                  ]
                })
              }
            })

          } else if (item.ControlType === 'datasearch') {
            item.EchartList.forEach(f => {
              if (f.name === c.name) {
                if (item.PropertyList.Num2 !== '') {
                  whereData.push({
                    and: [{
                        key: f.field,
                        queryType: 'gte',
                        value: item.PropertyList.Num1
                      },
                      {
                        key: f.field,
                        queryType: 'lte',
                        value: item.PropertyList.Num2
                      }
                    ]
                  })
                } else {
                  whereData.push({
                    and: [{
                      key: f.field,
                      queryType: item.PropertyList.datasetValue,
                      value: item.PropertyList.Num1
                    }]
                  })
                }
              }
            })
          } else if (item.ControlType === 'textsearch') {
            item.EchartList.forEach(f => {
              if (f.name === c.name) {
                whereData.push({
                  and: [{
                    key: f.field,
                    queryType: item.PropertyList.datasetValue,
                    value: item.PropertyList.Text
                  }]
                })
              }
            })
          } else if (item.ControlType === 'dropsearch') { // 下拉查询
            let types = ['ins', 'no_ins']
            item.EchartList.forEach(f => {
              if (f.name === c.name) {
                whereData.push({
                  and: [{
                    key: f.field,
                    queryType: item.PropertyList.datasetValue,
                    value: types.includes(item.PropertyList.datasetValue) ? item.ChoiceList : item.ChoiceList[0]
                  }]
                })
              }
            })
          }
        })
        chartData.statisticsList = statisticsList
        chartData.where = whereData
        if (chartData.where.length === 0) {
          // app.msg('暂无数据，已还原为初始图表。 请检查图表数据或关联查询组件是否已配置！', { time: 2000 })
          return
        }
        request.post(`/bi/${appId}/business/filed`, chartData).then(res => {
          if (res.data.code !== 0) {
            // 清除图表数据
            resetPieChart(c.name)
            //  app.msg(res.data.msg)
            return
          }
          let chart = {}
          if (document.getElementById(`${c.name}`)) {
            chart = echarts.init(document.getElementById(`${c.name}`));
            let a = chart.getOption();
            let keys = []
            Object.keys(res.data.data).filter(f => f != 'x').forEach(kk => {
              keys.push(kk)
            })
            // a.legend[0].data = keys
            let serireData = []
            let seriesArr = []
            colorList = ['#5C97F6', '#58D4D4', '#F2E25C', '#FFC366', '#FF8F8F', '#59D399', '#89B2FD', '#8B88FF', '#BD89EF', '#CBADFD']
            chartData.statisticsList.forEach((k, ki) => {
              if (res.data.data) {
                if (res.data.data && res.data.data[k.field + ',' + k.statisticsType]) {

                  res.data.data[k.field + ',' + k.statisticsType].forEach((r, ri) => {
                    serireData.push({
                      value: r,
                      name: res.data.data.x.flat(Infinity)[ri],
                      itemStyle: {
                        color: colorList[ri % 10]
                      },
                      label: a.series[0].data[0].label,
                      emphasis: a.series[0].data[0].emphasis

                    });
                    seriesArr.push(res.data.data.x.flat(Infinity)[ri])
                  })
                } else {
                  let name = Controls.Data.PieChartItemList[cIndex].option.Variables[ki].DimensionName
                  res.data.data.x.forEach((item, index) => {
                    serireData.push({
                      // value: 0,
                      name: name,
                      itemStyle: {
                        color: colorList[index % 10],
                      },
                      label: a.series[0].data[0].label,
                      emphasis: a.series[0].data[0].emphasis

                    });
                    seriesArr.push(name)
                  })
                }
              }
            })
            a.legend[0].data = seriesArr
            a.series[0].data = serireData
            //   a.series[0].itemStyle: {
            //     normal: {
            //     color: function(params) {
            //             //自定义颜色
            //             var colorList = [
            //             '#FE8463', 'red', 'green'
            //             ];
            //             return colorList[params.dataIndex]
            //         }
            //     }
            // }
            chart.setOption(a, true);
          }

        })

      }
    }
  })
}


// 时间格式转化函数
function getFormatDate(format, value) {

  let formatDate = {
    startDate: '',
    endDate: ''
  }
  let date = ''
  if (format === 'yyyy-MM-dd HH:mm:ss') { // 秒
    date = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
    formatDate.endDate = new Date(date).getTime()
    formatDate.startDate = new Date(dayjs(formatDate.endDate).subtract(Number(value), 'second')).getTime()
  } else if (format === 'yyyy-MM-dd HH:mm') { // 分
    date = dayjs(new Date()).format('YYYY-MM-DD HH:mm') + ':00'
    formatDate.endDate = new Date(date).getTime()
    formatDate.startDate = new Date(dayjs(formatDate.endDate).subtract(Number(value), 'minute')).getTime()
  } else if (format === 'yyyy-MM-dd HH') { // 时
    date = dayjs(new Date()).format('YYYY-MM-DD HH') + ':00:00'
    formatDate.endDate = new Date(date).getTime()
    formatDate.startDate = new Date(dayjs(formatDate.endDate).subtract(Number(value), 'hour')).getTime()
  } else if (format === 'yyyy-MM-dd') { // 日
    date = dayjs(new Date()).format('YYYY-MM-DD') + ' 00:00:00'
    formatDate.endDate = new Date(date).getTime()
    formatDate.startDate = new Date(dayjs(formatDate.endDate).subtract(Number(value), 'day')).getTime()
  } else if (format === 'yyyy-MM') { // 月
    date = dayjs(new Date()).format('YYYY-MM')
    let endMonth = new Date(date).getTime()
    dayjs(endMonth).subtract(Number(value), 'month')
    let startMonth = new Date(dayjs(endMonth).subtract(Number(value), 'month')).getTime()
    formatDate.startDate = startMonth
    formatDate.endDate = endMonth
  } else if (format === 'yyyy') { // 年
    let endYear = new Date().getFullYear()
    let startDate = endYear + Number(value)
    formatDate.startDate = new Date(String(endYear)).getTime()
    formatDate.endDate = new Date(String(startDate)).getTime()
  }
  return formatDate
}

function changePop(e) {
  let val = e.target.innerText
  if (val === '切换数据表') {
    $('#data-table').css('display', 'block')
    $('#data-chart').css('display', 'none')
    e.target.innerText = '切换曲线'
  } else if (val === '切换曲线') {
    $('#data-table').css('display', 'none')
    $('#data-chart').css('display', 'block')
    e.target.innerText = '切换数据表'
  }
  searchvarible()
}

function dblOpen(index, i, prop) {
  varstarttime = moment().add(-7, 'days').format('YYYY-MM-DD HH:mm:ss')
  varendtime = moment().format('YYYY-MM-DD HH:mm:ss')
  let searchStartPicker = document.getElementById('searchStartPicker')
  let searchEndPicker = document.getElementById('searchEndPicker')
  searchStartPicker.value = varstarttime
  searchEndPicker.value = varendtime
  searchStartPicker.setAttribute('data-dateid', i)
  searchEndPicker.setAttribute('data-dateid', i)

  $('#searchStartPicker').on('focus', function (e) {
    e.stopImmediatePropagation()
    let dates = [...document.getElementsByClassName('startPicker')]
    let elemIndex = 0
    dates.forEach((item, itemi) => {
      if (item.dataset.dateid == i) {
        elemIndex = itemi
      }
    })
    renderDatePicker('startPicker', 'YYYY-MM-DD HH:mm:ss', varstarttime, i, 'varstarttime', elemIndex)
  })

  $('#searchEndPicker').on('focus', function (e) {
    e.stopImmediatePropagation()
    let dates = [...document.getElementsByClassName('startPicker')]
    let elemIndex = 0
    dates.forEach((item, itemi) => {
      if (item.dataset.dateid == i) {
        elemIndex = itemi
      }
    })
    renderDatePicker('endPicker', 'YYYY-MM-DD HH:mm:ss', varendtime, i, 'varendtime', elemIndex)
  })

  // layui.use('laydate', function () {
  //   var laydate = layui.laydate;
  //   //日期范围
  //   laydate.render({
  //     elem: '#revisionTime',
  //     range: true,
  //     type: 'datetime',
  //     value: moment().add(-7, 'days').format('YYYY-MM-DD HH:mm:ss') + ' - ' + moment().format('YYYY-MM-DD HH:mm:ss'),
  //     done: function (value, date, endDate) {
  //       varstarttime = date.year + '-' + date.month + '-' + date.date + ' ' + date.hours + ':' + date.minutes + ":" + date.seconds
  //       varendtime = endDate.year + '-' + endDate.month + '-' + endDate.date + ' ' + endDate.hours + ':' + endDate.minutes + ":" + endDate.seconds
  //       // searchObjData.revision = value//得到日期生成的值，如：2017-08-18
  //     }
  //   });
  // });

  searchdata = index;
  let postData = {
    endTime: new Date(varendtime).getTime(),
    startTime: new Date(varstarttime).getTime(),
    variableSearchList: [{
      deviceId: index.CheckData.equipmentId ? index.CheckData.equipmentId : index.CheckData.equipmentid,
      variableId: index.CheckData.id,
      variableName: index.CheckData.name
    }]
  }
  request.post(`/bi/${Controls.User.appId}/variables/all/data`, postData).then(res => {
    let option = {
      title: {
        text: '描述_' + searchdata.CheckData.name,
        left: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '5%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        data: []
      },
      yAxis: {
        axisLine: {
          show: false
        },
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        }
      },
      series: [{
        data: [],
        type: 'line'
      }]
    };
    $("#popup-tbody").empty()
    let html = ''
    if (res.data.data.length !== 0) {
      option.xAxis.data = res.data.data.x;
      option.series[0].data = res.data.data[searchdata.CheckData.equipmentId ? searchdata.CheckData.equipmentId : searchdata.CheckData.equipmentid + ',' + searchdata.CheckData.name]


      for (let i = 0; i < res.data.data.x.length; i++) {
        html += ` <tr>
        <td style="padding-left:10px" class="table-checkbox">${i+1}</td>
        <td  style="text-align:center">${res.data.data.x[i]}</td>
        <td  style="text-align:center">${res.data.data[index.CheckData.equipmentId ? index.CheckData.equipmentId : index.CheckData.equipmentid +','+index.CheckData.name][i]}</td>
      </tr>`
      }

    }
    $("#popup-tbody").append(html)
    Chart1 = echarts.init(document.getElementById(`data-chart`));
    Chart1.clear()
    Chart1.resize()
    Chart1.setOption(option, true)
  })
  let origin = document.getElementById('datatextblockOrigin')
  let popup = document.getElementById('popup')
  popup.style.display = 'block'
  // request
}

function dblClose(e) {
  let popup = document.getElementById('popup')
  popup.style.display = 'none'
}

function dblConfirm(e) {
  let popup = document.getElementById('popup')
  popup.style.display = 'none'
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
// 失去焦点事件
function inputblur() {
  rwtextboxindex = null
  rwtextbox = null
}

function inputdown(e, ev, index) {
  if (e.value == '读写框') {
    e.value = ''
  }
  rwtextboxindex = index
  rwtextbox = e
  if (Controls.ControlList[index].TriggerCondition === '2') {
    return
  }
  document.onkeydown = function (event, index) { // 回车提交表单
    // 兼容FF和IE和Opera
    // $(e).val("sss")
    var theEvent = window.event || event;
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    if (code == 13 && !$("#showRwtextboxTips")[0]) {
      layer.open({
        title: '提示',
        content: `<div id="showRwtextboxTips">是否下发脚本</div>`,
        closeBtn: 1,
        btn: ['取消', '确定'],
        success: function (layero, index) {
          this.enterConfirm = function (event) {
            if (event.keyCode === 13) {
              $(".layui-layer-btn1").click();
              return false; //阻止系统默认回车事件
            }
          };
          $(document).on('keydown', this.enterConfirm); //监听键盘事件

          // 点击确定按钮回调事件
          $(".layui-layer-btn1").on("click", function () {
            // if(this){
            this.btn2
            // }

          })
        },

        btn2: function (index, layero) {
          if (rwtextboxindex !== null) {
            let commandMap = {}
            Object.assign(commandMap, {
              [Controls.ControlList[rwtextboxindex].CheckData.id]: $(rwtextbox).val()
            })
            let postData = {
              // accessType: Common.Permision,
              control: 2,
              commandMap,
              // permissions: Controls.PermissionList
            }

            request.post(`/bi/${appId}/variables/send`, postData).then(res => {
              if (res.data.code === 0) {
                appTips.successMsg('下发成功!')
              } else {
                appTips.errorMsg(res.data.msg)
              }
            })
          }

        },
        end: function () {
          $(document).off('keydown', this.enterConfirm); //解除键盘关闭事件
        }
      });
      // queryInfo();

    }
  }


}


// 下拉框
function toggleItem(e, index, type) {
  e.stopImmediatePropagation()
  let width = e.currentTarget.offsetWidth
  e.currentTarget.parentElement.lastElementChild.style.width = width + 'px'
  let suffix = ''
  let dropdown = ''
  if (type && type === 'filter') {
    suffix = e.currentTarget.parentNode.nextElementSibling.lastElementChild.firstElementChild
    dropdown = e.currentTarget.parentNode.nextElementSibling.nextElementSibling
  } else {
    suffix = e.currentTarget.lastElementChild.firstElementChild.firstElementChild
    dropdown = e.currentTarget.nextElementSibling
  }
  if (!dropdown.style.display || dropdown.style.display === 'none') {
    suffix.classList.add('is-reverse')
    dropdown.style.display = 'block'
  } else {
    e.target.blur()
    suffix.classList.remove('is-reverse')
    dropdown.style.display = 'none'
  }
}

function refreshDrop(e, index) {
  let tableName = ''
  let filed = ''
  let filterList = []
  if (Controls.ControlList[index].EchartList.length === 1) {
    tableName = Controls.ControlList[index].EchartList[0].tablename
    filed = Controls.ControlList[index].EchartList[0].field
    request.get(`/bi/${appId}/business/filed-value/${tableName}/${filed}`).then(res => {
      if (res.data.data.records.lenght != 0) {
        filterList = res.data.data.records.map(d => {
          return `<li class="dropdown-item ${Controls.ControlList[index].ChoiceList.includes(d) ? 'selected' : ''}">${d}</li>`
        }).join('')
      } else {
        filterList = `<li class="dropdown-item ">暂无数据</li>`
      }
      $(`#s-drop${index}`).html(filterList)
    })
  }
}

// 下拉款-左侧下拉选中
function selectValue(e, index, prop) {
  if(e.path.length==11){
    return
  }
  let wantindex = index
  // for(let i=0;i<Controls.ControlList.length;i++){
  //      if (Controls.ControlList[i].PropertyList.ZIndex == wantindex) {
  //     wantindex = i
  //     break;
  //   }
  // }
  var dropList = []
  if (Controls.ControlList[wantindex].ControlType === 'datasearch') {
    Controls.ControlList[wantindex].PropertyList.Num1 = ''
    Controls.ControlList[wantindex].PropertyList.Num2 = ''
    $(`#datasearch-left${index}`).val('')
    $(`#datasearch-right${index}`).val('')

    let emptys = ['为空', '不为空', '不限']
    let equals = ['等于', '不等于', '大于等于', '小于等于', '不限']

    if (emptys.includes(e.target.innerHTML)) {
      $(`#datasearch-left${index}`).attr("disabled", "disabled");
    } else {
      $(`#datasearch-left${index}`).removeAttr("disabled");
    }
    if (emptys.includes(e.target.innerHTML) || equals.includes(e.target.innerHTML)) {
      $(`#datasearch-right${index}`).attr("disabled", "disabled");
    } else {
      $(`#datasearch-right${index}`).removeAttr("disabled");
    }

    Controls.ControlList[wantindex].PropertyList.Value = e.target.innerHTML
    Controls.ControlList[wantindex].PropertyList.datasetValue = e.target.dataset.value
    dropList = DataSearchList.map(d => {
      return `<li class="dropdown-item ${d.name === Controls.ControlList[index].PropertyList.Value ? 'selected' : ''}" data-value="${d.value}" >${d.name}</li>`
    }).join('')

  } else if (Controls.ControlList[wantindex].ControlType === 'textsearch') {
    Controls.ControlList[wantindex].PropertyList.Text = ''
    $(`#textsearch-input${index}`).val('')

    let emptys = ['为空', '不为空', '不限']
    if (emptys.includes(e.target.innerHTML)) {
      $(`#textsearch-input${index}`).attr("disabled", "disabled");
    } else {
      $(`#textsearch-input${index}`).removeAttr("disabled");
    }

    Controls.ControlList[wantindex].PropertyList.Value = e.target.innerHTML
    Controls.ControlList[wantindex].PropertyList.datasetValue = e.target.dataset.value
    dropList = TextSearchList.map(d => {
      return `<li class="dropdown-item ${d.name === Controls.ControlList[index].PropertyList.Value ? 'selected' : ''}" data-value="${d.value}" >${d.name}</li>`
    }).join('')
  } else if (Controls.ControlList[wantindex].ControlType === 'dropsearch') {
    Controls.ControlList[wantindex].ChoiceList = []
    let items = [...document.getElementsByClassName(`select-drop-input${index}`)]
    $('#tags__span').html('')

    let emptys = ['为空', '不为空', '不限']
    if (emptys.includes(e.target.innerHTML)) {
      $(`#dropsearch-input${index}`).attr("disabled", "disabled");
      $(`#drop-right-input${index}`).attr("disabled", "disabled")
      $(`#drop-right-input${index}`).addClass('is-forbid')
      $(`#drop-right-input${index}`).val('')
      items.forEach(d => {
        d.classList.add('is-forbid')
        d.classList.add('is-triger')
      })
    } else {
      items.forEach(d => {
        d.classList.remove('is-forbid')
        d.classList.remove('is-triger')
      })
      $(`#dropsearch-input${index}`).removeAttr("disabled");
      $(`#drop-right-input${index}`).removeAttr("disabled");
      $(`#drop-right-input${index}`).removeClass('is-forbid')
      $(`#drop-right-input${index}`).val('')
    }


    Controls.ControlList[wantindex].PropertyList.Value = e.target.innerHTML
    Controls.ControlList[wantindex].PropertyList.datasetValue = e.target.dataset.value
    dropList = DropSearchList.map(d => {
      return `<li class="dropdown-item ${d.name === Controls.ControlList[index].PropertyList.Value ? 'selected' : ''}" data-value="${d.value}" >${d.name}</li>`
    }).join('')
  }

  e.currentTarget.parentElement.firstElementChild.firstElementChild.value = e.target.innerHTML
  e.currentTarget.innerHTML = dropList
  e.currentTarget.style.display = 'none'


  // if (e.target !== e.currentTarget) {
  //   let list = ['为空', '不为空']
  //   Controls.ControlList[wantindex].PropertyList[prop] = e.target.innerText
  //   Controls.ControlList[wantindex].PropertyList.datasetValue = e.target.dataset.value
  //   if(list.includes(e.target.innerText)) {
  //     Controls.ControlList[wantindex].ChoiceList = []
  //     Controls.ControlList[wantindex].Disabled = true
  //   } else {
  //     Controls.ControlList[wantindex].PropertyList.Text = ''
  //     Controls.ControlList[wantindex].Disabled = false
  //   }
  // let value = document.getElementById('selectInput' + index)
  // let dropdown = document.getElementById('dropdown' + index)
  // let items = [...dropdown.children]
  // Controls.ControlList[index].PropertyList.Value = e.target.innerText
  // value.value =  e.target.innerText
  // items.forEach(item => {
  //   if (item.innerText === e.target.innerText) {
  //     item.classList.add('selected')
  //     // 此处使用jq移除兄弟元素的class
  //     $(item).siblings().removeClass('selected')
  //   }
  // })
  // toggleItem(index)
  // childElement(wantindex)
  // }
  // setClass(index)
}

// 搜索多选值添加 下拉款-右侧下拉选中
function addSelectChoice(e, index) {
  let wantindex = index
  // for(let i=0;i<Controls.ControlList.length;i++){
  //      if (Controls.ControlList[i].PropertyList.ZIndex == wantindex) {
  //       wantindex = i
  //     break;
  //   }
  // }
  e.stopImmediatePropagation()
  let flag = ['等于']

  if (!flag.includes(Controls.ControlList[index].PropertyList.Value)) {
    if (Controls.ControlList[wantindex].ChoiceList.indexOf(e.target.innerText) !== -1) {
      let i = Controls.ControlList[wantindex].ChoiceList.indexOf(e.target.innerText)
      Controls.ControlList[wantindex].ChoiceList.splice(i, 1)
    } else {
      Controls.ControlList[wantindex].ChoiceList.push(e.target.innerText)
    }
  } else {
    if (Controls.ControlList[wantindex].ChoiceList.indexOf(e.target.innerText) !== -1) {
      let i = Controls.ControlList[wantindex].ChoiceList.indexOf(e.target.innerText)
      Controls.ControlList[wantindex].ChoiceList.splice(i, 1)
    } else {
      if (Controls.ControlList[wantindex].ChoiceList.length >= 1) {
        Controls.ControlList[wantindex].ChoiceList.splice(0, 1)
        Controls.ControlList[wantindex].ChoiceList.push(e.target.innerText)
      } else {
        Controls.ControlList[wantindex].ChoiceList.push(e.target.innerText)
      }
    }
  }


  let tag = e.currentTarget.parentNode.firstElementChild.firstElementChild
  let input = e.currentTarget.parentNode.firstElementChild.lastElementChild
  let li = [...e.currentTarget.children]
  let dataList = Controls.ControlList[wantindex].ChoiceList.map(d => {
    return `<span class="tag" ><span>${d}</span><i onmousedown="delChoice(event, ${index})" class="iconfont iconguanbi2"></i></span>`
  }).join('')
  li.forEach(item => {
    if (Controls.ControlList[wantindex].ChoiceList.includes(item.innerText)) {
      item.classList.add('selected')
    } else {
      item.classList.remove('selected')
    }
  })
  if (Controls.ControlList[wantindex].ChoiceList.length !== 0) {
    input.removeAttribute('placeholder')
  }
  tag.innerHTML = dataList
  if (input.value) {
    input.value = ''
    childElement(index)
  }

  manualTrigger(Controls.ControlList[index])
}

// 删除搜索下拉多选标签
function delChoice(e, index) {
  let wantindex = index
  for (let i = 0; i < Controls.ControlList.length; i++) {
    if (Controls.ControlList[i].PropertyList.ZIndex == wantindex) {
      wantindex = i
      break;
    }
  }
  let i = Controls.ControlList[wantindex].ChoiceList.indexOf(e.target.parentNode.innerText.trim())
  Controls.ControlList[wantindex].ChoiceList.splice(i, 1)
  let dataList = Controls.ControlList[wantindex].ChoiceList.map(d => {
    return `<span class="tag" ><span >${d}</span><i onmousedown="delChoice(event, ${index})" class="iconfont iconguanbi2"></i></span>`
  }).join('')
  $('#tags__span').html(dataList)
  manualTrigger(Controls.ControlList[index])
  // $(`.commonModule[data-id=${i}]`).remove()
}


// 字体
function changeText(e, index, prop) {
  Controls.ControlList[index].PropertyList[prop] = e.target.value
  manualTrigger(Controls.ControlList[index])
}

// 下拉查询输入值
function getSelectValue(e, index) {
  let wantindex = index
  Controls.ControlList[wantindex].ChoiceList = []
  Controls.ControlList[wantindex].ChoiceList.push(e.target.value)
  manualTrigger(Controls.ControlList[wantindex])
}

// 查询按钮--查询
function trggerData(index) {
  manualTrigger(Controls.ControlList[index], 'search')
}

// 重置按钮--重置
function resetData() {
  nodeCLick('', '', currentBoardNode, 'reset')
}


// setInterval(() => {
//   initCanvas()
// }, time)

// 监听全屏事件， 图表进入与退出全屏都需要刷新
document.addEventListener("fullscreenchange", function (e) {
  // if (document.fullscreenElement) {
  // } else {
  setTimeout(() => {
    if (e.target.id) {
      let index = null
      Controls.ControlList.forEach((item, itemi) => {
        if (item.Name === e.target.id) {
          index = itemi
        }
      })
      if (e.target.id.indexOf('linechart') !== -1) {
        if (document.fullscreenElement) {
          // 进入全屏， 隐藏icon
          LineChartDataFun()
        } else {
          // 退出全屏， 显示icon
          LineChartDataFun('tool')
        }
        renderLineChart(Controls.ControlList[index])
      } else if (e.target.id.indexOf('barchart') !== -1) {
        if (document.fullscreenElement) {
          // 进入全屏， 隐藏icon
          BarChartDataFun()
        } else {
          // 退出全屏， 显示icon
          BarChartDataFun('tool')
        }
        renderBarChart(Controls.ControlList[index])
      } else if (e.target.id.indexOf('piechart') !== -1) {
        if (document.fullscreenElement) {
          // 进入全屏， 隐藏icon
          PieChartDataFun()
        } else {
          // 退出全屏， 显示icon
          PieChartDataFun('tool')
        }
        renderPieChart(Controls.ControlList[index])
      } else if (e.target.id.indexOf('dashboardchart') !== -1) {
        if (document.fullscreenElement) {
          // 进入全屏， 隐藏icon
          DashChartDataFun()
        } else {
          // 退出全屏， 显示icon
          DashChartDataFun('tool')
        }
        renderDashChart(Controls.ControlList[index])
      }
    }
  }, 20)
  // }
})


function getDate(eleid, index, prop, event) {
  let dates = [...document.getElementsByClassName(eleid)]
  let elemIndex = 0
  dates.forEach((item, i) => {
    if (item.dataset.dateid == index) {
      elemIndex = i
    }
  })

  let {
    DateTimeType: formData
  } = Controls.ControlList[index]
  formData = changeFormat(formData)
  let addtime = Controls.ControlList[index][prop]
  renderDatePicker(eleid, formData, addtime, index, prop, elemIndex)
}

// 将yyyy 装换为 YYYY dd转为DD
function changeFormat(dataformat) {
  dataformat = dataformat.split('')
  dataformat.forEach((item, i) => {
    if (item === 'y') {
      dataformat[i] = 'Y'
    } else if (item === 'd') {
      dataformat[i] = 'D'
    }
  })
  dataformat = dataformat.join('')
  return dataformat
}

// 渲染日期时间组件
function renderDatePicker(elem, format, addtime, index, prop, elemIndex, tabType) {
  /* 
    elem: 绑定组件的元素class名称
    format： 日期时间格式化
    addtime: 默认显示时间
    index: 组件下标
    prop: 时间对应的数据
    elemIndex: 多个日期时间组件对应的下标,
    tabType: 是否显示固定时间
  */
  $(`.${elem}`).on('click', function () {
    var _this = this;
    for (let i = 0; i < $('body').find('[name="datePicker"]').length; i++) {
      $($('body').find('[name="datePicker"]')[i]).remove()
      $($('body').find('.datePicker-cover')[i]).remove()
    }
    $($('body').find('.datePicker-cover')[0]).remove()
    let div = `<div class='datePicker-cover' style='position:fixed;width:100%;height:100%;top:0;left:0;z-index:99999'></div>`
    $('body').append(div)
    $('.datePicker-cover').on('click', function () {
      for (let i = 0; i < $('body').find('[name="datePicker"]').length; i++) {
        $($('body').find('[name="datePicker"]')[i]).remove()
        $($('body').find('.datePicker-cover')[i]).remove()
      }
      $($('body').find('.datePicker-cover')[0]).remove()
    })
    $('body').append("<div class='datePicker-x' name='datePicker'></div>")
    if (format === 'month') {
      format = 'YYYY-MM'
    } else if (format === 'Year') {
      format = 'YYYY'
    }
    datePicker = $('.datePicker-x').datePicker({
      classname: elem,
      index: elemIndex,
      reportTimeType: 4, // 4代表小时、5代表天、6代表周、7代表月、8代表季、9代表年
      startDom: $(_this).find('input[name="startTime"]'), // 开始时间要赋值的DOM元素
      endDom: $(_this).find('input[name="endTime"]'), // 结束时间要赋值的DOM元素
      format,
      time: addtime ? addtime : new Date(),
      isFast: false, // 是否显示快速选择的选项
      isDouble: true,
      Zindex: 99999,
      type: Controls.ControlList[index].PropertyList.type, //判断显示什么时间类型
      twoobject: { //动态时间数据格式
        twotime: moment().format(format),
        parentselect: Controls.ControlList[index].PropertyList.twoobject.parentselect,
        childrenarr: Controls.ControlList[index].PropertyList.twoobject.childrenarr
      },
      disabledDate: false, // 是否禁用以后的时间
      yes: function (onetime, twotime, type, notime) { // 成功赋值前的回调可改变赋值的时间格式
        let dateTYpes = ['StartTime', 'EndTime']
        if (type == 1) {
          // 固定时间
          onetime = moment(onetime).format(format)
          // $(_this).find('input').val(onetime)
          $(_this).val(onetime)
          if (dateTYpes.includes(prop)) {
            Controls.ControlList[index][prop] = onetime
          } else {
            elem === 'startPicker' ? varstarttime = onetime : varendtime = onetime
          }

          //动态时间数据初始化
          Controls.ControlList[index].PropertyList.twoobject = {
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
          }
        } else {
          // 动态时间
          twotime.twotime = moment(twotime.twotime).format(format)
          // $(_this).find('input').val(twotime.twotime)
          $(_this).val(twotime.twotime)
          if (dateTYpes.includes(prop)) {
            Controls.ControlList[index][prop] = twotime.twotime
          } else {
            elem === 'startPicker' ? varstarttime = twotime.twotime : varendtime = twotime.twotime
          }

        }
        Controls.ControlList[index].PropertyList.type = type
        Controls.ControlList[index].PropertyList.twoobject.parentselect = twotime.parentselect
        if (notime == '清除') {
          // $(_this).find('input').val('')
          $(_this).val('')
          Controls.ControlList[index][prop] = ''
        }
        if (dateTYpes.includes(prop)) {
          // 即时刷新功能
          manualTrigger(Controls.ControlList[index])
        }
        for (let i = 0; i < $('body').find('[name="datePicker"]').length; i++) {
          $($('body').find('[name="datePicker"]')[i]).remove()
          $($('body').find('.datePicker-cover')[i]).remove()
        }
        $($('body').find('.datePicker-cover')[0]).remove()
      },
    });
    datePicker.render();

  });
}


function changeAddTime(format, addTime) {
  let types = ['month', 'year', 'yyyy', 'yyyy-MM'] // 年、月结束时间不需要加一天
  let value = ''
  if (types.includes(format)) {
    value = new Date(addTime).getTime()
  } else if (format === 'yyyy-MM-dd HH:mm:ss') {
    value = dayjs(new Date(addTime)).add(1, 'second').valueOf()
  } else if (format === 'yyyy-MM-dd HH:mm') {
    value = dayjs(new Date(addTime)).add(1, 'minute').valueOf()
  } else if (format === 'yyyy-MM-dd HH') {
    addTime = addTime + ":00:00"
    value = dayjs(new Date(addTime)).add(1, 'hour').valueOf()
  } else if (format === 'yyyy-MM-dd') {
    value = dayjs(new Date(addTime)).add(1, 'day').valueOf()
  }

  return value
}

function changeDateFormat(format) {
  let value = format
  if (format === 'year') {
    value = 'yyyy'
  } else if (format === 'month') {
    value = 'yyyy-MM'
  }
  return value
}

// 实时数据渲染x轴时间format类型修改
function changerealTimeFormat(format) {
  let value = format
  if (format === 'yyyy-MM-dd HH:mm:ss') {
    value = 'YYYY-MM-DD HH:mm:ss'
  } else if (format === 'yyyy-MM-dd HH:mm') {
    value = 'YYYY-MM-DD HH:mm'
  } else if (format === 'yyyy-MM-dd HH') {
    value = 'YYYY-MM-DD HH'
  } else if (format === 'yyyy-MM-dd') {
    value = 'YYYY-MM-DD'
  } else if (format === 'yyyy-MM') {
    value = 'YYYY-MM'
  } else if (format === 'yyyy') {
    value = 'YYYY'
  }
  return value
}

function getMaxLen(arr) {
  let lenght = 0
  let leni
  arr.forEach((rx, rxi) => {
    if(rx.length > lenght) {
      lenght = rx.length
      leni = rxi
    }
  })
  return leni
}

function getMaxWidth (dateArr) {
  let bottom = dataZoomVal
  let lens = []
  dateArr.forEach(item => {
    lens.push(getBottomWidth(item))
  })
  bottom = Math.max(...lens)
  return bottom
}

function judegData(item) {
  item = item || []
  let dateArr = []
  item.forEach(key => {
    let isDate = isValidDate(new Date(key))
      if (!isDate) {
        dateArr.push(key)
      }
  })
  return dateArr
}

function isValidDate(date) {	// 判断是否为无效日期
  return date instanceof Date && !isNaN(date.getTime())
}

function addDataZoom () {
  let dataZoom = [
      {
        type: 'inside',
        show:false,
        start: 0,
        end: 100,
        // filterMode: 'filter', 
    },
    {   
        show:false,
        start: 0,
        end: 100,
        // filterMode: 'empty'
    }
  ]
  return dataZoom
}

// 分辨率
function focusZoom(e) {
  if (e.currentTarget.value == '') {
    e.currentTarget.value = '0'
  }
  e.currentTarget.value = parseInt(e.currentTarget.value)
}

  
function wheelZoom(e) {
  if (e.ctrlKey) {
    e.preventDefault()
    if (e.wheelDelta > 0) {
      zoomValue += 10
    } else {
      zoomValue -= 10
    }
    if (zoomValue <= 10) {
      zoomValue = 10
    }

    if (zoomValue >= 200) {
      zoomValue = 200
    }

    $('#zoom-input').val(`${zoomValue}%`)
    changeZoom()
  }
}

function blurZoom(e) {
  if (parseInt(e.target.value) <= 10) {
    e.target.value = 10
  }
  zoomValue = parseInt(e.target.value)
  changeZoom()
}

function changeZoom() {
  $('#zoom-input').val(`${zoomValue}%`)
  // Controls.ControlList.forEach(item => {
  //   item.PropertyList.Width = item.PropertyList.TrueWidth * (parseInt(zoomValue) / 100)
  //   item.PropertyList.Height = item.PropertyList.TrueHeight * (parseInt(zoomValue) / 100)

  // })
  initCanvas()
  // $('#right-wrap').css({
  //   'width': zoomValue + '%',
  //   'height': zoomValue + '%',
  // })
  // 注释Zoom
  if (zoomValue >= 100) {
    $('#right-wrap').css({
      'transform-origin': '0% 0%',
      'transform': `scale(${zoomValue * 0.01})`
    })
  } else {
    $('#right-wrap').css({
      'transform-origin': 'unset',
      'transform': `scale(${zoomValue * 0.01})`
    })
  }
}
