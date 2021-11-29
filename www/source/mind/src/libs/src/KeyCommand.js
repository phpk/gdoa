import { keyMap } from './utils/keyMap';
/** 
 * @Author: 王林 
 * @Date: 2021-04-24 15:20:46 
 * @Desc: 快捷按键、命令处理类 
 */
export default class KeyCommand {
    /** 
     * @Author: 王林 
     * @Date: 2021-04-24 15:21:32 
     * @Desc: 构造函数 
     */
    constructor(opt) {
        this.opt = opt
        this.mindMap = opt.mindMap
        this.shortcutMap = {
            //Enter: [fn]
        }
        this.bindEvent()
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-24 15:23:22 
     * @Desc: 绑定事件 
     */
    bindEvent() {
        window.addEventListener('keydown', (e) => {
            Object.keys(this.shortcutMap).forEach((key) => {
                if (this.checkKey(e, key)) {
                    e.stopPropagation()
                    e.preventDefault()
                    this.shortcutMap[key].forEach((fn) => {
                        fn()
                    })
                }
            })
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-24 19:24:53 
     * @Desc: 检查键值是否符合 
     */
    checkKey(e, key) {
        let o = this.getOriginEventCodeArr(e)
        let k = this.getKeyCodeArr(key)
        if (o.length !== k.length) {
            return false
        }
        for (let i = 0; i < o.length; i++) {
            let index = k.findIndex((item) => {
                return item === o[i];
            })
            if (index === -1) {
                return false
            } else {
                k.splice(index, 1)
            }
        }
        return true
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-24 19:15:19 
     * @Desc: 获取事件对象里的键值数组 
     */
    getOriginEventCodeArr(e) {
        let arr = []
        if (e.ctrlKey || e.metaKey) {
            arr.push(keyMap['Control'])
        }
        if (e.altKey) {
            arr.push(keyMap['Alt'])
        }
        if (e.shiftKey) {
            arr.push(keyMap['Shift'])
        }
        if (!arr.includes(e.keyCode)) {
            arr.push(e.keyCode)
        }
        return arr
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-24 19:40:11 
     * @Desc: 获取快捷键对应的键值数组 
     */
    getKeyCodeArr(key) {
        let keyArr = key.split(/\s*\+\s*/)
        let arr = []
        keyArr.forEach((item) => {
            arr.push(keyMap[item])
        })
        return arr
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-04-24 15:23:00 
     * @Desc: 添加快捷键命令 
     * Enter
     * Tab | Insert
     * Shift + a
     */
    addShortcut(key, fn) {
        key.split(/\s*\|\s*/).forEach((item) => {
            if (this.shortcutMap[item]) {
                this.shortcutMap[item].push(fn)
            } else {
                this.shortcutMap[item] = [fn]
            }
        })
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-07-27 14:06:16 
     * @Desc: 移除快捷键命令 
     */
    removeShortcut(key, fn) {
        key.split(/\s*\|\s*/).forEach((item) => {
            if (this.shortcutMap[item]) {
                if (fn) {
                    let index = this.shortcutMap[item].findIndex((f) => {
                        return f === fn
                    })
                    if (index !== -1) {
                        this.shortcutMap[item].splice(index, 1)
                    }
                } else {
                    this.shortcutMap[item] = []
                    delete this.shortcutMap[item]
                }
            }
        })
    }
}