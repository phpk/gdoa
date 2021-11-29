/* eslint-disable */
import { storeToRefs } from 'pinia'
import { useSlidesStore } from '@/store'
import axios from 'axios'
const TOKEN_NAME = 'rttoken'
const apiUrl = '/server/'
export default () => {
    const { slides } = storeToRefs(useSlidesStore())

    const rttoken:string = localStorage.getItem('rttoken') || ''
    const setTitle = (t: string) => {
        localStorage.setItem('__ppt__title', t)
    }
    const getTitle = () => {
        return localStorage.getItem('__ppt__title') || ''
    }
    const clearTitle = () => {
        localStorage.setItem('__ppt__title', '')
    }
    const getQuery = (val : string) => {
        let query = window.location.search.substring(1);
        let vars = query.split("&");
        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split("=");
            if (pair[0] == val) { return pair[1]; }
        }
        return (false);
    }
    const getJSON = async (id : string) => {
        return await axios.get(apiUrl + 'ppt/editBefore?id=' + id, {headers : {rttoken}})
    }
    const saveJSON = async (title: string) => {
        let id = getQuery('id')
        axios.defaults.withCredentials = true
        if (id) {
            await axios.post(apiUrl + 'ppt/edit', {
                id : id,
                content: JSON.stringify(slides.value),
                title: title
            }, { headers: { rttoken }, withCredentials: true})
        } else {
            await axios.post(apiUrl + 'ppt/add', {
                content: JSON.stringify(slides.value),
                title: title
            }, { headers: { rttoken }, withCredentials: true })
        }
    }
    return {
        saveJSON,
        getQuery,
        getJSON,
        setTitle,
        getTitle,
        clearTitle
    }
}