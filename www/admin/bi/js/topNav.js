/* 顶部导航栏事件 */
// 预览功能
function preview() {
  window.open('preview.html', '_parent')
  localStorage.setItem("CommonCanvas", JSON.stringify(commonList))
  localStorage.setItem("Controls", JSON.stringify(Controls))
  localStorage.setItem("percentage", JSON.stringify($('.viewpass').text()))
  localStorage.setItem("isPreview", JSON.stringify(true)) // 是否点击预览 ====> 用于缩放判断
  // localStorage.setItem("")
}

// 控制按钮数据重组
function setCornerbutton() {
  Controls.ControlList.forEach((item, index) => {
    if (item.ControlType === "cornerbutton") {
      if (item.radioType == '0') {
        item.ButtonTypeList[1].DataList = []
        item.ButtonTypeThreeList = []
      } else if (item.radioType == '1') {
        item.ButtonTypeList[0].DataList = []
        item.ButtonTypeThreeList = []
      } else if (item.radioType == '2') {
        item.ButtonTypeList[0].DataList = []
        item.ButtonTypeList[1].DataList = []
      }
    }
  })
}

function judgeData() {
  // Controls.ControlList.forEach(cc => {
  //   // if
  //   // if()
  //   
  // })
  let judgeDataType = true

  function getListFun1(DataList, ControlList, type) {
    if (DataList) {
      let data = DataList.filter(x => x.variable == '选择')
      if (data.length > 0) {
        appTips.errorMsg(ControlList.PropertyList.ComName + '-' + ControlList.title + '该组件数据不完整，无法进行发布，请填写完整')
        judgeDataType = false
        return
      }
      if (DataList.length == 0) {
        if (type) { // 控制按钮单独判断
          if (data.length === 0) {
            appTips.errorMsg(ControlList.PropertyList.ComName + '-' + ControlList.title + '该组件数据不完整，无法进行发布，请填写完整')
            judgeDataType = false
            return
          }
          if (DataList.length == 0) {
            appTips.errorMsg(ControlList.PropertyList.ComName + '-' + ControlList.title + '该组件数据不完整，无法进行发布，请填写完整')
            judgeDataType = false
            return
          }
        } else {
          appTips.errorMsg(ControlList.PropertyList.ComName + '-' + ControlList.title + '该组件数据不完整，无法进行发布，请填写完整')
          judgeDataType = false
          return
        }
      }

    }
  }
  for (let i = 0; i < Controls.ControlList.length; i++) {
    let ControlList = Controls.ControlList[i]
    if (ControlList.ControlType == "associatedatetimepicker") {
      if (!ControlList.StartTime) {
        appTips.errorMsg(ControlList.PropertyList.ComName + '组件未选择初始时间，暂不能保存并发布')
        judgeDataType = false
        return
      }
      if (!ControlList.EndTime) {
        appTips.errorMsg(ControlList.PropertyList.ComName + '组件未选择结束时间，暂不能保存')
        judgeDataType = false
        return
      }
    }
    for (let key in ControlList) {
      if (key == 'DataList' || key == 'ButtonTypeThreeList' || key == 'ButtonTypeList') {
        if (key == 'ButtonTypeList') {
          let ButtonTypeList = ControlList[key]
          if (ControlList.radioType == 0) {
            getListFun1(ButtonTypeList[0].DataList, ControlList, 'btn')
          } else if (ControlList.radioType == 1) {
            getListFun1(ButtonTypeList[1].DataList, ControlList, 'btn')
          } else if (ControlList.radioType == 2) {
            getListFun1(ControlList[key], ControlList, 'btn')
          }
        }
      }
    }

  }



  function getListFun(list) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].defaultDataConfig.datatype == '实时数据' || list[i].defaultDataConfig.datatype == '历史数据') {
        let variable = []
        if (list[i].option.Variables) {
          // 折线图  柱状图  饼图
          variable = list[i].option.Variables.filter(x => x.VariableName == '请选择' || x.VariableName == undefined || x.VariableName == '选择' || x.VariableName == '')
        }

        if (list[i].option.Variable) {
          // 仪表盘
          if (list[i].option.Variable.VariableName == '选择' || list[i].option.Variable.VariableName == undefined || list[i].option.Variable.VariableName == '') {
            variable.push(list[i].option.Variable)
          }
        }

        if (variable.length > 0) {
          let name = Controls.ControlList.filter(x => x.Name == list[i].name)
          if (name[0].ControlType === 'piechart') {
            appTips.errorMsg(name[0].PropertyList.ComName + ' --- 维度中存在的 "变量" 属性为空，无法进行发布，请填写完整')
          } else if (name[0].ControlType === 'dashboardchart') {
            if ( list[i].defaultDataConfig.datatype === '历史数据') {
              appTips.errorMsg(name[0].PropertyList.ComName + ' --- 指针角度中存在的 "变量" 或 "取值" 属性为空，无法进行发布，请填写完整')
            } else {
              appTips.errorMsg(name[0].PropertyList.ComName + ' --- 指针角度中存在的 "变量" 属性为空，无法进行发布，请填写完整')
            }
          } else {
            appTips.errorMsg(name[0].PropertyList.ComName + ' --- 纵轴中存在的 "变量" 属性为空，无法进行发布，请填写完整')
          }
          // $(`#${name[0].Name}`).addClass('verify-failed')
          judgeDataType = false
          return
        }
      } else if (list[i].defaultDataConfig.datatype == '业务数据') {
        if (list[i].name.indexOf("linechart") !== -1 || list[i].name.indexOf("barchart") !== -1) { // 折线图 --- 柱状图业务数据表格判断
          if (list[i].fieldData) {
            if (list[i].fieldData.FieldName == '请选择' || list[i].fieldData.FieldName == '配置字段' || list[i].fieldData.FieldName === undefined || list[i].fieldData.FieldName === '') {
              let name = Controls.ControlList.filter(x => x.Name == list[i].name)
              appTips.errorMsg(name[0].PropertyList.ComName + ' --- 横轴中存在的 "选择字段" 属性为空，无法进行发布，请填写完整')
              // $(`#${name[0].Name}`).addClass('verify-failed')
              judgeDataType = false
              return

            }
            if (list[i].option.Variables) {
              variable = list[i].option.Variables.filter(x => x.FieldName == '配置字段' || x.FieldName == '请选择' || x.FieldName === undefined || x.FieldName == '选择' || x.FieldName == ''  || x.rangevalue === '')
            }

            if (variable.length > 0) {
              let name = Controls.ControlList.filter(x => x.Name == list[i].name)
              appTips.errorMsg(name[0].PropertyList.ComName + ' --- 纵轴中存在的 "字段" 或 "取值" 属性为空，无法进行发布，请填写完整')
              // $(`#${name[0].Name}`).addClass('verify-failed')
              judgeDataType = false
              return
            }

          }
        } else if (list[i].name.indexOf("dashboardchart") !== -1) { // 仪表盘判断
          let variable = []
          if (list[i].option.Variable) {
            if (list[i].option.Variable.FieldName === '选择' || list[i].option.Variable.FieldName === '请选择' || list[i].option.Variable.FieldName === undefined || list[i].option.Variable.FieldName === '' || list[i].option.Variable.rangevalue === '') {
              variable.push(list[i].option.Variable)
            }

            if (variable.length > 0) {
              let name = Controls.ControlList.filter(x => x.Name == list[i].name)
              appTips.errorMsg(name[0].PropertyList.ComName + '--- 指针角度中存在的 "字段" 或 "取值" 属性为空，无法进行发布，请填写完整')
              // $(`#${name[0].Name}`).addClass('verify-failed')
              judgeDataType = false
              return
            }

          }
        } else if (list[i].name.indexOf("piechart") !== -1) { // 饼图
          let variable = []
          if (list[i].option.Variables) {
            let dimen = list[i].option.Variables.filter(x => x.FieldName == '配置字段' || x.FieldName == undefined || x.FieldName == '' || x.rangevalue === '')
            if (dimen.length !== 0) {
              let name = Controls.ControlList.filter(x => x.Name == list[i].name)
              appTips.errorMsg(name[0].PropertyList.ComName + '--- 维度中存在的 "字段" 或 "取值" 属性为空，无法进行发布，请填写完整')
              // $(`#${name[0].Name}`).addClass('verify-failed')
              judgeDataType = false
              return
            }
          }

          if (list[i].fieldData) {
            if (list[i].fieldData.FieldName === '配置字段' || list[i].fieldData.FieldName === '') {
              variable.push(list[i].fieldData)
            }
          }

          if (variable.length > 0) {
            let name = Controls.ControlList.filter(x => x.Name == list[i].name)
            appTips.errorMsg(name[0].PropertyList.ComName + '--- 指标中存在的 "选择字段" 属性为空，无法进行发布，请填写完整')
            // $(`#${name[0].Name}`).addClass('verify-failed')
            judgeDataType = false
            return
          }

        }

      }
    }

  }
  let ControlsData = Controls.Data
  for (let key in ControlsData) {

    getListFun(ControlsData[key])

  }
  // Controls.Data.forEach(item=>{
  // })

  return judgeDataType
}

$(document).ready(function () {
  let saveBtn = document.getElementById('btn-save')
  let saveAsBtn = document.getElementById('btn-saveAs')
  let savePublishBtn = document.getElementById('btn-savePublish')

  saveBtn.addEventListener('click', debounce(save, /* 500 */))
  saveAsBtn.addEventListener('click', debounce(saveAs, /* 500 */))
  savePublishBtn.addEventListener('click', debounce(savePublish, /* 500 */))
})

// 保存功能
function save() {
  // localStorage.setItem("CommonCanvas", JSON.stringify(commonList))
  // localStorage.setItem("saveControls", JSON.stringify(Controls))
  setCornerbutton()
  let index = layer.load(2, {
    shade: [0.01, '#000'], //0.1透明度的白色背景
    success: function (layerContentStyle) {
      // let html = `<div class="loading-content" >加载中...</div>`
      // layerContentStyle.find('.layui-layer-content').append(html)
    }
  });
  
  Object.assign(Controls, commonList)
  // let groupName = $('#attrPosition').val()

  if (commonList.Name.trim() === '') {
    appTips.errorMsg('名称不能为空')
    window.parent.postMessage({
      saveFinish: false,
      source: 'SYCBIEDITSAVEFINISH'
    }, '*')
    return
  }
  if (currentPosNode) {
    if (!currentPosNode.name) {
      appTips.errorMsg('请先选择位置')
      window.parent.postMessage({
        saveFinish: false,
        source: 'SYCBIEDITSAVEFINISH'
      }, '*')
      return
    }

    let groupId = currentPosNode.id
    let description = commonList.Description
    let accessType = commonList.Permision
    let assemblys = []
    let panelName = commonList.Name
    // Controls.ControlList.forEach((item, index) => {
    //   assemblys.push({
    //     key: item.index,
    //     name: item.Name
    //   })
    // })
    let controlList = Controls.ControlList
    for (let i = 0; i < controlList.length; i++) {
      if (controlList[i].ControlType == "associatedatetimepicker") {
        if (!controlList[i].StartTime) {
          appTips.errorMsg(controlList[i].PropertyList.ComName + '组件未选择初始时间，暂不能保存')
          window.parent.postMessage({
            saveFinish: false,
            source: 'SYCBIEDITSAVEFINISH'
          }, '*')
          return
        }
        if (!controlList[i].EndTime) {
          appTips.errorMsg(controlList[i].PropertyList.ComName + '组件未选择结束时间，暂不能保存')
          window.parent.postMessage({
            saveFinish: false,
            source: 'SYCBIEDITSAVEFINISH',
          }, '*')
          return
        }
      }
      let newIndex = controlList[i].Name.replace(/[^0-9]/ig,"")
      if (controlList[i].index === undefined) {
        Controls.ControlList[i].index = index
      }
      if (controlList[i].PropertyList.ComName === undefined) {
        Controls.ControlList[i].PropertyList.ComName = controlList[i].title + newIndex
      }
      assemblys.push({
        key: controlList[i].index,
        name: controlList[i].PropertyList.ComName
      })
    }
    configDetails = JSON.stringify(Controls)
    let postData = {
      assemblys,
      configDetails,
      panelId,
      permission: {
        accessType,
        customPermissions: permissionData.customPermissions,
        description,
        groupId,
        panelId,
        panelName
      }
    }
    request.post(`/bi/${appId}/panel-configs`, postData).then(res => {
      if (res.data.code === 0) {
        appTips.successMsg('保存成功!')
        $("#topRestore").show()
        $("#saveBtnTips").hide()
        window.parent.postMessage({
          saveFinish: true,
          source: 'SYCBIEDITSAVEFINISH'
        }, '*')
      } else {
        appTips.errorMsg(res.data.msg)
        window.parent.postMessage({
          saveFinish: false,
          source: 'SYCBIEDITSAVEFINISH'
        }, '*')
      }
      layer.close(index)
    }).catch(err => {
      console.log(err)
      layer.close(index)
    })
  }

}
//仪表板设置
function setPanelFunc() {
  $('.details').show()
  initCommon()
  $('#chart-list').css('display', 'none')

}
//恢复
function restore() {
  let cloneData = JSON.stringify(cloneControls)
  Controls = JSON.parse(cloneData)
  // Controls = cloneControls
  childElement('index', undefined, 'all')
  setTimeout(() => {
    PieChartDataFun()
    DashChartDataFun()
    BarChartDataFun()
    LineChartDataFun()
  }, 300)
  $("#topRestore").hide()
  // handler()

}
// 另存为
function saveAs() {
  setCornerbutton()
  let index = layer.load(2, {
    shade: [0.01, '#000'], //0.1透明度的白色背景
    success: function (layerContentStyle) {
      // let html = `<div class="loading-content" >加载中...</div>`
      // layerContentStyle.find('.layui-layer-content').append(html)
    }
  });
  Object.assign(Controls, commonList)
  // let groupName = $('#attrPosition').val()
  if (commonList.Name.trim() === '') {
    appTips.errorMsg('名称不能为空')
    return
  }
  if (!currentPosNode.name) {
    appTips.errorMsg('请先选择位置')
    return
  }
  let groupId = currentPosNode.id
  let description = commonList.Description
  let accessType = commonList.Permision
  let panelName = commonList.Name
  let assemblys = []
  Controls.ControlList.forEach((item, index) => {
    let newIndex = item.Name.replace(/[^0-9]/ig,"")
    if (item.index === undefined) {
      Controls.ControlList[index].index = index
    }
    if (item.PropertyList.ComName === undefined) {
      Controls.ControlList[index].PropertyList.ComName = item.title + newIndex
    }
    assemblys.push({
      key: item.index,
      name: item.PropertyList.ComName
    })
  })
  configDetails = JSON.stringify(Controls)
  let postData = {
    assemblys,
    configDetails,
    panelId,
    permission: {
      accessType,
      customPermissions: permissionData.customPermissions,
      description,
      groupId,
      panelId,
      panelName
    }
  }
  request.post(`/bi/${appId}/panel-configs/publish`, postData).then(res => {
    if (res.data.code === 0) {
      appTips.successMsg('另存成功!')
    } else {
      appTips.errorMsg(res.data.msg)
    }
    layer.close(index)
  }).catch(err => {
    console.log(err)
    layer.close(index)
  })
}

function checkValidate() {
  let flag = true
  Controls.ControlList.forEach(item => {
    if (item.ControlType === 'datatextblock' || item.ControlType === 'rwtextbox') {
      if (item.CheckData.name === '') {
        appTips.errorMsg(item.PropertyList.ComName + ' 组件未选择变量， 请先选择变量！！')
        flag = false
        return
      }
    } else if (item.ControlType === 'cornerbutton') {
      let data = []
      if (item.radioType === '1') {
        data = item.ButtonTypeList[1].DataList.filter(x => x.rwtextbox == '')
      }
      if (data.length !== 0) {
        appTips.errorMsg(item.PropertyList.ComName + ' 组件未关联控件， 请关联控件！！')
        flag = false
        return
      }
    }
  })

  return flag
}

// 保存并发布
function savePublish() {
  if (!judgeData() || !checkValidate()) {
    return
  }


  setCornerbutton()
  let index = layer.load(2, {
    shade: [0.01, '#000'], //0.1透明度的白色背景
    success: function (layerContentStyle) {
      // let html = `<div class="loading-content" >加载中...</div>`
      // layerContentStyle.find('.layui-layer-content').append(html)
    }
  });
  Object.assign(Controls, commonList)
  // let groupName = $('#attrPosition').val()
  if (commonList.Name.trim() === '') {
    appTips.errorMsg('名称不能为空')
    return
  }
  if (!currentPosNode.name) {
    appTips.errorMsg('请先选择位置')
    return
  }
  let groupId = currentPosNode.id
  let description = commonList.Description
  let accessType = commonList.Permision
  let panelName = commonList.Name
  let assemblys = []
  Controls.ControlList.forEach((item, index) => {
    let newIndex = item.Name.replace(/[^0-9]/ig,"")
    if (item.index === undefined) {
      Controls.ControlList[index].index = index
    }
    if (item.PropertyList.ComName === undefined) {
      Controls.ControlList[index].PropertyList.ComName = item.title + newIndex
    }
    assemblys.push({
      key: item.index,
      name: item.PropertyList.ComName
    })
  })
  configDetails = JSON.stringify(Controls)
  let postData = {
    assemblys,
    configDetails,
    panelId,
    permission: {
      accessType,
      customPermissions: permissionData.customPermissions,
      description,
      groupId,
      panelId,
      panelName
    }
  }
  request.post(`/bi/${appId}/panel-configs/publish`, postData).then(res => {
    if (res.data.code === 0) {
      appTips.successMsg('保存并发布成功!')
      let cloneData = JSON.stringify(Controls)
      cloneControls = JSON.parse(cloneData)
      $("#saveBtnTips").hide()
    } else {
      appTips.errorMsg(res.data.msg)
    }
    layer.close(index)
  }).catch(err => {
    console.log(err)
    layer.close(index)
  })
}
//恢复按钮的提示功能
function showTips(e, tip) {
  tip = tip || "当编辑已发布的看板时,如果您已经保存了该编辑并未发布时,可以通过恢复操作，恢复到该看板已发布最新版本"
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
// $(function(){
//   var tips;
//   $('#topRestore').on({
//       mouseenter:function(){
//           var that = this;
//           tips =layer.tips("当编辑已发布的仪表板时,如果您已经保存了该编辑并未发布时,可以通过恢复操作，恢复到该仪表板已发布最新版本",that,{tips:[2],time:0,area: 'auto',maxWidth:500});
//       },
//       mouseleave:function(){
//           layer.close(tips);

//       }

//   });

// })
//公用提示功能