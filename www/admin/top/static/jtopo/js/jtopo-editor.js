/**
 * 基于jtopo-editor.js的二次封装
 * designed by wenyuan
 * github: https://github.com/wenyuan/jtopo_topology
 */

/**
 * 提供拓扑图面板相关操作的函数集，编辑器继承其全部功能
 */
function TopologyPanel() {
}

/**
 * 保存序列化的拓扑图JSON数据到服务器
 */
TopologyPanel.prototype.saveTopology = function (url) {
    editor.mainMenu.hide()
    let self = this
    // 保存container状态
    let containers = editor.utils.getContainers()
    for (let c = 0; c < containers.length; c++) {
        let temp = []
        let nodes = containers[c].childs
        for (let n = 0; n < nodes.length; n++) {
            if (nodes[n] instanceof JTopo.Node) {
                temp.push(nodes[n].nodeId)
            }
        }
        containers[c].childNodes = temp.join(',')
    }
    let topologyJSON = editor.stage.toJson()
    alert('保存成功')
    // $.ajax({
    //     type: 'POST',
    //     url: url,
    //     async: false,
    //     data: JSON.stringify({'topology_json': topologyJSON}),
    //     contentType: 'application/json',
    //     dataType: 'json',
    //     error: function () {
    //         // alert('服务器异常，请稍后重试..')
    //     },
    //     success: function (response) {
    //         // 错误处理
    //         if (response.code !== 200) {
    //             console.error(response.msg)
    //         } else {
    //             editor.stageMode = 'edit'
    //             self.replaceStage(url)
    //         }
    //     }
    // })
}

/**
 * 重置拓扑图
 */
TopologyPanel.prototype.resetTopology = function (url) {
    editor.stageMode = 'edit'
    this.replaceStage(url)
}

/**
 * 加载指定id的拓扑图JSON数据结构
 * @param topologyGuid 拓扑 表记录ID
 * @param backImg 拓扑图的背景图片
 */
TopologyPanel.prototype.loadTopology = function (url, topologyGuid, backImg) {
    $.ajax({
        type: 'GET',
        url: url,
        async: false,
        contentType: 'application/json',
        dataType: 'json',
        error: function () {
            // alert('服务器异常，请稍后重试..')
        },
        success: function (response) {
            // 错误处理
            if (response.code !== 200) {
                console.error(response.msg)
            } else if (response.code === 200 && $.isEmptyObject(response.data.topology_json)) {
                // 拓扑不存在,创建一个空白的拓扑图
                let initTopologyJson = {
                    'version': '0.4.8',
                    'wheelZoom': 0.95,
                    'width': 972,
                    'height': 569,
                    'id': 'ST172.19.105.52015100809430700001',
                    'childs': [
                        {
                            'elementType': 'scene',
                            'id': 'S172.19.105.52015100809430700002',
                            'translateX': -121.82,
                            'translateY': 306.72,
                            'scaleX': 1.26,
                            'scaleY': 1.26,
                            'childs': []
                        }
                    ]
                }
                editor.init(topologyGuid, backImg, initTopologyJson, '')
            } else {
                // 拓扑存在,渲染拓扑图
                let topologyJson = response.data.topology_json
                editor.init(topologyGuid, backImg, topologyJson, '')
            }
        }
    })
}

/**
 * 传入JSON形式的拓扑图数据,绘制拓扑图。如果数据结构不正确,返回空拓扑图
 * @param topologyJson json形式的拓扑结构数据
 * @param backImg 拓扑图的背景图片
 */
TopologyPanel.prototype.loadTopologyByJson = function (topologyJson, backImg) {
    try {
        JTopo.replaceStageWithJson(topologyJson)
        if (editor.stage && editor.scene && editor.scene.childs && editor.scene.childs.length > 0) {
            editor.stage.centerAndZoom()
        }
    } catch (e) {
        console.error(e)
        let initTopologyJson = {
            'version': '0.4.8',
            'wheelZoom': 0.95,
            'width': 972,
            'height': 569,
            'id': 'ST172.19.105.52015100809430700001',
            'childs': [
                {
                    'elementType': 'scene',
                    'id': 'S172.19.105.52015100809430700002',
                    'translateX': -121.82,
                    'translateY': 306.72,
                    'scaleX': 1.26,
                    'scaleY': 1.26,
                    'childs': []
                }
            ]
        }
        JTopo.replaceStageWithJson(initTopologyJson)
        if (editor.stage && editor.scene && editor.scene.childs && editor.scene.childs.length > 0) {
            editor.stage.centerAndZoom()
        }
    }
}

/**
 * 清空所有节点
 */
TopologyPanel.prototype.deleteAllNodes = function () {
    editor.stage.childs.forEach(function (s) {
        s.clear()
    })
    // 连线重置
    editor.beginNode = null
    editor.link = null
    // alert('已清空拓扑图')
}

/**
 * 编辑器对象,原型继承拓扑图面板对象,提供编辑器的主要功能
 */
function TopologyEditor() {
    // 绘图参数
    this.config = {
        // Stage属性
        stageFrames: 500,                       // 舞台播放的帧数/秒
        defaultScal: 0.95,                      // 鼠标滚轮缩放比例
        eagleEyeVsibleDefault: false,         // 是否显示鹰眼对象
        // Node属性
        nodeAlpha: 1,                           // 节点透明度,取值范围[0-1]
        nodeStrokeColor: '22,124,255',        // 节点描边的颜色
        nodeFillColor: '22,124,255',          // 节点填充颜色
        nodeShadow: false,                     // 节点是否显示阴影
        nodeShadowColor: 'rgba(0,0,0,0.5)',  // 节点阴影的颜色
        nodeFont: '12px Consolas',            // 节点字体
        nodeFontColor: 'black',               // 节点文字颜色,如"255,255,0"
        nodeDefaultWidth: 32,                 // 新建节点默认宽
        nodeDefaultHeight: 32,                // 新建节点默认高
        nodeBorderColor: 'black',            // 节点容器边框颜色,如"255,255,0"
        nodeBorderRadius: 30,                // 节点半径，非圆节点有此属性会变形
        nodeRotateValue: 0.5,                // 节点旋转的角度(弧度)
        nodeScale: 0.2,                       // 节点缩放幅度(此处保证X和Y均等缩放)
        // Link属性
        linkAlpha: 1,                         // 连线透明度,取值范围[0-1]
        linkStrokeColor: '123,165,241',     // 连线的颜色
        linkFillColor: '123,165,241',
        linkShadow: false,                   // 是否显示连线阴影
        linkShadowColor: 'rgba(0,0,0,0.5)',
        linkFont: '12px Consolas',           // 节点字体
        linkFontColor: 'black',              // 连线文字颜色,如"255,255,0"
        linkArrowsRadius: 0,                 // 线条箭头半径
        linkDefaultWidth: 3,                 // 连线宽度
        linkOffsetGap: 40,                   // 折线拐角处的长度
        linkDirection: 'horizontal',        // 折线的方向
        // Container属性
        containerAlpha: 1,
        containerStrokeColor: '22,124,255',
        containerFillColor: '22,124,255',
        containerShadow: false,
        containerShadowColor: 'rgba(0,0,0,0.5)',
        containerFont: '12px Consolas',
        containerFontColor: 'black',
        containerBorderColor: 'black',
        containerBorderRadius: 30
    }
    // 布局参数
    this.layout = {}
    // 绘图区属性
    this.stage = null
    this.scene = null
    // 当前模式
    this.stageMode = 'edit'
    // 默认连线类型
    this.lineType = 'line'
    // 当前选择的节点对象
    this.currentNode = null
    // 当前选择的连线对象
    this.currentLink = null
    // 节点右键菜单DOM对象
    this.nodeMenu = $('#node-menu')
    // 连线右键菜单DOM对象
    this.lineMenu = $('#line-menu')
    // 全局右键菜单
    this.mainMenu = $('#main-menu')
    // 布局管理菜单
    this.layoutMenu = $('#layout-menu')
    // 节点文字方向
    this.nodeTextPosMenu = $('#node-text-pos-menu')
    // 节点分组菜单
    this.groupMangeMenu = $('#group-mange-menu')
    // 节点对齐菜单
    this.groupAlignMenu = $('#group-align-menu')
    this.alignGroup = $('#align-group')
    // 分组的容器管理菜单
    this.containerMangeMenu = $('#container-mange-menu')
    // 调用构造函数,继承TopologyPanel类
    TopologyPanel.call(this)
}

// 原型继承
TopologyEditor.prototype = new TopologyPanel()

/**
 * 菜单初始化
 */
TopologyEditor.prototype.initMenus = function () {
    let self = this

    // 右键菜单事件处理(右键一级菜单)
    self.nodeMenu.on('click', function (event) {
        // 菜单文字对应事件
        let text = $.trim($(event.target).text())
        if (text === '删除节点(Delete)') {
            editor.utils.deleteSelectedNodes()
        } else if (text === '复制节点(Shift+C)') {
            self.utils.cloneSelectedNodes()
        } else if (text === '撤销(Shift+Z)') {
            self.utils.cancleNodeAction()
        } else if (text === '重做(Shift+R)') {
            self.utils.reMakeNodeAction()
        } else {
            editor.utils.saveNodeInitState()
        }
        switch (text) {
            case '放大(Shift+)':
                self.utils.scalingBig()
                self.utils.saveNodeNewState()
                break
            case '缩小(Shift-)':
                self.utils.scalingSmall()
                self.utils.saveNodeNewState()
                break
            case '顺时针旋转(Shift+U)':
                self.utils.rotateAdd()
                self.utils.saveNodeNewState()
                break
            case '逆时针旋转(Shift+I)':
                self.utils.rotateSub()
                self.utils.saveNodeNewState()
                break
            case '节点文字':
                return
            default :

        }
        // 关闭菜单
        $(this).hide()
    })

    self.nodeMenu.on('mouseover', function (event) {
        // 菜单文字
        let text = $.trim($(event.target).text())
        let menuX = parseInt(this.style.left) + $(document.getElementById('change-node-text-pos')).width()
        // 边界判断
        if (menuX + self.nodeTextPosMenu.width() * 2 >= self.stage.width) {
            menuX -= (self.nodeTextPosMenu.width() + self.nodeMenu.width())
        }
        if (text === '文字位置') {
            self.layoutMenu.hide()
            self.nodeTextPosMenu.css({
                top: parseInt(this.style.top) + $(document.getElementById('change-node-text-pos')).height(),
                left: menuX
            }).show()
        } else if (text === '应用布局') {
            self.nodeTextPosMenu.hide()
            self.layoutMenu.css({
                top: parseInt(this.style.top),
                left: menuX
            }).show()
        } else {
            self.layoutMenu.hide()
            self.nodeTextPosMenu.hide()
        }
    })

    // 修改节点文字位置菜单
    self.nodeTextPosMenu.on('click', function (event) {
        // 菜单文字
        let text = $.trim($(event.target).text())
        if (self.currentNode && self.currentNode instanceof JTopo.Node) {
            self.utils.saveNodeInitState()
            switch (text) {
                case '顶部居左':
                    self.currentNode.textPosition = 'Top_Left'
                    self.utils.saveNodeNewState()
                    break
                case '顶部居中':
                    self.currentNode.textPosition = 'Top_Center'
                    self.utils.saveNodeNewState()
                    break
                case '顶部居右':
                    self.currentNode.textPosition = 'Top_Right'
                    self.utils.saveNodeNewState()
                    break
                case '中间居左':
                    self.currentNode.textPosition = 'Middle_Left'
                    self.utils.saveNodeNewState()
                    break
                case '居中':
                    self.currentNode.textPosition = 'Middle_Center'
                    self.utils.saveNodeNewState()
                    break
                case '中间居右':
                    self.currentNode.textPosition = 'Middle_Right'
                    self.utils.saveNodeNewState()
                    break
                case '底部居左':
                    self.currentNode.textPosition = 'Bottom_Left'
                    self.utils.saveNodeNewState()
                    break
                case '底部居中':
                    self.currentNode.textPosition = 'Bottom_Center'
                    self.utils.saveNodeNewState()
                    break
                case '底部居右':
                    self.currentNode.textPosition = 'Bottom_Right'
                    self.utils.saveNodeNewState()
                    break
                default :
            }
            $('div[id$=\'-menu\']').hide()
        }
    })
    // 连线菜单
    self.lineMenu.on('click', function (event) {
        // 关闭菜单
        $(this).hide()
        let text = $.trim($(event.target).text())
        switch (text) {
            case '连线设置':
                // alert('连线设置')
                break
            case '删除连线':
                editor.utils.deleteLine()
                break
            default :
        }
    })

    // 系统设置菜单
    self.mainMenu.on('click', function (event) {
        // 关闭菜单
        $(this).hide()
    })

    // 节点分组菜单
    self.groupMangeMenu.on('click', function (event) {
        $(this).hide()
        let text = $.trim($(event.target).text())
        if (text === '新建分组') {
            self.utils.toMerge()
        }
    })
    // 对齐
    self.groupAlignMenu.on('click', function (event) {
        let currNode = self.currentNode
        let selectedNodes = self.utils.getSelectedNodes()
        if (!currNode || !selectedNodes || selectedNodes.length === 0) return
        $(this).hide()
        let text = $.trim($(event.target).text())
        selectedNodes.forEach(function (n) {
            if (n.nodeId === currNode.nodeId) return true
            if (text === '水平对齐') {
                n.y = currNode.y
            } else if (text === '垂直对齐') {
                n.x = currNode.x
            } else {

            }
        })
    })
    self.groupMangeMenu.on('mouseover', function (event) {
        let text = $.trim($(event.target).text())
        if (text === '对齐方式') {
            // 节点对齐
            let menuX = parseInt(this.style.left) + $(document.getElementById('align-group')).width()
            if (menuX + self.alignGroup.width() * 2 >= self.stage.width) {
                menuX -= (self.alignGroup.width() + self.groupMangeMenu.width())
            }
            self.groupAlignMenu.css({
                top: parseInt(this.style.top) + $(document.getElementById('align-group')).height(),
                left: menuX
            }).show()
        } else {
            self.groupAlignMenu.hide()
        }
    })
    // 容器管理菜单
    self.containerMangeMenu.on('click', function (event) {
        let cNode = editor.currentNode
        if (!(cNode instanceof JTopo.Container)) {
            return
        }
        $(this).hide()
        let text = $.trim($(event.target).text())
        if (text === '拆分') {
            self.utils.toSplit()
            self.utils.deleteNode(cNode)
        }
    })

    // 容器管理菜单
    self.layoutMenu.on('click', function (event) {
        editor.currentNode.layout = {}
        $('div[id$=\'-menu\']').hide()
        let text = $.trim($(event.target).text())
        if (text === '取消布局') {
            editor.currentNode.layout.on = false
        } else if (text === '分组布局') {
            editor.currentNode.layout.on = true
            editor.currentNode.layout.type = 'auto'
        } else if (text === '树形布局') {
            editor.currentNode.layout.on = true
            editor.currentNode.layout.type = 'tree'
            editor.currentNode.layout.direction = 'bottom'
            editor.currentNode.layout.width = 80
            editor.currentNode.layout.height = 100
            JTopo.layout.layoutNode(self.scene, self.currentNode, true)
        } else if (text === '圆形布局') {
            editor.currentNode.layout.on = true
            editor.currentNode.layout.type = 'circle'
            editor.currentNode.layout.radius = 200
            JTopo.layout.layoutNode(self.scene, self.currentNode, true)
        }
    })
}
/**
 * 替换当前舞台,用于编辑保存后重新加载
 * @param topologyGuid
 */
TopologyEditor.prototype.replaceStage = function (url) {
    // var self = this
    $.ajax({
        type: 'GET',
        url: url,
        async: false,
        contentType: 'application/json',
        dataType: 'json',
        error: function () {
            // alert('服务器异常，请稍后重试..')
        },
        success: function (response) {
            // 错误处理
            if (response.code !== 200) {
                console.error(response.msg)
            } else {
                let topologyJson = response.data.topology_json
                JTopo.replaceStageWithJson(topologyJson)
                if (editor.stage && editor.scene && editor.scene.childs && editor.scene.childs.length > 0) {
                    editor.stage.centerAndZoom()
                }
            }
        }
    })
}
/**
 * 编辑器初始化方法,根据请求返回结果加载空白的或者指定结构的拓扑编辑器
 * @param topologyGuid  拓扑记录ID
 * @param backImg     背景图片
 * @param topologyJson    拓扑JSON结构
 */
TopologyEditor.prototype.init = function (topologyGuid, backImg, topologyJson) {
    if (!topologyJson) {
        // alert('加载拓扑编辑器失败!')
        return
    }
    this.topologyGuid = topologyGuid
    // 创建jTopo舞台屏幕对象
    let canvas = document.getElementById('topology-canvas')
    canvas.width = $('#topology-body').width()
    canvas.height = $('#topology-body').height()
    // 加载空白的编辑器
    if (topologyJson === '-1') {
        this.stage = new JTopo.Stage(canvas)         // 定义舞台对象
        this.scene = new JTopo.Scene(this.stage)    // 定义场景对象
    } else {
        this.stage = JTopo.createStageFromJson(topologyJson, canvas)    // 根据保存好的jsonStr(拓扑结构)创建舞台对象
        this.scene = this.stage.childs[0]                           // 场景对象列表,childs是舞台的属性
    }
    // 滚轮缩放
    this.stage.frames = this.config.stageFrames       // 设置当前舞台播放的帧数/秒
    this.stage.wheelZoom = this.config.defaultScal    // 鼠标滚轮缩放操作比例
    this.stage.eagleEye.visible = this.config.eagleEyeVsibleDefault    // 是否开启鹰眼
    this.stage.mode = this.stageMode
    // 设置舞台模式
    // 背景由样式指定
    // this.scene.background = backImg;
    // 用来连线的两个节点
    this.tempNodeA = new JTopo.Node('tempA')
    this.tempNodeA.setSize(1, 1)
    this.tempNodeZ = new JTopo.Node('tempZ')
    this.tempNodeZ.setSize(1, 1)
    this.beginNode = null
    this.link = null
    let self = this

    // 初始化菜单
    this.initMenus()

    // 鼠标进入事件
    this.scene.mouseover(function (event) {
        Timer.start()
        // 进入某个节点
        if (event.target != null && event.target instanceof JTopo.Node) {
            $('#node-name').html(event.target.text)
            $('#current-time').html(new Date().toLocaleString())
            // 记录鼠标触发位置在canvas中的相对位置
            // let menuY = event.layerY ? event.layerY : event.offsetY
            // let menuX = event.layerX ? event.layerX : event.offsetX
            // // 判断边界出是否能完整显示弹出菜单
            // if (menuX + $('.node-tooltip').width() >= self.stage.width) {
            //     menuX -= $('.node-tooltip').width()
            // }
            // if (menuY + $('.node-tooltip').height() >= self.stage.height) {
            //     menuY -= $('.node-tooltip').height()
            // }
            $('.link-tooltip').css('display', 'none')
            $('.node-tooltip').css({
                'display': 'block',
                // 'margin-top': menuY,
                // 'margin-left': menuX,
                'cursor': 'pointer'
            })
            // 进入某个连线
        } else if (event.target != null && event.target instanceof JTopo.Link && event.target.linkTooltip && editor.stageMode !== 'edit') {
            $('.link-tooltip span').html(event.target.linkTooltip)
            // 记录鼠标触发位置在canvas中的相对位置
            let menuY = event.layerY ? event.layerY : event.offsetY
            let menuX = event.layerX ? event.layerX : event.offsetX
            // 判断边界出是否能完整显示弹出菜单
            if (menuX + $('.link-tooltip').width() >= self.stage.width) {
                menuX -= $('.link-tooltip').width()
            }
            if (menuY + $('.link-tooltip').height() >= self.stage.height) {
                menuY -= $('.link-tooltip').height()
            }
            $('.node-tooltip').css('display', 'none')
            $('.link-tooltip').css({
                'display': 'block',
                'margin-top': menuY,
                'margin-left': menuX,
                'cursor': 'pointer'
            })
        } else {
            $('#node-name').html('（鼠标悬浮节点查看）')
            $('#current-time').html('（鼠标悬浮节点查看）')
            // 鼠标进入别的地方
        }
    })

    // 鼠标离开事件
    this.scene.mouseout(function (event) {
        let timeSpan = Timer.pause()
        // 消抖
        if (timeSpan > 100) {
            $('#node-name').html('（鼠标悬浮节点查看）')
            $('#current-time').html('（鼠标悬浮节点查看）')
            $('.node-tooltip').css('display', 'none')
            $('.link-tooltip').css('display', 'none')
            Timer.stop()
        }
    })

    // 鼠标单击节点事件
    this.scene.click(function (event) {
        if (event.target) {
            self.currentNode = event.target
        } else {
            // 单击舞台空白处
            $('.node-tooltip').css('display', 'none')
            return
        }
        // 单击某个节点
        if (event.target != null && event.target instanceof JTopo.Node && event.target.nodeTooltip && editor.stageMode !== 'edit') {
            let currentNodeParams = self.currentNode.nodeParams
            if (currentNodeParams && currentNodeParams.jumpRoute) {
                window.open(currentNodeParams.jumpRoute)
            }
        } else {
            // 单击别的地方
            $('.node-tooltip').css('display', 'none')
        }
    })

    // 双击事件
    this.scene.dbclick(function (event) {
        if (event.target) {
            self.currentNode = event.target
        } else {
            // 双击了舞台空白处
            return
        }
        // 只处理双击节点事件
        if (event.target != null && event.target instanceof JTopo.Node) {
            console.log(event.target)
            // alert('双击了节点')
        }
    })

    // 清除起始节点不完整的拖放线
    this.scene.mousedown(function (e) {
        if (self.link && !self.isSelectedMode && (e.target == null || e.target === self.beginNode || e.target === self.link)) {
            this.remove(self.link)
        }
    })

    // 监听鼠标松开事件
    // 处理右键菜单、左键连线
    // event.button: 0-左键 1-中键 2-右键
    this.scene.mouseup(function (event) {
        if (event.target && event.target instanceof JTopo.Node) {
            self.currentNode = event.target
        } else if (event.target && event.target instanceof JTopo.Link) {
            self.currentLink = event.target
        }
        if (event.target && event.target instanceof JTopo.Node && event.target.layout && event.target.layout.on && event.target.layout.type && event.target.layout.type !== 'auto') {
            JTopo.layout.layoutNode(this, event.target, true, event)
        }
        if (event.button === 2) {                      // 右键菜单
            $('div[id$=\'-menu\']').hide()
            let menuY = event.layerY ? event.layerY : event.offsetY
            let menuX = event.layerX ? event.layerX : event.offsetX
            // 记录鼠标触发位置在canvas中的相对位置
            self.xInCanvas = menuX
            self.yInCanvas = menuY
            if (event.target) {
                if (event.target instanceof JTopo.Node) {          // 处理节点右键菜单事件
                    let selectedNodes = self.utils.getSelectedNodes()
                    // 如果是节点多选状态弹出分组菜单
                    if (selectedNodes && selectedNodes.length > 1) {
                        // 判断边界出是否能完整显示弹出菜单
                        if (menuX + self.groupMangeMenu.width() >= self.stage.width) {
                            menuX -= self.groupMangeMenu.width()
                        }
                        if (menuY + self.groupMangeMenu.height() >= self.stage.height) {
                            menuY -= self.groupMangeMenu.height()
                        }
                        self.groupMangeMenu.css({
                            top: menuY,
                            left: menuX
                        }).show()
                    } else {
                        // 判断边界出是否能完整显示弹出菜单
                        if (menuX + self.nodeMenu.width() >= self.stage.width) {
                            menuX -= self.nodeMenu.width()
                        }
                        if (menuY + self.nodeMenu.height() >= self.stage.height) {
                            menuY -= self.nodeMenu.height()
                        }
                        self.nodeMenu.css({
                            top: menuY,
                            left: menuX
                        }).show()
                    }
                } else if (event.target instanceof JTopo.Link) {     // 连线右键菜单
                    self.lineMenu.css({
                        top: event.layerY ? event.layerY : event.offsetY,
                        left: event.layerX ? event.layerX : event.offsetX
                    }).show()
                } else if (event.target instanceof JTopo.Container) {        // 容器右键菜单
                    self.containerMangeMenu.css({
                        top: event.layerY ? event.layerY : event.offsetY,
                        left: event.layerX ? event.layerX : event.offsetX
                    }).show()
                }
            } else {
                // 判断边界出是否能完整显示弹出菜单
                if (menuX + self.mainMenu.width() >= self.stage.width) {
                    menuX -= self.mainMenu.width()
                }
                if (menuY + self.mainMenu.height() >= self.stage.height) {
                    menuY -= self.mainMenu.height()
                }
                self.mainMenu.css({
                    top: menuY,
                    left: menuX
                }).show()
            }
        } else if (event.button === 1) {          // 中键

        } else if (event.button === 0) {          // 左键松开事件
            if (event.target != null && event.target instanceof JTopo.Node && !self.isSelectedMode && editor.stageMode === 'edit') {
                if (self.beginNode == null) {
                    // 在起始节点处松开鼠标,创建动态的线条(临时节点A-Z)
                    self.beginNode = event.target
                    if (self.lineType === 'line') {
                        // 直线
                        self.link = new JTopo.Link(self.tempNodeA, self.tempNodeZ)
                        self.link.lineType = 'line'
                    } else if (self.lineType === 'foldLine') {
                        // 折线
                        self.link = new JTopo.FoldLink(self.tempNodeA, self.tempNodeZ)
                        self.link.lineType = 'foldLine'
                        self.link.direction = self.config.linkDirection
                    } else if (self.lineType === 'flexLine') {
                        // 二次折线
                        self.link = new JTopo.FlexionalLink(self.tempNodeA, self.tempNodeZ)
                        self.link.direction = self.config.linkDirection
                        self.link.lineType = 'flexLine'
                    } else if (self.lineType === 'curveLine') {
                        // 曲线
                        self.link = new JTopo.CurveLink(self.tempNodeA, self.tempNodeZ)
                        self.link.lineType = 'curveLine'
                    }
                    self.link.dashedPattern = 2
                    self.link.lineWidth = self.config.linkDefaultWidth
                    self.link.shadow = self.config.linkShadow
                    self.link.strokeColor = JTopo.util.randomColor()
                    this.add(self.link)
                    self.tempNodeA.setLocation(event.x, event.y)
                    self.tempNodeZ.setLocation(event.x, event.y)
                } else if (event.target && event.target instanceof JTopo.Node && self.beginNode !== event.target) {
                    // 在终点节点处松开鼠标,则建立连线
                    let endNode = event.target
                    // 判断两个节点是否有循环引用
                    /** ***************** 我这里允许循环引用 *************************
                     for (var el = 0; el < endNode.outLinks.length; el++) {
                        // 存在循环引用，线条变红
                        if (endNode.outLinks[el].nodeZ === self.beginNode) {
                            if (self.link)
                                this.remove(self.link);
                            self.beginNode = null;
                            return;
                        }
                    }
                     *****************************************************************/
                    // 判断节点间是否有重复连线,即起点到终点有两条以上连线
                    /** ***************** 我这里允许它有两条连线 *************************
                     for (var el2 = 0; el2 < self.beginNode.outLinks.length; el2++) {
                        // 起始节点已经有一条线指向目标节点
                        if (self.beginNode.outLinks[el2].nodeZ === endNode) {
                            if (self.link)
                                this.remove(self.link);
                            self.beginNode = null;
                            return;
                        }
                    }
                     *****************************************************************/
                    let link
                    if (self.lineType === 'line') {
                        link = new JTopo.Link(self.beginNode, endNode)
                        link.lineType = 'line'
                    } else if (self.lineType === 'foldLine') {
                        link = new JTopo.FoldLink(self.beginNode, endNode)
                        link.direction = self.config.linkDirection
                        link.bundleOffset = self.config.linkOffsetGap    // 折线拐角处的长度
                        link.lineType = 'foldLine'
                    } else if (self.lineType === 'flexLine') {
                        link = new JTopo.FlexionalLink(self.beginNode, endNode)
                        link.direction = self.config.linkDirection
                        link.lineType = 'flexLine'
                        link.offsetGap = self.config.linkOffsetGap
                    } else if (self.lineType === 'curveLine') {
                        link = new JTopo.CurveLink(self.beginNode, endNode)
                        link.lineType = 'curveLine'
                    }
                    // 保存线条所连接的两个节点ID
                    link.nodeSrc = self.beginNode.nodeId
                    link.nodeDst = endNode.nodeId
                    if (self.lineType !== 'curveLine') {
                        link.arrowsRadius = self.config.arrowsRadius
                    }
                    link.strokeColor = self.config.linkStrokeColor
                    link.lineWidth = self.config.linkDefaultWidth
                    this.add(link)
                    self.beginNode = null
                    this.remove(self.link)
                    self.link = null
                } else {
                    self.beginNode = null
                }
            } else {
                if (self.link) {
                    this.remove(self.link)
                }
                self.beginNode = null
            }
        }
    })

    // 动态更新连线坐标(创建连线时的临时节点A-Z)
    this.scene.mousemove(function (event) {
        if (!self.isSelectedMode && self.beginNode) {
            self.tempNodeZ.setLocation(event.x, event.y)
        }
    })

    this.scene.mousedrag(function (event) {
        if (!self.isSelectedMode && self.beginNode) {
            self.tempNodeZ.setLocation(event.x, event.y)
        }
    })

    // 单击编辑器隐藏右键菜单
    this.stage.click(function (event) {
        if (event.button === 0) {
            // 关闭弹出菜单（div）
            $('div[id$=\'-menu\']').hide()
        }
    })

    // 鼠标移出舞台
    this.stage.mouseout(function (event) {
        // 删掉节点带出来的连线
        if (self.link && !self.isSelectedMode && (event.target == null || event.target === self.beginNode || event.target === self.link)) {
            self.scene.remove(self.link)
        }
    })

    // 按下ctrl进入多选模式，此时选择节点不能画线
    $(document).keydown(function (e) {
        if (e.shiftKey) {  // 组合键模式
            switch (e.which) {
                // 放大 ctrl+=
                case 187:
                case 61:
                    // 单个节点可以撤销操作
                    if (editor.currentNode instanceof JTopo.Node) {
                        // 保存初始状态
                        editor.utils.saveNodeInitState()
                        editor.utils.scalingBig()
                        editor.utils.saveNodeNewState()
                    } else {
                        editor.utils.scalingBig()
                    }
                    break
                // 缩小 ctrl+-
                case 189:
                case 173:
                    if (editor.currentNode instanceof JTopo.Node) {
                        // 保存初始状态
                        editor.utils.saveNodeInitState()
                        editor.utils.scalingSmall()
                        editor.utils.saveNodeNewState()
                    } else {
                        editor.utils.scalingSmall()
                    }
                    break
                case 70:
                    // ctrl+f 全屏显示
                    editor.utils.showInFullScreen(editor.stage.canvas, 'RequestFullScreen')
                    break
                case 72:
                    // h 帮助
                    // alert('帮助文档')
                    break
                case 71:
                    // ctrl+g 居中显示
                    editor.utils.showInCenter()
                    break
                case 73:
                    // shif+I 逆时针旋转
                    if (editor.currentNode instanceof JTopo.Node) {
                        editor.utils.saveNodeInitState()
                        editor.utils.rotateSub()
                        editor.utils.saveNodeNewState()
                    }
                    break
                case 67:
                    editor.utils.cloneSelectedNodes()
                    break
                case 80:
                    // ctrl + p
                    editor.utils.showPic()
                    break
                case 82:
                    // 单个节点重做
                    if (editor.currentNode instanceof JTopo.Node) {
                        editor.utils.reMakeNodeAction()
                    }
                    break
                case 83:
                    // ctrl+s 保存
                    editor.saveTopology(true)
                    break
                case 85:
                    // shif+U 顺时针旋转
                    if (editor.currentNode instanceof JTopo.Node) {
                        editor.utils.saveNodeInitState()
                        editor.utils.rotateAdd()
                        editor.utils.saveNodeNewState()
                    }
                    break
                case 87:
                    // alert('ctrl + w 另存为')
                    break
                case 89:
                    // ctrl+y
                    editor.utils.clearTopology()
                    break
                case 90:
                    // 单个节点撤销
                    if (editor.currentNode instanceof JTopo.Node) {
                        editor.utils.cancleNodeAction()
                    }
                    break
            }
        } else if (e.which === 46) {              // 单独按下delete
            editor.utils.deleteSelectedNodes()
        } else if (e.which === 17) {              // 单独按下ctrl
            self.isSelectedMode = true
        }
    })
    $(document).keyup(function (e) {
        if (e.which === 17) {
            self.isSelectedMode = false
            return false
        }
    })
    // 第一次进入拓扑编辑器,生成stage和scene对象
    if (topologyJson === '-1') {
        this.saveTopology(false)
    }
}

/**
 * 图元拖放功能实现
 * @param modeDiv 备选列表中的元素(各种样式的节点)
 * @param drawArea 舞台区域
 */
TopologyEditor.prototype.drag = function (modeDiv, drawArea, text) {
    if (!text) text = ''
    let self = this
    // 拖拽开始,携带必要的参数
    modeDiv.ondragstart = function (event) {
        event = event || window.event
        let dragSrc = this
        let backImg = $(dragSrc).find('img').eq(0).attr('src')
        backImg = backImg.substring(backImg.lastIndexOf('/') + 1)
        let nodeType = $(this).attr('topo-nodetype')
        try {
            // IE只允许KEY为text和URL
            event.dataTransfer.setData('text', backImg + ';' + text + ';' + nodeType)
        } catch (ex) {
            console.log(ex)
        }
    }
    // 阻止默认事件
    drawArea.ondragover = function (event) {
        event.preventDefault()
        return false
    }
    // 创建节点
    drawArea.ondrop = function (event) {
        event = event || window.event
        let data = event.dataTransfer.getData('text')
        let img, text, nodeType
        if (data) {
            let datas = data.split(';')
            if (datas && datas.length === 3) {
                img = datas[0]
                text = datas[1]
                nodeType = datas[2]
                let node = new JTopo.Node()
                node.fontColor = self.config.nodeFontColor
                // 节点坐标
                node.setBound((event.layerX ? event.layerX : event.offsetX) - self.scene.translateX - self.config.nodeDefaultWidth / 2, (event.layerY ? event.layerY : event.offsetY) - self.scene.translateY - self.config.nodeDefaultHeight / 2, self.config.nodeDefaultWidth, self.config.nodeDefaultHeight)
                // 节点图片
                node.setImage(topoImgPath + img)
                // 节点数据
                node.nodeId = generateUUID()
                node.nodeType = nodeType
                node.text = text
                node.nodeImage = img
                self.scene.add(node)
                self.currentNode = node
            }
        }
    }
}

// 编辑器实例
var editor = new TopologyEditor('mainControl')

// 工具方法
editor.utils = {
    // 获取所有分组
    getAllContainers: function () {
        return editor.stage.find('container')
    },
    // 获取所有节点
    getAllNodes: function () {
        return editor.stage.find('node')
    },
    // 获取所有连线
    getAllLinks: function () {
        return editor.stage.find('link')
    },
    // 获取所有选择的节点实例
    getSelectedNodes: function () {
        let selectedNodes = []
        let nodes = editor.scene.selectedElements
        nodes.forEach(function (n) {
            if (n.elementType === 'node') {
                selectedNodes.push(n)
            }
        })
        return selectedNodes
    },
    // 节点分组合并
    toMerge: function () {
        let selectedNodes = this.getSelectedNodes()
        // 不指定布局的时候,容器的布局为自动(容器边界随元素变化）
        let container = new JTopo.Container()
        container.textPosition = 'Top_Center'
        container.fontColor = editor.config.nodeFontColor
        container.borderColor = editor.config.nodeBorderColor
        container.borderRadius = editor.config.nodeBorderRadius
        editor.scene.add(container)
        selectedNodes.forEach(function (n) {
            container.add(n)
        })
    },
    // 分组拆除
    toSplit: function () {
        if (editor.currentNode instanceof JTopo.Container) {
            editor.currentNode.removeAll()
            editor.scene.remove(editor.currentNode)
        }
    },
    // 删除连线
    deleteLine: function () {
        if (editor.currentNode instanceof JTopo.Link) {
            editor.scene.remove(editor.currentNode)
            // if (editor.currentNode.id)
            //     editor.deleteNodeById(editor.currentNode.id, "link");
            editor.currentNode = null
            editor.lineMenu.hide()
        }
    },
    // 删除节点
    deleteNode: function (n) {
        editor.scene.remove(n)
        // if (n.id)
        //     editor.deleteNodeById(n.id, n.elementType, n.dataType);
        editor.currentNode = null
        // 连线重置
        editor.beginNode = null
        if (editor.link) {
            editor.scene.remove(editor.link)
        }
        editor.link = null
    },
    // 删除选择的节点
    deleteSelectedNodes: function () {
        if (editor.stageMode !== 'edit') {
            return false
        }
        let self = this
        let nodes = editor.scene.selectedElements
        if (nodes && nodes.length > 0) {
            for (let i = 0; i < nodes.length; i++) {
                self.deleteNode(nodes[i])
            }
        }
    },
    // 放大
    scalingBig: function () {
        if (editor.currentNode instanceof JTopo.Node) {
            editor.currentNode.scaleX += editor.config.nodeScale
            editor.currentNode.scaleY += editor.config.nodeScale
        } else {
            editor.stage.zoomOut(editor.stage.wheelZoom)
        }
    },
    // 缩小
    scalingSmall: function () {
        if (editor.currentNode instanceof JTopo.Node) {
            editor.currentNode.scaleX -= editor.config.nodeScale
            editor.currentNode.scaleY -= editor.config.nodeScale
        } else {
            editor.stage.zoomIn(editor.stage.wheelZoom)
        }
    },
    // 顺时针旋转
    rotateAdd: function () {
        if (editor.currentNode instanceof JTopo.Node) {
            editor.currentNode.rotate += editor.config.nodeRotateValue
        }
    },
    // 逆时针旋转
    rotateSub: function () {
        if (editor.currentNode instanceof JTopo.Node) {
            editor.currentNode.rotate -= editor.config.nodeRotateValue
        }
    },
    // 清空编辑器
    horizontalclearTopology: function () {
        // 删除节点表对应的节点记录
        editor.deleteAllNodes()
    },
    // 拓扑图预览
    showPic: function () {
        editor.stage.saveImageInfo()
    },
    exportAsImage: function () {
        editor.stage.exportAsImage()
    },
    setEditMode: function () {
        editor.stageMode = 'edit'
    },
    setNormalMode: function () {
        editor.stageMode = 'normal'
    },
    // 复制节点
    cloneNode: function (n) {
        if (n instanceof JTopo.Node) {
            let newNode = new JTopo.Node()
            n.serializedProperties.forEach(function (i) {
                // 只复制虚拟机的模板属性
                // if (i == "templateId" && n.dataType != "VM") return true;
                newNode[i] = n[i]
            })
            newNode.nodeId = generateUUID()
            newNode.alpha = editor.config.nodeAlpha
            newNode.strokeColor = editor.config.nodeStrokeColor
            newNode.fillColor = editor.config.nodeFillColor
            newNode.shadow = editor.config.nodeShadow
            newNode.shadowColor = editor.config.nodeShadowColor
            newNode.font = editor.config.nodeFont
            newNode.fontColor = editor.config.nodeFontColor
            newNode.borderRadius = null
            newNode.layout = n.layout
            newNode.selected = false
            // var deviceNum = ++editor.modeIdIndex;
            // newNode.deviceId = "device" + deviceNum;
            newNode.setLocation(n.x + n.width, n.y + n.height)
            newNode.text = n.text
            newNode.setImage(n.image)
            editor.scene.add(newNode)
        }
    },
    // 复制选择的节点
    cloneSelectedNodes: function () {
        let self = this
        let nodes = editor.scene.selectedElements
        nodes.forEach(function (n) {
            if (n.elementType === 'node') {
                self.cloneNode(n)
            }
        })
    },
    // 全屏显示
    showInFullScreen: function (element, method) {
        let usablePrefixMethod;
        ['webkit', 'moz', 'ms', 'o', ''].forEach(function (prefix) {
                if (usablePrefixMethod) {
                    return
                }
                if (prefix === '') {
                    // 无前缀，方法首字母小写
                    // method = method.slice(0, 1).toLowerCase() + method.slice(1)
                }
                let typePrefixMethod = typeof element[prefix + method]
                if (typePrefixMethod + '' !== 'undefined') {
                    if (typePrefixMethod === 'function') {
                        usablePrefixMethod = element[prefix + method]()
                    } else {
                        usablePrefixMethod = element[prefix + method]
                    }
                }
            }
        )
        return usablePrefixMethod
    },
    // 居中显示
    showInCenter: function () {
        editor.stage.centerAndZoom()
    },
    // 获取所有的容器对象
    getContainers: function () {
        let containers = []
        editor.stage.childs.forEach(function (s) {
            s.childs.forEach(function (n) {
                if (n.elementType === 'container') {
                    containers.push(n)
                }
            })
        })
        return containers
    },
    // 根据指定的key返回节点实例
    getNodeByKey: function (key, value) {
        let node = null
        editor.stage.childs.forEach(function (s) {
            s.childs.forEach(function (n) {
                if (n.elementType === 'node' && n[key] === value) {
                    node = n
                    return node
                }
            })
        })
        return node
    },
    // 撤销对节点的操作
    cancleNodeAction: function () {
        if (editor.currentNode.currStep <= 0) {
            return
        }
        --editor.currentNode.currStep
        for (let p in editor.currentNode) {
            if (p !== 'currStep') {
                editor.currentNode[p] = (editor.currentNode.historyStack[editor.currentNode.currStep])[p]
            }
        }
    },
    // 重做节点操作
    reMakeNodeAction: function () {
        if (editor.currentNode.currStep >= editor.currentNode.maxHistoryStep ||
            editor.currentNode.currStep >= editor.currentNode.historyStack.length - 1) {
            return
        }
        editor.currentNode.currStep++
        for (let q in editor.currentNode) {
            if (q !== 'currStep') {
                editor.currentNode[q] = (editor.currentNode.historyStack[editor.currentNode.currStep])[q]
            }
        }
    },
    // 保存节点新的状态
    saveNodeNewState: function () {
        // 如果历史栈超过最大可记录历史长度，丢弃第一个元素
        if (editor.currentNode.historyStack.length >= editor.currentNode.maxHistoryStep + 1) {
            editor.currentNode.historyStack.shift()
        }
        editor.currentNode.historyStack.push(JTopo.util.clone(editor.currentNode))
        editor.currentNode.currStep = editor.currentNode.historyStack.length - 1
    },
    // 保存节点初始状态,便于回退
    saveNodeInitState: function () {
        if (!editor.currentNode.hasInitStateSaved) {
            editor.currentNode.historyStack.push(JTopo.util.clone(editor.currentNode))
            editor.currentNode.hasInitStateSaved = true
        }
    },
    // 查找节点,便居中闪动显示
    findNodeAndFlash: function (text) {
        if (!text) return
        // var self = this
        text = text.trim()
        let nodes = editor.stage.find('node[text="' + text + '"]')
        if (nodes.length > 0) {
            let node = nodes[0]
            this.unSelectAllNodeExcept(node)
            node.selected = true
            let location = node.getCenterLocation()
            // 查询到的节点居中显示
            editor.stage.setCenter(location.x, location.y)

            function nodeFlash(node, n) {
                if (n === 0) {
                    editor.utils.unSelectAllNodeExcept(node)
                    return
                }
                node.selected = !node.selected
                setTimeout(function () {
                    nodeFlash(node, n - 1)
                }, 300)
            }

            // 闪烁几下
            nodeFlash(node, 10)
        } else {
            // alert('没有找到该节点,请输入完整的节点名称!')
        }
    },
    // 取消出参数节点外所有节点的选中状态
    unSelectAllNodeExcept: function (node) {
        editor.stage.childs.forEach(function (s) {
            s.childs.forEach(function (n) {
                // id属性无有效值，说明该节点没有保存到数据库
                if (n.nodeId !== node.nodeId) {
                    n.selected = false
                }
            })
        })
    }
}
