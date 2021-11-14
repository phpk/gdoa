const apiUrl = '/server/';
const TOKEN_NAME = 'rttoken';
const setToken = (str) => {
    localStorage.setItem(TOKEN_NAME, str);
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
    console.log(xhr)
    if (xhr.status === 400) {
        layui.layer.msg('未授权访问！', {
            icon: 2, time: 2000
        });
    }
    else if (xhr.status === 401) {
        layui.layer.msg('访问接口未带token！', {
            icon: 2, time: 2000
        });
        top.location.href = '/admin/login.html';
    }
    else if (xhr.status === 402) {
        layui.layer.msg('token校验失败！', {
            icon: 2, time: 2000
        });
        top.location.href = '/admin/login.html';
    }
    else if (xhr.status === 403) {
        layui.layer.msg('一段时间未操作，超过保活时间！', {
            icon: 2, time: 2000
        });
        top.location.href = '/admin/login.html';
    }
    else if (xhr.status === 406) {
        layui.layer.msg('一段时间未操作，超过保活时间！', {
            icon: 2, time: 2000
        });
        top.location.href = '/admin/login.html';
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
const _get = (layui, url, suc, err) => {
    //console.log(`${apiUrl}${url}`)
    layui.$.ajax({
        type: "get",
        url: `${apiUrl}${url}`,
        headers: getHeader(),
        success: (res) => {
            //console.log(res)
            if (res.code === 0) {
                suc(res.data)
            } else {
                layui.layer.msg(res.message, {
                    icon: 2, time: 2000
                });
                err && err(res);
            }
        },
        error: (xhr) => {
            err && err(xhr);
            errorStatus(xhr, layui)
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
                layui.layer.msg(res.message, {
                    icon: 2, time: 2000
                });
                err && err(res);
            }
        },
        error: (xhr) => {
            err && err(xhr);
            errorStatus(xhr, layui)
        }
    });
}
const _req = () => {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
