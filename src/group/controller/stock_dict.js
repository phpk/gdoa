const stockBase = require('./stock_base.js');
/**
 * @class
 * @apiDefine stock_dict 库存字典管理
 */
module.exports = class extends stockBase {

    async listAction() {
        let { page, limit, param, pid } = this.get();
		if(!pid) pid = 0;
        let wsql = this.turnSearch(param, {pid});
        let list = await this.model('stock_dict').where(wsql).page(page, limit).order('id desc').select();
        let count = await this.model('stock_dict').where(wsql).count();
        return this.success({ list, count })
    }

    async addAction() {
        let post = this.post();
		let has = await this.model('stock_dict').where({pid : post.pid, key : post.key}).find()
		if(!think.isEmpty(has)){
			return this.fail('同类中不能存在相同key')
		}
		post.group_id = this.groupId;
		post.user_id = this.userId;
        let id = await this.model('stock_dict').add(post);
		await this.upDictCache();
        return this.success(id);
    }
	// async upCache(pid) {
	// 	if(pid > 0) {
	// 		let key = await this.model('stock_dict').where({id : pid}).getField('key', true);
	// 		let list = await this.model('stock_dict').where({pid : pid, enable : 1}).select()
	// 		await this.cache(this.groupId + '_stock_dict:' + key, list, {
	// 		    timeout: 24 * 3600 * 1000 * 36500 //100年不过期
	// 		});
	// 	}
	// }
    async editAction() {
        let post = this.post();
        let has = await this.model('stock_dict').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
		if(post.key != has.key) {
			let haskey = await this.model('stock_dict').where({pid : post.pid, key : post.key}).find()
			if(!think.isEmpty(haskey)){
				return this.fail('同类中不能存在相同key')
			}
		}
        await this.model('stock_dict').update(post);
		await this.upDictCache();
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
		await this.upDictCache();
	    return this.success();
	}
    async delAction() {
        let id = this.post('id');
		//if(id < 8) return this.fail('系统分类不许删除')
		let hasData = await this.model('stock_dict').where({id}).find()
        if (think.isEmpty(hasData))
            return this.fail('数据不存在')
		let has = await this.model('stock_dict').where({pid : id}).count()
		if(has > 0){
			return this.fail('存在子分类')
		}
		// let hasGoods = await this.model('stock_goods').where({unit_id : id}).count()
		// if(hasGoods > 0){
		// 	return this.fail('请先删除使用该分类的物料')
		// }
        await this.model('stock_dict').where({ id }).delete()
		await this.upDictCache();
        return this.success('删除成功')
    }
}