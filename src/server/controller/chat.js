const jwt = require('jsonwebtoken');
/**
* @controller
* @apiDefine chat 聊天
*/
module.exports = class extends think.Controller {
    constructor(ctx) {
        super(ctx);
    }
    async __before() {
        this.userId = await this.chkToken();
        //console.log(this.userId)
        if (!this.userId) return;
    }
    async chkToken() {
        let headers = this.ctx.req.rawHeaders,
            index = headers.indexOf('rttoken') + 1;
        let token = headers[index];
        //console.log(token)
        let userId = await this.cache('token_' + think.md5(token));
        if (!userId) return false;
        //console.log(userId)
        let salt = await this.cache('admin_' + userId);
        let rt = await jwt.verify(token, salt);
        if (rt.adminId != userId) return false;
        return userId;
    }
    /**
    * @name 打开socket
    */
    async openAction() {
        //console.log(this.get())
        this.emit('opend', 'This client opened successfully!')
    }
    /**
    * @name 关闭socket
    */
    async closeAction() {

    }
};