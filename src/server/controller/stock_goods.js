const stockBase = require('./stock_base.js');
/**
 * @class
 * @apiDefine stock_goods 物料管理管理
 */
module.exports = class extends stockBase {

	async listAction() {
		let {
			page,
			limit,
			param
		} = this.get();
		let wsql = {};
		if (param) wsql = this.parseSearch(param, wsql);
		let list = await this.model('stock_goods')
			.where(wsql)
			.alias('a')
			.join({
				table: 'stock_dict',
				join: 'left', //join 方式，有 left, right, inner 3 种方式
				as: 'c', // 表别名
				on: ['cate_id', 'id'] //ON 条件
			})
			.page(page, limit)
			.field('a.*,c.name as cname')
			.page(page, limit)
			.order('id desc')
			.select();
		let count = await this.model('stock_goods')
		.where(wsql)
		.alias('a')
		.join({
			table: 'stock_dict',
			join: 'left', //join 方式，有 left, right, inner 3 种方式
			as: 'c', // 表别名
			on: ['cate_id', 'id'] //ON 条件
		})
		.field('a.*,c.name as cname')
		.count();
		let cates = await this.getCate();
		return this.success({
			list,
			count,
			cates
		})
	}
	async addBeforeAction() {
		let cates = await this.getCate()
		return this.success(cates);
	}
	async addAction() {
		let post = this.post();
		post.user_id = this.adminId;
		let id = await this.model('stock_goods').add(post);
		return this.success(id);
	}
	
	async editAction() {
		let post = this.post();
		let has = await this.model('stock_goods').where({
			id: post.id
		}).find();
		if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
		await this.model('stock_goods').update(post);
		return this.success()
	}

	async editBeforeAction() {
		let id = this.get('id');
		let data = await this.model('stock_goods').where({
			id
		}).find()
		if (think.isEmpty(data)) return this.fail('数据为空')
		let cates = await this.getCate()
		return this.success({data, cates});
	}

	async delAction() {
		let id = this.post('id');
		if (!await this.hasData('stock_goods', {
				id
			}))
			return this.fail('数据不存在')
		await this.model('stock_goods').where({
			id
		}).delete()
		return this.success()
	}
}
