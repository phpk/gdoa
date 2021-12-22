/* 此处放置中间画布事件 */

// 移除保存之后的样式校验
// function removeVerify() {
//  Controls.ControlList.forEach(item => {
//    if ($(`#${item.Name}`)) {
//     $(`#${item.Name}`).removeClass('verify-failed')
//    }
//  })
// }

// 当点击画布空白元素部分时，切换到检视：画布部分
function clickWrap(e) {
  // removeVerify()
  e.preventDefault()
  $('#moreTool4').css('display', 'none')
  $('#moreTool5').css('display', 'none')
  // $('#moreTool-rect').css('display', 'none')
  if (e.target.id && e.target.id === 'canvas-wrap' && firsright) {
    // initCommon()
    $('.details').hide()
    $("#chart-list").hide()

  } else {
    var list = [...document.getElementsByClassName('commonModule')]
    let select = [...document.querySelectorAll('.global-select input')]
    selectdata = []
    localdata.ControlList = []
    list.forEach((item) => {
      item.classList.remove("activeItem")
    })
    var childs = [...document.getElementsByClassName('edit-shape-point')]
    childs.forEach(item => {
      item.parentNode.removeChild(item)
    })
    select.forEach(item => {
      item.addEventListener('blur', hideDrop)
    })
    firsright = true
    initCollpase()

    // setTimeout(()=>{
    //   $('.details').show()
    // },0)

  }


}
// 画布禁止鼠标右键点击
function forbidMouse(e) {
  e.preventDefault()
}
// // 打开右侧菜单
function openRightMenu(e, index) {
  e.preventDefault()
  // menu.style.left = e.clientX + 'px';
  // menu.style.top = e.clientY + 'px';
  // //改变自定义菜单的宽，让它显示出来
  // menu.style.display = 'block'
  // delIndex = index
}
// //关闭右键菜单，很简单
// window.onclick = function(e){
// //用户触发click事件就可以关闭了，因为绑定在window上，按事件冒泡处理，不会影响菜单的功能
//   menu.style.display = 'none'
// }
// 删除画布元素
// function delElement (event) {
//   Controls.ControlList.splice(delIndex, 1)
//   initCommon()
//   childElement()
// }
// 8个圆点拖放事件
function handleMouseDownOnPoint(point, event, type, index, div) {
  if (selectdata.length > 1) {
    return
  }
  let nowindex1 = JSON.parse(JSON.stringify(index))
  // let dait = JSON.parse(JSON.stringify(localdata))
  let zindex = 0
  Controls.ControlList.forEach((item, nowindex) => {
    if (nowindex1 == item.PropertyList.ZIndex) {
      zindex = item.PropertyList.ZIndex
      index = nowindex
    }
  })
  let downEvent = event
  // 抛出事件让父组件设置当前元素选中状态
  downEvent.stopPropagation()
  downEvent.preventDefault() // Let's stop this event.
  const pos = {
    ...Controls.ControlList[index].PropertyList
  }
  let Height = pos.Height
  let Width = pos.Width
  let Top = pos.Top
  let Left = pos.Left
  let startX = downEvent.clientX
  let startY = downEvent.clientY
  // 当前模块的最小宽度值
  let minWidth = 0
  if (pos.minWidth) {
    minWidth = pos.minWidth
  }
  // 当前模块的最小高度值
  let minHeight = 0
  if (pos.minHeight) {
    minHeight = pos.minHeight
  }
  let move = moveEvent => {
    hasmove = true;
    let types = ['linechart','barchart','dashboardchart','piechart']
    let currX = moveEvent.clientX
    let currY = moveEvent.clientY
    let disY = currY - startY
    let disX = currX - startX
    let hasT = /t/.test(point)
    let hasB = /b/.test(point)
    let hasL = /l/.test(point)
    let hasR = /r/.test(point)
    let newHeight = +Height + (hasT ? -disY : hasB ? disY : 0)
    let newWidth = +Width + (hasL ? -disX : hasR ? disX : 0)
    pos.Width = newWidth > 0 ? newWidth : 0
    pos.Left = +Left + (hasL ? disX : 0)
    pos.Top = +Top + (hasT ? disY : 0)

    if (types.includes(Controls.ControlList[index].ControlType)) {
      let elem = document.getElementById(Controls.ControlList[index].Name)
      let chart =  echarts.init(elem);
      elem.firstElementChild.style.width = pos.Width + 'px'
      elem.firstElementChild.firstElementChild.style.width = pos.Width + 'px'
      elem.firstElementChild.style.height = pos.height + 'px'
      elem.firstElementChild.firstElementChild.style.height = pos.height + 'px'
      chart.resize()
    }

    // 拖动类型为文本则不可改变高度
    if (type !== 'text') {
      pos.Height = newHeight > 0 ? newHeight : 0
    }
    if (Controls.ControlList[index].ControlType === 'line' && pos.Width < 10) {
      pos.Width = 10
      return
    }
    // 如果宽度小于最小宽度就直接返回
    if (pos.Width < minWidth) return
    // 如果高度小于最小高度就直接返回
    if (pos.Height < minHeight) return
    resize(pos, index, zindex)
    var list = [...document.getElementsByClassName('commonModule')]

    list.forEach((item) => {
      if (zindex == item.dataset.id) {
        // item.className += ' activeItem'
      }
    })
    if (Controls.ControlList[index].ControlType == 'piechart' ||
      Controls.ControlList[index].ControlType == 'dashboardchart' ||
      Controls.ControlList[index].ControlType == 'barchart' ||
      Controls.ControlList[index].ControlType == 'linechart') {
      setClass(zindex, '', '', 'chartmove')
    } else {
      setClass(zindex)
    }



    // this.$emit('resize', pos, index)
  }
  let up = (e) => {
    hasmove = false
    e.stopPropagation()
    firsright = false
    // Controls.ControlList[index].PropertyList.ZIndex = 10
    if (Controls.ControlList[index].ControlType == 'piechart' ||
      Controls.ControlList[index].ControlType == 'dashboardchart' ||
      Controls.ControlList[index].ControlType == 'barchart' ||
      Controls.ControlList[index].ControlType == 'linechart') {
      setClass(zindex, '', '', 'chartmove')
    } else {
      setClass(zindex)
    }

    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
    //重新渲染图表
    setTimeout(() => {
      if (Controls.ControlList[index].ControlType == 'piechart') {
        PieChartDataFun()
      }
      if (Controls.ControlList[index].ControlType == 'dashboardchart') {
        DashChartDataFun()
      }
      if (Controls.ControlList[index].ControlType == 'barchart') {
        BarChartDataFun()
      }
      if (Controls.ControlList[index].ControlType == 'linechart') {
        LineChartDataFun()
      }
      // back(selectdata, Controls)
      // console.log("数据")
      
    }, 300)
  }
  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}

function resize(pos, index, zindex) {

  if (Controls.ControlList[index]) {
    Controls.ControlList[index].PropertyList = pos
    changeCommon({
      ...pos,
      ControlType: Controls.ControlList[index].ControlType
    }, index, 'init')
    localdata.ControlList.forEach((item) => {
      if (item.PropertyList.ZIndex == Controls.ControlList[index].PropertyList.ZIndex) {
        item.PropertyList = pos
      }
    })

    // setTimeout(()=>{
    //判断拖动的是否是图表
    if (Controls.ControlList[index].ControlType == 'piechart' ||
      Controls.ControlList[index].ControlType == 'dashboardchart' ||
      Controls.ControlList[index].ControlType == 'barchart' ||
      Controls.ControlList[index].ControlType == 'linechart') {
      childElement(index, 'init')
    } else {
      childElement(index, 'init')
    }
    // })


  }
}
// 创建生成画布元素
function childElement(index, text, all, nowtype) {
  $('.select-pass').hide()
  let ind = index
  // 画布添加颜色
  let canvasWrap = document.getElementById('canvas-wrap')
  canvasWrap.style.backgroundColor = commonList.BackColor
  let html = ''
  let wrap = document.getElementById('wrap')
  if (Controls.ControlList.length == 0) {
    $('#wrap').empty()
  }
  if ((localdata.ControlList.length !== 0 && text != 'init') || all == 'all') {
    let data = localdata
    if (all == 'all') {
      document.getElementById('wrap').innerHTML = ''
      data = Controls

    }
    let anindex = ind === undefined ? null : JSON.parse(JSON.stringify(ind))
    data.ControlList.forEach((item, index) => {
      index = item.PropertyList.ZIndex
      // if(ind == index){
      if (item.ControlType === 'solidrectangle') { //矩形样式
        html += `<div class="commonModule" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" ondblclick="showDrawer()" onclick="setClass(${index},null,null,event)" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;transform: rotate(${item.PropertyList.Rotate}deg);
          border-style: ${item.PropertyList.Style}; border-color: ${item.PropertyList.BorderColor}; border-width: ${item.PropertyList.BorderWidth}px;border-radius: ${item.PropertyList.BorderRadius}px;
          ${item.PropertyList.BackSetting !== 'img' ? `background-color: ${item.PropertyList.BackColor}`: '' }; box-shadow: ${item.PropertyList.BoxShadow}; height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};
          opacity: ${Number(item.PropertyList.Opacity) / 100};">
            <div class="moduleShape" style="${item.PropertyList.BackSetting === 'img' ? `background-image:url(${item.PropertyList.BackImg});background-size:100% 100%;background-repeat: no-repeat;`: '' }"></div>
          </div>
          `

        // <img src="${item.PropertyList.BackImg}" style="width:100%;height:100%">
      } else if (item.ControlType === 'titleCom') { // 标题样式
        html += `<div class="commonModule" draggable="false" data-id="${index}"
        onmousedown="handleDown(event)" ondblclick="showDrawer()" onclick="setClass(${index},null,null,event)" oncontextmenu="openRightMenu(event,${index})"
        style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;transform: rotate(${item.PropertyList.Rotate}deg);
        border-style: ${item.PropertyList.Style}; border-color: ${item.PropertyList.BorderColor}; border-width: ${item.PropertyList.BorderWidth}px;border-radius: ${item.PropertyList.BorderRadius}px;
        ${item.PropertyList.BackSetting !== 'img' ? `background-color: ${item.PropertyList.BackColor}`: '' };box-shadow: ${item.PropertyList.BoxShadow}; height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};
        opacity: ${Number(item.PropertyList.Opacity) / 100};">
          <div class="moduleShape" style="${item.PropertyList.BackSetting === 'img' ? `background-image:url(${item.PropertyList.BackImg});background-size:100% 100%;background-repeat: no-repeat;`: '' }"></div>
        </div>
        `
      } else if (item.ControlType === 'line') { //直线样式
        html += `<div class="commonModule" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" ondblclick="showDrawer()" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px; z-index: ${item.PropertyList.ZIndex};
          border-top-style: ${item.PropertyList.Style}; border-top-color: ${item.PropertyList.BorderColor}; border-top-width: ${item.PropertyList.BorderWidth}px;
          opacity: ${Number(item.PropertyList.Opacity) / 100};transform: rotate(${item.PropertyList.Rotate}deg);">
          <div class="moduleShape">
            </div>
          </div>
          `
      } else if (item.ControlType === 'staticimage' || item.ControlType === 'image') { //静态图片和动态图片
        html += `<div class="commonModule" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" ondblclick="showDrawer()" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="transform: rotate(${item.PropertyList.Rotate}deg);left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;
          height: ${item.PropertyList.Height}px; border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor}; border-width: ${item.PropertyList.BorderWidth}px;
          z-index: ${item.PropertyList.ZIndex};border-radius: ${item.PropertyList.BorderRadius}px;opacity: ${Number(item.PropertyList.Opacity) / 100};">
            <div class="img-div" style="box-shadow: ${item.PropertyList.BoxShadow};" >
              <img class="moduleShape" src="${item.PropertyList.Img}" style="position: relative; vertical-align: top; z-index: ${item.PropertyList.ZIndex - 1 };border-radius: ${item.PropertyList.BorderRadius}px;" alt="图片" />
            </div>
            </div>
          `
      } else if (item.ControlType === 'datatextblock') { //数值显示
        let align = ''
        if (item.PropertyList.JustifyContent === 'flex-start') {
          align = 'left'
        } else if (item.PropertyList.JustifyContent === 'center') {
          align = 'center'
        } else if (item.PropertyList.JustifyContent === 'flex-end') {
          align = 'right'
        }
        html += `<div class="commonModule" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" ondblclick="showDrawer()" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="background-color: ${item.PropertyList.BackColor};left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;border-radius: ${item.PropertyList.BorderRadius}px;
          height: ${item.PropertyList.Height}px;box-shadow: ${item.PropertyList.BoxShadow};z-index: ${item.PropertyList.ZIndex};opacity: ${Number(item.PropertyList.Opacity) / 100}; 
          border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor}; border-width: ${item.PropertyList.BorderWidth}px; transform: rotate(${item.PropertyList.Rotate}deg);
          font-family: ${item.PropertyList.FontFamily};color: ${item.PropertyList.Color}; font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration};
          display: flex;justify-content: ${item.PropertyList.JustifyContent};align-items: ${item.PropertyList.AlignItems};text-align: ${align}"
          >
          <span style="font-family: ${item.PropertyList.FontFamily};font-size: ${item.PropertyList.FontSize}px" >
            数值显示
          </span>
          </div>
          `
      } else if (item.ControlType === 'statictextblock') { //静态文本
        // <input class="moduleShape common-input" style="font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration};
        //   font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" onblur="handleblur(event, ${index}, 'Text')" 
        //   value="${item.PropertyList.Text}"
        // />
        let align = ''
        if (item.PropertyList.JustifyContent === 'flex-start') {
          align = 'left'
        } else if (item.PropertyList.JustifyContent === 'center') {
          align = 'center'
        } else if (item.PropertyList.JustifyContent === 'flex-end') {
          align = 'right'
        }
        html += `<div class="commonModule" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" ondblclick="showDrawer()" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;
          height: ${item.PropertyList.Height}px;border-radius:${item.PropertyList.BorderRadius}px;z-index: ${item.PropertyList.ZIndex};transform: rotate(${item.PropertyList.Rotate}deg);" >
          <div class="moduleShape common-input" style="padding:0;background-color: ${item.PropertyList.BackColor};border-radius:${item.PropertyList.BorderRadius}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};
          border-width: ${item.PropertyList.BorderWidth}px;font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration};
          font-weight: ${item.PropertyList.FontWeight};opacity: ${Number(item.PropertyList.Opacity) / 100};
          box-shadow: ${item.PropertyList.BoxShadow};color: ${item.PropertyList.Color};font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};position:absolute;top:0px;
          display: flex;justify-content: ${item.PropertyList.JustifyContent};align-items: ${item.PropertyList.AlignItems}; text-align:${align};left:0px">
            <span>${item.PropertyList.Text}</span>
          </div>
          </div>
          `
      } else if (item.ControlType === 'dynamictext') { //动态文本
        // <input class="moduleShape common-input" style="font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration};
        //   font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" onblur="handleblur(event, ${index}, 'Text')" 
        //   value="${item.PropertyList.Text}"
        // />
        let align = ''
        if (item.PropertyList.JustifyContent === 'flex-start') {
          align = 'left'
        } else if (item.PropertyList.JustifyContent === 'center') {
          align = 'center'
        } else if (item.PropertyList.JustifyContent === 'flex-end') {
          align = 'right'
        }
        html += `<div class="commonModule" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" ondblclick="showDrawer()" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;
          height: ${item.PropertyList.Height}px;border-radius:${item.PropertyList.BorderRadius}px;transform: rotate(${item.PropertyList.Rotate}deg);z-index: ${item.PropertyList.ZIndex};" >
          <div class="moduleShape common-input" style="padding:0;background-color: ${item.PropertyList.BackColor};border-radius:${item.PropertyList.BorderRadius}px;
          border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor}; border-width: ${item.PropertyList.BorderWidth}px;text-decoration: ${item.PropertyList.TextDecoration};
          text-align:${item.PropertyList.TextAlign};font-weight: ${item.PropertyList.FontWeight};opacity: ${Number(item.PropertyList.Opacity) / 100};box-shadow: ${item.PropertyList.BoxShadow};color: ${item.PropertyList.Color};font-size: ${item.PropertyList.FontSize}px;
          font-family: ${item.PropertyList.FontFamily};display: flex;justify-content: ${item.PropertyList.JustifyContent};align-items: ${item.PropertyList.AlignItems};text-align:${align} position:absolute;top:0px;left:0px" value="${item.PropertyList.Text}" 
          >
          <span>${item.PropertyList.Text}</span>
          </div>
          </div>
          `
      } else if (item.ControlType === 'solidellipse') { //圆形
        html += `<div class="commonModule" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" ondblclick="showDrawer()" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;border-radius: 50%;
          border-style: ${item.PropertyList.Style}; border-color: ${item.PropertyList.BorderColor}; border-width: ${item.PropertyList.BorderWidth}px;
          ${item.PropertyList.BackSetting !== 'img' ? `background-color: ${item.PropertyList.BackColor}`: '' };box-shadow: ${item.PropertyList.BoxShadow}; height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};
          opacity: ${Number(item.PropertyList.Opacity) / 100};transform: rotate(${item.PropertyList.Rotate}deg);">
          <div class="moduleShape" style="${item.PropertyList.BackSetting === 'img' ? `background-image:url(${item.PropertyList.BackImg});background-size:100% 100%;background-repeat: no-repeat;`: '' } border-radius: 50%;"></div>
           
          </div>
          `
      } else if (item.ControlType === 'ellipselamp') { //圆形状态灯
        html += `<div class="commonModule" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" ondblclick="showDrawer()" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;border-radius: 50%;
          height: ${item.PropertyList.Height}px;box-shadow: ${item.PropertyList.BoxShadow};z-index: ${item.PropertyList.ZIndex};background-color: #DDDDDD;
          opacity: ${Number(item.PropertyList.Opacity) / 100};transform: rotate(${item.PropertyList.Rotate}deg);
          border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor}; border-width: ${item.PropertyList.BorderWidth}px;"
          ">
            <div class="moduleShape">
            </div>
          </div>
          `
      } else if (item.ControlType === 'commonlamp') { //矩形状态灯
        html += `<div class="commonModule" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" ondblclick="showDrawer()" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;border-radius: ${item.PropertyList.BorderRadius}px;
          height: ${item.PropertyList.Height}px;box-shadow: ${item.PropertyList.BoxShadow};z-index: ${item.PropertyList.ZIndex};background-color: #DDDDDD;
          opacity: ${Number(item.PropertyList.Opacity) / 100};transform: rotate(${item.PropertyList.Rotate}deg);
          border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor}; border-width: ${item.PropertyList.BorderWidth}px;"
          ">
            <div class="moduleShape">
            </div>
          </div>
          `
      } else if (item.ControlType === 'cornerbutton') { //控制按钮
        html += `<div class="commonModule div-btn" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" ondblclick="showDrawer()" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px;color: ${item.PropertyList.Color}; width: ${item.PropertyList.Width}px;
          height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};transform: rotate(${item.PropertyList.Rotate}deg);border-radius:${item.PropertyList.BorderRadius}px">
          <input disabled="disabled" class="moduleShape common-input" contenteditable="true" style="transform: rotate(${item.PropertyList.Rotate}deg);padding:0;background-color: ${item.PropertyList.BackColor};border-radius:${item.PropertyList.BorderRadius}px;
          border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor}; border-width: ${item.PropertyList.BorderWidth}px;font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration};
          text-align:${item.PropertyList.TextAlign};font-weight: ${item.PropertyList.FontWeight};line-height: ${item.PropertyList.Height}px;opacity: ${Number(item.PropertyList.Opacity) / 100};
          box-shadow: ${item.PropertyList.BoxShadow};color: ${item.PropertyList.Color};font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};position:absolute;top:0px;left:0px" value='${item.PropertyList.Text}' onmousedown="inputdown(this,event,${index})" onblur="handleblur(event, ${index}, 'Text','menutype')" >
          </input>
          </div>`
      } else if (item.ControlType === 'rwtextbox') { //读写框
        html += `<div class="commonModule div-text" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" ondblclick="showDrawer()" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;border-radius:${item.PropertyList.BorderRadius}px; top: ${item.PropertyList.Top}px;width: ${item.PropertyList.Width}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};">
          <input disabled="disabled" class="moduleShape common-input" contenteditable="true" style="padding:0;background-color: ${item.PropertyList.BackColor};border-radius:${item.PropertyList.BorderRadius}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor}; border-width: ${item.PropertyList.BorderWidth}px;font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration};
          text-align:${item.PropertyList.TextAlign};font-weight: ${item.PropertyList.FontWeight};line-height: ${item.PropertyList.Height}px;opacity: ${Number(item.PropertyList.Opacity) / 100};box-shadow: ${item.PropertyList.BoxShadow};color: ${item.PropertyList.Color};font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};position:absolute;top:0px;left:0px" value='${item.PropertyList.Text}' onmousedown="inputdown(this,event,${index})" onblur="handleblur(event, ${index}, 'Text','menutype')" >
          </input>
          </div>`
      } else if (item.ControlType === 'jumplink') { //跳转链接
        html += `<div class="commonModule div-text" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" ondblclick="showDrawer()" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px;color: ${item.PropertyList.Color}; width: ${item.PropertyList.Width}px;
          line-height: ${item.PropertyList.Height}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};background: ${item.PropertyList.BackColor};  
          opacity: ${Number(item.PropertyList.Opacity) / 100};transform: rotate(${item.PropertyList.Rotate}deg);">
          <div class="moduleShape common-input flexLayout"  style="font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration};
            font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" >
            <span>${item.PropertyList.Text} ></span>
          </div>
          </div>`
      } else if (item.ControlType === 'textsearch') { //文本查询
        if (item.Disabled) {
          item.PropertyList.Text = ''
        }
        let dropList = TextSearchList.map(d => {
          return `<li class="dropdown-item ${d.name === item.PropertyList.Value ? 'selected' : ''}" data-value="${d.value}" >${d.name}</li>`
        }).join('')
        html += `<div class="commonModule" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" ondblclick="showDrawer()" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;transform: rotate(${item.PropertyList.Rotate}deg);
          line-height: ${item.PropertyList.Height - (item.PropertyList.BorderWidth * 2)}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};
          opacity: ${Number(item.PropertyList.Opacity) / 100};">
          <div style="width: 100%;height:100%;display: flex">
            <div class="global-select" style="height: 100%; margin-right: 10px;" >
              <div class="global-input" onmousedown="toggleItem(event, ${index})" style="height:100%;position:relative">
                <input type="text" class="search-input input-inner" value="${item.PropertyList.Value}"  readonly="readonly" autocomplete="off"
                style="position:absolute;top:0;height:100%;left:0; text-align: ${item.PropertyList.TextAlign};box-shadow: ${item.PropertyList.BoxShadow};
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
              <ul class="select-dropdown" onmousedown="selectValue(event, ${index}, 'Value')" style="width: ${item.PropertyList.Width}px;text-align: ${item.PropertyList.TextAlign};" >
                  ${dropList}
              </ul>
            </div>
            <input class="search-input" style="box-shadow: ${item.PropertyList.BoxShadow}; text-align: ${item.PropertyList.TextAlign};height: 100%;
            color: ${item.PropertyList.Color};border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};
            border-color: ${item.PropertyList.BorderColor};border-radius: ${item.PropertyList.BorderRadius}px;text-align: ${item.PropertyList.TextAlign};
            font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration}; font-size: ${item.PropertyList.FontSize}px;
            font-family: ${item.PropertyList.FontFamily};background: ${item.PropertyList.BackColor}" placeholder="${item.PropertyList.Placeholder}"
          value="${item.PropertyList.Text}" ${item.Disabled ? 'disabled' : '' } onblur="changeTextData(event, ${index}, 'Text')" />
          </div>
          </div>`
      } else if (item.ControlType === 'associatedatetimepicker') { //日期时间
        /* 
         <input class="search-input" type="text" id="date${index}" readonly="readonly" 
         style="box-shadow: ${item.PropertyList.BoxShadow};width:100%;color: ${item.PropertyList.Color};height:100%;border-width: ${item.PropertyList.BorderWidth}px;
         border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};border-radius: ${item.PropertyList.BorderRadius}px;
         text-align: ${item.PropertyList.TextAlign};font-weight: ${item.PropertyList.FontWeight};
         text-decoration: ${item.PropertyList.TextDecoration}; font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};"
         value="${item.StartTime + '--' + item.EndTime}" />
          */

        // if(item.StartTime && item.EndTime){
        // item.StartTime = item.StartTime ? item.StartTime : formatDateTime(new Date())
        // item.EndTime = item.EndTime ? item.EndTime : formatDateTime(new Date())
        html += `<div class="commonModule" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" ondblclick="showDrawer()" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;transform: rotate(${item.PropertyList.Rotate}deg);
          line-height: ${item.PropertyList.Height - (item.PropertyList.BorderWidth * 2)}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};
          background: ${item.PropertyList.BackColor};opacity: ${Number(item.PropertyList.Opacity) / 100};">

          <div class="r-date-group" style="height: 100%;font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};font-weight: ${item.PropertyList.FontWeight};" >
            <div class="bi-datePicker date-wrap" >
              <input type="text" readonly="readonly" style="background: ${item.PropertyList.BackColor};color: ${item.PropertyList.Color};box-shadow: ${item.PropertyList.BoxShadow};border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};border-radius: ${item.PropertyList.BorderRadius}px;text-decoration: ${item.PropertyList.TextDecoration}; text-align: ${item.PropertyList.TextAlign}; " autocomplete="off" value="${item.StartTime}"  placeholder="请选择">
            </div>
            <div class="bi-datePicker date-wrap" >
              <input type="text" readonly="readonly" style="background: ${item.PropertyList.BackColor};color: ${item.PropertyList.Color};box-shadow: ${item.PropertyList.BoxShadow};border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};border-radius: ${item.PropertyList.BorderRadius}px;text-decoration: ${item.PropertyList.TextDecoration}; text-align: ${item.PropertyList.TextAlign}; " autocomplete="off" value="${item.EndTime}"  placeholder="请选择">
            </div> 
          </div>

          </div>`

        // }

      } else if (item.ControlType === 'datasearch') { //数值查询
        let emptys = ['为空', '不为空', '不限']
        let equals = ['等于', '不等于', '大于等于', '小于等于', '不限']
        let dropList = DataSearchList.map(d => {
          return `<li class="dropdown-item ${d.name === item.PropertyList.Value ? 'selected' : ''}" data-value="${d.value}" >${d.name}</li>`
        }).join('')
        html += `<div class="commonModule" draggable="false" data-id="${index}"
          onmousedown="handleDown(event)" ondblclick="showDrawer()" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
        style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;transform: rotate(${item.PropertyList.Rotate}deg);height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};
        background: ${item.PropertyList.BackColor};  opacity: ${Number(item.PropertyList.Opacity) / 100};">
        <div style="width:100%;height:100%;display: flex; line-height: ${item.PropertyList.Height - (item.PropertyList.BorderWidth * 2)}px;">
          <div class="global-select" style="height:100%; margin-right: 10px; flex: 2" >
            <div class="global-input" onmousedown="toggleItem(event, ${index})"  style="height:100%;position:relative;">
              <input type="text" class="search-input input-inner" value="${item.PropertyList.Value}" readonly="readonly" autocomplete="off"
              style="left:0px;text-align: ${item.PropertyList.TextAlign};color: ${item.PropertyList.Color};position:absolute;top:0px;box-shadow: ${item.PropertyList.BoxShadow};height: 100%;border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};border-radius: ${item.PropertyList.BorderRadius}px;text-align: ${item.PropertyList.TextAlign};font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration}; font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" placeholder="请选择" ></input>
              <span class="input-suffix">
                <span class="input-suffix-inner">
                  <i class="iconfont iconxialajiantou"></i>
                </span>
              </span>
            </div>
            <ul class="select-dropdown" onmousedown="selectValue(event, ${index}, 'Value')" style="width: ${item.PropertyList.Width}px;text-align: ${item.PropertyList.TextAlign};" >
                ${dropList}
            </ul>
          </div>
          <input class="search-input" ${emptys.includes(item.PropertyList.Value) ? 'disabled': ''}  style="text-align: ${item.PropertyList.TextAlign};color: ${item.PropertyList.Color};flex: 1;box-shadow: ${item.PropertyList.BoxShadow};height: 100%;border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};border-radius: ${item.PropertyList.BorderRadius}px;text-align: ${item.PropertyList.TextAlign};font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration}; font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" placeholder="${item.PropertyList.Placeholder}"
            value="${item.PropertyList.Num1}" onblur="changeTextData(event, ${index}, 'Num1')" />
          <div class="short" style="position:relative;line-height:0;"><span style="position:absolute;top:0px;bottom:0px;margin:auto;width:3px;display:inline-block;height:2px;right:2px;">-</span></div>
          <input class="search-input" ${emptys.includes(item.PropertyList.Value) || equals.includes(item.PropertyList.Value)  ? 'disabled': ''} style="color: ${item.PropertyList.Color};flex: 1;box-shadow: ${item.PropertyList.BoxShadow};height: 100%;border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};border-radius: ${item.PropertyList.BorderRadius}px;text-align: ${item.PropertyList.TextAlign};font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration}; font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" placeholder="${item.PropertyList.Placeholder}"
            value="${item.PropertyList.Num2}" onblur="changeTextData(event, ${index}, 'Num2')" />
        </div>
        </div>`
      } else if (item.ControlType === 'dropsearch') { //下拉查询
        let filterList = []
        item.PropertyList.datasetValue = item.PropertyList.datasetValue ? item.PropertyList.datasetValue : 'eq'
        let dropList = DropSearchList.map(d => {
          return `<li class="dropdown-item ${d.name === item.PropertyList.Value ? 'selected' : ''}"  data-value="${d.value}" >${d.name}</li>`
        }).join('')
        // 
        // if(anindex){
        //   filterList = Controls.ControlList[anindex].dropList.map(d => {
        //     return `<li class="dropdown-item ${item.ChoiceList.includes(d.value) ? 'selected' : ''}" >${d.name}</li>`
        //   }).join('')
        // }
        filterList = item.dropList.map(d => {
          return `<li class="dropdown-item ${item.ChoiceList.includes(d.value) ? 'selected' : ''}" >${d.name}</li>`
        }).join('')

        var dataList = item.ChoiceList.map(d => {
          return `<span class="tag" ><span >${d}</span><i onmousedown="delChoice(event, ${index})" class="iconfont iconguanbi2"></i></span>`
        }).join('')
        let leftHtml = ``
        if (item.EchartList.length <= 1) {
          leftHtml = `
            <div class="global-select" style="height: 100%; flex: 1.1" >
            <div class="select__tags">
              <span>
                ${dataList}
              </span>
              <input type="text" style="background: ${item.PropertyList.BackColor};color: ${item.PropertyList.Color}; min-width: 38px; width: calc(100% - 5px)" placeholder="${item.ChoiceList.length === 0 ? '请选择' : ''}" ${item.Disabled ? 'disabled' : '' } class="${item.Disabled ? 'is-forbid' : '' }" onmousedown="toggleItem(event, ${index}, 'filter')" onInput="textInput(event, ${index})" ></input>
            </div>
            <div class="global-input ${item.Disabled ? 'is-triger' : '' }" onmousedown="toggleItem(event, ${index}, 'resetDrop')" style="height:100%" >
              <input type="text" ${item.Disabled ? 'disabled' : '' }  class="input-inner ${item.Disabled ? 'is-forbid' : '' }  " value="${item.PropertyList.CheckedValue}" autocomplete="off" readonly="readonly")"
              style="position:absolute;top:0; background: ${item.PropertyList.BackColor};box-shadow: ${item.PropertyList.BoxShadow};height: 100%;color: ${item.PropertyList.Color};border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};border-radius: ${item.PropertyList.BorderRadius}px;text-align: ${item.PropertyList.TextAlign};font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration}; font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" ></input>
              <span class="input-suffix ${item.Disabled ? 'is-forbid' : '' } ">
              <span class="input-suffix-inner">
                <i class="iconfont iconxialajiantou"></i>
              </span>
            </div>
            <ul class="select-dropdown" id="child-drop${index}" onmousedown="addSelectChoice(event, ${index}, 'CheckedValue')" style="width: ${item.PropertyList.Width/2}px;" >
              ${filterList}
            </ul>
          </div>`
        } else {
          leftHtml = `
            <div class="global-select" style="height: 100%; flex: 1.1" >
              <input ${item.Disabled ? 'disabled' : '' } class="search-input ${item.Disabled ? 'is-forbid' : '' }" value="${item.ChoiceList[0] ? item.ChoiceList[0] : ''}" onblur="getSelectValue(event, ${index})" style="position: absolute;top: 0px; background: ${item.PropertyList.BackColor};box-shadow: ${item.PropertyList.BoxShadow};height: 100%;color: ${item.PropertyList.Color};border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};border-radius: ${item.PropertyList.BorderRadius}px;text-align: ${item.PropertyList.TextAlign};font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration}; font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};"" ></input>
            </div>
          `
        }

        html += `<div class="commonModule" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" ondblclick="showDrawer()" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;transform: rotate(${item.PropertyList.Rotate}deg);
          line-height: ${item.PropertyList.Height - (item.PropertyList.BorderWidth * 2)}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};
          background: ${item.PropertyList.BackColor}; text-align: ${item.PropertyList.TextAlign};  opacity: ${Number(item.PropertyList.Opacity) / 100};">
            <div style="width:100%; height:100%; display: flex" >
              <div class="global-select" style="height:100%; flex: 0.9; margin-right: 10px" >
                <div class="global-input" onmousedown="toggleItem(event, ${index})"  style="height:100%;">
                  <input type="text" value="${item.PropertyList.Value}" readonly="readonly" autocomplete="off" 
                  style="position:absolute;top:0px; background: ${item.PropertyList.BackColor};box-shadow: ${item.PropertyList.BoxShadow};height: 100%;color: ${item.PropertyList.Color};border-width: ${item.PropertyList.BorderWidth}px;border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor};border-radius: ${item.PropertyList.BorderRadius}px;text-align: ${item.PropertyList.TextAlign};font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration}; font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};" placeholder="请选择" class="input-inner" ></input>
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
            onmousedown="handleDown(event)" ondblclick="showDrawer()" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="box-shadow: ${item.PropertyList.BoxShadow};left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;
          line-height: ${item.PropertyList.Height - (item.PropertyList.BorderWidth * 2)}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};
          text-align: ${item.PropertyList.TextAlign}; border-radius: ${item.PropertyList.BorderRadius}px; 
          opacity: ${Number(item.PropertyList.Opacity) / 100};transform: rotate(${item.PropertyList.Rotate}deg);">
          <input class="moduleShape common-input" disabled="disabled" style="transform: rotate(${item.PropertyList.Rotate}deg);padding:0;background-color: ${item.PropertyList.BackColor};border-radius:${item.PropertyList.BorderRadius}px;
          border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor}; border-width: ${item.PropertyList.BorderWidth}px;font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration};
          text-align:${item.PropertyList.TextAlign};font-weight: ${item.PropertyList.FontWeight};line-height: ${item.PropertyList.Height}px;opacity: ${Number(item.PropertyList.Opacity) / 100};
          box-shadow: ${item.PropertyList.BoxShadow};color: ${item.PropertyList.Color};font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};position:absolute;top:0px;left:0px" value='${item.PropertyList.Text}' onmousedown="inputdown(this,event,${index})" onblur="handleblur(event, ${index}, 'Text','menutype')" >
          </input>
          </div>`
      } else if (item.ControlType === 'resetbutton') { //重置按钮
        html += `<div class="commonModule div-btn" draggable="false" data-id="${index}"
            onmousedown="handleDown(event)" ondblclick="showDrawer()" onclick="setClass(${index})" oncontextmenu="openRightMenu(event,${index})"
          style="box-shadow: ${item.PropertyList.BoxShadow};left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;
          line-height: ${item.PropertyList.Height - (item.PropertyList.BorderWidth * 2)}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};
          background: ${item.PropertyList.BackColor}; text-align: ${item.PropertyList.TextAlign}; border-radius: ${item.PropertyList.BorderRadius}px;
           opacity: ${Number(item.PropertyList.Opacity) / 100};transform: rotate(${item.PropertyList.Rotate}deg);">
           <input class="moduleShape common-input" disabled="disabled" style="transform: rotate(${item.PropertyList.Rotate}deg);padding:0;background-color: ${item.PropertyList.BackColor};border-radius:${item.PropertyList.BorderRadius}px;
           border-style: ${item.PropertyList.Style};border-color: ${item.PropertyList.BorderColor}; border-width: ${item.PropertyList.BorderWidth}px;font-weight: ${item.PropertyList.FontWeight};text-decoration: ${item.PropertyList.TextDecoration};
           text-align:${item.PropertyList.TextAlign};font-weight: ${item.PropertyList.FontWeight};line-height: ${item.PropertyList.Height}px;opacity: ${Number(item.PropertyList.Opacity) / 100};
           box-shadow: ${item.PropertyList.BoxShadow};color: ${item.PropertyList.Color};font-size: ${item.PropertyList.FontSize}px;font-family: ${item.PropertyList.FontFamily};position:absolute;top:0px;left:0px" value='${item.PropertyList.Text}' onmousedown="inputdown(this,event,${index})" onblur="handleblur(event, ${index}, 'Text','menutype')" >
           </input>
          </div>`
      } else if (item.ControlType === 'piechart') {
        html += `<div  class="commonModule" draggable="false" data-id="${index}"
          onmousedown="handleDown(event)" ondblclick="showDrawer()" onmouseup="handleMouseUp(event,${index})" onclick="setClass(${index},'${item.Name}','piechart')" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;transform: rotate(${item.PropertyList.Rotate}deg);
          height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};">
          <div id="${item.Name}" style="width:100%;height:100%;"></div>
          </div>
          <div  class="commonModule" draggable="false" data-id="${index}"
          onmousedown="handleDown(event)" ondblclick="showDrawer()" onclick="setClass(${index},'${item.Name}','piechart')" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;height: ${item.PropertyList.Height}px;
          z-index: ${item.PropertyList.ZIndex-1};transform: rotate(${item.PropertyList.Rotate}deg);">
          <div id="${item.Name}pie" style="width:100%;height:100%;z-index:9999"></div>
          </div>`
      } else if (item.ControlType === 'dashboardchart') {
        html += `<div  class="commonModule" draggable="false" data-id="${index}"
          onmousedown="handleDown(event)" ondblclick="showDrawer()" onmouseup="handleMouseUp(event,${index})" onclick="setClass(${index},'${item.Name}','dashboardchart')" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;height: ${item.PropertyList.Height}px;
          z-index: ${item.PropertyList.ZIndex};transform: rotate(${item.PropertyList.Rotate}deg);">
          <div id="${item.Name}" style="width:100%;height:100%;"></div>
          </div>`
      } else if (item.ControlType === 'barchart') {
        html += `<div  class="commonModule" draggable="false" data-id="${index}"
          onmousedown="handleDown(event)" ondblclick="showDrawer()" onmouseup="handleMouseUp(event,${index})" onclick="setClass(${index},'${item.Name}','barchart')" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};transform: rotate(${item.PropertyList.Rotate}deg);">
          <div id="${item.Name}"  style="width:100%;height:100%;"></div>
          </div>`
      } else if (item.ControlType === 'linechart') {
        html += `<div  class="commonModule" draggable="false" data-id="${index}"
          onmousedown="handleDown(event)" ondblclick="showDrawer()" onmouseup="handleMouseUp(event,${index})" onclick="setClass(${index},'${item.Name}','linechart')" oncontextmenu="openRightMenu(event,${index})"
          style="left: ${item.PropertyList.Left}px;top: ${item.PropertyList.Top}px; width: ${item.PropertyList.Width}px;height: ${item.PropertyList.Height}px;z-index: ${item.PropertyList.ZIndex};transform: rotate(${item.PropertyList.Rotate}deg);">
          <div id="${item.Name}"  style="width:100%;height:100%;"></div>
          </div>`
      }

      // }
    })
  }
  try {
    //在此运行代码
    let div = ""
    if (!(text && text === 'reuse')) { // 是否复用脱出来的组件 --- 复用判断
      localdata.ControlList.forEach((item) => {
        let types = ['staticimage', 'image']
        let rectTypes = ['solidellipse','solidrectangle', 'titleCom']
        if (text != 'init') {
          $(`.commonModule[data-id=${item.PropertyList.ZIndex}]`).remove()

        } else {
          if (types.includes(item.ControlType)) {
            // 图片不需要背景色
            div = div + `$('.commonModule[data-id=${item.PropertyList.ZIndex}]').css({'borderColor':'${item.PropertyList.BorderColor}','height':'${item.PropertyList.Height}px','width':'${item.PropertyList.Width}px','top':'${item.PropertyList.Top}px','left':'${item.PropertyList.Left}px'});`
          } else if (rectTypes.includes(item.ControlType)) {
            if (item.PropertyList.BackSetting !== 'img') {
              // 颜色需要背景色
              div = div + `$('.commonModule[data-id=${item.PropertyList.ZIndex}]').css({'borderColor':'${item.PropertyList.BorderColor}','backgroundColor':'${item.PropertyList.BackColor}','height':'${item.PropertyList.Height}px','width':'${item.PropertyList.Width}px','top':'${item.PropertyList.Top}px','left':'${item.PropertyList.Left}px'});`
            } else {
              // 图片不需要背景色
              div = div + `$('.commonModule[data-id=${item.PropertyList.ZIndex}]').css({'borderColor':'${item.PropertyList.BorderColor}','height':'${item.PropertyList.Height}px','width':'${item.PropertyList.Width}px','top':'${item.PropertyList.Top}px','left':'${item.PropertyList.Left}px'});`
            }
          } else {
            if (item.ControlType !== 'textsearch') {
              div = div + `$('.commonModule[data-id=${item.PropertyList.ZIndex}]').css({'borderColor':'${item.PropertyList.BorderColor}','backgroundColor':'${item.PropertyList.BackColor}','height':'${item.PropertyList.Height}px','width':'${item.PropertyList.Width}px','top':'${item.PropertyList.Top}px','left':'${item.PropertyList.Left}px'});`
            } else {
              div = div + `$('.commonModule[data-id=${item.PropertyList.ZIndex}]').css({'borderColor':'${item.PropertyList.BorderColor}','height':'${item.PropertyList.Height}px','width':'${item.PropertyList.Width}px','top':'${item.PropertyList.Top}px','left':'${item.PropertyList.Left}px'});`
            }
          }
        }
      })
    }
    if (text == 'init') {
      eval(div)
      // chartsChangFun('style')
    } else {
      $('#wrap').append(html)
      PieChartDataFun()
      DashChartDataFun()
      BarChartDataFun()
      LineChartDataFun()
    }

  } catch (err) {
    //在此处理错误
    console.log('这是一段贼神奇的代码001！！！')
  }
  // wrap.insertAdjacentHTML('afterend',html)   insertAdjacentHTML方法往html中插入模板字符串
  // wrap.innerHTML = html
  if (index || index == 0) {
    setTimeout(() => {
      localdata.ControlList.forEach((item, index1) => {
        if (text != 'init') {
          let indexarr = []
          localdata.ControlList.forEach((item, index) => {
            indexarr.push(item.PropertyList.ZIndex)
          })
          if (indexarr.length > 0) {
            if (nowtype == 'back') {
              setClass(indexarr[indexarr.length - 1])
            } else {
              setClass(indexarr)
            }
          }
        }
      })
    })
  }
  if(all!=='all'&&nowtype!=='noback'){
    if(fd!==null){
      clearTimeout(fd)
    }
      fd = setTimeout(()=>{
        back(selectdata, Controls)
      },100)
  }


 
 
}
//禁止复制
function stopPaste() {
  data.ControlList.forEach((item, index) => {
    if (item.ControlType === 'statictextblock' || item.ControlType === 'dynamictext' || item.ControlType === 'cornerbutton' || item.ControlType === 'rwtextbox' || item.ControlType === 'searchbutton' || item.ControlType === 'resetbutton') {

      document.querySelector(`.commonModule[data-id=${item.PropertyList.ZIndex}]`).addEventListener("paste", function (event) {
        var items = event.clipboardData.items;
        if (items && items[0].type.indexOf("image") > -1) {
          return
        }
      })
      // $(`.commonModule[data-id=${item.PropertyList.ZIndex}]`).remove()

    }

  })

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

    let tableName = ''
    let filed = ''
    let filterList = []
    if (Controls.ControlList[index].EchartList.length === 0) {
      filterList = ` `
      $(`#child-drop${index}`).html(filterList)
    } else if (Controls.ControlList[index].EchartList.length === 1) {
      tableName = Controls.ControlList[index].EchartList[0].tablename
      filed = Controls.ControlList[index].EchartList[0].field
      request.get(`/bi/${appId}/business/filed-value/${tableName}/${filed}`).then(res => {
        if (res.data.data.records.lenght != 0) {
          filterList = res.data.data.records.map(d => {
            return `<li class="dropdown-item ${Controls.ControlList[index].ChoiceList.includes(d) ? 'selected' : ''}">${d}</li>`
          }).join('')
        } else {
          filterList = ` `
        }
        $(`#child-drop${index}`).html(filterList)
      })
    }

  } else {
    suffix = e.currentTarget.lastElementChild.firstElementChild.firstElementChild
    dropdown = e.currentTarget.nextElementSibling
  }
  if (type && type === 'resetDrop') {
    let tableName = ''
    let filed = ''
    let filterList = []
    if (Controls.ControlList[index].EchartList.length === 0) {
      filterList = ` `
      $(`#child-drop${index}`).html(filterList)
    } else if (Controls.ControlList[index].EchartList.length === 1) {
      tableName = Controls.ControlList[index].EchartList[0].tablename
      filed = Controls.ControlList[index].EchartList[0].field
      request.get(`/bi/${appId}/business/filed-value/${tableName}/${filed}`).then(res => {
        if (res.data.data.records.lenght != 0) {
          filterList = res.data.data.records.map(d => {
            return `<li class="dropdown-item ${Controls.ControlList[index].ChoiceList.includes(d) ? 'selected' : ''}">${d}</li>`
          }).join('')
        } else {
          filterList = ` `
        }
        $(`#child-drop${index}`).html(filterList)
      })
    }
  }

  let component = ''
  if (!dropdown.style.display || dropdown.style.display === 'none') {
    suffix.classList.add('is-reverse')
    dropdown.style.display = 'block'
    component = 'block'
  } else {
    e.target.blur()
    suffix.classList.remove('is-reverse')
    dropdown.style.display = 'none'
    component = 'none'
  }
  handleDown(e, component, index, dropdown)
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
  // $(`.commonModule[data-id=${i}]`).remove()
  childElement()
}

function textInput(e, index) {
  let wantindex = index
  for (let i = 0; i < Controls.ControlList.length; i++) {
    if (Controls.ControlList[i].PropertyList.ZIndex == wantindex) {
      wantindex = i
      break;
    }
  }
  let value = e.target.value
  // let dropdown = e.target.parentNode.nextElementSibling
  let dropdown = e.target.parentNode.nextElementSibling.nextElementSibling
  let html = ``
  Controls.ControlList[wantindex].dropList.forEach(item => {
    if (item.value.indexOf(value) != -1) {
      html += `<li class="dropdown-item ${Controls.ControlList[wantindex].ChoiceList.includes(item.value) ? 'selected' : ''}"" >${item.value}</li>`
    }
  })
  dropdown.innerHTML = html
  if (dropdown.innerHTML === '') {
    dropdown.innerHTML = `<p class="select-dropdown__empty" onclick="emptyClick(event)">无匹配数据</p>`
  }
}

function emptyClick(e) {
  e.stopImmediatePropagation() //阻止事件的冒泡
}
// 搜索多选值添加
function addSelectChoice(e, index) {
  let wantindex = index
  for (let i = 0; i < Controls.ControlList.length; i++) {
    if (Controls.ControlList[i].PropertyList.ZIndex == wantindex) {
      wantindex = i
      break;
    }
  }

  let flag = ['等于任意一个', '不等于任意一个']

  // e.stopImmediatePropagation()
  if (flag.includes(Controls.ControlList[index].PropertyList.Value)) {
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
}

// 下拉查询输入值
function getSelectValue(e, index) {
  let wantindex = index
  for (let i = 0; i < Controls.ControlList.length; i++) {
    if (Controls.ControlList[i].PropertyList.ZIndex == wantindex) {
      wantindex = i
      break;
    }
  }
  Controls.ControlList[wantindex].ChoiceList = []
  Controls.ControlList[wantindex].ChoiceList.push(e.target.value)
}

function selectValue(e, index, prop) {
  let wantindex = index
  for (let i = 0; i < Controls.ControlList.length; i++) {
    if (Controls.ControlList[i].PropertyList.ZIndex == wantindex) {
      wantindex = i
      break;
    }
  }
  if (e.target !== e.currentTarget) {
    let list = ['为空', '不为空', '不限']

    if (Controls.ControlList[wantindex].ControlType === 'dropsearch') { // 下拉查询
      Controls.ControlList[wantindex].ChoiceList = []
    }

    Controls.ControlList[wantindex].PropertyList[prop] = e.target.innerText
    Controls.ControlList[wantindex].PropertyList.datasetValue = e.target.dataset.value
    if (list.includes(e.target.innerText)) {
      Controls.ControlList[wantindex].ChoiceList = []
      Controls.ControlList[wantindex].Disabled = true
    } else {
      Controls.ControlList[wantindex].PropertyList.Text = ''
      Controls.ControlList[wantindex].Disabled = false
    }
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
    childElement(wantindex)
  }
  // setClass(index)
}

function showDrawer() {
  $(".details").show()
}

// 画布元素拖拽
function handleDown(e, comType, comIndex, elem) {
  /* 
    type: 其他组件点击事件传递过来
    index: 从组件传过来的下标
    elem: 组件对应的下拉元素
  */
  // e.preventDefault()
  // e.stopImmediatePropagation()
  // let judge = $("#r-btns-style").hasClass("active")
  // $('#r-btns-style').addClass('active')
  // $('#r-btns-event').removeClass('active')


  handtrue = true
  type = ''
  if (e.ctrlKey) {
    if (e.button == 0) {
      let index = e.currentTarget.dataset.id
      type = 'ctrl'
      setClass(index)

    }
  }
  if (localdata.ControlList.length <= 1) {
    let index
    if (comType) {
      index = comIndex
    } else {
      index = e.currentTarget.dataset.id
    }
    let nowindex = index
    let childItem = ''
    Controls.ControlList.forEach((item, index1) => {
      if (index == item.PropertyList.ZIndex) {
        nowindex = index1
        childItem = item
      }
    })
    //  return
    //echartType 判断单击是否重新渲染右侧图表
    let echartType = ''
    if (index) {

      if (localdata.ControlList.length == 1) {
        if (localdata.ControlList[0].Name == childItem.Name) {
          echartType = 'init'
        } else {
          echartType = ''
        }
      }
    }
    if (type !== 'ctrl') {
      rightCommon(childItem.title, childItem.Name, nowindex)
      if (Controls.ControlList[nowindex].TabEvent === 'style') {
        changeCommon({
          ...childItem.PropertyList,
          ControlType: childItem.ControlType
        }, nowindex, echartType)
      } else {
        // choice('style', nowindex)
        choice(Controls.ControlList[nowindex].TabEvent, nowindex)
      }

    } else {
      // initCommon()
      // $('.details').hide()
    }
    const {
      PropertyList: pos
    } = childItem
    let startY = e.clientY
    let startX = e.clientX
    let startTop = Number(pos.Top)
    let startLeft = Number(pos.Left)
    let firstTime = ''
    let lastTime = ''
    let echartsInit = false
    let move = moveEvent => {
      hasmove = true
      $("#saveBtnTips").show()
      // !#zh 移动的时候，不需要向后代元素传递事件，只需要单纯的移动就OK
      moveEvent.stopPropagation()
      moveEvent.preventDefault()
      let currX = moveEvent.clientX
      let currY = moveEvent.clientY
      if (pos.Top > 0) {
        pos.Top = currY - startY + startTop

      }
      if (pos.Top <= 0) {
        pos.Top = 1
      }

      if (pos.Left > 0) {
        pos.Left = currX - startX + startLeft

      }
      if (pos.Left <= 0) {
        pos.Left = 1
      }


      // this.styleObj.top = pos.Top + 'px'
      // this.styleObj.left = pos.Left + 'px'

      // laydate.render({
      //   elem: '#date' + index, //指定元素
      //   type: 'datetime',
      //   value: childItem.date
      // });
      childItem.PropertyList.Top = pos.Top
      childItem.PropertyList.Left = pos.Left
      Controls.ControlList.forEach((item, index1) => {

        if (item.PropertyList.ZIndex == index) {
          nowindex = index1
        }
      })

      if (Controls.ControlList[nowindex].TabEvent === 'style') {
        changeCommon({
          ...childItem.PropertyList,
          ControlType: childItem.ControlType
        }, nowindex, 'init')
      }


      if (Controls.ControlList[nowindex].ControlType == 'piechart' ||
        Controls.ControlList[nowindex].ControlType == 'dashboardchart' ||
        Controls.ControlList[nowindex].ControlType == 'barchart' ||
        Controls.ControlList[nowindex].ControlType == 'linechart') {
        childElement(nowindex, 'init')
      } else {

        childElement(nowindex, 'init')
      }
      var list = [...document.getElementsByClassName('commonModule')]

      // list.forEach((item) => {
      //   if(index.indexOf(item.dataset.id)>-1){
      //     // item.className += ' activeItem'
      //     }
      // })
      if (selectdata.length <= 1) {
        setClass(index, '', '', 'chartmove')
        // setClass(Controls.ControlList[index].PropertyList.ZIndex, '', '', 'chartmove')
      } else {
        let tmp = []
        selectdata.forEach((item) => {
          tmp.push(item.PropertyList.ZIndex)
        })
        setClass(tmp)
      }

      echartsInit = true
      // if (judge) {
      //   $('#r-btns-style').addClass('active')
      //   $('#r-btns-event').removeClass('active')
      // } else {
      //   $('#r-btns-style').removeClass('active')
      //   $('#r-btns-event').addClass('active')
      // }
    }
    let up = (e) => {
      hasmove = false
      e.preventDefault()
      if (comType === 'block') {
        e.target.parentElement.parentElement.lastElementChild.style.display = 'block'
        if (e.target.parentElement.parentElement.firstElementChild.lastElementChild.firstElementChild) {
          e.target.parentElement.parentElement.firstElementChild.lastElementChild.firstElementChild.firstElementChild.classList.add('is-reverse')
        } else {
          if (e.target.parentElement.lastElementChild.firstElementChild) {
            e.target.parentElement.lastElementChild.firstElementChild.firstElementChild.classList.add('is-reverse')
          } else {
            e.target.parentElement.parentElement.children[1].lastElementChild.firstElementChild.firstElementChild.classList.add('is-reverse')
          }
        }

      }
      // $(".details").show()

      // PieChartDataFun()
      // DashChartDataFun()
      // BarChartDataFun()
      // LineChartDataFun()
      lastTime = new Date().getTime()
      // Controls
      // if ((lastTime - firstTime) > 200) {
      //   // //重新渲染图表
      //   if(echartsInit){
      //     setTimeout(()=>{
      //       if(Controls.ControlList[nowindex].ControlType == 'piechart' ){
      //         PieChartDataFun()
      //       }
      //       if(Controls.ControlList[nowindex].ControlType == 'dashboardchart' ){
      //         DashChartDataFun()
      //       }
      //       if(Controls.ControlList[nowindex].ControlType == 'barchart' ){
      //         BarChartDataFun()
      //       }
      //       if(Controls.ControlList[nowindex].ControlType == 'linechart' ){
      //         LineChartDataFun()
      //       }
      //     },300)

      //     echartsInit = false

      //     chartsChangFun('style')
      //   }
      // }
      // console.log("数据")
      // back(selectdata, Controls)
      document.removeEventListener('mousemove', move, true)
      document.removeEventListener('mouseup', up, true)
    }


    document.addEventListener('mousemove', move, true)
    document.addEventListener('mouseup', up, true)
    return true
  } else {
    let index = []
    let saveindex = []
    localdata.ControlList.forEach((item) => {
      index.push(item.PropertyList.ZIndex)
    })


    // let childItem = Controls.ControlList[parseInt(item.index)]


    // const { PropertyList: pos } = childItem
    let startY = e.clientY
    let startX = e.clientX
    // let startTop = Number(pos.Top)
    // let startLeft = Number(pos.Left)
    let firstTime = ''
    let movestatus = ''
    let lastTime = ''
    let daiti = JSON.parse(JSON.stringify(selectdata))
    let move = moveEvent => {
      hasmove = true
      movestatus = '移动中'
      // !#zh 移动的时候，不需要向后代元素传递事件，只需要单纯的移动就OK
      moveEvent.stopPropagation()
      moveEvent.preventDefault()
      let currX = moveEvent.clientX
      let currY = moveEvent.clientY
      let Top = Math.min.apply(Math, localdata.ControlList.map(item => {
        return item.PropertyList.Top
      }));
      let Left = Math.min.apply(Math, localdata.ControlList.map(item => {
        return item.PropertyList.Left
      }));
      let tindex = 0
      let lindex = 0
      for (let nowindex = 0; nowindex < localdata.ControlList.length; nowindex++) {
        if (Top == localdata.ControlList[nowindex].PropertyList.Top) {
          tindex = nowindex
        }
        if (Left == localdata.ControlList[nowindex].PropertyList.Left) {
          lindex = nowindex
        }
      }
      // localdata.ControlList.forEach((item,nowindex)=>{

      for (let nowindex = 0; nowindex < localdata.ControlList.length; nowindex++) {
        let item = localdata.ControlList[nowindex]
        if (item.PropertyList.Top <= 0) {
          item.PropertyList.Top = 1
          // break
        } else {
          if (Top !== 1 || (currY - startY + JSON.parse(JSON.stringify(daiti[tindex].PropertyList.Top))) > 0) {
            item.PropertyList.Top = currY - startY + JSON.parse(JSON.stringify(daiti[nowindex].PropertyList.Top))

          }

        }
        if (item.PropertyList.Left <= 0) {
          item.PropertyList.Left = 1
        } else {
          if (Left !== 1 || (currX - startX + JSON.parse(JSON.stringify(daiti[lindex].PropertyList.Left))) > 0) {
            item.PropertyList.Left = currX - startX + JSON.parse(JSON.stringify(daiti[nowindex].PropertyList.Left))

          }

        }
        let types = ['staticimage', 'image']
        let rectTypes = ['solidellipse','solidrectangle', 'titleCom']
        if (types.includes(item.ControlType)) { // 图片不需要背景色
          eval(`$('.commonModule[data-id=${item.PropertyList.ZIndex}]').css({'borderColor':'${item.PropertyList.BorderColor}','height':'${item.PropertyList.Height}px','width':'${item.PropertyList.Width}px','top':'${item.PropertyList.Top}px','left':'${item.PropertyList.Left}px'});`)
        } else if (rectTypes.includes(item.ControlType)) {
          if (item.PropertyList.BackSetting !== 'img') {
            // 颜色不需要背景色
            eval(`$('.commonModule[data-id=${item.PropertyList.ZIndex}]').css({'borderColor':'${item.PropertyList.BorderColor}','backgroundColor':'${item.PropertyList.BackColor}','height':'${item.PropertyList.Height}px','width':'${item.PropertyList.Width}px','top':'${item.PropertyList.Top}px','left':'${item.PropertyList.Left}px'});`)
          } else {
            // 图片不需要背景色
            eval(`$('.commonModule[data-id=${item.PropertyList.ZIndex}]').css({'borderColor':'${item.PropertyList.BorderColor}','height':'${item.PropertyList.Height}px','width':'${item.PropertyList.Width}px','top':'${item.PropertyList.Top}px','left':'${item.PropertyList.Left}px'});`)
          }
        } else {
          if (item.ControlType !== 'textsearch') {
            eval(`$('.commonModule[data-id=${item.PropertyList.ZIndex}]').css({'borderColor':'${item.PropertyList.BorderColor}','backgroundColor':'${item.PropertyList.BackColor}','height':'${item.PropertyList.Height}px','width':'${item.PropertyList.Width}px','top':'${item.PropertyList.Top}px','left':'${item.PropertyList.Left}px'});`)
          } else {
            eval(`$('.commonModule[data-id=${item.PropertyList.ZIndex}]').css({'borderColor':'${item.PropertyList.BorderColor}','height':'${item.PropertyList.Height}px','width':'${item.PropertyList.Width}px','top':'${item.PropertyList.Top}px','left':'${item.PropertyList.Left}px'});`)
          }
        }
        saveindex.push(item.PropertyList.ZIndex)
        selectdata[nowindex].PropertyList.Top = item.PropertyList.Top
        selectdata[nowindex].PropertyList.Left = item.PropertyList.Left
        Controls.ControlList.forEach((item1) => {
          if (item.PropertyList.ZIndex == item1.PropertyList.ZIndex) {
            item1.PropertyList.Top = item.PropertyList.Top
            item1.PropertyList.Left = item.PropertyList.Left
          }
        })
      }
      if (index > -1) {
        localdata.ControlList[index][curr] = 1
      }

      // })
      if (localdata.ControlList.length < 1) {
        if (Controls.ControlList[nowindex].TabEvent === 'style') {
          changeCommon({
            ...childItem.PropertyList,
            ControlType: childItem.ControlType
          }, parseInt(item.index))
        }
        // changeCommon({...childItem.PropertyList, ControlType: childItem.ControlType}, parseInt(item.index))
      }

      document.addEventListener('mouseup', up, true)
    }
    let up = (e) => {
      hasmove = false
      if (saveindex.length <= 1) {
        $(".details").show()
      } else {
        $(".details").hide()
        $("#chart-list").hide()
      }
      setTimeout(() => {

        if (localdata.ControlList.length !== 0) {
          if (type !== 'ctrl') {
            if (index.indexOf(parseInt(e.path[1].dataset.id)) <= -1) {
              selectdata = []
              localdata = {
                ControlList: [],
                Data: {
                  PieChartItemList: [],
                  DashBoardChartItemList: [],
                  BarChartItemList: [],
                  LineChartItemList: []
                }
              }
              setClass(saveindex)
            } else {
              setClass(saveindex)
            }

          }
        }
      }, 10)

      document.removeEventListener('mousemove', move, true)
      document.removeEventListener('mouseup', up, true)
      movestatus = ''
      // back(selectdata, Controls)
      // console.log("数据")
    }
    document.addEventListener('mousemove', move, true)
    document.addEventListener('mouseup', up, true)

  }

}

function handleMouseUp(e, index) {
  // wantindex 循环获取正确的下标
  let wantindex = null
  Controls.ControlList.forEach((nowitem, nowindex) => {
    if (nowitem.PropertyList.ZIndex == index) {
      wantindex = nowindex
    }
  })
  setTimeout(() => {
    if (Controls.ControlList[wantindex].TabEvent === 'event') {
      choice(Controls.ControlList[wantindex].TabEvent, wantindex, true)
    } else {
      chartsChangFun('style')
    }
  })
}

//获取最小值
function getMin(arr) {
  var min = arr[0];
  var index = 0;
  for (var i = 0; i < arr.length; i++) {
    if (min > arr[i]) {
      min = arr[i];
      index = i
    }
  }

  return {
    min: min,
    index: i
  };
}

// 给选中的画布元素添加选中效果
function setClass(i, EchartsName, EchartsType, ctype) {
  /* 
  type： 图表数据部分移动时，不需要隐藏iframe
  */
  // window.event.stopImmediatePropagation()

  //  event.stopImmediatePropagation()
  // let types = ['piechart', 'dashboardchart', 'barchart', 'linechart']
  // if (types.includes(Controls.ControlList[i].ControlType)) {
  //   $('#chart-list').css('display', 'none')
  // } else {
  //   $('#chart-list').css('display', 'none')
  // }
  //  图表数据隐藏
  var list = [...document.getElementsByClassName('commonModule')]
  var str = ``
  if (type == 'ctrl') {
    if (!(i instanceof Array)) {
      let d = [];
      d.push(i)
      i = d
      localdata.ControlList.forEach((item) => {
        if (i.indexOf(item.PropertyList.ZIndex) <= -1) {
          i.push(item.PropertyList.ZIndex)
        }
      })
    } else {
      localdata.ControlList.forEach((item) => {
        if (i.indexOf(item.PropertyList.ZIndex) <= -1) {
          i.push(item.PropertyList.ZIndex)
        }
      })
    }

  }
  // 判断是否为多选或者单个
  if (!(i instanceof Array)) {
    // zzindex 循环获取正确下标

    let zzindex = null
    Controls.ControlList.forEach((nowitem, nowindex) => {
      if (nowitem.PropertyList.ZIndex == i) {
        zzindex = nowindex
      }
    })
    if (!ctype) {
      // 不是图表移动时需把图表iframe隐藏 
      $('#chart-list').css('display', 'none')
      // 如果为查询，重置按钮，则需要调用全选
      let btns = ['searchbutton']
      if (zzindex !== null && btns.includes(Controls.ControlList[zzindex].ControlType)) {
        initCheckAll()
      }

    } else {
      // 图表移动判断是否为数据部分移动， 是则显示，否隐藏
      if (Controls.ControlList[zzindex].TabEvent === 'style') {
        $('#chart-list').css('display', 'none')
      }
    }


    if (type !== 'ctrl') {
      selectdata = []

      localdata.ControlList = []
    }
    setTimeout(() => {
      let ids = []
      list.forEach((item) => {
        if (item.dataset.id == i) {
          let wantindex = '不选中'
          Controls.ControlList.forEach((nowitem, nowindex) => {
            if (nowitem.PropertyList.ZIndex == i) {
              wantindex = nowindex
            }
          })

          if (wantindex !== '不选中') {
            // item.classList.remove("activeItem")
            // item.className += ' activeItem'

            if (Controls.ControlList[wantindex].pointList && Controls.ControlList[wantindex].pointList.length !== 0) {
              if (!ids.includes(item.dataset.id)) {
                Controls.ControlList[wantindex].pointList.forEach((p) => {
                  // str += `<div class="edit-shape-point"> </div>`
                  let style = getPointStyle(p, wantindex)
                  str += `<div class="edit-shape-point" onmousedown="handleMouseDownOnPoint('${p}',event, 'div', ${i},this)" style="left: ${style.left};top: ${style.top};margin-left: ${style.marginLeft};margin-top: ${style.marginTop};
                cursor: ${style.cursor}"> </div>`
                })

              Controls.ControlList[wantindex].index = wantindex
              localdata.ControlList.push(Controls.ControlList[wantindex])

              $('.edit-shape-point').remove()

              selectdata.push(Controls.ControlList[wantindex])
              item.insertAdjacentHTML('beforeend', str)
              }
            }
          }
        } else {

          if (type !== 'ctrl') {

            item.classList.remove("activeItem")
            item.classList.remove("edit-shape-point")
            let child = [...item.children]
            child.forEach(item => {
              if (item.className === 'edit-shape-point') {
                item.parentNode.removeChild(item)
              }
            })
          }

        }
        ids.push(item.dataset.id)
      })

    });

  } else {

    if (type !== 'ctrl') {
      selectdata = []
      localdata.ControlList = []

    }
    i = [...new Set(i)]
    setTimeout(() => {
      i.forEach((itemi) => {

        list.forEach((item) => {
          if (item.dataset.id == itemi) { // 注意：此处用== 不用===
            // item.className += ' activeItem'
            str = ``
            let nowindex = ''
            Controls.ControlList.forEach((item, index1) => {
              if (item.PropertyList.ZIndex == itemi) {
                nowindex = index1
              }
            })
            if (Controls.ControlList[nowindex].pointList && Controls.ControlList[nowindex].pointList.length !== 0) {
              Controls.ControlList[nowindex].pointList.forEach((p) => {
                let style = getPointStyle(p, nowindex)
                str += `<div class="edit-shape-point" onmousedown="handleMouseDownOnPoint('${p}',event, 'div', ${i},this)" style="left: ${style.left};top: ${style.top};margin-left: ${style.marginLeft};margin-top: ${style.marginTop};
                   cursor: ${style.cursor}"> </div>`

              })
            }
            Controls.ControlList[nowindex].index = nowindex
            selectdata.push(Controls.ControlList[nowindex])
            localdata.ControlList.push(Controls.ControlList[nowindex])
            item.insertAdjacentHTML('beforeend', str)
          } else {
            if (i.indexOf(parseInt(item.dataset.id)) < 0 && type !== 'ctrl') {
              item.classList.remove("activeItem")
              item.classList.remove("edit-shape-point")
              let child = [...item.children]
              child.forEach(item => {
                if (item.className === 'edit-shape-point') {
                  item.parentNode.removeChild(item)
                }
              })
            }
          }
        })
      })
      // 选中组件根据zIndex重新排序
      selectdata.sort((a, b) => {
        return a.PropertyList.ZIndex - b.PropertyList.ZIndex
      })
      localdata.ControlList.sort((a, b) => {
        return a.PropertyList.ZIndex - b.PropertyList.ZIndex
      })
    })

  }
  setTimeout(() => {
    selectdata = [...new Set(selectdata)]
    localdata.ControlList = [...new Set(localdata.ControlList)]
    Controls.Data.PieChartItemList = [...new Set(Controls.Data.PieChartItemList)]
    localdata.Data = Controls.Data
    // if(type == 'ctrl'){ 
    //   selectdata = selectdata.reverse()
    // } 
    // 
  });

  //点击改变图表
  echartsDataInit(EchartsType, EchartsName)

}

function getPointStyle(point, index) {
  return this.convertPointStyle(point, Controls.ControlList[index].PropertyList, index)
}
// 绘制8个小圆点
function convertPointStyle(point, defaultStyle, index, directionKey = {
  t: 'n',
  b: 's',
  l: 'w',
  r: 'e'
}, ) {
  const pos = defaultStyle
  const height = pos.Height
  const width = pos.Width
  var borderWidth = pos.BorderWidth
  if (pos.ComName == '动态文本') {
    borderWidth = 0
  }

  let types = ['textsearch', 'datasearch', 'dropsearch', 'associatedatetimepicker', 'statictextblock', 'dynamictext', 'cornerbutton', 'rwtextbox', 'searchbutton', 'resetbutton']
  let hasT = /t/.test(point)
  let hasB = /b/.test(point)
  let hasL = /l/.test(point)
  let hasR = /r/.test(point)
  let newLeft = 0
  let newTop = 0
  if (Controls.ControlList[index].ControlType === 'line') { // 当元素为直线时特殊处理
    if (point.length === 2) {
      newLeft = hasL ? 0 : width
      newTop = hasT ? 0 : borderWidth * 2
      // 当有border-Width时需要减去borderWidth的大小
      if (borderWidth && borderWidth !== 0) {
        newLeft = newLeft - borderWidth
        newTop = newTop - borderWidth
      }
    } else {
      // !#zh 上下点，宽度固定在中间
      if (hasT || hasB) {
        newLeft = width / 2 - 5
        newTop = hasT ? 0 : borderWidth * 2
        // 当有border-Width时需要减去borderWidth的大小
        if (borderWidth && borderWidth !== 0) {
          newLeft = newLeft - borderWidth
          newTop = newTop - borderWidth
        }
      }
      // !#zh 左右点，高度固定在中间
      if (hasL || hasR) {
        newLeft = hasL ? 0 : width
        newTop = -borderWidth / 2 - 5
        // 当有border-Width时需要减去borderWidth的大小
        // if (borderWidth && borderWidth !== 0) {
        //   newLeft = newLeft - borderWidth
        //   newTop = newTop - borderWidth
        // }
      }
    }
  } else if (types.includes(Controls.ControlList[index].ControlType)) { // fix input框border导致选框错位问题
    if (point.length === 2) {
      newLeft = hasL ? 0 : width
      newTop = hasT ? 0 : height
    } else {
      // !#zh 上下点，宽度固定在中间
      if (hasT || hasB) {
        newLeft = width / 2 - 5
        newTop = hasT ? 0 : height
      }
      // !#zh 左右点，高度固定在中间
      if (hasL || hasR) {
        newLeft = hasL ? 0 : width
        newTop = height / 2 - 4.5
      }
    }
  } else {
    if (point.length === 2) {
      newLeft = hasL ? 0 : width
      newTop = hasT ? 0 : height
      // 当有border-Width时需要减去borderWidth的大小
      if (borderWidth && borderWidth !== 0) {
        newLeft = newLeft - borderWidth
        newTop = newTop - borderWidth
      }
    } else {
      // !#zh 上下点，宽度固定在中间
      if (hasT || hasB) {
        newLeft = width / 2 - 5
        newTop = hasT ? 0 : height
        // 当有border-Width时需要减去borderWidth的大小
        if (borderWidth && borderWidth !== 0) {
          newLeft = newLeft - borderWidth
          newTop = newTop - borderWidth
        }
      }
      // !#zh 左右点，高度固定在中间
      if (hasL || hasR) {
        newLeft = hasL ? 0 : width
        newTop = height / 2 - 4.5
        // 当有border-Width时需要减去borderWidth的大小
        if (borderWidth && borderWidth !== 0) {
          newLeft = newLeft - borderWidth
          newTop = newTop - borderWidth
        }
      }
    }
  }
  const style = {
    marginLeft: (hasL || hasR) ? '-5px' : 0,
    marginTop: (hasT || hasB) ? '-4px' : 0,
    left: `${newLeft}px`,
    top: `${newTop}px`,
    cursor: point.split('').reverse().map(m => directionKey[m]).join('') + '-resize'
  }

  return style
}

//切换标签重新赋值图表数据
function chartsChangFun(type,type1) {
  let rightType = type
  if (chartType != undefined) {
    if (chartType == 'piechart') { //饼图
       
      setTimeout(() => {
        try {
          if (document.getElementById('pie') != null) {
            if (localdata.ControlList.length == 1) {
              if(type1){
                if(localdata.Data.PieChartItemList.length>0){
                  BarChartData = localdata.Data.PieChartItemList[localdata.Data.PieChartItemList.length-1]
                }
                
               }
              // if(localdata.ControlList[0].Name == chartName){
              //   return
              // }else{
              // document.getElementById('pie').contentWindow.PieinitEchart(BarChartData,chartName,rightType)
              pie.PieinitEchart(BarChartData, chartName, rightType)
              pie.varEchartsFun(BarChartData, 'pie')

              // }
            }
          }
        } catch (err) {
          //在此处理错误
          console.log('这是一段贼神奇的代码002！！！')
        }
      }, 500)
      // iframe刷新
      dataPie.PieinitEchart(BarChartData, chartName, rightType)
      dataPie.varEchartsFun(BarChartData, 'pie')


    } else if (chartType == 'dashboardchart') { //仪表盘
      if(type1){
        if(localdata.Data.DashBoardChartItemList.length>0){
          BarChartData = localdata.Data.DashBoardChartItemList[localdata.Data.DashBoardChartItemList.length-1]
        }
        
       }
      setTimeout(() => {
        try {
          if (document.getElementById('dash') != null) {
            
            // document.getElementById('dash').contentWindow.DashinitEchart(BarChartData,chartName,rightType)
            dash.DashinitEchart(BarChartData, chartName, rightType)
            dash.varEchartsFun(BarChartData, 'dash')
          }
        } catch (err) {
          //在此处理错误
          console.log('这是一段贼神奇的代码003！！！')
        }
     }, 500)

      // iframe刷新
      if (document.getElementById('data-dash') != null) {
        dataDash.DashinitEchart(BarChartData, chartName, rightType)
        dataDash.varEchartsFun(BarChartData, 'dash')
      }
    } else if (chartType == 'barchart') { //柱形图
      if(type1){
        if(localdata.Data.BarChartItemList.length>0){
          BarChartData = localdata.Data.BarChartItemList[localdata.Data.BarChartItemList.length-1]
        }
        
       }
     setTimeout(() => {
        try {
          if (document.getElementById('barId') != null) {
            barId.BarinitEchart(BarChartData, chartName, rightType)
            // document.getElementById('barId').contentWindow.BarinitEchart(BarChartData,chartName,rightType)
            barId.varEchartsFun(BarChartData, 'bar')
            barId.AuxiliaryLineInit(BarChartData, 'bar')
          }
        } catch (err) {
          //在此处理错误
          console.log('这是一段贼神奇的代码004！！！')
        }
     }, 500)

      // iframe刷新
      if (document.getElementById('data-barId') != null) {
        // document.getElementById('data-barId').contentWindow.BarinitEchart(BarChartData,chartName,rightType)
        dataBarId.BarinitEchart(BarChartData, chartName, rightType)
        dataBarId.varEchartsFun(BarChartData, 'bar')
        dataBarId.AuxiliaryLineInit(BarChartData, 'bar')
      }
    } else if (chartType == 'linechart') { //折线图
      if(type1){
        if(localdata.Data.LineChartItemList.length>0){
          BarChartData = localdata.Data.LineChartItemList[localdata.Data.LineChartItemList.length-1]
        }
        
       }
     setTimeout(() => {
       
        try {
          if (document.getElementById('line') != null) {

            lineEchart.LineinitEchart(BarChartData, chartName, rightType)
            lineEchart.varEchartsFun(BarChartData, 'line')
            lineEchart.AuxiliaryLineInit(BarChartData, 'line')
          }
        } catch (err) {
          //在此处理错误
          console.log('这是一段贼神奇的代码005！！！')
        }
     }, 500)

      // iframe刷新
      if (document.getElementById('data-line') != null) {
        dataLine.LineinitEchart(BarChartData, chartName, rightType)
        dataLine.varEchartsFun(BarChartData, 'line')
        dataLine.AuxiliaryLineInit(BarChartData, 'line')
      }
    }
  }
}

let cfName
//赋值右侧图表数据
function echartsDataInit(EchartsType, EchartsName) {
  if (EchartsType == 'piechart') { //点击饼图
    for (let i = 0; i < Controls.Data.PieChartItemList.length; i++) {
      if (Controls.Data.PieChartItemList[i].name == EchartsName) {
        BarChartData = Controls.Data.PieChartItemList[i] //饼图数据、类型、名字
        chartType = 'piechart'
        chartName = EchartsName
      }
    }
   setTimeout(() => {
      try {
        if (document.getElementById('pie') != null && EchartsName != undefined) {
          //图表属性配置和变量配置初始化
          if (cfName == EchartsName) {
            return
          } else {
            pie.PieinitEchart(BarChartData, EchartsName)
            // document.getElementById('pie').contentWindow.varEchartsFun(BarChartData,'pie')
            pie.varEchartsFun(BarChartData, 'pie')
            cfName = EchartsName
          }

        }
      } catch (err) {
        //在此处理错误
        console.log('捕获一段贼神奇的代码001！！！')
      }
   }, 500)
  } else if (EchartsType == 'dashboardchart') { //点击仪表盘
    for (let i = 0; i < Controls.Data.DashBoardChartItemList.length; i++) {
      if (Controls.Data.DashBoardChartItemList[i].name == EchartsName) {
        BarChartData = Controls.Data.DashBoardChartItemList[i] //仪表盘数据、类型、名字
        chartType = 'dashboardchart'
        chartName = EchartsName
      }
    }
    setTimeout(()=>{
    try {
      if (document.getElementById('dash') != null && EchartsName != undefined) {
        if (cfName == EchartsName) {
          return
        } else {
          dash.DashinitEchart(BarChartData, EchartsName)
          dash.varEchartsFun(BarChartData, 'dash')
          cfName = EchartsName
        }
      }
    } catch (err) {
      //在此处理错误
      console.log('捕获一段贼神奇的代码002！！！')
    } //图表属性配置和变量配置初始化
   },500)
  } else if (EchartsType == 'barchart') {
    for (let i = 0; i < Controls.Data.BarChartItemList.length; i++) {
      if (Controls.Data.BarChartItemList[i].name == EchartsName) { //柱形图数据、类型、名字
        BarChartData = Controls.Data.BarChartItemList[i]
        chartType = 'barchart'
        chartName = EchartsName
      }
    }
    setTimeout(() => {
      try {
        if (document.getElementById('barId') != null && EchartsName != undefined) {


          if (cfName == EchartsName) {
            return
          } else {
            barId.BarinitEchart(BarChartData, EchartsName)
            barId.varEchartsFun(BarChartData, 'bar')
            barId.AuxiliaryLineInit(BarChartData, 'bar')
            cfName = EchartsName
          }


        }
      } catch (err) {
        //在此处理错误
        console.log('捕获一段贼神奇的代码003！！！')
      } //图表属性配置和变量、辅助线配置初始化
    }, 500)
  } else if (EchartsType == 'linechart') {
    for (let i = 0; i < Controls.Data.LineChartItemList.length; i++) {
      if (Controls.Data.LineChartItemList[i].name == EchartsName) { //折线图数据、类型、名字
        BarChartData = Controls.Data.LineChartItemList[i]
        chartType = 'linechart'
        chartName = EchartsName
      }
    }
 setTimeout(() => {
    try {
      if (document.getElementById('line') != null && EchartsName != undefined) {
        if (cfName == EchartsName) {
          return
        } else {
          lineEchart.LineinitEchart(BarChartData, EchartsName)
          lineEchart.varEchartsFun(BarChartData, 'line')
          lineEchart.AuxiliaryLineInit(BarChartData, 'line')
          cfName = EchartsName

        }


      }
    } catch (err) {
      //在此处理错误
      console.log('捕获一段贼神奇的代码004！！！')
    } //图表属性配置和变量、辅助线配置初始化
    }, 500)
  }
}

function initReuseTree() {
  let postData = {
    appId,
    name: $("#reuseSearchInput").val()
  }
  request.get(`/bi/${appId}/panel-tree/cite`, {
    params: postData
  }).then(res => {
    if (res.data.data) {
      let data = res.data.data
      let data1 = []
      data.forEach(item => {
        if (item.nodeType == 'group') {
          // item.nocheck = true
          item.icon = "./styles/iconTool/icon_file.png"
        } else if(item.nodeType == 'panel'){
          item.icon = "./styles/iconTool/icon_monitor_nor.png"
        }else if(item.nodeType == 'assembly'){
          item.icon = './imgs/zujian.png'
        }
        

      })

      $.fn.zTree.init($("#reusetree"), reuseSetting, data);
      let zTree = $.fn.zTree.getZTreeObj("reusetree");
      zTree.expandAll(true)
    } else {
      appTips.errorMsg(res.data.msg)
    }

  })
}

function searchReuseTree(e) {
  let postData = {
    appId,
    name: e.target.previousElementSibling.value
  }
  request.get(`/bi/${appId}/panel-tree/cite`, {
    params: postData
  }).then(res => {
    let data = res.data.data
    data.forEach(item => {
      if (item.nodeType == 'group') {
        // item.nocheck = true
        item.icon = "./styles/iconTool/icon_file.png"
      } else if(item.nodeType == 'panel'){
        item.icon = "./styles/iconTool/icon_monitor_nor.png"
      }else if(item.nodeType == 'assembly'){
        item.icon = './imgs/zujian.png'
      }

    })
    if (res.data.data) {
      $.fn.zTree.init($("#reusetree"), reuseSetting, data);
      let zTree = $.fn.zTree.getZTreeObj("reusetree");
      zTree.expandAll(true)
    } else {
      appTips.errorMsg(res.data.msg)
    }
  })
}

function reusedown(e, id, node) {
  e.stopImmediatePropagation()
  // if (node && node.nodeType === 'group') {
  //   return
  // }
  currentReuseNode = node
  let name = ''
  if (node && node.parentId /* && node.nodeType === 'assembly' */ ) {
    e.target.setAttribute('draggable', true)
    if (e.target.parentElement.tagName === 'LI') {
      name = e.target.lastElementChild.innerText
    } else {
      name = e.target.parentElement.lastElementChild.innerText
    }
    document.addEventListener('dragstart', function (e) {
      e.dataTransfer.setData("index", JSON.stringify(name))
      e.dataTransfer.effectAllowed = 'copyMove'
    }, false)

    document.addEventListener("drag", function (e) {
      e.preventDefault()
    }, false)
  }

  // var treeObj = $.fn.zTree.getZTreeObj("reusetree");
  //   var nodes = treeObj.getSelectedNodes();
  //   var node = nodes[0];
  //   if(node.isParent){
  //     //判断后做操作
  // }
  //         //为父节点
}
// 打开复用弹窗

function openReuse() {
  let reuse = document.getElementById('reuse')
  let style = window.getComputedStyle(reuse)
  if (style.left === '-300px') {
    reuse.style.left = '0px'
    initReuseTree()
  } else {
    reuse.style.left = '-300px'
  }

}
// 关闭复用弹窗
function closeReuse() {
  let reuse = document.getElementById('reuse')
  reuse.style.left = '-300px'
}
// Colorpicker.create({
//         el: "color-picker1",
//         color: "rgba(0,0,0,0)",
//         change: function (elem, hex,rgba) {
//           elem.style.backgroundColor = `rgba(`+rgba.r+','+rgba.g+','+rgba.b+','+rgba.a+')';
//           // Controls.ControlList[index].PropertyList.Color = `rgba(`+rgba.r+','+rgba.g+','+rgba.b+','+rgba.a+')';
//           // if((data.ControlType!='piechart'&&data.ControlType!='dashboardchart'&&data.ControlType!='barchart'&&data.ControlType!='linechart')){
//           //   childElement(index)
//           // }
//         }
//       })

// function showMore (event, index) {
//   let rect = event.target.getBoundingClientRect()
//   if ($(`#moreTool-rect`).css('display') === 'none') {
//     $(`#moreTool-rect`).css('display', 'block')
//     $(`#moreTool-rect`).css('top', rect.top + rect.height + 4)
//     $(`#moreTool-rect`).css('left', rect.right - rect.width)
//   } else {
//     $(`#moreTool-rect`).css('display', 'none')
//   }
// }

function showMore (event, index) {
  // moreTool4: 矩形更多样式 模板弹窗id
  // moreTool5: 标题更多样式 模板弹窗id
  if (btns[index].ControlType === 'solidrectangle') { // 矩形样式模板
    if ($(`#moreTool${index}`).css('display') === 'none') {
      $(`#moreTool${index}`).css('display', 'block')
      $(`#moreTool5`).css('display', 'none')
    } else {
      $(`#moreTool${index}`).css('display', 'none')
    }
  }
  
  if (btns[index].ControlType === 'titleCom') { // 标题样式模板
    if ($(`#moreTool${index}`).css('display') === 'none') {
      $(`#moreTool${index}`).css('display', 'block')
      $(`#moreTool4`).css('display', 'none')
    } else {
      $(`#moreTool${index}`).css('display', 'none')
    }
  }
  
}

function renderMore(type, index) {
  let str = ''
  if (type === 'solidrectangle') {
    str += `<div class="${type}-more" id="moreTool${index}">
        <div class="moretool-wrap" >
            <div class="wrap-border" >
                <div draggable="true" class="btn" data-id="${index}" data-subId="${index}-1" >
                    <div class="wrap-border-subDiv1" ></div>
                </div>
                <div>边框一</div>    
            </div> 
            <div class="wrap-border" >
                <div draggable="true" class="btn" data-id="${index}" data-subId="${index}-2">
                    <div class="wrap-border-subDiv2" ></div>    
                </div>
                <div>边框二</div>    
            </div>
            <div class="wrap-border" >
                <div draggable="true" class="btn" data-id="${index}" data-subId="${index}-3">
                    <div class="wrap-border-subDiv3" ></div>    
                </div>
                <div>边框三</div>    
            </div>   
        </div> 
        <div class="moretool-wrap">
            <div class="wrap-border" >
                <div draggable="true" class="btn" data-id="${index}" data-subId="${index}-4">
                    <div class="wrap-border-subDiv4" ></div>
                </div>
                <div>边框四</div>    
            </div>
            <div class="wrap-border" >
                <div draggable="true" class="btn" data-id="${index}" data-subId="${index}-5">
                    <div class="wrap-border-subDiv5" ></div>
                </div>
                <div>边框五</div>    
            </div>
            <div class="wrap-border" >
                <div draggable="true" class="btn" data-id="${index}" data-subId="${index}-6">
                    <div class="wrap-border-subDiv6" ></div>
                </div>
                <div>边框六</div>    
            </div>
        </div>    
    </div>`
  }
  if (type === 'titleCom' ) {
    str += `<div class="${type}-more" id="moreTool${index}">
        <div class="titleCom-wrap" >
            <div class="wrap-titleCom" >
                <div draggable="true" class="btn btn-titleCom" data-id="${index}" data-subId="${index}-1" >
                    <div class="wrap-titleCom-subDiv1" ></div>
                </div>
                <div class="titleCom-border">标题边框一</div>    
            </div> 
            <div class="wrap-titleCom" >
                <div draggable="true" class="btn btn-titleCom" data-id="${index}" data-subId="${index}-2">
                    <div class="wrap-titleCom-subDiv2" ></div>    
                </div>
                <div class="titleCom-border">标题边框二</div>    
            </div>
            <div class="wrap-titleCom" >
                <div draggable="true" class="btn btn-titleCom" data-id="${index}" data-subId="${index}-3">
                    <div class="wrap-titleCom-subDiv3" ></div>    
                </div>
                <div class="titleCom-border">标题边框三</div>    
            </div>
            <div class="wrap-titleCom" >
                <div draggable="true" class="btn btn-titleCom" data-id="${index}" data-subId="${index}-4">
                    <div class="wrap-titleCom-subDiv4" ></div>    
                </div>
                <div class="titleCom-border">标题边框四</div>    
            </div>   
        </div> 
    </div>`
  }

  return str
}

// 渲染功能按钮--更多功能
function renderFuncMore() {
  let div = document.getElementById('funcBtns')
  let funcStr = ``
  if ((div.scrollHeight > div.clientHeight) || (div.offsetHeight > div.clientHeight)) { // 判断出现滚动条
      funcStr += `
      <li  class="li btns-li" onclick="preview()">
        <button class="bi-btn btn-primary" style="background:#409EFF;border-color:#409EFF;color:#fff;border-radius:4px;padding:8px 15px;outline:none"><span>预览</span></button>
      </li>
      <li class="li btns-li" id="btn-savePublish" style="width: 92px">
        <button class="bi-btn btn-primary" style="background:#409EFF;border-color:#409EFF;color:#fff;border-radius:4px;padding:8px 15px;outline:none"><span>保存并发布</span></button>
      </li>  
      <li  class="li btns-li" id="btn-save">
      <div id="saveBtnTips" style="position: absolute;width: 39px;height: 15px;top:-7px;right: -18px;z-index: 23;display:none;" ><img src="../imgs/newData.png" style="width:100%"/></div>
        <button class="bi-btn btn-primary" style="background:#409EFF;border-color:#409EFF;color:#fff;border-radius:4px;padding:8px 15px;outline:none"><span>保存</span></button>
      </li>  
      <li class="li btns-li" id="btn-morebtn" onclick="showFuncMore(event)" >
        <button class="bi-btn btn-primary" style="background:#409EFF;border-color:#409EFF;color:#fff;border-radius:4px;padding:8px 15px;outline:none"><span>更多</span></button>
      </li> 
      <li class="li something"><img src="./images/gengduo@2x.png" alt="">
        <div class="floattap">
        </div>
      </li>`.trim()

      let moreStr = `
        <div id="morebtn-groups" style="display: none" >
          <div class="func-more" >
            <div class="li btns-li" onclick='openReuse()'>
              <button class="bi-btn btn-primary" style="background:#409EFF;border-color:#409EFF;color:#fff;border-radius:4px;padding:8px 15px;outline:none"><span>复用</span></button>
            </div> 
            <div  class="li btns-li"  onclick="setPanelFunc()">
              <button class="bi-btn btn-primary" style="background:#409EFF;border-color:#409EFF;color:#fff;border-radius:4px;padding:8px 15px;outline:none"><span>看板设置</span></button>
            </div> 
            <div  class="li btns-li" id="btn-saveAs" >
              <button class="bi-btn btn-primary" style="background:#409EFF;border-color:#409EFF;color:#fff;border-radius:4px;padding:8px 15px;outline:none"><span>另存为</span></button>
            </div>
          </div>
        </div>
      `
    $('.page-tools').append(moreStr)
  } else {
    funcStr += `
    <li style="display:none" onmouseover="showTips(event,'')"  id="topRestore" class="li btns-li" onclick='restore()'>
      <button class="bi-btn btn-primary" style="background:#409EFF;border-color:#409EFF;color:#fff;border-radius:4px;padding:8px 15px;outline:none"><span>恢复</span></button>
    </li>  
    <li class="li btns-li" onclick='openReuse()'>
      <button class="bi-btn btn-primary" style="background:#409EFF;border-color:#409EFF;color:#fff;border-radius:4px;padding:8px 15px;outline:none"><span>复用</span></button>
    </li> 
    <li  class="li btns-li" style="width:78px" onclick="setPanelFunc()">
      <button class="bi-btn btn-primary" style="background:#409EFF;border-color:#409EFF;color:#fff;border-radius:4px;padding:8px 15px;outline:none"><span>看板设置</span></button>
    </li> 
    <li  class="li btns-li" onclick="preview()">
      <button class="bi-btn btn-primary" style="background:#409EFF;border-color:#409EFF;color:#fff;border-radius:4px;padding:8px 15px;outline:none"><span>预览</span></button>
    </li>
    <li  class="li btns-li" id="btn-saveAs" style="width: 63px" >
      <button class="bi-btn btn-primary" style="background:#409EFF;border-color:#409EFF;color:#fff;border-radius:4px;padding:8px 15px;outline:none"><span>另存为</span></button>
    </li >
    <li  class="li btns-li" id="btn-save">
    <div id="saveBtnTips" style="position: absolute;width: 39px;height: 15px;top:-7px;right: -18px;z-index: 23;display:none;" ><img src="./imgs/newData.png" style="width:100%"/></div>
      <button class="bi-btn btn-primary" style="background:#409EFF;border-color:#409EFF;color:#fff;border-radius:4px;padding:8px 15px;outline:none"><span>保存</span></button>
    </li>  
    <li class="li btns-li" id="btn-savePublish" style="width: 90px">
      <button class="bi-btn btn-primary" style="background:#409EFF;border-color:#409EFF;color:#fff;border-radius:4px;padding:8px 15px;outline:none"><span>保存并发布</span></button>
    </li>  
    <li class="li something"><img src="./images/gengduo@2x.png" alt="">
      <div class="floattap">
      </div>
    </li> 
    `.trim()
    if ($('#morebtn-groups')) {
      $('#morebtn-groups').css('display', 'none')
    }
  }
  $('#funcBtns').html('')
  $('#funcBtns').append(funcStr)

  let saveBtn = document.getElementById('btn-save')
  let saveAsBtn = document.getElementById('btn-saveAs')
  let savePublishBtn = document.getElementById('btn-savePublish')

  saveBtn.addEventListener('click', debounce(save, 300))
  saveAsBtn.addEventListener('click', debounce(saveAs, 300))
  savePublishBtn.addEventListener('click', debounce(savePublish, 300))
} 


  // 功能按钮  -- 更多
  function showFuncMore() {
    if ($('#morebtn-groups').css('display') === 'none') {
      $('#morebtn-groups').css('display', 'block')
    } else {
      $('#morebtn-groups').css('display', 'none')
    }
    
  }


  // 选择关联变量表格 下拉框 点击空白隐藏下拉内容
//   $(document).bind("click", function(e) {
//     var target = $(e.target);
//     if ($("#datatextblockDevice") && target.closest("#datatextblockDevice").length == 0) { //点击id之外的地方触发
//         // 要实现的代码
//         $(".drop-down-list>li").remove()
//         $(".select-drop-down").remove()
//     }
// })

function imgDisabled() {
  let arr = revoke.flat(Infinity)
  if (arr.length === 1 || !isresdata) {
    $('#goback').addClass('img-disabled')
  } else {
    $('#goback').removeClass('img-disabled')
  }
  if (recovery.length === 0 || !isresdata) {
    $('#backgo').addClass('img-disabled')
  } else {
    $('#backgo').removeClass('img-disabled')
  }
}
