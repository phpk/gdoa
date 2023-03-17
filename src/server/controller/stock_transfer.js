const stockBase = require('./stock_base.js');
/**
 * @class
 * @apiDefine stock_transfer 库存调拨单管理
 */
module.exports = class extends stockBase {

	async listAction() {
		let {
			page,
			limit,
			param,
			trans_no
		} = this.get();
		let wsql = {};
		if (trans_no) wsql.trans_no = trans_no;
		if (param) wsql = this.parseSearch(param, wsql);
		let cates = await this.getCate()
		let area = await this.getArea()
		let list = await this.model('stock_transfer').where(wsql).page(page, limit).order('id desc').select();
		list.forEach(d => {
			d.cname = cates.find(e => e.id == d.cate_id).name;
			let fromArea = area.find(e => e.id == d.from_area_id);
			d.from_areaname = fromArea? fromArea.name : '';
			let toArea = area.find(e => e.id == d.to_area_id)
			d.to_areaname = toArea? toArea.name : '';
		})
		let count = await this.model('stock_transfer').where(wsql).count();
		return this.success({
			list,
			count,
			cates,
			area
		})
	}
	//检索调拨库
	async listTransAction() {
		let {
			page,
			limit,
			param
		} = this.get();
		let wsql = {
			group_id: this.groupId,
			is_lock: 0
		};
		if (param) wsql = this.parseSearch(param, wsql);
		let cates = await this.getCate();

		let area = await this.getArea();
		let list = await this.model('stock_in')
			.where(wsql)
			.page(page, limit)
			.order('id desc')
			.select();
		//let cateChild = cates.cate.child;
		//console.log(area)
		let tmpIds = await this.model('stock_trans_tmp').where({
			group_id: this.groupId,
			user_id: this.adminId
		}).getField('in_id')
		let stockTransNum = await this.getTransNum();
		list.forEach(d => {
			d.cname = cates.find(e => e.id == d.cate_id).name;
			let areaData = area.find(e => e.id == d.area_id);
			d.addrname = areaData ? areaData.name : '';
			let barData = areaData.child.find(e => e.id == d.bar_id)
			d.barname = barData ? barData.name : '';
			d.trans_num = stockTransNum[d.id] ? stockTransNum[d.id] : 0;
			d.enable = tmpIds.includes(d.id) ? 1 : 0
		})
		//console.log(list)
		let count = await this.model('stock_in').where(wsql).count();

		return this.success({
			list,
			count,
			cates,
			area
		})
	}
	//编辑调拨数
	async editTransNumAction() {
		let {
			id,
			ids,
			trans_num
		} = this.post();
		if (id) {
			let has = await this.model('stock_in').where({
				id
			}).find();
			if (has.is_lock > 0) {
				return this.fail('该行数据被锁定')
			}
			if (trans_num > has.stock_num || trans_num < 1 || isNaN(trans_num)) {
				return this.fail('请输入正确的调拨数')
			}
			// await this.model('stock_in').where({
			// 	id
			// }).update({
			// 	trans_num
			// })
			let stockTransNum = await this.getTransNum();
			stockTransNum[id] = trans_num;
			await this.cache(this.adminId + '_stock_transfer_num', stockTransNum)
		}
		if (ids) {
			//console.log(ids)
			let idArr = ids.split(',')
			let list = await this.model('stock_in').where({
				id: ["IN", idArr],
				is_lock: 0
			}).select();
			let canIds = [];
			list.forEach(d => {
				if (trans_num <= d.stock_num) {
					canIds.push(d.id)
				}
			})
			let cacheList = await this.model('stock_trans_tmp')
				.where({
					user_id: this.adminId,
					in_id: ["IN", canIds]
				})
				.getField('in_id') || [];
			let stockTransNum = await this.getTransNum();
			canIds.forEach(d => {
				if (!cacheList.includes(d)) {
					stockTransNum[d] = trans_num;
				}
			})
			await this.cache(this.adminId + '_stock_transfer_num', stockTransNum)

		}

		return this.success()
	}
	async getTransNum() {
		let stockTransNum = await this.cache(this.adminId + '_stock_transfer_num');
		if (!stockTransNum) stockTransNum = {};
		return stockTransNum;
	}
	//添加缓冲数据
	async addTmpTransAction() {
		let id = this.post('id') * 1;
		//console.log(id)
		let inData = await this.model('stock_in')
			.where({
				id
			})
			.field(
				'goods_id, goods_name, id as in_id,in_no, model, area_id, cate_id, bar_id, group_id, is_lock'
			)
			.find();
		let stockTransNum = await this.getTransNum();
		let trans_num = stockTransNum[id];


		inData.trans_num = trans_num;
		if (inData.is_lock > 0) {
			return this.fail('该行数据被锁定')
		}
		let hasAreaId = await this.model('stock_trans_tmp')
			.where({
				group_id: this.groupId,
				user_id: this.adminId
			})
			.getField('area_id', true)


		let has = await this.model('stock_trans_tmp').where({
			in_id: id,
			user_id: this.adminId
		}).find()

		if (think.isEmpty(has)) {
			if (hasAreaId && hasAreaId != inData.area_id) {
				return this.fail('请选择同一仓库的物料')
			}

			if (!trans_num || trans_num > inData.stock_num || trans_num < 1) {
				return this.fail('请输入正确的调拨数')
			}

			inData.user_id = this.adminId;
			await this.model('stock_trans_tmp').add(inData);
			//await this.model('stock_in').where({id}).update({is_lock : 1});
		} else {
			//return this.fail('数据已转入')
			await this.model('stock_trans_tmp').where({
				id: has.id
			}).delete()
			//await this.model('stock_in').where({id}).update({is_lock : 0});
		}
		//todo: 通知用户审核
		return this.success()

	}
	//查看缓冲数据
	async listTmpTransAction() {
		let {
			page,
			limit,
			param
		} = this.get();
		let wsql = {
			group_id: this.groupId,
			user_id: this.adminId
		};
		if (param) wsql = this.parseSearch(param, wsql);
		let cates = await this.getCate();

		let area = await this.getArea();
		let list = await this.model('stock_trans_tmp')
			.where(wsql)
			.page(page, limit)
			.order('tmp_id desc')
			.select();
		//let cateChild = cates.cate.child;
		//console.log(area)
		list.forEach(d => {
			d.cname = cates.find(e => e.id == d.cate_id).name;
			let areaData = area.find(e => e.id == d.area_id);
			d.addrname = areaData ? areaData.name : '';
			let barData = areaData.child.find(e => e.id == d.bar_id)
			d.barname = barData ? barData.name : '';
		})
		//console.log(list)
		let count = await this.model('stock_trans_tmp').where(wsql).count();

		return this.success({
			list,
			count
		})
	}
	async searchTransNoAction() {
		let trans_no = this.post('trans_no')
		let has = await this.model('stock_transfer').where({
			trans_no
		}).find()
		if (think.isEmpty(has)) {
			return this.fail('调拨单号不存在')
		}
		return this.success({
			status: has.status,
			to_area_id: has.to_area_id
		})
	}
	//审核调拨单
	async checkTransAction() {
		let {
			ck_remark,
			trans_no
		} = this.post();
		let isok = true;
		let db = this.model('stock_transfer');
		let list = await db.where({
			trans_no
		}).select()
		if (list.length < 1) return this.fail('数据不存在')
		list.forEach(d => {
			if (d.status != 1) isok = false;
		})
		if (isok === false) return this.fail('数据存在错误')

		let outData = []
		let goodsNum = {}
		let inData = []
		let nums = {}
		let transUp = []
		let ck_time = think.datetime(new Date().getTime(), 'YYYY-MM-DD HH:mm:ss')
		list.forEach(d => {
			//出库单
			let s = {
				in_id: d.in_id,
				num: d.trans_num,
				user_id: d.user_id,
				check_id: this.adminId,
				goods_id: d.goods_id,
				goods_name: d.goods_name,
				group_id: d.group_id,
				model : d.model,
				apply_id: 0,
				type: 2,
				transfer_id: d.id,
				cate_id: d.cate_id,
				area_id: d.from_area_id,
				bar_id: d.bar_id,
				remark : d.from_remark
			}
			outData.push(s)
			//商品数
			// if (!goodsNum[d.goods_id]) {
			// 	goodsNum[d.goods_id] = d.trans_num
			// } else {
			// 	goodsNum[d.goods_id] += d.trans_num
			// }
			//入库单
			let ins = {
				id: d.in_id,
				stock_num: ['exp', `stock_num-${d.trans_num}`],
				is_lock: 0
			}
			inData.push(ins)
			//货架数
			let ni = `${d.group_id}-${d.from_area_id}-${d.bar_id}-${d.goods_id}`;
			if (!nums[ni]) {
				nums[ni] = d.trans_num;
			} else {
				nums[ni] = nums[ni] + d.trans_num;
			}
			//调拨单
			let t = {
				id: d.id,
				ck_time,
				status: 2,
				ck_remark,
				ck_user_id: this.adminId
			}
			transUp.push(t)
		})
		try {
			await db.startTrans();
			//添加出库单
			await this.model('stock_out').addMany(outData)
			//更改商品数 调拨商品数无需更改 
			//todo:跨租户则更改
			// let goodsUp = []
			// for (let p in goodsNum) {
			// 	goodsUp.push({
			// 		id: p,
			// 		stock_num: ['exp', `stock_num-${goodsNum[p]}`]
			// 	})
			// }
			// await this.model('stock_goods').updateMany(goodsUp)
			//更改入库单
			await this.model('stock_in').updateMany(inData)
			//更改货架数 货架数据肯定存在
			let numsUp = []
			for (let p in nums) {
				numsUp.push({
					id: p,
					stock_num: ['exp', `stock_num-${nums[p]}`]
				})
			}
			//console.log(numsUp)
			await this.model('stock_num').updateMany(numsUp)
			//更新调拨单
			//console.log(transUp)
			await this.model('stock_transfer').updateMany(transUp)
			//todo: 通知用户接收
			await db.commit();
			return this.success();
		} catch (e) {
			await db.rollback();
			console.log(e.message)
			return this.fail(e.message)
		}

	}
	//接收调拨单
	async inTransAction() {
		let {
			to_remark,
			trans_no,
			to_bar_id
		} = this.post();
		let isok = true;
		let db = this.model('stock_transfer');
		let list = await db.where({
			trans_no
		}).select()
		if (list.length < 1) return this.fail('数据不存在')
		list.forEach(d => {
			if (d.status != 2) isok = false;
		})
		if (isok === false) return this.fail('数据存在错误')


		let inIds = []
		let inkey = {}
		let nums = {}
		let transUp = []
		let in_time = think.datetime(new Date().getTime(), 'YYYY-MM-DD HH:mm:ss')
		list.forEach(d => {
			inIds.push(d.in_id)
			inkey[d.in_id] = d
			//货架数
			let ni = `${d.group_id}-${d.to_area_id}-${to_bar_id}-${d.goods_id}`;
			if (!nums[ni]) {
				nums[ni] = d.trans_num;
			} else {
				nums[ni] = nums[ni] + d.trans_num;
			}
			//调拨单
			let t = {
				id: d.id,
				in_time,
				to_bar_id,
				status: 3,
				to_remark,
				to_user_id: this.adminId
			}
			transUp.push(t)
		})
		let inData = await this.model('stock_in').where({id : ["IN", inIds]}).select();
		let saveData = []
		inData.forEach(d => {
			let s = {
				goods_id : d.goods_id,
				goods_name : d.goods_name,
				in_no : d.in_no,
				stock_num : inkey[d.id].trans_num,
				model : d.model,
				add_time : in_time,
				up_time : in_time,
				in_time : in_time,
				user_id : this.adminId,
				remark : to_remark,
				area_id : inkey[d.id].to_area_id,
				cate_id : d.cate_id,
				is_lock : 0,
				bar_id : to_bar_id,
				ext : d.ext,
				group_id : d.group_id
			}
			saveData.push(s)
		})
		try {
			await db.startTrans();
			//添加入库单
			await this.model('stock_in').addMany(saveData);
			
			//添加货架数
			await this.model('stock').addStockNum(nums);
			//更新调拨单
			//console.log(transUp)
			await this.model('stock_transfer').updateMany(transUp)
			//todo: 通知用户接收
			await db.commit();
			return this.success();
		} catch (e) {
			await db.rollback();
			console.log(e.message)
			return this.fail(e.message)
		}
	}
	async addAction() {
		let post = this.post();
		//console.log(post)
		let wsql = {
			group_id: this.groupId,
			user_id: this.adminId
		};

		let list = await this.model('stock_trans_tmp')
			.where(wsql)
			.select();

		let inIds = []
		let trans_no = think.datetime(new Date().getTime(), 'YYYYMMDDHHmmss')
		list.forEach(d => {
			for (let p in post) {
				d[p] = post[p]
			}
			d.trans_no = trans_no
			inIds.push(d.in_id)

		})
		let hasLock = await this.model('stock_in').where({
			id: ["IN", inIds],
			is_lock: 1
		}).count()
		if (hasLock > 0) return this.fail('物料中存在锁定的行')
		let id = await this.model('stock_transfer').addMany(list);
		await this.model('stock_trans_tmp').where(wsql).delete()
		await this.cache(this.adminId + '_stock_transfer_num', {});
		await this.model("stock_in").where({
			id: ["IN", inIds]
		}).update({
			is_lock: 1
		})
		return this.success(id);
	}
	/*
	async editAction() {
		let post = this.post();
		let has = await this.model('stock_transfer').where({
			id: post.id
		}).find();
		if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
		await this.model('stock_transfer').update(post);
		return this.success()
	}

	async editBeforeAction() {
		let id = this.get('id');
		let data = await this.model('stock_transfer').where({
			id
		}).find()
		if (think.isEmpty(data)) return this.fail('数据为空')
		return this.success(data);
	}*/

	async delAction() {
		let id = this.post('id');
		let has = await this.model('stock_transfer').where({
			id
		}).find()
		if (think.isEmpty(has))
			return this.fail('数据不存在')
		if (has.status != 1) {
			return this.fail('只有待审核状态可删除')
		}
		await this.model('stock_in').where({
			id: has.in_id
		}).update({
			is_lock: 0
		})
		await this.model('stock_transfer').where({
			id
		}).delete()
		return this.success()
	}
}
