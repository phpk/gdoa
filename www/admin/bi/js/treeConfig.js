
var fromTree // fromTree
var toTree // toTree
var departTree //部门树
var currentFromNode = {} // fromTree选中节点
var currentToNode = [] // toTree选中节点
var currentPosNode = {} // 仪表板设置位置树选中节点
var currentPeopleNode  = {} //访问权限人员树
var currentReuseNode = {} // 复用树选中的节点
var currentJumpNode = {} // 跳转链接树
var jumpIndex = null // 跳转链接组件下标
var posTree = {} // 仪表板设置位置树
var panelId = ""  // panelId写死，后面需修改为动态获取
// 获取url值
panelId = getParams('panelId', window.location.href)
// 21302abdb343edf09f84b6f9d900537c
panelId = panelId ? panelId : '1cff8876dc96a8adac114ecbe1bd9652'
// 复用树
var reuseData=[
  // { id:1, pId:0, name:"文件 1", open:true},
  // { id:11, pId:1, name:"文件 1-1", open:true},
  // { id:111, pId:11, name:"矩形", index: 4},
  // { id:112, pId:11, name:"圆形", index: 5},
  // { id:12, pId:1, name:"文件 1-2", open:true},
  // { id:121, pId:12, name:"直线", index: 3},
  // { id:122, pId:12, name:"图片", index: 0},
  // { id:2, pId:0, name:"文件 2", open:true},
  // { id:21, pId:2, name:"数值显示", index: 2},
  // { id:22, pId:2, name:"文件 2-2", open:true},
  // { id:221, pId:22, name:"矩形状态灯", index: 7},
];
var reuseSetting = {
  view:{
    showLine: false,
    fontCss : {color:"#333333"}
  },
  data: {
    simpleData: {
      enable: true,
      idKey: "id",
      pIdKey: "parentId"
    },
    key: {
      name: 'name'
  }
  },
  callback: {
    onMouseDown: reusedown
  },
}
// 位置树
var positionData = []
var positionSetting = {
  view: {
    dblClickExpand: false,
    showLine: false,
    fontCss : {color:"#333333"},
    addDiyDom: addDiyDom,
  },
  data: {
      simpleData: {
          enable: true,
          idKey: "id",
          pIdKey: "parentId"
      }
  },
  callback: {
      onClick: onClickPos,
  }
}

function addDiyDom(treeId, treeNode) {
  var spaceWidth = 5;
  var switchObj = $("#" + treeNode.tId + "_switch"),
  icoObj = $("#" + treeNode.tId + "_ico");
  switchObj.remove();
  icoObj.before(switchObj);

  if (treeNode.level > 1) {
      var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level)+ "px'></span>";
      switchObj.before(spaceStr);
  }

  var aObj = $("#" + treeNode.tId + "_a");
  //treeNode.id 要根据树的数据中的id获取，zNodes 数据配置中的i
  // if ($("#diyBtn_"+treeNode.id).length>0) return; //控制哪些节点不显示按钮
  var editStr = ""
    + "<button type='button' class='diyBtn1' id='diyBtn_" + treeNode.id
    + "' title='"+treeNode.name+"' onfocus='this.blur();'></button>";
  aObj.append(editStr);
  var btn = $("#diyBtn_"+treeNode.id);
  // if (btn) btn.bind("click", function(){alert("diy Button for " + treeNode.name);});
}

function onClickPos(event, treeId, treeNode) {
  currentPosNode = treeNode
  commonList.Position = treeNode.name
  commonList.TreeNode = treeNode
  let pos = $("#attrPosition")[0];
  pos.value = treeNode.name
  let collpase = document.getElementById('common-Content')
  collpase.style.height = '220px'
}

// fromTree
var otherData = []
var otherSetting = {
  view:{
    showLine: false,
    fontCss : {color:"#333333"}
  },
  check: {
      enable: true,
      chkStyle: "radio",
      radioType: "all" //all控制单选（整棵树）  level（同一级）
  },
  data: {
      simpleData: {
          enable: true,
          idKey: "id",
          pIdKey: "parentId"
      }
  },
  callback: {
      onCheck: onCheckRaido,
      onClick:onCheckRaido1,
      beforeCheck: zTreeBeforeCheck
  },
}


function onCheckRaido(e,treeId,treeNode){
  if ( treeNode.checked) {
    currentFromNode = treeNode
  } else {
    currentFromNode = {}
  }
}
function onCheckRaido1(e,treeId,treeNode){
  if (!treeNode.checked) {
    treeNode.checked = true
    currentFromNode = treeNode
  } else {
    treeNode.checked = false
    currentFromNode = {}
  }
  var treeObj = $.fn.zTree.getZTreeObj("treeCopeFrom");
  treeObj.updateNode(treeNode);
 
}

function zTreeBeforeCheck(treeId, treeNode) {
  return !treeNode.isParent;//当是父节点 返回false 不让选取
}

// toTree
var selfData = []
var selfSetting = {
  view:{
    showLine: false,
    fontCss : {color:"#333333"},
  },
  check: {
      enable: true
  },
  data: {
      simpleData: {
          enable: true,
          idKey: "id",
          pIdKey: "parentId"
      }
  },
  callback: {
      onCheck: onCheckTo,
      onClick:onCheckTo1
  },
}
selfSetting.check.chkboxType = { "Y" : "s", "N" : "s" }
//Y 属性定义 checkbox 被勾选后的情况； 
//N 属性定义 checkbox 取消勾选后的情况； 
//"p" 表示操作会影响父级节点； 
//"s" 表示操作会影响子级节点。
//选择从哪个仪表板复制权限配置

function onCheckTo(e,treeId,treeNode){
  let index = -1
  for(let i= 0;i <currentToNode.length;i++){
    if(currentToNode[i].id == treeNode.id){
      index = i
    }
  }
  if ( treeNode.checked) {
    if(index <0){
      currentToNode.push(treeNode)
    }
  } else {
    if(index > -1){
      currentToNode.splice(index,1)
    }
   
  }
}
function onCheckTo1(e,treeId,treeNode){
  let index = -1
  for(let i= 0;i <currentToNode.length;i++){
    if(currentToNode[i].id == treeNode.id){
      index = i
    }
  }
  
  if (!treeNode.checked) {
    treeNode.checked = true
    if(index <0){
      currentToNode.push(treeNode)
    }
  } else {
    treeNode.checked = false
    if(index > -1){
      currentToNode.splice(index,1)
    }
  }
  var treeObj = $.fn.zTree.getZTreeObj("treeCopeto");
  treeObj.updateNode(treeNode);
}

//自定义按钮的部门树
var zNodesDept =[]

var settingDept = {
  view:{
      showLine: false,
      fontCss : {color:"#333333"},
      showIcon: false
  },
  check: {
      enable: true,
      // chkboxType: { "Y": "p", "N": "s" }
  },
  data: {
      simpleData: {
          enable: true,
          idKey: "id",
          pIdKey: "parentNodeId"
      }
  },
  callback: {
      onCheck: onCheckDept,
  },
};
settingDept.check.chkboxType = { "Y" : "s", "N" : "s" };
function onCheckDept(e,treeId,treeNode){
  let tab = document.getElementById('tab-wrap')
  let tabi = tab.dataset.index ? tab.dataset.index : ''
  myNodes = departTree.getCheckedNodes(true)
  let arr = []
  myNodes.forEach((item,index) => {
    arr.push({
      bizId: item.id,
      bizName: item.name,
      bizType: 'department'
    })
  })
  if (tabi === '') {
    // 仪表板设置
    checkDeptArr = arr
    $("#viewTpl li").remove();
    //模板引擎
    layui.use('laytpl', function(){
        let laytpl = layui.laytpl;
        let data = []
        //第三步：渲染模版
        checkDeptArr.forEach(item => {
          data.push(item.bizName)
        })
        let getTpl = demoTpl.innerHTML;
        view = document.getElementById('viewTpl');
        if(data.length != 0){
            laytpl(getTpl).render(data, function(html){
                view.innerHTML = html;
            });
        }
    }); 
  } else {
    // 控制按钮权限
    let { operatData } = Controls.ControlList[tabi]
    operatData.oDeparts = arr
    $("#viewTpl li").remove();
    //模板引擎
    layui.use('laytpl', function(){
        let laytpl = layui.laytpl;
        let data = []
        //第三步：渲染模版
        operatData.oDeparts.forEach(item => {
          data.push(item.bizName)
        })
        let getTpl = demoTpl.innerHTML;
        view = document.getElementById('viewTpl');
        if(data.length != 0){
            laytpl(getTpl).render(data, function(html){
                view.innerHTML = html;
            });
        }
    }); 
  }
}

// 自定义按钮的人员树
var zNodesDeptOrpeo =[]
var settingDeptOrPeo = {
  view:{
    showLine: false,
    fontCss : {color:"#333333"},
    showIcon: false,
    addDiyDom: addDiyDom,
  },
  check: {
      // enable: true,
      // chkboxType: { "Y": "p", "N": "s" }
  },
  data: {
      simpleData: {
          enable: true,
          idKey: "id",
          pIdKey: "parentNodeId"
      }
  },
  callback: {
      onClick: onClickSelectDept,
  },
}

function onClickSelectDept(e, treeId, treeNode) {
  let tab = document.getElementById('tab-wrap')
  let tabi = tab.dataset.index ? tab.dataset.index : ''
  if (tabi === '') { // 仪表板设置
    currentPeopleNode = treeNode
    let str = ``
    userList = []
    let value = $('#input-user').val()
    staffList.forEach(item => {
      if (item.parentId === treeNode.id) {
        userList.push(item)
      }
    })
    userList.forEach(item => {
      if (item.name.indexOf(value) !== -1) {
        str += `<li class="clearfix">
            <i class="g-left  ${peopleArr.includes(item.name) ? 'active' : ''} "></i>
            <span data-id="${item.id}" class="g-left">${item.name}</span>
        </li>`
      }
    })
    $('#peopleSelect').html(str)
    // let lis = [...$('#peopleSelect li')]
      let lis = [...document.querySelectorAll('#peopleSelect li')]
      let peopleNames = []
      peopleArr.forEach(item => {
          peopleNames.push(item.bizName)
      })
      lis.forEach((item, index) => {
          if (peopleNames.includes(item.lastElementChild.innerText)) {
              $(item.firstElementChild).addClass("active");
          } else {
              $(item.firstElementChild).removeClass("active");
          }
      })
  } else {  // 控制按钮
    let { operatData } = Controls.ControlList[tabi]
    operatData.currentNode = treeNode
    let str = ``
    userList = []
    let value = $('#input-user').val()
    operatData.oStaffList.forEach(item => {
      if (item.parentId === treeNode.id) {
        userList.push(item)
      }
    })
    userList.forEach(item => {
      if (item.name.indexOf(value) !== -1) {
        str += `<li class="clearfix">
            <i class="g-left  ${operatData.oPeoples.includes(item.name) ? 'active' : ''} "></i>
            <span data-id="${item.id}" class="g-left">${item.name}</span>
        </li>`
      }
    })
    $('#peopleSelect').html(str)
    // let lis = [...$('#peopleSelect li')]
      let lis = [...document.querySelectorAll('#peopleSelect li')]
      let peopleNames = []
      operatData.oPeoples.forEach(item => {
          peopleNames.push(item.bizName)
      })
      lis.forEach((item, index) => {
          if (peopleNames.includes(item.lastElementChild.innerText)) {
              $(item.firstElementChild).addClass("active");
          } else {
              $(item.firstElementChild).removeClass("active");
          }
      })
  }
}

// tree
var jumpData=[]
var jumpSetting = {
  view:{
    showLine: false,
    fontCss : {color:"#333333"},
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
    onClick: jumpNodeCLick
  },
}


// 跳转链接 - 选择仪表板
function jumpNodeCLick (e, treeId, treeNode) {
  if (treeNode.nodeType !== 'panel') {
    // layer.msg('只能选择仪表盘，请重新选择');
    // return
    let postData = {
      appId,
      nodeId: treeNode.id
    }
    
    request.get(`/bi/${appId}/panel-tree/children`, {
      params: postData
    }).then(res => {
      if (res.data.code !== 0) {
        app.msg(res.data.msg)
        return
      }
      if (res.data.data) {
        var zTree = $.fn.zTree.getZTreeObj("jumptree")
        
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
  }else{
    currentJumpNode = treeNode
    $('#panel-input').val(treeNode.name)
    Controls.ControlList[jumpIndex].PropertyList.panelId = treeNode.id
    Controls.ControlList[jumpIndex].PropertyList.panel = treeNode.name
    closeJump()

  }
 
}

// 事件
// fromTree搜索
function searchFromTree (e) {
  let postData ={
      appId,
      name: e.target.previousElementSibling.value
  }
  request.get(`/bi/${appId}/panel-tree/copy`, {params: postData}).then(res => {
      otherData = res.data.data
      if(otherData){
        otherData.forEach(item => {
          if (item.nodeType !== 'panel') {
            item.nocheck = true
            item.icon = "./styles/iconTool/icon_file.png"
          } else {
            item.icon = "./styles/iconTool/icon_monitor_nor.png"
          }
      })
      $.fn.zTree.init($("#treeCopeFrom"), otherSetting, otherData);
      fromTree.expandAll(true)
      let node = fromTree.getNodeByParam("name", currentFromNode.name, null);
      fromTree.selectNode(node)

      }
     
  })
}

// toTree搜索
function searchToTree (e) {
  let postData ={
      appId,
      name: e.target.previousElementSibling.value
  }
  request.get(`/bi/${appId}/panel-tree/copy`, { params: postData }).then(res => {
    if (res.data.data) {
            selfData = res.data.data
            selfData.forEach(item=>{
              if (item.nodeType !== 'panel') {
                item.nocheck = true
                item.icon = "./styles/iconTool/icon_file.png"
              } else {
                item.icon = "./styles/iconTool/icon_monitor_nor.png"
              }

            })
            $.fn.zTree.init($("#treeCopeto"), selfSetting, selfData);
            let toTree = $.fn.zTree.getZTreeObj('treeCopeto')
            toTree.expandAll(true)

          }
  })
}

// 部门树搜索
function searchDept (event) {
  let postData = {
    appId,
    deptName: event.target.value
  }
  let tab = document.getElementById('tab-wrap')
  let tabi = tab.dataset.index ? tab.dataset.index : ''
  if (tabi === '') {  // 仪表板设置
    request.get(`/bi/${appId}/departments`, { params: postData} ).then(res => {
        zNodesDept = res.data.data
        let departNames = []
        checkDeptArr.forEach(item => {
            departNames.push(item.bizName)
        })
        zNodesDept.forEach((item,index) => {
            if (departNames.includes(item.name)) {
                zNodesDept[index].checked = true
            } 
        })
        $.fn.zTree.init($("#treeDept"), settingDept, zNodesDept);
        departTree.expandAll(true)
    })
  } else {  // 控制按钮
    let { operatData } = Controls.ControlList[tabi]
    request.get(`/bi/${appId}/departments`, { params: postData} ).then(res => {
      zNodesDept = res.data.data
      let departNames = []
      operatData.oDeparts.forEach(item => {
          departNames.push(item.bizName)
      })
      zNodesDept.forEach((item,index) => {
          if (departNames.includes(item.name)) {
              zNodesDept[index].checked = true
          } 
      })
      $.fn.zTree.init($("#treeDept"), settingDept, zNodesDept);
      departTree.expandAll(true)
    })
  }
}

// 职位树搜索
function searchJob (event) {
  let html = ''
  let postData = {
      appId,
      positionName: event.target.value
  }
  let tab = document.getElementById('tab-wrap')
  let tabi = tab.dataset.index ? tab.dataset.index : ''
  if (tabi === '') {  // 仪表板设置
    request.get(`/bi/${appId}/positions`, { params: postData }).then(res => {
        res.data.data.forEach(item => {
            html += `<li class="clearfix">
            <span class="g-left" data-id="${item.id}">${item.name}</span>
            <i class="g-right"></i>
        </li>`
        })
        $('#rankSelect').html(html)
        // let lis = [...$('#rankSelect li')]
        let lis = [...document.querySelectorAll('#rankSelect li')]
        let jobNames = []
        jobArr.forEach(item => {
            jobNames.push(item.bizName)
        })
        lis.forEach((item, index) => {
            if (jobNames.includes(item.firstElementChild.innerText)) {
                $(item.lastElementChild).addClass("active");
            } else {
                $(item.lastElementChild).removeClass("active");
            }
        })
    })
  } else { // 控制按钮
    let { operatData } = Controls.ControlList[tabi]
    request.get(`/bi/${appId}/positions`, { params: postData }).then(res => {
      res.data.data.forEach(item => {
          html += `<li class="clearfix">
          <span class="g-left" data-id="${item.id}">${item.name}</span>
          <i class="g-right"></i>
      </li>`
      })
      $('#rankSelect').html(html)
      // let lis = [...$('#rankSelect li')]
      let lis = [...document.querySelectorAll('#rankSelect li')]
      let jobNames = []
      operatData.oJobs.forEach(item => {
          jobNames.push(item.bizName)
      })
      lis.forEach((item, index) => {
          if (jobNames.includes(item.firstElementChild.innerText)) {
              $(item.lastElementChild).addClass("active");
          } else {
              $(item.lastElementChild).removeClass("active");
          }
      })
  })
  }
}

// 人员用户搜索
function searchName (event) {
  let str =``
  let tab = document.getElementById('tab-wrap')
  let tabi = tab.dataset.index ? tab.dataset.index : ''
  if (tabi === '') {  // 仪表板设置
    if (event) {
        userList.forEach(item => {
            if (item.name.indexOf(event.target.value) !== -1) {
                str += `<li class="clearfix" data-id="${item.id}" >
                    <i class="g-left"></i>
                    <span class="g-left">${item.name}</span>
                </li>`
            }
        })
    }
    $('#peopleSelect').html(str)
    // let lis = [...$('#peopleSelect li')]
    let lis = [...document.querySelectorAll('#peopleSelect li')]
    let peopleNames = []
    peopleArr.forEach(item => {
        peopleNames.push(item.bizName)
    })
    lis.forEach((item, index) => {
        if (peopleNames.includes(item.lastElementChild.innerText)) {
            $(item.firstElementChild).addClass("active");
        } else {
            $(item.firstElementChild).removeClass("active");
        }
    })
  } else {// 控制按钮
    let { operatData } = Controls.ControlList[tabi]
  }
}

// 获取url参数
function getParams(key, str) {
      var result = {};
      var paramStr = ''
      let params
      if (str) {
          paramStr = str.split('?')[1]
          if (paramStr) {
              params = paramStr.split('&');
              params.forEach(item => {
                  result[item.split('=')[0]] = unescape(item.split('=')[1])
              })
          }
      } else {
          paramStr = encodeURI(window.document.location.search);
          if (paramStr) {
              paramStr = paramStr.substring(1);
              params = paramStr.split('&');
              for (var p = 0; p < params.length; p++) {
                  result[params[p].split('=')[0]] = unescape(params[p].split('=')[1]);
              }
          }
      }
      return result[key];
  }

