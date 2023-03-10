const Base = require('./base.js');
/**
 * @class
 * @apiDefine stock_dict 库存字典管理
 */
module.exports = class extends Base {

    async listAction() {
        let { page, limit, param, pid } = this.get();
		if(!pid) pid = 0;
        let wsql = {pid};
        if (param) wsql = this.parseSearch(param, wsql);
        let list = await this.model('stock_dict').where(wsql).page(page, limit).order('id desc').select();
        let count = await this.model('stock_dict').where(wsql).count();
        return this.success({ list, count })
    }

    async addAction() {
        let post = this.post();
        let id = await this.model('stock_dict').add(post);
        return this.success(id);
    }

    async editAction() {
        let post = this.post();
        let has = await this.model('stock_dict').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        await this.model('stock_dict').update(post);
        return this.success()
    }

    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('stock_dict').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        return this.success(data);
    }
	async enableAction() {
	    let id = this.post('id');
	    let data = await this.model('stock_dict').where({ id }).find()
	    if (think.isEmpty(data)) return this.fail('数据为空')
		let enable = data.enable ? 0 : 1;
		await this.model('stock_dict').where({ id }).update({enable});
	    return this.success();
	}
    async delAction() {
        let id = this.post('id');
		if(id < 8) return this.fail('系统分类不许删除')
        if (!await this.hasData('stock_dict', { id }))
            return this.fail('数据不存在')
		let has = await this.model('stock_dict').where({pid : id}).count()
		if(has > 0){
			return this.fail('存在子分类')
		}
		let hasGoods = await this.model('stock_goods').where({unit_id : id}).count()
		if(hasGoods > 0){
			return this.fail('请先删除使用该分类的物料')
		}
        await this.model('stock_dict').where({ id }).delete()
        return this.success('删除成功')
    }
}