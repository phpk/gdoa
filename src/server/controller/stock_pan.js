const stockBase = require('./stock_base.js');
/**
 * @class
 * @apiDefine stock_pan 库存盘点单管理
 */
module.exports = class extends stockBase {

	async listAction() {
		let {
			page,
			limit,
			param,
			pan_no
		} = this.get();
		let wsql = {
			group_id: this.groupId
		};
		if (pan_no) wsql.pan_no = pan_no;
		if (param) wsql = this.parseSearch(param, wsql);
		if (wsql && wsql.status == 99) {
			delete wsql.status;
			wsql.pan_num = ['EXP', "!= stock_num"]
		}
		let cates = await this.getCate();

		let area = await this.getArea();
		let list = await this.model('stock_pan')
			.where(wsql)
			.page(page, limit)
			.order('id desc')
			.select();
		//let cateChild = cates.cate.child;
		//console.log(area)
		list.forEach(d => {
			d.cname = cates.find(e => e.id == d.cate_id).name;
			let areaData = area.find(e => e.id == d.area_id);
			d.addrname = areaData ? areaData.name : '';
			let barData = areaData.child.find(e => e.id == d.bar_id)
			d.barname = barData ? barData.name : '';
			//d.trans_num = d.trans_num > 0 ? d.trans_num : d.stock_num;
		})
		//console.log(list)
		let count = await this.model('stock_pan').where(wsql).count();

		return this.success({
			list,
			count,
			cates,
			area
		})
	}

	async addAction() {
		let {
			id,
			remark
		} = this.post();
		let inData = await this.model('stock_in').where({
			id: ["IN", id]
		}).select();
		let pan_no = think.datetime(new Date().getTime(), 'YYYYMMDDHHmmss');
		let saveData = []
		inData.forEach(d => {
			let s = {
				...d
			};
			s.in_id = d.id;
			delete s.id;
			delete s.add_time;
			delete s.up_time;
			s.user_id = this.adminId
			s.pan_num = 0
			s.pan_no = pan_no
			s.remark = remark
			saveData.push(s)
		})
		//console.log(saveData)
		await this.model('stock_pan').addMany(saveData)
		await this.model('stock_in').where({
			id: ["IN", id]
		}).update({
			is_lock: 1
		})
		//console.log(post)
		//let id = await this.model('stock_pan').add(post);
		return this.success(id);
	}

	async editAction() {
		let {
			pan_no,
			remark
		} = this.post();
		let list = await this.model('stock_pan').where({
			pan_no
		}).select();
		if(think.isEmpty(list)) return this.fail('数据为空')

		let has = list.find(d => {
			return d.status != 2
		})
		if (!think.isEmpty(has)) return this.fail('有未完成盘点的数据');
		await this.model('stock_pan').where({
			pan_no
		}).update({
			status: 3,
			end_remark: remark
		});

		let inIds = list.map(d => {
			return d.in_id
		})
		await this.model('stock_in').where({
			id: ["IN", inIds]
		}).update({
			is_lock: 0
		});
		return this.success()
	}

	async editBeforeAction() {
		let pan_no = this.get('pan_no');
		let data = await this.model('stock_pan').where({
			pan_no
		}).find()
		if (think.isEmpty(data)) return this.fail('数据为空')
		return this.success(data);
	}
	async editPanNumAction() {
		let {
			id,
			pan_num
		} = this.post()
		if (id.includes(',')) {
			let idArr = id.split(',')
			let list = await this.model('stock_pan').where({
				id: ["IN", idArr],
				status: ["<", 3],
				stock_num: [">=", pan_num]
			}).getField('id');
			if (list.length > 0) {
				await this.model('stock_pan').where({
					id: ["IN", list]
				}).update({
					pan_num,
					status: 2
				})
			}

		} else {
			let has = await this.model('stock_pan').where({
				id
			}).find();
			if (has.status > 2) {
				return this.fail('该行数据已完结')
			}
			if (pan_num > has.stock_num || pan_num < 0 || isNaN(pan_num)) {
				return this.fail('请输入正确的数')
			}
			await this.model('stock_pan').where({
				id
			}).update({
				pan_num,
				status: 2
			})
		}

		return this.success()
	}
	async delAction() {
		let id = this.post('id');
		let has = await this.model('stock_pan').where({
			id
		}).find()
		if (think.isEmpty(has))
			return this.fail('数据不存在')
		if (has.status != 1) {
			return this.fail('只有盘点中状态可删除')
		}
		await this.model('stock_in').where({
			id: has.in_id
		}).update({
			is_lock: 0
		})
		await this.model('stock_pan').where({
			id
		}).delete()
		return this.success()
	}
}
