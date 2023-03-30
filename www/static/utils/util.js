const setToken = (res) => {
    localStorage.setItem(TOKEN_NAME, res);
}

const loginOutToken = () => {
    localStorage.removeItem(TOKEN_NAME);
}
const getToken = () => {
    return localStorage.getItem(TOKEN_NAME);
}
const getHeader = () => {
    let token = getToken(),
        rt = {};
    if (token) {
        rt[TOKEN_NAME] = token;
    }
    return rt;
}
const errorStatus = (xhr, layui) => {
    //console.log(xhr)
    if (xhr.status === 400) {
        layui.layer.msg('未授权访问！', {
            icon: 2, time: 2000
        });
    }
    else if (xhr.status === 401) {
        layui.layer.msg('访问接口未带token！', {
            icon: 2, time: 2000
        });
        top.location.href = notLoginUrl;
    }
    else if (xhr.status === 402) {
        layui.layer.msg('token校验失败！', {
            icon: 2, time: 2000
        });
        top.location.href = notLoginUrl;
    }
    else if (xhr.status === 403) {
        layui.layer.msg('一段时间未操作，超过保活时间！', {
            icon: 2, time: 2000
        });
        top.location.href = notLoginUrl;
    }
    else if (xhr.status === 406) {
        layui.layer.msg('一段时间未操作，超过保活时间！', {
            icon: 2, time: 2000
        });
        top.location.href = notLoginUrl;
    }
    else if (xhr.status === 404) {
        layui.layer.msg('请求的地址不存在！', {
            icon: 2, time: 2000
        });
    }
    else {
        layui.layer.msg('通讯失败！请重试！', {
            icon: 2, time: 2000
        });
    }
}
const parseMsg = (msgs, layui) => {
    if(!msgs) {
        layui.layer.msg('系统错误', {
            icon: 2, time: 2000
        });
        return false;
    }
    if (msgs.constructor === Object) {
        //console.log('111')
        for (let p in msgs) {
            //console.log(msgs[p])
            layui.layer.msg(msgs[p], {
                icon: 2, time: 2000
            });
        }
    } else {
        layui.layer.msg(msgs, {
            icon: 2, time: 2000
        });
    }
}
const _get = (layui, url, suc, err) => {
    //console.log(`${apiUrl}${url}`)
    layui.$.ajax({
        type: "get",
        url: `${apiUrl}${url}`,
        //timeout: 10*60*1000,//10分钟等待
        headers: getHeader(),
        success: (res) => {
            //console.log(res)
            if (res.code === 0) {
                suc(res.data)
            } else {
                // layui.layer.msg(res.message, {
                //     icon: 2, time: 2000
                // });
                parseMsg(res.message, layui);
                err && err(res);
            }
        },
        error: (xhr) => {
            console.log(xhr)
            err && err(xhr);
            errorStatus(xhr, layui)
        },
        complete :(xhr, ts) => {
            //console.log(xhr)
            //console.log(ts)
        } 
    });
}
const _post = (layui, url, data, suc, err) => {
    //console.log(`${apiUrl}${url}`)
    layui.$.ajaxSetup({
        xhrFields: {
            withCredentials: true
        }
    });
    layui.$.ajax({
        type: "post",
        url: `${apiUrl}${url}`,
        headers: getHeader(),
        data,
        success: (res) => {
            //console.log(res)
            if (res.code === 0) {
                suc(res.data)
            } else {
                parseMsg(res.message, layui);
                
                if (res.code >= 400) {
                    errorStatus({ status: res.code }, layui)
                }
                err && err(res);
            }
        },
        error: (xhr) => {
            err && err(xhr);
            errorStatus(xhr, layui)
        }
    });
}
const _req = (param = '') => {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    if (param == '') {
        return theRequest;
    } else {
        if (theRequest[param]) {
            return theRequest[param];
        } else {
            return false;
        }
    }
    
}
const treeIds = (arr) => {
    for (const item of arr) {
        list.push(item.id);
        let subs = item.children;
        if (subs && subs.length > 0) {
            treeIds(subs, list);
        }
    }
    return list.join(',');	//以逗号拼接返回
}
const getTree = (arr) => {
    let list = [];
    let treeIds = function (arr) {
        for (const item of arr) {
            list.push(item.id);
            let subs = item.children;
            if (subs && subs.length > 0) {
                treeIds(subs, list);
            }
        }
        return list.join(',');	//以逗号拼接返回
    }
    return treeIds(arr);
}

