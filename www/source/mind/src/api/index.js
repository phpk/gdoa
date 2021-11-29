import exampleData from "./exampleData"
import { simpleDeepClone } from '../libs/src/utils/index'
import axios from 'axios'
const SIMPLE_MIND_MAP_DATA = 'SIMPLE_MIND_MAP_DATA'
const rttoken = localStorage.getItem('rttoken') || ''
const getQuery = (val) => {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] == val) { return pair[1]; }
    }
    return (false);
}
/** 
 * 克隆思维导图数据，去除激活状态 
 */
const copyMindMapTreeData = (tree, root) => {
    tree.data = simpleDeepClone(root.data)
    // tree.data.isActive = false
    tree.children = []
    if (root.children && root.children.length > 0) {
        root.children.forEach((item, index) => {
            tree.children[index] = copyMindMapTreeData({}, item)
        })
    }
    return tree;
}

/** 
 * 获取缓存的思维导图数据 
 */
export const getData = async () => {
    let id = getQuery('id')
    if(!id) {
        return simpleDeepClone(exampleData)
    }else{

    }
    // let store = localStorage.getItem(SIMPLE_MIND_MAP_DATA)
    // if (store === null) {
    //     return simpleDeepClone(exampleData)
    // } else {
    //     try {
    //         return JSON.parse(store)
    //     } catch (error) {
    //         return simpleDeepClone(exampleData)
    //     }
    // }
}

/** 
 * 存储思维导图数据 
 */
export const storeData = async (data) => {
    try {
        let originData = await getData()
        originData.root = copyMindMapTreeData({}, data)
        let dataStr = JSON.stringify(originData)
        localStorage.setItem(SIMPLE_MIND_MAP_DATA, dataStr)
    } catch (error) {
        console.log(error)
    }
}

/** 
 * 存储思维导图配置数据 
 */
export const storeConfig = async (config) => {
    try {
        let originData = await getData()
        originData = {
            ...originData,
            ...config
        }
        let dataStr = JSON.stringify(originData)
        localStorage.setItem(SIMPLE_MIND_MAP_DATA, dataStr)
    } catch (error) {
        console.log(error)
    }
}