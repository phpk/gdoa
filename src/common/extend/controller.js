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
module.exports = {
    ok,
    err,
    now
}