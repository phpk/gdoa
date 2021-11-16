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
    /**
     * @api {get} set/cateAdd 添加系统配置类目
     * @apiGroup set
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  {string} key 类目键值
     * @apiParam  {string} name 类目名
     *
     * @apiSuccess (200) {type} name description
     *
     */
    async cateAddAction() {
        let post = this.post();
        if (await this.hasData('set_cate', { key: post.key }))
            return this.fail('系统中存在相同的键值')
        let id = await this.model('set_cate').add(post);
        return this.success(id);
    }
};