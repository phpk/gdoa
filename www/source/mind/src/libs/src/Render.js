import merge from 'deepmerge'
import LogicalStructure from './layouts/LogicalStructure'
import MindMap from './layouts/MindMap'
import CatalogOrganization from './layouts/CatalogOrganization'
import OrganizationStructure from './layouts/OrganizationStructure'
import TextEdit from './TextEdit'
import { copyNodeTree, simpleDeepClone, walk } from './utils'

// 布局列表
const layouts = {
    // 逻辑结构图
    logicalStructure: LogicalStructure,
    // 思维导图
    mindMap: MindMap,
    // 目录组织图
    catalogOrganization: CatalogOrganization,
    // 组织结构图
    organizationStructure: OrganizationStructure
}

/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-04-08 16:25:07 
 * @Desc: 渲染
 */
class Render {
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 16:25:32 
     * @Desc: 构造函数 
     */
    constructor(opt = {}) {
        this.opt = opt
        this.mindMap = opt.mindMap
        this.themeConfig = this.mindMap.themeConfig
        this.draw = this.mindMap.draw
        // 渲染树，操作过程中修改的都是这里的数据
        this.renderTree = merge({}, this.mindMap.opt.data || {})
        // 是否重新渲染
        this.reRender = false
        // 当前激活的节点列表
        this.activeNodeList = []
        // 根节点
        this.root = null
        // 文本编辑框，需要再bindEvent之前实例化，否则单击事件只能触发隐藏文本编辑框，而无法保存文本修改
        this.textEdit = new TextEdit(this)
        // 布局
        this.setLayout()
        // 绑定事件
        this.bindEvent()
        // 注册命令
        this.registerCommands()
        // 注册快捷键
        this.registerShortcutKeys()
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-07-13 16:20:07 
     * @Desc: 设置布局结构 
     */
    setLayout() {
        this.layout = new (layouts[this.mindMap.opt.layout] ? layouts[this.mindMap.opt.layout] : layouts.logicalStructure)(this)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-06-20 10:34:06 
     * @Desc:  绑定事件
     */
    bindEvent() {
        // 点击事件
        this.mindMap.on('draw_click', () => {
            // 清除激活状态
            if (this.activeNodeList.length > 0) {
                this.mindMap.execCommand('CLEAR_ACTIVE_NODE')
            }
        })
    }

    /** 
     * 注册命令 
     */
    registerCommands() {
        // 全选
        this.selectAll = this.selectAll.bind(this)
        this.mindMap.command.add('SELECT_ALL', this.selectAll)
        // 回退
        this.back = this.back.bind(this)
        this.mindMap.command.add('BACK', this.back)
        // 前进
        this.forward = this.forward.bind(this)
        this.mindMap.command.add('FORWARD', this.forward)
        // 插入同级节点
        this.insertNode = this.insertNode.bind(this)
        this.mindMap.command.add('INSERT_NODE', this.insertNode)
        // 插入子节点
        this.insertChildNode = this.insertChildNode.bind(this)
        this.mindMap.command.add('INSERT_CHILD_NODE', this.insertChildNode)
        // 上移节点
        this.upNode = this.upNode.bind(this)
        this.mindMap.command.add('UP_NODE', this.upNode)
        // 下移节点
        this.downNode = this.downNode.bind(this)
        this.mindMap.command.add('DOWN_NODE', this.downNode)
        // 移动节点
        this.insertAfter = this.insertAfter.bind(this)
        this.mindMap.command.add('INSERT_AFTER', this.insertAfter)
        this.insertBefore = this.insertBefore.bind(this)
        this.mindMap.command.add('INSERT_BEFORE', this.insertBefore)
        this.moveNodeTo = this.moveNodeTo.bind(this)
        this.mindMap.command.add('MOVE_NODE_TO', this.moveNodeTo)
        // 删除节点
        this.removeNode = this.removeNode.bind(this)
        this.mindMap.command.add('REMOVE_NODE', this.removeNode)
        // 粘贴节点
        this.pasteNode = this.pasteNode.bind(this)
        this.mindMap.command.add('PASTE_NODE', this.pasteNode)
        // 剪切节点
        this.cutNode = this.cutNode.bind(this)
        this.mindMap.command.add('CUT_NODE', this.cutNode)
        // 修改节点样式
        this.setNodeStyle = this.setNodeStyle.bind(this)
        this.mindMap.command.add('SET_NODE_STYLE', this.setNodeStyle)
        // 切换节点是否激活
        this.setNodeActive = this.setNodeActive.bind(this)
        this.mindMap.command.add('SET_NODE_ACTIVE', this.setNodeActive)
        // 清除所有激活节点
        this.clearAllActive = this.clearAllActive.bind(this)
        this.mindMap.command.add('CLEAR_ACTIVE_NODE', this.clearAllActive)
        // 切换节点是否展开
        this.setNodeExpand = this.setNodeExpand.bind(this)
        this.mindMap.command.add('SET_NODE_EXPAND', this.setNodeExpand)
        // 展开所有节点
        this.expandAllNode = this.expandAllNode.bind(this)
        this.mindMap.command.add('EXPAND_ALL', this.expandAllNode)
        // 收起所有节点
        this.unexpandAllNode = this.unexpandAllNode.bind(this)
        this.mindMap.command.add('UNEXPAND_ALL', this.unexpandAllNode)
        // 设置节点数据
        this.setNodeData = this.setNodeData.bind(this)
        this.mindMap.command.add('SET_NODE_DATA', this.setNodeData)
        // 设置节点文本
        this.setNodeText = this.setNodeText.bind(this)
        this.mindMap.command.add('SET_NODE_TEXT', this.setNodeText)
        // 设置节点图片
        this.setNodeImage = this.setNodeImage.bind(this)
        this.mindMap.command.add('SET_NODE_IMAGE', this.setNodeImage)
        // 设置节点图标
        this.setNodeIcon = this.setNodeIcon.bind(this)
        this.mindMap.command.add('SET_NODE_ICON', this.setNodeIcon)
        // 设置节点超链接
        this.setNodeHyperlink = this.setNodeHyperlink.bind(this)
        this.mindMap.command.add('SET_NODE_HYPERLINK', this.setNodeHyperlink)
        // 设置节点备注
        this.setNodeNote = this.setNodeNote.bind(this)
        this.mindMap.command.add('SET_NODE_NOTE', this.setNodeNote)
        // 设置节点标签
        this.setNodeTag = this.setNodeTag.bind(this)
        this.mindMap.command.add('SET_NODE_TAG', this.setNodeTag)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-11 16:55:44 
     * @Desc: 注册快捷键 
     */
    registerShortcutKeys() {
        // 插入下级节点
        this.mindMap.keyCommand.addShortcut('Tab', () => {
            this.mindMap.execCommand('INSERT_CHILD_NODE')
        })
        // 插入同级节点
        let insertNodeWrap = () => {
            if (this.textEdit.showTextEdit) {
                return
            }
            this.mindMap.execCommand('INSERT_NODE')
        }
        this.mindMap.keyCommand.addShortcut('Enter', insertNodeWrap)
        // 展开/收起节点
        this.mindMap.keyCommand.addShortcut('/', () => {
            this.activeNodeList.forEach((node) => {
                if (node.nodeData.children.length <= 0) {
                    return
                }
                this.toggleNodeExpand(node)
            })
        })
        // 删除节点
        let removeNodeWrap = () => {
            this.mindMap.execCommand('REMOVE_NODE')
        }
        this.mindMap.keyCommand.addShortcut('Del|Backspace', removeNodeWrap)
        // 节点编辑时某些快捷键会存在冲突，需要暂时去除
        this.mindMap.on('before_show_text_edit', () => {
            this.mindMap.keyCommand.removeShortcut('Del|Backspace')
            this.mindMap.keyCommand.removeShortcut('Enter', insertNodeWrap)
        })
        this.mindMap.on('hide_text_edit', () => {
            this.mindMap.keyCommand.addShortcut('Del|Backspace', removeNodeWrap)
            this.mindMap.keyCommand.addShortcut('Enter', insertNodeWrap)
        })
        // 全选
        this.mindMap.keyCommand.addShortcut('Control+a', () => {
            this.mindMap.execCommand('SELECT_ALL')
        })
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 16:27:55 
     * @Desc:  渲染
     */
    render() {
        if (this.reRender) {
            this.clearActive()
        }
        this.layout.doLayout((root) => {
            this.root = root
            this.root.render()
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-12 22:45:01 
     * @Desc: 清除当前激活的节点 
     */
    clearActive() {
        this.activeNodeList.forEach((item) => {
            this.setNodeActive(item, false)
        })
        this.activeNodeList = []
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-08-03 23:14:34 
     * @Desc: 清除当前所有激活节点，并会触发事件 
     */
    clearAllActive() {
        if (this.activeNodeList.length <= 0) {
            return
        }
        this.clearActive()
        this.mindMap.emit('node_active', null, [])
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-11 10:54:00 
     * @Desc:  添加节点到激活列表里
     */
    addActiveNode(node) {
        let index = this.findActiveNodeIndex(node)
        if (index === -1) {
            this.activeNodeList.push(node)
        }
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 10:04:04 
     * @Desc: 在激活列表里移除某个节点 
     */
    removeActiveNode(node) {
        let index = this.findActiveNodeIndex(node)
        if (index === -1) {
            return
        }
        this.activeNodeList.splice(index, 1)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-11 10:55:23 
     * @Desc: 检索某个节点在激活列表里的索引 
     */
    findActiveNodeIndex(node) {
        return this.activeNodeList.findIndex((item) => {
            return item === node
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 13:46:08 
     * @Desc: 获取节点在同级里的索引位置 
     */
    getNodeIndex(node) {
        return node.parent ? node.parent.children.findIndex((item) => {
            return item === node
        }) : 0
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-08-04 23:54:52 
     * @Desc: 全选 
     */
    selectAll() {
        walk(this.root, null, (node) => {
            if (!node.nodeData.data.isActive) {
                node.nodeData.data.isActive = true
                this.addActiveNode(node)
                setTimeout(() => {
                    node.renderNode()
                }, 0);
            }
        }, null, true, 0, 0)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-11 22:34:12 
     * @Desc: 回退 
     */
    back(step) {
        this.clearAllActive()
        let data = this.mindMap.command.back(step)
        if (data) {
            this.renderTree = data
            this.mindMap.reRender()
        }
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-07-12 10:44:51 
     * @Desc: 前进 
     */
    forward(step) {
        this.clearAllActive()
        let data = this.mindMap.command.forward(step)
        if (data) {
            this.renderTree = data
            this.mindMap.reRender()
        }
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 13:19:54 
     * @Desc: 插入同级节点，多个节点只会操作第一个节点
     */
    insertNode() {
        if (this.activeNodeList.length <= 0) {
            return
        }
        let first = this.activeNodeList[0]
        if (first.isRoot) {
            this.insertChildNode()
        } else {
            if (first.layerIndex === 1) {
                first.parent.initRender = true
            }
            let index = this.getNodeIndex(first)
            first.parent.nodeData.children.splice(index + 1, 0, {
                "data": {
                    "text": "分支主题",
                    "expand": true
                },
                "children": []
            })
            this.mindMap.render()
        }
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 13:31:02 
     * @Desc: 插入子节点 
     */
    insertChildNode() {
        if (this.activeNodeList.length <= 0) {
            return
        }
        this.activeNodeList.forEach((node, index) => {
            if (!node.nodeData.children) {
                node.nodeData.children = []
            }
            node.nodeData.children.push({
                "data": {
                    "text": "分支主题",
                    "expand": true
                },
                "children": []
            })
            if (node.isRoot) {
                node.initRender = true
                // this.mindMap.batchExecution.push('renderNode' + index, () => {
                //     node.renderNode()
                // })
            }
        })
        this.mindMap.render()
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-14 23:34:14 
     * @Desc: 上移节点，多个节点只会操作第一个节点
     */
    upNode() {
        if (this.activeNodeList.length <= 0) {
            return
        }
        let node = this.activeNodeList[0]
        if (node.isRoot) {
            return
        }
        let parent = node.parent
        let childList = parent.children
        let index = childList.findIndex((item) => {
            return item === node
        })
        if (index === -1 || index === 0) {
            return
        }
        let insertIndex = index - 1
        // 节点实例
        childList.splice(index, 1)
        childList.splice(insertIndex, 0, node)
        // 节点数据
        parent.nodeData.children.splice(index, 1)
        parent.nodeData.children.splice(insertIndex, 0, node.nodeData)
        this.mindMap.render()
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-14 23:34:18 
     * @Desc: 下移节点，多个节点只会操作第一个节点 
     */
    downNode() {
        if (this.activeNodeList.length <= 0) {
            return
        }
        let node = this.activeNodeList[0]
        if (node.isRoot) {
            return
        }
        let parent = node.parent
        let childList = parent.children
        let index = childList.findIndex((item) => {
            return item === node
        })
        if (index === -1 || index === childList.length - 1) {
            return
        }
        let insertIndex = index + 1
        // 节点实例
        childList.splice(index, 1)
        childList.splice(insertIndex, 0, node)
        // 节点数据
        parent.nodeData.children.splice(index, 1)
        parent.nodeData.children.splice(insertIndex, 0, node.nodeData)
        this.mindMap.render()
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-11-25 10:51:34 
     * @Desc: 将节点移动到另一个节点的前面
     */
    insertBefore(node, exist) {
        if (node.isRoot) {
            return
        }
        let parent = node.parent
        let childList = parent.children
        // 要移动节点的索引
        let index = childList.findIndex((item) => {
            return item === node
        })
        if (index === -1) {
            return
        }
        // 目标节点的索引
        let existIndex = childList.findIndex((item) => {
            return item === exist
        })
        if (existIndex === -1) {
            return
        }
        // 当前节点在目标节点前面
        if (index < existIndex) {
            existIndex = existIndex - 1
        } else {
            existIndex = existIndex
        }
        // 节点实例
        childList.splice(index, 1)
        childList.splice(existIndex, 0, node)
        // 节点数据
        parent.nodeData.children.splice(index, 1)
        parent.nodeData.children.splice(existIndex, 0, node.nodeData)
        this.mindMap.render()
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-11-25 10:51:34 
     * @Desc: 将节点移动到另一个节点的后面
     */
    insertAfter(node, exist) {
        if (node.isRoot) {
            return
        }
        let parent = node.parent
        let childList = parent.children
        // 要移动节点的索引
        let index = childList.findIndex((item) => {
            return item === node
        })
        if (index === -1) {
            return
        }
        // 目标节点的索引
        let existIndex = childList.findIndex((item) => {
            return item === exist
        })
        if (existIndex === -1) {
            return
        }
        // 当前节点在目标节点前面
        if (index < existIndex) {
            existIndex = existIndex
        } else {
            existIndex = existIndex + 1
        }
        // 节点实例
        childList.splice(index, 1)
        childList.splice(existIndex, 0, node)
        // 节点数据
        parent.nodeData.children.splice(index, 1)
        parent.nodeData.children.splice(existIndex, 0, node.nodeData)
        this.mindMap.render()
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 13:40:39 
     * @Desc: 移除节点 
     */
    removeNode() {
        if (this.activeNodeList.length <= 0) {
            return
        }
        for (let i = 0; i < this.activeNodeList.length; i++) {
            let node = this.activeNodeList[i]
            if (node.isRoot) {
                node.children.forEach((child) => {
                    child.remove()
                })
                node.children = []
                node.nodeData.children = []
                break
            } else {
                this.removeActiveNode(node)
                this.removeOneNode(node)
                i--
            }
        }
        this.mindMap.emit('node_active', null, [])
        this.mindMap.render()
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-15 22:46:27 
     * @Desc: 移除某个指定节点 
     */
    removeOneNode(node) {
        let index = this.getNodeIndex(node)
        node.remove()
        node.parent.children.splice(index, 1)
        node.parent.nodeData.children.splice(index, 1)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-07-15 09:53:23 
     * @Desc: 复制节点，多个节点只会操作第一个节点 
     */
    copyNode() {
        if (this.activeNodeList.length <= 0) {
            return
        }
        return copyNodeTree({}, this.activeNodeList[0])
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-15 22:36:45 
     * @Desc: 剪切节点，多个节点只会操作第一个节点
     */
    cutNode(callback) {
        if (this.activeNodeList.length <= 0) {
            return
        }
        let node = this.activeNodeList[0]
        if (node.isRoot) {
            return null
        }
        let copyData = copyNodeTree({}, node)
        this.removeActiveNode(node)
        this.removeOneNode(node)
        this.mindMap.emit('node_active', null, this.activeNodeList)
        this.mindMap.render()
        if (callback && typeof callback === 'function') {
            callback(copyData)
        }
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-11-24 16:54:01 
     * @Desc: 移动一个节点作为另一个节点的子节点 
     */
    moveNodeTo(node, toNode) {
        if (node.isRoot) {
            return
        }
        let copyData = copyNodeTree({}, node)
        this.removeActiveNode(node)
        this.removeOneNode(node)
        this.mindMap.emit('node_active', null, this.activeNodeList)
        toNode.nodeData.children.push(copyData)
        this.mindMap.render()
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-15 20:09:39 
     * @Desc:  粘贴节点到节点
     */
    pasteNode(data) {
        if (this.activeNodeList.length <= 0) {
            return
        }
        this.activeNodeList.forEach((item) => {
            item.nodeData.children.push(simpleDeepClone(data))
        })
        this.mindMap.render()
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-08 21:54:30 
     * @Desc: 设置节点样式 
     */
    setNodeStyle(node, prop, value, isActive) {
        let data = {}
        if (isActive) {
            data = {
                activeStyle: {
                    ...(node.nodeData.data.activeStyle || {}),
                    [prop]: value
                }
            }
        } else {
            data = {
                [prop]: value
            }
        }
        this.setNodeDataRender(node, data)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-08 22:13:03 
     * @Desc: 设置节点是否激活 
     */
    setNodeActive(node, active) {
        this.setNodeData(node, {
            isActive: active
        })
        node.renderNode()
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 16:52:41 
     * @Desc: 设置节点是否展开 
     */
    setNodeExpand(node, expand) {
        this.setNodeData(node, {
            expand
        })
        if (expand) { // 展开
            node.children.forEach((item) => {
                item.render()
            })
            node.renderLine()
            node.updateExpandBtnNode()
        } else { // 收缩
            node.children.forEach((item) => {
                item.remove()
            })
            node.removeLine()
            node.updateExpandBtnNode()
        }
        this.mindMap.render()
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-15 23:23:37 
     * @Desc: 展开所有 
     */
    expandAllNode() {
        walk(this.renderTree, null, (node) => {
            if (!node.data.expand) {
                node.data.expand = true
            }
        }, null, true, 0, 0)
        this.mindMap.render()
        this.root.children.forEach((item) => {
            item.updateExpandBtnNode()
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-15 23:27:14 
     * @Desc: 收起所有 
     */
    unexpandAllNode() {
        this.root.children.forEach((item) => {
            this.setNodeExpand(item, false)
        })
        walk(this.renderTree, null, (node, parent, isRoot) => {
            if (!isRoot) {
                node.data.expand = false
            }
        }, null, true, 0, 0)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-11 17:15:33 
     * @Desc: 切换节点展开状态 
     */
    toggleNodeExpand(node) {
        this.mindMap.execCommand('SET_NODE_EXPAND', node, !node.nodeData.data.expand)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-09 22:04:19 
     * @Desc: 设置节点文本 
     */
    setNodeText(node, text) {
        this.setNodeDataRender(node, {
            text
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 08:37:40 
     * @Desc: 设置节点图片 
     */
    setNodeImage(node, {
        url,
        title,
        width,
        height
    }) {
        this.setNodeDataRender(node, {
            image: url,
            imageTitle: title || '',
            imageSize: {
                width,
                height,
            },
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 08:44:06 
     * @Desc: 设置节点图标 
     */
    setNodeIcon(node, icons) {
        this.setNodeDataRender(node, {
            icon: icons
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 08:49:33 
     * @Desc: 设置节点超链接 
     */
    setNodeHyperlink(node, link, title = '') {
        this.setNodeDataRender(node, {
            hyperlink: link,
            hyperlinkTitle: title,
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 08:52:59 
     * @Desc: 设置节点备注 
     */
    setNodeNote(node, note) {
        this.setNodeDataRender(node, {
            note
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 08:54:53 
     * @Desc: 设置节点标签 
     */
    setNodeTag(node, tag) {
        this.setNodeDataRender(node, {
            tag
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 14:19:48 
     * @Desc: 更新节点数据 
     */
    setNodeData(node, data) {
        Object.keys(data).forEach((key) => {
            node.nodeData.data[key] = data[key]
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 08:45:48 
     * @Desc: 设置节点数据，并判断是否渲染 
     */
    setNodeDataRender(node, data) {
        this.setNodeData(node, data)
        let changed = node.getSize()
        node.renderNode()
        if (changed) {
            this.mindMap.render()
        }
    }
}

export default Render