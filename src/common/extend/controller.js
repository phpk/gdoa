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
function checkNumber(fieldName) {
    let id = this.post(fieldName) * 1 || this.get(fieldName) * 1;
    if (isNaN(id) || id < 1) {
        return false;
    };
    return id;
}
module.exports = {
    ok,
    err,
    now,
    params,
    checkNumber
}