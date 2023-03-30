const stockBase = require('./stock_base.js');
/**
 * @class
 * @apiDefine stock_out 库存出库单管理
 */
module.exports = class extends stockBase {

	async listAction() {
		let {
			page,
			limit,
			param
		} = this.get();
		let wsql = {};
		if (param) wsql = this.turnSearch(param, wsql);
		let cates = await this.getCate()
		let area = await this.getArea()
		let list = await this.model('stock_out').where(wsql).page(page, limit).order('id desc').select();
		let typeArr = {
			1 : '员工申请',
			2 : '调拨单',
			3 : '企业自用',
			5 : '销售',
			9 : '损耗'
		}
		list.forEach(d => {
			d.cname = cates.find(e => e.id == d.cate_id).name;
			let areaData = area.find(e => e.id == d.area_id);
			d.addrname = areaData ? areaData.name : '';
			let barData = areaData ? areaData.child.find(e => e.id == d.bar_id) : []
			d.barname = barData ? barData.name : '';
			d.typename = typeArr[d.type]
		})
		let count = await this.model('stock_out').where(wsql).count();
		return this.success({
			list,
			count,
			cates,
			area
		})
	}

	async addAction() {
		let post = this.post();
		let id = await this.model('stock_out').add(post);
		return this.success(id);
	}

	async editAction() {
		let post = this.post();
		let has = await this.model('stock_out').where({
			id: post.id
		}).find();
		if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
		await this.model('stock_out').update(post);
		return this.success()
	}

	async editBeforeAction() {
		let id = this.get('id');
		let data = await this.model('stock_out').where({
			id
		}).find()
		if (think.isEmpty(data)) return this.fail('数据为空')
		return this.success(data);
	}

	async delAction() {
		let id = this.post('id');
		if (!await this.hasData('stock_out', {
				id
			}))
			return this.fail('数据不存在')
		await this.model('stock_out').where({
			id
		}).delete()
		return this.success()
	}
}
