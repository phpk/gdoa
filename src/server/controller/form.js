const Base = require('./base.js');
/**
 * @class
 * @apiDefine form 表单管理
 */
module.exports = class extends Base {
    /**
     * @api {get} form/list 表单列表
     * @apiGroup form
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  {number} page 页码
     * @apiParam  {number} limit 每页显示数据
     * @apiParam  {string} param 每页显示数据
     *
     * @apiSuccess (200) {type} name description
     *
     */
    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = {};
        if (param) wsql = this.parseSearch(param, wsql);
        let list = await this.model('form').where(wsql).page(page, limit).select()
        let count = await this.model('form').where(wsql).count()
        return this.success(list, count)
    }
    /**
     * @api {post} form/delete 删除表单
     * @apiGroup form
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  {number} id id
     *
     * @apiSuccess (200) {type} name description
     *
     */
    async deleteAction() {
        let id = this.post('id');
        if (!this.hasData('form', { id })) {
            return this.fail('数据不存在')
        }
        let rt = await this.model('form').where({ id }).delete()
        return this.success(rt)
    }
    /**
     * @api {post} form/add 添加表单
     * @apiGroup form
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  {number} id id
     *
     * @apiSuccess (200) {type} name description
     *
     */
    async addAction() {
        let id = await this.model('from').add(this.post())
        return this.success(id)
    }
    /**
     * @api {get} form/edit 编辑表单前
     * @apiGroup form
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  {number} id id
     *
     * @apiSuccess (200) {type} name description
     *
     */
    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('form').where({ id }).find();
        if (!think.isEmpty(data)) {
            return this.fail('数据不存在')
        }
        return this.success(data)
    }
    /**
     * @api {post} form/edit 编辑表单
     * @apiGroup form
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  {number} id id
     *
     * @apiSuccess (200) {type} name description
     *
     */
    async editAction() {
        let data = this.post(),
            id = data.id;
        if (!this.hasData('form', { id })) {
            return this.fail('数据不存在')
        }
        let rt = await this.model('from').where({ id }).update(data)
        return this.success(rt)
    }
};
