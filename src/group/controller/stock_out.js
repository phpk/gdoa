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
		let wsql = this.turnSearch(param, {});
		let cates = await this.getCate()
		let area = await this.getArea()
		let list = await this.model('stock_out').where(wsql).page(page, limit).order('id desc').select();
		let typeArr = {
			1 : '员工申请',
			2 : '调拨单',
			3 : '企业自用',
			5 : '销售',
			6 : '加工',
			7 : '维修',
			9 : '损耗'
		}
		list.forEach(d => {
			let cateData = cates.find(e => e.id == d.cate_id);
			d.cname = cateData? cateData.name : '';
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
		//let id = await this.model('stock_out').add(post);
		let wsql = {
			group_id: this.groupId,
			user_id: this.userId
		};

		let list = await this.model('stock_out_tmp')
			.where(wsql)
			.select();

		let inIds = []
		let trans_no = think.datetime(new Date().getTime(), 'YYYYMMDDHHmmss')
		
		list.forEach(d => {
			for (let p in post) {
				d[p] = post[p]
			}
			d.no = trans_no
			inIds.push(d.in_id)
		})
		let hasLock = await this.model('stock_in').where({
			id: ["IN", inIds],
			is_lock: 1
		}).count()
		if (hasLock > 0) return this.fail('入库单中存在锁定的行')
		let goodsNum = {}
		let outData = []
		let inData = []
		let nums = []
		list.forEach(d => {
			//出库单
			let s = {
				in_id: d.in_id,
				num: d.trans_num,
				user_id: d.user_id,
				check_id: this.userId,
				goods_id: d.goods_id,
				goods_name: d.goods_name,
				group_id: d.group_id,
				model : d.model,
				apply_id: 0,
				type: post.type,
				transfer_id: 0,
				cate_id: d.cate_id,
				area_id: d.area_id,
				bar_id: d.bar_id,
				remark : post.remark
			}
			outData.push(s)
			//商品数
			if (!goodsNum[d.goods_id]) {
				goodsNum[d.goods_id] = d.trans_num
			} else {
				goodsNum[d.goods_id] += d.trans_num
			}
			//入库单
			let ins = {
				id: d.in_id,
				stock_num: ['exp', `stock_num-${d.trans_num}`],
				is_lock: 0
			}
			inData.push(ins)
			//货架数
			let ni = `${d.group_id}-${d.area_id}-${d.bar_id}-${d.goods_id}`;
			if (!nums[ni]) {
				nums[ni] = d.trans_num;
			} else {
				nums[ni] = nums[ni] + d.trans_num;
			}
		})
		let db = this.model('stock_out');
		try {
			await db.startTrans();
			await db.addMany(outData);
			let goodsUp = []
			for (let p in goodsNum) {
				goodsUp.push({
					id: p,
					stock_num: ['exp', `stock_num-${goodsNum[p]}`]
				})
			}
			await this.model('stock_goods').updateMany(goodsUp)
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

			await this.model('stock_out_tmp').where(wsql).delete()
			await this.cache(this.groupId + '_stock_out_num', null);
			await db.commit();
			return this.success();
		} catch (e) {
			await db.rollback();
			console.log(e.message)
			return this.fail(e.message)
		}

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
	//检索出库缓存
	async listOutAction() {
		let {
			page,
			limit,
			param
		} = this.get();
		let wsql = {
			group_id: this.groupId,
			is_lock: 0
		};
		if (param) wsql = this.turnSearch(param, wsql);
		let cates = await this.getCate();

		let area = await this.getArea();
		let list = await this.model('stock_in')
			.where(wsql)
			.page(page, limit)
			.order('id desc')
			.select();
		//let cateChild = cates.cate.child;
		//console.log(area)
		let tmpIds = await this.model('stock_out_tmp').where({
			group_id: this.groupId,
			user_id: this.userId
		}).getField('in_id')
		let stockTransNum = await this.getOutNum();
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
	//编辑出库数
	async editOutNumAction() {
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
				return this.fail('请输入正确的出库数')
			}
			let stockTransNum = await this.getOutNum();
			stockTransNum[id] = trans_num;
			await this.cache(this.groupId + '_stock_out_num', stockTransNum)
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
			let stockTransNum = await this.getOutNum();
			canIds.forEach(d => {
				stockTransNum[d] = trans_num;
			})
			await this.cache(this.groupId + '_stock_out_num', stockTransNum)

		}

		return this.success()
	}
	async getOutNum() {
		let stockTransNum = await this.cache(this.groupId + '_stock_out_num');
		if (!stockTransNum) stockTransNum = {};
		return stockTransNum;
	}
	//添加缓冲数据
	async addTmpOutAction() {
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
		let stockTransNum = await this.getOutNum();
		let trans_num = stockTransNum[id];


		inData.trans_num = trans_num;
		if (inData.is_lock > 0) {
			return this.fail('该行数据被锁定')
		}
		let hasAreaId = await this.model('stock_out_tmp')
			.where({
				group_id: this.groupId,
				user_id: this.userId
			})
			.getField('area_id', true)


		let has = await this.model('stock_out_tmp').where({
			in_id: id,
			group_id: this.groupId
		}).find()
		//console.log(has)

		if (think.isEmpty(has)) {
			if (hasAreaId && hasAreaId != inData.area_id) {
				return this.fail('请选择同一仓库的物料')
			}

			if (!trans_num || trans_num > inData.stock_num || trans_num < 1) {
				return this.fail('请输入正确的出库数')
			}

			inData.user_id = this.userId;
			await this.model('stock_out_tmp').add(inData);
			//await this.model('stock_in').where({id}).update({is_lock : 1});
		} else {
			//return this.fail('数据已转入')
			await this.model('stock_out_tmp').where({
				tmp_id: has.tmp_id
			}).delete();
			stockTransNum[id] = 0;
			await this.cache(this.groupId + '_stock_out_num', stockTransNum)
			//await this.model('stock_in').where({id}).update({is_lock : 0});
		}
		//todo: 通知用户审核
		return this.success()

	}
	//查看缓冲数据
	async listTmpOutAction() {
		let {
			page,
			limit,
			param
		} = this.get();
		let wsql = {
			group_id: this.groupId,
			user_id: this.userId
		};
		if (param) wsql = this.turnSearch(param, wsql);
		let cates = await this.getCate();

		let area = await this.getArea();
		let list = await this.model('stock_out_tmp')
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
		let count = await this.model('stock_out_tmp').where(wsql).count();

		return this.success({
			list,
			count
		})
	}
	
}
