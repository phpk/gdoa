import { copyRenderTree, simpleDeepClone } from './utils';

/** 
 * @Author: 王林 
 * @Date: 2021-05-04 13:10:06 
 * @Desc: 命令类 
 */
class Command {
    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 13:10:24 
     * @Desc: 构造函数 
     */
    constructor(opt = {}) {
        this.opt = opt
        this.mindMap = opt.mindMap
        this.commands = {}
        this.history = []
        this.activeHistoryIndex = 0
        // 注册快捷键
        this.registerShortcutKeys()
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-08-03 23:06:55 
     * @Desc: 清空历史数据 
     */
    clearHistory() {
        this.history = []
        this.activeHistoryIndex = 0
        this.mindMap.emit('back_forward', 0, 0)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-08-02 23:23:19 
     * @Desc: 注册快捷键 
     */
    registerShortcutKeys() {
        this.mindMap.keyCommand.addShortcut('Control+z', () => {
            this.mindMap.execCommand('BACK')
        })
        this.mindMap.keyCommand.addShortcut('Control+y', () => {
            this.mindMap.execCommand('FORWARD')
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 13:12:30 
     * @Desc: 执行命令 
     */
    exec(name, ...args) {
        if (this.commands[name]) {
            this.commands[name].forEach((fn) => {
                fn(...args)
            })
            if (name === 'BACK' || name === 'FORWARD') {
                return;
            }
            this.addHistory()
        }
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 13:13:01 
     * @Desc: 添加命令 
     */
    add(name, fn) {
        if (this.commands[name]) {
            this.commands[name].push(fn)
        } else {
            this.commands[name] = [fn]
        }
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-15 23:02:41 
     * @Desc: 移除命令 
     */
    remove(name, fn) {
        if (!this.commands[name]) {
            return
        }
        if (!fn) {
            this.commands[name] = []
            delete this.commands[name]
        } else {
            let index = this.commands[name].find((item) => {
                return item === fn;
            })
            if (index !== -1) {
                this.commands[name].splice(index, 1)
            }
        }
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 14:35:43 
     * @Desc: 添加回退数据 
     */
    addHistory() {
        let data = this.getCopyData()
        this.history.push(simpleDeepClone(data))
        this.activeHistoryIndex = this.history.length - 1
        this.mindMap.emit('data_change', data)
        this.mindMap.emit('back_forward', this.activeHistoryIndex, this.history.length)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-11 22:34:53 
     * @Desc: 回退 
     */
    back(step = 1) {
        if (this.activeHistoryIndex - step >= 0) {
            this.activeHistoryIndex -= step
            this.mindMap.emit('back_forward', this.activeHistoryIndex, this.history.length)
            return simpleDeepClone(this.history[this.activeHistoryIndex]);
        }
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-07-12 10:45:31 
     * @Desc: 前进 
     */
    forward(step = 1) {
        let len = this.history.length
        if (this.activeHistoryIndex + step <= len - 1) {
            this.activeHistoryIndex += step
            this.mindMap.emit('back_forward', this.activeHistoryIndex,)
            return simpleDeepClone(this.history[this.activeHistoryIndex]);
        }
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 15:02:58 
     * @Desc: 获取渲染树数据副本 
     */
    getCopyData() {
        return copyRenderTree({}, this.mindMap.renderer.renderTree)
    }
}

export default Command