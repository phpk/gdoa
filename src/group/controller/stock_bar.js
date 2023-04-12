const stockBase = require('./stock_base.js');
/**
 * @class
 * @apiDefine stock_bar 仓库货架管理管理
 */
module.exports = class extends stockBase {

    async listAction() {
        let { page, limit, param, area_id } = this.get();
        let wsql = this.turnSearch(param, {area_id});
        let list = await this.model('stock_bar').where(wsql).page(page, limit).order('id desc').select();
        let count = await this.model('stock_bar').where(wsql).count();
        return this.success({ list, count })
    }

    async addAction() {
        let post = this.post();
		post.group_id = this.groupId;
		post.user_id = this.userId;
        let id = await this.model('stock_bar').add(post);
		await this.upStorehouseCache();
        return this.success(id);
    }

    async editAction() {
        let post = this.post();
        let has = await this.model('stock_bar').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        await this.model('stock_bar').update(post);
		await this.upStorehouseCache();
        return this.success()
    }

    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('stock_bar').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        return this.success(data);
    }

    async delAction() {
        let id = this.post('id');
        if (!await this.hasData('stock_bar', { id }))
            return this.fail('数据不存在')
        await this.model('stock_bar').where({ id }).delete()
		await this.upStorehouseCache();
        return this.success()
    }
}