function ok(data, message = "ok") {
    this.header('Content-Type', 'application/json');
    this.ctx.body = {
        code: 200,
        data,
        message
    }
    return;
}
function err(message = "error", code = 401) {
    this.header('Content-Type', 'application/json');
    this.ctx.body = {
        code,
        message
    }
    return;
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
async function adminLog(msg) {
    try {
        let postData = this.post();
        //删除敏感字段
        if (postData.password)
            delete postData.password;
        let saveData = {
            admin_id: this.adminId,
            log: msg,
            data: JSON.stringify(postData),
            ip: this.ctx.ip,
            agent: this.ctx.userAgent,
            url: this.ctx.path,
            method: this.ctx.method,
            addtime: now()
        };
        await think.model('admin_log').add(saveData);
    } catch (error) {
        console.log(error)
    }
    
}
module.exports = {
    ok,
    err,
    now,
    adminLog
}