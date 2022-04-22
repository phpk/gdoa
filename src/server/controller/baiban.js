const Base = require('./base.js');
/**
 * @class
 * @apiDefine baiban 白板管理管理
 */
module.exports = class extends Base {

    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = {};
        if (param) wsql = this.parseSearch(param, wsql);
        let list = await this.model('baiban').where(wsql).page(page, limit).order('id desc').select();
        let count = await this.model('baiban').where(wsql).count();
        return this.success({ list, count })
    }

    async addAction() {
        let post = this.post();
        let id = await this.model('baiban').add(post);
        return this.success(id);
    }

    async editAction() {
        let post = this.post();
        let has = await this.model('baiban').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        await this.model('baiban').update(post);
        return this.success()
    }

    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('baiban').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        return this.success(data);
    }

    async delAction() {
        let id = this.post('id');
        if (!await this.hasData('baiban', { id }))
            return this.fail('数据不存在')
        await this.model('baiban').where({ id }).delete()
        return this.success()
    }
}