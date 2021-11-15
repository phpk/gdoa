function ok(data, message = "ok") {
    this.header('Content-Type', 'application/json');
    this.ctx.body = {
        code: 0,
        data,
        message
    }
    return false;
}
function err(message = "error", code = 201) {
    this.header('Content-Type', 'application/json');
    this.ctx.body = {
        code,
        message
    }
    return false;
}
/**
 * 获取当前时间撮
 */
function now(t = '') {
    if (t == '') {
        return parseInt((new Date().getTime()) / 1000);
    } else {
        return parseInt((new Date(t).getTime()) / 1000);
    }
}
/**
 * 简单校验数据类型
 * @param {object} dto 
 * @param {object} post 
 * @returns 
 */
function params(dto, post) {
    let save = {},
        msg = '';
    for (let p in dto) {
        let item = dto[p];
        if (item.require) {
            if (!post.hasOwnProperty(p) || !post[p] || post[p].length < 1) {
                msg = item.name + '不能为空'
            }
        }
        if (item.type == 'number') {
            post[p] = post[p] * 1;
        }
        save[p] = post[p];
    }
    return { msg, save }
}
/**
 * 简单过滤id
 * @param {number} fieldName 
 * @returns 
 */
function checkNumber(fieldName) {
    let id = this.post(fieldName) * 1 || this.get(fieldName) * 1;
    if (isNaN(id) || id < 1) {
        return false;
    };
    return id;
}
/**
 * 列表搜索
 * @param {string} param 
 * @param {object} where 
 * @param {boolean} isTime 
 * @returns 
 */
function parseSearch(param, where = {}, isTime = true) {
    param = decodeURI(param);
    let arr = param.split('&');
    arr.forEach(item => {
        let k = item.split('=');
        //console.log(k);
        if (k[0].includes('<') && k[0].includes('>') && k[1]) {
            k[0] = k[0].replace('<', '').replace('>', '');
            k[1] = ['like', '%' + k[1] + '%'];
        }
        if (k[1] && k[1].includes('+-+')) {
            let kk = k[1].split('+-+');
            //console.log(kk);
            if (k[0].includes('time')) {
                if (isTime) {
                    kk[0] = parseInt(new Date(kk[0]).getTime() / 1000 - 8 * 3600);
                    kk[1] = parseInt(new Date(kk[1]).getTime() / 1000 + 86400 - 1 - 8 * 3600);
                }
            }
            k[1] = ['between', [kk[0], kk[1]]];
        }
        if (k[1]) {
            where[k[0]] = k[1];
        }
    })
    return where;
}
module.exports = {
    ok,
    err,
    now,
    params,
    checkNumber,
    parseSearch
}