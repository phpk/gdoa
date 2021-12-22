function showRMenu(type, x, y, event) {
    $("#rMenu ul").show();
    if (type == "root") {
        $("#m_del").parent().hide();
        $("#m_check").parent().hide();
        $("#m_unCheck").parent().hide();
    } else if ("topNode" == type) {
        $("#m_del").parent().hide();
        $("#m_check").parent().hide();
        $("#m_unCheck").show();
    } else {
        $("#m_del").parent().show();
        $("#m_check").parent().show();
        $("#m_unCheck").show();
    }


    // $('.nicescroll-slideBar').scrollTop
    let rect = event.target.getBoundingClientRect()

    // if (y >= $('.z-contentBoxLeft').innerHeight() - $('#rMenu').height()) {
    //     y = $('.z-contentBoxLeft').innerHeight() - ($('.z-contentBoxLeft').innerHeight() - y) - $('#rMenu').height();
    // } else {
    //     y += document.body.scrollTop;

    // }
    // x += document.body.scrollLeft;

    x = parseInt(rect.left) + parseInt(rect.width)
    y = parseInt(rect.top) /* + parseInt(rect.height) */ - 5

    rMenu.css({
        "top": y + "px",
        "left": x + "px",
        "visibility": "visible"
    });
    let data = checkPermissionsList.filter(x => x.code == "bi_configuration_view" || x.code == "bi_configuration_group_add" || x.code == "bi_configuration_group_edit" || x.code == "bi_configuration_group_delete")
    if (data.length <= 1 && data[0].exist) {
        $("#rMenu").hide()
    }
    $("body").bind("mousedown", onBodyMouseDown);

}

function hideRMenu() {
    if (rMenu) rMenu.css({
        "visibility": "hidden"
    });
    $("body").unbind("mousedown", onBodyMouseDown);
}

function onBodyMouseDown(event) {
    if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length > 0)) {
        rMenu.css({
            "visibility": "hidden"
        });
    }
}
//获取用户按钮权限
async function getpermissionsBtn() {
    await request.get(`bi/${appId}/users/permission/code`, {
        params: {
            appId
        }
    }).then(res => {
        let data = res.data
        if (data.code == 0) {
            if (data.data) {
                let list = data.data
                let permissionsBtnList = list.filter(x => x.code.indexOf('bi') > -1)
                permissionsBtnList.forEach(item => {
                    //查看权限
                    if (item.code == 'bi_configuration_view' && !item.exist) {
                        $("#rMenu").hide()
                        $("#addDashboardBtnLi").hide()
                        $("#batchReleaseBtn").hide()
                        $("#tableListBtn").hide()
                        $("table").find("td[data-field='score']").find("a").hide()

                    }
                    //新增分组
                    if (item.code == 'bi_configuration_group_add' && !item.exist) {
                        $("#m_add_btn").hide()
                    }
                    //编辑分组
                    if (item.code == 'bi_configuration_group_edit' && !item.exist) {
                        $("#m_check_btn").hide()
                    }
                    //删除分组
                    if (item.code == 'bi_configuration_group_delete' && !item.exist) {
                        $("#m_del_btn").hide()
                    }
                    //新增仪表板
                    if (item.code == 'bi_configuration_dashboard_add' && !item.exist) {
                        $("#addDashboardBtnLi").hide()
                    }
                    //删除仪表板
                    if (item.code == 'bi_configuration_dashboard_delete' && !item.exist) {
                        let edits = [...document.querySelectorAll('table .g-del')]
                        edits.forEach(item => {
                            item.style.display = 'none'
                        })
                    }
                    //编辑仪表板页面
                    if (item.code == 'bi_configuration_dashboard_edit' && !item.exist) {
                        // $('table .g-edit').forEach(item => {
                        // })
                        let edits = [...document.querySelectorAll('table .g-edit')]
                        edits.forEach(item => {
                            item.style.display = 'none'
                        })

                        // let tableList = $("table").find("td[data-field='score']").find("a[innerHTML='编辑']").hide()
                        // for(let i=0;i<tableList.length;i++){
                        //     if(tableList[i].innerHTML == '编辑'){
                        //         tableList[i].hide()
                        //     }
                        // }
                    }
                })
            }

        } else {
            layer.msg(data.msg)
        }



    })

}
// 获取右侧分组数数据 以及位置树数据
async function getGruopTree(name) {

    await request.get(`bi/${appId}/groups`, {
        params: {
            appId,
            name
        }
    }).then(res => {
     if(res.data.data){
        zNodes = res.data.data || [];
        zNodes.forEach(item=>{
           item.icon = "./img/icon_file.png"
        })
        // if(!zNodes)z
        $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        if(!name){
            $.fn.zTree.init($("#treeDemoAddFenzu"), settingAddFenzu, zNodes);
        }
        $.fn.zTree.init($("#treeDemoAdd"), settingAdd, zNodes);
        $.fn.zTree.init($("#treeAttr"), settingAttr, zNodes);
        zTree = $.fn.zTree.getZTreeObj("treeDemo");
        pTree = $.fn.zTree.getZTreeObj("treeDemoAdd");
        addPTree = $.fn.zTree.getZTreeObj("treeDemoAddFenzu");
        attrTree = $.fn.zTree.getZTreeObj("treeAttr");
        zTree.expandAll(true);
        pTree.expandAll(true);
        addPTree.expandAll(true);
        attrTree.expandAll(true);

        currentGroupNode = (zNodes || []).filter(x => x['parentId'] == null || x['parentId'] == '')[0];


        }


    })
}

// 右侧树查询
async function searchGroupTree(e) {
    await getGruopTree(e.target.value)

    setGroupChoice(currentGroupNode.name ? currentGroupNode.name : '')
    zTree.expandAll(true);

}

function addTreeNode() {

    hideRMenu();
    var newNode = {
        name: "增加" + (addCount++)
    };
    if (zTree.getSelectedNodes()[0]) {
        newNode.checked = zTree.getSelectedNodes()[0].checked;
        zTree.addNodes(zTree.getSelectedNodes()[0], newNode);
    } else {
        zTree.addNodes(null, newNode);
    }
}

function removeTreeNode() {
    hideRMenu();

    let current = zTree.getSelectedNodes()
    let nodes = []
    nodes.push(currentRightNode)
    if (nodes && nodes.length > 0) {
        var msg = ''
        if (nodes[0].children && nodes[0].children.length > 0) {
            msg = "删除分组将同时删除下级分组及仪表板，是否删除？";
        } else {
            msg = "确认删除该节点吗？";

        }
        app.confirm(msg, '', function (index, layero) {
            layer.close(index);
        }, function (index) { //index 当前行的id
            request.delete(`/bi/${appId}/groups/${nodes[0].id}`).then(async res => {
                if (res.data.code === 0) {
                    app.msg('删除成功!');
                    zTree.removeNode(nodes[0]);
                    // zTree.selectNode(current[0])
                    await getGruopTree()
                    zTree.expandAll(true)
                    setGroupChoice(current[0].name)
                    if (current[0].name === nodes[0].name) {
                        setDefaultChoice(zNodes[0].name)
                    }
                } else {
                    layer.msg(res.data.msg);
                }
            })
        })


    }
}

function checkTreeNode(checked) {
    var nodes = zTree.getSelectedNodes();
    if (nodes && nodes.length > 0) {
        zTree.checkNode(nodes[0], checked, true);
    }
    hideRMenu();
}

function resetTree() {
    hideRMenu();
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
}

function addNode() {
    for (var i = 0; i < zNodes.length; i++) {
        //给数组添加一个属性和属性值
        zNodes[i]["iconSkin"] = "icon" + i;
    }
}


// 位置树打开展示

function showMenu() {
    var cityObj = $("#citySel");
    var cityOffset = $("#citySel").offset();
    $("#menuContent").css({
        // left: cityOffset.left + "px",
        // top: cityOffset.top + cityObj.outerHeight() + "px"
    }).slideDown("fast");

    $("body").bind("mousedown", onBodyDown);
}

function hideMenu() {
    $("#menuContent").fadeOut("fast");
    $("body").unbind("mousedown", onBodyDown);
}

function showMenuFenzu() {
    var cityObj = $("#fenzuPosition");
    // let nodes = zTree.getSelectedNodes();
    var cityOffset = $("#fenzuPosition").offset();
    $("#menuContentFenzu").css({
        // left: cityOffset.left + "px",
        // top: cityOffset.top + cityObj.outerHeight() + "px"
    }).slideDown("fast");
    // zTree.setting.view.fontCss = {color: '#409EFF',background: 'red'}
    // zTree.updateNode(nodes[0])
    $("body").bind("mousedown", onBodyDown);

}

function hideMenuFenzu() {
    $("#menuContentFenzu").fadeOut("fast");
    $("body").unbind("mousedown", onBodyDown);
}

function openTreeAttr() {
    let position = $('#attrPosition')
    let posOffset = $("#attrPosition").offset();
    $("#attrwrap").css({
        // left: posOffset.left + "px",
        // top: posOffset.top + position.outerHeight() + "px"
    }).slideDown("fast");
    $("body").bind("mousedown", onBodyDown);
}

function hideTreeAttr() {
    $("#attrwrap").fadeOut("fast");
    $("body").unbind("mousedown", onBodyDown);
}

function onBodyDown(event) {
    if (!(event.target.id == "menuBtn" || event.target.id == "menuContentFenzu" || $(event.target).parents("#menuContentFenzu").length > 0)) {
        if (!([...event.target.classList].includes('noline_close') || [...event.target.classList].includes('noline_open'))) {
            hideMenu();
            hideMenuFenzu();
            hideTreeAttr()
        }
    }
}
// 表格初始化
function initTable(id, pager, type) {

    if (!pager) {
        pager = {
            pageIndex: 1,
            pageSize: 10
        }
    }

    // groupId 默认展示全部分组id
    showloading(true)
    request.get(`/bi/${appId}/panels`, {
        params: {
            appId,
            groupId: id,
            current: pager.pageIndex,
            size: pager.pageSize
        }
    }).then(res => {
        showloading(false)
        if (res.data.data) {
            renderTable(res.data.data.records, {
                size: res.data.data.size,
                pageIndex: res.data.data.current,
            })
            if (type == '1') {
                // currentPositionNode.
                setGroupChoice(currentPositionNode.name)
            } else {
                setGroupChoice(currentGroupNode.name)

            }

            pageData = {
                totalCount: res.data.data.total, // 总条数
                totalPage: res.data.data.pages, // 总页数
                pageIndex: res.data.data.current, // 当前页
                pageSize: res.data.data.size, // 每页显示条数
            }
            renderPagination('popup-pagination')
            renderLis()
            setPermissions()
        }

    })
}
//表格提示
function renderTooltip() {
    var tooltip
    $("tooltip").each(function (index, element) {
        var parent = element.parentElement
        element.onmouseenter = function () {
            if (parent.offsetWidth - 30 < element.offsetWidth) {
                tooltip = layer.open({
                    type: 4,
                    content: [element.innerText, element], //数组第二项即吸附元素选择器或者DOM
                    shade: 0,
                    tips: 1,
                    closeBtn: 0,
                    skin: 'table-tips',
                });
            }
        }
        parent.onmouseleave = function () {
            layer.close(tooltip);
        }
    });
}


// 渲染表格
function renderTable(data, pager, type) { // type 勾选缓存tableCheckList， 不清除
    pager = pager ? pager : pager.size = 10
    tableData = data
    data.forEach(item => {
        for (let key in item) {
            item[key] = item[key] || ''
        }
    })
    if (!type) {
        tableCheckList = []
    }

    layui.use(['table', 'laydate', 'laypage', 'layer', 'element'], function () {

        // showloading(true)
        var $ = layui.jquery
        laydate = layui.laydate //日期
        laypage = layui.laypage //分页
        layer = layui.layer //弹层
        table = layui.table //表格  
        element = layui.element //元素操作
        tableObj = table.render({});
        table.render({
            elem: '#myTable',
            data,
            skin: 'nob',
            text: {
                none: '暂无数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
            },
            // ,totalRow:true//开启该列的自动合计功能
            // height: $("#z-contentBoxRight-table").height()-20,
            page: false, //开启分页
            limit: pager.size, //每页默认显示的数量
            cellMinWidth: 60, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            cols: [
                [{
                        type: 'checkbox'
                    },
                    {
                        field: 'index',
                        width: 70,
                        title: '序号',
                        templet: function (d) {
                            return d.LAY_INDEX + (pager.pageIndex - 1) * 10;
                        }
                    },
                    {
                        field: 'name',
                        // width: '8%',
                        title: '名称',
                        templet: function (d) {
                            return '<tooltip>' + d.name + '</tooltip>'
                        }

                    },
                    {
                        field: 'groupName',
                        width: '12%',
                        title: '上级分组',
                        templet: function (d) {
                            return '<tooltip>' + d.groupName + '</tooltip>'
                        }
                    },
                    {
                        field: 'creatorName',
                        width: 120,
                        title: '创建者',
                        templet: function (d) {
                            return '<tooltip>' + d.creatorName + '</tooltip>'
                        }
                    },
                    {
                        field: 'updaterName',
                        width: 120,
                        title: '修改人',
                        templet: function (d) {
                            return '<tooltip>' + d.updaterName + '</tooltip>'
                        }
                    },
                    {
                        field: 'updateTime',
                        title: '最近修改时间',
                        templet: function (d) {
                            return '<tooltip>' + d.updateTime + '</tooltip>'
                        }
                        // width: '15%',
                    }, //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
                    {
                        field: 'published',
                        title: '状态',
                        width: '13%',
                        templet: function (d) {
                            return '<tooltip>' + d.published + '</tooltip>'
                        }

                    },
                    {
                        field: 'score',
                        title: '操作',
                        toolbar: '#barDemo',
                        width: 240,
                    },
                ]
            ],
            done: function (res, curr, count) { //回调函数
                var resD = res.data;
                var that = this.elem.next();
                var htm = '<i class="z-table-tips"></i>';
                resD.forEach(function (item, index) {
                    var div = that.find(".layui-table-box tbody tr[data-index='" + index + "'] td[data-field='published'] div");
                    if (item.hasWaitPublish) { //判断条件，符合条件给角标 
                        div.append(htm);
                    }
                });
                //勾选事件，id集合
                tableData.forEach((item, index) => {
                    if (tableCheckList.includes(item.id)) {
                        res.data[index]["LAY_CHECKED"] = 'true';
                        $('tr[data-index=' + index + '] input[type="checkbox"]').prop('checked', true);
                        $('tr[data-index=' + index + '] input[type="checkbox"]').next().addClass('layui-form-checked');
                    }
                })
                renderTooltip()
                $('.layui-none').css({
                    'height': document.getElementById("z-contentBoxRight-table").clientHeight - 50 + 'px',
                    'line-height': document.getElementById("z-contentBoxRight-table").clientHeight - 50 + 'px'
                })

            }
        });
        // //监听性别操作
        // table.on('switch(sexDemo)', function (obj) {
        //     layer.tips(this.value + ' ' + this.name + '：' + obj.elem.checked, obj.othis);
        // });

        // //监听锁定操作
        // table.on('checkbox(lockDemo)', function (obj) {
        //     layer.tips(this.value + ' ' + this.name + '：' + obj.elem.checked, obj.othis);
        // });
        //监听表格复选框选择
        table.on('checkbox(test)', function (obj) { //checkbox(test)中的test对应table标签中lay-filter="test"的test
            if (obj.type == 'one') { //单选操作
                if (obj.checked) { //选中
                    if (obj.data.published == '未发布') {
                        tableCheckList.push(obj.data.id)
                    }
                } else { //取消选中
                    tableCheckList.forEach((item, index) => {
                        if (item === obj.data.id) {
                            tableCheckList.splice(index, 1)
                        }
                    })
                }
            } else { //全选操作
                if (obj.checked) { //选中
                    tableData.forEach(item => {
                        if (!tableCheckList.includes(item.id)) {
                            if (item.published == '未发布') {
                                tableCheckList.push(item.id)
                            }
                        }
                    })
                } else {
                    tableCheckList = []
                }
            }
            if (tableCheckList.length >= 2) {
                $("#batchRelease").css("background", "#409EFF");
                // $("#batchRelease").css("pointer-events", "auto")
                $('#batchRelease').on('click', batchSubmitWt);

            } else {
                $("#batchRelease").css("background", "#9FCEFF");
                // $("#batchRelease").css("pointer-events", "none")
            }
        });



        //监听工具条
        table.on('tool(test)', function (obj) { //tool(test)中的test对应table标签中lay-filter="test"的test
            var data = obj.data;
            if (obj.event === 'edit') {
                // layer.msg('跳转页面');
                // postMessage 给sass页面传递值
                window.parent.postMessage({
                    id: data.id,
                    source: 'SYCBI'
                }, '*')
            } else if (obj.event === 'del') {
                app.confirm("确定要删除" + data.name + "?", '', function (index, layero) {
                    layer.close(index);
                }, function (index) { //index 当前行的id
                    request.delete(`/bi/${appId}/panels/${data.id}`).then(res => {
                        if (res.data.code === 0) {
                            app.msg('删除成功!')
                            let zTree = $.fn.zTree.getZTreeObj("treeDemo");
                            let node = zTree.getSelectedNodes();
                            initTable(node[0].id, pageData)
                            layer.close(index);
                        } else {
                            layer.msg(res.data.msg)
                        }
                    })
                });
            } else if (obj.event === 'offline') {
                app.confirm("确定要下线" + data.name + "?", {
                        btn: ['取消', '下线']
                    },
                    function (index, layero) {
                        //按钮【按钮一】的回调
                        layer.close(index);
                    },
                    function (index) {
                        request.put(`/bi/${appId}/panels/${data.id}/offline`).then(res => {
                            if (res.data.code === 0) {
                                app.msg('下线成功!')
                                let zTree = $.fn.zTree.getZTreeObj("treeDemo");
                                let node = zTree.getSelectedNodes();
                                initTable(node[0].id)
                                layer.close(index);
                            } else {
                                layer.msg(res.data.msg)
                            }
                        })
                    });
            } else if (obj.event === 'release') {
                app.confirm("确定要发布" + data.name + "?", {
                        btn: ['取消', '发布']
                    },
                    function (index, layero) {
                        layer.close(index);
                    },
                    function (index) {
                        request.put(`/bi/${appId}/panels/publish?ids=${data.id}`).then(res => {
                            if (res.data.code === 0) {
                                app.msg('发布成功!');
                                // layer.msg('发布成功!',msgStyle)
                                let zTree = $.fn.zTree.getZTreeObj("treeDemo");
                                let node = zTree.getSelectedNodes();
                                initTable(node[0].id)
                                layer.close(index);
                            } else {
                                layer.msg(res.data.msg)
                            }
                            $(".layui-table-main").niceScroll({
                                cursorcolor: "#ddd",
                                cursorwidth: "10px",
                                cursorborder: "none",
                                zindex: "99999999",
                            });
                        })
                    });
            } else if (obj.event === 'attribute') {

                app.showHtml('属性', {
                    content: $('#attribute'),
                    success: function (res, curr, count) { //回调函数
                        request.get(`/bi/${appId}/panel-permissions/${data.id}`).then(res => {
                            let data1 = res.data || {}
                            if (data1) {
                                $(`input[name='permission'][value='${data1.data.accessType}']`).prop('checked', true)
                                $(`#attribute-describeVal`).val(data1.data.description)
                                layui.form.render()
                                if (res.data.data.accessType == "custom") {
                                    $("#z-selectDept").show();
                                    $("#layui-form-margin9").css("margin-bottom", "0px");
                                    let names = []
                                    if (res.data.data.customPermissions.length !== 0) {
                                        res.data.data.customPermissions.forEach(item => {
                                            if (item.bizType === 'department') { //部门department
                                                checkDeptArr.push(item)
                                                cloneDepart.push(item)
                                                names.push(item.bizName)
                                                zNodesDept
                                            } else if (item.bizType === 'user') { //人员user
                                                peopleArr.push(item)
                                                clonePeople.push(item)
                                                names.push(item.bizName)
                                            } else { //岗位 position
                                                jobArr.push(item)
                                                cloneJob.push(item)
                                                names.push(item.bizName)
                                            }
                                        })
                                        $("#z-selectDeptInp").val(names);
                                        permissionList = checkDeptArr.concat(peopleArr).concat(jobArr)
                                    }

                                } else {
                                    $("#z-selectDept").hide();
                                    $("#layui-form-margin9").css("margin-bottom", "15px");
                                }
                                $("#attrName").val(data1.data.panelName)
                                $("#attrPosition").val(data1.data.groupName)
                                currentPositionNode.id = data1.data.groupId


                            }

                        })

                    },
                    btn2: function (index, layero) {

                        var name = $("#attrName").val();
                        var position = $("#attrPosition").val();
                        $("#attrName").removeClass("valNUllBorder");
                        $("#attrPosition").removeClass("valNUllBorder");
                        if (name == "") {
                            layer.msg('请填写名称');
                            $("#attrName").addClass("valNUllBorder");
                            return false
                        } else if (position == "") {
                            layer.msg('请选择位置');
                            $("#attrPosition").addClass("valNUllBorder");
                            return false
                        } else {
                            let panelName = $('#attrName').val()
                            let groupId = currentPositionNode.id
                            let panelId = data.id
                            let description = $('#attribute-describeVal').val()
                            let accessType = $("input[name='permission']:checked").val();
                            if (accessType === 'custom') {
                                if (permissionList.length === 0) {
                                    layer.msg('请设置权限');
                                    return false
                                }
                            }
                            let postData = {
                                panelName,
                                groupId,
                                accessType,
                                panelId,
                                description,
                                customPermissions: permissionList
                            }
                            request.post(`/bi/${appId}/panel-permissions`, postData).then(res => {
                                if (res.data.code === 0) {
                                    app.msg('保存成功!')
                                    cloneDepart = []
                                    cloneJob = []
                                    clonePeople = []
                                    let zTree = $.fn.zTree.getZTreeObj("treeDemo");
                                    let node = zTree.getSelectedNodes();
                                    initTable(node[0].id)
                                    layer.close(index);
                                } else {
                                    layer.msg(res.data.msg)
                                }
                            })
                        }
                    },
                    end: function () {
                        permissionList = []
                        jobArr = []
                        checkDeptArr = []
                        peopleArr = []
                        currentPeopleNode = {}
                        $('#viewTpl').html('')
                        $('#viewTpl2').html('')
                        $('#viewTpl3').html('')
                        $('#z-selectDeptInp').val('')
                        $("#attrName").val('');
                        $("#attrPosition").val('');
                        $('#attribute-describeVal').val('')
                        $("#attrName").removeClass("valNUllBorder");
                        $("#attrPosition").removeClass("valNUllBorder");
                        attrTree.cancelSelectedNode()
                    },
                });
            } else if (obj.event === 'edit') {
                layer.alert('编辑行：<br>' + JSON.stringify(data))
            }

        });
        $("#z-contentBoxRight-table").css('top',$('.z-contentBoxRight-top').height()+'px')
  $("#myTable").css('height',$("#z-contentBoxRight-table").height()-60+'px')
  $(".layui-table-body").css('height',$("#z-contentBoxRight-table").height()-60+'px')
  $(".layui-table-view").css('height',$("#z-contentBoxRight-table").height()-60+'px')
        //表格搜索，重载
        // var $ = layui.$, activeSearch = {
        //     reload: function(){
        //         var userName = $("#userName").val();
        //         var stastVal = $("#mySelect").find("option:selected").val();
        //         var revisionTimeVal = $("#revisionTime").val();
        //         //执行重载
        //         table.reload('myTable', {	//myTable为table中的id
        //             page: {
        //             curr: 1 //重新从第 1 页开始
        //             }
        //             ,where: {
        //                 id:"10000",
        //             }
        //             }
        //         )
        //     }
        // };

        // $('#searchBtn').on('click', function(){	//search为搜索button中设置的id名
        //     var type = $(this).data('type');
        //     activeSearch[type] ? activeSearch[type].call(this) : '';
        // });
        // 转换时间格式，并转换为时间戳
        function tranDate(time) {
            return new Date(time.replace(/-/g, '/')).getTime();
        }
    });
}


// 查询表格数据
function searchTableData() {
    let name = $("#userName").val();
    let stateVal = $('#mySelect option:selected').val();
    let revisionTimeVal = $("#revisionTime").val();
    let startTime = revisionTimeVal.split(' - ')[0]
    let endTime = revisionTimeVal.split(' - ')[1]
    endTime = endTime ? dayjs(endTime).add(1, 'day').format('YYYY-MM-DD') : '';
    let postData = {
        appId,
        groupId: currentGroupNode.id,
        updateTimeBegin: startTime,
        updateTimeEnd: endTime,
        published: stateVal,
        name: name,
    }
    showloading(true)
    request.get(`/bi/${appId}/panels`, {
        params: postData
    }).then(res => {
        showloading(false)
        let {
            data,
            msg
        } = res.data
        if (data != null && data != '') {
            pageData.pageIndex = 1
            renderTable(data.records, {
                size: res.data.data.size,
                pageIndex: res.data.data.current,
            })
            pageData = {
                totalCount: res.data.data.total, // 总条数
                totalPage: res.data.data.pages, // 总页数
                pageIndex: res.data.data.current, // 当前页
                pageSize: res.data.data.size, // 每页显示条数
            }
            renderPagination('popup-pagination')
            renderLis()
            setPermissions()

        } else {
            layer.confirm(msg, {

                    skin: 'z-tipoffline',
                    area: ['420px', '136px'],
                    title: "提示",
                    btn: ['确定']
                },
                function (index, layero) {
                    //按钮【按钮一】的回调
                    layer.close(index);
                }
            );
        }

    })
    $(".layui-table-main").niceScroll({
        cursorcolor: "#ddd",
        cursorwidth: "10px",
        cursorborder: "none",
        zindex: "99999999",
    });
}
// 
function setDefaultChoice(name) {

    let node = zTree.getNodeByParam("name", name, null);
    zTree.selectNode(node)
    initTable(node.id)
}

// 设置分组树默认选中
function setGroupChoice(name) {
    name = name || ((zNodes || []).filter(x => x['parentId'] == null || x['parentId'] == ''))[0].name
    // let nodes = zTree.getNodes();
    // nodes.forEach((item,index) => {
    //     if (item.name == name) {
    //         zTree.selectNode(nodes[index]);
    //         currentGroupNode = nodes[index]
    //     }
    // })
    let node = zTree.getNodeByParam("name", name, null);
    zTree.selectNode(node)
    currentGroupNode = node
    //initTable(node.id)
}

// 设置位置树默认选中
function setPositionChoice(name) {
    let node = addPTree.getNodeByParam("name", name, null);
    addPTree.selectNode(node)
}


$(document).on('click', "#viewTpl i", function () {
    //上面删除了哪个节点，也要修改获取选中节点数组nodes
    $(this).parent('li').remove();
    var selectId = $(this).attr("data-id");
    treeObjDept.checkNode(myNodes[selectId], false, true, true);
});

async function getToken() {
    let postData = {
        account: 15865516442,
        origin: 0,
        password: 123456,
    }
    // 获取url值
    let token = getParams('token', window.location.href)
    token = token ? token : 'cca20c8c-507b-43e0-8ca6-3571ae779698'
    //   设置token,可删除
    localStorage.setItem("token", token)
    appId = getParams('appId', window.location.href)
    appId = appId ? appId : 'TEST123_o582'

    let tenantId = getParams('tenantId', window.location.href)
    tenantId = tenantId ? tenantId : 'TEST123_o582'
    localStorage.setItem("tenantId", tenantId)
    // await request.post(`/bi/tokens`,null, { params: postData }).then(res => {
    //     if (res.data.code === 0) {
    //         localStorage.setItem("token", res.data.data.token)
    //         appId = res.data.data.appId
    //     }
    //  })
}


//页面初始化
$(document).ready(async function () {
    await getToken()
    await getGruopTree()
    await checkPermissions();
    rMenu = $("#rMenu");
    // 设置默认展开
   
    addNode(); //给后台返回的tree数据添加属性
    if (currentGroupNode) {
        initTable(currentGroupNode.id)

    }
    $("#z-contentBoxRight-table").css('top',$('.z-contentBoxRight-top').height()+'px')
    $("#myTable").css('height',$("#z-contentBoxRight-table").height()-60+'px')
    $(".layui-table-body").css('height',$("#z-contentBoxRight-table").height()-60+'px')
    $(".layui-table-view").css('height',$("#z-contentBoxRight-table").height()-60+'px')
   
    // await getpermissionsBtn()


});
$(window).resize(function(){
    $("#z-contentBoxRight-table").css('top',$('.z-contentBoxRight-top').height()+'px')
    $("#myTable").css('height',$("#z-contentBoxRight-table").height()-60+'px')
    $(".layui-table-body").css('height',$("#z-contentBoxRight-table").height()-60+'px')
    $(".layui-table-view").css('height',$("#z-contentBoxRight-table").height()-60+'px')
})

window.onzoom = function(e) {
    // zoom even
}
layui.use('laydate', function () {
    var laydate = layui.laydate;
    //日期范围
    laydate.render({
        elem: '#revisionTime',
        range: true,
        theme: '#409eff',
        value: "",
        change: function (value, date, endDate) {
            searchObjData.revision = value //得到日期生成的值，如：2017-08-18
        }
    });
});
//加载form模块
layui.use('form', function () {
    var form = layui.form;
    form.on('submit(demo1)', function (data) {
        var data1 = form.val("attribute");
        var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
        //parent.layer.close(index);  // 关闭layer
        //window.parent.location.reload(); //刷新父页面
    });
    // form.on('select(mySelect)', function(data){
    //         //1:拿到select对象： 
    // 		var myselect=data.elem;
    // 		//2：拿到选中项的索引：
    // 		var index=myselect.selectedIndex ; // selectedIndex代表的是你所选中项的index
    // 		//3:拿到选中项options的value： 
    // 		searchObjData.state = myselect.options[index].value;
    // 		//4:拿到选中项options的text： 
    // 		stateText = myselect.options[index].text;
    // });
    // form.on('select(aihao)', function(data){
    //     var myselect=data.elem;
    //     var index=myselect.selectedIndex ;
    //     attributeObjData.positionVal = myselect.options[index].value;
    //     attributeObjData.positionText = myselect.options[index].text;
    // });
    form.on('radio(policyRadio)', function (data) {
        policyRadioVal = data.value //被点击的 radio 的 value 值
        cloneDepart = []
        cloneJob = []
        clonePeople = []
        if (policyRadioVal == "custom") {
            $("#z-selectDept").show();
            $("#layui-form-margin9").css("margin-bottom", "0px");
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
            $("#z-selectDept").hide();
            $("#layui-form-margin9").css("margin-bottom", "15px");
        }
    });
});

function batchSubmitWt() {
    if (tableCheckList.length === 0) {
        return false;
    } else {
        let result = false;
        layer.confirm("确定要批量发布仪表板?", {
                skin: 'z-batchRelease',
                title: "提示",
                area: ['420px', '136px'],
                btn: ['取消', '发布']
            },
            function (index, layero) {
                layer.close(index);
            },
            function (index) {
                let data = tableCheckList.join(',')
                request.put(`/bi/${appId}/panels/publish?ids=${data}`).then(res => {
                    if (res.data.code === 0) {
                        layer.msg('发布成功!', {
                            skin: 'layui-msg-style'
                        })
                        initTable(currentGroupNode.id)
                        layer.close(index);
                    } else {
                        layer.msg(res.data.msg)
                    }
                })
                return result
            }
        )
    }
}
$('#addDashboard').on('click', function () {
    // treeDemoAdd
    // var zTree = $.fn.zTree.getZTreeObj("treeDemoAdd")
    // zTree.selectNode(currentGroupNode);
    let id = currentGroupNode.id
    currentPositionNode = currentGroupNode
    app.showHtml('新增看板', {
        content: $('#addDashboardContent'),
        success: function (layero, index) {
            //完成后的回调
            $("#citySel")[0].value = currentGroupNode.name

        },
        btn2: function (index, layero) {
            //return false 开启该代码可禁止点击该按钮关闭
            //保存的回调
            let result = false;
            let addDashboardNameVal = $("#addDashboardName").val();
            let grouping = $("#citySel").val();
            $("#addDashboardName").removeClass("valNUllBorder");
            $("#citySel").removeClass("valNUllBorder");
            if (addDashboardNameVal == "") {
                layer.msg('请填写名称');
                $("#addDashboardName").addClass("valNUllBorder");
                return false
            } else if (grouping == "") {
                layer.msg('请选择位置');
                $("#citySel").addClass("valNUllBorder");
                return false
            } else {
                let postData = {
                    appId,
                    name: addDashboardNameVal,
                    groupId: currentPositionNode.id ? currentPositionNode.id : id
                }
                request.post(`/bi/${appId}/panels`, postData).then(async res => {
                    if (res.data.code === 0) {
                        app.msg('添加成功!')
                        layer.close(index);
                        await getGruopTree()

                        $("#addDashboardName")[0].value = ''
                        $("#citySel")[0].value = ''
                        zTree.expandAll(true);

                        initTable(currentPositionNode.id, '', '1')

                    } else {
                        layer.msg(res.data.msg)
                    }
                })
                // layui.table.reload('myTable', {	//myTable为table中的id
                //         page: {
                //         curr: 1 //重新从第 1 页开始
                //         }
                //     }
                // )
                // $(".layui-table-main").niceScroll({
                //     cursorcolor: "#ddd",
                //     cursorwidth:"10px",
                //     cursorborder:"none",
                //     zindex:"99999999",
                // });
            }
            return result
        },
        end: function () {
            $("#addDashboardName")[0].value = ''
            $("#citySel")[0].value = ''
            $("#addDashboardName").removeClass("valNUllBorder");
            $("#citySel").removeClass("valNUllBorder");
            pTree.cancelSelectedNode()
        }
    });
});
$('#copeConfigureTo').on('click', function () {
    var name = $("#attrName").val();
    var position = $("#attrPosition").val();
    $("#attrName").removeClass("valNUllBorder");
    $("#attrPosition").removeClass("valNUllBorder");
    if (name == "") {
        layer.msg('请填写名称');
        $("#attrName").addClass("valNUllBorder");
        return false
    } else if (position == "") {
        layer.msg('请选择位置');
        $("#attrPosition").addClass("valNUllBorder");
        return false
    } else {
        app.showHtml('选择要将权限配置复制到的仪表板', {
            btn: ['取消', '应用'],
            content: $('.copeConfigureTo1'),
            area: ['599px', '620px'],
            success: function (layero, index) {
                //完成后的回调
                request.get(`/bi/${appId}/panel-tree/copy`).then(res => {
                    if (res.data.data) {
                        zNodesCopeto = res.data.data
                        zNodesCopeto.forEach(item => {
                            if (item.nodeType !== 'panel') {
                                item.nocheck = true
                                item.icon = "./img/icon_file.png"
                            } else {
                                item.icon = "./img/iconTool/icon_monitor_nor.png"
                            }
                        })
                        $.fn.zTree.init($("#treeDemoCopeto"), settingCopeto, zNodesCopeto);
                        zNodesCopeto = $.fn.zTree.getZTreeObj("treeDemoCopeto");
                        zNodesCopeto.expandAll(true)

                    }

                })
            },
            yes: function (index) {
                $("#copeConfigureTo1-search-input").val("")
                layer.close(index);

            },
            btn2: function (index, layero) {
                if (currentToNode.length === 0) {
                    layer.msg('请选择仪表板');
                    return false
                } else {
                    let panelName = $('#attrName').val()
                    let groupId = currentPositionNode.id
                    let panelId = data.id
                    let description = $('#attribute-describeVal').val()
                    let accessType = $("input[name='permission']:checked").val();
                    if (accessType === 'custom') {
                        if (permissionList.length === 0) {
                            layer.msg('请设置访问权限');
                            return false
                        }
                    }
                    let panelIds = []
                    currentToNode.forEach((item) => {
                        panelIds.push(item.id)
                    })
                    let paramsData = panelIds.join()
                    let postData = {
                        panelName,
                        groupId,
                        accessType,
                        panelId,
                        description,
                        customPermissions: permissionList
                    }
                    request.post(`/bi/${appId}/panel-permissions/copy-to?panelIds=${paramsData}`, postData).then(res => {
                        if (res.data.code === 0) {
                            layer.msg('应用成功!', {
                                skin: 'layui-msg-style',
                                offset: '20px',
                            })
                            layer.close(index);
                        } else {
                            layer.msg(res.data.msg)
                        }
                    })
                    // $.ajax({
                    //     url: methodsApi.getworkstats1_get,
                    //     type: "post",
                    //     contentType: "application/json",
                    //     data: JSON.stringify(searchObjData),
                    //     dataType: "json",
                    //     /* async: false, */
                    //     success: function (res) {

                    //     },
                    //     error: function (err) {
                    //         wui.errorNotice("获取信息失败");
                    //     }
                    // });
                }
            },
            cancel: function () {
                $('#cope-search-input').val("")
            }
        });
    }
});
$('#copeConfigureFrom').on('click', function () {
    app.showHtml('选择从哪个仪表板复制权限配置', {
        btn: ['取消', '应用'],
        content: $('.copeConfigureForm'),
        area: ['599px', '620px'],
        success: function (layero, index) {
            //完成后的回调
            request.get(`/bi/${appId}/panel-tree/copy`).then(res => {
                zNodesCopeFrom = res.data.data
                zNodesCopeFrom.forEach(item => {
                    if (item.nodeType !== 'panel') {
                        item.nocheck = true
                        item.icon = "./img/icon_file.png"
                    } else {
                        item.icon = "./img/iconTool/icon_monitor_nor.png"
                    }
                })
                $.fn.zTree.init($("#treeDemoCopeFrom"), settingCopeFrom, zNodesCopeFrom);
                zNodesCopeto = $.fn.zTree.getZTreeObj("treeDemoCopeFrom");
                zNodesCopeto.expandAll(true)

            })
        },
        yes: function (index, layero) {
            $('#cope-search-input').val("")
            layer.close(index);
        },
        btn2: function (index, layero) {
            if (JSON.stringify(currentFromNode) == "{}") {
                layer.msg('请选择仪表板');
                return false
            } else {
                request.get(`/bi/${appId}/panel-permissions/${currentFromNode.id}/to-copy`).then(res => {
                    jobArr = []
                    checkDeptArr = []
                    peopleArr = []
                    if (res.data.code === 0) {
                        layer.msg('应用成功!')
                        $(`input[name='permission'][value='${res.data.data.accessType}']`).prop('checked', true)
                        $(`#attribute-describeVal`).val(res.data.data.description)
                        
                        
                        if (res.data.data.accessType === 'custom' ) {
                            $("#z-selectDept").show();
                            $("#layui-form-margin9").css("margin-bottom", "0px");

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
                            $("#z-selectDept").hide();
                            $("#layui-form-margin9").css("margin-bottom", "15px");
                        }
                        layui.form.render()
                        permissionList = res.data.data.customPermissions
                        layer.close(index);
                    } else {
                        layer.msg(res.data.msg)
                    }
                })
                // $.ajax({
                //     url: methodsApi.getworkstats1_get,
                //     type: "post",
                //     contentType: "application/json",
                //     data: JSON.stringify(searchObjData),
                //     dataType: "json",
                //     /* async: false, */
                //     success: function (res) {

                //     },
                //     error: function (err) {
                //         wui.errorNotice("获取信息失败");
                //     }
                // });
            }
        },
        cancel: function () {
            $('#cope-search-input').val("")
        }
        // end: function (index){
        // }
    });
});

// fromTree搜索
function searchFromTree(e) {
    let postData = {
        appId,
        name: e.target.previousElementSibling.value
    }
    request.get(`/bi/${appId}/panel-tree/copy`, {
        params: postData
    }).then(res => {
        zNodesCopeFrom = res.data.data
        zNodesCopeFrom.forEach(item => {
            if (item.nodeType !== 'panel') {
                item.nocheck = true
                item.icon = "./img/icon_file.png"
            } else {
                item.icon = "./img/iconTool/icon_monitor_nor.png"
            }
        })
        $.fn.zTree.init($("#treeDemoCopeFrom"), settingCopeFrom, zNodesCopeFrom);
        zNodesCopeFrom = $.fn.zTree.getZTreeObj("treeDemoCopeFrom");
        zNodesCopeFrom.expandAll(true)

    })
}

// toTree搜索
function searchToTree(e) {
    let postData = {
        appId,
        name: e.target.previousElementSibling.value
    }
    request.get(`/bi/${appId}/panel-tree/copy`, {
        params: postData
    }).then(res => {
        if (res.data.data) {
            zNodesCopeto = res.data.data
            zNodesCopeto.forEach(item => {
                if (item.nodeType !== 'panel') {
                    item.nocheck = true
                    item.icon = "./img/icon_file.png"
                } else {
                    item.icon = "./img/iconTool/icon_monitor_nor.png"
                }
            })
            $.fn.zTree.init($("#treeDemoCopeto"), settingCopeto, zNodesCopeto);
            zNodesCopeto = $.fn.zTree.getZTreeObj("treeDemoCopeto");
            zNodesCopeto.expandAll(true)


        }

    })
}

var selectAllData = "";
$('#z-selectDeptInp').on('click', function () {
    app.showHtml('自定义访问权限', {
        area: ['498px', '590px'],
        content: $('.z-selectDeptInp'),
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
                    let jobArrdata = jobNames;
                    let getTpl = jobArrTpl.innerHTML;
                    view = document.getElementById('viewTpl2');
                    if (jobArrdata.length >= 0) {
                        laytpl(getTpl).render(jobArrdata, function (html) {
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
                peopleTree.selectNode(currentPeopleNode)
            })
            request.get(`/bi/${appId}/users`).then(res => {
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
            })
        },
        btn2: function (index, layero) {
            if (($("#viewTpl li").length == 0) && ($("#viewTpl2 li").length == 0) && ($("#viewTpl3 li").length == 0)) {
                layer.msg('请配置权限');
                return false;
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
});
//表头重置方法
$("#resetBtn").on('click', function () {
    $("#userName").val("");
    $("#revisionTime").val("");
    $("#mySelect").siblings("div.layui-form-select").find("dd:first").click();
    initTable(currentGroupNode.id)
})
//自定义权限中的职位勾选事件
$(document).on("click", "#rankSelect i", function (e) {
    if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        let id = []
        id.push($(this).siblings().data().id)
        jobArr.forEach((item, index) => {
            if (id.includes(item.bizId)) {
                jobArr.splice(index, 1)
            }
        })
        // jobArr.splice($.inArray($(this).siblings().text(),jobArr),1);
    } else {
        $(this).addClass("active");
        jobArr.push({
            bizId: $(this).siblings().data().id,
            bizName: $(this).siblings().text(),
            bizType: 'position'
        })
    }

    //模板引擎
    layui.use('laytpl', function () {
        let laytpl = layui.laytpl;
        //第三步：渲染模版
        let jobArrdata = [];
        jobArr.forEach(item => {
            jobArrdata.push(item.bizName)
        })
        let getTpl = jobArrTpl.innerHTML;
        view = document.getElementById('viewTpl2');
        if (jobArrdata.length >= 0) {
            laytpl(getTpl).render(jobArrdata, function (html) {
                view.innerHTML = html;
            });
        }
    });
})
// 监听tabs页面
layui.use('element', function () {
    var element = layui.element;
    //一些事件触发
    element.on('tab(docDemoTabBrief)', function (ele) {
        if (ele.index === 0) {
            return
        }
        if (ele.index === 1) {
            let lis = [...$('#rankSelect li')]
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
            return
        }
        if (ele.index === 2) {
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
            // })
            return
        }
    });
});
// 搜索职位
function searchJob(event) {
    let html = ''
    let postData = {
        appId,
        positionName: event.target.value
    }
    request.get(`/bi/${appId}/positions`, {
        params: postData
    }).then(res => {
        res.data.data.forEach(item => {
            html += `<li class="clearfix">
            <span class="g-left" data-id="${item.id}">${item.name}</span>
            <i class="g-right"></i>
        </li>`
        })
        $('#rankSelect').html(html)
        let lis = [...$('#rankSelect li')]
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
}
// 搜索部门
function searchDept(event) {
    let postData = {
        appId,
        deptName: event.target.value
    }
    request.get(`/bi/${appId}/departments`, {
        params: postData
    }).then(res => {
        zNodesDept = res.data.data
        let departNames = []
        checkDeptArr.forEach(item => {
            departNames.push(item.bizName)
        })
        zNodesDept.forEach((item, index) => {
            if (departNames.includes(item.name)) {
                zNodesDept[index].checked = true
            }
        })
        $.fn.zTree.init($("#treeDept"), settingDept, zNodesDept);
        departTree.expandAll(true)
    })
}
// 搜索用户
function searchName(event) {
    let str = ``
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
// 人员复选框点击事件
$(document).on("click", "#peopleSelect i", function (e) {
    if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        let id = []
        id.push($(this).siblings().data().id)
        peopleArr.forEach((item, index) => {
            if (id.includes(item.bizId)) {
                peopleArr.splice(index, 1)
            }
        })
    } else {
        $(this).addClass("active");
        peopleArr.push({
            bizId: $(this).siblings().data().id,
            bizName: $(this).siblings().text(),
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
})
$(document).on("click", "#viewTpl2 i", function (e) {
    var jobVal = $(this).siblings().text();
    $("#rankSelect span").each(function () {
        if ($(this).text() == jobVal) {
            $(this).siblings().removeClass("active");
        }

    });
    $(this).parents("li").remove();
    jobArr.splice($.inArray($(this).siblings().text(), jobArr), 1);
})
$(document).on("click", "#viewTpl3 i", function (e) {
    var jobVal = $(this).siblings().text();
    $("#peopleSelect span").each(function () {
        if ($(this).text() == jobVal) {
            $(this).siblings().removeClass("active");
        }
    });
    $(this).parents("li").remove();
    peopleArr.splice($.inArray($(this).siblings().text(), peopleArr), 1);
})
//获取层级数
function getMaxlevel(treeData) {

    let level = 0
    let v = this
    let maxLevel = 0

    function loop(data, level) {
        data.forEach(item => {
            item.level = level
            if (level > maxLevel) {
                maxLevel = level
            }
            if ('children' in item) {
                if (item.children.length > 0) {
                    loop(item.children, level + 1)
                }
            }
        })
    }
    loop(treeData, 1)
    return maxLevel

}
//主页左侧树的增删改事件
$(document).on("click", "#m_add", function (e) {
    if (currentRightNode.level >= 11) {
        layer.msg('最多只能创建11个分组')
        return
    }
    // zTree.getSelectedNodes();
    // if(getMaxlevel(zTree.getNodes()) >= 12){
    //     layer.msg('最多只能创建11个分组')
    //     return
    // }
    hideRMenu();
    app.showHtml('新建分组', {
        content: $('#Z-addFenZU'),

        success: function (layero, index) {
            //完成后的回调 如果是编辑操作，根据id获取数据回填表单
            // let nodes = zTree.getSelectedNodes();
            $("#fenzuPosition")[0].value = currentRightNode.name
            // currentPositionNode = currentRightNode
            setPositionChoice(currentRightNode.name)
        },
        btn2: function (index, layero) {
            //return false 开启该代码可禁止点击该按钮关闭
            //保存的回调
            var dataObj = idsArr; // id
            let result = false;
            var fenzuNameVal = $("#fenzuName").val(); //名称
            var fenzuPositionVal = $("#fenzuPosition").val(); //位置
            $("#fenzuName").removeClass("valNUllBorder");
            $("#fenzuPosition").removeClass("valNUllBorder");
            if (fenzuNameVal == "") {
                layer.msg('请填写名称');
                $("#fenzuName").addClass("valNUllBorder");
                return false
            } else if (fenzuPositionVal == "") {
                layer.msg('请选择位置');
                $("#fenzuPosition").addClass("valNUllBorder");
                return false
            } else {
                let nodes = zTree.getSelectedNodes();
                // let isNull = currentPositionNode.parentId ? nodes[0] : null
                let id =  currentRightNode.id
                if(editorNode.id){
                    id = editorNode.id
                }
                let postData = {
                    name: fenzuNameVal,
                    parentId: id
                }
                request.post(`/bi/${appId}/groups`, postData).then(async res => {
                    if (res.data.code === 0) {
                        app.msg('添加成功!')
                        layer.close(index);
                        await getGruopTree()
                        zTree.expandAll(true)
                        setGroupChoice(nodes[0].name)
                        $("#fenzuName")[0].value = ''
                        $("#fenzuPosition")[0].value = ''
                        editorNode = {}
                    } else {
                        layer.msg(res.data.msg);
                    }
                })
            }
            return result
        },
        end: function () {
            $("#fenzuName")[0].value = ''
            $("#fenzuPosition")[0].value = ''
            $("#fenzuName").removeClass("valNUllBorder");
            $("#fenzuPosition").removeClass("valNUllBorder");
        }
    });
})
$(document).on("click", "#m_check", function (e) {
    hideRMenu();
    app.showHtml('编辑分组', {
        content: $('#Z-addFenZU'),
        success: function (layero, index) {
            //完成后的回调 如果是编辑操作，根据id获取数据回填表单
            // let nodes = zTree.getSelectedNodes();
            $("#fenzuName")[0].value = currentRightNode.name
            var parentId = currentRightNode.parentId;
            var parentNode = zNodes.filter(x => x['id'] == parentId) || [];
            var parentNodeName = (parentNode[0] || {}).name;
            $("#fenzuPosition")[0].value = parentNodeName
            // currentPositionNode = currentRightNode
            setPositionChoice(parentNodeName)
        },
        btn2: function (index, layero) {
            //return false 开启该代码可禁止点击该按钮关闭
            //保存的回调 
            var dataObj = idsArr; //id
            let result = false
            var fenzuNameVal = $("#fenzuName").val(); //名称
            var fenzuPositionVal = $("#fenzuPosition").val(); //位置
            $("#fenzuName").removeClass("valNUllBorder");
            $("#fenzuPosition").removeClass("valNUllBorder");
            if (fenzuNameVal == "") {
                layer.msg('请填写名称');
                $("#fenzuName").addClass("valNUllBorder");
                return false
            } else if (fenzuPositionVal == "") {
                layer.msg('请选择位置');
                $("#fenzuPosition").addClass("valNUllBorder");
                return false
            } else {
                let parentId = currentRightNode.parentId
                if(editorNode.id){
                    parentId = editorNode.id
                }
                let postData = {
                    id: currentRightNode.id,
                    name: fenzuNameVal,
                    parentId: parentId
                }
                request.put(`/bi/${appId}/groups`, postData).then(async res => {
                    let nodes = zTree.getSelectedNodes();
                    if (res.data.code === 0) {
                        app.msg('编辑成功!')
                        nodes[0].name = fenzuNameVal
                        layer.close(index);
                        await getGruopTree()
                        zTree.expandAll(true);
                        zTree.selectNode(nodes[0])
                        $("#fenzuName")[0].value = ''
                        $("#fenzuPosition")[0].value = ''
                        editorNode = {}
                        // initTable(currentRightNode.id)
                    } else {
                        layer.msg(res.data.msg);
                    }
                })
            }
            return result
        },
        end: function () {
            $("#fenzuName")[0].value = ''
            $("#fenzuPosition")[0].value = ''
            $("#fenzuName").removeClass("valNUllBorder");
            $("#fenzuPosition").removeClass("valNUllBorder");
        }
    });
})

