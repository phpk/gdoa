/* 次吃放置右侧样式交互事件部分 */

// 右侧样式与数据标签 切换tab
function choice(type, index, refresh) {
  /* 
        refresh: 是否调用图表业务数据 数据表接口，选中时无需调用，松开后调用一次即可
  */
  Controls.ControlList[index].TabEvent = type
  // if ($('.colordiv')) {
  //   if($('.colordiv').length>=15){
  //     for (let i = 15; i < $('.colordiv').length; i++) {
  //       $('.colordiv')[i].remove()
  //     }
  //   }
   
  // }
  let style = document.getElementById('r-btns-style')
  let event = document.getElementById('r-btns-event')
  let changeGroup = document.getElementById('change-group')

  let types = ['piechart', 'dashboardchart', 'barchart', 'linechart']

  if ($('.details').css('display') === 'block') {
    if (types.includes(Controls.ControlList[index].ControlType)) {
      if (type === 'style') {
        $('#chart-list').css('display', 'none')

      } else {
        $('#chart-list').css('display', 'block')
        showIframe(Controls.ControlList[index].ControlType)
      }
      
    }
  }


  // chartsChangFun(type)
  if (type === 'style') {
    if (index !== undefined) { //判断是否为画布， 若为画布则直接initCommon
      chartsChangFun(type)
      changeCommon({
        ...Controls.ControlList[index].PropertyList,
        ControlType: Controls.ControlList[index].ControlType
      }, index)
      if (selectdata.length <= 1) {
        // setClass(index)
        // if (types.includes(Controls.ControlList[index].ControlType)) {
        //   setClass(Controls.ControlList[index].PropertyList.ZIndex, Controls.ControlList[index].ControlType, Controls.ControlList[index].Name)

        // } else {
          setClass(Controls.ControlList[index].PropertyList.ZIndex)

        // }

      } else {
        let tmp = []
        selectdata.forEach((item) => {
          tmp.push(item.index)
        })
        setClass(tmp)
      }
      style.className += ' active'
      event.classList.remove("active")
    } else {
      // initCommon()
    }
  } else { // 此处为选中元素之后赋予样式
    event.className += ' active'
    style.classList.remove("active")
    let html = `<div class="dashboard-collpase" >
            <div class="bi-collapse">`
    // changeGroup.innerHTML = ''
    let tableTitleList = ''
    let showColorpickerList = '0' //是否显示取色器列表，‘1’显示
    if (Controls.ControlList.length > 0 && index !== undefined) {
      if (Controls.ControlList[index].ControlType === 'datatextblock') { //数值显示 已有
        showColorpickerList = '1'
        tableTitleList = Controls.ControlList[index].TableTitleList
        html += `<div class="bi-collapse-title" onclick="toggleCollpase(event)">功能设置<i class="iconfont iconxialajiantou" ></i></div>
        <div class="bi-collapse-content">
        <div>
              <div class="func-variable">
                <span class="func-wrap-title" >变量</span>
                <div class="func-wrap-center">
                  <input type="text" class="func-wrap-input" readonly="readonly" onclick="openPop(${index})" value="${Controls.ControlList[index].CheckData.name}"  />
                  <span class="func-wrap-choice" onclick="openPop(${index})" >选择</span>
                </div>
              </div>
              <div class="func-others"><input onchange="changeChecked(event, ${index}, 'dbl')" type="checkbox" ${Controls.ControlList[index].dblCheck ? 'checked' : ''} style="width: 12px" id="label1" ><label for="label1">双击时弹出历史曲线窗口</label></div>
              <div class="func-others"><input onchange="changeChecked(event, ${index}, 'con')" type="checkbox" ${Controls.ControlList[index].conCheck ? 'checked' : ''} style="width: 12px" id="label2" ><label for="label2">数值字体颜色按条件变化</label> </div>
          
        
        </div>
      </div>`

        html += ` <div class="bi-collapse-title" onclick="toggleCollpase(event)">指定条件<i class="iconfont iconxialajiantou"></i></div>
      <div class="bi-collapse-content">
      <div>

      <div class="data-table-h">
      <table id="dynamictextTableId-h">
      <thead><tr>`
        for (var i = 0; i < tableTitleList.length; i++) {
          html += `<th>${tableTitleList[i].title}</th>`
        }
        html += `<th style="width:40px"></th>
        </tr>
        </thead>`
        html += `<tbody id="dynamictextTableBodyId-h">`
        if (Controls.ControlList[index].DataList.length !== 0) {
          Controls.ControlList[index].DataList.forEach(item => {
            item.variable = Controls.ControlList[index].CheckData.name
          })
        }
        html += dyRefreshTable("dynamictextTableBodyId-h", Controls.ControlList[index].DataList, index, 1)
        html += `</tbody></table>`
        html += `<div class="add-btn-h" onclick="dyAddTableTr('dynamictextTableBodyId-h',${index},1)"><i class="iconfont iconxinzenglianxiren"></i><span>新增</span></div>`
        html += `</div></div></div>`
        html += `<div class="bi-collapse-title" onclick="toggleCollpase(event)">显示格式<i class="iconfont iconxialajiantou"></i></div>
          <div class="bi-collapse-content" >
          <div style="overflow: hidden;">
            <div class="datatextblock-default-h" style=" float: left;"><span>整数位数</span>
            <div class="input">
              <select onchange="defaultTextFunc('datatextblock',${index},this.value,'IntNumber')" placeholder="请选择">
               <option value="0" ${!Controls.ControlList[index].IntNumber ? 'selected' : ''  }>无</option>
               <option value="0" ${Controls.ControlList[index].IntNumber == 0 ? 'selected' : ''  }>0</option>
               <option value="1" ${Controls.ControlList[index].IntNumber == 1 ? 'selected' : ''  }>1</option>
               <option value="2" ${Controls.ControlList[index].IntNumber == 2 ? 'selected' : ''  }>2</option>
               </select>
               </div>
            </div>
            <div class="datatextblock-default-h" style=" float: right;"><span>小数位数</span>
            <div class="input">
              <select onchange="defaultTextFunc('datatextblock',${index},this.value,'DecimalDigits')" placeholder="请选择">
                <option value="0" ${!Controls.ControlList[index].IntNumber ? 'selected' : ''  }>无</option>
                <option value="0" ${Controls.ControlList[index].DecimalDigits == 0 ? 'selected' : ''  }>0</option>
                <option value="1" ${Controls.ControlList[index].DecimalDigits == 1 ? 'selected' : ''  }>1</option>
                <option value="2" ${Controls.ControlList[index].DecimalDigits == 2 ? 'selected' : ''  }>2</option>
              </select>
              </div>
            </div>
          </div>
          `
        html += `</div></div></div>`
      } else if (Controls.ControlList[index].ControlType === 'image') { // 动态图片
        tableTitleList = Controls.ControlList[index].TableTitleList
        // showColorpickerList = '1'
        // var dataList = Controls.ControlList[index].DataList
        html += `
          <div class="bi-collapse-title" onclick="toggleCollpase(event)">指定条件<i class="iconfont iconxialajiantou"></i></div>
          <div class="bi-collapse-content">
          <div>
          <div class="data-table-h">
          <table id="dynamictextTableId-h">
          <thead><tr>`
        for (var i = 0; i < tableTitleList.length; i++) {
          html += `<th>${tableTitleList[i].title}</th>`
        }
        html += `<th style="width:40px"></th>
            </tr>
            </thead>`
        html += `<tbody id="dynamictextTableBodyId-h">`
        html += dyRefreshTable("dynamictextTableBodyId-h", Controls.ControlList[index].DataList, index, 1)
        html += `</tbody></table>`
        html += `<div class="add-btn-h" onclick="dyAddTableTr('dynamictextTableBodyId-h',${index},1)"><i class="iconfont iconxinzenglianxiren"></i><span>新增图片</span></div>`

        html += `</div></div></div>`
        html += `
              <div class="bi-collapse-title" onclick="toggleCollpase(event)">默认图片<i class="iconfont iconxialajiantou"></i></div>
              <div class="bi-collapse-content">
              <div>
              <div class="r-pos-title" style="margin:20px 0">
              <div class="r-pos">
              <img id="defaultImg" style="height:60px;width:60px;cursor: pointer;" src="${Controls.ControlList[index].DefaultImg}"/>
              </div>
              </div>
              `
        html += `</div></div></div>`
      } else if (Controls.ControlList[index].ControlType === 'line') { // 直线
        html += `<span>UI 稿暂未出</span>`
      } else if (Controls.ControlList[index].ControlType === 'titleCom') {
        html += `<span>UI 稿暂未出</span>`
      } else if (Controls.ControlList[index].ControlType === 'solidrectangle') { // 矩形
        html += `<span>UI 稿暂未出</span>`
      } else if (Controls.ControlList[index].ControlType === 'solidellipse') { // 圆形
        html += `<span>UI 稿暂未出</span>`
      } else if (Controls.ControlList[index].ControlType === 'ellipselamp') { // 圆形状态灯 已有
        tableTitleList = Controls.ControlList[index].TableTitleList
        showColorpickerList = '1'
        // var dataList = Controls.ControlList[index].DataList
        html += ` <div class="bi-collapse-title" onclick="toggleCollpase(event)">指定条件<i class="iconfont iconxialajiantou"></i></div>
          <div class="bi-collapse-content">
          <div>

          <div class="data-table-h">
          <table id="dynamictextTableId-h">
          <thead><tr>`
        for (var i = 0; i < tableTitleList.length; i++) {
          html += `<th>${tableTitleList[i].title}</th>`
        }
        html += `<th style="width:40px"></th>
            </tr>
            </thead>`
        html += `<tbody id="dynamictextTableBodyId-h">`
        html += dyRefreshTable("dynamictextTableBodyId-h", Controls.ControlList[index].DataList, index, 1)
        html += `</tbody></table>`
        html += `<div class="add-btn-h" onclick="dyAddTableTr('dynamictextTableBodyId-h',${index},1)"><i class="iconfont iconxinzenglianxiren"></i><span>新增</span></div>`
        html += `</div></div></div>`
        html += `
              <div class="bi-collapse-title" onclick="toggleCollpase(event)">默认颜色<i class="iconfont iconxialajiantou"></i></div>
              <div class="bi-collapse-content" >
              <div>
              
              <div class="ellipselamp-default-color"><span>颜色</span><div id="dynamictextDefaultColor" class="div-color-h" style="display: inline-block;vertical-align: middle;margin-left:10px"></div>
              </div>
              <div class=" ellipselamp-default-color"><span>闪烁</span>
              <input onchange="defaultFlashingFunc(${index},this.checked)" ${Controls.ControlList[index].DefaultFlashing?'checked':''} class="table-switch-h switch-anim" type="checkbox"></div>
              </div>
              `

        html += `</div></div></div>`
      } else if (Controls.ControlList[index].ControlType === 'commonlamp') { // 矩形状态灯 已有
        tableTitleList = Controls.ControlList[index].TableTitleList
        showColorpickerList = '1'
        // var dataList = Controls.ControlList[index].DataList
        html += ` <div class="bi-collapse-title" onclick="toggleCollpase(event)">指定条件<i class="iconfont iconxialajiantou"></i></div>
        <div class="bi-collapse-content">
        <div>

        <div class="data-table-h">
        <table id="dynamictextTableId-h">
        <thead><tr>`
        for (var i = 0; i < tableTitleList.length; i++) {
          html += `<th>${tableTitleList[i].title}</th>`
        }
        html += `<th style="width:40px"></th>
          </tr>
          </thead>`
        html += `<tbody id="dynamictextTableBodyId-h">`
        html += dyRefreshTable("dynamictextTableBodyId-h", Controls.ControlList[index].DataList, index, 1)
        html += `</tbody></table>`
        html += `<div class="add-btn-h" onclick="dyAddTableTr('dynamictextTableBodyId-h',${index},1)"><i class="iconfont iconxinzenglianxiren"></i><span>新增</span></div>`
        html += `</div></div></div>`
        html += `
            <div class="bi-collapse-title" onclick="toggleCollpase(event)">默认颜色<i class="iconfont iconxialajiantou"></i></div>
            <div class="bi-collapse-content" >
            <div>
            
            <div class="ellipselamp-default-color"><span>颜色</span><div id="dynamictextDefaultColor" class="div-color-h" style="display: inline-block;vertical-align: middle;margin-left:10px"></div>
            </div>
            <div class=" ellipselamp-default-color"><span>闪烁</span>
            <input onchange="defaultFlashingFunc(${index},this.checked)" ${Controls.ControlList[index].DefaultFlashing?'checked':''} class="table-switch-h switch-anim" type="checkbox"></div>
            </div>
            `

        html += `</div></div></div>`
      } else if (Controls.ControlList[index].ControlType === 'statictextblock') { // 静态文本
        html += `<span>UI 稿暂未出</span>`
      } else if (Controls.ControlList[index].ControlType === 'dynamictext') { // 动态文本 已有
        tableTitleList = Controls.ControlList[index].TableTitleList
        showColorpickerList = '1'
        // var dataList = Controls.ControlList[index].DataList
        html += `
          <div class="bi-collapse-title" onclick="toggleCollpase(event)">指定条件<i class="iconfont iconxialajiantou"></i></div>
          <div class="bi-collapse-content">
          <div>
          <div class="data-table-h">
          <table id="dynamictextTableId-h">
          <thead><tr>`
        for (var i = 0; i < tableTitleList.length; i++) {
          html += `<th>${tableTitleList[i].title}</th>`
        }
        html += `<th style="width:40px"></th>
            </tr>
            </thead>`
        html += `<tbody id="dynamictextTableBodyId-h">`
        html += dyRefreshTable("dynamictextTableBodyId-h", Controls.ControlList[index].DataList, index, 1)
        html += `</tbody></table>`
        html += `<div class="add-btn-h" onclick="dyAddTableTr('dynamictextTableBodyId-h',${index},1)"><i class="iconfont iconxinzenglianxiren"></i><span>新增</span></div>`

        html += `</div></div></div>`
        html += `
              <div class="bi-collapse-title" onclick="toggleCollpase(event)">默认<i class="iconfont iconxialajiantou"></i></div>
              <div class="bi-collapse-content">
              <div>
              <div class="r-pos-title"><span>显示文案</span></div><div class="r-title-input"><input onchange="defaultTextFunc('dynamictext',${index},this.value)" value="${Controls.ControlList[index].DefaultText}" type="text"/></div>
              <div class="r-pos-title"><span>颜色</span>
              <div id="dynamictextDefaultColor" class="div-color-h" style="display: inline-block;vertical-align: middle;margin-left:10px;background:${Controls.ControlList[index].DefaultColor} ;"></div></div>
              `

        html += `</div></div></div>`
        // getColorpickerList(index,'1')
      } else if (Controls.ControlList[index].ControlType === 'cornerbutton') { // 控制按钮 已有
        var buttonTypeList = Controls.ControlList[index].ButtonTypeList
        // var dataList = Controls.ControlList[index].DataList
        html += `
          <div class="bi-collapse-title" onclick="toggleCollpase(event)">指定条件<i class="iconfont iconxialajiantou"></i></div>
          <div class="bi-collapse-content"><div>`
        html += `<div class="rwtextbox-default-h cornerbutton-div-height" >
          <div>按钮类型</div>
         <div class="trigger cornerbutton-default-h">`
        buttonTypeList.forEach(item => {
          html += `<div><input onclick="buttonTypeFun(${index},this.value)" ${Controls.ControlList[index].radioType == item.id ?'checked':''} type="radio" name="buttonType" id="${item.id}" value="${item.id}"><label for="${item.id}">${item.title}</label></div>`
        })
        html += `</div></div>`
        html += ` <div class="data-table-h" id="controlButtonTableId"> `
        html += getButtonTypeTable(index, '0')
        html += `</div>`
        html += `<div id="cornerbuttonCheckbox" class="cornerbutton-checkbox"><input ${Controls.ControlList[index].IsOpen?'checked':''} type="checkbox">单击时弹出确认框</div>`
        html += `<div id="cornerbuttonCheckbox1" class="cornerbutton-checkbox">确认框标题</div>`
        html += `<div class="cornerbutton-checkbox-input"><input onchange="choicePermissionFun(${index},this.value,'isOpenText')" type="text" value="${Controls.ControlList[index].IsOpenText}"></div>`

        html += `</div></div>`
        html += `
              <div class="bi-collapse-title" onclick="toggleCollpase(event)">安全策略<i class="iconfont iconxialajiantou"></i></div>
              <div class="bi-collapse-content">
              <div ${Controls.ControlList[index].ShowPermission?'':'style="display: none;"'}>
              <div class="dashboard-area" >
                  <span class="area-title request-fild" >操作权限</span>
                </div>
                <div class="permission-groups" >
                  <div>
                    <input type="radio" onclick="choicePermissionFun(${index},'public','operationPermission')" name="operationPermission-radio" ${Controls.ControlList[index].OperationPermission == 'public'?'checked':''} id="public1" class="permission-radio" >
                      <label for="public1" class="permission-label" >公开</label>
                    </input>
                    <input type="radio" onclick="choicePermissionFun(${index},'custom','operationPermission')" name="operationPermission-radio"  ${Controls.ControlList[index].OperationPermission == 'custom'?'checked':''} id="custom1" class="permission-radio" >
                      <label for="custom1" class="permission-label">自定义</label>
                    </input>
                    <input type="radio" onclick="choicePermissionFun(${index},'private','operationPermission')" name="operationPermission-radio"  ${Controls.ControlList[index].OperationPermission == 'private'?'checked':''} id="private1" class="permission-radio" >
                      <label for="private1" class="permission-label">私有</label>
                    </input>
                  </div>
                  <div id="opera-permission" style="display: ${Controls.ControlList[index].OperationPermission === 'custom' ? 'block' : 'none'} "  >
                    <input type="text" placeholder="请点击选择" autocomplete="off" class="layui-input"  id="opera-selectDeptInp" readonly style="cursor: pointer;" onclick="openBtnOpera(${index})"> 
                  </div>
                </div>`
        //  ` <div class="dashboard-area" >
        //     <span class="area-title request-fild" >访问权限</span>
        //   </div>
        //   <div class="permission-groups" >
        //     <div>

        //       <input type="radio" onchange="choicePermissionFun(${index},'public','accessPermission')" ${Controls.ControlList[index].AccessPermission == 'public'?'checked':''} name="accessPermission-radio" id="public" class="permission-radio" >
        //         <label for="public" class="permission-label" >公开</label>
        //       </input>
        //       <input type="radio" onchange="choicePermissionFun(${index},'custom','accessPermission')" ${Controls.ControlList[index].AccessPermission == 'custom'?'checked':''} name="accessPermission-radio" id="custom"  class="permission-radio" >
        //         <label for="custom" class="permission-label">自定义</label>
        //       </input>
        //       <input type="radio" onchange="choicePermissionFun(${index},'private','accessPermission')" ${Controls.ControlList[index].AccessPermission == 'private'?'checked':''} name="accessPermission-radio" id="private" class="permission-radio" >
        //         <label for="private" class="permission-label">私有</label>
        //       </input>
        //     </div>
        //   </div>`
        html += `<div class="dashboard-area dashboard-start" >
                  <span class="area-name" >描述</span>
                  <textarea autocomplete="off" rows="3" id="permission-description1" class="area-textarea" placeholder="请输入" onChange="choicePermissionFun(${index},this.value,'PermissionDesc')" >${Controls.ControlList[index].PermissionDesc}</textarea>
                </div>
              </div>
            </div> `
        html += `</div></div></div>`
      } else if (Controls.ControlList[index].ControlType === 'rwtextbox') { // 读写框 已有
        tableTitleList = Controls.ControlList[index].TableTitleList
        showColorpickerList = '1'
        html += `<div class="bi-collapse-title" onclick="toggleCollpase(event)">功能设置<i class="iconfont iconxialajiantou" ></i></div>
      <div class="bi-collapse-content">
      <div>
            <div class="func-variable">
              <span class="func-wrap-title" >变量</span>
              <div class="func-wrap-center">
                <input type="text" class="func-wrap-input" onclick="openPop(${index})" value="${Controls.ControlList[index].CheckData.name}"  />
                <span class="func-wrap-choice" onclick="openPop(${index})" >选择</span>
              </div>
            </div>
            <div class="func-others"><input onchange="changeChecked(event, ${index}, 'dbl')" type="checkbox" ${Controls.ControlList[index].dblCheck ? 'checked' : ''} style="width: 12px" id="label1" ><label for="label1">双击时弹出历史曲线窗口</label></div>
            <div class="func-others"><input onchange="changeChecked(event, ${index}, 'con')" type="checkbox" ${Controls.ControlList[index].conCheck ? 'checked' : ''} style="width: 12px" id="label2" ><label for="label2">数值字体颜色按条件变化</label> </div>
      </div>
    </div>`

        html += ` <div class="bi-collapse-title" onclick="toggleCollpase(event)">指定条件<i class="iconfont iconxialajiantou"></i></div>
    <div class="bi-collapse-content">
    <div>

    <div class="data-table-h">
    <table id="dynamictextTableId-h">
    <thead><tr>`
        for (var i = 0; i < tableTitleList.length; i++) {
          html += `<th>${tableTitleList[i].title}</th>`
        }
        html += `<th style="width:40px"></th>
      </tr>
      </thead>`
        html += `<tbody id="dynamictextTableBodyId-h">`
        if (Controls.ControlList[index].DataList.length !== 0) {
          Controls.ControlList[index].DataList.forEach(item => {
            item.variable = Controls.ControlList[index].CheckData.name
          })
        }
        html += dyRefreshTable("dynamictextTableBodyId-h", Controls.ControlList[index].DataList, index, 1)
        html += `</tbody></table>`
        html += `<div class="add-btn-h" onclick="dyAddTableTr('dynamictextTableBodyId-h',${index},1)"><i class="iconfont iconxinzenglianxiren"></i><span>新增</span></div>`
        html += `<div class="rwtextbox-default-h" >
        <div>触发条件</div>
        <div class="trigger">
        <input onclick="defaultTextFunc('rwtextbox',${index},this.value)" ${Controls.ControlList[index].TriggerCondition == '1'?'checked':''} type="radio" name="inputName" value="1"><span>回车</span>
        <input onclick="defaultTextFunc('rwtextbox',${index},this.value)" ${Controls.ControlList[index].TriggerCondition == '2'?'checked':''} type="radio" name="inputName" value="2"><span>关联控制按钮</span>
        </div>
      </div>`
        html += `</div></div></div>`

        html += `</div></div></div>`
      } else if (Controls.ControlList[index].ControlType === 'jumplink') { // 跳转链接
        html += `<span>UI 稿暂未出</span>`
      } else if (Controls.ControlList[index].ControlType === 'textsearch') { // 文本查询 已有
        html += getPublicHtmlFunc(index)
      } else if (Controls.ControlList[index].ControlType === 'associatedatetimepicker') { // 日期时间 已有
        html += ` <div class="bi-collapse-title" onclick="toggleCollpase(event)">数据<i class="iconfont iconxialajiantou"></i></div>
      <div class="bi-collapse-content">
     <div>
      <div id="textsearchDataCheckbox" class="r-pos-title">`
        html += `<div>关联数据</div>`
        html += `<div class="cornerbutton-checkbox r-pos">
    <input onclick="choicePermissionFun(${index},'历史数据','AsDatetimepickerType')" name="associateData" id="associateData1" ${Controls.ControlList[index].AsDatetimepickerType == '历史数据'?'checked':''}  type="radio"><label for="associateData1">历史数据</label>
    <input style="margin-left:50px" onclick="choicePermissionFun(${index},'业务数据','AsDatetimepickerType')" name="associateData" id="associateData2" ${Controls.ControlList[index].AsDatetimepickerType == '业务数据'?'checked':''} type="radio"><label for="associateData2">业务数据</label>
    </div>`
        html += `<div id="showAsdatetimepickerHtml">`
        if (Controls.ControlList[index].AsDatetimepickerType == '历史数据') {
          html += getPublicHtmlFunc1(index, 0)
        } else {
          html += getPublicHtmlFunc1(index, 1)
        }
        html += `</div>`
        html += `<div>设置初始过滤条件</div>`
        html += `<div class="r-pos">`
        html += `<div class="datapicker-input"><span>时间格式</span><select onchange="changeDateTime(event, ${index})" >`
        DataTimeTypeList.forEach(item => {
          html += `<option value="${item.value}" ${Controls.ControlList[index].DateTimeType == item.value?'selected':''}>${item.name+':'+item.value}</option>`
        })

        html += `</select></div>`
        html += `<div class="datapicker-input"><span>初始时间</span>`
        // html += `<div class="r-date-group" id="r-date" >
        //   <input type="text" class="layui-input" autocomplete="off" value="${Controls.ControlList[index].StartTime}"  id="startTime" placeholder="请选择">
        //   <input type="text" class="layui-input" autocomplete="off" value="${Controls.ControlList[index].EndTime}"  id="endTime" placeholder="请选择">
        // </div>`
        html += `<div class="r-date-group" id="r-date" >
            <div class="bi-datePicker date-wrap" >
              <input type="text" name="startTime" onfocus="getDate('startPicker',${index}, 'StartTime')" class="layui-input startPicker" autocomplete="off" value="${Controls.ControlList[index].StartTime}"  placeholder="请选择">
            </div>
            <div class="bi-datePicker date-wrap" >
              <input type="text" name="endTime" onfocus="getDate('endPicker',${index}, 'EndTime')" class="layui-input endPicker" autocomplete="off" value="${Controls.ControlList[index].EndTime}"  placeholder="请选择">
            </div> 
          </div>`

        html += `</div>`

        html += `</div></div></div>`
      } else if (Controls.ControlList[index].ControlType === 'datasearch') { // 数值查询 已有
        html += getPublicHtmlFunc(index)
      } else if (Controls.ControlList[index].ControlType === 'dropsearch') { // 下拉查询 已有
        html += getPublicHtmlFunc(index)
      } else if (Controls.ControlList[index].ControlType === 'searchbutton') { // 查询按钮
        html += `<span>UI 稿暂未出</span>`
      } else if (Controls.ControlList[index].ControlType === 'resetbutton') { // 重置按钮
        html += `<span>UI 稿暂未出</span>`
      } else if (Controls.ControlList[index].ControlType === 'linechart') {
        let chart = document.getElementById('data-line')
        let di = null
        Controls.Data.LineChartItemList.forEach((cd, cdi) => {
          if (Controls.ControlList[index].Name === cd.name) {
            di = cdi
          }
        })

        chart.contentWindow.LineinitEchart(Controls.Data.LineChartItemList[di], '', 'event')
        chart.contentWindow.varEchartsFun(Controls.Data.LineChartItemList[di], 'line', refresh ? refresh : false)
        chart.contentWindow.AuxiliaryLineInit(Controls.Data.LineChartItemList[di], 'line')

        let dataRelate = chart.contentWindow.document.getElementById('data-relate')
        let chartRable = chart.contentWindow.document.getElementById('chart-table')
        $(dataRelate).find("option[value=" + Controls.Data.LineChartItemList[di].defaultDataConfig.datatype + "]").attr("selected", true);
        $(dataRelate).find("option[value=" + Controls.Data.LineChartItemList[di].defaultDataConfig.datatype + "]").siblings().attr("selected", false);
        dataRelate.parentElement.lastElementChild.firstElementChild.firstElementChild.value = Controls.Data.LineChartItemList[di].defaultDataConfig.datatype
        chartRable.parentElement.lastElementChild.firstElementChild.firstElementChild.value = Controls.Data.LineChartItemList[di].defaultDataConfig.tablename

        $('#chart-list').css('z-index', 10)
        showIframe(Controls.ControlList[index].ControlType)
        // chartsChangFun('event')
        html = `<div class="dashboard-collpase" >
              <div>`
        html += `<div style="width:100%;height:626px" class="pieBox">
              </div>`

      } else if (Controls.ControlList[index].ControlType === 'barchart') {
        let chart = document.getElementById('data-barId')
        let di = null
        Controls.Data.BarChartItemList.forEach((cd, cdi) => {
          if (Controls.ControlList[index].Name === cd.name) {
            di = cdi
          }
        })
        chart.contentWindow.BarinitEchart(Controls.Data.BarChartItemList[di], '', 'event')
        chart.contentWindow.varEchartsFun(Controls.Data.BarChartItemList[di], 'bar', refresh ? refresh : false)
        chart.contentWindow.AuxiliaryLineInit(Controls.Data.BarChartItemList[di], 'bar')
        let dataRelate = chart.contentWindow.document.getElementById('data-relate')
        let chartRable = chart.contentWindow.document.getElementById('chart-table')
        $(dataRelate).find("option[value=" + Controls.Data.BarChartItemList[di].defaultDataConfig.datatype + "]").attr("selected", true);
        $(dataRelate).find("option[value=" + Controls.Data.BarChartItemList[di].defaultDataConfig.datatype + "]").siblings().attr("selected", false);
        dataRelate.parentElement.lastElementChild.firstElementChild.firstElementChild.value = Controls.Data.BarChartItemList[di].defaultDataConfig.datatype
        chartRable.parentElement.lastElementChild.firstElementChild.firstElementChild.value = Controls.Data.BarChartItemList[di].defaultDataConfig.tablename

        $('#chart-list').css('z-index', 10)
        showIframe(Controls.ControlList[index].ControlType)
        // chartsChangFun('event')

        html = `<div class="dashboard-collpase" >
              <div>`
        html += `<div style="width:100%;height:626px" class="pieBox">
            </div>`
      } else if (Controls.ControlList[index].ControlType === 'dashboardchart') {
        let chart = document.getElementById('data-dash')
        let di = null
        Controls.Data.DashBoardChartItemList.forEach((cd, cdi) => {
          if (Controls.ControlList[index].Name === cd.name) {
            di = cdi
          }
        })

        chart.contentWindow.DashinitEchart(Controls.Data.DashBoardChartItemList[di], '', 'event')
        chart.contentWindow.varEchartsFun(Controls.Data.DashBoardChartItemList[di], 'dash')

        let dataRelate = chart.contentWindow.document.getElementById('data-relate')
        let chartRable = chart.contentWindow.document.getElementById('chart-table')
        $(dataRelate).find("option[value=" + Controls.Data.DashBoardChartItemList[di].defaultDataConfig.datatype + "]").attr("selected", true);
        $(dataRelate).find("option[value=" + Controls.Data.DashBoardChartItemList[di].defaultDataConfig.datatype + "]").siblings().attr("selected", false);
        dataRelate.parentElement.lastElementChild.firstElementChild.firstElementChild.value = Controls.Data.DashBoardChartItemList[di].defaultDataConfig.datatype
        chartRable.parentElement.lastElementChild.firstElementChild.firstElementChild.value = Controls.Data.DashBoardChartItemList[di].defaultDataConfig.tablename

        $('#chart-list').css('z-index', 10)
        showIframe(Controls.ControlList[index].ControlType)
        // chartsChangFun('event')
        html = `<div class="dashboard-collpase" >
              <div>`
        html += `<div style="width:100%;height:626px" class="pieBox">
              </div>`
      } else if (Controls.ControlList[index].ControlType === 'piechart') {
        // let chart = document.getElementById('data-pie')
        // chart.contentWindow.varEchartsFun()
        // chart.initTableData()

        let chart = document.getElementById('data-pie')
        let di = null
        Controls.Data.PieChartItemList.forEach((cd, cdi) => {
          if (Controls.ControlList[index].Name === cd.name) {
            di = cdi
          }
        })

        chart.contentWindow.PieinitEchart(Controls.Data.PieChartItemList[di], '', 'event')
        chart.contentWindow.varEchartsFun(Controls.Data.PieChartItemList[di], 'pie')

        let dataRelate = chart.contentWindow.document.getElementById('data-relate')
        let chartRable = chart.contentWindow.document.getElementById('chart-table')
        $(dataRelate).find("option[value=" + Controls.Data.PieChartItemList[di].defaultDataConfig.datatype + "]").attr("selected", true);
        $(dataRelate).find("option[value=" + Controls.Data.PieChartItemList[di].defaultDataConfig.datatype + "]").siblings().attr("selected", false);
        dataRelate.parentElement.lastElementChild.firstElementChild.firstElementChild.value = Controls.Data.PieChartItemList[di].defaultDataConfig.datatype
        chartRable.parentElement.lastElementChild.firstElementChild.firstElementChild.value = Controls.Data.PieChartItemList[di].defaultDataConfig.tablename

        $('#chart-list').css('z-index', 10)
        showIframe(Controls.ControlList[index].ControlType)
        // chartsChangFun('event')

        html = `<div class="dashboard-collpase" >
              <div>`
        html += ` <div style="width:100%;height:626px" class="pieBox">
        
        </div>`
      }

      //折叠面板结束标签
      html += `</div>
      </div>
    `
      changeGroup.innerHTML = html
      initDateTime(Controls.ControlList[index].DateTimeType, index)
      // laydate.render({
      //   elem: '#startTime',
      //   type: 'datetime',
      //   format: Controls.ControlList[index].DateTimeType,
      //   done: function (value, date, endDate) {
      //     Controls.ControlList[index].StartTime = value
      //   }
      // });
      // laydate.render({
      //   elem: '#endTime',
      //   type: 'datetime',
      //   format: Controls.ControlList[index].DateTimeType,
      //   done: function (value, date, endDate) {
      //     Controls.ControlList[index].EndTime = value
      //   }
      // });
      getColorpickerList(index, showColorpickerList)
      getDefultColorpicker('dynamictextDefaultColor', index)

    }

    initCondition(index)
    if (Controls.ControlList[index].ControlType === 'cornerbutton') { // 控制按钮
      buttonTypeFun(Number(index), Controls.ControlList[index].radioType)
      let {
        operatData
      } = Controls.ControlList[index]
      let permissionNames = []
      operatData.opetaPermissions.forEach(item => {
        permissionNames.push(item.bizName)
      })
      // permissionData.customPermissions = permissionList
      $("#opera-selectDeptInp").val(permissionNames);
    }

  }
  renderChartList(index)
  if (type !== 'style' && Controls.ControlList[index].ControlType === 'image') {
    layui.use('upload', function () {
      var upload = layui.upload;
      //执行实例
      var uploadInst = upload.render({
        elem: `#defaultImg`,
        url: 'https://httpbin.org/post',
        accept: 'images',
        acceptMime: 'image/*',
        size: 1024 * 2,
        done: function (res) {
          let img = $(`#defaultImg`)
          Controls.ControlList[index].DefaultImg = res.files.file
          img.attr("src", res.files.file);
          changeImg(res.files.file, index)
          //上传完毕回调
        },
        error: function () {
          console.log('error')
          //请求异常回调
        }
      })
    })

    initTableImg(index)
  }

  
  layui.use('upload', function () {
    var upload = layui.upload;
    //执行实例

    var uploadInst = upload.render({
      elem: '#dashboardImg',
      url: 'https://httpbin.org/post',
      accept: 'images',
      acceptMime: 'image/*',
      size: 1024 * 2,
      done: function (res) {
        commonList.BackImg = res.files.file
        canvasWrap.style.backgroundImage = `url(${res.files.file})`
        canvasWrap.style.backgroundRepeat = `norepear`
        canvasWrap.style.backgroundSize = `100% 100%`
        //上传完毕回调
      },
      error: function () {
        console.log('error')
        //请求异常回调
      }
    })
  })
  // 全选
  initCheckAll()

}

// 选择iframe组件
function showIframe(type) {
  if (type === 'linechart') {
    $('#data-line').css('display', 'block')
    $('#data-barId').css('display', 'none')
    $('#data-dash').css('display', 'none')
    $('#data-pie').css('display', 'none')
  } else if (type === 'barchart') {
    $('#data-line').css('display', 'none')
    $('#data-barId').css('display', 'block')
    $('#data-dash').css('display', 'none')
    $('#data-pie').css('display', 'none')
  } else if (type === 'dashboardchart') {
    $('#data-line').css('display', 'none')
    $('#data-barId').css('display', 'none')
    $('#data-dash').css('display', 'block')
    $('#data-pie').css('display', 'none')
  } else if (type === 'piechart') {
    $('#data-line').css('display', 'none')
    $('#data-barId').css('display', 'none')
    $('#data-dash').css('display', 'none')
    $('#data-pie').css('display', 'block')
    // chartsChangFun(type)
    // PieinitEchart
  }


}

function initDateTime(val, index) {
  if (val === 'yyyy-MM-dd') {
    laydate.render({
      elem: '#startTime',
      type: 'date',
      format: Controls.ControlList[index].DateTimeType,
      done: function (value, date, endDate) {
        Controls.ControlList[index].StartTime = value
        childElement(index)

      }
    })
    laydate.render({
      elem: '#endTime',
      type: 'date',
      format: Controls.ControlList[index].DateTimeType,
      done: function (value, date, endDate) {
        Controls.ControlList[index].EndTime = value
        childElement(index)
      }
    })
  } else if (val === 'year') {
    laydate.render({
      elem: '#startTime',
      type: 'year',
      // format: Controls.ControlList[index].DateTimeType,
      done: function (value, date, endDate) {
        Controls.ControlList[index].StartTime = value
        childElement(index)
      }
    })
    laydate.render({
      elem: '#endTime',
      type: 'year',
      // format: Controls.ControlList[index].DateTimeType,
      done: function (value, date, endDate) {
        Controls.ControlList[index].EndTime = value
        childElement(index)
      }
    })
  } else if (val === 'month') {
    laydate.render({
      elem: '#startTime',
      type: 'month',
      // format: Controls.ControlList[index].DateTimeType,
      done: function (value, date, endDate) {
        Controls.ControlList[index].StartTime = value
        childElement(index)
      }
    })
    laydate.render({
      elem: '#endTime',
      type: 'month',
      // format: Controls.ControlList[index].DateTimeType,
      done: function (value, date, endDate) {
        Controls.ControlList[index].EndTime = value
        childElement(index)
      }
    })
  } else {
    laydate.render({
      elem: '#startTime',
      type: 'datetime',
      format: Controls.ControlList[index].DateTimeType,
      done: function (value, date, endDate) {
        Controls.ControlList[index].StartTime = value
        childElement(index)

      }
    })
    laydate.render({
      elem: '#endTime',
      type: 'datetime',
      format: Controls.ControlList[index].DateTimeType,
      done: function (value, date, endDate) {
        Controls.ControlList[index].EndTime = value
        childElement(index)
      }
    })
  }



}

function changeDateTime(e, index) {
  Controls.ControlList[index].DateTimeType = e.target.value
  let date = document.getElementById('r-date')
  date.innerHTML = ''
  // $('#startTime').val('')
  // $('#endTime').val('')
  Controls.ControlList[index].StartTime = ''
  Controls.ControlList[index].EndTime = ''
  //动态时间数据初始化
  Controls.ControlList[index].PropertyList.type = 1
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
  date.innerHTML = `
  <div class="bi-datePicker date-wrap" >
    <input type="text" name="startTime" onfocus="getDate('startPicker',${index}, 'StartTime')" class="layui-input startPicker" autocomplete="off" value="${Controls.ControlList[index].StartTime}"  placeholder="请选择">
  </div>
  <div class="bi-datePicker date-wrap" >
    <input type="text" name="endTime" onfocus="getDate('endPicker',${index}, 'EndTime')" class="layui-input endPicker" autocomplete="off" value="${Controls.ControlList[index].EndTime}"  placeholder="请选择">
  </div> 
  `

  initDateTime(e.target.value, index)
}

function initTableImg(index) {

  Controls.ControlList[index].DataList.forEach((item, i) => {
    layui.use('upload', function () {
      var upload = layui.upload;
      //执行实例
      var uploadInst = upload.render({
        elem: `#tableimg${i}`,
        url: 'https://httpbin.org/post',
        accept: 'images',
        acceptMime: 'image/*',
        size: 1024 * 2,
        done: function (res) {
          let img = $(`#tableimg${i}`)
          Controls.ControlList[index].DataList[i].img = res.files.file
          img.attr("src", res.files.file);
          //上传完毕回调
        },
        error: function () {
          console.log('error')
          //请求异常回调
        }
      })
    })
  })
}
// 右侧属性栏初始化
function initCommon(type) {
  $("#chart-list").hide()
  let commonGroup = document.getElementById('common-group')
  let changeGroup = document.getElementById('change-group')
  // <input type="text" class="r-input" onblur="setCanvasName(event)" value="${commonList.Name}" />
  let commonStr = `<div class="r-item"><span class="dashboard-title" >看板设置</span></div>`
  // 注：bi-collapse-content里面需要嵌套一个根元素div，根据此div计算各个content的高度

  let guideStr ='' 
  let str = `${commonList.GuideWidth} * ${commonList.GuideHeight}`
  guideLines.forEach(item => {
    if (str === item.value) {
      guideStr += `<option value="${item.value}" selected>${item.name}</option>`
    } else {
      guideStr += `<option value="${item.value}">${item.name}</option>`
    }
   
  })

  let changeStr = `<div class="dashboard-collpase" >
      <div class="bi-collapse">
            <div class="bi-collapse-title" onclick="toggleCollpase(event)">样式<i class="iconfont iconxialajiantou" ></i></div>
            <div class="bi-collapse-content" id="common-Content" >
              <div>
                <div class="dashboard-area" >
                    <span class="area-name request-fild" >名称</span>
                    <input class="area-input" type="text" id="canvasName" autocomplete="off" maxlength="30"  onblur="setCanvasName(event)" value="${commonList.Name}" ></input>
                </div>
                <div class="dashboard-area" >
                    <span class="area-name request-fild" >位置</span>
                    <input id="attrPosition" class="attr-pos" placeholder="请选择位置" type="text" readonly value="${commonList.Position}" href="#" onclick="openTreeAttr(event); return false;"/>
                </div>
                <div id="attrwrap" class="menuContent z-contentBoxLeft treeDemoAddNicescroll attr-wrap" style="display:none;height: 250px;">
                  <ul id="treeAttr" class="ztree"></ul>
              </div>
                <div class="dashboard-area dashboard-start" >
                  <span class="area-name" >背景</span>
                  <div>
                    <div class="area-gruops" >
                      <input type="radio" onchange="choiceBack(event, 'color')" name="bg-radio" id="color" class="area-radio" ${commonList.BackSetting === 'color' ? 'checked' : ''} ></input>
                      <label for="color" class="label-title" >颜色</label>
                      <span class="back-color" style="display: ${commonList.BackSetting === 'color' ? 'block': 'none' }; background-color: ${commonList.BackSetting === 'color' ? commonList.BackColor: '' }" id="backColor" onclick="createcolor('backColor','backColor')"></span>
                    </div>
                    <div class="area-gruops" >
                      <input type="radio" onchange="choiceBack(event, 'img')" name="bg-radio" id="img" class="area-radio" ${commonList.BackSetting === 'img' ? 'checked' : ''} ></input>
                      <label for="img" class="label-title" >图片</label>
                      <img width="50px"  src="${commonList.BackImg}" style="display: ${commonList.BackSetting === 'img' ? 'block': 'none' }" id="dashboardImg"/>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bi-collapse-title" onclick="toggleCollpase(event)">安全策略<i class="iconfont iconxialajiantou" ></i>
              <span class="bi-collapse-subTitle" onclick="copeSetting(event, 'others')" >从其他看板复制配置</span>
              <span class="bi-collapse-subTitle" onclick="copeSetting(event, 'self')">将配置复制给其他看板</span>
            </div>
            <div class="bi-collapse-content">
              <div>
                <div class="dashboard-area" >
                  <span class="area-title request-fild" >访问权限</span>
                </div>
                <div class="permission-groups" >
                  <div>
                    <input type="radio" onchange="choicePermission('public')" name="permission-radio" ${commonList.Permision === 'public'?'checked':''} id="public" class="permission-radio" >
                      <label for="public" class="permission-label" >公开</label>
                    </input>
                    <input type="radio" onchange="choicePermission('custom')" name="permission-radio" ${commonList.Permision === 'custom'?'checked':''}  id="custom" class="permission-radio" >
                      <label for="custom" class="permission-label">自定义</label>
                    </input>
                    <input type="radio" onchange="choicePermission('private')" name="permission-radio" ${commonList.Permision === 'private'?'checked':''}  id="private" class="permission-radio" >
                      <label for="private" class="permission-label">私有</label>
                    </input>
                  </div>
                  <div id="custom-permission" style="display: ${commonList.Permision === 'custom' ? 'block' : 'none'} "  >
                    <input type="text" placeholder="请点击选择" autocomplete="off" class="layui-input"  id="z-selectDeptInp" readonly style="cursor: pointer;" onclick="openCustom()"> 
                  </div>
                </div>

                <div>
                  <div class="dashboard-area" >
                    <span class="guide-name" >参考线</span>
                    <select class="guide-select" onchange="changeGuide(event)" >
                      ${guideStr}
                    </select>
                    <button onClick="showGuide(event)" class="bi-btn btn-primary" style="background:#409EFF;border-color:#409EFF;color:#fff;border-radius:4px;padding:8px 15px;outline:none"><span>自定义</span></button>
                  </div>
                  
                  <div id="custom-guide" style="display: ${commonList.IsShowCustoms ? 'block' : 'none'}" >
                    <div class="r-guide r-pos-detail">
                      <div><span>W </span><input min="0" value=${commonList.CustomWidth} onblur="changeCustom(event, 'W')" class="guide-input" type="number"  ></div>
                      <div><span>H </span><input min="0" value=${commonList.CustomHeight} onblur="changeCustom(event, 'H')" class="guide-input" type="number" ></div>
                    </div>                  
                  </div>
                </div>
                
                <div class="dashboard-area dashboard-start" >
                  <span class="area-name" >描述</span>
                  <textarea autocomplete="off" rows="3" id="permission-description" class="area-textarea" placeholder="请输入" onchange="addDescription(event)" >${commonList.Description}</textarea>
                </div>
              </div>
            </div>
        </div>
      </div>
    `
  commonGroup.innerHTML = commonStr
  changeGroup.innerHTML = changeStr
  var list = [...document.getElementsByClassName('commonModule')]
  let select = [...document.querySelectorAll('.global-select input')]
  getCommonPosTree()
  initCollpase()

  let permissionNames = []
  permissionList.forEach(item => {
    permissionNames.push(item.bizName)
  })
  permissionData.customPermissions = permissionList
  $("#z-selectDeptInp").val(permissionNames);

  if (!type) {
    selectdata = []
    localdata.ControlList = []
  }
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
  let canvasWrap = document.getElementById('canvas-wrap')
  // 初始化背景
  if (commonList.BackSetting === 'color') {
    let wrap = document.getElementById('canvas-wrap')
    wrap.style.backgroundColor = commonList.BackColor
  } else if (commonList.BackSetting === 'img') {
    canvasWrap.style.backgroundImage = `url(${commonList.BackImg})`
    canvasWrap.style.backgroundRepeat = `norepear`
    canvasWrap.style.backgroundSize = `100% 100%`
  }
  choiceBack(null, commonList.BackSetting)
  // 背景色选择器
  // Colorpicker.create({
  //   el: "backColor",
  //   color: commonList.BackColor,
  //   change: function (elem, hex,rgba) {
  //     elem.style.backgroundColor = `rgba(`+rgba.r+','+rgba.g+','+rgba.b+','+rgba.a+')';
  //     commonList.BackColor = `rgba(`+rgba.r+','+rgba.g+','+rgba.b+','+rgba.a+')';
  //     let wrap = document.getElementById('canvas-wrap')
  //     wrap.style.backgroundColor = commonList.BackColor
  //   }
  // })
  //仪表板配置图片上传
  layui.use('upload', function () {
    var upload = layui.upload;
    //执行实例
    var uploadInst = upload.render({
      elem: '#dashboardImg',
      url: 'https://httpbin.org/post',
      accept: 'images',
      acceptMime: 'image/*',
      size: 1024 * 2,
      done: function (res) {
        // $("#dashboardImg").src = res.files.file
        commonList.BackImg = res.files.file
        $("#dashboardImg").attr("src", res.files.file);
        canvasWrap.style.backgroundImage = `url(${res.files.file})`
        canvasWrap.style.backgroundRepeat = `norepear`
        canvasWrap.style.backgroundSize = `100% 100%`
        //上传完毕回调
      },
      error: function () {
        console.log('error')
        //请求异常回调
      }
    })
  })
  // if (JSON.stringify(currentPosNode) !== "{}") {
  //   let pos = $("#attrPosition")[0];
  //   pos.value = currentPosNode.name
  // }
  bindSelectEvent()
}

function changeGuide(event) {
  commonList.GuideWidth =  event.target.value.split('*')[0].trim()
  commonList.GuideHeight =  event.target.value.split('*')[1].trim()
  if (commonList.GuideWidth === '0' && commonList.GuideHeight === '0') {
    $('#across-line').css('display', 'none')
    $('#vertical-line').css('display', 'none')
  } else {
    $('#across-line').css('display', 'block')
    $('#vertical-line').css('display', 'block')
  }
  $('#across-line').css({ /* 横线 */
    top: commonList.IsShowCustoms ? commonList.CustomHeight + 'px' : commonList.GuideHeight + 'px',
    width: commonList.IsShowCustoms ? commonList.CustomWidth + 'px' : commonList.GuideWidth + 'px'
  })
  $('#vertical-line').css({ /* 竖线 */
      left: commonList.IsShowCustoms ? commonList.CustomWidth + 'px' : commonList.GuideWidth + 'px',
      height: commonList.IsShowCustoms ? commonList.CustomHeight + 'px' : commonList.GuideHeight + 'px'
  })
}

function showGuide () {
  if ($('#custom-guide').css('display') === 'none') {
    $('#custom-guide').css('display', 'block')
    $('#across-line').css('display', 'block')
    $('#vertical-line').css('display', 'block')
    commonList.IsShowCustoms = true
  } else {
    $('#custom-guide').css('display', 'none')
    commonList.IsShowCustoms = false
  }
  $('#across-line').css({ /* 横线 */
    top: commonList.IsShowCustoms ? commonList.CustomHeight + 'px' : commonList.GuideHeight + 'px',
    width: commonList.IsShowCustoms ? commonList.CustomWidth + 'px' : commonList.GuideWidth + 'px'
  })
  $('#vertical-line').css({ /* 竖线 */
    left: commonList.IsShowCustoms ? commonList.CustomWidth + 'px' : commonList.GuideWidth + 'px',
    height: commonList.IsShowCustoms ? commonList.CustomHeight + 'px' : commonList.GuideHeight + 'px'
  })
}

function changeCustom(event, type) {
  if (event.target.value <= 0) {
    event.target.value = 0
  }

  let value = event.target.value
  if (type === 'W') {
    commonList.CustomWidth = value
  } else if (type === 'H') {
    commonList.CustomHeight = value
  }

  $('#vertical-line').css({ /* 竖线 */
    left: commonList.IsShowCustoms ? commonList.CustomWidth + 'px' : commonList.GuideWidth + 'px',
    height: commonList.IsShowCustoms ? commonList.CustomHeight + 'px' : commonList.GuideHeight + 'px'
  })

  $('#across-line').css({ /* 横线 */
    top: commonList.IsShowCustoms ? commonList.CustomHeight + 'px' : commonList.GuideHeight + 'px',
    width: commonList.IsShowCustoms ? commonList.CustomWidth + 'px' : commonList.GuideWidth + 'px'
  })
  
}

// 数值显示 && 读写框
function changeChecked(e, index, type) {
  if (type === 'dbl') {
    Controls.ControlList[index].dblCheck = e.target.checked

  } else if (type === 'con') {
    Controls.ControlList[index].conCheck = e.target.checked
  }

}
// 仪表板位置树打开事件
async function openTreeAttr(e) {
  let position = $('#attrPosition')
  let posOffset = $("#attrPosition").offset();
  let collpase = document.getElementById('common-Content')
  collpase.style.height = '470px'
  await $("#attrwrap").css({
    left: posOffset.left + "px",
    top: posOffset.top + position.outerHeight() + "px"
  }).slideDown("fast");
  await $("body").bind("mousedown", onBodyDown);
  // let node = posTree.getNodeByParam("name", currentPosNode.name, null);
  posTree.selectNode(commonList.TreeNode)
  collpase.style.height = '470px'
}
// 仪表板位置树关闭事件
function hideTreeAttr() {
  $("#attrwrap").fadeOut("fast");
  $("body").unbind("mousedown", onBodyDown);
  let collpase = document.getElementById('common-Content')
  collpase.style.height = '220px'
}

// 关闭事件
function onBodyDown(event) {
  if (!(event.target.id == "menuBtn" || event.target.id == "menuContentFenzu" || $(event.target).parents("#menuContentFenzu").length > 0)) {
    if (!([...event.target.classList].includes('noline_close') || [...event.target.classList].includes('noline_open'))) {
      hideTreeAttr()
    }
  }
}
// 获取仪表板设置位置树
async function getCommonPosTree() {
  /*
  await request.get(`bi/${appId}/groups`, {
    params: {
      appId
    }
  }).then(res => {
    positionData = res.data.data
    if (positionData) {
      positionData.forEach(item => {
        if (item.nodeType !== 'panel') {
          item.nocheck = true
          item.icon = "./styles/iconTool/icon_file.png"
        } else {
          item.icon = "./styles/iconTool/icon_monitor_nor.png"
        }
      })
      $.fn.zTree.init($("#treeAttr"), positionSetting, positionData);
      posTree = $.fn.zTree.getZTreeObj("treeAttr");
      currentPosNode = posTree.getNodeByParam("name", commonList.Position, null);
    }
    // currentPosNode = Controls.TreeNode
  })*/
}
// 关闭下拉框
function hideDrop(e) {
  e.preventDefault()
  // let suffix = e.target.parentElement.lastElementChild.firstElementChild.firstElementChild
  // if (suffix) {
  //   suffix.classList.remove('is-reverse')
  //   e.target.parentElement.parentElement.lastElementChild.style.display = 'none'
  // }
  let items = document.querySelectorAll('#canvas ul.select-dropdown')
  let icons = document.querySelectorAll('.input-suffix-inner i')
  items.forEach(item => {
    item.style.display = 'none'
  })
  icons.forEach(item => {
    item.classList.remove('is-reverse')
  })

}
//仪表板背景方法
function choiceBack(e, type) {
  // if ($('.colordiv')) {
  //   if($('.colordiv').length>=15){
  //     for (let i = 15; i < $('.colordiv').length; i++) {
  //       $('.colordiv')[i].remove()
  //     }
  //   }
   
  // }
  let color = document.getElementById('backColor')
  let img = document.getElementById('dashboardImg')
  let canvasWrap = document.getElementById('canvas-wrap')
  if (type === 'img') {

    img.style.display = 'block'
    color.style.display = 'none'
    commonList.BackSetting = 'img'
    // commonList.BackColor = '#f6f6f6'
    canvasWrap.style.backgroundColor = '#f6f6f6'
    canvasWrap.style.backgroundRepeat = `norepear`
    canvasWrap.style.backgroundSize = `100% 100%`
    canvasWrap.style.backgroundImage = commonList.BackImg == './imgs/defuleUpload.png' ? '' : `url(${commonList.BackImg})`
  } else {

    img.style.display = 'none'
    color.style.display = 'block'
    commonList.BackSetting = 'color'
    //  commonList.BackImg = 'none'
    canvasWrap.style.backgroundColor = commonList.BackColor
    canvasWrap.style.backgroundImage = 'none'
    if($('#backColor_color')){
      $('#backColor_color').remove()
    }
    setTimeout(()=>{
      Colorpicker.create({
        el: "backColor",
        color: commonList.BackColor,
        change: function (elem, hex, rgba) {
          elem.style.backgroundColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')';
          commonList.BackColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')';
          let wrap = document.getElementById('canvas-wrap')
          wrap.style.backgroundColor = commonList.BackColor
        }
      })

    },100)
   
  }
}
//框体背景方法
function choiceBack1(e, type, index) {
  let firstbgcolor = 1
  let rectTypes = ['solidrectangle', 'titleCom']
  // if ($('.colordiv')) {
  //   if($('.colordiv').length>=15){
  //     for (let i = 15; i < $('.colordiv').length; i++) {
  //       $('.colordiv')[i].remove()
  //     }
  //   }
   
  // }
  let color = document.getElementById('backColor' + index)
  let img = document.getElementById('dashboardImg1')
  Controls.ControlList[index].PropertyList.BackSetting = type
  if (type == 'img') {
    img.style.display = 'block'
    color.style.display = 'none'
    // commonList.BackSetting = 'img'
    // commonList.BackColor = '#fff'
    // Controls.ControlList[index].PropertyList.BackColor = '#fff'
    Controls.ControlList[index].PropertyList.BackImg = img.src.indexOf('defuleUpload.png') > -1 ? '' : img.src

  } else {

    img.style.display = 'none'
    color.style.display = 'block'
    $("#dashboardImg1")[0].src = Controls.ControlList[index].PropertyList.BackImg
    // Controls.ControlList[index].PropertyList.BackImg = ''
    Controls.ControlList[index].PropertyList.BackColor = $("#backColor" + index).css("background-color")
    // Controls.ControlList[index].PropertyList.BackImg = e.target.attr(src)

  }
  childElement(index)
  let types = ['solidellipse', 'solidrectangle', 'titleCom']
  if (types.includes(Controls.ControlList[index].ControlType)) {
    if ($(`#backColor${index}_color`)) {
      $(`#backColor${index}_color`).remove()
    }
    if (type !== 'img') {
      setTimeout(() => {
        Colorpicker.create({
          el: "backColor" + index,
          color: Controls.ControlList[index].PropertyList.BackColor,
          change: function (elem, hex, rgba) {
            elem.style.backgroundColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')';
            Controls.ControlList[index].PropertyList.BackColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')';
            // childElement(index, 'init',all)
            if(firstbgcolor !== 1){
              // back(selectdata, Controls)
              // childElement(index, 'init',all)
            
            }
            firstbgcolor++
            if ((data.ControlType != 'piechart' && data.ControlType != 'dashboardchart' && data.ControlType != 'barchart' && data.ControlType != 'linechart')) {
              // childElement(index,'init')
              // if (Controls.ControlList[index].title == '静态文本' || Controls.ControlList[index].title == '动态文本' || Controls.ControlList[index].title == '读写框') {
              //   $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).find('input').css('backgroundColor', `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')')
              // } else {
              //   $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).css('backgroundColor', `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')')
              // }
              if ($(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).find('input').length > 0) {
                // if (Controls.ControlList[index].title == '静态文本' || Controls.ControlList[index].title == '动态文本' || Controls.ControlList[index].title == '读写框') {
                $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).find('input').css('backgroundColor', `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')')
              } else if ($(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).find('textarea').length > 0) {
                $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).find('textarea').css('backgroundColor', `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')')
              } else if (rectTypes.includes(Controls.ControlList[index].ControlType)) {
                if (Controls.ControlList[index].PropertyList.BackSetting !== 'img') {
                  // 颜色需要背景色
                  $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).css('backgroundColor', `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')')
                }
              } else {
                if (Controls.ControlList[index].ControlType === 'statictextblock' || Controls.ControlList[index].ControlType === 'dynamictext') { // 静态文本 动态文本
                  $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}] div`).css('backgroundColor', `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')')
                } else {
                  $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).css('backgroundColor', `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')')
                }
              }

            }
          }
        })
      }, 100)
    }
  }

}

function choicePermission(type) {
  let custom = document.getElementById('custom-permission')
  cloneDepart = []
  cloneJob = []
  clonePeople = []
  if (type === 'custom') {
    custom.style.display = 'block'
  } else {
    permissionList = []
    jobArr = []
    checkDeptArr = []
    peopleArr = []
    currentPeopleNode = {}
    $('#viewTpl').html('')
    $('#viewTpl2').html('')
    $('#viewTpl3').html('')
    $('#z-selectDeptInp').val('')
    custom.style.display = 'none'
  }
  commonList.Permision = type
  permissionData.accessType = type
  // 需要初始化一下折叠面板的高度 1为初始化第二个面板
  initCollpase(1)
}
// 描述
function addDescription(e) {
  commonList.Description = e.target.value
}
// 下拉框绑定事件
function bindSelectEvent() {
  let drops = [...document.getElementsByClassName('select-dropdown')]
  drops.forEach(item => {
    item.addEventListener('mousedown', selectDroopValue)
  })
}

function selectDroopValue(e) {
  e.stopPropagation()
  if (e.target !== e.currentTarget) {
    let input = e.currentTarget.parentElement.firstElementChild.firstElementChild
    let items = [...e.currentTarget.children]
    let suffix = e.currentTarget.parentElement.firstElementChild.lastElementChild.lastElementChild
    input.value = e.target.innerText
    items.forEach(item => {
      if (item.innerText === e.target.innerText) {
        item.classList.add('selected')
        // 此处使用jq移除兄弟元素的class
        $(item).siblings().removeClass('selected')
      }
    })
    suffix.classList.remove('is-reverse')
    e.currentTarget.style.display = 'none'
  }
}
// 选择下拉内容
function choiceLineType(e, index) {
  e.stopPropagation()
  Controls.ControlList[index].PropertyList.Style = e.target.value
  childElement(index)
}

function copeSetting(e, type) {
  e.stopPropagation()

  if (type === 'others') { //其他仪表板复制
    $.fn.zTree.init($("#treeCopeto"), otherSetting, otherData);
    layer.open({
      type: 1,
      title: ['选择从哪个看板复制权限配置', 'font-weight: 500;font-size: 16px;color: #FFFFFF;background: #409EFF;text-align:center;'],
      closeBtn: 1,
      btn: ['取消', '应用'],
      shadeClose: true,
      skin: 'z-addDashboard',
      content: $('.copeConfigureForm'),
      area: ['599px', '650px'],
      success: function (layero, index) {
        //完成后的回调
        request.get(`/bi/${appId}/panel-tree/copy`).then(res => {
          otherData = res.data.data
          if (otherData) {
            otherData.forEach(item => {
              if (item.nodeType !== 'panel') {
                item.nocheck = true
                item.icon = "./styles/iconTool/icon_file.png"
              } else {
                item.icon = "./styles/iconTool/icon_monitor_nor.png"
              }
            })
            $.fn.zTree.init($("#treeCopeFrom"), otherSetting, otherData);

            fromTree = $.fn.zTree.getZTreeObj('treeCopeFrom')
            fromTree.expandAll(true);

          } else {
            appTips.errorMsg(res.data.msg)
          }

        })
      },
      yes: function (index, layero) {
        layer.close(index);
      },
      btn2: function (index, layero) {
        if (JSON.stringify(currentFromNode) == "{}" || currentFromNode.nodeType == 'group') {
          appTips.warningMsg('请选择看板');
          return false
        } else {
          request.get(`/bi/${appId}/panel-permissions/${currentFromNode.id}/to-copy`).then(res => {
            if (res.data.code === 0) {
              appTips.successMsg('应用成功!')
              res.data.data.description = res.data.data.description === null ? '' : res.data.data.description
              checkDeptArr = []
              jobArr = []
              peopleArr = []
              $(`input[name='permission-radio'][id='${res.data.data.accessType}']`).prop('checked', true)
              $(`input[name='permission-radio'][id='${res.data.data.accessType}']`).siblings(`input`).removeAttr('checked')
              choicePermission(res.data.data.accessType)
              if (res.data.data.accessType === 'custom') {
                $('#custom-permission').css('display', 'block')
                let permissionNames = []
                res.data.data.customPermissions.forEach(item => {
                  permissionNames.push(item.bizName)
                  if (item.bizType === 'department') {
                    checkDeptArr.push(item)
                  } else if (item.bizType === 'position') {
                    jobArr.push(item)
                  } else if (item.bizType === 'user') {
                    peopleArr.push(item)
                  }
                })
                $("#z-selectDeptInp").val(permissionNames);
              } else {
                $('#custom-permission').css('display', 'none')
              }
              $(`#permission-description`).val(res.data.data.description)
              permissionList = res.data.data.customPermissions
              commonList.permissionList = res.data.data.customPermissions
              commonList.Description = res.data.data.description
              layer.close(index);
            } else {
              appTips.errorMsg(res.data.msg)
            }
          })
        }
      }
    });
  } else if (type === 'self') { //自己仪表板复制
    $.fn.zTree.init($("#treeCopeFrom"), selfSetting, selfData);
    let name = $('#canvasName').val()
    let postion = $('#attrPosition').val()
    if (name.trim() === '') {
      appTips.warningMsg('请先输入名称');
      return false
    }
    if (postion === '') {
      appTips.warningMsg('请先选择位置');
      return false
    }
    layer.open({
      type: 1,
      title: ['选择要将权限配置复制到的看板', 'font-weight: 500;font-size: 16px;color: #FFFFFF;background: #409EFF;text-align:center;'],
      closeBtn: 1,
      btn: ['取消', '应用'],
      shadeClose: true,
      skin: 'z-addDashboard',
      content: $('.copeConfigureTo'),
      area: ['599px', '650px'],
      success: function (layero, index) {
        //完成后的回调
        request.get(`/bi/${appId}/panel-tree/copy`).then(res => {
          if (res.data.data) {
            selfData = res.data.data
            selfData.forEach(item => {
              if (item.nodeType !== 'panel') {
                item.nocheck = true
                item.icon = "./styles/iconTool/icon_file.png"
              } else {
                item.icon = "./styles/iconTool/icon_monitor_nor.png"
              }

            })
            $.fn.zTree.init($("#treeCopeto"), selfSetting, selfData);
            toTree = $.fn.zTree.getZTreeObj('treeCopeto')
            toTree.expandAll(true)

          }

        })
      },
      btn2: function (index, layero) {
        if (currentToNode.length === 0) {
          appTips.warningMsg('请选择看板');
          return false
        } else {
          let panelName = $('#canvasName').val()
          let groupId = currentPosNode.id
          let description = $('#permission-description').val()
          let accessType = $("input[name='permission-radio']:checked").attr('id')
          if (accessType === 'custom') {
            if (permissionList.length === 0) {
              appTips.warningMsg('请设置访问权限');
              return false
            }
          }
          let panelIds = []
          currentToNode.forEach(item => {
            panelIds.push(item.id)
          })
          let paramsData = panelIds.join()
          permissionData = {
            panelName,
            groupId,
            accessType,
            panelId,
            description,
            customPermissions: permissionList
          }
          request.post(`/bi/${appId}/panel-permissions/copy-to?panelIds=${paramsData}`, permissionData).then(res => {
            if (res.data.code === 0) {
              appTips.successMsg('应用成功!')
              layer.close(index);
            } else {
              appTips.errorMsg(res.data.msg)
            }
          })
        }
      }
    });

  }
}
// self
var ConfigureFromidsArr = ''
var ConfigureToidsArr = ''
//Y 属性定义 checkbox 被勾选后的情况； 
//N 属性定义 checkbox 取消勾选后的情况； 
//"p" 表示操作会影响父级节点； 
//"s" 表示操作会影响子级节点。
function onCheck(e, treeId, treeNode) {
  var treeObj = $.fn.zTree.getZTreeObj("treeCopeto"),
    nodes = treeObj.getCheckedNodes(true),
    v1 = "";
  h1 = "";
  for (var i = 0; i < nodes.length; i++) {
    v1 += nodes[i].name + ",";
    h1 += nodes[i].id + ",";
  }
  ConfigureToidsArr = h1;
  ConfigureToidsArr = ConfigureToidsArr.slice(0, -1);
}
// other

function onCheckRaido(e, treeId, treeNode) {
  var treeObj = $.fn.zTree.getZTreeObj("treeCopeFrom"),
    nodes = treeObj.getCheckedNodes(true),
    v2 = "";
  h2 = "";
  for (var i = 0; i < nodes.length; i++) {
    v2 += nodes[i].name + ",";
    h2 += nodes[i].id + ",";
  }

  ConfigureFromidsArr = h2;
  ConfigureFromidsArr = ConfigureFromidsArr.slice(0, -1);
}
// 折叠面板事件
// 初始化
function initCollpase(i) {
  // if ($('.colordiv')) {
  //   if($('.colordiv').length>=15){
  //     for (let i = 15; i < $('.colordiv').length; i++) {
  //       $('.colordiv')[i].remove()
  //     }
  //   }
   
  // }
  let Colls = document.querySelectorAll('.dashboard-collpase .bi-collapse-title')
  // if (!i && i !== 0) {
  //   // 全部初始化

  //   Colls.forEach((e, index) => {
  //     e.nextElementSibling.style.height = e.nextElementSibling.firstElementChild.offsetHeight + 20 + 'px'
  //     // e.nextElementSibling.style.display = 'block'
  //   })
  // } else {
  //   // 单个面板初始化
  //   Colls.forEach((e, index) => {
  //     if (i === index) {
  //       e.nextElementSibling.style.height = e.nextElementSibling.firstElementChild.offsetHeight + 20 + 'px'
  //       // e.nextElementSibling.style.display = 'block'
  //     }
  //   })
  // }
}
// 折叠事件
function toggleCollpase(e) {
  let content = e.currentTarget.nextElementSibling
  let height = content.firstElementChild.offsetHeight + 20
  let icon = e.currentTarget.firstElementChild
  let style = window.getComputedStyle(content)

  if (content.style.display != 'none') {
    // content.style.height = '0px'
    // $(content).fadeOut()
    content.style.display = 'none'
    icon.style.transform = 'rotate(0deg)'
  } else {
    // content.style.height = height + 'px';
    content.style.display = 'block'

    icon.style.transform = 'rotate(180deg)'
  }
  // $(content).slideToggle(100)

}

function bardown(index) {
  let scroll = document.getElementById('scroll')
  let bar = document.getElementById('bar')
  let mask = document.getElementById('mask')
  let scrollReact = scroll.getBoundingClientRect()
  let startX = scrollReact.left

  let move = moveEvent => {
    moveEvent.stopPropagation()
    moveEvent.preventDefault()
    let currX = moveEvent.clientX
    let barleft = currX - startX
    if (barleft < 0) {
      barleft = 0;
    } else if (barleft > scroll.offsetWidth - bar.offsetWidth) {
      barleft = scroll.offsetWidth - bar.offsetWidth;
    }
    Controls.ControlList[index].PropertyList.Opacity = parseInt(barleft / 169 * 100)
    bar.style.left = barleft + 'px'
    mask.style.width = barleft + 'px'
    var input = document.querySelector('.r-opacity .r-pos-input')
    input.value = parseInt(barleft / 169 * 100)
    childElement(index)
  }
  let up = () => {
    document.removeEventListener('mousemove', move, true)
    document.removeEventListener('mouseup', up, true)
  }
  document.addEventListener('mousemove', move, true)
  document.addEventListener('mouseup', up, true)
  return true
}
// 检视:画布 内容
function setCanvasName(e) {
  if (e.target.value.length > 30) {
    appTips.warningMsg('看板名称最多30个汉字')
  }
  commonList.Name = e.target.value
  initCommon()
}

// 右侧属性栏公共样式
function rightCommon(title, name, index) {
  let titles = ['静态图片', '矩形', '圆形', '标题', '直线', '静态文本', '跳转链接', '查询按钮', '重置按钮']
  let commonGroup = document.getElementById('common-group')
  let commonStr = ``
  // <input type="text" class="r-input" onblur="handleblur(event, ${index}, 'Name')" value="${name}" />
  if (titles.includes(title)) {
    commonStr = `<div class="r-btns">
      <div id="r-btns-style" class="active">样式</div>
    </div>`
  } else {
    commonStr = `<div class="r-btns">
      <div id="r-btns-event" class="${Controls.ControlList[index].TabEvent === 'event'?'active' : '' }" onclick="choice('event', ${index})">数据</div>
      <div id="r-btns-style" class="${Controls.ControlList[index].TabEvent === 'style'?'active' : '' }" onclick="choice('style', ${index})" >样式</div>
    </div>`
  }
  commonGroup.innerHTML = commonStr
}
// 字体
function changeText(e, index, prop) {
    Controls.ControlList[index].PropertyList[prop] = e.target.value.trim()  
    childElement(index)
    setClass(Controls.ControlList[index].PropertyList.ZIndex)
}

// 文本查询、数值查询input失去焦点事件
function changeTextData(e, index, prop) {
    Controls.ControlList[index].PropertyList[prop] = e.target.value.trim()  
}
// 聚焦
function handleFocus(e, index) {
  // laydate.render({
  //   elem: '#date' + index, //指定元素
  //   type: 'datetime',
  //   value: Controls.ControlList[index].Date,
  //   done: function (value, date, endDate) {
  //     Controls.ControlList[index].Date = value
  //   }
  // });
}
// 设置阴影
function setShadow(e, index) {
  if (e.target.title === '内阴影') {
    if (Controls.ControlList[index].PropertyList.BoxShadow && Controls.ControlList[index].PropertyList.BoxShadow.length > 0) {
      Controls.ControlList[index].PropertyList.BoxShadow = ''
    } else {
      Controls.ControlList[index].PropertyList.BoxShadow = '0px 0px 10px #666 inset'
    }

  } else if (e.target.title === '外阴影') {
    if (Controls.ControlList[index].PropertyList.BoxShadow && Controls.ControlList[index].PropertyList.BoxShadow.length > 0) {
      Controls.ControlList[index].PropertyList.BoxShadow = ''
    } else {
      Controls.ControlList[index].PropertyList.BoxShadow = '0px 0px 10px #666'
    }
  }
  childElement(index)
}

// 线宽聚焦
function pixelFocus(e, index, prop) {
  if (e.currentTarget.value == '') {
    e.currentTarget.value = '0'
  }
  e.currentTarget.value = parseInt(e.currentTarget.value)
}

function inputdown(e, ev, index) {

  let wantindex = index
  for (let i = 0; i < Controls.ControlList.length; i++) {
    if (Controls.ControlList[i].PropertyList.ZIndex == wantindex) {
      wantindex = i
      break;
    }
  }


  if (Controls.ControlList[wantindex].TabEvent === 'style') { // 此处添加判断，type为event事件时不需要刷新内容
    if ($(e).siblings().length == 0) {
      changeCommon({
        ...Controls.ControlList[wantindex].PropertyList,
        ControlType: Controls.ControlList[wantindex].ControlType
      }, wantindex)
      rightCommon(Controls.ControlList[wantindex].title, null, wantindex)

      ev.stopPropagation()


    }
  }

}
// 跳转链接 -- 打开仪表板 
function openJump(e, index) {
  $('#jumpPop').css('display', 'block')
  request.get(`/bi/${appId}/panel-tree`).then(res => {
    if (res.data.data) {
      jumpData = res.data.data
      jumpIndex = index
      jumpData.forEach(item => {
        if (item.nodeType != 'panel') {
          item.icon = "./styles/iconTool/icon_file.png"

        } else {
          item.icon = "./styles/iconTool/icon_monitor_nor.png"
        }
      })
      $.fn.zTree.init($("#jumptree"), jumpSetting, jumpData);
      let zTree = $.fn.zTree.getZTreeObj("jumptree")
      zTree.expandAll(true);
    }

  })
}

function closeJump() {
  $('#jumpPop').css('display', 'none')
}

function confirmJump() {

}

function searchJumpTree(e) {
  let postData = {
    appId,
    name: e.target.parentElement.firstElementChild.value
  }
  request.get(`/bi/${appId}/panel-tree/search`, {
    params: postData
  }).then(res => {
    if (res.data.data) {
      jumpData = res.data.data
      jumpData.forEach(item => {
        if (item.nodeType != 'panel') {
          item.icon = "./styles/iconTool/icon_file.png"

        } else {
          item.icon = "./styles/iconTool/icon_monitor_nor.png"
        }
      })
      $.fn.zTree.init($("#jumptree"), jumpSetting, jumpData);

    }

  })
}


// 样式赋值
function handleblur(e, index, prop, type) {
  let wantindex = index
  if (type == 'menutype') {
    wantindex = index
    for (let i = 0; i < Controls.ControlList.length; i++) {
      if (Controls.ControlList[i].PropertyList.ZIndex == wantindex) {
        wantindex = i
        break;
      }
    }
  } else {
    wantindex = index

  }
  if (keyCode == 8 && prop === 'BorderWidth' && e.target.value == '') {
    e.target.value = 0
    Controls.ControlList[wantindex].PropertyList[prop] = e.target.value
    e.target.value = 0 + '像素'
    childElement()
  }
  if (prop === 'ComName' || ![46, 8].includes(keyCode)) { // 短路
    if (prop === 'ComName') {
      if (e.target.value === Controls.ControlList[wantindex].PropertyList.ComName) {
        return
      }
      let value = Controls.ControlList[wantindex].Name.replace(/[^0-9]/ig, "")
      if (e.target.value.trim() === '') {
        appTips.tipsMsg('名称不能为空，已自动填充名称');
        e.target.value = '组件' + value
        Controls.ControlList[wantindex].PropertyList.ComName = '组件' + value
        return
      }
      let names = []
      Controls.ControlList.forEach((cf, cfi) => {
        names.push(cf.PropertyList.ComName)
      })
      if (names.includes(e.target.value.trim())) {
        appTips.tipsMsg('名称已存在，已自动填充名称');
        e.target.value = '组件' + value
        Controls.ControlList[wantindex].PropertyList.ComName = '组件' + value
      }

    }
    // if (prop !== 'Name') {
    //   Controls.ControlList[wantindex].PropertyList[prop] = e.target.value
    // } else {
    //   Controls.ControlList[wantindex].Name = e.target.value
    // }

    if (prop === 'Name') {
      Controls.ControlList[wantindex].Name = e.target.value
    } else if (prop === 'Text') {
      Controls.ControlList[wantindex].PropertyList[prop] = e.path[0].value
    } else if (prop === 'BorderWidth') {

      if (e.target.value == '') {
        e.target.value = 0
      }
      e.target.value = parseInt(e.target.value)
      e.target.value = isNaN(e.target.value) ? 0 : e.target.value
      Controls.ControlList[wantindex].PropertyList[prop] = parseInt(e.target.value)
      e.target.value = e.target.value + '像素'
      // if(selectdata<=1){
      //   setClass(wantindex)
      // }else{
      //   let tmp = []
      //   selectdata.forEach((item)=>{
      //     tmp.push(item.wantindex)
      //   })
      //   setClass(tmp)
      // }
    } else if (prop === 'Opacity') {
      Controls.ControlList[wantindex].PropertyList[prop] = e.target.value
      changeCommon({
        ...Controls.ControlList[wantindex].PropertyList,
        ControlType: Controls.ControlList[wantindex].ControlType
      }, wantindex)
    } else if (prop === 'FontSize') {
      e.target.value = e.target.value.replace(/[^0-9]/ig, "")
      if (e.target.value.trim() === '' || e.target.value < 12) {
        e.target.value = 12
      }
      Controls.ControlList[wantindex].PropertyList[prop] = e.target.value
    } else {
      Controls.ControlList[wantindex].PropertyList[prop] = e.target.value
    }
    // childElement(index,'init')
    childElement()
    if (type == 'menutype') {
      setClass(index)
    } else {
      setClass(Controls.ControlList[wantindex].PropertyList.ZIndex)

    }




  }
  if (prop === 'FontSize') {
    e.target.value = e.target.value.replace(/[^0-9]/ig, "")
    if (e.target.value.trim() === '' || e.target.value < 12) {
      e.target.value = 12
    }
  }
  keyCode = ''
  setTimeout(() => {
    if (Controls.ControlList[wantindex].ControlType == 'piechart') {
      PieChartDataFun()
    }
    if (Controls.ControlList[wantindex].ControlType == 'dashboardchart') {
      DashChartDataFun()
    }
    if (Controls.ControlList[wantindex].ControlType == 'barchart') {
      BarChartDataFun()
    }
    if (Controls.ControlList[wantindex].ControlType == 'linechart') {
      LineChartDataFun()
    }
  }, 300)
  //   if(type == 'linechart'){
  //     LineChartDataFun()
  //   }else if(type == 'piechart'){
  // PieChartDataFun()
  //   }else if(type == 'dashboardchart'){
  //     DashChartDataFun()
  //   }else if(type == 'barchart'){
  //     BarChartDataFun()
  //     }

}
// 修改border样式
function initBorderStyle(index) {
  let borderStyle = [...document.getElementsByClassName('pos-border-style')]
  if (borderStyle.length !== 0) {
    if (Controls.ControlList[index].PropertyList.Style === 'solid') {
      borderStyle[0].style.borderStyle = 'dashed'
    } else {
      borderStyle[0].style.borderStyle = 'solid'
    }
  }
}

function changeColor(e, index, prop) {
  Controls.ControlList[index].PropertyList[prop] = e.target.innerText
  childElement()
  if (selectdata.length <= 1) {
    // setClass(index)
    setClass(Controls.ControlList[index].PropertyList.ZIndex)
  } else {
    let tmp = []
    selectdata.forEach((item) => {
      tmp.push(item.index)
    })
    setClass(tmp)
  }
}
// 修改字体样式
function changeFont(e, index, prop) {
  if (prop === 'FontWeight') {
    if (Controls.ControlList[index].PropertyList[prop] === 'normal') {
      Controls.ControlList[index].PropertyList[prop] = 'bold'
    } else {
      Controls.ControlList[index].PropertyList[prop] = 'normal'
    }
  } else {
    if (Controls.ControlList[index].PropertyList[prop] === 'none' || Controls.ControlList[index].PropertyList[prop] === undefined) {
      Controls.ControlList[index].PropertyList[prop] = 'underline'
    } else {
      Controls.ControlList[index].PropertyList[prop] = 'none'
    }
  }
  childElement()
  if (selectdata.length <= 1) {
    // setClass(index)
    setClass(Controls.ControlList[index].PropertyList.ZIndex)
  } else {
    let tmp = []
    selectdata.forEach((item) => {
      tmp.push(item.index)
    })
    setClass(tmp)
  }
}

function changeFamily(value, index) {
  Controls.ControlList[index].PropertyList.FontFamily = value
  childElement()
  if (selectdata.length <= 1) {
    // setClass(index)
    setClass(Controls.ControlList[index].PropertyList.ZIndex)
  } else {
    let tmp = []
    selectdata.forEach((item) => {
      tmp.push(item.index)
    })
    setClass(tmp)
  }
}
// 修改文本对齐方式
function changeTextAlign(e, index, align, type = '') {
  if (type === '') { 
    Controls.ControlList[index].PropertyList.TextAlign = align
  } else if (type === 'horizontal') { //水平对齐
    Controls.ControlList[index].PropertyList.JustifyContent = align
  } else if (type === 'vertical') { // 垂直对齐
    Controls.ControlList[index].PropertyList.AlignItems = align
  }
  childElement()
  changeCommon({
    ...Controls.ControlList[index].PropertyList,
    ControlType: Controls.ControlList[index].ControlType
  }, index)
  if (selectdata.length <= 1) {
    // setClass(index)
    setClass(Controls.ControlList[index].PropertyList.ZIndex)
  } else {
    let tmp = []
    selectdata.forEach((item) => {
      tmp.push(item.index)
    })
    setClass(tmp)
  }
}
//修改图片
function changeImg(value, index) {
  // Controls.ControlList[index].PropertyList.Img = `./imgs/${value}.jpg`
  Controls.ControlList[index].PropertyList.Img = value
  childElement()
  if (selectdata.length <= 1) {
    // setClass(index)
    setClass(Controls.ControlList[index].PropertyList.ZIndex)
  } else {
    let tmp = []
    selectdata.forEach((item) => {
      tmp.push(item.index)
    })
    setClass(tmp)
  }
}
// 右侧属性栏变化样式
function changeCommon(data, index, text,all) {
  var firstfcolor = 1;
  var firstbcolor = 1;
  var firstbgcolor = 1;
  console.log(window.event)
  if (text !== 'init') {
    // if ($('.colordiv')) {
    //   for (let i = 0; i < $('.colordiv').length; i++) {
    //     $('.colordiv')[i].remove()
    //   }
    // }
    // if ($('.colordiv')) {
    //   if($('.colordiv').length>=15){
    //     for (let i = 15; i < $('.colordiv').length; i++) {
    //       $('.colordiv')[i].remove()
    //     }
    //   }
     
    // }
  }
  let changeGroup = document.getElementById('change-group')
  let lines = lineList.map(d => {
    return `<li id="${d.id}" class="dropdown-item ${d.id === data.Style ? 'selected' : ''}">${d.name}</li>`
  }).join('')
  // 添加折叠面版
  let changeStr = `
  <div class="dashboard-collpase" >
    <div class="bi-collapse">
    <div class="bi-collapse-title" onclick="toggleCollpase(event)">基本信息<i class="iconfont iconxialajiantou" ></i></div>
  `
  if (data.ControlType === 'solidrectangle') { //矩形样式
    //角度0 角度组件名1   字体2  填充3  圆角4 阴影5 对齐方式6 边框7 圆形边框8 匹配模式9
    // 提示内容10  开启查询11  
    changeStr += getCenterHtml1(index, data, [12, 15, 18])
    changeStr += getBorderHtml(index, data)
  } else if (data.ControlType === 'titleCom') { // 标题样式
    changeStr += getCenterHtml1(index, data, [12, 15, 18])
    changeStr += getBorderHtml(index, data)
  } else if (data.ControlType === 'line') { //直线样式
    //角度0 角度组件名1   字体2  填充3  圆角4 阴影5 对齐方式6 边框7 圆形边框8 匹配模式9
    // 提示内容10  开启查询11  
    changeStr += getCenterHtml1(index, data, [15])
    changeStr += getBorderHtml(index, data)
  } else if (data.ControlType === 'staticimage') { //静态图片
    if (data.ControlType === 'staticimage') { //静态图片
      changeStr += getImgHtml(index, data, lines)
    }
  } else if (data.ControlType === 'image') { //动态图片
    changeStr += getImgHtml(index, data, lines)
  } else if (data.ControlType === 'datatextblock') { //数值显示
    //  changeStr += getCenterHtml(index,data)
    //角度组件名1   字体2  填充3  圆角4 阴影5 对齐方式6 边框7 圆形边框8 匹配模式9
    // 提示内容10  开启查询11  
    changeStr += getCenterHtml1(index, data, [15,2,19,3])
    changeStr += getBorderHtml(index, data)
  } else if (data.ControlType === 'statictextblock') { //静态文本
    // changeStr += getCenterHtml(index,data)
    //角度组件名1   字体2  填充3  圆角4 阴影5 对齐方式6 边框7 圆形边框8 匹配模式9
    // 提示内容10  开启查询11  
    changeStr += getCenterHtml1(index, data, [1, 2, 3, 19])
    changeStr += getBorderHtml(index, data)
  } else if (data.ControlType === 'dynamictext') { //动态文本
    // <input class="pos-select pos-input" onblur="changeText(event, ${index}, 'Text')" value=${data.Text} />
    // changeStr += getCenterHtml(index,data)
    //角度组件名1   字体2  填充3  圆角4 阴影5 对齐方式6 边框7 圆形边框8 匹配模式9
    // 提示内容10  开启查询11  
    changeStr += getCenterHtml1(index, data, [1, 2, 3, 19])
    changeStr += getBorderHtml(index, data, lines)
  } else if (data.ControlType === 'solidellipse') { //圆形

    // changeStr+= getCenterHtml(index, data,lines)
    //角度组件名1   字体2  填充3  圆角4 阴影5 对齐方式6 边框7 圆形边框8 匹配模式9
    // 提示内容10  开启查询11  
    changeStr += getCenterHtml1(index, data, [12, 15, 18])
    changeStr += getBorderHtml(index, data)
  } else if (data.ControlType === 'ellipselamp') { //圆形状态灯
    // changeStr+= getCenterHtml(index, data)
    //角度组件名1   字体2  填充3  圆角4 阴影5 对齐方式6 边框7 圆形边框8 匹配模式9
    // 提示内容10  开启查询11  
    changeStr += getCenterHtml1(index, data, [15])
    changeStr += getBorderHtml(index, data)
  } else if (data.ControlType === 'commonlamp') { //矩形状态灯
    // changeStr+= getCenterHtml(index, data)
    //角度组件名1   字体2  填充3  圆角4 阴影5 对齐方式6 边框7 圆形边框8 匹配模式9
    // 提示内容10  开启查询11  
    changeStr += getCenterHtml1(index, data, [15])
    changeStr += getBorderHtml(index, data)
  } else if (data.ControlType === 'cornerbutton') { //控制按钮
    // changeStr += getCenterHtml(index, data)
    //角度组件名1   字体2  填充3  圆角4 阴影5 对齐方式6 边框7 圆形边框8 匹配模式9
    // 提示内容10  开启查询11  
    changeStr += getCenterHtml1(index, data, [1, 2, 3, 6])
    changeStr += getBorderHtml(index, data)
  } else if (data.ControlType === 'rwtextbox') { //读写框
    // changeStr += getCenterHtml(index, data)
    //角度组件名1   字体2  填充3  圆角4 阴影5 对齐方式6 边框7 圆形边框8 匹配模式9
    // 提示内容10  开启查询11  
    changeStr += getCenterHtml1(index, data, [1, 2, 3, 6])
    changeStr += getBorderHtml(index, data)
  } else if (data.ControlType === 'jumplink') { //跳转链接
    //角度组件名1   字体2  填充3  圆角4 阴影5 对齐方式6 边框7 圆形边框8 匹配模式9
    // 提示内容10  开启查询11  
    changeStr += getCenterHtml1(index, data, [1, 2, 3, 14])
  } else if (data.ControlType === 'textsearch') { //文本查询)
    //角度组件名1   字体2  填充3  圆角4 阴影5 对齐方式6 边框7 圆形边框8 匹配模式9
    // 提示内容10  开启查询11  
    changeStr += getCenterHtml1(index, data, [13, 3, 6, 2])
    changeStr += getBorderHtml(index, data)
    changeStr += `
    <div class="bi-collapse-title" onclick="toggleCollpase(event)">功能设置<i class="iconfont iconxialajiantou" ></i></div>
  `
    changeStr += getCenterHtml1(index, data, [9, 10, 11], 1)
  } else if (data.ControlType === 'associatedatetimepicker') { //日期时间
    //角度组件名1   字体2  填充3  圆角4 阴影5 对齐方式6 边框7 圆形边框8 匹配模式9
    // 提示内容10  开启查询11  
    changeStr += getCenterHtml1(index, data, [1, 2, 3, 6])
    changeStr += getBorderHtml(index, data)
    changeStr += `
    <div class="bi-collapse-title" onclick="toggleCollpase(event)">功能设置<i class="iconfont iconxialajiantou" ></i></div>
  `
    changeStr += getCenterHtml1(index, data, [11], 1)
  } else if (data.ControlType === 'datasearch') { // 数值查询
    //角度组件名1   字体2  填充3  圆角4 阴影5 对齐方式6 边框7 圆形边框8 匹配模式9
    // 提示内容10  开启查询11  不透明度12
    changeStr += getCenterHtml1(index, data, [1, 2, 6])
    changeStr += getBorderHtml(index, data)
    changeStr += `
    <div class="bi-collapse-title" onclick="toggleCollpase(event)">功能设置<i class="iconfont iconxialajiantou" ></i></div>
  `
    changeStr += getCenterHtml1(index, data, [11], 1)
  } else if (data.ControlType === 'dropsearch') { //下拉查询
    //角度组件名1   字体2  填充3  圆角4 阴影5 对齐方式6 边框7 圆形边框8 匹配模式9
    // 提示内容10  开启查询11  不透明度12
    changeStr += getCenterHtml1(index, data, [15, 3])
    changeStr += getBorderHtml(index, data)
    changeStr += `
    <div class="bi-collapse-title" onclick="toggleCollpase(event)">功能设置<i class="iconfont iconxialajiantou" ></i></div>
  `
    changeStr += getCenterHtml1(index, data, [11], 1)
  } else if (data.ControlType === 'searchbutton') { //查询按钮
    //角度组件名1   字体2  填充3  圆角4 阴影5 对齐方式6 边框7 圆形边框8 匹配模式9
    // 提示内容10  开启查询11  不透明度12
    changeStr += getCenterHtml1(index, data, [1, 2, 3, 6])
    changeStr += getBorderHtml(index, data)
    changeStr += `
    <div class="bi-collapse-title" onclick="toggleCollpase(event)">功能设置<i class="iconfont iconxialajiantou" ></i></div>
  `
    changeStr += getCenterHtml1(index, data, [17], 1)

  } else if (data.ControlType === 'resetbutton') { //重置按钮
    //角度组件名1   字体2  填充3  圆角4 阴影5 对齐方式6 边框7 圆形边框8 匹配模式9
    // 提示内容10  开启查询11  不透明度12
    changeStr += getCenterHtml1(index, data, [1, 2, 3])
    changeStr += getBorderHtml(index, data)

  } else if (data.ControlType === 'piechart') {
    changeStr += getCenterHtml1(index, data, [15])
    changeStr += `<div class="pos-group pos-iframe">
         <div style="width:100%; height: 1160px" class="pieBox">
                <iframe id="pie" name="pie" style="width:100%;height:1160px;border:none" src="./饼图/饼图.html"></iframe>
            </div>
               </div>`
    // <iframe id="pie" style="width:100%;height:100%;border:none" src="./饼图/饼图.html"></iframe>
  } else if (data.ControlType === 'dashboardchart') {
    changeStr += getCenterHtml1(index, data, [15])
    changeStr += `<div class="pos-group pos-iframe">
           
            <div style="width:100%;height: 910px" class="pieBox">
            <iframe id="dash" name="dash" style="width:100%;height: 910px;border:none" src="./仪表盘/仪表盘.html"></iframe>
            </div>
          </div>`
  } else if (data.ControlType === 'barchart') {
    changeStr += getCenterHtml1(index, data, [15])
    changeStr += `<div class="pos-group pos-iframe">
           
            <div style="width:100%;height: 2021px" class="pieBox">
              <iframe id="barId" name="barId" style="width:100%;height: 2021px;border:none" src="./柱形图/柱形图.html"></iframe>
            </div>
          </div>`
  } else if (data.ControlType === 'linechart') {
    changeStr += getCenterHtml1(index, data, [15])
    changeStr += `<div class="pos-group pos-iframe">
           
            <div style="width:100%;height: 1950px" class="pieBox">
              <iframe id="line" name="lineEchart" style="width:100%;height: 1950px;border:none" src="./折线图/折线图.html"></iframe>
            </div>
          </div>`
  }
  //折叠面板结束标签
  changeStr += `</div>
      </div>
    `

  if (text == 'init') {
    $('#Cwidth').val(data.Width)
    $('#Cheight').val(data.Height)
    $('#Cleft').val(data.Left)
    $('#Ctop').val(data.Top)
  }
  if (text != 'init') {
    changeGroup.innerHTML = changeStr
    if(all!=='all'){
      
      childElement(index, 'init',undefined,'noback')
    }
   
    setTimeout(() => {
      changeGroup.innerHTML = changeStr
      initCollpase()
      initBorderStyle(index)
      bindSelectEvent()

      setTimeout(() => {
        changeGroup.innerHTML = changeStr

      })



      if (Controls.ControlList[index].PropertyList.BorderColor) { // 判断是否有此属性值，有则渲染颜色选择去
        if($('#borderColor'+index+'_color')){
          $('#borderColor'+index+'_color').remove()
        }
          setTimeout(() => {

            Colorpicker.create({
              el: "borderColor" + index,
              color: Controls.ControlList[index].PropertyList.BorderColor,
              change: function (elem, hex, rgba) {
              
                elem.style.backgroundColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')';
                elem.style.background = 'linear-gradient(to bottom right,transparent 0%,transparent calc(50% - 1px),rgba(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ') 50%, transparent calc(50% + 1px),transparent 100%)'
                Controls.ControlList[index].PropertyList.BorderColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')';
                // childElement(index, 'init',all)
                if(firstbcolor !== 1){
                  // back(selectdata, Controls)
                  // childElement(index, 'init',all)
                  // firstbcolor++
                }
                firstbcolor++
                if ((data.ControlType != 'piechart' && data.ControlType != 'dashboardchart' && data.ControlType != 'barchart' && data.ControlType != 'linechart')) {
                  // 
                  // 动态文本特殊处理
                  // if (Controls.ControlList[index].ControlType === "dynamictext") {
                  //   $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}] .moduleShape`).find('input').css('borderColor', `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')')
                  // } else {
                  if ($(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).find('input').length > 0) {
                    // if (Controls.ControlList[index].title == '静态文本' || Controls.ControlList[index].title == '动态文本' || Controls.ControlList[index].title == '读写框') {
                    $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).find('input').css('borderColor', `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')')
                  } else if ($(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).find('textarea').length > 0) {
                    $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).find('textarea').css('borderColor', `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')')
                  } else {
                    $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).css('borderColor', `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')')
                  }

                  // }
                }
              }
            })
          }, 100)

      }
      if (Controls.ControlList[index].PropertyList.BackColor) {
        if(all!=='all'){
          childElement(index, 'init',undefined,'noback')
        }
        
            if($('#backColor'+index+'_color')){
            $('#backColor'+index+'_color').remove()
          }
        let rectTypes = ['solidellipse', 'solidrectangle', 'titleCom']
        setTimeout(() => {
      
          Colorpicker.create({
            el: "backColor" + index,
            color: Controls.ControlList[index].PropertyList.BackColor,
            change: function (elem, hex, rgba) {
              elem.style.backgroundColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')';
              Controls.ControlList[index].PropertyList.BackColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')';
              // childElement(index, 'init',all)
              if(firstbgcolor !== 1){
                // back(selectdata, Controls)
                // childElement(index, 'init',all)
              
              }
              firstbgcolor++
              if ((data.ControlType != 'piechart' && data.ControlType != 'dashboardchart' && data.ControlType != 'barchart' && data.ControlType != 'linechart')) {
                // childElement(index,'init')
                // if (Controls.ControlList[index].title == '静态文本' || Controls.ControlList[index].title == '动态文本' || Controls.ControlList[index].title == '读写框') {
                //   $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).find('input').css('backgroundColor', `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')')
                // } else {
                //   $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).css('backgroundColor', `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')')
                // }
                if ($(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).find('input').length > 0) {
                  // if (Controls.ControlList[index].title == '静态文本' || Controls.ControlList[index].title == '动态文本' || Controls.ControlList[index].title == '读写框') {
                  $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).find('input').css('backgroundColor', `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')')
                } else if ($(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).find('textarea').length > 0) {
                  $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).find('textarea').css('backgroundColor', `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')')
                } else if (rectTypes.includes(Controls.ControlList[index].ControlType)) {
                  if (Controls.ControlList[index].PropertyList.BackSetting !== 'img') {
                    // 颜色需要背景色
                    $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).css('backgroundColor', `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')')
                  }
                } else {
                  if (Controls.ControlList[index].ControlType === 'statictextblock' || Controls.ControlList[index].ControlType === 'dynamictext') { // 静态文本 动态文本
                    $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}] div`).css('backgroundColor', `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')')
                  } else {
                    $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).css('backgroundColor', `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')')
                  }
                }

              }
            }
          })
        }, 100)

      }
      if (Controls.ControlList[index].PropertyList.Color) {
        if($('#fontColor'+index+'_color')[1]){
          $('#fontColor'+index+'_color')[1].remove()
        }
        setTimeout(() => {
      
          Colorpicker.create({
            el: "fontColor" + index,
            color: Controls.ControlList[index].PropertyList.Color,
            change: function (elem, hex, rgba) {
              elem.style.backgroundColor = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')';
              Controls.ControlList[index].PropertyList.Color = `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')';
              // childElement(index, 'init',all)
              if(firstfcolor !== 1){
                // back(selectdata, Controls)
              }
              firstfcolor++
              if ((data.ControlType != 'piechart' && data.ControlType != 'dashboardchart' && data.ControlType != 'barchart' && data.ControlType != 'linechart')) {
                // if (Controls.ControlList[index].ControlType == 'statictextblock' || Controls.ControlList[index].ControlType == 'dynamictext' 
                // || Controls.ControlList[index].ControlType == 'rwtextbox' ||  Controls.ControlList[index].ControlType == 'cornerbutton' ) {
                //   $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).find('input').css('color', `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')')
                // } else {
                //   $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).css('color', `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')')
                // }
                // if ($(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).find('input').length > 0) {
                //   $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).find('input').css('color', `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')')

                // } else {
                //   $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).css('color', `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')')
                // }
                if ($(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).find('input').length > 0) {
                  // if (Controls.ControlList[index].title == '静态文本' || Controls.ControlList[index].title == '动态文本' || Controls.ControlList[index].title == '读写框') {
                  $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).find('input').css('color', `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')')
                } else if ($(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).find('textarea').length > 0) {
                  $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).find('textarea').css('color', `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')')
                } else {
                  if (Controls.ControlList[index].ControlType === 'statictextblock' || Controls.ControlList[index].ControlType === 'dynamictext') { // 静态文本 动态文本
                    $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}] div`).css('color', `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')')
                  } else {
                    $(`.commonModule[data-id=${Controls.ControlList[index].PropertyList.ZIndex}]`).css('color', `rgba(` + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')')
                  }
                }

                // childElement(index,'init')
              }
            }
          })
          
        }, 100)

      }
      setTimeout(() => {
      // 添加图片上传
      let imgs = ['staticimage']
      let uploadImg = document.getElementById(`uploadimg${index}`)
      if (imgs.includes(Controls.ControlList[index].ControlType)) {
        layui.use('upload', function () {
          var upload = layui.upload;
          //执行实例
          var uploadInst = upload.render({
            elem: `#uploadimg${index}`,
            url: 'https://httpbin.org/post',
            accept: 'images',
            acceptMime: 'image/*',
            size: 1024 * 2,
            done: function (res) {
              
              localdata.ControlList[0].PropertyList.Img = res.files.file
              Controls.ControlList[index].PropertyList.Img = res.files.file
              // uploadImg.previousElementSibling.src = res.files.file
              uploadImg.firstElementChild.src = res.files.file
              childElement(index)
              //上传完毕回调
            },
            error: function () {
              console.log('error')
              //请求异常回调
            }
          })
        })
      }

      layui.use('upload', function () {
        var upload = layui.upload;
        //执行实例

        var uploadInst = upload.render({
          elem: '#dashboardImg1',
          url: 'https://httpbin.org/post',
          accept: 'images',
          acceptMime: 'image/*',
          size: 1024 * 2,
          done: function (res) {
            Controls.ControlList[index].PropertyList.BackImg = res.files.file
            $("#dashboardImg1").attr('src', res.files.file)
            $(`.commonModule[data-id =${Controls.ControlList[index].PropertyList.ZIndex}]`).find('div').css('background-image', `url(${res.files.file})`)

            // Controls.ControlList[index].backgroundImage = `url(${res.files.file})`
            // canvasWrap.style.backgroundRepeat = `norepear`
            // canvasWrap.style.backgroundSize = `100% 100%`
            //上传完毕回调
          },
          error: function () {
            console.log('error')
            //请求异常回调
          }
        })
      })
    })

      layui.form.render('select', 'group1');

    })

  }

  // initSelect2()

  // layui.use('dropdown', function(){
  //   var dropdown = layui.dropdown
  //   setTimeout(() => {
  //     dropdown.render({
  //       elem: '#demo1' //可绑定在任意元素中，此处以上述按钮为例
  //       ,data: [{
  //         title: 'menu item 1'
  //         ,id: 100
  //         ,href: '#'
  //       }]
  //     })
  //   }, 1000)
  // })
}
//下拉框设置
// function formatState (state) {
//   if (!state.id) {
//     return state.text;
//   }
//   // var baseUrl = "/user/pages/images/flags";
//   var $state = $(
//     '<div class="xianDiv" style="border: 1px red #000;"></div>'
//   );
//   return $state;
// };
// var sdata = [
//   {id: 1, text:'OPS-COFFEE-1'},
//   {id: 2, text:'OPS-COFFEE-2'},
//   {id: 3, text:'OPS-COFFEE-3'}
// ]

// // function initSelect2() {
//   $("#border_select").select2({
//     // templateResult: formatState
//     data: sdata
//   })

// }

//下拉框


// 
// 访问权限部分
function openCustom() {
  layer.open({
    type: 1,
    title: ['自定义访问权限', 'font-weight: 500;font-size: 16px;color: #FFFFFF;background: #409EFF;text-align:center;padding:0'],
    closeBtn: 1,
    btn: ['取消', '保存'],
    shadeClose: true,
    skin: 'z-addDashboard',
    content: $('.z-selectDeptInp'),
    area: ['498px', '590px'],
    success: function (layero, index) {
      let html = ''
      let str = ``
      let deptNames = []
      let jobNames = []
      let peopleNames = []
      checkDeptArr.forEach(item => {
        deptNames.push(item.bizName)
      })
      jobArr.forEach(item => {
        jobNames.push(item.bizName)
      })
      peopleArr.forEach(item => {
        peopleNames.push(item.bizName)
      })
      // 部门
      request.get(`/bi/${appId}/departments`).then(res => {
        if (res.data.data) {
          zNodesDept = res.data.data
          // 设置默认勾选
          zNodesDept.forEach((item, index) => {
            if (deptNames.includes(item.name)) {
              zNodesDept[index].checked = true
            }
          })
          $.fn.zTree.init($("#treeDept"), settingDept, zNodesDept);
          departTree = $.fn.zTree.getZTreeObj("treeDept");
          departTree.expandAll(true)
          layui.use('laytpl', function () {
            let laytpl = layui.laytpl;
            //第三步：渲染模版
            let data = deptNames;
            let getTpl = demoTpl.innerHTML;
            view = document.getElementById('viewTpl');
            if (data.length != 0) {
              laytpl(getTpl).render(data, function (html) {
                view.innerHTML = html;
              });
            }
          });

        } else {
          appTips.errorMsg(res.data.msg)
        }

      })
      // 职位
      request.get(`/bi/${appId}/positions`).then(res => {
        if (res.data.data) {
          res.data.data.forEach(item => {
            html += `<li class="clearfix">
                      <span class="g-left" data-id="${item.id}" >${item.name}</span>
                      <i class="g-right ${jobNames.includes(item.name) ? 'active' : ''} "></i>
                  </li>`
          })
          $('#rankSelect').html(html)
          //模板引擎
          layui.use('laytpl', function () {
            let laytpl = layui.laytpl;
            //第三步：渲染模版
            let jobArrdata = jobNames;
            let getTpl = jobArrTpl.innerHTML;
            view = document.getElementById('viewTpl2');
            if (jobArrdata.length >= 0) {
              laytpl(getTpl).render(jobArrdata, function (html) {
                view.innerHTML = html;
              });
            }
          });
        } else {
          appTips.errorMsg(res.data.msg)
        }

      })
      // 人员
      request.get(`/bi/${appId}/departments`).then(res => {
        zNodesDeptOrpeo = res.data.data
        $.fn.zTree.init($("#treeDemoDeptOrpeo"), settingDeptOrPeo, zNodesDeptOrpeo);
        peopleTree = $.fn.zTree.getZTreeObj("treeDemoDeptOrpeo");
        peopleTree.expandAll(true)
        // currentPeopleNode = zNodesDeptOrpeo[0]

        peopleTree.selectNode(currentPeopleNode)
      })
      request.get(`/bi/${appId}/users`).then(res => {
        if (res.data.data) {
          staffList = res.data.data
          if (JSON.stringify(currentPeopleNode) !== "{}" && currentPeopleNode.name) {
            userList = []
            staffList.forEach(item => {
              if (item.parentId === currentPeopleNode.id) {
                userList.push(item)
              }
            })
          } else {
            userList = res.data.data
          }

          let userList1 = []
          userList.forEach(item => {
            if (userList1.length > 0) {
              let id = 0
              for (let i = 0; i < userList1.length; i++) {
                if (item.id == userList1[i].id) {
                  id = 1
                  break
                }
              }
              if (id == 0) {
                userList1.push(item)
              }

            } else {
              userList1.push(item)
            }

          })
          userList = userList1
          userList1.forEach(item => {
            str += `<li class="clearfix">
                    <i class="g-left ${peopleNames.includes(item.name) ? 'active' : ''} "></i>
                    <span class="g-left" data-id="${item.id}" >${item.name}</span>
                </li>`
          })
          $('#peopleSelect').html(str)
          layui.use('laytpl', function () {
            var laytpl = layui.laytpl;
            var jobArrdata = peopleNames;
            var getTpl = jobArrTpl.innerHTML;
            view = document.getElementById('viewTpl3');
            if (jobArrdata.length >= 0) {
              laytpl(getTpl).render(jobArrdata, function (html) {
                view.innerHTML = html;
              });
            }
          });

        } else {
          appTips.errorMsg(res.data.msg)
        }

      })
    },
    btn2: function (index, layero) {
      if (($("#viewTpl li").length == 0) && ($("#viewTpl2 li").length == 0) && ($("#viewTpl3 li").length == 0)) {
        // layer.msg('请配置权限');
        // return false;
      }
      permissionList = []
      cloneDepart = JSON.parse(JSON.stringify(checkDeptArr))
      cloneJob = JSON.parse(JSON.stringify(jobArr))
      clonePeople = JSON.parse(JSON.stringify(peopleArr))
      $("#z-selectDeptInp").val("");
      permissionList = checkDeptArr.concat(jobArr).concat(peopleArr)
      let permissionNames = []
      permissionList.forEach(item => {
        permissionNames.push(item.bizName)
      })
      permissionData.customPermissions = permissionList
      $("#z-selectDeptInp").val(permissionNames);
    },
    end: function () {
      if (permissionList.length === 0) {
        checkDeptArr = []
        jobArr = []
        peopleArr = []
        $('#viewTpl').html('')
        $('#viewTpl2').html('')
        $('#viewTpl3').html('')
      }
      checkDeptArr = JSON.parse(JSON.stringify(cloneDepart))
      jobArr = JSON.parse(JSON.stringify(cloneJob))
      peopleArr = JSON.parse(JSON.stringify(clonePeople))
      $('#input-Dept').val('')
      $('#input-job').val('')
      $('#input-user').val('')
    }
  });
}

// 控制按钮操作权限
function openBtnOpera(i) {
  layer.open({
    type: 1,
    title: ['自定义操作权限', 'font-weight: 500;font-size: 16px;color: #FFFFFF;background: #409EFF;text-align:center;'],
    closeBtn: 1,
    btn: ['取消', '保存'],
    shadeClose: true,
    skin: 'z-addDashboard',
    content: $('.z-selectDeptInp'),
    area: ['498px', '590px'],
    success: function (layero, index) {
      let html = ''
      let str = ``
      let tab = document.getElementById('tab-wrap')
      tab.setAttribute('data-index', i)
      $('#viewTpl').html('')
      $('#viewTpl2').html('')
      $('#viewTpl3').html('')
      let {
        operatData
      } = Controls.ControlList[i]
      operatData.cloneODeparts = JSON.parse(JSON.stringify(operatData.oDeparts))
      operatData.cloneOJobs = JSON.parse(JSON.stringify(operatData.oJobs))
      operatData.cloneOPeoples = JSON.parse(JSON.stringify(operatData.oPeoples))
      let deptNames = []
      let jobNames = []
      let peopleNames = []
      operatData.oDeparts.forEach(item => {
        deptNames.push(item.bizName)
      })
      operatData.oJobs.forEach(item => {
        jobNames.push(item.bizName)
      })
      operatData.oPeoples.forEach(item => {
        peopleNames.push(item.bizName)
      })
      // 部门
      request.get(`/bi/${appId}/departments`).then(res => {
        zNodesDept = res.data.data
        // 设置默认勾选
        zNodesDept.forEach((item, index) => {
          if (deptNames.includes(item.name)) {
            zNodesDept[index].checked = true
          }
        })
        $.fn.zTree.init($("#treeDept"), settingDept, zNodesDept);
        departTree = $.fn.zTree.getZTreeObj("treeDept");
        departTree.expandAll(true)
        layui.use('laytpl', function () {
          let laytpl = layui.laytpl;
          //第三步：渲染模版
          let data = deptNames;
          let getTpl = demoTpl.innerHTML;
          view = document.getElementById('viewTpl');
          if (data.length != 0) {
            laytpl(getTpl).render(data, function (html) {
              view.innerHTML = html;
            });
          }
        });
      })
      // 职位
      request.get(`/bi/${appId}/positions`).then(res => {
        res.data.data.forEach(item => {
          html += `<li class="clearfix">
                    <span class="g-left" data-id="${item.id}" >${item.name}</span>
                    <i class="g-right ${jobNames.includes(item.name) ? 'active' : ''} "></i>
                </li>`
        })
        $('#rankSelect').html(html)
        //模板引擎
        layui.use('laytpl', function () {
          let laytpl = layui.laytpl;
          //第三步：渲染模版
          let getTpl = jobArrTpl.innerHTML;
          view = document.getElementById('viewTpl2');
          if (jobNames.length >= 0) {
            laytpl(getTpl).render(jobNames, function (html) {
              view.innerHTML = html;
            });
          }
        });
      })
      // 人员
      request.get(`/bi/${appId}/departments`).then(res => {
        zNodesDeptOrpeo = res.data.data
        $.fn.zTree.init($("#treeDemoDeptOrpeo"), settingDeptOrPeo, zNodesDeptOrpeo);
        peopleTree = $.fn.zTree.getZTreeObj("treeDemoDeptOrpeo");
        peopleTree.expandAll(true)
        peopleTree.selectNode(operatData.currentNode)
      })
      request.get(`/bi/${appId}/users`).then(res => {
        operatData.oStaffList = res.data.data
        if (JSON.stringify(operatData.currentNode) !== "{}" && operatData.currentNode.name) {
          userList = []
          operatData.oStaffList.forEach(item => {
            if (item.parentId === operatData.currentNode.id) {
              userList.push(item)
            }
          })
        } else {
          userList = res.data.data
        }
        let userList1 = []
        userList.forEach(item => {
          if (userList1.length > 0) {
            let id = 0
            for (let i = 0; i < userList1.length; i++) {
              if (item.id == userList1[i].id) {
                id = 1
                break
              }
            }
            if (id == 0) {
              userList1.push(item)
            }

          } else {
            userList1.push(item)
          }

        })
        userList = userList1

        userList1.forEach(item => {
          str += `<li class="clearfix">
                  <i class="g-left ${peopleNames.includes(item.name) ? 'active' : ''} "></i>
                  <span class="g-left" data-id="${item.id}" >${item.name}</span>
              </li>`
        })
        $('#peopleSelect').html(str)
        layui.use('laytpl', function () {
          var laytpl = layui.laytpl;
          var getTpl = jobArrTpl.innerHTML;
          view = document.getElementById('viewTpl3');
          if (peopleNames.length >= 0) {
            laytpl(getTpl).render(peopleNames, function (html) {
              view.innerHTML = html;
            });
          }
        });
      })
    },
    btn2: function (index, layero) {
      if (($("#viewTpl li").length == 0) && ($("#viewTpl2 li").length == 0) && ($("#viewTpl3 li").length == 0)) {
        appTips.warningMsg('请配置权限');
        return false;
      }
      let {
        operatData
      } = Controls.ControlList[i]
      operatData.opetaPermissions = []
      operatData.cloneODeparts = JSON.parse(JSON.stringify(operatData.oDeparts))
      operatData.cloneOJobs = JSON.parse(JSON.stringify(operatData.oJobs))
      operatData.cloneOPeoples = JSON.parse(JSON.stringify(operatData.oPeoples))
      $("#opera-selectDeptInp").val("");
      operatData.opetaPermissions = operatData.oDeparts.concat(operatData.oJobs).concat(operatData.oPeoples)
      let permissionNames = []
      operatData.opetaPermissions.forEach(item => {
        permissionNames.push(item.bizName)
      })
      // permissionData.customPermissions = operatData.opetaPermissions
      $("#opera-selectDeptInp").val(permissionNames);
      let tab = document.getElementById('tab-wrap')
      tab.removeAttribute('data-index')
    },
    end: function () {
      let {
        operatData
      } = Controls.ControlList[i]
      let tab = document.getElementById('tab-wrap')
      tab.removeAttribute('data-index')
      if (operatData.opetaPermissions.length === 0) {
        operatData.oDeparts = []
        operatData.oJobs = []
        operatData.oPeoples = []
        $('#viewTpl').html('')
        $('#viewTpl2').html('')
        $('#viewTpl3').html('')
      }
      operatData.oDeparts = JSON.parse(JSON.stringify(operatData.cloneODeparts))
      operatData.oJobs = JSON.parse(JSON.stringify(operatData.cloneOJobs))
      operatData.oPeoples = JSON.parse(JSON.stringify(operatData.cloneOPeoples))
      $('#input-Dept').val('')
      $('#input-job').val('')
      $('#input-user').val('')
    }
  });
}

// 人员复选框点击事件
$(document).on("click", "#peopleSelect li", function (e) {
  let tab = document.getElementById('tab-wrap')
  let tabi = tab.dataset.index ? tab.dataset.index : ''
  if (tabi === '') { // 仪表板设置
    if ($(this).find("i").hasClass("active")) {
      $(this).find("i").removeClass("active");
      let id = []
      id.push($(this).find('span').data().id)
      peopleArr.forEach((item, index) => {
        if (id.includes(item.bizId)) {
          peopleArr.splice(index, 1)
        }
      })
    } else {
      $(this).find("i").addClass("active");
      peopleArr.push({
        bizId: $(this).find('span').data().id,
        bizName: $(this).find('span').text(),
        bizType: 'user'
      })
    }
    layui.use('laytpl', function () {
      let laytpl = layui.laytpl;
      let jobArrdata = [];
      peopleArr.forEach(item => {
        jobArrdata.push(item.bizName)
      })
      let getTpl = jobArrTpl.innerHTML;
      view = document.getElementById('viewTpl3');
      if (jobArrdata.length >= 0) {
        laytpl(getTpl).render(jobArrdata, function (html) {
          view.innerHTML = html;
        });
      }
    });
  } else { // 控制按钮
    let {
      operatData
    } = Controls.ControlList[tabi]
    if ($(this).find("i").hasClass("active")) {
      $(this).find("i").removeClass("active");
      let id = []
      id.push($(this).find('span').data().id)
      operatData.oPeoples.forEach((item, index) => {
        if (id.includes(item.bizId)) {
          operatData.oPeoples.splice(index, 1)
        }
      })
    } else {
      $(this).find("i").addClass("active");
      operatData.oPeoples.push({
        bizId: $(this).find('span').data().id,
        bizName: $(this).find('span').text(),
        bizType: 'user'
      })
    }
    layui.use('laytpl', function () {
      let laytpl = layui.laytpl;
      let jobArrdata = [];
      operatData.oPeoples.forEach(item => {
        jobArrdata.push(item.bizName)
      })
      let getTpl = jobArrTpl.innerHTML;
      view = document.getElementById('viewTpl3');
      if (jobArrdata.length >= 0) {
        laytpl(getTpl).render(jobArrdata, function (html) {
          view.innerHTML = html;
        });
      }
    });
  }
})

$(document).on('click', "#viewTpl i", function () {
  //上面删除了哪个节点，也要修改获取选中节点数组nodes
  $(this).parent('li').remove();
  var selectId = $(this).attr("data-id");
  let myNodes = departTree.getCheckedNodes(true)
  let arr = []
  myNodes.forEach((item, index) => {
    arr.push({
      bizId: item.id,
      bizName: item.name,
      bizType: 'department'
    })
  })
  departTree.checkNode(myNodes[selectId], false, true, true);
});

$(document).on("click", "#viewTpl2 i", function (e) {
  let tab = document.getElementById('tab-wrap')
  let tabi = tab.dataset.index ? tab.dataset.index : ''
  if (tabi === '') { // 仪表板设置
    let jobVal = $(this).siblings().text();
    $("#rankSelect span").each(function () {
      if ($(this).text() == jobVal) {
        $(this).siblings().removeClass("active");
      }

    });
    $(this).parents("li").remove();
    jobArr.splice($.inArray($(this).siblings().text(), jobArr), 1);
  } else {
    let {
      operatData
    } = Controls.ControlList[tabi]
    let jobVal = $(this).siblings().text();
    $("#rankSelect span").each(function () {
      if ($(this).text() == jobVal) {
        $(this).siblings().removeClass("active");
      }

    });
    $(this).parents("li").remove();
    operatData.oJobs.splice($.inArray($(this).siblings().text(), jobArr), 1);
  }
})
$(document).on("click", "#viewTpl3 i", function (e) {
  let tab = document.getElementById('tab-wrap')
  let tabi = tab.dataset.index ? tab.dataset.index : ''
  if (tabi === '') { // 仪表板设置
    let jobVal = $(this).siblings().text();
    $("#peopleSelect span").each(function () {
      if ($(this).text() == jobVal) {
        $(this).siblings().removeClass("active");
      }
    });
    $(this).parents("li").remove();
    peopleArr.splice($.inArray($(this).siblings().text(), peopleArr), 1);
  } else {
    let {
      operatData
    } = Controls.ControlList[tabi]
    let jobVal = $(this).siblings().text();
    $("#peopleSelect span").each(function () {
      if ($(this).text() == jobVal) {
        $(this).siblings().removeClass("active");
      }
    });
    $(this).parents("li").remove();
    operatData.oPeoples.splice($.inArray($(this).siblings().text(), operatData.oPeoples), 1);
  }
})

function getDate(eleid, index, prop) {
  let {
    DateTimeType: formData
  } = Controls.ControlList[index]
  formData = changeFormat(formData)
  time = Controls.ControlList[index][prop]
  renderDatePicker(eleid, formData, time, index, prop)
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
function renderDatePicker(elem, format, time, index, prop) {
  /* 
    elem: 绑定组件的元素class名称
    format： 日期时间格式化
    time: 默认显示时间
    index: 组件下标
    prop: 时间对应的数据
  */
  $(`.${elem}`).on('click', function () {
    var _this = this;
    for (let i = 0; i < $('body').find('[name="datePicker"]').length; i++) {
      $($('body').find('[name="datePicker"]')[i]).remove()
      $($('body').find('.datePicker-cover')[i]).remove()
    }
    $($('body').find('.datePicker-cover')[0]).remove()
    let div = `<div class='datePicker-cover' style='position:fixed;width:100%;height:100%;top:0;left:0;zindex:99'></div>`
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
      index: 0,
      reportTimeType: 4, // 4代表小时、5代表天、6代表周、7代表月、8代表季、9代表年
      startDom: $(_this).find('input[name="startTime"]'), // 开始时间要赋值的DOM元素
      endDom: $(_this).find('input[name="endTime"]'), // 结束时间要赋值的DOM元素
      format,
      time: time ? time : new Date(),
      isFast: false, // 是否显示快速选择的选项
      isDouble: true,
      Zindex: 100,
      type: Controls.ControlList[index].PropertyList.type, //判断显示什么时间类型
      twoobject: { //动态时间数据格式
        twotime: moment().format(format),
        parentselect: Controls.ControlList[index].PropertyList.twoobject.parentselect,
        childrenarr: Controls.ControlList[index].PropertyList.twoobject.childrenarr
      },
      disabledDate: false, // 是否禁用以后的时间
      yes: function (onetime, twotime, type, notime) { // 成功赋值前的回调可改变赋值的时间格式
        let startTime = dayjs(Controls.ControlList[index].StartTime).valueOf()
        let endTime = dayjs(Controls.ControlList[index].EndTime).valueOf()
        let nowTime = dayjs(onetime).valueOf()
        if (elem === 'endPicker') {
          if (nowTime < startTime) {
            appTips.warningMsg('结束时间不能小于开始时间');
            return
          }
        } 

        if (elem === 'startPicker') {
          if (nowTime > endTime) {
            appTips.warningMsg('开始时间不能大于结束时间');
            return
          }
        } 

        if (type == 1) {
          // 固定时间
          onetime = moment(onetime).format(format)
          // $(_this).find('input').val(onetime)
          $(_this).val(onetime)
          Controls.ControlList[index][prop] = onetime
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
          Controls.ControlList[index][prop] = twotime.twotime
        }
        Controls.ControlList[index].PropertyList.type = type
        Controls.ControlList[index].PropertyList.twoobject.parentselect = twotime.parentselect
        if (notime == '清除') {
          // $(_this).find('input').val('')
          $(_this).val('')
          Controls.ControlList[index][prop] = ''
        }
        childElement(index)
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