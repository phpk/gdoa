import Base from './Base';
import {
    walk,
    asyncRun
} from '../utils'

/** 
 * @Author: 王林 
 * @Date: 2021-04-12 22:25:58 
 * @Desc: 思维导图 
 * 在逻辑结构图的基础上增加一个变量来记录生长方向，向左还是向右，同时在计算left的时候根据方向来计算、调整top时只考虑同方向的节点即可
 */
class MindMap extends Base {
    /** 
     * @Author: 王林 
     * @Date: 2021-04-12 22:26:31 
     * @Desc: 构造函数 
     */
    constructor(opt = {}) {
        super(opt)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-06 14:04:20 
     * @Desc: 布局
     */
    doLayout(callback) {
        let task = [() => {
            this.computedBaseValue()
        }, () => {
            this.computedTopValue()
        }, () => {
            this.adjustTopValue()
        }, () => {
            callback(this.root)
        }]
        asyncRun(task)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 09:49:32 
     * @Desc: 遍历数据计算节点的left、width、height
     */
    computedBaseValue() {
        walk(this.renderer.renderTree, null, (cur, parent, isRoot, layerIndex, index) => {
            let newNode = this.createNode(cur, parent, isRoot, layerIndex)
            // 根节点定位在画布中心位置
            if (isRoot) {
                this.setNodeCenter(newNode)
            } else {
                // 非根节点
                // 三级及以下节点以上级为准
                if (parent._node.dir) {
                    newNode.dir = parent._node.dir
                } else { // 节点生长方向
                    newNode.dir = index % 2 === 0 ? 'right' : 'left'
                }
                // 根据生长方向定位到父节点的左侧或右侧
                newNode.left = newNode.dir === 'right' ? parent._node.left + parent._node.width + this.getMarginX(layerIndex) : parent._node.left - this.getMarginX(layerIndex) - newNode.width
            }
            if (!cur.data.expand) {
                return true;
            }
        }, (cur, parent, isRoot, layerIndex) => {
            // 返回时计算节点的leftChildrenAreaHeight和rightChildrenAreaHeight，也就是左侧和右侧子节点所占的高度之和，包括外边距
            if (!cur.data.expand) {
                cur._node.leftChildrenAreaHeight = 0
                cur._node.rightChildrenAreaHeight = 0
                return
            }
            // 理论上只有根节点是存在两个方向的子节点的，其他节点的子节点一定全都是同方向，但是为了逻辑统一，就不按特殊处理的方式来写了
            let leftLen = 0
            let rightLen = 0
            let leftChildrenAreaHeight = 0
            let rightChildrenAreaHeight = 0
            cur._node.children.forEach((item) => {
                if (item.dir === 'left') {
                    leftLen++
                    leftChildrenAreaHeight += item.height
                } else {
                    rightLen++
                    rightChildrenAreaHeight += item.height
                }
            })
            cur._node.leftChildrenAreaHeight = leftChildrenAreaHeight + (leftLen + 1) * this.getMarginY(layerIndex + 1)
            cur._node.rightChildrenAreaHeight = rightChildrenAreaHeight + (rightLen + 1) * this.getMarginY(layerIndex + 1)
        }, true, 0)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 09:59:25 
     * @Desc: 遍历节点树计算节点的top 
     */
    computedTopValue() {
        walk(this.root, null, (node, parent, isRoot, layerIndex) => {
            if (node.nodeData.data.expand && node.children && node.children.length) {
                let marginY = this.getMarginY(layerIndex + 1)
                let baseTop = node.top + node.height / 2 + marginY
                // 第一个子节点的top值 = 该节点中心的top值 - 子节点的高度之和的一半
                let leftTotalTop = baseTop - node.leftChildrenAreaHeight / 2
                let rightTotalTop = baseTop - node.rightChildrenAreaHeight / 2
                node.children.forEach((cur) => {
                    if (cur.dir === 'left') {
                        cur.top = leftTotalTop
                        leftTotalTop += cur.height + marginY
                    } else {
                        cur.top = rightTotalTop
                        rightTotalTop += cur.height + marginY
                    }
                })
            }
        }, null, true)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 10:04:05 
     * @Desc: 调整节点top 
     */
    adjustTopValue() {
        walk(this.root, null, (node, parent, isRoot, layerIndex) => {
            if (!node.nodeData.data.expand) {
                return;
            }
            // 判断子节点所占的高度之和是否大于该节点自身，大于则需要调整位置
            let base = this.getMarginY(layerIndex + 1) * 2 + node.height
            let leftDifference = node.leftChildrenAreaHeight - base
            let rightDifference = node.rightChildrenAreaHeight - base
            if (leftDifference > 0 || rightDifference > 0) {
                this.updateBrothers(node, leftDifference / 2, rightDifference / 2)
            }
        }, null, true)
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 14:26:03 
     * @Desc: 更新兄弟节点的top
     */
    updateBrothers(node, leftAddHeight, rightAddHeight) {
        if (node.parent) {
            // 过滤出和自己同方向的节点
            let childrenList = node.parent.children.filter((item) => {
                return item.dir === node.dir
            })
            let index = childrenList.findIndex((item) => {
                return item === node
            })
            childrenList.forEach((item, _index) => {
                let _offset = 0
                let addHeight = item.dir === 'left' ? leftAddHeight : rightAddHeight
                // 上面的节点往上移
                if (_index < index) {
                    _offset = -addHeight
                } else if (_index > index) { // 下面的节点往下移
                    _offset = addHeight
                }
                item.top += _offset
                // 同步更新子节点的位置
                if (item.children && item.children.length) {
                    this.updateChildren(item.children, 'top', _offset)
                }
            })
            // 更新父节点的位置
            this.updateBrothers(node.parent, leftAddHeight, rightAddHeight)
        }
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 14:42:48 
     * @Desc: 绘制连线，连接该节点到其子节点
     */
    renderLine(node, lines) {
        if (node.children.length <= 0) {
            return [];
        }
        let {
            left,
            top,
            width,
            height,
            expandBtnSize
        } = node
        node.children.forEach((item, index) => {
            let x1 = node.layerIndex === 0 ? left + width / 2 : item.dir === 'left' ? left - expandBtnSize : left + width + 20
            let y1 = top + height / 2
            let x2 = item.dir === 'left' ? item.left + item.width : item.left
            let y2 = item.top + item.height / 2
            let path = ''
            if (node.isRoot) {
                path = this.quadraticCurvePath(x1, y1, x2, y2)
            } else {
                path = this.cubicBezierPath(x1, y1, x2, y2)
            }
            lines[index].plot(path)
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 19:54:26 
     * @Desc: 渲染按钮 
     */
    renderExpandBtn(node, btn) {
        let {
            width,
            height,
            expandBtnSize
        } = node
        let {
            translateX,
            translateY
        } = btn.transform()
        let x = (node.dir === 'left' ? 0 - expandBtnSize : width) - translateX
        let y = height / 2 - translateY
        btn.translate(x, y)
    }
}

export default MindMap