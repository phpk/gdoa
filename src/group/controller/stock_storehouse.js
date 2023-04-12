const stockBase = require('./stock_base.js');
/**
 * @class
 * @apiDefine stock_storehouse 仓库管理管理
 */
module.exports = class extends stockBase {

    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = this.turnSearch(param, {});
        let list = await this.model('stock_storehouse').where(wsql).page(page, limit).order('id desc').select();
        let count = await this.model('stock_storehouse').where(wsql).count();
        return this.success({ list, count })
    }

    async addAction() {
        let post = this.post();
		post.group_id = this.groupId;
		post.user_id = this.userId;
        let id = await this.model('stock_storehouse').add(post);
		await this.upStorehouseCache();
        return this.success(id);
    }

    async editAction() {
        let post = this.post();
        let has = await this.model('stock_storehouse').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        await this.model('stock_storehouse').update(post);
		await this.upStorehouseCache();
        return this.success()
    }

    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('stock_storehouse').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        return this.success(data);
    }

    async delAction() {
        let id = this.post('id');
        if (!await this.hasData('stock_storehouse', { id }))
            return this.fail('数据不存在')
		let hasBar = await this.model('stock_bar').where({area_id : id}).find()
		if(!think.isEmpty(hasBar))
			return this.fail('仓库下存在货架数据')
        await this.model('stock_storehouse').where({ id }).delete()
		await this.upStorehouseCache();
        return this.success()
    }
}