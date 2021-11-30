import exampleData from "./exampleData"
import { simpleDeepClone } from '../libs/src/utils/index'
import axios from 'axios'
const SIMPLE_MIND_MAP_DATA = 'SIMPLE_MIND_MAP_DATA'
const rttoken = localStorage.getItem('rttoken') || ''
const apiUrl = '/server/'
const getQuery = (val) => {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] == val) { return pair[1]; }
    }
    return (false);
}
let id = getQuery('id')
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
    
    if(!id) {
        return simpleDeepClone(exampleData)
    }else{
        let data = await axios.get(apiUrl + 'mind/editBefore?id=' + id, { headers: { rttoken } })
        if (data && data.status == 200) {
            let store = data.data.data.content;
            return JSON.parse(store)
        }
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
const saveData = async (originData) => {
    if (!id) {
        let res = await axios.post(apiUrl + 'mind/add', {
            content: JSON.stringify(originData),
            title: originData.root.data.text
        }, { headers: { rttoken }, withCredentials: true })
        //console.log(res)
        id = res.data.data;
    } else {
        await axios.post(apiUrl + 'mind/edit', {
            id: id,
            content: JSON.stringify(originData),
            title: originData.root.data.text
        }, { headers: { rttoken }, withCredentials: true })
    }
}
/** 
 * 存储思维导图数据 
 */
export const storeData = async (data) => {
    try {
        let originData = await getData()
        originData.root = copyMindMapTreeData({}, data)
        await saveData(originData)
        //let dataStr = JSON.stringify(originData)
        
        /*
        let originData = await getData()
        originData.root = copyMindMapTreeData({}, data)
        let dataStr = JSON.stringify(originData)
        localStorage.setItem(SIMPLE_MIND_MAP_DATA, dataStr)*/
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
        //let dataStr = JSON.stringify(originData)
        await saveData(originData);
        //localStorage.setItem(SIMPLE_MIND_MAP_DATA, dataStr)
    } catch (error) {
        console.log(error)
    }
}