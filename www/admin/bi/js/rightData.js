/* 此处为右侧数据交互事件部分 */

/* 1.数值显示组件 */
// 指定条件初始化
// 表格table
// let data = []
let check = {
  // Variate: '',
  // VariateCode: null,
  // VariateId: null,
} //存储表格勾选的值

let oldCheck = 0 // 用于判断指定条件是否超出10条
let newCheck = [] // 多选选中的数据

let oldField = 0  // 用于判断图表业务数据指定条件是否超出10条
let newField = [] // 图表-业务数据多选选中的数据

let fieldCheck = {} // 关联字段checkbox

function initCondition(index) {
  // let pop = document.getElementById('additionPop')
  // let tbody = document.getElementById('func-tbody')
  // let str = ``
  // if (Controls.ControlList[index].DataList) {
  //   Controls.ControlList[index].DataList.forEach((item, i) => {
  //     str += `<tr>
  //     <td rowspan="1" colspan="1"><div>${i + 1}</div></td>  
  //     <td rowspan="1" colspan="1"><div>${Controls.ControlList[index].CheckData.name}</div></td>  
  //     <td rowspan="1" colspan="1"><div>${item.flag}</div></td>  
  //     <td rowspan="1" colspan="1"><div>${item.num}</div></td>  
  //     <td rowspan="1" colspan="1"><div class="table-back-color"><span style="background: ${item.backColor}" ></span></div></td>  
  //     <td rowspan="1" colspan="1" class="table-icon-del" ><i onclick="delRow(${i}, ${index})" class="iconfont iconshanchu" ></i></td>  
  //   </tr>
  //   `
  //   })
  //   if (tbody) {
  //     tbody.innerHTML = str
  //   }
  // }
}

// 打开选择变量弹窗
async function openPop(index, i, prop, type, titleI, id, text = '') {
  /* 
    text: 数值显示 - 指定条件 值 的 icon
  */
  $(".select-drop-down").remove()
  oldCheck = 0
  newCheck = []
  let multiple = ['image','ellipselamp','commonlamp','dynamictext',/* 'cornerbutton','piechart','linechart','barchart' */]

  if (multiple.includes(Controls.ControlList[index].ControlType)) {
    if (Controls.ControlList[index].DataList[Number(i)][prop] !== '选择') {
      oldCheck = Controls.ControlList[index].DataList.length
    } else {
      oldCheck = Controls.ControlList[index].DataList.length - 1 
    }
  }

  if (Controls.ControlList[index].ControlType === 'cornerbutton') {
    if (Controls.ControlList[index].radioType === '0') {
      if (Controls.ControlList[index].ButtonTypeList[0].DataList[Number(i)][prop] !== '选择') {
        oldCheck = Controls.ControlList[index].ButtonTypeList[0].DataList.length
      } else {
        oldCheck = Controls.ControlList[index].ButtonTypeList[0].DataList.length - 1 
      }
    } else if (Controls.ControlList[index].radioType === '2') {
      let parami = Number(titleI.split('-')[1])
      if (Controls.ControlList[index].ButtonTypeThreeList[parami].DataList[Number(i)][prop] !== '选择') {
        oldCheck = Controls.ControlList[index].ButtonTypeThreeList[parami].DataList.length
      } else {
        oldCheck = Controls.ControlList[index].ButtonTypeThreeList[parami].DataList.length - 1 
      }
    }
  }

  let origin = document.getElementById('datatextblockOrigin')
  let popup = document.getElementById('popup')
  let types = ['piechart', 'dashboardchart', 'barchart', 'linechart']
  popup.style.display = 'block'
  pageData.pageIndex = 1
  pageData.pageSize = 10
  // let wantindex = index
  // for (let i = 0; i < Controls.ControlList.length; i++) {
  //   if (Controls.ControlList[i].PropertyList.ZIndex == index) {
  //     index = i
  //     break;
  //   }
  // }
  // 数值显示 && 读写框
  if (Controls.ControlList[index].CheckData != undefined) {
    if (types.includes(Controls.ControlList[index].ControlType)) {
      if (Controls.ControlList[index].ControlType === 'piechart') {
        Controls.Data.PieChartItemList.forEach((item, cIndex) => {
          if (item.name === Controls.ControlList[index].Name) {
            if (Controls.Data.PieChartItemList[cIndex].option.Variables[i - 1].VariableName && Controls.Data.PieChartItemList[cIndex].option.Variables[i - 1].VariableName !== '选择') {
              oldCheck = Controls.Data.PieChartItemList[cIndex].option.Variables.length
              newCheck.push(Controls.Data.PieChartItemList[cIndex].option.Variables[i - 1].CheckData)
            } else {
              oldCheck = Controls.Data.PieChartItemList[cIndex].option.Variables.length - 1
            }
            check = Controls.Data.PieChartItemList[cIndex].option.Variables[i - 1].CheckData || {}
          }
        })
      } else if (Controls.ControlList[index].ControlType === 'dashboardchart') {
        Controls.Data.DashBoardChartItemList.forEach((item, cIndex) => {
          if (item.name === Controls.ControlList[index].Name) {
            check = Controls.Data.DashBoardChartItemList[cIndex].option.Variable.CheckData || {}
          }
        })
      } else if (Controls.ControlList[index].ControlType === 'barchart') {
        Controls.Data.BarChartItemList.forEach((item, cIndex) => {
          if (item.name === Controls.ControlList[index].Name) {
            if (Controls.Data.BarChartItemList[cIndex].option.Variables[i - 1].VariableName && Controls.Data.BarChartItemList[cIndex].option.Variables[i - 1].VariableName !== '选择') {
              oldCheck = Controls.Data.BarChartItemList[cIndex].option.Variables.length
              newCheck.push(Controls.Data.BarChartItemList[cIndex].option.Variables[i - 1].CheckData)
            } else {
              oldCheck = Controls.Data.BarChartItemList[cIndex].option.Variables.length - 1
            }
            check = Controls.Data.BarChartItemList[cIndex].option.Variables[i - 1].CheckData || {}
          }
        })
      } else if (Controls.ControlList[index].ControlType === 'linechart') {
        Controls.Data.LineChartItemList.forEach((item, cIndex) => {
          if (item.name === Controls.ControlList[index].Name) {
            if (Controls.Data.LineChartItemList[cIndex].option.Variables[i - 1].VariableName && Controls.Data.LineChartItemList[cIndex].option.Variables[i - 1].VariableName !== '选择') {
              oldCheck = Controls.Data.LineChartItemList[cIndex].option.Variables.length
              newCheck.push(Controls.Data.LineChartItemList[cIndex].option.Variables[i - 1].CheckData)
            } else {
              oldCheck = Controls.Data.LineChartItemList[cIndex].option.Variables.length - 1
            }
            check = Controls.Data.LineChartItemList[cIndex].option.Variables[i - 1].CheckData || {}
          }
        })
      }
    } else {
      check = Controls.ControlList[index].CheckData
    }
  } else {
    // 其他弹窗
    popup.setAttribute('data-tindex', i)
    popup.setAttribute('data-tprop', prop)
    if (!type) { // 其他弹窗 公共赋值
      if (Controls.ControlList[index].DataList[Number(i)][prop] !== '选择') {
        check = Controls.ControlList[index].DataList[Number(i)].CheckData
        newCheck.push(Controls.ControlList[index].DataList[Number(i)].CheckData)
      }
    } else {
      // 其他弹窗中 需要特殊处理的弹窗 （控制按钮）
      popup.setAttribute('data-type', type)
      if (Controls.ControlList[index].radioType == '0') { // 控制按钮--下拉固定值
        if (Controls.ControlList[index].ButtonTypeList[Number(Controls.ControlList[index].radioType)].DataList[Number(i)][prop] !== '选择') {
          check = Controls.ControlList[index].ButtonTypeList[Number(Controls.ControlList[index].radioType)].DataList[Number(i)].CheckData
          newCheck.push(Controls.ControlList[index].ButtonTypeList[Number(Controls.ControlList[index].radioType)].DataList[Number(i)].CheckData)
        }
      } else if (Controls.ControlList[index].radioType == '2') { // 控制按钮--弹窗设定参数
        let parami = Number(titleI.split('-')[1])
        if (Controls.ControlList[index].ButtonTypeThreeList[parami].DataList[Number(i)][prop] !== '选择') {
          check = Controls.ControlList[index].ButtonTypeThreeList[parami].DataList[Number(i)].CheckData
          newCheck.push(Controls.ControlList[index].ButtonTypeThreeList[parami].DataList[Number(i)].CheckData)
        }
        popup.setAttribute('data-parami', parami)
      }
    }
  }
  popup.setAttribute('data-tableId', id)
  popup.setAttribute('data-index', Controls.ControlList[index].PropertyList.ZIndex)

  if (types.includes(Controls.ControlList[index].ControlType)) {
    popup.setAttribute('data-tindex', i)
  }

  //初始化插件
  request.get(`/bi/${appId}/variables/source`).then(res => {
    let data = res.data.data
    if (data) {
      $('#datatextblockOrigin').selectPage({
        showField: 'sourceName',
        keyField: 'sourceId',
        pagination: false,
        dropButton: false,
        data,
        eSelect: function (data) {
          // Controls.ControlList[index].SearchData.origin = data.sourceId
        }
      })

    } else {
      appTips.errorMsg(res.data.msg)
    }

  })
  origin.setAttribute('data-init', Controls.ControlList[index].SearchData.origin)
  if (text === 'text') {
    popup.setAttribute('data-text', 'text')
    popup.setAttribute('data-inputi', i)
    check = {}
  }
  await getTableData(index, text)
  pageData.pageIndex = 1
}

// 变量查询
async function searchVirate() {
  await blurSearchData()
  pageData.pageIndex = 1
  let index = document.getElementById('popup').dataset.index
  let wantindex = index
  for (let i = 0; i < Controls.ControlList.length; i++) {
    if (Controls.ControlList[i].PropertyList.ZIndex == wantindex) {
      wantindex = i
      break;
    }
  }
  Controls.ControlList[wantindex].SearchData.device = $('#datatextblockDevice').data('datatext')
  Controls.ControlList[wantindex].SearchData.origin = $('#datatextblockOrigin').val()
  Controls.ControlList[wantindex].SearchData.variteName = $('#varName').val()
  Controls.ControlList[wantindex].SearchData.describe = $('#varDesc').val()

  // Controls.ControlList.forEach((nowitem,nowindex)=>{
  //    if (Controls.ControlList[i].PropertyList.ZIndex == wantindex) {
  //     wantindex = nowindex
  //     break;
  //   }
  // })
  //存在则清空旧内容
  $(".drop-down-list>li").remove()
  $(".select-drop-down").remove()
  getTableData(wantindex)
}

// 变量重置
function resetVirate() {
  let index = document.getElementById('popup').dataset.index
  let wantindex = index
  for (let i = 0; i < Controls.ControlList.length; i++) {
    if (Controls.ControlList[i].PropertyList.ZIndex == wantindex) {
      wantindex = i
      break;
    }
  }
  Controls.ControlList[wantindex].SearchData = {
    origin: '6',
    device: '',
    variteName: '',
    describe: '',
  }
  $('#datatextblockOrigin').val(Controls.ControlList[wantindex].SearchData.origin);
  $('#datatextblockOrigin').selectPageRefresh();
  // $('#datatextblockDevice').selectPageClear();
  $('#varName').val('')
  $('#varDesc').val('')
  $("#datatextblockDevice").val('')
  $("#datatextblockDevice").data('datatext', '')
  $("#datatextblockDevice").removeAttr('data')
}

function getVirate(e) {
  // let pop = document.getElementById('popup')
  // let index = pop.dataset.index
  // Controls.ControlList[index].SearchData.variteName = e.currentTarget.value
}

function getDescribe(e) {
  // let pop = document.getElementById('popup')
  // let index = pop.dataset.index
  // Controls.ControlList[index].SearchData.describe = e.currentTarget.value
}
// 关闭选择变量弹窗
function closePopup(e) {
  let popup = document.getElementById('popup')
  let select = [...document.querySelectorAll('.pop-select-wrap')]
  select.forEach((item, index) => {
    if (index == 0) {
      item.innerHTML = `<input type="text" placeholder="请选择" id="datatextblockOrigin">`
    } else {
      // item.innerHTML = `<input type="text" placeholder="请选择" id="datatextblockDevice">`
    }
  })
  check = {}
  resetVirate()
  unchecked()
  popup.removeAttribute('data-tindex')
  popup.removeAttribute('data-tprop')
  popup.removeAttribute('data-type')
  popup.removeAttribute('data-parami')
  popup.removeAttribute('data-tableid')
  popup.removeAttribute('data-text')
  popup.removeAttribute('data-inputi')
  popup.style.display = 'none'

  pageData.pageIndex = 1
  pageData.pageSize = 10
}
// 表格删除行
function delRow(i, index) {
  Controls.ControlList[index].DataList.splice(i, 1)
  initCondition(index)
}

// 表格非选中
function unchecked() {
  var list = document.getElementsByName("pop-check");
  list.forEach(item => {
    item.checked = false
  })
}

// 图表表格非选中
function unChartChecked() {
  var list = document.getElementsByName("field-check");
  list.forEach(item => {
    item.checked = false
  })
}

// 表格checkbox 选中
function choiceRow(event, i, index) {
  let singleMultiple = ['datatextblock', 'rwtextbox', 'dashboardchart']   // 表格只
  var list = document.getElementsByName("pop-check");
  if (event.target.tagName == "INPUT") {
      if (event.target.checked === true) {
        if (singleMultiple.includes(Controls.ControlList[index].ControlType)) { // 表格单选
          list.forEach(item => {
            item.checked = false
          })
        } else {
          // 表格多选 ---- 最多10条
          if (oldCheck < 10) {
            oldCheck++
            newCheck.push(tableData[i])
          } else {
            event.target.checked = false
            appTips.warningMsg('指定条件最多存在10条')
            return 
          }
        }
        event.target.checked = true
      } else {
        oldCheck--
        newCheck.forEach((citem, ci) => {
          if (citem.id === tableData[i].id) {
            newCheck.splice(ci, 1)
          }
        })
        event.target.checked = false
      }
    
  } else {
    // var list = document.getElementsByName("pop-check");
      if (!$(event.currentTarget).find("input[type=checkbox]").prop('checked') || $(event.currentTarget).find("input[type=radio]").prop('checked')) {
        if (singleMultiple.includes(Controls.ControlList[index].ControlType)) {  // 表格单选
          list.forEach(item => {
            item.checked = false
          })
        } else {  // 表格多选 --- 最多10条
          if (oldCheck < 10) {
            oldCheck++
            newCheck.push(tableData[i])
          } else {
            $(event.currentTarget).find("input[type=checkbox]").prop("checked", false)
            appTips.warningMsg('指定条件最多存在10条')
            return 
          }
        }
      }
      if ($(event.currentTarget).find("input[type=checkbox]").prop('checked') === false || $(event.currentTarget).find("input[type=radio]").prop('checked') === false) {
        $(event.currentTarget).find("input[type=checkbox]").prop("checked", true)
        $(event.currentTarget).find("input[type=radio]").prop("checked", true)
      } else {
        oldCheck--
        newCheck.forEach((citem, ci) => {
          if (citem.id === tableData[i].id) {
            newCheck.splice(ci, 1)
          }
        })
        $(event.currentTarget).find("input[type=checkbox]").prop("checked", false)
        $(event.currentTarget).find("input[type=radio]").prop("checked", false)
      }
  }

  if ($(event.currentTarget).find("input[type=checkbox]").prop('checked') || $(event.currentTarget).find("input[type=radio]").prop('checked')) {
    check = tableData[i]

  } else {
    check = {}
  }
}
// 提交变量
function confirmPop() {
  let popup = document.getElementById('popup')
  let tbody = document.getElementById('popup-tbody')
  // let index = tbody.dataset.index
  let index = popup.dataset.index
  let wantindex = index
  for (let i = 0; i < Controls.ControlList.length; i++) {
    if (Controls.ControlList[i].PropertyList.ZIndex == wantindex) {
      wantindex = i
      break;
    }
  }
  if (popup.dataset.text && popup.dataset.text === 'text') {    // 表格  - 值 
    let tdIndex = popup.dataset.inputi
    if(Controls.ControlList[wantindex].ControlType === 'image') {
      Controls.ControlList[wantindex].DataList[tdIndex].presetText = check.name
    } else {
      Controls.ControlList[wantindex].DataList[tdIndex].num = check.name
    }
  } else {

    if (popup.dataset.tprop) {
      let tindex = popup.dataset.tindex
      let tprop = popup.dataset.tprop
      let type = popup.dataset.type
      let tableId = popup.dataset.tableid
      let dataList = []
      let tableTitleList = []
      if (type) { // 控制按钮
        if (Controls.ControlList[wantindex].radioType == 0) { //下发固定值
          // Controls.ControlList[wantindex].ButtonTypeList[Number(Controls.ControlList[wantindex].radioType)].DataList[Number(tindex)][tprop] = check.name
          // dataList = Controls.ControlList[wantindex].ButtonTypeList[Number(Controls.ControlList[wantindex].radioType)].DataList
          // tableTitleList = Controls.ControlList[wantindex].ButtonTypeList[Number(Controls.ControlList[wantindex].radioType)].TableTitleList
          // Controls.ControlList[wantindex].ButtonTypeList[Number(Controls.ControlList[wantindex].radioType)].DataList[Number(tindex)].CheckData = check

          if (newCheck.length !== 0) {
            Controls.ControlList[wantindex].ButtonTypeList[Number(Controls.ControlList[wantindex].radioType)].DataList[Number(tindex)][tprop] = newCheck[0].name
            Controls.ControlList[wantindex].ButtonTypeList[Number(Controls.ControlList[wantindex].radioType)].DataList[Number(tindex)].CheckData = newCheck[0]
          } else {
            Controls.ControlList[wantindex].ButtonTypeList[Number(Controls.ControlList[wantindex].radioType)].DataList[Number(tindex)][tprop] = ''
            Controls.ControlList[wantindex].ButtonTypeList[Number(Controls.ControlList[wantindex].radioType)].DataList[Number(tindex)].CheckData = {}
          }
          dataList = Controls.ControlList[wantindex].ButtonTypeList[Number(Controls.ControlList[wantindex].radioType)].DataList
          tableTitleList = Controls.ControlList[wantindex].ButtonTypeList[Number(Controls.ControlList[wantindex].radioType)].TableTitleList
          newCheck.splice(0,1)
          newCheck.forEach(item => {
            Controls.ControlList[wantindex].ButtonTypeList[Number(Controls.ControlList[wantindex].radioType)].DataList.push({variable: item.name,issuedValue:'0',CheckData: item})
          })

        } else if (Controls.ControlList[wantindex].radioType == 2) { // 弹窗设定参数
          let parami = Number(popup.dataset.parami)
          // Controls.ControlList[wantindex].ButtonTypeThreeList[parami].DataList[Number(tindex)][tprop] = check.name
          // dataList = Controls.ControlList[wantindex].ButtonTypeThreeList[parami].DataList
          // tableTitleList = Controls.ControlList[wantindex].ButtonTypeThreeList[parami].TableTitleList
          // Controls.ControlList[wantindex].ButtonTypeThreeList[parami].DataList[Number(tindex)].CheckData = check

          if (newCheck.length !== 0) {
            Controls.ControlList[wantindex].ButtonTypeThreeList[parami].DataList[Number(tindex)][tprop] = newCheck[0].name
            Controls.ControlList[wantindex].ButtonTypeThreeList[parami].DataList[Number(tindex)].CheckData = newCheck[0]
          } else {
            Controls.ControlList[wantindex].ButtonTypeThreeList[parami].DataList[Number(tindex)][tprop] = ''
            Controls.ControlList[wantindex].ButtonTypeThreeList[parami].DataList[Number(tindex)].CheckData = {}
          }
          dataList = Controls.ControlList[wantindex].ButtonTypeThreeList[parami].DataList
          tableTitleList = Controls.ControlList[wantindex].ButtonTypeThreeList[parami].TableTitleList
          newCheck.splice(0,1)
          newCheck.forEach(item => {
            Controls.ControlList[wantindex].ButtonTypeThreeList[parami].DataList.push({variable: item.name,issuedValue:'0',CheckData: item})
          })

        }
      } else {
        if (newCheck.length !== 0) {
          Controls.ControlList[wantindex].DataList[Number(tindex)][tprop] = newCheck[0].name
          Controls.ControlList[wantindex].DataList[Number(tindex)].CheckData = newCheck[0]
        } else {
          Controls.ControlList[wantindex].DataList[Number(tindex)][tprop] = ''
          Controls.ControlList[wantindex].DataList[Number(tindex)].CheckData = {}
        }
        dataList = Controls.ControlList[wantindex].DataList
        tableTitleList = Controls.ControlList[wantindex].TableTitleList
        newCheck.splice(0,1)
        newCheck.forEach(item => {
          if (Controls.ControlList[wantindex].ControlType === 'image') {
            Controls.ControlList[wantindex].DataList.push({img: './imgs/defuleUpload.png', variable: item.name, flag: '=', presetText: '', CheckData: item })
          }
          if (Controls.ControlList[wantindex].ControlType === 'ellipselamp') {
            Controls.ControlList[wantindex].DataList.push({variable: item.name, flag: '=', num:'0', backColor:'#000000', flashing: false, CheckData: item })
          }
          if (Controls.ControlList[wantindex].ControlType === 'commonlamp') {
            Controls.ControlList[wantindex].DataList.push({variable: item.name, flag: '=', num:'0', backColor:'#000000', flashing: false, CheckData: item })
          }
          if (Controls.ControlList[wantindex].ControlType === 'dynamictext') {
            Controls.ControlList[wantindex].DataList.push({ variable: item.name, flag: '', num: '', presetText: '', backColor: '#fff', CheckData: item })
          } 
        })

        // Controls.ControlList[wantindex].DataList[Number(tindex)][tprop] = check.name
        // dataList = Controls.ControlList[wantindex].DataList
        // tableTitleList = Controls.ControlList[wantindex].TableTitleList
        // Controls.ControlList[wantindex].DataList[Number(tindex)].CheckData = check
      }
      if (tableId) {

        // $("#" + tableId).empty();
        // var html = dyRefreshTable(tableId, dataList, wantindex, tableTitleList)
        // $("#" + tableId).append(html);
      }
      $("#popup").hide()


    } else {
      let types = ['piechart', 'dashboardchart', 'barchart', 'linechart']
      Controls.ControlList[wantindex].CheckData = check
      if (types.includes(Controls.ControlList[wantindex].ControlType)) {
        if (newCheck.length !== 0) {
          Controls.ControlList[wantindex].CheckData = newCheck[0]
        } else {
          Controls.ControlList[wantindex].CheckData = ''
        }
        let tindex = popup.dataset.tindex
        if (Controls.ControlList[wantindex].ControlType === 'piechart') {
          Controls.Data.PieChartItemList.forEach((item, i) => {
            if (item.name === Controls.ControlList[wantindex].Name) {
              if (newCheck.length !== 0) {
                Controls.Data.PieChartItemList[i].option.Variables[tindex - 1].VariableName = newCheck[0].name
                Controls.Data.PieChartItemList[i].option.Variables[tindex - 1].CheckData = newCheck[0]
              } else {
                Controls.Data.PieChartItemList[i].option.Variables[tindex - 1].VariableName = ''
                Controls.Data.PieChartItemList[i].option.Variables[tindex - 1].CheckData = {}
              }

              // Controls.Data.PieChartItemList[i].option.Variables[tindex - 1].VariableName = check.name
              // Controls.Data.PieChartItemList[i].option.Variables[tindex - 1].CheckData = check
              Controls.Data.PieChartItemList[i].option.Variables[tindex - 1].rangevalue = Controls.Data.PieChartItemList[i].option.Variables[tindex - 1].rangevalue ?
              Controls.Data.PieChartItemList[i].option.Variables[tindex - 1].rangevalue : VariableList[0].value
              Controls.Data.PieChartItemList[i].option.Variables[tindex - 1].valueAxisArr = VariableList

              newCheck.splice(0, 1)
              addIframeAttr(newCheck, 'data-pie')
            }
          })
        } else if (Controls.ControlList[wantindex].ControlType === 'dashboardchart') {
          Controls.Data.DashBoardChartItemList.forEach((item, i) => {
            if (item.name === Controls.ControlList[wantindex].Name) {
              Controls.Data.DashBoardChartItemList[i].option.Variable.VariableName = check.name
              Controls.Data.DashBoardChartItemList[i].option.Variable.CheckData = check
              Controls.Data.DashBoardChartItemList[i].option.Variable.rangevalue = Controls.Data.DashBoardChartItemList[i].option.Variable.rangevalue ?
              Controls.Data.DashBoardChartItemList[i].option.Variable.rangevalue : VariableList[0].value
              Controls.Data.DashBoardChartItemList[i].option.Variable.valueAxisArr = VariableList

            }
          })
        } else if (Controls.ControlList[wantindex].ControlType === 'barchart') {
          Controls.Data.BarChartItemList.forEach((item, i) => {
            if (item.name === Controls.ControlList[wantindex].Name) {
              // Controls.Data.BarChartItemList[i].option.Variables[tindex - 1].VariableName = check.name
              // Controls.Data.BarChartItemList[i].option.Variables[tindex - 1].CheckData = check
              if (newCheck.length !== 0) {
                Controls.Data.BarChartItemList[i].option.Variables[tindex - 1].VariableName = newCheck[0].name
                Controls.Data.BarChartItemList[i].option.Variables[tindex - 1].CheckData = newCheck[0]
              } else {
                Controls.Data.BarChartItemList[i].option.Variables[tindex - 1].VariableName = ''
                Controls.Data.BarChartItemList[i].option.Variables[tindex - 1].CheckData = {}
              }
              
              newCheck.splice(0, 1)
              addIframeAttr(newCheck, 'data-barId')
            }
          })
        } else if (Controls.ControlList[wantindex].ControlType === 'linechart') {
          Controls.Data.LineChartItemList.forEach((item, i) => {
            if (item.name === Controls.ControlList[wantindex].Name) {
              // Controls.Data.LineChartItemList[i].option.Variables[tindex - 1].VariableName = check.name
              // Controls.Data.LineChartItemList[i].option.Variables[tindex - 1].CheckData = check

              if (newCheck.length !== 0) {
                Controls.Data.LineChartItemList[i].option.Variables[tindex - 1].VariableName = newCheck[0].name
                Controls.Data.LineChartItemList[i].option.Variables[tindex - 1].CheckData = newCheck[0]
              } else {
                Controls.Data.LineChartItemList[i].option.Variables[tindex - 1].VariableName = ''
                Controls.Data.LineChartItemList[i].option.Variables[tindex - 1].CheckData = {}
              }
              newCheck.splice(0, 1)
              addIframeAttr(newCheck, 'data-line')
            }
          })
        }
      }
    }
  }
  let select = [...document.querySelectorAll('.pop-select-wrap')]
  select.forEach((item, index) => {
    if (index == 0) {
      item.innerHTML = `<input type="text" placeholder="请选择" id="datatextblockOrigin">`
    } else {
      // item.innerHTML = `<input type="text" placeholder="请选择" id="datatextblockDevice">`
    }
  })
  resetVirate()
  unchecked()
  check = {}
  popup.removeAttribute('data-tindex')
  popup.removeAttribute('data-tprop')
  popup.removeAttribute('data-type')
  popup.removeAttribute('data-parami')
  popup.removeAttribute('data-tableid')
  popup.removeAttribute('data-text')
  popup.removeAttribute('data-inputi')
  popup.style.display = 'none'
  choice(Controls.ControlList[wantindex].TabEvent, tbody.dataset.index)
}

function addIframeField(newField, elem) {
  newField.forEach((item, itemi) => {
    $(`#${elem}`).contents().find(".newAdd").attr("data-name", item.name)
    $(`#${elem}`).contents().find(".newAdd").attr("data-value", item.value)
    $(`#${elem}`).contents().find(".newAdd").attr("data-flag", item.type)
    $(`#${elem}`).contents().find(".newAdd").attr("data-fieldtype", 'field')
    $(`#${elem}`).contents().find(".newAdd").click()
  })

  $(`#${elem}`).contents().find(".newAdd").removeAttr("data-name")
  $(`#${elem}`).contents().find(".newAdd").removeAttr("data-value")
  $(`#${elem}`).contents().find(".newAdd").removeAttr("data-flag")
  $(`#${elem}`).contents().find(".newAdd").removeAttr("data-fieldtype")
}


function addIframeAttr(newCheck, elem) {
  newCheck.forEach(item => {
    // $("#data-line").contents().find(".newAdd").on('click','', {data: item}, $("#data-line").contents().find(".newAdd").click())
    $(`#${elem}`).contents().find(".newAdd").attr("data-cusVariableType", item.cusVariableType)
    $(`#${elem}`).contents().find(".newAdd").attr("data-customerId", item.customerId)
    $(`#${elem}`).contents().find(".newAdd").attr("data-customerName", item.customerName)
    $(`#${elem}`).contents().find(".newAdd").attr("data-desc", item.desc)
    $(`#${elem}`).contents().find(".newAdd").attr("data-equipmentCode", item.equipmentCode)
    $(`#${elem}`).contents().find(".newAdd").attr("data-equipmentId", item.equipmentId)
    $(`#${elem}`).contents().find(".newAdd").attr("data-equipmentName", item.equipmentName)
    $(`#${elem}`).contents().find(".newAdd").attr("data-from", item.from)
    $(`#${elem}`).contents().find(".newAdd").attr("data-id", item.id)
    $(`#${elem}`).contents().find(".newAdd").attr("data-name", item.name)
    $(`#${elem}`).contents().find(".newAdd").attr("data-type", item.type)
    $(`#${elem}`).contents().find(".newAdd").attr("data-unit", item.unit)
    $(`#${elem}`).contents().find(".newAdd").attr("data-varType", item.varType)
    $(`#${elem}`).contents().find(".newAdd").click()
  })

  $(`#${elem}`).contents().find(".newAdd").removeAttr("data-cusVariableType")
  $(`#${elem}`).contents().find(".newAdd").removeAttr("data-customerId")
  $(`#${elem}`).contents().find(".newAdd").removeAttr("data-customerName")
  $(`#${elem}`).contents().find(".newAdd").removeAttr("data-desc")
  $(`#${elem}`).contents().find(".newAdd").removeAttr("data-equipmentCode")
  $(`#${elem}`).contents().find(".newAdd").removeAttr("data-equipmentId")
  $(`#${elem}`).contents().find(".newAdd").removeAttr("data-equipmentName")
  $(`#${elem}`).contents().find(".newAdd").removeAttr("data-from")
  $(`#${elem}`).contents().find(".newAdd").removeAttr("data-id")
  $(`#${elem}`).contents().find(".newAdd").removeAttr("data-name")
  $(`#${elem}`).contents().find(".newAdd").removeAttr("data-type")
  $(`#${elem}`).contents().find(".newAdd").removeAttr("data-unit")
  $(`#${elem}`).contents().find(".newAdd").removeAttr("data-varType")
}

// 打开添加条件弹窗
function openAddition(index) {
  let wantindex = index
  for (let i = 0; i < Controls.ControlList.length; i++) {
    if (Controls.ControlList[i].PropertyList.ZIndex == wantindex) {
      wantindex = i
      break;
    }
  }
  let additionPop = document.getElementById('additionPop')
  let select = document.getElementById('form-select')
  if (Controls.ControlList[wantindex].CheckData.name) {
    select.value = ''
    additionPop.setAttribute('data-index', index)
    additionPop.style.display = 'block'
    if($('#formColor_color')){
      $('#formColor_color').remove()
    }
    setTimeout(() => {
      Colorpicker.create({
        el: "formColor",
        color: '#000000',
        change: function (elem, hex, rgba) {
          elem.style.backgroundColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')';
          // Controls.ControlList[wantindex].PropertyList.BorderColor = `rgba(`+rgba.r+','+rgba.g+','+rgba.b+','+rgba.a+')';
          if ((data.ControlType != 'piechart' && data.ControlType != 'dashboardchart' && data.ControlType != 'barchart' && data.ControlType != 'linechart')) {
            // childElement(wantindex,'init')
            $(`.commonModule[data-id=${Controls.ControlList[wantindex].PropertyList.ZIndex}]`).css('borderColor', `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')')
          }
        }
      })
    }, 100)
  } else {
    alert('请先选择变量！！')
  }
}

function openField(index, i, type, data, chackData) {
  $(".select-drop-down").remove()
  oldField = 0
  newField= []
  let fieldPop = document.getElementById('fieldPop')
  fieldPop.style.display = 'block'
  fieldPop.setAttribute('data-index', index)
  fieldPop.setAttribute('data-cindex', i - 1)
  if (type) {
    fieldPop.setAttribute('data-type', type)
  }

  if (Controls.ControlList[index].ControlType === 'linechart') {
    Controls.Data.LineChartItemList.forEach(item => {
      if (item.name === Controls.ControlList[index].Name) {
        if (item.option.Variables[i - 1].FieldName && item.option.Variables[i - 1].FieldName !== "配置字段") {
          oldField = item.option.Variables.length
          newField.push({name: item.option.Variables[i - 1].FieldName, value: item.option.Variables[i - 1].FieldValue})
        } else {
          oldField = item.option.Variables.length - 1
        }
      }
    })
  }

  if (Controls.ControlList[index].ControlType === 'barchart') {
    Controls.Data.BarChartItemList.forEach(item => {
      if (item.name === Controls.ControlList[index].Name) {
        if (item.option.Variables[i - 1].FieldName && item.option.Variables[i - 1].FieldName !== "配置字段" && item.option.Variables[i - 1].FieldName !== "选择") {
          oldField = item.option.Variables.length
          newField.push({name: item.option.Variables[i - 1].FieldName, value: item.option.Variables[i - 1].FieldValue})
        } else {
          oldField = item.option.Variables.length - 1
        }
      }
    })
  }

  let lis = ``
  let fields = []
  BarChartData.defaultDataConfig.dataChart.forEach(item => {
    if (item.nameCn == BarChartData.defaultDataConfig.tablename) {
      fields = JSON.parse(item.field)
    }
  })
  $('#field-ul').empty()
  if (Controls.ControlList[index].ControlType === 'dashboardchart') {
    fields.forEach(d => {
      lis += `<li>
            <input type="radio" onChange="checkField(event)" data-type="${d.dataType}" ${data.FieldName == d.fieldName?'checked':''} name="field-check" value="${d.field}" id="${d.fieldName}" ><label for="${d.fieldName}">${d.fieldName}</label>
        </li>`
    })
  } else if (Controls.ControlList[index].ControlType === 'piechart') {
    let dataType = ''
    Controls.Data.PieChartItemList.forEach(item => {
      if (item.name === Controls.ControlList[index].Name) {
        dataType = item.defaultDataConfig.datatype === '业务数据'
        dataType = '业务数据'
      }
    })
    if(dataType === '业务数据') {
      fields.forEach(d => {
        lis += `<li>
              <input type="radio" onChange="checkField(event)" data-type="${d.dataType}" ${data.FieldName == d.fieldName?'checked':''} name="field-check" value="${d.field}" id="${d.fieldName}" ><label for="${d.fieldName}">${d.fieldName}</label>
          </li>`
      })
    }

  } else if (Controls.ControlList[index].ControlType === 'linechart' && type === 'axis') {
    let dataType = ''
    Controls.Data.LineChartItemList.forEach(item => {
      if (item.name === Controls.ControlList[index].Name) {
        dataType = item.defaultDataConfig.datatype === '业务数据'
        dataType = '业务数据'
      }
    })
    if(dataType === '业务数据') {
      fields.forEach(d => {
        lis += `<li>
              <input type="radio" onChange="checkField(event)" data-type="${d.dataType}" ${data.FieldName == d.fieldName?'checked':''} name="field-check" value="${d.field}" id="${d.fieldName}" ><label for="${d.fieldName}">${d.fieldName}</label>
          </li>`
      })
    }

  } else if (Controls.ControlList[index].ControlType === 'barchart' && type === 'axis') {
    let dataType = ''
    Controls.Data.BarChartItemList.forEach(item => {
      if (item.name === Controls.ControlList[index].Name) {
        dataType = item.defaultDataConfig.datatype === '业务数据'
        dataType = '业务数据'
      }
    })
    if(dataType === '业务数据') {
      fields.forEach(d => {
        lis += `<li>
              <input type="radio" onChange="checkField(event)" data-type="${d.dataType}" ${data.FieldName == d.fieldName?'checked':''} name="field-check" value="${d.field}" id="${d.fieldName}" ><label for="${d.fieldName}">${d.fieldName}</label>
          </li>`
      })
    }

  } else {
    fields.forEach(d => {
      lis += `<li>
            <input type="checkbox" onChange="checkField(event)" data-type="${d.dataType}" ${data.FieldName == d.fieldName?'checked':''} name="field-check" value="${d.field}" id="${d.fieldName}" ><label for="${d.fieldName}">${d.fieldName}</label>
        </li>`
    })
  }
  $('#field-ul').append(lis)
}

function checkField(event) {
  var list = document.getElementsByName("field-check");
  let fieldPop = document.getElementById('fieldPop')
  let index = fieldPop.getAttribute('data-index')
  let cindex = fieldPop.getAttribute('data-cindex')
  let type = fieldPop.getAttribute('data-type') || ''
  let target = ''
  if (event.target.tagName === 'LABEL') {
    target = event.target.parentElement.firstElementChild
  } else if (event.target.tagName === 'INPUT') {
    target = event.target
  } else {
    return
  }
  let types = ['linechart', 'barchart']

  if (type !== '') {  // 图表业务数据第二个表格只能单选
    newField = []
    if (target.checked === true) {
      list.forEach(item => {
        item.checked = false
      })
      target.checked = true
      fieldCheck.name = target.nextSibling.innerText
      fieldCheck.value = target.value
      fieldCheck.type = target.dataset.type
      newField.push({name: target.nextSibling.innerText,value: target.value, type: target.dataset.type})
    } else {
      target.checked = false
      fieldCheck = {}
    }
  } else {
    if (types.includes(Controls.ControlList[index].ControlType)) {
      if (target.checked === true) {
        // 表格多选 ---- 最多10条
        if (oldField < 10) {
          oldField++
          newField.push({name: target.nextSibling.innerText,value: target.value, type: target.dataset.type})
          fieldCheck.name = target.nextSibling.innerText
          fieldCheck.value = target.value
          fieldCheck.type = target.dataset.type
        } else {
          target.checked = false
          appTips.warningMsg('指定条件最多存在10条')
          return 
        }
      } else {
        oldField--
        fieldCheck = {}
        newField.forEach((citem, ci) => {
          if (citem.name === target.nextSibling.innerText) {
            newField.splice(ci, 1)
          }
        })
        event.target.checked = false
      }
    } else {
      if (target.checked === true) {
        list.forEach(item => {
          item.checked = false
        })
        target.checked = true
        fieldCheck.name = target.nextSibling.innerText
        fieldCheck.value = target.value
        fieldCheck.type = target.dataset.type
      } else {
        target.checked = false
        fieldCheck = {}
      }
    }
  }
}
//关联字段查找
function checkFieldKey(e) {
  let value = $("#checkFieldKeyValue").val()
  let fieldPop = document.getElementById('fieldPop')
  let index = fieldPop.getAttribute('data-index')
  let type = fieldPop.getAttribute('data-type') || ''
  let lis = ``
  let fields = []
  BarChartData.defaultDataConfig.dataChart.forEach(item => {
    if (item.nameCn == BarChartData.defaultDataConfig.tablename) {
      let field = JSON.parse(item.field)
      field.forEach(i => {
        if (i.fieldName.indexOf(value) > -1) {
          fields.push(i)
        }
      })
    }
  })
  $('#field-ul').empty()


  if (Controls.ControlList[index].ControlType === 'dashboardchart') {
    fields.forEach(d => {
      lis += `<li>
            <input type="radio" onChange="checkField(event)" data-type="${d.dataType}" ${data.FieldName == d.fieldName?'checked':''} name="field-check" value="${d.field}" id="${d.fieldName}" ><label for="${d.fieldName}">${d.fieldName}</label>
        </li>`
    })
  } else if (Controls.ControlList[index].ControlType === 'piechart') {
    let dataType = ''
    Controls.Data.PieChartItemList.forEach(item => {
      if (item.name === Controls.ControlList[index].Name) {
        dataType = item.defaultDataConfig.datatype === '业务数据'
        dataType = '业务数据'
      }
    })
    if(dataType === '业务数据') {
      fields.forEach(d => {
        lis += `<li>
              <input type="radio" onChange="checkField(event)" data-type="${d.dataType}" ${data.FieldName == d.fieldName?'checked':''} name="field-check" value="${d.field}" id="${d.fieldName}" ><label for="${d.fieldName}">${d.fieldName}</label>
          </li>`
      })
    }

  } else if (Controls.ControlList[index].ControlType === 'linechart' && type === 'axis') {
    let dataType = ''
    Controls.Data.LineChartItemList.forEach(item => {
      if (item.name === Controls.ControlList[index].Name) {
        dataType = item.defaultDataConfig.datatype === '业务数据'
        dataType = '业务数据'
      }
    })
    if(dataType === '业务数据') {
      fields.forEach(d => {
        lis += `<li>
              <input type="radio" onChange="checkField(event)" data-type="${d.dataType}" ${data.FieldName == d.fieldName?'checked':''} name="field-check" value="${d.field}" id="${d.fieldName}" ><label for="${d.fieldName}">${d.fieldName}</label>
          </li>`
      })
    }

  } else if (Controls.ControlList[index].ControlType === 'barchart' && type === 'axis') {
    let dataType = ''
    Controls.Data.BarChartItemList.forEach(item => {
      if (item.name === Controls.ControlList[index].Name) {
        dataType = item.defaultDataConfig.datatype === '业务数据'
        dataType = '业务数据'
      }
    })
    if(dataType === '业务数据') {
      fields.forEach(d => {
        lis += `<li>
              <input type="radio" onChange="checkField(event)" data-type="${d.dataType}" ${data.FieldName == d.fieldName?'checked':''} name="field-check" value="${d.field}" id="${d.fieldName}" ><label for="${d.fieldName}">${d.fieldName}</label>
          </li>`
      })
    }

  } else {
    fields.forEach(d => {
      lis += `<li>
            <input type="checkbox" onChange="checkField(event)" data-type="${d.dataType}" ${data.FieldName == d.fieldName?'checked':''} name="field-check" value="${d.field}" id="${d.fieldName}" ><label for="${d.fieldName}">${d.fieldName}</label>
        </li>`
    })
  }
  $('#field-ul').append(lis)


}

function closeField() {
  fieldCheck = {}
  oldField = 0
  newField = []
  $('#checkFieldKeyValue').val('')
  let fieldPop = document.getElementById('fieldPop')
  fieldPop.style.display = 'none'
  fieldPop.removeAttribute('data-index')
  fieldPop.removeAttribute('data-tindex')
  fieldPop.removeAttribute('data-type')
}


function deassign(name, newChceck) {
  /* 
    图表与关联组件数据重新赋值
    name: 对应图表名和曾
    newCheck: 对应勾选的checkd对象
  */
  let names = ['associatedatetimepicker', 'datasearch', 'textsearch', 'dropsearch']
  Controls.ControlList.forEach((nameKey, namei) => {
    if (names.includes(nameKey.ControlType)) {
      nameKey.EchartList.forEach((data, datai) => {
        if (data.name === name) {
          // if (name.indexOf('barchart') !== -1) {
          if (Controls.ControlList[namei].EchartList[datai].fieldData) {
            Controls.ControlList[namei].EchartList[datai].fieldData.CheckData = newChceck
            Controls.ControlList[namei].EchartList[datai].fieldData.FieldName = newChceck.name
            Controls.ControlList[namei].EchartList[datai].fieldData.FieldValue = newChceck.value
          } else {
            Controls.ControlList[namei].EchartList[datai].option.Variable.FieldName = newChceck.name
            Controls.ControlList[namei].EchartList[datai].option.Variable.FieldValue = newChceck.value
          }
          // } else if (name.indexOf('linechart') !== -1) {
          //   Controls.Data.LineChartItemList[i].fieldData.FieldName = newChceck.name
          //   Controls.Data.LineChartItemList[i].fieldData.FieldValue = newChceck.value
          // } else if (name.indexOf('piechart') !== -1) {
          //   Controls.Data.PieChartItemList[i].fieldData.FieldName = fieldCheck.name
          //   Controls.Data.PieChartItemList[i].fieldData.FieldValue = fieldCheck.value
          // } else if (name.indexOf('dashboardchart') !== -1) {
          //   Controls.Data.DashBoardChartItemList[i].option.Variable.FieldName = newChceck.name
          //   Controls.Data.DashBoardChartItemList[i].option.Variable.FieldValue = newChceck.value
          // }
        }
      })
    }
  })
}


function confirmField() {
  // if ((JSON.stringify(fieldCheck) == "{}")) {
  //   closeField()
  //   return
  // }
  // if (newField.length === 0) {
  //   closeField(Controls.ControlList[wantindex].ControlType)
  //   return
  // }
  let fieldPop = document.getElementById('fieldPop')
  let index = fieldPop.dataset.index
  let wantindex = index

  /* 这段注释代码 不要删除  用来查看后续是否会出现其他bug */
  // for (let i = 0; i < Controls.ControlList.length; i++) {
  //   if (Controls.ControlList[i].PropertyList.ZIndex == wantindex) {
  //     wantindex = i
  //     break;
  //   }
  // }
  let cindex = fieldPop.dataset.cindex
  let type = fieldPop.dataset.type || ''
  if (Controls.ControlList[wantindex].ControlType === 'barchart') {
    if (!type) { // 判断是第几个表格
      Controls.Data.BarChartItemList.forEach((item, i) => {
        if (item.name === Controls.ControlList[wantindex].Name) {
          // Controls.Data.BarChartItemList[i].option.Variables[cindex].FieldName = fieldCheck.name
          // Controls.Data.BarChartItemList[i].option.Variables[cindex].FieldValue = fieldCheck.value
          // if (fieldCheck.type === 'number') {
          //   item.option.Variables[cindex].valueAxisArr = tableNumerical
          // } else if (fieldCheck.type === 'text') {
          //   item.option.Variables[cindex].valueAxisArr = tableText
          // } else {
          //   item.option.Variables[cindex].valueAxisArr = tableText
          // }
          // if (item.defaultDataConfig.datatype !== '业务数据') {
          //   Controls.Data.BarChartItemList[i].option.Variables[cindex].CheckData = fieldCheck
          // }
          // if (fieldCheck.type === 'number') {
          //   item.option.Variables[cindex].valueAxisArr = tableNumerical
          // } else if (fieldCheck.type === 'text') {
          //   item.option.Variables[cindex].valueAxisArr = tableText
          // } else {
          //   item.option.Variables[cindex].valueAxisArr = tableText
          // }
          if (newField.length !== 0) {
            Controls.Data.BarChartItemList[i].option.Variables[cindex].FieldName = newField[0].name
            Controls.Data.BarChartItemList[i].option.Variables[cindex].FieldValue = newField[0].value
            if (newField[0].type === 'number') {
              item.option.Variables[cindex].valueAxisArr = tableNumerical
            } else if (newField[0].type === 'text') {
              item.option.Variables[cindex].valueAxisArr = tableText
            } else {
              item.option.Variables[cindex].valueAxisArr = tableText
            }
          } else {
            Controls.Data.BarChartItemList[i].option.Variables[cindex].FieldName = ''
            Controls.Data.BarChartItemList[i].option.Variables[cindex].FieldValue = ''
            item.option.Variables[cindex].valueAxisArr = []
          }
          
          

          if (item.defaultDataConfig.datatype !== '业务数据') {
            Controls.Data.BarChartItemList[i].option.Variables[cindex].CheckData = newField[0]
          }
          newField.splice(0, 1)
          addIframeField(newField, 'data-barId')

        }
      })
    } else {
      Controls.Data.BarChartItemList.forEach((item, i) => {
        if (item.name === Controls.ControlList[wantindex].Name) {
          Controls.Data.BarChartItemList[i].fieldData.FieldName =  newField[0].name
          Controls.Data.BarChartItemList[i].fieldData.FieldValue = newField[0].value
          // Controls.Data.BarChartItemList[i].variable[cindex].FieldValue= fieldCheck.value
          if (newField[0].type === 'number') {
            item.fieldData.valueAxisArr = tableNumerical
          } else if (newField[0].type === 'text') {
            item.fieldData.valueAxisArr = tableText
          } else {
            item.fieldData.valueAxisArr = tableText
          }
          Controls.Data.BarChartItemList[i].fieldData.CheckData = newField[0]
          deassign(item.name, Controls.Data.BarChartItemList[i].fieldData.CheckData, i)
        }
      })
    }
  } else if (Controls.ControlList[wantindex].ControlType === 'linechart') {
    if (!type) { // 判断是第几个表格
      Controls.Data.LineChartItemList.forEach((item, i) => {
        if (item.name === Controls.ControlList[wantindex].Name) {
          // Controls.Data.LineChartItemList[i].option.Variables[cindex].FieldName = fieldCheck.name
          // Controls.Data.LineChartItemList[i].option.Variables[cindex].FieldValue = fieldCheck.value
          // if (fieldCheck.type === 'number') {
          //   item.option.Variables[cindex].valueAxisArr = tableNumerical
          // } else if (fieldCheck.type === 'text') {
          //   item.option.Variables[cindex].valueAxisArr = tableText
          // } else {
          //   item.option.Variables[cindex].valueAxisArr = tableText
          // }
          // if (item.defaultDataConfig.datatype !== '业务数据') {
          //   Controls.Data.LineChartItemList[i].option.Variables[cindex].CheckData = fieldCheck
          // }
          // if (newField[0].type === 'number') {
          //     item.option.Variables[cindex].valueAxisArr = tableNumerical
          //   } else if (newField[0].type === 'text') {
          //     item.option.Variables[cindex].valueAxisArr = tableText
          //   } else {
          //     item.option.Variables[cindex].valueAxisArr = tableText
          //   }

          if (newField.length !== 0) {
            Controls.Data.LineChartItemList[i].option.Variables[cindex].FieldName = newField[0].name
            Controls.Data.LineChartItemList[i].option.Variables[cindex].FieldValue = newField[0].value
            if (newField[0].type === 'number') {
              item.option.Variables[cindex].valueAxisArr = tableNumerical
            } else if (newField[0].type === 'text') {
              item.option.Variables[cindex].valueAxisArr = tableText
            } else {
              item.option.Variables[cindex].valueAxisArr = tableText
            }
          } else {
            Controls.Data.LineChartItemList[i].option.Variables[cindex].FieldName = ''
            Controls.Data.LineChartItemList[i].option.Variables[cindex].FieldValue = ''
            item.option.Variables[cindex].valueAxisArr = []
          }
          if (item.defaultDataConfig.datatype !== '业务数据') {
            Controls.Data.LineChartItemList[i].option.Variables[cindex].CheckData = newField[0]
          }
          
          newField.splice(0, 1)
          addIframeField(newField, 'data-line')

        }
      })
    } else {
      Controls.Data.LineChartItemList.forEach((item, i) => {
        if (item.name === Controls.ControlList[wantindex].Name) {
          Controls.Data.LineChartItemList[i].fieldData.FieldName = newField[0].name
          Controls.Data.LineChartItemList[i].fieldData.FieldValue = newField[0].value
          // Controls.Data.LineChartItemList[i].variable[cindex].FieldValue= fieldCheck.value
          if (newField[0].type === 'number') {
            item.fieldData.valueAxisArr = tableNumerical
          } else if (newField[0].type === 'text') {
            item.fieldData.valueAxisArr = tableText
          } else {
            item.fieldData.valueAxisArr = tableText
          }
          Controls.Data.LineChartItemList[i].fieldData.CheckData = newField[0]
          deassign(item.name, Controls.Data.LineChartItemList[i].fieldData.CheckData, i)
        }
      })
    }
  } else if (Controls.ControlList[index].ControlType === 'dashboardchart') {
    Controls.Data.DashBoardChartItemList.forEach((item, i) => {
      if (item.name === Controls.ControlList[index].Name) {
        Controls.Data.DashBoardChartItemList[i].option.Variable.FieldName = fieldCheck.name
        Controls.Data.DashBoardChartItemList[i].option.Variable.FieldValue = fieldCheck.value
        if (fieldCheck.type === 'number') {
          item.option.Variable.valueAxisArr = tableNumerical
        } else if (fieldCheck.type === 'text') {
          item.option.Variable.valueAxisArr = tableText
        } else {
          item.option.Variable.valueAxisArr = tableText
        }
        if (item.defaultDataConfig.datatype !== '业务数据') {
          Controls.Data.DashBoardChartItemList[i].option.Variable.CheckData = fieldCheck
        }
        deassign(item.name, fieldCheck, i)
      }
    })
  } else { // 饼图
    if (!type) { // 判断是第几个表格
      Controls.Data.PieChartItemList.forEach((item, i) => {
        if (item.name === Controls.ControlList[index].Name) {
          Controls.Data.PieChartItemList[i].option.Variables[cindex].FieldName = fieldCheck.name
          Controls.Data.PieChartItemList[i].option.Variables[cindex].FieldValue = fieldCheck.value
          if (fieldCheck.type === 'number') {
            item.option.Variables[cindex].valueAxisArr = tableNumerical
          } else if (fieldCheck.type === 'text') {
            item.option.Variables[cindex].valueAxisArr = tableText
          } else {
            item.option.Variables[cindex].valueAxisArr = tableText
          }
          if (item.defaultDataConfig.datatype !== '业务数据') {
            Controls.Data.PieChartItemList[i].option.Variables[cindex].CheckData = fieldCheck
          }
        }
      })
    } else {
      Controls.Data.PieChartItemList.forEach((item, i) => {
        if (item.name === Controls.ControlList[index].Name) {
          Controls.Data.PieChartItemList[i].fieldData.FieldName = fieldCheck.name
          Controls.Data.PieChartItemList[i].fieldData.FieldValue = fieldCheck.value
          // Controls.Data.LineChartItemList[i].variable[cindex].FieldValue= fieldCheck.value
          if (fieldCheck.type === 'number') {
            item.fieldData.valueAxisArr = tableNumerical
          } else if (fieldCheck.type === 'text') {
            item.fieldData.valueAxisArr = tableText
          } else {
            item.fieldData.valueAxisArr = tableText
          }
          Controls.Data.PieChartItemList[i].fieldData.CheckData = fieldCheck
          deassign(item.name, Controls.Data.PieChartItemList[i].fieldData.CheckData, i)
        }
      })
    }
  }
  closeField()
  choice(Controls.ControlList[wantindex].TabEvent, wantindex, true)
}

// 关闭添加条件弹窗
function closeAddtion() {
  let additionPop = document.getElementById('additionPop')
  let input = document.getElementById('form-input')
  let select = document.getElementById('form-select')
  select.value = ''
  input.value = ''
  additionPop.style.display = 'none'
}
// 提交条件数据
function confirmAddition(e) {
  let input = document.getElementById('form-input')
  let select = document.getElementById('form-select')
  let pop = document.getElementById('additionPop')
  let formColor = document.getElementById('formColor')
  let style = window.getComputedStyle(formColor)
  let index = pop.dataset.index
  let wantindex = index
  for (let i = 0; i < Controls.ControlList.length; i++) {
    if (Controls.ControlList[i].PropertyList.ZIndex == wantindex) {
      wantindex = i
      break;
    }
  }
  if (input.value && select.value) {
    Controls.ControlList[wantindex].DataList.push({
      flag: select.value,
      num: input.value,
      backColor: style.backgroundColor
    })
    closeAddtion()
    initCondition(wantindex)
  } else {
    alert('条件或值不能为空')
  }
}
// 添加动态文本表格行-h
function dyAddTableTr(id, index, title) {
  // if ($('.colordiv')) {
  //   if($('.colordiv').length>=15){
  //     for (let i = 15; i < $('.colordiv').length; i++) {
  //       $('.colordiv')[i].remove()
  //     }
  //   }
   
  // }
  let len = []
  let data1 = []
  let types = ['datatextblock', 'rwtextbox']
  if (title == '1') {
    if (Controls.ControlList[index].DataList.length >= 10) {
      appTips.warningMsg('该组件变量最多只能10个')
      return
    }

    len = Controls.ControlList[index].TableTitleList
    let data = {}
    len.forEach(item => {
      if (item.ID != 'id') {
        data[item.ID] = ''
      }
      if (item.ID == 'backColor') {
        data[item.ID] = '#000'
      }

      if (types.includes(Controls.ControlList[index].ControlType) && item.ID === 'variable') {
        data[item.ID] = Controls.ControlList[index].CheckData.name
      }
      if (item.ID == 'img') {
        data[item.ID] = './imgs/defuleUpload.png'
      }
    })
    Controls.ControlList[index].DataList.push(data)
    data1 = Controls.ControlList[index].DataList
  } else {
    if (title.indexOf('2-') > -1) {
      let a = title.split('-')
      len = Controls.ControlList[index].ButtonTypeList[a[1]].TableTitleList
      if (Controls.ControlList[index].ButtonTypeList[a[1]].DataList.length >= 10) {
        appTips.warningMsg('该组件变量最多只能10个')
        return
      }
      let data = {}
      len.forEach(item => {
        if (item.ID != 'id') {
          data[item.ID] = ''
        }
      })
      Controls.ControlList[index].ButtonTypeList[a[1]].DataList.push(data)
      data1 = Controls.ControlList[index].ButtonTypeList[a[1]].DataList
    } else if (title.indexOf('3-') > -1) {
      let a = title.split('-')
      len = Controls.ControlList[index].ButtonTypeThreeList[a[1]].TableTitleList
      if (Controls.ControlList[index].ButtonTypeThreeList[a[1]].DataList.length >= 10) {
        appTips.warningMsg('该组件变量最多只能10个')
        return
      }
      let data = {}
      len.forEach(item => {
        if (item.ID != 'id') {
          data[item.ID] = ''
        }
      })
      Controls.ControlList[index].ButtonTypeThreeList[a[1]].DataList.push(data)
      data1 = Controls.ControlList[index].ButtonTypeThreeList[a[1]].DataList
    }

  }
  $("#" + id).empty();
  var html = dyRefreshTable(id, data1, index, title)
  $("#" + id).append(html);
  getColorpickerList(index, title)
  if (Controls.ControlList[index].ControlType === 'image') {
    initTableImg(index)
  }

}

//增加表格数据
function dyAddtableData(id, key, index, value, title) {
  if (value == '') {
    return
  }
  let len = ''
  if (title == '1') {
    len = Controls.ControlList[index].TableTitleList
  } else {
    if (title.indexOf('2-') > -1) {
      let a = title.split('-')
      len = Controls.ControlList[index].ButtonTypeList[a[1]].TableTitleList
    }
    if (title.indexOf('3-') > -1) {
      let a = title.split('-')
      len = Controls.ControlList[index].ButtonTypeThreeList[a[1]].TableTitleList
    }

  }
  var data = {}
  len.forEach(item => {

    if (item.ID != "id") {
      if (item.ID == "variable") {
        if (Controls.ControlList[index].CheckData.name) { //数值显示文本内容
          data[item.ID] = Controls.ControlList[index].CheckData.name
        } else {
          data[item.ID] = '选择'
        }
      } else if (item.ID == "backColor") {
        data[item.ID] = '#000'

      } else if (item.ID == "flashing") {
        data[item.ID] = true
      } else {
        data[item.ID] = ''
      }
      if (key == item.ID) {
        data[item.ID] = value
      }
    }
  })
  let data1 = []
  if (title == '1') {
    Controls.ControlList[index].DataList.push(data)
    data1 = Controls.ControlList[index].DataList
  } else {
    if (title.indexOf('2-') > -1) {
      let a = title.split('-')
      Controls.ControlList[index].ButtonTypeList[a[1]].DataList.push(data)
      data1 = Controls.ControlList[index].ButtonTypeList[a[1]].DataList
    }
    if (title.indexOf('3-') > -1) {
      let a = title.split('-')
      Controls.ControlList[index].ButtonTypeThreeList[a[1]].DataList.push(data)
      data1 = Controls.ControlList[index].ButtonTypeThreeList[a[1]].DataList
    }

  }

  $("#" + id).empty();
  var html = dyRefreshTable(id, data1, index, title)
  $("#" + id).append(html);
  getColorpickerList(index, title)
  if (Controls.ControlList[index].ControlType === 'image') {
    initTableImg(index)
  }

}

//删除动态文本添加行
function dyDelTableTr(id) {
  $("#" + id).find("tr:last").remove();


}
//动态文本表格编辑数据-h
function dyTextEdit(key, i, index, id) {
  if ($('#' + key + i + index + id).children("input").length > 0) {
    if ($('#' + key + i + index + id).children("input").css("display") != "none") {
      if (!$('#' + key + i + index + id).children("input").is(":focus")) {
        if ($('#' + key + i + index + id).children("input")[0].value != "") {
          $('#' + key + i + index + id).children("input").hide()
          $('#' + key + i + index + id).children("label").show()
        }

      }
    } else {
      $('#' + key + i + index + id).children("input").show()
      $('#' + key + i + index + id).children("label").hide()
    }

  } else if ($('#' + key + i + index + id).children("select").length > 0) {
    if ($('#' + key + i + index + id).children("select").css("display") != "none") {
      if (!$('#' + key + i + index + id).children("select").is(":focus")) {

        if ($('#' + key + i + index + id).children("select")[0].value != "") {
          $('#' + key + i + index + id).children("select").hide()
          $('#' + key + i + index + id).children("label").show()
        }
      }
    } else {
      $('#' + key + i + index + id).children("select").show()
      $('#' + key + i + index + id).children("label").hide()
    }

  }

}

//动态文本数据编辑保存表格数据
function dyTextChange(id, key, i, index, value, title) {
  // alert(1)
  // if ($('.colordiv')) {
  //   if($('.colordiv').length>=15){
  //     for (let i = 15; i < $('.colordiv').length; i++) {
  //       $('.colordiv')[i].remove()
  //     }
  //   }
   
  // }
  if (title == '1') {
    Controls.ControlList[index].DataList[i][key] = value
    if (value == '') {
      return
    }
    $("#" + id).empty();
    var html = dyRefreshTable(id, Controls.ControlList[index].DataList, index, title)
    $("#" + id).append(html);
  } else {
    if (title.indexOf('2-') > -1) {
      let a = title.split('-')
      Controls.ControlList[index].ButtonTypeList[a[1]].DataList[i][key] = value
      if (value == '') {
        return
      }
      $("#" + id).empty();
      var html = dyRefreshTable(id, Controls.ControlList[index].ButtonTypeList[a[1]].DataList, index, title)
      $("#" + id).append(html);
    }
    if (title.indexOf('3-') > -1) {
      let a = title.split('-')
      Controls.ControlList[index].ButtonTypeThreeList[a[1]].DataList[i][key] = value
      if (value == '') {
        return
      }
      $("#" + id).empty();
      var html = dyRefreshTable(id, Controls.ControlList[index].ButtonTypeThreeList[a[1]].DataList, index, title)
      $("#" + id).append(html);
    }

  }


  if ($('#' + key + i + index + id).children("select").length > 0) {
    $('#' + key + i + index + id).children("select")[0].value = value
  }

  getColorpickerList(index, title)
  if (Controls.ControlList[index].ControlType === 'image') {
    initTableImg(index)
  }
}

//动态文本数据表格渲染
function dyRefreshTable(id, dataList, index, title) {
  let wantindex = index
  for (let i = 0; i < Controls.ControlList.length; i++) {
    if (Controls.ControlList[i].PropertyList.ZIndex == wantindex) {
      wantindex = i
      break;
    }
  }
  var title1 = ''
  if (title == '1') {
    title1 = Controls.ControlList[index].TableTitleList
  } else {
    if (title.indexOf('2-') > -1) {
      let a = title.split('-')
      title1 = Controls.ControlList[index].ButtonTypeList[a[1]].TableTitleList
    } else if (title.indexOf('3-') > -1) {
      let a = title.split('-')
      title1 = Controls.ControlList[index].ButtonTypeThreeList[a[1]].TableTitleList
    }

  }
  var html = ''
  for (var i = 0; i < dataList.length; i++) {
    html += `<tr>`
    for (var j = 0; j < title1.length; j++) {
      var key = title1[j].ID
      if (key == "backColor") {
        html += `<td><div class="div-color-h " id="dynamictextBackcolor${i}" style="background:${dataList[i][key]}"><div></td>`
      } else if (key == "flag") {
        html += `<td title="${dataList[i][key]}" onclick="dyTextEdit('${key}',${i},${index},'${id}')" id="${key+i+index+id}">
         <select onchange="dyTextChange('${id}','${key}',${i},${index},this.value,'${title}')" value="${dataList[i][key]}"  ${dataList[i][key] != ''?'style="display:none"':''} placeholder="请选择">`
        html += `<option style='display: none'></option>`
        flagAllList.forEach(item => {
          html += `<option ${dataList[i][key]== item.value?'selected':''} value="${item.value}">${item.name}</option>`
        })
        html += `</select><label ${dataList[i][key] == ''?'style="display:none"':''}>${dataList[i][key]}</label></td>`
      } else if (key == "rwtextbox") {
        if (Controls.ControlList[index].ControlType !== 'cornerbutton') {
          html += `<td title="${dataList[i][key]}" onclick="dyTextEdit('${key}',${i},${index},'${id}')" id="${key+i+index+id}">
          <select onchange="dyTextChange('${id}','${key}',${i},${index},this.value,'${title}')" value="${dataList[i][key]}" ${dataList[i][key] != ''?'style="display:none"':''} placeholder="请选择">
         <option style='display: none'></option>
          <option value="读写框1">读写框</option>
          <option value="数值输入1">数值输入1</option>
          </select><label>${dataList[i][key]}</label></td>`
        } else { // 控制按钮
          let optList = ``
          Controls.ControlList.forEach((item, index) => {
            if (item.ControlType === 'rwtextbox') {
              optList += `<option ${dataList[i][key]== item.Name?'selected':''} value="${item.PropertyList.ComName}">${item.PropertyList.ComName}</option>`
            }
          })

          html += `<td title="${dataList[i][key]}" onclick="dyTextEdit('${key}',${i},${index},'${id}')" id="${key+i+index+id}">
          <select onchange="dyTextChange('${id}','${key}',${i},${index},this.value,'${title}')" ${dataList[i][key] != ''?'style="display:none"':''} placeholder="请选择">
          <option style='display: none'></option>
          ${optList}
          </select><label>${dataList[i][key]}</label></td>`
        }
      } else if (key == "variable") {
        if (dataList[i][key] == '') {
          dataList[i][key] = '选择'
        }
        let types = ['datatextblock', 'rwtextbox']
        if (!types.includes(Controls.ControlList[index].ControlType)) {
          if (Controls.ControlList[index].ControlType === 'cornerbutton') { // 控制按钮特殊处理
            html += `<td title="${dataList[i][key]}" onclick="openPop(${index}, ${i}, '${key}', 'cornerbutton', '${title}','${id}')" ><div class="variable-styleindex-h variable-c">${dataList[i][key]}</div></td>`
          } else {
            html += `<td title="${dataList[i][key]}" onclick="openPop(${index}, ${i}, '${key}','','${title}','${id}')" ><div class="variable-styleindex-h variable-c">${dataList[i][key]}</div></td>`
          }
        } else {
          html += `<td title="${dataList[i][key]}"><div class="variable-styleindex-h">${dataList[i][key]}</div></td>`
        }
      } else if (key == "id") {
        html += `<td>${i+1}</td>`
        //图片编辑
      } else if (key == "img") {
        html += `<td><img class="table-img" id="tableimg${i}" src="${dataList[i][key]}"/></td>`
      } else if (key == "flashing") {
        html += `<td class="dy-switch-h" id="${key+i+index+id}">
        <label>闪烁</label>
        <input onchange="dyTextChange('${id}','${key}',${i},${index},this.checked,'${title}')" ${dataList[i][key] ? 'checked' : ''} class="table-switch-h switch-anim" type="checkbox">
        </td>
        `
      } else if (key == 'title') {
        if (dataList[i].CheckData) {
          dataList[i][key] = dataList[i][key] ? dataList[i][key] : dataList[i].CheckData.name
        }
        html += `<td title="${dataList[i][key]}" onclick="dyTextEdit('${key}',${i},${index},'${id}')" id="${key+i+index+id}">
         <input onchange="dyTextChange('${id}','${key}',${i},${index},this.value,'${title}')" value="${dataList[i][key]}" ${dataList[i][key] != ''?'style="display:none"':''}  type="text" autocomplete="off" placeholder="请输入"></input>
         <label ${dataList[i][key] == ''?'style="display:none"':''}>${dataList[i][key]}</label></td>`

      } else if (key == 'presetText') {
        let inputType = 'text'
        let types = ['image']
        if (types.includes(Controls.ControlList[index].ControlType)) {
          // if (Controls.ControlList[index].DataList[i].CheckData) {
          //   inputType = Controls.ControlList[index].DataList[i].CheckData.type === "string" ? 'text' : 'number'
          // } else {
          //   inputType = 'number'
          // }

          html += `<td title="${dataList[i][key]}" onclick="dyTextEdit('${key}',${i},${index},'${id}')" id="${key+i+index+id}">
            <input onchange="dyTextChange('${id}','${key}',${i},${index},this.value,'${title}')" value="${dataList[i][key]}" ${dataList[i][key] != ''?'style="display:none"':''}  type="${inputType}" autocomplete="off" placeholder="请输入" class="datatextblock-td-input" ></input>
            <label ${dataList[i][key] == ''?'style="display:none"':''} class="datatextblock-td-label" >${dataList[i][key]}</label> <i class="iconfont iconxinzenglianxiren datatextblock-td-icon" onclick="openPop(${index}, ${i}, '','','','','text')" ></i></td>`
        } else {
          html += `<td title="${dataList[i][key]}" onclick="dyTextEdit('${key}',${i},${index},'${id}')" id="${key+i+index+id}">
          <input onchange="dyTextChange('${id}','${key}',${i},${index},this.value,'${title}')" value="${dataList[i][key]}" ${dataList[i][key] != ''?'style="display:none"':''}  type="${inputType}" autocomplete="off" placeholder="请输入"></input>
          <label ${dataList[i][key] == ''?'style="display:none"':''}>${dataList[i][key]}</label></td>`
        }

      } else {
        let inputType = 'text'
        if (key === 'num' || key === 'issuedValue') {
          inputType = 'number'
        }
        if (dataList[i].CheckData) {
          inputType = getTableInputType(dataList[i].CheckData.type)
        }
        if (Controls.ControlList[index].ControlType == 'datatextblock' || Controls.ControlList[index].ControlType == 'rwtextbox') {
          if (Controls.ControlList[index].CheckData) {
            inputType = getTableInputType(Controls.ControlList[index].CheckData.type)
          }
        }
        let types = ['datatextblock', 'dynamictext', 'ellipselamp', 'commonlamp']

        // if (Controls.ControlList[index].ControlType !== 'datatextblock') {
        //   html += `<td title="${dataList[i][key]}" onclick="dyTextEdit('${key}',${i},${index},'${id}')" id="${key+i+index+id}">
        //   <input type="${inputType}" onchange="dyTextChange('${id}','${key}',${i},${index},this.value,'${title}')" value="${dataList[i][key]}" ${dataList[i][key] != ''?'style="display:none"':''}  type="text" autocomplete="off" placeholder="请输入"></input>
        //   <label ${dataList[i][key] == ''?'style="display:none"':''}>${dataList[i][key]}</label></td>`
        // } else {
        //   html += `<td title="${dataList[i][key]}" onclick="dyTextEdit('${key}',${i},${index},'${id}')" id="${key+i+index+id}">
        //   <input type="text" class="datatextblock-td-input" onchange="dyTextChange('${id}','${key}',${i},${index},this.value,'${title}')" value="${dataList[i][key]}" ${dataList[i][key] != ''?'style="display:none"':''}  type="text" autocomplete="off" placeholder="请输入"></input>
        //   <label class="datatextblock-td-label" ${dataList[i][key] == ''?'style="display:none"':''}>${dataList[i][key]}</label> <i class="iconfont iconxinzenglianxiren datatextblock-td-icon" onclick="openPop(${index}, ${i}, '','','','','text')" ></i></td>`
        // }
        if (types.includes(Controls.ControlList[index].ControlType)) {
          html += `<td title="${dataList[i][key]}" onclick="dyTextEdit('${key}',${i},${index},'${id}')" id="${key+i+index+id}">
            <input type="text" class="datatextblock-td-input" onchange="dyTextChange('${id}','${key}',${i},${index},this.value,'${title}')" value="${dataList[i][key]}" ${dataList[i][key] != ''?'style="display:none"':''}  type="text" autocomplete="off" placeholder="请输入"></input>
            <label class="datatextblock-td-label" ${dataList[i][key] == ''?'style="display:none"':''}>${dataList[i][key]}</label> <i class="iconfont iconxinzenglianxiren datatextblock-td-icon" onclick="openPop(${index}, ${i}, '','','','','text')" ></i></td>`
        } else {
          html += `<td title="${dataList[i][key]}" onclick="dyTextEdit('${key}',${i},${index},'${id}')" id="${key+i+index+id}">
            <input type="${inputType}" onchange="dyTextChange('${id}','${key}',${i},${index},this.value,'${title}')" value="${dataList[i][key]}" ${dataList[i][key] != ''?'style="display:none"':''}  type="text" autocomplete="off" placeholder="请输入"></input>
            <label ${dataList[i][key] == ''?'style="display:none"':''}>${dataList[i][key]}</label></td>`
        }

      }
    }
    if (Controls.ControlList[index].ControlType != 'dashboardchart') {
      html += `<td style="text-align: center;cursor: pointer;">`
      if (Controls.ControlList[index].ControlType == 'image' || Controls.ControlList[index].ControlType == 'dynamictext' ||
        Controls.ControlList[index].ControlType == 'ellipselamp' || Controls.ControlList[index].ControlType == 'commonlamp') {
        html += `<i onclick="tableDataDownFun('${key}',${i},${index},'${id}','${title}')" class="iconfont iconxiangxia ${i == dataList.length-1?'tableDataUpIcon1':'tableDataUpIcon'} "></i>
        <i onclick="tableDataUpFun('${key}',${i},${index},'${id}','${title}')" class="iconfont iconxiangshang ${i == 0?'tableDataUpIcon1':'tableDataUpIcon'} " style="padding:0 5px"></i>`
      }

      html += `<i onclick="dyDelTableData('${id}',${i},${index},'${title}')" class="iconfont iconguanbi1"></i>
      </td>`
    }
    html += `</tr>`

  }
  return html

}

// 交换数组元素
function swapItems(arr, index1, index2) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  return arr;
};
//表格内容上移
function tableDataUpFun(key, i, index, id, title) {
  if (i == 0) {
    return;
  }
  Controls.ControlList[index].DataList = swapItems(Controls.ControlList[index].DataList, i, i - 1);
  $("#" + id).empty();
  var html = dyRefreshTable(id, Controls.ControlList[index].DataList, index, title)
  $("#" + id).append(html);

}
//表格内容下移
function tableDataDownFun(key, i, index, id, title) {
  if (i == Controls.ControlList[index].DataList.length - 1) {
    return;
  }
  Controls.ControlList[index].DataList = swapItems(Controls.ControlList[index].DataList, i, i + 1);
  $("#" + id).empty();
  var html = dyRefreshTable(id, Controls.ControlList[index].DataList, index, title)
  $("#" + id).append(html);


}

//动态获取表格输入框类型
function getTableInputType(type) {
  let inputType = 'text'
  if (type == 'string' || type == 'boolean') {
    inputType = 'text'
  } else {
    inputType = 'number'
  }


  return inputType


}



//动态文本数据表格数据删除
function dyDelTableData(id, i, index, title) {
  // $('.colordiv').remove()
  // if ($('.colordiv')) {
  //   if($('.colordiv').length>=15){
  //     for (let i = 15; i < $('.colordiv').length; i++) {
  //       $('.colordiv')[i].remove()
  //     }
  //   }
   
  // }
  if (title == '1') {
    if (Controls.ControlList[index].DataList.length > 0) {
      Controls.ControlList[index].DataList.splice(i, 1)
      $("#" + id).empty();
      var html = dyRefreshTable(id, Controls.ControlList[index].DataList, index, title)
      $("#" + id).append(html);
    }

  } else {
    if (title.indexOf('2-') > -1) {
      let a = title.split('-')
      Controls.ControlList[index].ButtonTypeList[a[1]].DataList.splice(i, 1)
      $("#" + id).empty();
      var html = dyRefreshTable(id, Controls.ControlList[index].ButtonTypeList[a[1]].DataList, index, title)
      $("#" + id).append(html);
    } else if (title.indexOf('3-') > -1) {
      let a = title.split('-')
      Controls.ControlList[index].ButtonTypeThreeList[a[1]].DataList.splice(i, 1)
      $("#" + id).empty();
      var html = dyRefreshTable(id, Controls.ControlList[index].ButtonTypeThreeList[a[1]].DataList, index, title)
      $("#" + id).append(html);
    }

  }
  getColorpickerList(index, title)




}

//列表取色器循环
function getColorpickerList(index, title) {
  if (title == '1') {
    Controls.ControlList[index].DataList.forEach((item, index) => {
      if (item.backColor) {
        if($('#'+`dynamictextBackcolor${index}`)){
          $('#'+`dynamictextBackcolor${index}`+'_color').remove()
        }
        setTimeout(()=>{
          Colorpicker.create({
            el: `dynamictextBackcolor${index}`,
            color: item.backColor,
            change: function (elem, hex, rgba) {
              elem.style.backgroundColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')';
              item.backColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
  
            }
          })
        },100)

      }
    })
  } else {}

}
//动态文本默认取色器
function getDefultColorpicker(id, index) {
  if ($('#' + id).length > 0) {
    if($('#'+ `${id}`)){
      $('#'+`${id}`+'_color').remove()
    }
    setTimeout(()=>{
      Colorpicker.create({
        el: `${id}`,
        color: Controls.ControlList[index].DefaultColor,
        change: function (elem, hex, rgba) {
          elem.style.backgroundColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')';
          // item.backColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
          Controls.ControlList[index].DefaultColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')'
  
        }
      })

    },100)
   
  }

}
//默认文本框值改变
function defaultTextFunc(key, index, value, type) {
  if (key == 'dynamictext') {
    Controls.ControlList[index].DefaultText = value
  } else if (key == 'datatextblock') {
    if (type == 'IntNumber') {
      Controls.ControlList[index].IntNumber = value
    }
    if (type == 'DecimalDigits') {
      Controls.ControlList[index].DecimalDigits = value
    }
  } else if (key == 'rwtextbox') {
    Controls.ControlList[index].TriggerCondition = value
  }

}
//状态点默认闪烁
function defaultFlashingFunc(index, value) {
  Controls.ControlList[index].DefaultFlashing = value

}

//渲染控制按钮数据组件1
function getButtonTypeTable(index, buttonTypeId) {
  let tableTitleList = Controls.ControlList[index].ButtonTypeList[buttonTypeId].TableTitleList
  let dataList = Controls.ControlList[index].ButtonTypeList[buttonTypeId].DataList
  let addBtnTitle = Controls.ControlList[index].ButtonTypeList[buttonTypeId].addBtnTitle
  let html = ''
  html += `<table id="dynamictextTableId-h">
    <thead><tr>`
  for (var i = 0; i < tableTitleList.length; i++) {
    html += `<th>${tableTitleList[i].title}</th>`
  }
  html += `<th style="width:40px"></th>
      </tr>
      </thead>`
  html += `<tbody id="dynamictextTableBodyId-h">`
  html += dyRefreshTable("dynamictextTableBodyId-h", dataList, index, '2-' + buttonTypeId)
  html += `</tbody></table>`
  html += `<div class="add-btn-h" onclick="dyAddTableTr('dynamictextTableBodyId-h',${index},'${'2-'+buttonTypeId}')">
      <i class="iconfont iconxinzenglianxiren"></i><span>${addBtnTitle}</span></div>`
  return html

}

//渲染控制按钮组件2
function getButtonTypeThreeTable(index, buttonTypeId) {
  let html = ''
  let buttonTypeThreeList = Controls.ControlList[index].ButtonTypeThreeList
  html += `<div class="r-pos-title cornerbutton-three-type" id="dynamictextTableId-h"> `
  html += `
  <div class="cornerbutton-three-add" onclick="addButtonTypeThreeTableList(event,${index})">新增分组</div>
  <div class="bi-collapse-title cornerbutton-three-title" onclick="toggleCollpase(event)">分组<i class="iconfont iconxialajiantou"></i>
  </div>
  <div class="bi-collapse-content"><div>`
  html += `<div id="buttonTypeThreeTableList-h" class="r-pos-h">`
  html += getCornerbuttonThreeTableList(buttonTypeThreeList, index)

  html += `</div>`
  html += `</div></div></div>`
  return html
}
//动态渲染控制按钮-弹窗设定参数-表格列表
function getCornerbuttonThreeTableList(buttonTypeThreeList, index) {
  let html = ''
  for (let j = 0; j < buttonTypeThreeList.length; j++) {
    let item = buttonTypeThreeList[j]
    let tableTitleList = item.TableTitleList
    let dataList = item.DataList
    html += `<div>${item.ButtonTypeThreeTitle} <span onclick="delButtonTypeThreeTableList(${index},${j},event)" class="span-text">删除</span></div>`
    html += `<table id="dynamictextTableId-h-${j}">
    <thead><tr>`
    for (var i = 0; i < tableTitleList.length; i++) {
      html += `<th>${tableTitleList[i].title}</th>`
    }
    html += `<th style="width:40px"></th>
      </tr>
      </thead>`
    html += `<tbody id="${'dynamictextTableBodyId-h-'+j}">`
    // let id = "dynamictextTableBodyId-h-"+j
    html += dyRefreshTable("dynamictextTableBodyId-h-" + j, dataList, index, '3-' + j)
    html += `</tbody></table>`
    html += `<div class="add-btn-h" onclick="dyAddTableTr('${'dynamictextTableBodyId-h-'+j}',${index},'${'3-'+j}')">
      <i class="iconfont iconxinzenglianxiren"></i><span>${item.addBtnTitle}</span></div>`
  }
  return html

}
//添加控制按钮-弹窗设定参数-表格列表
function addButtonTypeThreeTableList(e, index) {
  let len = Controls.ControlList[index].ButtonTypeThreeList.length
  let data = {
    ButtonTypeThreeTitle: '分组' + (len + 1),
    addBtnTitle: '新增变量',
    TableTitleList: [{
        ID: 'id',
        title: '序号'
      },
      {
        ID: 'variable',
        title: '变量'
      },
      {
        ID: 'title',
        title: '标题'
      },
    ],
    DataList: [],
  };
  Controls.ControlList[index].ButtonTypeThreeList.push(data)
  $("#buttonTypeThreeTableList-h").empty();
  var html = getCornerbuttonThreeTableList(Controls.ControlList[index].ButtonTypeThreeList, index)
  $("#buttonTypeThreeTableList-h").append(html);
  // setTimeout(()=>{
  let content = e.currentTarget.parentElement.lastElementChild
  // let height = content.firstElementChild.offsetHeight
  let icon = e.currentTarget.nextElementSibling.firstElementChild
  // let style = window.getComputedStyle(content)
  if (content.style.display == 'none') {
    content.style.display = 'block';
    icon.style.transform = 'rotate(180deg)'
  } else {}
  //   content.style.height = height + 'px';
  //   icon.style.transform = 'rotate(180deg)'
  // }


  // })

  // toggleCollpase('',event.currentTarget.parentElement.childNodes[5])
}
//删除控制按钮-弹窗设定参数-表格列表
function delButtonTypeThreeTableList(index, i, e) {
  Controls.ControlList[index].ButtonTypeThreeList.splice(i, 1)
  let content = e.currentTarget.offsetParent.lastElementChild
  $("#buttonTypeThreeTableList-h").empty();
  var html = getCornerbuttonThreeTableList(Controls.ControlList[index].ButtonTypeThreeList, index)
  $("#buttonTypeThreeTableList-h").append(html);
  //  let height = content.firstElementChild.offsetHeight + 20
  content.style.height = 'auto';
}
//控制按钮组件按钮类型转换
function buttonTypeFun(index, value) {
  Controls.ControlList[index].radioType = value
  $("#controlButtonTableId").empty()
  if (value != '2') {
    let html = getButtonTypeTable(index, value)
    $("#controlButtonTableId").append(html)
    $("#cornerbuttonCheckbox").show()
    $("#cornerbuttonCheckbox1").hide()
  } else if (value == '2') {
    let html = getButtonTypeThreeTable(index, value)
    $("#controlButtonTableId").append(html)
    $("#cornerbuttonCheckbox").hide()
    $("#cornerbuttonCheckbox1").show()
  }
}
//控制按钮组件安全策略权限操作
function choicePermissionFun(index, value, name) {
  if (name == 'operationPermission') {
    let custom = document.getElementById('opera-permission')
    Controls.ControlList[index].OperationPermission = value
    if (value === 'custom') {
      custom.style.display = 'block'
    } else {
      custom.style.display = 'none'
    }
  }
  if (name == 'accessPermission') {
    Controls.ControlList[index].AccessPermission = value
  }
  if (name == 'PermissionDesc') {
    Controls.ControlList[index].PermissionDesc = value
  }
  if (name == 'isOpenText') {
    Controls.ControlList[index].IsOpenText = value
  }
  if (name == 'AsDatetimepickerType') {
    Controls.ControlList[index].AsDatetimepickerType = value
    if (value == '业务数据') {
      $('#showAsdatetimepickerHtml').empty()
      let html = getPublicHtmlFunc1(index, '1')
      $('#showAsdatetimepickerHtml').append(html)
      renderChartList(index)
    } else { // 历史数据
      $('#showAsdatetimepickerHtml').empty()
      let html = getPublicHtmlFunc1(index, '0')
      $('#showAsdatetimepickerHtml').append(html)
    }
  }
  initCheckAll()
}

//文本查询、数值查询、下拉查询公用样式
function getPublicHtmlFunc(index) {
  let html = ''
  let filterConditions = Controls.ControlList[index].FilterConditions
  html += ` <div class="bi-collapse-title" onclick="toggleCollpase(event)">数据<i class="iconfont iconxialajiantou"></i></div>
  <div class="bi-collapse-content">
    <div>
      <div id="showAsdatetimepickerHtml" class="r-pos-title">`
  html += getPublicHtmlFunc1(index, 1)
  // html += `<div>设置初始过滤条件</div>`
  // html += `<div class="r-pos"><div class="textsearch-data-h">
  //   <select onchange="textsearchGetSelect(${index},this.value,'FilterConditions')" placeholder="请选择">`
  // TextSearchList.forEach(item => {
  //   html += `<option value="${item.value}" ${Controls.ControlList[index].FilterConditions == item.value?'selected':''}>${item.name}</option>`
  // })
  // html += `</div></select>`
  // html += `<input id="FilterConditionNumInput" 
  //   ${filterConditions == '不限' || filterConditions == '为空'||filterConditions == '不为空'? 'style="display:none"':''} 
  //   onchange="textsearchGetSelect(${index},this.value,'FilterConditionNum')" value="${Controls.ControlList[index].FilterConditionNum}" type="number" placeholder="请输入数值">`
  // html += `</div>`
  html += `</div></div></div>`
  return html

}
//获取图表列表
function getEchartList(index) {
  let str = ``
  let types = ['piechart', 'dashboardchart', 'barchart', 'linechart']
  let names = []
  let hisNames = []
  Controls.ControlList[index].EchartList.forEach(item => {
    if (item.selectValue) {
      names.push(item.name)
    }
  })

  Controls.ControlList[index].HistoryList.forEach(item => {
    if (item.selectValue) {
      hisNames.push(item.name)
    }
  })
  Controls.ControlList.forEach((d, i) => {
    if (Controls.ControlList[index].AsDatetimepickerType === '历史数据') {
      if (types.includes(d.ControlType)) {
        // if (Controls.ControlList[i].ControlType === 'linechart') {
        //   Controls.Data.LineChartItemList.forEach(cf => {
        //     if (cf.name === Controls.ControlList[i].Name) {
        //       if (cf.defaultDataConfig.datatype === '历史数据') {
        //         str += `<div class="cornerbutton-checkbox r-pos">
        //           <input onclick="textsearchGetEchart(${index},this.checked,this.value, ${i}, '${d.ControlType}', event)" ${hisNames.includes(d.Name) ?'checked':''}  value="${d.Name}" type="checkbox">${d.Name}
        //         </div>`
        //       }
        //     }
        //   })
        // }
        str += renderTimeChexkBox(index, d, i, hisNames, '历史数据')

        // str += `<div class="cornerbutton-checkbox r-pos">
        //   <input onclick="textsearchGetEchart(${index},this.checked,this.value, ${i}, '${d.ControlType}', event)" ${hisNames.includes(d.Name) ?'checked':''}  value="${d.Name}" type="checkbox">${d.Name}
        // </div>`
      }
    } else {
      if (Controls.ControlList[index].ControlType === 'searchbutton') {
        str += renderTimeChexkBox(index, d, i, hisNames, '历史数据')
        str += renderTimeChexkBox(index, d, i, names, '业务数据')
      } else {
        str += renderTimeChexkBox(index, d, i, names, '业务数据')
      }
      // if (types.includes(d.ControlType)) {
      //   str += `<div class="cornerbutton-checkbox r-pos">
      //     <input onclick="textsearchGetEchart(${index},this.checked,this.value, ${i}, '${d.ControlType}', event)" ${names.includes(d.Name) ?'checked':''}  value="${d.Name}" type="checkbox">${d.Name}
      //   </div>`
      // }
    }
  })
  return str
}

// 全选选中
function initCheckAll() {
  let times = 0
  let checkList = document.querySelectorAll('#showAsdatetimepickerHtml .cornerbutton-checkbox input.checkbox-item')
  let checkAll = document.querySelector('#showAsdatetimepickerHtml #textsearchDataCheckbox input')
  if (checkList && checkList.length !== 0) {
    checkList.forEach(item => {
      if (item.checked) {
        times++
      }
    })
    if (times === checkList.length) {
      checkAll.checked = true
      checkAll.setAttribute('checked', true)
    } else if (times === 0) {
      checkAll.checked = false
      checkAll.removeAttribute('checked')
    } else {
      checkAll.checked = false
      checkAll.removeAttribute('checked')
    }
  }
}

function renderTimeChexkBox(index, d, i, names, type) {
  let str = ``
  if (Controls.ControlList[i].ControlType === 'linechart') {
    Controls.Data.LineChartItemList.forEach(cf => {
      if (cf.name === Controls.ControlList[i].Name) {
        if (cf.defaultDataConfig.datatype === type) {
          str += `<div class="cornerbutton-checkbox r-pos">
              <input class="checkbox-item" onclick="textsearchGetEchart(${index},this.checked,this.value, ${i}, '${d.ControlType}', event)" ${names.includes(d.Name) ?'checked':''}  value="${d.Name}" type="checkbox">${d.PropertyList.ComName}
            </div>`
        }
      }
    })
  } else if (Controls.ControlList[i].ControlType === 'barchart') {
    Controls.Data.BarChartItemList.forEach(cf => {
      if (cf.name === Controls.ControlList[i].Name) {
        if (cf.defaultDataConfig.datatype === type) {
          str += `<div class="cornerbutton-checkbox r-pos">
              <input class="checkbox-item" onclick="textsearchGetEchart(${index},this.checked,this.value, ${i}, '${d.ControlType}', event)" ${names.includes(d.Name) ?'checked':''}  value="${d.Name}" type="checkbox">${d.PropertyList.ComName}
            </div>`
        }
      }
    })
  } else if (Controls.ControlList[i].ControlType === 'dashboardchart') {
    Controls.Data.DashBoardChartItemList.forEach(cf => {
      if (cf.name === Controls.ControlList[i].Name) {
        if (cf.defaultDataConfig.datatype === type) {
          str += `<div class="cornerbutton-checkbox r-pos">
              <input class="checkbox-item" onclick="textsearchGetEchart(${index},this.checked,this.value, ${i}, '${d.ControlType}', event)" ${names.includes(d.Name) ?'checked':''}  value="${d.Name}" type="checkbox">${d.PropertyList.ComName}
            </div>`
        }
      }
    })
  } else if (Controls.ControlList[i].ControlType === 'piechart') {
    Controls.Data.PieChartItemList.forEach(cf => {
      if (cf.name === Controls.ControlList[i].Name) {
        if (cf.defaultDataConfig.datatype === type) {
          str += `<div class="cornerbutton-checkbox r-pos">
              <input class="checkbox-item" onclick="textsearchGetEchart(${index},this.checked,this.value, ${i}, '${d.ControlType}', event)" ${names.includes(d.Name) ?'checked':''}  value="${d.Name}" type="checkbox">${d.PropertyList.ComName}
            </div>`
        }
      }
    })
  }
  return str
}

//文本查询、数值查询、下拉查询、日期时间公用样式
function getPublicHtmlFunc1(index, show) {
  // let types = ['piechart', 'dashboardchart', 'barchart', 'linechart']
  let html = ''
  let str = getEchartList(index)

  // let names = []
  // let hisNames = []
  // Controls.ControlList[index].EchartList.forEach(item => {
  //   if (item.selectValue) {
  //     names.push(item.name)
  //   }
  // })

  // Controls.ControlList[index].HistoryList.forEach(item => {
  //   if (item.selectValue) {
  //     hisNames.push(item.name)
  //   }
  // })

  // Controls.ControlList.forEach((d, i) => {
  //   if (Controls.ControlList[index].AsDatetimepickerType === '历史数据') {
  //     if (types.includes(d.ControlType)) {
  //       str += `<div class="cornerbutton-checkbox r-pos">
  //         <input onclick="textsearchGetEchart(${index},this.checked,this.value, ${i}, '${d.ControlType}', event)" ${hisNames.includes(d.Name) ?'checked':''}  value="${d.Name}" type="checkbox">${d.Name}
  //       </div>`
  //     }
  //   } else {
  //     if (types.includes(d.ControlType)) {
  //       str += `<div class="cornerbutton-checkbox r-pos">
  //         <input onclick="textsearchGetEchart(${index},this.checked,this.value, ${i}, '${d.ControlType}', event)" ${names.includes(d.Name) ?'checked':''}  value="${d.Name}" type="checkbox">${d.Name}
  //       </div>`
  //     }
  //   }
  // })
  html += `<div>请选择需要筛选的图表</div>`
  if (str) {
    html += `<div id="textsearchDataCheckbox" class="cornerbutton-checkbox r-pos">
      <input onclick="textsearchSelectAll(${index},this.checked)"  type="checkbox">全选</div>`

    html += str
  } else {
    html += `<span class="cornerbutton-checkbox r-pos r-pos-empty">画布暂无图表，请先取图表并设置参数</span>`
  }
  if (show == '1') {
    html += `<div>选择作为筛选的字段</div><div id="text-filer${index}" ></div>`
    // html += `<div class="r-pos">
    // <div>数据表1</div>
    // <select onchange="textsearchGetSelect(${index},this.value,'0')"  placeholder="请选择">
    // <option value="0" ${Controls.ControlList[index].TextList[0] == '0'?'selected':''}}>时间字段</option>
    // <option value="1" ${Controls.ControlList[index].TextList[0] == '1'?'selected':''}>时间字段2</option>
    // <option value="2" ${Controls.ControlList[index].TextList[0] == '2'?'selected':''}>时间字段3</option>
    // </select>
    // </div>`
    // html += `<div class="r-pos">
    // <div>数据表2</div>
    // <select onchange="textsearchGetSelect(${index},this.value,'1')" placeholder="请选择">
    // <option value="0" ${Controls.ControlList[index].TextList[1] == '0'?'selected':''}}>时间字段</option>
    // <option value="1" ${Controls.ControlList[index].TextList[1] == '1'?'selected':''}>时间字段2</option>
    // <option value="2" ${Controls.ControlList[index].TextList[1] == '2'?'selected':''}>时间字段3</option>
    // </select>
    // </div>`
  }

  return html

}
//文本查询实现全选
function textsearchSelectAll(index, value) {
  if (Controls.ControlList[index].AsDatetimepickerType === '业务数据') {
    /* 图表组件 --- 业务数据 */
    Controls.ControlList[index].EchartList = []
    if (value) {
      let checkboxList = $("#showAsdatetimepickerHtml").find("input[type='checkbox']")
      if (checkboxList.length > 0) {
        Controls.Data.LineChartItemList.forEach((item, cIndex) => { //折线图
          item.defaultDataConfig.dataChart.forEach((d, i) => {
            if (item.defaultDataConfig.tablename === d.nameCn) {
              let field = JSON.parse(d.field)
              Controls.ControlList[index].EchartList.push({
                ...item,
                selectValue: item.name,
                fieldChartData: field,
                fieldId: d.id,
                field: item.filed
              })
            }
          })
        })

        Controls.Data.BarChartItemList.forEach((item, cIndex) => { //柱状图
          item.defaultDataConfig.dataChart.forEach((d, i) => {
            if (item.defaultDataConfig.tablename === d.nameCn) {
              let field = JSON.parse(d.field)
              Controls.ControlList[index].EchartList.push({
                ...item,
                selectValue: item.name,
                fieldChartData: field,
                fieldId: d.id,
                field: item.filed
              })
            }
          })

        })

        Controls.Data.PieChartItemList.forEach((item, cIndex) => { //饼图
          item.defaultDataConfig.dataChart.forEach((d, i) => {
            if (item.defaultDataConfig.tablename === d.nameCn) {
              let field = JSON.parse(d.field)
              Controls.ControlList[index].EchartList.push({
                ...item,
                selectValue: item.name,
                fieldChartData: field,
                fieldId: d.id,
                field: item.filed
              })
            }
          })

        })

        Controls.Data.DashBoardChartItemList.forEach((item, cIndex) => { //仪表盘
          item.defaultDataConfig.dataChart.forEach((d, i) => {
            if (item.defaultDataConfig.tablename === d.nameCn) {
              let field = JSON.parse(d.field)
              Controls.ControlList[index].EchartList.push({
                ...item,
                selectValue: item.name,
                fieldChartData: field,
                fieldId: d.id,
                field: item.filed
              })
            }
          })

        })


      }
    }
  } else if (Controls.ControlList[index].AsDatetimepickerType === '历史数据') {
    /* 图表组件 --- 历史数据 */
    Controls.ControlList[index].HistoryList = []
    if (value) {
      let checkboxList = $("#showAsdatetimepickerHtml").find("input[type='checkbox']")
      if (checkboxList.length > 0) {
        // 循环所有折线数据，判断为历史数据则往HistoryList里面push 数据
        Controls.Data.LineChartItemList.forEach((item, cIndex) => {
          if (item.defaultDataConfig.datatype === '历史数据') {
            Controls.ControlList[index].HistoryList.push({
              ...item,
              selectValue: item.name,
            })
          }
        })
        // 循环所有饼图数据，判断为历史数据则往HistoryList里面push 数据
        Controls.Data.BarChartItemList.forEach((item, cIndex) => {
          if (item.defaultDataConfig.datatype === '历史数据') {
            Controls.ControlList[index].HistoryList.push({
              ...item,
              selectValue: item.name,
            })
          }
        })
        // 循环所有仪表盘数据，判断为历史数据则往HistoryList里面push 数据
        Controls.Data.DashBoardChartItemList.forEach((item, cIndex) => {
          if (item.defaultDataConfig.datatype === '历史数据') {
            Controls.ControlList[index].HistoryList.push({
              ...item,
              selectValue: item.name,
            })
          }
        })
        // 循环所有饼图数据，判断为历史数据则往HistoryList里面push 数据
        Controls.Data.PieChartItemList.forEach((item, cIndex) => {
          if (item.defaultDataConfig.datatype === '历史数据') {
            Controls.ControlList[index].HistoryList.push({
              ...item,
              selectValue: item.name,
            })
          }
        })
      }
    }
  } else { // 其他组件
    if (Controls.ControlList[index].ControlType !== 'searchbutton') {
      Controls.ControlList[index].EchartList = []
      if (value) {
        let checkboxList = $("#showAsdatetimepickerHtml").find("input[type='checkbox']")
        if (checkboxList.length > 0) {
          Controls.Data.LineChartItemList.forEach((item, cIndex) => { // 折线图
            item.defaultDataConfig.dataChart.forEach((d, i) => {
              if (item.defaultDataConfig.tablename === d.nameCn) {
                let field = JSON.parse(d.field)
                Controls.ControlList[index].EchartList.push({
                  ...item,
                  selectValue: item.name,
                  fieldChartData: field,
                  fieldId: d.id,
                  field: item.filed
                })
              }
            })
          })
          Controls.Data.BarChartItemList.forEach((item, cIndex) => { //柱状图
            item.defaultDataConfig.dataChart.forEach((d, i) => {
              if (item.defaultDataConfig.tablename === d.nameCn) {
                let field = JSON.parse(d.field)
                Controls.ControlList[index].EchartList.push({
                  ...item,
                  selectValue: item.name,
                  fieldChartData: field,
                  fieldId: d.id,
                  field: item.filed
                })
              }
            })

          })

          Controls.Data.PieChartItemList.forEach((item, cIndex) => { //饼图
            item.defaultDataConfig.dataChart.forEach((d, i) => {
              if (item.defaultDataConfig.tablename === d.nameCn) {
                let field = JSON.parse(d.field)
                Controls.ControlList[index].EchartList.push({
                  ...item,
                  selectValue: item.name,
                  fieldChartData: field,
                  fieldId: d.id,
                  field: item.filed
                })
              }
            })

          })

          Controls.Data.DashBoardChartItemList.forEach((item, cIndex) => { //仪表盘
            item.defaultDataConfig.dataChart.forEach((d, i) => {
              if (item.defaultDataConfig.tablename === d.nameCn) {
                let field = JSON.parse(d.field)
                Controls.ControlList[index].EchartList.push({
                  ...item,
                  selectValue: item.name,
                  fieldChartData: field,
                  fieldId: d.id,
                  field: item.filed
                })
              }
            })

          })

        }
      }
    } else {  // 查询按钮组件
      Controls.ControlList[index].EchartList = []
      Controls.ControlList[index].HistoryList = []
      if (value) {
        let checkboxList = $("#showAsdatetimepickerHtml").find("input[type='checkbox']")
        if (checkboxList.length > 0) {
          Controls.Data.LineChartItemList.forEach((item, cIndex) => { // 折线图
              if (item.defaultDataConfig.datatype === '业务数据') {
              item.defaultDataConfig.dataChart.forEach((d, i) => {
                if (item.defaultDataConfig.tablename === d.nameCn) {
                  let field = JSON.parse(d.field)
                  Controls.ControlList[index].EchartList.push({
                    ...item,
                    selectValue: item.name,
                    fieldChartData: field,
                    fieldId: d.id,
                    field: item.filed
                  })
                }
              })
            } else if (item.defaultDataConfig.datatype === '历史数据') {
              Controls.ControlList[index].HistoryList.push({...item, selectValue: item.name})
            }
          })
          Controls.Data.BarChartItemList.forEach((item, cIndex) => { //柱状图
            if (item.defaultDataConfig.datatype === '业务数据') {
              item.defaultDataConfig.dataChart.forEach((d, i) => {
                if (item.defaultDataConfig.tablename === d.nameCn) {
                  let field = JSON.parse(d.field)
                  Controls.ControlList[index].EchartList.push({
                    ...item,
                    selectValue: item.name,
                    fieldChartData: field,
                    fieldId: d.id,
                    field: item.filed
                  })
                }
              })
            } else if (item.defaultDataConfig.datatype === '历史数据') {
              Controls.ControlList[index].HistoryList.push({...item, selectValue: item.name})
            }

          })

          Controls.Data.PieChartItemList.forEach((item, cIndex) => { //饼图
            if (item.defaultDataConfig.datatype === '业务数据') {
              item.defaultDataConfig.dataChart.forEach((d, i) => {
                if (item.defaultDataConfig.tablename === d.nameCn) {
                  let field = JSON.parse(d.field)
                  Controls.ControlList[index].EchartList.push({
                    ...item,
                    selectValue: item.name,
                    fieldChartData: field,
                    fieldId: d.id,
                    field: item.filed
                  })
                }
              })
            } else if (item.defaultDataConfig.datatype === '历史数据') {
              Controls.ControlList[index].HistoryList.push({...item, selectValue: item.name})
            }
          })

          Controls.Data.DashBoardChartItemList.forEach((item, cIndex) => { //仪表盘
            if (item.defaultDataConfig.datatype === '业务数据') {
              item.defaultDataConfig.dataChart.forEach((d, i) => {
                if (item.defaultDataConfig.tablename === d.nameCn) {
                  let field = JSON.parse(d.field)
                  Controls.ControlList[index].EchartList.push({
                    ...item,
                    selectValue: item.name,
                    fieldChartData: field,
                    fieldId: d.id,
                    field: item.filed
                  })
                }
              })
            } else if (item.defaultDataConfig.datatype === '历史数据') {
              Controls.ControlList[index].HistoryList.push({...item, selectValue: item.name})
            }
          })

        }
      }
    }
  }
  renderChartList(index)
  // $("#textsearchDataCheckbox").find("input[type='checkbox']").prop("checked", value)
  $("#showAsdatetimepickerHtml").find("input[type='checkbox']").prop("checked", value)
  initCollpase()
  initCheckAll()
}

function deWeightTwo(arr) {
  let temp = []
  if (arr && arr.length !== 0) {
    arr.forEach(function (a) {
      var check = temp.every(function (b) {
        return a.name !== b.name;
      })
      check ? temp.push(a) : ''
    })
    return temp
  } else {
    return arr
  }
}

//文本查询图表选择
function textsearchGetEchart(index, checked, value, id, type, event) {
  if (checked) {
    if (type === 'linechart') {
      if (Controls.ControlList[index].AsDatetimepickerType === '历史数据') {
        Controls.Data.LineChartItemList.forEach((item, cIndex) => {
          if (item.name === value) {
            Controls.ControlList[index].HistoryList.push({
              ...item,
              selectValue: value,
            })
          }
        })
      } else {
          Controls.Data.LineChartItemList.forEach((item, cIndex) => {
            if (item.defaultDataConfig.datatype === '业务数据') {
              if (item.defaultDataConfig.dataChart.length === 0) {
                event.target.checked = false
                appTips.warningMsg('此图表无业务数据,请先填充业务数据');
              } else {
                item.defaultDataConfig.dataChart.forEach((d, i) => {
                  if (item.defaultDataConfig.tablename === d.nameCn) {
                    let field = JSON.parse(d.field)
                    if (item.name === value) {
                      Controls.ControlList[index].EchartList.push({
                        ...item,
                        selectValue: value,
                        fieldChartData: field,
                        fieldId: d.id
                      })
                    }
                  }
                })
              }
            } else if (item.defaultDataConfig.datatype === '历史数据')  {
              if (item.name === value) {
                Controls.ControlList[index].HistoryList.push({...item, selectValue: value})
              }
            }
          })
      }
    } else if (type === 'barchart') {
      if (Controls.ControlList[index].AsDatetimepickerType === '历史数据') {
        Controls.Data.BarChartItemList.forEach((item, cIndex) => {
          if (item.name === value) {
            Controls.ControlList[index].HistoryList.push({
              ...item,
              selectValue: value,
            })
          }
        })
      } else {
        Controls.Data.BarChartItemList.forEach((item, cIndex) => {
          if (item.defaultDataConfig.datatype === '业务数据') {
            if (item.defaultDataConfig.dataChart.length === 0) {
              event.target.checked = false
              appTips.warningMsg('此图表无业务数据,请先填充业务数据');
            } else {
              item.defaultDataConfig.dataChart.forEach((d, i) => {
                if (item.defaultDataConfig.tablename === d.nameCn) {
                  let field = JSON.parse(d.field)
                  if (item.name === value) {
                    Controls.ControlList[index].EchartList.push({
                      ...item,
                      selectValue: value,
                      fieldChartData: field,
                      fieldId: d.id
                    })
                  }
                }
              })
            }
          } else if (item.defaultDataConfig.datatype === '历史数据')  {
            if (item.name === value) {
              Controls.ControlList[index].HistoryList.push({...item, selectValue: value})
            }
          }
        })
      }
    } else if (type === 'dashboardchart') {
      // Controls.Data.DashBoardChartItemList.forEach((item, cIndex) => {
      //   Controls.ControlList[index].EchartList.push({
      //     ...item,
      //     selectValue: value
      //   })
      // })
      if (Controls.ControlList[index].AsDatetimepickerType === '历史数据') {
        Controls.Data.DashBoardChartItemList.forEach((item, cIndex) => {
          if (item.name === value) {
            Controls.ControlList[index].HistoryList.push({
              ...item,
              selectValue: value,
            })
          }
        })
      } else {
        Controls.Data.DashBoardChartItemList.forEach((item, cIndex) => {
          if (item.defaultDataConfig.datatype === '业务数据') { 
            if (item.defaultDataConfig.dataChart.length === 0) {
              event.target.checked = false
              appTips.warningMsg('此图表无业务数据,请先填充业务数据');
            } else {
              item.defaultDataConfig.dataChart.forEach((d, i) => {
                if (item.defaultDataConfig.tablename === d.nameCn) {
                  let field = JSON.parse(d.field)
                  if (item.name === value) {
                    Controls.ControlList[index].EchartList.push({
                      ...item,
                      selectValue: value,
                      fieldChartData: field,
                      fieldId: d.id
                    })
                  }
                }
              })
            }
          } else if (item.defaultDataConfig.datatype === '历史数据')  {
            if (item.name === value) {
              Controls.ControlList[index].HistoryList.push({...item, selectValue: value})
            }
          }
        })
      }
    } else if (type === 'piechart') {
      // Controls.Data.PieChartItemList.forEach((item, cIndex) => {
      //   Controls.ControlList[index].EchartList.push({
      //     ...item,
      //     selectValue: value,
      //   })
      // })
      if (Controls.ControlList[index].AsDatetimepickerType === '历史数据') {
        Controls.Data.PieChartItemList.forEach((item, cIndex) => {
          if (item.name === value) {
            Controls.ControlList[index].HistoryList.push({
              ...item,
              selectValue: value,
            })
          }
        })
      } else {
        Controls.Data.PieChartItemList.forEach((item, cIndex) => {
          if (item.defaultDataConfig.datatype === '业务数据') { 
            if (item.defaultDataConfig.dataChart.length === 0) {
              event.target.checked = false
              appTips.warningMsg('此图表无业务数据,请先填充业务数据');
            } else {
              item.defaultDataConfig.dataChart.forEach((d, i) => {
                if (item.defaultDataConfig.tablename === d.nameCn) {
                  let field = JSON.parse(d.field)
                  if (item.name === value) {
                    Controls.ControlList[index].EchartList.push({
                      ...item,
                      selectValue: value,
                      fieldChartData: field,
                      fieldId: d.id
                    })
                  }
                }
              })
            }
          } else if (item.defaultDataConfig.datatype === '历史数据')  {
            if (item.name === value) {
              Controls.ControlList[index].HistoryList.push({...item, selectValue: value})
            }
          }
        })
      }
    }
    if (Controls.ControlList[index].ControlType !== 'searchbutton') {
      renderChartList(index)
      let listId = null
      let listName = ''
      Controls.ControlList[index].EchartList.forEach((ef, efi) => {
        if (ef.name === value) {
          listId = efi
          listName = ef.selectValue
        }
      })
      textsearchGetSelect(index, listName, listId)
    }
  } else {
    if (Controls.ControlList[index].AsDatetimepickerType === '业务数据') {
      /* 图表组件 --- 业务数据 */
      Controls.ControlList[index].EchartList.forEach((item, i) => {
        if (item.name === value) {
          let length = Controls.ControlList[index].EchartList[i].fieldChartData.filter(f => f.dataType === 'text').length
          let name = Controls.ControlList[index].EchartList[i].fieldChartData.filter(f => f.dataType === 'text')[0].fieldName
          if (Controls.ControlList[index].dropList) {
            Controls.ControlList[index].dropList.forEach((c, ci) => {
              if (c.name === name) {
                Controls.ControlList[index].dropList.splice(ci, length)
              }
            })
          }
          Controls.ControlList[index].EchartList.splice(i, 1)
          renderChartList(index)
        }
      })
    } else if (Controls.ControlList[index].AsDatetimepickerType === '历史数据') {
      /* 图表组件 --- 历史数据 */
      Controls.ControlList[index].HistoryList.forEach((item, i) => {
        if (item.name === value) {
          Controls.ControlList[index].HistoryList.splice(i, 1)
        }
      })
    } else { // 其他组件
      if (Controls.ControlList[index].ControlType !== 'searchbutton') {
        Controls.ControlList[index].EchartList.forEach((item, i) => {
          if (item.name === value) {
            Controls.ControlList[index].EchartList.splice(i, 1)
          }
        })
        renderChartList(index)
      } else {
        Controls.ControlList[index].EchartList.forEach((item, i) => {
          if (item.name === value) {
            Controls.ControlList[index].EchartList.splice(i, 1)
          }
        })

        Controls.ControlList[index].HistoryList.forEach((item, i) => {
          if (item.name === value) {
            Controls.ControlList[index].HistoryList.splice(i, 1)
          }
        })
      }
    }
  }
  // setTimeout(() => {
  initCheckAll(index)
  initCollpase()

  // })
}

// async function getajaxChartData () {
//   await request.get(`/bi/${appId}/business/${item.fieldId}`).then(res => {
//     let datas = JSON.parse(res.data.data.field)
//     datas.filter(f => f.dataType === 'text').forEach((d,di) => {
//       lis +=  `<option>${d.fieldName}</option>`
//     })
//   })
//   return lis
// }

function renderChartList(index) {
  let lis = ``
  DropSearchFilterList = []
  if (!Controls.ControlList[index].EchartList) {
    return
  }
  Controls.ControlList[index].EchartList.forEach((item, i) => {
    if (item.name.indexOf('linechart') !== -1) {
      lis += `<div class="r-pos" id="info-Chart${i + 1}">
          <div>折线数据表${item.name.replace(/[^0-9]/ig,"")}</div>
          <select onchange="textsearchGetSelect(${index},this.value, ${i})" placeholder="请选择">
            <option value="" style="display: none">请选择</option>`
      if (Controls.ControlList[index].ControlType === "associatedatetimepicker") { // 日期时间组件 过滤f.dataType === 'time'的数据
        let data = item.fieldChartData.filter(f => f.dataType === 'time')
        if (!data[0]) {
          return
        }
        if (item.selectValue.indexOf('linechart') !== -1) {
          item.selectValue = data[0].fieldName // selectValue 赋值， 若有值则无需赋值， 无值默认显示为data[0].fieldName 值
          item.field = data[0].field // field 赋值， 若有值则无需赋值，无值默认显示为data[0].field 值
          Controls.Data.LineChartItemList.forEach((c, ci) => {
            if (c.name === item.name) {
              Controls.Data.LineChartItemList[ci].filed = data[0].field
            }
          })
        }
        data.forEach(d => {
          lis += `<option ${item.selectValue && item.selectValue === d.fieldName ? 'selected' : ''} >${d.fieldName}</option>`
        })
        // item.fieldChartData.filter(f => f.dataType === 'time').forEach(d => {
        //   lis += `<option ${item.selectValue && item.selectValue === d.fieldName ? 'selected' : ''} >${d.fieldName}</option>`
        // })
      } else { // 下拉组件 过滤f.dataType === 'text'的数据
        let data = []
        if (Controls.ControlList[index].ControlType === 'datasearch') {
          data = item.fieldChartData.filter(f => f.dataType === 'number')
        } else {
          data = item.fieldChartData.filter(f => f.dataType === 'text')
        }
        if (!data[0]) {
          return
        }
        if (item.selectValue.indexOf('linechart') !== -1) {
          item.selectValue = data[0].fieldName // selectValue 赋值， 若有值则无需赋值， 无值默认显示为data[0].fieldName 值
          item.field = data[0].field // field 赋值， 若有值则无需赋值，无值默认显示为data[0].field 值
          Controls.Data.LineChartItemList.forEach((c, ci) => {
            if (c.name === item.name) {
              Controls.Data.LineChartItemList[ci].filed = data[0].field
            }
          })
          // Controls.Data.LineChartItemList.forEach((c, ci) => {
          //   if (c.name === item.name) {
          //     Controls.Data.LineChartItemList[ci].filed = data[0].field
          //   }
          // })
        }
        data.forEach(d => {
          lis += `<option ${item.selectValue && item.selectValue === d.fieldName ? 'selected' : ''} >${d.fieldName}</option>`
        })
        // item.fieldChartData.filter(f => f.dataType === 'text').forEach(d => {
        //   lis += `<option ${item.selectValue && item.selectValue === d.fieldName ? 'selected' : ''} >${d.fieldName}</option>`
        // })
      }
      lis += `</select>
      </div>`
    } else if (item.name.indexOf('barchart') !== -1) {
      lis += `<div class="r-pos" id="info-Chart${i + 1}">
          <div>柱形数据表${item.name.replace(/[^0-9]/ig,"")}</div>
          <select onchange="textsearchGetSelect(${index},this.value,${i})"  placeholder="请选择">
            <option value="" style="display: none" >请选择</option>`
      // item.fieldChartData.filter(f => f.dataType === 'time').forEach(d => {
      //   lis += `<option ${item.selectValue && item.selectValue === d.fieldName ? 'selected' : ''} >${d.fieldName}</option>`
      // })
      if (Controls.ControlList[index].ControlType === "associatedatetimepicker") { // 日期时间组件 过滤f.dataType === 'time'的数据
        let data = item.fieldChartData.filter(f => f.dataType === 'time')
        if (!data[0]) {
          return
        }
        if (item.selectValue.indexOf('barchart') !== -1) {
          item.selectValue = data[0].fieldName // selectValue 赋值， 若有值则无需赋值， 无值默认显示为data[0].fieldName 值
          item.field = data[0].field // field 赋值， 若有值则无需赋值，无值默认显示为data[0].field 值
          Controls.Data.BarChartItemList.forEach((c, ci) => {
            if (c.name === item.name) {
              Controls.Data.BarChartItemList[ci].filed = data[0].field
            }
          })
        }
        data.forEach(d => {
          lis += `<option ${item.selectValue && item.selectValue === d.fieldName ? 'selected' : ''} >${d.fieldName}</option>`
        })
      } else { // 下拉组件 过滤f.dataType === 'text'的数据
        let data = []
        if (Controls.ControlList[index].ControlType === 'datasearch') {
          data = item.fieldChartData.filter(f => f.dataType === 'number')
        } else {
          data = item.fieldChartData.filter(f => f.dataType === 'text')
        }
        if (!data[0]) {
          return
        }
        if (item.selectValue.indexOf('barchart') !== -1) {
          item.selectValue = data[0].fieldName // selectValue 赋值， 若有值则无需赋值， 无值默认显示为data[0].fieldName 值
          item.field = data[0].field // field 赋值， 若有值则无需赋值，无值默认显示为data[0].field 值
          Controls.Data.BarChartItemList.forEach((c, ci) => {
            if (c.name === item.name) {
              Controls.Data.BarChartItemList[ci].filed = data[0].field
            }
          })
        }
        data.forEach(d => {
          lis += `<option ${item.selectValue && item.selectValue === d.fieldName ? 'selected' : ''} >${d.fieldName}</option>`
        })

      }
      lis += `</select>
      </div>`
    } else if (item.name.indexOf('dashboardchart') !== -1) {
      lis += `<div class="r-pos" id="info-Chart${i + 1}">
          <div>仪表盘数据表${item.name.replace(/[^0-9]/ig,"")}</div>
          <select onchange="textsearchGetSelect(${index},this.value,${i})"  placeholder="请选择">
            <option value="" style="display: none" >请选择</option>`
      // item.fieldChartData.filter(f => f.dataType === 'time').forEach(d => {
      //   lis += `<option ${item.selectValue && item.selectValue === d.fieldName ? 'selected' : ''} >${d.fieldName}</option>`
      // })
      if (Controls.ControlList[index].ControlType === "associatedatetimepicker") { // 日期时间组件 过滤f.dataType === 'time'的数据
        let data = item.fieldChartData.filter(f => f.dataType === 'time')
        if (!data[0]) {
          return
        }
        if (item.selectValue.indexOf('dashboardchart') !== -1) {
          item.selectValue = data[0].fieldName // selectValue 赋值， 若有值则无需赋值， 无值默认显示为data[0].fieldName 值
          item.field = data[0].field // field 赋值， 若有值则无需赋值，无值默认显示为data[0].field 值
          Controls.Data.DashBoardChartItemList.forEach((c, ci) => {
            if (c.name === item.name) {
              Controls.Data.DashBoardChartItemList[ci].filed = data[0].field
            }
          })
        }
        data.forEach(d => {
          lis += `<option ${item.selectValue && item.selectValue === d.fieldName ? 'selected' : ''} >${d.fieldName}</option>`
        })
      } else { // 下拉组件 过滤f.dataType === 'text'的数据
        let data = []
        if (Controls.ControlList[index].ControlType === 'datasearch') {
          data = item.fieldChartData.filter(f => f.dataType === 'number')
        } else {
          data = item.fieldChartData.filter(f => f.dataType === 'text')
        }
        if (!data[0]) {
          return
        }
        if (item.selectValue.indexOf('dashboardchart') !== -1) {
          item.selectValue = data[0].fieldName // selectValue 赋值， 若有值则无需赋值， 无值默认显示为data[0].fieldName 值
          item.field = data[0].field // field 赋值， 若有值则无需赋值，无值默认显示为data[0].field 值
          Controls.Data.DashBoardChartItemList.forEach((c, ci) => {
            if (c.name === item.name) {
              Controls.Data.DashBoardChartItemList[ci].filed = data[0].field
            }
          })
        }
        data.forEach(d => {
          lis += `<option ${item.selectValue && item.selectValue === d.fieldName ? 'selected' : ''} >${d.fieldName}</option>`
        })

      }

      lis += `</select>
      </div>`
    } else if (item.name.indexOf('piechart') !== -1) {
      lis += `<div class="r-pos" id="info-Chart${i + 1}">
          <div>饼图数据表${item.name.replace(/[^0-9]/ig,"")}</div>
          <select onchange="textsearchGetSelect(${index},this.value,${i})"  placeholder="请选择">
            <option value="" style="display: none" >请选择</option>`
      // item.fieldChartData.filter(f => f.dataType === 'time').forEach(d => {
      //   lis += `<option ${item.selectValue && item.selectValue === d.fieldName ? 'selected' : ''} >${d.fieldName}</option>`
      // })
      if (Controls.ControlList[index].ControlType === "associatedatetimepicker") { // 日期时间组件 过滤f.dataType === 'time'的数据
        let data = item.fieldChartData.filter(f => f.dataType === 'time')
        if (!data[0]) {
          return
        }
        if (item.selectValue.indexOf('piechart') !== -1) {
          item.selectValue = data[0].fieldName // selectValue 赋值， 若有值则无需赋值， 无值默认显示为data[0].fieldName 值
          item.field = data[0].field // field 赋值， 若有值则无需赋值，无值默认显示为data[0].field 值
          Controls.Data.PieChartItemList.forEach((c, ci) => {
            if (c.name === item.name) {
              Controls.Data.PieChartItemList[ci].filed = data[0].field
            }
          })
        }
        data.forEach(d => {
          lis += `<option ${item.selectValue && item.selectValue === d.fieldName ? 'selected' : ''} >${d.fieldName}</option>`
        })
      } else { // 下拉组件 过滤f.dataType === 'text'的数据
        let data = []
        if (Controls.ControlList[index].ControlType === 'datasearch') {
          data = item.fieldChartData.filter(f => f.dataType === 'number')
        } else {
          data = item.fieldChartData.filter(f => f.dataType === 'text')
        }
        if (!data[0]) {
          return
        }
        if (item.selectValue.indexOf('piechart') !== -1) {
          item.selectValue = data[0].fieldName // selectValue 赋值， 若有值则无需赋值， 无值默认显示为data[0].fieldName 值
          item.field = data[0].field // field 赋值， 若有值则无需赋值，无值默认显示为data[0].field 值
          Controls.Data.PieChartItemList.forEach((c, ci) => {
            if (c.name === item.name) {
              Controls.Data.PieChartItemList[ci].filed = data[0].field
            }
          })
        }
        data.forEach(d => {
          lis += `<option ${item.selectValue && item.selectValue === d.fieldName ? 'selected' : ''} >${d.fieldName}</option>`
        })
      }
      lis += `</select>
      </div>`
    }
  })
  $(`#text-filer${index}`).html(lis)
  Controls.ControlList[index].dropList = deWeightTwo(Controls.ControlList[index].dropList)
  childElement(index, 'init')
}

//文本查询字段选择输入
function textsearchGetSelect(index, value, id) {
  /* 
    index: 下标
    value: 选中的下拉值名称
    id: 对应数据表列表下标
  */
  if (id == 'FilterConditions') {
    Controls.ControlList[index].FilterConditions = value
    if (value == '不限' || value == '为空' || value == '不为空') {
      $("#FilterConditionNumInput").hide()
    } else {
      $("#FilterConditionNumInput").show()
    }
  } else if (id == 'FilterConditionNum') {
    Controls.ControlList[index].FilterConditionNum = value
  } else {
    if (Controls.ControlList[index].AsDatetimepickerType && Controls.ControlList[index].AsDatetimepickerType === '历史数据') {
      // Controls.ControlList[index].HistoryList[id].selectValue = value
      // 此处为 判断日期时间组件与历史数据的图表关联 HistoryList 无需field字段， 直接return 出去即可
      return
    }
    Controls.ControlList[index].EchartList[id].selectValue = value
    let datas = []
    let tablename = ''
    let field = ''
    Controls.ControlList[index].EchartList[id].defaultDataConfig.dataChart.forEach(item => {
      if (item.nameCn === Controls.ControlList[index].EchartList[id].defaultDataConfig.tablename) {
        tablename = item.nameEn
        datas = JSON.parse(item.field)
        if (Controls.ControlList[index].EchartList[id].name.indexOf('linechart') !== -1) {
          Controls.Data.LineChartItemList.forEach((c, ci) => {
            if (c.name === Controls.ControlList[index].EchartList[id].name) {
              Controls.Data.LineChartItemList[ci].tablename = item.nameEn
            }
          })
          // Controls.Data.LineChartItemList[id].tablename = item.nameEn
        } else if (Controls.ControlList[index].EchartList[id].name.indexOf('barchart') !== -1) {
          Controls.Data.BarChartItemList.forEach((c, ci) => {
            if (c.name === Controls.ControlList[index].EchartList[id].name) {
              Controls.Data.BarChartItemList[ci].tablename = item.nameEn
            }
          })
          // Controls.Data.BarChartItemList[id].tablename = item.nameEn
        } else if (Controls.ControlList[index].EchartList[id].name.indexOf('dashboardchart') !== -1) {
          Controls.Data.DashBoardChartItemList.forEach((c, ci) => {
            if (c.name === Controls.ControlList[index].EchartList[id].name) {
              Controls.Data.DashBoardChartItemList[ci].tablename = item.nameEn
            }
          })
        } else if (Controls.ControlList[index].EchartList[id].name.indexOf('piechart') !== -1) {
          Controls.Data.PieChartItemList.forEach((c, ci) => {
            if (c.name === Controls.ControlList[index].EchartList[id].name) {
              Controls.Data.PieChartItemList[ci].tablename = item.nameEn
            }
          })
        }
      }
    })
    datas.forEach(item => {
      if (item.fieldName === Controls.ControlList[index].EchartList[id].selectValue) {
        field = item.field
        let types = ['dropsearch', 'textsearch', 'datasearch']
        if (Controls.ControlList[index].ControlType === 'associatedatetimepicker') {
          if (Controls.ControlList[index].AsDatetimepickerType === '业务数据') {
            Controls.ControlList[index].EchartList[id].field = item.field
          } else if (Controls.ControlList[index].AsDatetimepickerType === '历史数据') {
            Controls.ControlList[index].HistoryList[id].field = item.field
          }
        } else if (types.includes(Controls.ControlList[index].ControlType)) {
          Controls.ControlList[index].EchartList[id].field = item.field
        }
        if (Controls.ControlList[index].EchartList[id].name.indexOf('linechart') !== -1) {
          // Controls.Data.LineChartItemList[id].field = item.field
          Controls.Data.LineChartItemList.forEach((c, ci) => {
            if (c.name === Controls.ControlList[index].EchartList[id].name) {
              Controls.Data.LineChartItemList[ci].field = item.field
            }
          })
        } else if (Controls.ControlList[index].EchartList[id].name.indexOf('barchart') !== -1) {
          Controls.Data.BarChartItemList.forEach((c, ci) => {
            if (c.name === Controls.ControlList[index].EchartList[id].name) {
              Controls.Data.BarChartItemList[ci].field = item.field
            }
          })
          // Controls.Data.BarChartItemList[id].field = item.field
        } else if (Controls.ControlList[index].EchartList[id].name.indexOf('dashboardchart') !== -1) {
          Controls.Data.DashBoardChartItemList.forEach((c, ci) => {
            if (c.name === Controls.ControlList[index].EchartList[id].name) {
              Controls.Data.DashBoardChartItemList[ci].field = item.field
            }
          })
        } else if (Controls.ControlList[index].EchartList[id].name.indexOf('piechart') !== -1) {
          Controls.Data.PieChartItemList.forEach((c, ci) => {
            if (c.name === Controls.ControlList[index].EchartList[id].name) {
              Controls.Data.PieChartItemList[ci].field = item.field
            }
          })
        }
      }
    })
    let types = ['dropsearch']
    if (types.includes(Controls.ControlList[index].ControlType)) {
      Controls.ControlList[index].ChoiceList = []
      request.get(`/bi/${appId}/business/filed-value/${tablename}/${field}`).then(res => {
        if (res.data.code !== 0) {
          appTips.errorMsg(res.data.msg)
          return
        }
        let arr = []
        if (res.data.data && res.data.data.records) {
          res.data.data.records.forEach(item => {
            arr.push({
              name: item,
              value: item
            })
          })
        }
        Controls.ControlList[index].dropList = arr
        childElement(index)
      })
    }
  }


}

//右侧组件数据图片样式渲染
function getImgHtml(index, data, lines) {
  let changeStr = ''
  changeStr += `<div class="bi-collapse-content">
  <div>
  <div class="pos-group" >
    <div class="r-pos-title" ><span>位置和尺寸</span> </div>
    <div class="r-pos r-pos-detail">
      <div><span>W </span><input id="Cwidth" class="r-pos-input" type="number" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>
      <div><span>H </span><input id="Cheight" class="r-pos-input" type="number" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>
    </div>
    <div class="r-pos r-pos-detail">
      <div><span>X </span><input id="Cleft" class="r-pos-input" type="number" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}" ></div>
      <div><span>Y </span><input id="Ctop" class="r-pos-input" type="number" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}"></div>
    </div>
    <div class="r-pos r-pos-detail">
      <div><span class="iconfont iconjiaodu rotateIcon" ></span><input class="r-pos-input" type="number" onblur="handleblur(event, ${index}, 'Rotate')" value="${data.Rotate}" ></div>
    </div>
    </div>
  <div class="r-pos-title" ><span>组件名称</span> </div>
  <div class="r-title-input" >
    <input type="text" maxlength="15" onblur="handleblur(event, ${index}, 'ComName')" value="${data.ComName}" />
  </div>`
  if (data.ControlType === 'staticimage') {
    changeStr += `<div  class="pos-upload">
    <span>图片</span>
    <div class="imgupload" onclick="getImgFun(${index})" id="uploadimg${index}" >
    <img class="pos-upload-img" src="${data.Img == './imgs/静态图片.png'?'./imgs/defuleUpload.png':data.Img}" ></img>
    </div>
    <span>jpg,png,gif,bmp ≤ 2MB</span>
</div>`
  }

  changeStr += `</div></div>`
  changeStr += getBorderHtml(index, data, lines)

  return changeStr

}
//图片上传
function getImgFun(index) {
  // layui.use('upload', function () {
  //   var upload = layui.upload;
  //   //执行实例
  //   var uploadInst = upload.render({
  //     elem: `#uploadimg${index}`,
  //     url: 'https://httpbin.org/post',
  //     accept: 'images',
  //     acceptMime: 'image/*',
  //     size: 1024 * 2,
  //     done: function (res) {
  //       localdata.ControlList[0].PropertyList.Img = res.files.file
  //       Controls.ControlList[index].PropertyList.Img = res.files.file
  //       // uploadImg.previousElementSibling.src = res.files.file
  //       uploadImg.firstElementChild.src = res.files.file
  //       childElement(index)
  //       //上传完毕回调
  //     },
  //     error: function () {
  //       console.log('error')
  //       //请求异常回调
  //     }
  //   })
  // })
}


//右侧组件数据样式基本信息位置与尺寸样式渲染
function getCenterHtml1(index, data, changeList, lines) {
  //角度0 //角度组件名1   字体2  填充3  圆角4 阴影5 对齐方式6 边框7 圆形边框8 匹配模式9
  // 提示内容10  开启查询11 不透明度12 对齐方式-水平-垂直19
  let changeStr = ''
  if (!data.ComName) data.ComName = '';
  changeList = changeList ? changeList : []
  changeStr += `<div class="bi-collapse-content">
      <div>`
  changeStr += `<div class="pos-group" >`
  //坐标
  if (lines != 1) {

    changeStr += `<div class="r-pos-title" ><span>位置和尺寸</span> </div>
        <div class="r-pos r-pos-detail">
        <div><span>W</span><input class="r-pos-input" autocomplete="off" id="Cwidth" type="number" onblur="handleblur(event, ${index}, 'Width')" value="${data.Width}" ></div>`



    // if (data.ControlType !== 'line') {
    changeStr += `<div><span>H</span><input autocomplete="off" class="r-pos-input" id="Cheight" type="number" onblur="handleblur(event, ${index}, 'Height')" value="${data.Height}"></div>`
    // }
    changeStr += `</div>
    <div class="r-pos r-pos-detail">
      <div><span>X</span><input autocomplete="off" class="r-pos-input" id="Cleft" type="number" onblur="handleblur(event, ${index}, 'Left')" value="${data.Left}" ></div>
      <div><span>Y</span><input autocomplete="off" class="r-pos-input" id="Ctop" type="number" onblur="handleblur(event, ${index}, 'Top')" value="${data.Top}"></div>
    </div>`
    if (changeList.includes(0)) {
      //角度
      changeStr += `<div class="r-pos r-pos-detail">
    <div><span class="iconfont iconjiaodu rotateIcon" ></span><input autocomplete="off" class="r-pos-input" type="number" onblur="handleblur(event, ${index}, 'Rotate')" value="${data.Rotate}" ></div>
  </div>
`
    }
  }
  if (changeList.includes(13)) {
    //角度
    changeStr += `<div class="r-pos r-pos-detail">
    <div><span class="iconfont iconjiaodu rotateIcon" ></span><input autocomplete="off" class="r-pos-input" type="number" onblur="handleblur(event, ${index}, 'Rotate')" value="${data.Rotate}" ></div>
  </div>
</div>`
    //组件名称
    changeStr += `<div class="r-pos-title" ><span>组件名称</span> </div>
<div class="r-title-input" >
  <input autocomplete="off" maxlength="15" type="text" onblur="handleblur(event, ${index}, 'ComName')" value="${data.ComName}" />
</div>
<div class="r-pos-title" ><span>样式</span>`
  }
  if (changeList.includes(15)) {
    changeStr += `<div class="r-pos r-pos-detail">
    <div><span class="iconfont iconjiaodu rotateIcon" ></span><input autocomplete="off" class="r-pos-input" type="number" onblur="handleblur(event, ${index}, 'Rotate')" value="${data.Rotate}" ></div>
  </div>
</div>`
    //组件名称
    changeStr += `<div class="r-pos-title" ><span>组件名称</span> </div>
<div class="r-title-input" >
  <input maxlength="15" autocomplete="off" type="text" onblur="handleblur(event, ${index}, 'ComName')" value="${data.ComName}" />
</div>
<div class="r-pos-title" >`

  }
  if (changeList.includes(1)) {
    //角度
    changeStr += `<div class="r-pos r-pos-detail">
      <div><span class="iconfont iconjiaodu rotateIcon" ></span><input autocomplete="off" class="r-pos-input" type="number" onblur="handleblur(event, ${index}, 'Rotate')" value="${data.Rotate}" ></div>
    </div>
  </div>`
    //组件名称
    changeStr += `<div class="r-pos-title" ><span>组件名称</span> </div>
  <div class="r-title-input" >
    <input maxlength="15" autocomplete="off" type="text" onblur="handleblur(event, ${index}, 'ComName')" value="${data.ComName}" />
  </div>
  <div class="r-pos-title" ><span>文本内容</span> </div>
  <div class="r-title-input" >`
    if (Controls.ControlList[index].ControlType == 'statictextblock' || Controls.ControlList[index].ControlType == 'dynamictext') {
      changeStr += ` <textarea autocomplete="off" onblur="changeText(event, ${index}, 'Text')" placeholder="请输入">${data.Text}</textarea>`
    } else {
      changeStr += `<input autocomplete="off" type="text" onblur="changeText(event, ${index}, 'Text')" value="${data.Text}" />`
    }
    changeStr += `</div>
  <div class="r-pos-title" ><span>样式</span> `

  }
  if (changeList.includes(9)) {
    //匹配模式
    changeStr += ` <div class="pos-group" >
   <div class="r-pos-font r-pos-font1">
     <span>匹配模式</span>
     <select id="group" class="pos-select" value="1">
       <option value="模糊匹配">模糊匹配</option>
       <option value="精确匹配">精确匹配</option>
     </select>
   </div>
 </div>`

  }
  if (changeList.includes(10)) {

    //提示内容
    changeStr += `<div class="pos-group" >
<div class="r-pos-font r-pos-font1">
  <span>提示内容</span>
  <input autocomplete="off" class="pos-select pos-input" onblur="changeText(event, ${index}, 'Placeholder')" value=${data.Placeholder} />
</div>
</div>`

  }
  if (changeList.includes(16)) {
    changeStr += `<div class="r-pos-title" ><span>样式</span>`
  }
  changeStr += `</div>`
  if (changeList.includes(2)) {
    if (Controls.ControlList[index].ControlType === 'datatextblock') {
      changeStr += `<div class="r-pos-title" ><span>样式</span>`
    }
    //字体
    changeStr += `<div class="pos-group" >
  <div class="r-pos-font">
    <span>字体</span>`
    changeStr += `<select id="group" class="pos-select" onchange="changeFamily(this[selectedIndex].value, ${index})" value="${data.FontFamily}">`
    fontFamilyList.forEach(item => {
      changeStr += `<option value="${item.id}">${item.name}</option>`
    })
    changeStr += `</select>`
    changeStr += `</div>
  <div class="r-font-prop">
  
  <div><span>字号&nbsp;&nbsp;<input class="r-pos-input r-font-input" style="margin-top: -2px;" type="text" onblur="handleblur(event, ${index}, 'FontSize')" value="${data.FontSize}"></span>
    </div><div><span>加粗&nbsp;&nbsp;</span><span class="f-font-blod" onClick="changeFont(event, ${index}, 'FontWeight')">B</span>
    </div><div><span>下划线</span><span class="f-font-underline" onClick="changeFont(event, ${index}, 'TextDecoration')">U</span>
    </div><div> <span>颜色</span><span class="r-font-color" id="fontColor${index}" ></span></div>
   
  </div>
</div>`

  }
  if (changeList.includes(17)) {
    let str = getEchartList(index)
    changeStr += `<div id="showAsdatetimepickerHtml" class="pos-group">`
    changeStr += `<div>请选择需要筛选的图表</div>`
    if (str) {
      changeStr += `<div id="textsearchDataCheckbox"  class="cornerbutton-checkbox r-pos">
      <input onclick="textsearchSelectAll(${index},this.checked)"  type="checkbox">全选</div>`

      changeStr += str
    } else {
      changeStr += `<span class="cornerbutton-checkbox r-pos r-pos-empty">画布暂无图表，请拉取图表并设置参数</span>`
    }
    changeStr += `</div>`

  }
  if (changeList.includes(3)) {
    //填充
    changeStr += `<div class="pos-group">
  <div class="r-pos-font">
  <span>填充</span>
  <span style="vertical-align: middle;margin-left: 5px;" class="pos-back-color" id="backColor${index}" onclick="createcolor('backColor${index}','backColor')"></span>
  </div>
  </div>`

  }
  if (changeList.includes(4)) {
    //圆角
    changeStr += `<div class="pos-others">
  <span>圆角</span>
  <input type="number" autocomplete="off" class="r-pos-input" onblur="handleblur(event, ${index}, 'BorderRadius')" value="${data.BorderRadius}" />
</div>`


  }
  if (changeList.includes(5)) {
    //阴影
    changeStr += `<div class="pos-others">
          <span class="pos-border">阴影</span>
          <div class="font-border" onclick="setShadow(event, ${index})">
            <span class="font-border-color" title="内阴影" ></span>
            <span class="font-border-color" title="外阴影"></span>
          </div>
        </div>`
  }
  if (changeList.includes(6)) {
    //对齐方式
    changeStr += `<div class="pos-group" >
    <div class="r-pos-font">
      <span>水平对齐</span>
    </div>
    <div class="r-pos-alignment">
    <div><input ${data.TextAlign ==='left'? 'checked' : '' } type="radio" id="left" name="TextAlign" value="left" onClick="changeTextAlign(event, ${index}, 'left')"><label for="left">左对齐</label></div>
    <div><input ${data.TextAlign ==='center'? 'checked' : '' } type="radio" id="center" name="TextAlign" value="center" onClick="changeTextAlign(event, ${index}, 'center')"><label for="center" >居中对齐</label></div>
    <div><input ${data.TextAlign ==='right'? 'checked' : '' }  type="radio" id="right" name="TextAlign" value="right" onClick="changeTextAlign(event, ${index}, 'right')"><label for="right">右对齐</label></div>
    </div>
  </div>`
  }
  if (changeList.includes(19)) {
    //对齐方式
    changeStr += `<div class="pos-group" >
    <div class="r-pos-font">
    <span>水平对齐</span>
    </div>
    <div class="r-pos-alignment">
    <div><input ${data.JustifyContent ==='flex-start'? 'checked' : '' } type="radio" id="JustifyContent-left" name="JustifyContent" value="flex-start" onClick="changeTextAlign(event, ${index}, 'flex-start', 'horizontal')"><label for="JustifyContent-left">左对齐</label></div>
    <div><input ${data.JustifyContent ==='center'? 'checked' : '' } type="radio"  id="JustifyContent-center" name="JustifyContent" value="center" onClick="changeTextAlign(event, ${index}, 'center', 'horizontal')"><label for="JustifyContent-center" >居中对齐</label></div>
    <div><input ${data.JustifyContent ==='flex-end'? 'checked' : '' }  type="radio" id="JustifyContent-right" name="JustifyContent" value="flex-end" onClick="changeTextAlign(event, ${index}, 'flex-end', 'horizontal')"><label for="JustifyContent-right">右对齐</label></div>
    </div>
    <div class="r-pos-font">
      <span>垂直对齐</span>
    </div>
    <div class="r-pos-alignment">
    <div><input ${data.AlignItems ==='flex-start'? 'checked' : '' } type="radio" id="AlignItems-left" name="AlignItems" value="flex-start" onClick="changeTextAlign(event, ${index}, 'flex-start','vertical')"><label for="AlignItems-left">顶端对齐</label></div>
    <div><input ${data.AlignItems ==='center'? 'checked' : '' } type="radio" id="AlignItems-center"  name="AlignItems" value="center" onClick="changeTextAlign(event, ${index}, 'center','vertical')"><label for="AlignItems-center" >垂直居中</label></div>
    <div><input ${data.AlignItems ==='flex-end'? 'checked' : '' }  type="radio" id="AlignItems-right"  name="AlignItems" value="flex-end" onClick="changeTextAlign(event, ${index}, 'flex-end', 'vertical')"><label for="AlignItems-right">底端对齐</label></div>
    </div>
  </div>`
  }
  // <i class="iconfont iconzuoduiqi" style=" ${data.TextAlign ==='left'? 'border: 1px solid #fff; background: #404040' : '' }" onClick="changeTextAlign(event, ${index}, 'left')" title="左对齐"></i>
  //       <i class="iconfont iconjuzhongduiqi" style=" ${data.TextAlign ==='center'? 'border: 1px solid #fff; background: #404040' : '' }" onClick="changeTextAlign(event, ${index}, 'center')" title="居中对齐"></i>
  //       <i class="iconfont iconyouduiqi" style=" ${data.TextAlign ==='right'? 'border: 1px solid #fff; background: #404040' : '' }" onClick="changeTextAlign(event, ${index}, 'right')" title="右对齐"></i>
  if (changeList.includes(7)) {
    //边框  
    changeStr += `<div class="pos-others">
          <span class="pos-border">边框</span>
          <div class="font-border">
            <input autocomplete="off" type="text" class="r-pos-input" onblur="handleblur(event, ${index}, 'BorderWidth')" value="${data.BorderWidth}" />
            <span class="font-border-color" id="borderColor${index}"></span>
          </div>
        </div>`
  }
  if (changeList.includes(8)) {
    //圆形边框
    changeStr += ` <div class="pos-others">
  <span class="pos-border">边框</span>
  <input autocomplete="off" type="number" class="r-pos-input" onblur="handleblur(event, ${index}, 'BorderWidth')" value="${data.BorderWidth}" />
  <span class="pos-border-color" id="borderColor${index}"></span>
  <div class="global-select r-select" >`
    // changeStr +=`<select class="search-input input-inner" onchange="choiceLineType(event, ${index}, 'Style')">`
    //   lineList.forEach(item => {
    //     changeStr += `<option ${data.Style == item.id?'selected':''} value = "${item.id}"><div style="width: 50px;height:50px;border: 1px solid #000;background: black;"></div></option>`
    //   })


    //   changeStr += `</select>`
    changeStr += `<div onclick="selectModel(${index})" class="model-select-box">
      <div  class="model-select-text"><div class="xianDiv model-select-textDiv" style="border: 1px ${data.Style} #000;"></div></div>
    <b class="bg1"></b>
    <ul class="model-select-option">`
    lineList.forEach(item => {
      changeStr += `<li data-option="${item.id}" class="${data.Style == item.id?'selected':''}"  value="${item.id}"><div class="xianDiv" style="border: 1px ${item.id} #000;"></div></li>`
    })
    changeStr += ` </ul></div>`
    changeStr += `</div>
</div>`
  }


  //背景
  if (changeList.includes(18)) {
    changeStr += `<div class="dashboard-area dashboard-start" >
                  <span class="area-name" >背景</span>
                  <div>
                    <div class="area-gruops" >
                      <input type="radio" onchange="choiceBack1(event, 'color',${index})" name="bg-radio" id="color" class="area-radio" ${data.BackSetting === 'color' ? 'checked' : ''} ></input>
                      <label for="color" class="label-title" >颜色</label>
                      <span class="back-color" style="display: ${data.BackSetting === 'color' ? 'block': 'none' }; background-color: ${data.BackSetting === 'color' ? data.BackColor: '' }" id="backColor${index}" onclick="createcolor('backColor${index}','backColor')"></span>
                    </div>
                    <div class="area-gruops" >
                      <input type="radio" onchange="choiceBack1(event, 'img',${index})" name="bg-radio" id="img" class="area-radio" ${data.BackSetting === 'img' ? 'checked' : ''} ></input>
                      <label for="img" class="label-title" >图片</label>
                      <img width="50px" height="50px"  src="${data.BackImg?data.BackImg:'./imgs/defuleUpload.png'}" style="display: ${data.BackSetting === 'img' ? 'block': 'none' };" id="dashboardImg1"/>
                      
                    </div>
                  </div>
                </div>`
  }

  if (changeList.includes(11)) {
    //开启即查询
    changeStr += `<div class="pos-group" >
<div class="pos-checkbox" >
    <input ${data.QueryFind?'checked':''} type="checkbox" onchange="changeQueryFindFun(${index},this.checked,'QueryFind')" style="width: 12px" id="label1" ><label for="label1">开启即时查询</label>
</div>
</div>`
  }
  if (changeList.includes(12)) {
    //不透明度
    changeStr += `<div class="pos-group">
  
  <div class="r-opacity">
    <span>不透明度(%)</span>
    <div class="scroll" id="scroll">
    <div class="bar" onmousedown="bardown(${index})" style="left: ${parseInt(data.Opacity * 1.7)}px" id="bar">
    </div>
    <div class="mask" style="width: ${parseInt(data.Opacity * 1.7)}px" id="mask">
    </div>
  </div>
    <input autocomplete="off" type="number" class="r-pos-input" onblur="handleblur(event, ${index}, 'Opacity')" value="${data.Opacity}" />
  </div>
</div>`

  }
  if (changeList.includes(14)) {
    //跳转类型
    changeStr += `
    <div class="r-pos-title" ><span>跳转类型</span> </div>
    <div class="r-title-input" >
    <select style="width: 92%;" name="jumpType" onchange="jumpTypeFunc(this.value, ${index})">
      <option ${data.jumpType == 'address'?'selected':''} value="address">链接地址</option>
      <option ${data.jumpType == 'panel'?'selected':''} value="panel">看板</option>
  </select>
    </div>
    `
    //链接地址
    changeStr += `
    <div id="showjump" style="display: ${data.jumpType == 'address'? 'block': 'none'}" >
    <div class="r-pos-title" ><span>链接地址</span> </div>
    <div class="r-title-input" >
    <input autocomplete="off" type="text" placeholder="请输入" onblur="handleblur(event, ${index}, 'linkAddress')" value="${data.linkAddress}" />
    </div>
    </div>
    `
    //看板
    changeStr += `
    <div id="showPanel" style="display: ${data.jumpType == 'panel'? 'block': 'none'}" >
    <div  class="r-pos-title" ><span>看板</span> </div>
    <div class="r-title-input" >
    <input autocomplete="off" type="text" id="panel-input" placeholder="请选择" onclick="openJump(event, ${index})" readonly="readonly" value="${data.panel}" />
    </div>
    </div>
    `
    //打开位置
    changeStr += `
    <div class="r-pos-title" ><span>打开位置</span> </div>
    <div class="r-title-input" >
    <select style="width: 92%;" name="openAddress" onchange="handleblur(event, ${index}, 'openAddress')">
      <option ${data.openAddress == '_self'?'selected':''} value="_self">当前窗口</option>
      <option ${data.openAddress == '_blank'?'selected':''} value="_blank">新窗口/新标签页</option>
  </select>
    </div>
    `
  }
  changeStr += `</div></div>`
  return changeStr
}

//是否开启即查询
function changeQueryFindFun(index, value, prop) {
  Controls.ControlList[index].PropertyList[prop] = value

}
//
function jumpTypeFunc(value, index) {
  if (value == 'address') {
    $("#showjump").show()
    $("#showPanel").hide()
  }
  if (value == 'panel') {
    $("#showjump").hide()
    $("#showPanel").show()
  }
  Controls.ControlList[index].PropertyList.jumpType = value

}
//查询按钮功能设置选择图表

function searchbuttonSelectAll(index, value) {
  if (value) {
    Controls.ControlList[index].PropertyList.graphList = ['0', '1', '2']
  } else {
    Controls.ControlList[index].PropertyList.graphList = []
  }

  $("#searchbuttonSelectAll").find("input[type='checkbox']").prop("checked", value)

}
//单选图表
function searchbuttonGetEchart(index, checked, value) {
  if (!checked) {
    $("#selectAll").prop("checked", checked)
    Controls.ControlList[index].PropertyList.graphList = Controls.ControlList[index].PropertyList.graphList.filter(x => {
      return x != value
    })

  } else {
    if (!Controls.ControlList[index].PropertyList.graphList.includes(value)) {
      Controls.ControlList[index].PropertyList.graphList.push(value)
    }

  }


}


//右侧组件数据样式边框样式渲染
function getBorderHtml(index, data, lines) {
  let changeStr = ''
  // 边框部分
  changeStr += `
      <div class="bi-collapse-title" onclick="toggleCollpase(event)">边框<i class="iconfont iconxialajiantou" ></i></div>
      <div class="bi-collapse-content" style="overflow: visible">
        <div>`
  if (data.ControlType !== 'line') {
    changeStr += `<div class="r-border-common" >
            <div class="r-border-common_item" >
              <span>颜色</span>
              <span class="pos-back-color pos-back-color1" id="borderColor${index}" onclick="createBorderColor('borderColor${index}','borderColor',${index})"></span>
            </div>
            <div class="r-border-common_item" >
              <span>圆角</span>
              <input autocomplete="off" type="number" class="r-border-common_input" onblur="handleblur(event, ${index}, 'BorderRadius')" value="${data.BorderRadius}" />
            </div>
          </div>`
  }
  changeStr += `<div class="r-border-common">
            <div class="r-border-common_item" >
              <span>线宽</span>
              <input autocomplete="off" type="text" class="r-border-common_input" onfocus="pixelFocus(event, ${index}, 'BorderWidth')" onblur="handleblur(event, ${index}, 'BorderWidth')" value="${data.BorderWidth}像素" />
            </div>
            <div class="r-border-common_item" style="position: relative;" id="r-border-input">
              <span>线型</span>`
  changeStr += `<div id="openLineInput"  onclick="openLine(event,${index})" class="el-input">`
  changeStr += `<div class="xianDiv model-select-textDiv" style="border: 1px ${data.Style} #000;">${data.Style == 'none'?'无边框':''}</div>`
  changeStr += `</div>`

  changeStr += ` </div>
          </div>`
  if (data.ControlType !== 'line') {
    changeStr += `<div class="r-border-common" >
            <div class="r-border-common_item" >
              <span>阴影</span>
              <div class="r-border-shadow" onclick="setShadow(event, ${index})">
                <div title="内阴影"><img title="内阴影" src="./imgs/icon_shadowIn.png" width="100%"/></div>
                <div title="外阴影" ><img title="外阴影" src="./imgs/icon_shadowOut.png" width="100%"/></div>
              </div>
            </div>
          </div>`
    // if (data.ControlType !== 'solidrectangle' && data.ControlType !== 'solidellipse') {
    //   changeStr += `<div  class="r-border-common">
    //         <div class="r-border-common_item" >
    //           <span>填充</span>
    //           <span class="pos-back-color" id="backColor${index}"></span>
    //         </div>
    //       </div>`

    // }

  }
  if (data.ControlType === 'line') {
    changeStr += `<div  class="r-border-common">
    <div class="r-border-common_item" >
      <span>填充</span>
      <span class="pos-back-color" id="borderColor${index}" onclick="createcolor('borderColor${index}' ,'borderColor')"></span>
    </div>
  </div>`
  }


  changeStr += `</div></div>`
  return changeStr

}
//打开线型下拉框
function openLine(e, index) {

  e.stopPropagation();
  let inputLeft = e.target.offsetLeft; //输入框的left
  let inputTop = e.target.offsetTop + 5; //输入框的top
  let inputHeight = e.target.offsetHeight; //输入框的高度
  let inputWidth = e.target.offsetWidth; //输入框宽度
  //判断是否存在下拉框select-drop-down
  // e.path[4].style.overflow = 'visible'
  if (!$(".select-drop-down").length) {
    //不存在新增
    if ($(".dashboard-collpase").height() >= $(".change-group").height()) {
      $("#r-border-input").append(`<div class="select-drop-down" style="left: ${inputLeft}px;top: -${inputHeight+inputTop+60}px;width: ${inputWidth}px;"><ul class="drop-down-list"></ul></div>`);


    } else {
      e.path[4].style.overflow = 'visible'
      $("#r-border-input").append(`<div class="select-drop-down" style="left: ${inputLeft}px;top: ${inputTop + inputHeight}px;width: ${inputWidth}px;"><ul class="drop-down-list"></ul></div>`);


    }
  } else {
    //存在则清空旧内容
    $(".select-drop-down").css({
      "display": "block",
      "left": inputLeft + "px",
      "top": inputTop + inputHeight + "px",
      "width": inputWidth + "px"
    })
    // e.path[4].style.overflow = 'auto'
    $(".drop-down-list>li").remove()
    $(".select-drop-down").remove()
  }
  // getList(1).then(res=>{
  //     let data = res.data;
  lineList.forEach(item => {
    if (item.id == 'none') {
      $(".drop-down-list").append(`<li onclick="changeLine(event,${index},'${item.id}')">${item.name}</li>`)

    } else {
      $(".drop-down-list").append(`<li onclick="changeLine(event,${index},'${item.id}')"><div class="xianDiv" style="border: 1px ${item.id} #000;"></div></li>`)

    }

    // changeStr += `<option data-option="${item.id}" class="${data.Style == item.id?'selected':''}"  value="${item.id}"><div class="xianDiv" style="border: 1px ${item.id} #000;"></div></option>`
  })


}
//选择线型
function changeLine(e, index, id) {
  Controls.ControlList[index].PropertyList.Style = id
  $('.model-select-textDiv').css('border', '1px ' + id + ' #000')
  if (id == 'none') {
    $('.model-select-textDiv').text('无边框')
  } else {
    $('.model-select-textDiv').text('')
  }

  $('.select-drop-down').remove()
  // e.path[6].style.overflow = 'auto'
  childElement(index)


}

document.getElementById('datatextblockDevice').addEventListener('input', debounce(changeDatatextblockDevice), 100)
document.getElementById('datatextblockDevice').addEventListener('blur', debounce(blurSearchData), 200)

async function blurSearchData() {
  if ($(".drop-down-list>li").length === 1 && $(".drop-down-list>li").text() === '无数据') {
    $("#datatextblockDevice").val('')
  } else {
    let times = 0
    $(".drop-down-list>li").each(function(index, elem) {
      if (elem === $("#datatextblockDevice").val()) {
        times++
      }
    })
    if (times.length === 0 && ($('#datatextblockDevice').val() !== $('#datatextblockDevice').data('dataname'))) {
      $("#datatextblockDevice").val('')
    }
  }

  $(".drop-down-list>li").remove()
  $(".select-drop-down").remove()
}

//选择关联变量下拉框
function changeDatatextblockDevice(e) {
  // e.stopPropagation()
  $(".drop-down-list>li").remove()
  $(".select-drop-down").remove()
  let inputLeft = e.target.offsetLeft; //输入框的left
  let inputTop = e.target.offsetTop + 5; //输入框的top
  let inputHeight = e.target.offsetHeight; //输入框的高度
  let inputWidth = e.target.offsetWidth; //输入框宽度
  //判断是否存在下拉框select-drop-down
  if (!$(".select-drop-down").length) {
    //不存在新增
    $("#popupWrap1").append(`<div class="select-drop-down" style="left: ${inputLeft}px;top: ${inputTop + inputHeight}px;min-width: ${inputWidth}px;"><ul class="drop-down-list"></ul></div>`);
    getDatatextblockDeviceList(1, e.target.value).then(res => {
      let data = res.records
      if (data) {
        if ($(".drop-down-list>li").length < 1) {
          data.forEach(item => {
            $(".drop-down-list").append(`<li onclick="changeDatatext(event,'${item.name}','${item.id}')"><div class="drop-li">${item.name}</div></li>`)
          })
        }

      }
    }).then(() => {
      dropDownLoad(e.type);
    })

  } else {
    //存在则清空旧内容
    // $(".select-drop-down").css({
    //   "display": "block",
    //   "left": inputLeft + "px",
    //   "top": inputTop + inputHeight + "px",
    //   "min-width": inputWidth + "px"
    // })
    // $(".drop-down-list>li").remove()
    // $(".select-drop-down").remove()
  }
  // dropDownLoad();
}
//获取关联变量下拉框内容
function getDatatextblockDeviceList(current, value) {
  let postData = {
    current: current,
    nameOrCode: value,
    size: 10
  }
  return new Promise((resolve, reject) => {
    request.get(`/bi/${appId}/variables/device`, {
      params: postData
    }).then(res => {
      // resolve(res)
      let data = res.data.data;
      data.current = postData.current;
      if (data) {
        resolve(data)
      } else {
        appTips.errorMsg(res.data.msg)
      }

    }).catch(error => {
      reject(error)
    })
  })


}
//下拉滚动
function dropDownLoad(type) {
  if ($(".select-drop-down .drop-down-list").children().length === 0) {
    if (type !== 'input') {
      $('#datatextblockDevice').val('')
    }
    $('.select-drop-down .drop-down-list').append(`<li>无数据</li>`)
  }
  let pageIndex = 1; //当前页数
  let nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
  let nScrollTop = 0; //滚动到的当前位置
  let dataRecords = 0
  let nDivHight = $(".select-drop-down").outerHeight(true);
  $(".select-drop-down").on("scroll", function () {
    nScrollHight = $(this)[0].scrollHeight;
    nScrollTop = $(this)[0].scrollTop;
    if (nScrollTop + nDivHight == nScrollHight && nScrollTop > 0) {
      if (dataRecords < 1) {
        getDatatextblockDeviceList(pageIndex += 1).then(res => {

          let data = res.records;
          if (data.length < 1) {
            dataRecords = 1
            return
          }
          for (let i = 0; i < data.length; i++) {
            $(".drop-down-list").append(`<li onclick="changeDatatext(event,'${data[i].name}','${data[i].id}')"><div class="drop-li">${data[i].name}</div></li>`)
          }
          // data.forEach(item => {
          //   $(".drop-down-list1").append(`<li onclick="changeDatatext(event,'${item.name}','${item.id}')>${item.name}</li>`)
          // })

        })

      }

    }
  });
}
//点击选中关联变量内容
function changeDatatext(e, name, id) {
  $("#datatextblockDevice").val(name)
  $("#datatextblockDevice").data('datatext', id)
  $("#datatextblockDevice").data('dataname', name)
  $(".select-drop-down").remove()

}

// 边框颜色选择器
function createBorderColor(id, type, index) {
  // $('.colordiv').remove()
  // Colorpicker.create({
  //   el: "borderColor" + index,
  //   color: Controls.ControlList[index].PropertyList.BorderColor,
  //   change: function (elem, hex, rgba) {
  //     elem.style.backgroundColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')';
  //     elem.style.background = 'linear-gradient(to bottom right,transparent 0%,transparent calc(50% - 1px),rgba(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ') 50%, transparent calc(50% + 1px),transparent 100%)'
  //     Controls.ControlList[index].PropertyList.BorderColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')';
  //     if ((data.ControlType != 'piechart' && data.ControlType != 'dashboardchart' && data.ControlType != 'barchart' && data.ControlType != 'linechart')) {
  //       // childElement(index,'init')
  //       // 动态文本特殊处理
  //       // if (Controls.ControlList[index].ControlType === "dynamictext") {
  //       //   $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}] .moduleShape`).find('input').css('borderColor', `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')')
  //       // } else {
  //         if ($(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).find('input').length > 0) {
  //         // if (Controls.ControlList[index].title == '静态文本' || Controls.ControlList[index].title == '动态文本' || Controls.ControlList[index].title == '读写框') {
  //           $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).find('input').css('borderColor', `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')')
  //         }else if( $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).find('textarea').length>0){
  //           $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).find('textarea').css('borderColor', `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')')
  //         }
  //         else{
  //           $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).css('borderColor', `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')')
  //         }


  //       // }
  //     }
  //   }
  // })


}

//监听图表Dom是否加载完成
// function checkDom(DomId){
//   let dom = document.getElementById('abc')
//   if(dom) {
//     //  执行dom加载完成后的操作
//    doSomething();
//    //  清除定时器
//    if(!timer) {
//        clearTimeout(timer)
//    }
// } else {
//    //  自我调用
//    timer = setTimeout(checkDom, 0)
// }

// }