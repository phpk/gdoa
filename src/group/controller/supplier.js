const Base = require('./base.js');
/**
 * @class
 * @apiDefine supplier 供应商管理管理
 */
module.exports = class extends Base {

    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = this.turnSearch(param, {});
        let list = await this.model('supplier').where(wsql).page(page, limit).order('id desc').select();
        let count = await this.model('supplier').where(wsql).count();
        return this.success({ list, count })
    }

    async addAction() {
        let post = this.post();
        post.group_id = this.groupId;
        post.user_id = this.userId;
        let id = await this.model('supplier').add(post);
        return this.success(id);
    }

    async editAction() {
        let post = this.post();
        let has = await this.model('supplier').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        await this.model('supplier').update(post);
        return this.success()
    }

    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('supplier').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        return this.success(data);
    }

    async delAction() {
        let id = this.post('id');
        if (!await this.hasData('supplier', { id }))
            return this.fail('数据不存在')
        await this.model('supplier').where({ id }).delete()
        return this.success()
    }
}