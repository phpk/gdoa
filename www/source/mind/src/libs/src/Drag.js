import {
    bfsWalk,
    throttle
} from './utils'
import Base from './layouts/Base'

/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-11-23 17:38:55 
 * @Desc: 节点拖动类 
 */
class Drag extends Base {
    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 22:35:16 
     * @Desc: 构造函数 
     */
    constructor({
        mindMap
    }) {
        super(mindMap.renderer)
        this.mindMap = mindMap
        this.reset()
        this.bindEvent()
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-11-23 19:33:56 
     * @Desc: 复位 
     */
    reset() {
        // 当前拖拽节点
        this.node = null
        // 当前重叠节点
        this.overlapNode = null
        // 当前上一个同级节点
        this.prevNode = null
        // 当前下一个同级节点
        this.nextNode = null
        // 画布的变换数据
        this.drawTransform = null
        // 克隆节点
        this.clone = null
        // 连接线
        this.line = null
        // 同级位置占位符
        this.placeholder = null
        // 鼠标按下位置和节点左上角的偏移量
        this.offsetX = 0
        this.offsetY = 0
        // 克隆节点左上角的坐标
        this.cloneNodeLeft = 0
        this.cloneNodeTop = 0
        // 当前鼠标是否按下
        this.isMousedown = false
        // 拖拽的鼠标位置变量
        this.mouseDownX = 0
        this.mouseDownY = 0
        this.mouseMoveX = 0
        this.mouseMoveY = 0
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 22:36:36 
     * @Desc: 绑定事件 
     */
    bindEvent() {
        this.checkOverlapNode = throttle(this.checkOverlapNode, 300, this)
        this.mindMap.on('node_mousedown', (node, e) => {
            if (e.which !== 1 || node.isRoot) {
                return
            }
            // 计算鼠标按下的位置距离节点左上角的距离
            this.drawTransform = this.mindMap.draw.transform()
            let {
                scaleX,
                scaleY,
                translateX,
                translateY
            } = this.drawTransform
            this.offsetX = e.clientX - (node.left * scaleX + translateX)
            this.offsetY = e.clientY - (node.top * scaleY + translateY)
            // 
            this.node = node
            this.isMousedown = true
            let {
                x,
                y
            } = this.mindMap.toPos(e.clientX, e.clientY)
            this.mouseDownX = x
            this.mouseDownY = y
        })
        this.mindMap.on('mousemove', (e) => {
            if (!this.isMousedown) {
                return
            }
            let {
                x,
                y
            } = this.mindMap.toPos(e.clientX, e.clientY)
            this.mouseMoveX = x
            this.mouseMoveY = y
            if ((Math.abs(x - this.mouseDownX) <= 10 && Math.abs(y - this.mouseDownY) <= 10) && !this.node.isDrag) {
                return
            }
            this.mindMap.renderer.clearAllActive()
            this.onMove(x, y)
        })
        this.onMouseup = this.onMouseup.bind(this)
        this.mindMap.on('node_mouseup', this.onMouseup)
        this.mindMap.on('mouseup', this.onMouseup)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-11-23 19:38:02 
     * @Desc: 鼠标松开事件 
     */
    onMouseup() {
        if (!this.isMousedown) {
            return;
        }
        this.isMousedown = false
        this.node.isDrag = false
        this.node.show()
        this.removeCloneNode()
        // 存在重叠子节点，则移动作为其子节点
        if (this.overlapNode) {
            this.mindMap.renderer.setNodeActive(this.overlapNode, false)
            this.mindMap.execCommand('MOVE_NODE_TO', this.node, this.overlapNode)
        } else if (this.prevNode) { // 存在前一个相邻节点，作为其下一个兄弟节点
            this.mindMap.renderer.setNodeActive(this.prevNode, false)
            this.mindMap.execCommand('INSERT_AFTER', this.node, this.prevNode)
        } else if (this.nextNode) { // 存在下一个相邻节点，作为其前一个兄弟节点
            this.mindMap.renderer.setNodeActive(this.nextNode, false)
            this.mindMap.execCommand('INSERT_BEFORE', this.node, this.nextNode)
        }
        this.reset()
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-11-23 19:34:53 
     * @Desc: 创建克隆节点 
     */
    createCloneNode() {
        if (!this.clone) {
            // 节点
            this.clone = this.node.group.clone()
            this.clone.opacity(0.5)
            this.clone.css('z-index', 99999)
            this.node.isDrag = true
            this.node.hide()
            // 连接线
            this.line = this.draw.path()
            this.line.opacity(0.5)
            this.node.style.line(this.line)
            // 同级位置占位符
            this.placeholder = this.draw.rect().fill({
                color: this.node.style.merge('lineColor', true)
            })
            this.mindMap.draw.add(this.clone)
        }
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-11-23 19:35:16 
     * @Desc: 移除克隆节点 
     */
    removeCloneNode() {
        if (!this.clone) {
            return
        }
        this.clone.remove()
        this.line.remove()
        this.placeholder.remove()
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-11-23 18:53:47 
     * @Desc: 拖动中 
     */
    onMove(x, y) {
        if (!this.isMousedown) {
            return;
        }
        this.createCloneNode()
        let {
            scaleX,
            scaleY,
            translateX,
            translateY
        } = this.drawTransform
        this.cloneNodeLeft = x - this.offsetX
        this.cloneNodeTop = y - this.offsetY
        x = (this.cloneNodeLeft - translateX) / scaleX
        y = (this.cloneNodeTop - translateY) / scaleY
        let t = this.clone.transform()
        this.clone.translate(x - t.translateX, y - t.translateY)
        // 连接线
        let parent = this.node.parent
        this.line.plot(this.quadraticCurvePath(parent.left + parent.width / 2, parent.top + parent.height / 2, x + this.node.width / 2, y + this.node.height / 2))
        this.checkOverlapNode()
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-11 10:20:43 
     * @Desc: 检测重叠节点 
     */
    checkOverlapNode() {
        if (!this.drawTransform) {
            return
        }
        let {
            scaleX,
            scaleY,
            translateX,
            translateY
        } = this.drawTransform
        let checkRight = this.cloneNodeLeft + this.node.width * scaleX
        let checkBottom = this.cloneNodeTop + this.node.height * scaleX
        this.overlapNode = null
        this.prevNode = null
        this.nextNode = null
        this.placeholder.size(0, 0)
        bfsWalk(this.mindMap.renderer.root, (node) => {
            if (node.nodeData.data.isActive) {
                this.mindMap.renderer.setNodeActive(node, false)
            }
            if (node === this.node || this.node.isParent(node)) {
                return
            }
            if (this.overlapNode || this.prevNode && this.nextNode) {
                return
            }
            let {
                left,
                top,
                width,
                height
            } = node
            let _left = left
            let _top = top
            let _bottom = top + height
            let right = (left + width) * scaleX + translateX
            let bottom = (top + height) * scaleY + translateY
            left = left * scaleX + translateX
            top = top * scaleY + translateY
            // 检测是否重叠
            if (!this.overlapNode) {
                if (
                    left <= checkRight && right >= this.cloneNodeLeft &&
                    top <= checkBottom && bottom >= this.cloneNodeTop
                ) {
                    this.overlapNode = node
                }
            }
            // 检测兄弟节点位置
            if (!this.prevNode && !this.nextNode && this.node.isBrother(node)) {
                if (left <= checkRight && right >= this.cloneNodeLeft) {
                    if (this.cloneNodeTop > bottom && this.cloneNodeTop <= bottom + 10) {
                        this.prevNode = node
                        this.placeholder.size(node.width, 10).move(_left, _bottom)
                    } else if (checkBottom < top && checkBottom >= top - 10) {
                        this.nextNode = node
                        this.placeholder.size(node.width, 10).move(_left, _top - 10)
                    }
                }
            }
        })
        if (this.overlapNode) {
            this.mindMap.renderer.setNodeActive(this.overlapNode, true)
        }
    }
}

export default Drag