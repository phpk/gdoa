const Base = require('./base.js');
/**
 * @class
 * @apiDefine auth 角色管理
 */
module.exports = class extends Base {
    /**
     * @api {get} auth/list 角色列表
     * @apiGroup ath
     * @apiVersion  0.1
     * @apiSuccess (200)
     */
    async listAction() {
        let list = await this.model('admin_auth').select()
        return this.ok(list)
    }

}