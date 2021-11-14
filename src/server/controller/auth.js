const Base = require('./base.js');
/**
 * @class
 * @apiDefine auth 角色管理
 */
module.exports = class extends Base {
    /**
     * @api {get} auth/list 角色列表
     * @apiGroup auth
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  null
     *
     * @apiSuccess (200) {type} name description
     *
     */
    async listAction() {
        let page = this.get('page') * 1 || 1,
            limit = this.get('limit') * 1 || 10;
        let list = await this.model('admin_auth')
            .page(page, limit)
            .select();
        let count = await think.model('admin_auth').count();
        return this.ok({ list, count })
    }
    async addAction() {
        let post = this.post();
        if (!post.name) return this.err('名称不能为空');
    }

}