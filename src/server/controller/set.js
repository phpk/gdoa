const Base = require('./base.js');
/**
 * @class
 * @apiDefine set 系统配置
 */
module.exports = class extends Base {
    /**
     * @api {get} set/cate 系统配置类目列表
     * @apiGroup set
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  {number} page 页码
     * @apiParam  {number} limit 每页显示数据
     *
     * @apiSuccess (200) {type} name description
     *
     */
    async cateAction() {
        let { page, limit } = this.get();

        let list = await this.model('set_cate').page(page, limit).select();
        let count = await this.model('set_cate').count();

        return this.success({ list, count })
    }
    async cateAddAction() {

    }
};