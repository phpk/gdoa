// 全局data 以及zTree事件
/* 全局data */
var searchObjData = {}
var attributeObjData = {}
var currentPositionNode = {}  //位置树选中的node
var currentGroupNode = {}  //分组树选中的node
var currentPeopleNode  = {} //人员树选中的node
var currentFromNode = {} //从仪表板复制树
var currentToNode = [] //复制到其他树
var currentRightNode = {} //右键菜单栏选中的字节点
var editorNode = {}
// 获取url值
var appId = ''  //appId
appId = getParams('appId', window.location.href)
appId = appId ? appId : /* 'innerTestPlatformId' */ 'TEST123_o582'

var zNodes = []
var addCount = 1
var pageData = {}
var tableData=[]
let tableDataArr = []
let show = true
var pageDataIdMap;//勾选id
var idMap = new Map()
var tableCheckList = [] //表格 
var staffList = [] //访问权限人员用户
var userList = []
var cloneDepart = []
var cloneJob = []
var clonePeople = []
//声明变量注意区分类型，数组或对象或字符串
var idsArr = []//新增仪表板位置  选中树的id集合
var ConfigureToidsArr = []//将配置复制给其他仪表板  选中树的id集合
var checkDeptArr = []//自定义权限选择部门的集合
var permissionList = []
var jobArr = []
var peopleArr = []


//树配置初始化
var rMenu
var zTree  //分组树
var pTree   // 新增仪表板树
var addPTree // 新建分组树
var attrTree  //属性位置树
var fromTree //其他仪表板复制 
var departTree //部门树
var peopleTree //人员树
 //主页面左侧的树
 var setting = {
    view: {
        showLine: false,
        fontCss : {color:"#333333"},
        addDiyDom: addDiyDom,
    },
    edit: {
    
    },
    data: {
      simpleData: {
          enable: true,
          idKey: "id",
          pIdKey: "parentId"
      }
    },
    callback: {
        onClick: groupNodeClick,
        // onRightClick: OnRightClick,
    }
};

// 新增仪表盘选择分组的树
var settingAdd = {
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
      beforeClick: beforeClickAdd,
      onClick: onClickAdd,
  }
};

// 属性位置的树
var settingAttr = {
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
      beforeClick: beforeClickAdd,
      onClick: onClickAttr,
  }
};

// 分组弹窗位置树
var settingAddFenzu = {
  view: {
      dblClickExpand: false,
      showLine: false,
      addDiyDom: addDiyDom,
      fontCss : setFontCss
  },
  data: {
      simpleData: {
          enable: true,
          idKey: "id",
          pIdKey: "parentId"
      }
  },
  callback: {
      // beforeClick: beforeClickAddFenzu,
      onClick: onClickAddFenzu,
  }
};

//选择要将权限配置复制到的仪表板树
var zNodesCopeto =[]
var settingCopeto = {
  view:{
      showLine:false,
      fontCss : {color:"#333333"}
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
      onCheck: onCheckTo
  },
};
settingCopeto.check.chkboxType = { "Y" : "s", "N" : "s" };
//Y 属性定义 checkbox 被勾选后的情况； 
//N 属性定义 checkbox 取消勾选后的情况； 
//"p" 表示操作会影响父级节点； 
//"s" 表示操作会影响子级节点。
//选择从哪个仪表板复制权限配置
var settingCopeFrom = {
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
      beforeCheck: zTreeBeforeCheck
  },
};

var zNodesCopeFrom =[];
//自定义按钮的部门树
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


var zNodesDept =[]
//自定义按钮的人员左侧的树
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
};
var zNodesDeptOrpeo =[
  // { id:1, pId:0, name:"随意勾选 1", open:true},
  // { id:11, pId:1, name:"随意勾选 1-1", open:true},
  // { id:111, pId:11, name:"随意勾选 1-1-1"},
  // { id:112, pId:11, name:"随意勾选 1-1-2"},
  // { id:12, pId:1, name:"随意勾选 1-2", open:true},
  // { id:121, pId:12, name:"随意勾选 1-2-1"},
  // { id:122, pId:12, name:"随意勾选 1-2-2"},
  // { id:2, pId:0, name:"随意勾选 2", open:true},
  // { id:21, pId:2, name:"随意勾选 2-1"},
  // { id:22, pId:2, name:"随意勾选 2-2", open:true},
  // { id:221, pId:22, name:"随意勾选 2-2-1"},
  // { id:222, pId:22, name:"随意勾选 2-2-2"},
  // { id:23, pId:2, name:"随意勾选 2-3"}
];

// msg 样式设置
var app={
  msg:function(message,style){
        var css={
          skin: 'layui-msg-style',
          offset: '20px'
      }

      css=$.extend(css,style);
        layer.msg(message,css);
  },
  alert:function(){
    layer.alert()
  },
  
  confirm:function(message,style,colseFun,delFun){
    var css = {
      skin: 'z-tipdel',
      area: ['420px', '180px'],
      btn: ['取消', '删除'],
      title: "提示",
      shadeClose: false,
  }
  css=$.extend(css,style);
  layer.confirm(message,css,colseFun,delFun)
  },
  showHtml:function(title,data1,fun1,fun2){
    var data =  {
      type: 1,
      title: [title, 'font-size: 20px;font-weight: 500;color: #FFFFFF;text-align:center;'],
      closeBtn: 1,
      area: ['598px', '490px'],
      skin: 'z-addDashboard', //没有背景色
      shadeClose: false,
      btn: ['取消', '保存'],
      content: $('#addDashboardContent'),
    }
    data=$.extend(data,data1);
    layer.open(data,fun1,fun2)

  },
  showIfar:function(){

  }
}
//loading
function showloading(t) {
  if (t) {//如果是true则显示loading
      loading = layer.load(1, {
          shade: [0.1, '#fff'] //0.1透明度的白色背景
      });
  } else {//如果是false则关闭loading
      layer.closeAll('loading');
  }
}

/* zTree事件 */
 //右侧按钮
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
  var editStr = ``
  if (treeNode.tId === 'treeDemo_1') {
    editStr += `<span class="dot" style="display:block" id="diyBtn_space_${treeNode.id}" onmouseleave="OnRightLeave(event,'','${treeNode.id}')" onmouseenter="debounce(OnRightClick(event,'','${treeNode.id}'), 300)">...</span>`
  } else {
    editStr += `<span class="dot" id="diyBtn_space_${treeNode.id}" onmouseleave="OnRightLeave(event,'','${treeNode.id}')" onmouseenter="debounce(OnRightClick(event,'','${treeNode.id}'), 300)">...</span>`
  }
    // + `<button type='button' onclick="getDome()" class='diyBtn1' id='diyBtn_${treeNode.id}'`
    // + "' title='"+treeNode.name+"' ></button>";
  aObj.parent().addClass('tree-item')
  aObj.append(editStr);
  var btn = $("#diyBtn_"+treeNode.id);
  // if (btn) btn.bind("click", function(){alert("diy Button for " + treeNode.name);});
}
//右侧按钮
function addDiyDom1(treeId, treeNode) {
  var aObj = $("#" + treeNode.tId + "_a");
    //treeNode.id 要根据树的数据中的id获取，zNodes 数据配置中的i
  // if ($("#diyBtn_"+treeNode.id).length>0) return; //控制哪些节点不显示按钮
  var editStr = "<span class='dot' id='diyBtn_space_"+treeNode.id+ "' >...</span>"
    // + "<button type='button' class='diyBtn1' id='diyBtn_" + treeNode.id
    // + "' title='"+treeNode.name+"' onfocus='this.blur();'></button>";
  aObj.append(editStr);
  var btn = $("#diyBtn_"+treeNode.id);
  if (btn) btn.bind("click", function(){alert("diy Button for " + treeNode.name);});
};

function groupNodeClick(event, treeId, treeNode) {
  let name = $("#userName").val();
  let stateVal = $('#mySelect option:selected').val();
  let revisionTimeVal = $("#revisionTime").val();
  let startTime = revisionTimeVal.split(' - ')[0]
  let endTime = revisionTimeVal.split(' - ')[1]
  endTime =endTime?dayjs(endTime).add(1, 'day').format('YYYY-MM-DD'):'';

  let dots = [...document.getElementsByClassName('dot')]
  let currentElem = ''
  if(event.target.parentElement.tagName === 'LI') {
    currentElem = document.querySelector(`#${event.target.id} span.dot `)
  } else {
    currentElem = document.querySelector(`#${event.target.parentElement.id} span.dot `)
  }
  dots.forEach(item => {
    if (item.id === currentElem.id) {
      item.style.display = 'block'
    } else {
      item.style.display = 'none'
    }
  })

  $(event.target)
  currentGroupNode = treeNode
  let postData = {
    appId,
    groupId: treeNode.id,
    current: 1,
    size: 10,
    updateTimeBegin: startTime,
    updateTimeEnd: endTime,
    published: stateVal,
    name: name,
  }
  request.get(`/bi/${appId}/panels`, {params: postData}).then(res => {
    let { data } = res.data
    renderTable(data.records, {size: res.data.data.size,pageIndex: res.data.data.current,})
    pageData = {
        totalCount: res.data.data.total, // 总条数
        totalPage: res.data.data.pages, // 总页数
        pageIndex: res.data.data.current, // 当前页
        pageSize: res.data.data.size, // 每页显示条数
    }
    renderPagination('popup-pagination')
    renderLis ()
    setPermissions()
  })
};

function setFontCss(treeId, treeNode) {
  let obj = {}
  // var str = $("#fenzuPosition").val()
  // if (treeNode.name == str) {
  //   obj = {
  //     color: '#409EFF',
  //     background: '#F9FAFD'
  //   }
  // }
	return obj
};
function getDome(treeNode){
  // alert(1)

};
function OnRightClick(event, treeId, treeNodeId) {
  let zTree = $.fn.zTree.getZTreeObj("treeDemo");
  let treeNode =  zTree.getNodeByParam("id",treeNodeId);
  currentRightNode = treeNode
  
  if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
      // zTree.cancelSelectedNode();
      showRMenu("root", event.clientX, event.clientY, event);
  } else if (treeNode && !treeNode.noR) {
      // zTree.selectNode(treeNode);
      if(currentRightNode['parentId']){
        showRMenu("node", event.clientX, event.clientY, event);
      }else{
        showRMenu("topNode", event.clientX, event.clientY, event);
      }
     
  }
}

function OnRightLeave() {
  hideRMenu()
}

function handelEnter() {
  rMenu.css({
    "visibility": "visible"
});
}

function handleLeave() {
  hideRMenu()
}

function beforeClickAdd(treeId, treeNode) {
  // var check = (treeNode && !treeNode.isParent);
  // // if (!check) alert("只能选择城市...");控制哪些层级不能选择
  // return check;
}


function onClickAdd(e, treeId, treeNode) {
  currentPositionNode = treeNode
  nodes = zTree.getSelectedNodes()
  let cityObj = $("#citySel")[0];
  cityObj.value = treeNode.name
}

function onClickAttr (e, treeId, treeNode) {
  currentPositionNode = treeNode
  nodes = zTree.getSelectedNodes()
  let pos = $("#attrPosition")[0];
  pos.value = treeNode.name
}

function beforeClickAddFenzu(treeId, treeNode) {
  var check = (treeNode && !treeNode.isParent);
  // if (!check) alert("只能选择城市...");控制哪些层级不能选择
  return check;
}


function onClickAddFenzu(e, treeId, treeNode) {
  nodes = addPTree.getSelectedNodes()
  // currentRightNode = treeNode
  editorNode = treeNode
  let cityObj = $("#fenzuPosition")[0];
  cityObj.value = treeNode.name
}


function onCheckTo(e,treeId,treeNode){
  var treeObj = $.fn.zTree.getZTreeObj("treeDemoCopeto")
  currentToNode = treeObj.getCheckedNodes(true)
}


function onCheckRaido(e,treeId,treeNode){
  if ( treeNode.checked) {
    currentFromNode = treeNode
  } else {
    currentFromNode = {}
  }
}


function zTreeBeforeCheck(treeId, treeNode) {
  // return treeNode.nodeType === 'panel';//当是父节点 返回false 不让选取
}

function onCheckDept(e,treeId,treeNode){
  myNodes=departTree.getCheckedNodes(true)
  let arr = []
  myNodes.forEach((item,index) => {
    arr.push({
      bizId: item.id,
      bizName: item.name,
      bizType: 'department'
    })
  })
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
}


function onClickSelectDept(e, treeId, treeNode) {
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
  let lis = [...$('#peopleSelect li')]
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

var checkPermissionsList = ''//权限
//获取权限
 async function checkPermissions(){
    await request.get(`bi/${appId}/users/permission/code`, {
      params: {
          appId
      }
  }).then(res => {
      let data = res.data
      if(data.code == 0){
          if(data.data){
            checkPermissionsList = data.data.filter(x=>x.code.indexOf('bi')>-1)
            setPermissions()
          }

      }else{
          layer.msg(data.msg)
      }
      
     

  })
  }
//调用权限
  function setPermissions(){
    // let list = checkPermissionsList
    let permissionsBtnList = checkPermissionsList
    var permissionsBtnMap={};
    permissionsBtnList.forEach(item=>{
      permissionsBtnMap[item.code]=item.exist;
    });
    $.each($('.checkPer'),function(){
     
       var code = $(this).data('permission');
       if(!permissionsBtnMap[code]){
         
        $(this).hide();
       }
       

    });
  }