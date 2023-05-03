const Base = require('./base.js');
/**
 * @class
 * @apiDefine stock_apply 库存申请单管理
 */
module.exports = class extends Base {

	async listAction() {
		let {
			page,
			limit,
			param
		} = this.get();
		let wsql = this.turnSearch(param, {});
		let list = await this.model('stock_apply').where(wsql).page(page, limit).order('id desc').select();
		let count = await this.model('stock_apply').where(wsql).count();
		return this.success({
			list,
			count
		})
	}
	
	async checkAction() {
		let {
			username,
			in_id
		} = this.post();
		let user_id = await this.model('user').where({
			username
		}).getField('id', true)
		if (think.isEmpty(user_id)) return this.fail('用户不存在')
		let data = await this.model("stock_in").where({
			id: in_id
		}).find()
		if (think.isEmpty(data)) return this.fail('入库单号不存在')
		if (data.is_lock) return this.fail('入库单被锁定')
		if (data.stock_num < 1) return this.fail('入库单库存为0')
		return this.success({
			id: data.id,
			user_id
		})
	}
	async addBeforeAction() {
		let {
			user_id,
			id
		} = this.get();
		// let user = await this.model('admin').where({
		// 	user_id
		// }).field('user_id,username,name').find();
		let data = await this.model('stock_in').where({
			id
		}).find();
		delete data.id;
		data.in_id = id;
		data.user_id = user_id;
		return this.success(data)

	}
	async addAction() {
		let post = this.post();
		let data = await this.model('stock_in').where({
			id: post.in_id
		}).find();
		if (think.isEmpty(data)) return this.fail('数据不存在')
		if (post.num > data.stock_num) {
			return this.fail('申请数量不能大于库存数量')
		}
		if (data.is_lock > 0) {
			return this.fail('商品被锁定')
		}
		let username = await this.model('user')
			.where({
				id: post.user_id
			}).getField('name', true)
		if (think.isEmpty(username)) {
			return this.fail('用户不存在')
		}
		let hasApply = await this.model('stock_apply')
			.where({
				user_id : post.user_id,
				in_id : data.id,
				status : 1
			}).find()
		if(!think.isEmpty(hasApply)) {
			return this.fail('你已申请过该商品了')
		}
		let saveData = {
			user_id: post.user_id,
			in_id: data.id,
			sign: '',
			num: post.num,
			username: username,
			status: 1,
			remark: post.desc,
			goods_name: data.goods_name,
			model: data.model,
			group_id : this.groupId
		}
		await this.model('stock_apply').add(saveData);
		await await this.model('stock_in').where({
			id: post.in_id
		}).update({
			is_lock: 1
		});
		return this.success();
	}

	async editAction() {
		let id = this.post('id');
		let db = this.model('stock_apply');
		let has = await db.where({
			id
		}).find();
		if (think.isEmpty(has)) return this.fail('数据不存在');
		let upData = {
			id,
			status: 2,
			check_id : this.userId,
			check_time : think.datetime(new Date().getTime(), 'YYYY-MM-DD HH:mm:ss')
		}
		let inData = await this.model('stock_in').where({id : has.in_id}).find();
		if(inData.stock_num < has.num) {
			return this.fail('入库单错误')
		}
		let inUpData = {
			id: inData.id,
			stock_num: ['exp', `stock_num-${has.num}`],
			is_lock: 0
		}
		let goodsUpData = {
			id: inData.goods_id,
			stock_num: ['exp', `stock_num-${has.num}`]
		}
		let numUpData = {
			id : `${inData.group_id}-${inData.area_id}-${inData.bar_id}-${inData.goods_id}`,
			stock_num: ['exp', `stock_num-${has.num}`]
		}
		let outData = {
			in_id: inData.id,
			num: has.num,
			user_id: has.user_id,
			check_id: this.userId,
			goods_id: inData.goods_id,
			goods_name: inData.goods_name,
			group_id: inData.group_id,
			model : inData.model,
			apply_id: has.id,
			type: 1,
			transfer_id: 0,
			cate_id: inData.cate_id,
			area_id: inData.area_id,
			bar_id: inData.bar_id,
			remark : has.remark
		}
		try {
			await db.startTrans();
			//出借单
			await db.update(upData);
			//执行出库动作
			//出库单
			await this.model('stock_out').add(outData)
			//入库单
			await this.model('stock_in').update(inUpData)
			//商品单
			await this.model('stock_goods').update(goodsUpData)
			//货架数
			await this.model('stock_num').update(numUpData)
			await db.commit();
			return this.success();
		} catch (e) {
			await db.rollback();
			console.log(e.message)
			return this.fail(e.message)
		}
		
	}
	/*
	async editBeforeAction() {
		let id = this.get('id');
		let data = await this.model('stock_apply').where({
			id
		}).find()
		if (think.isEmpty(data)) return this.fail('数据为空')
		return this.success(data);
	}*/

	async delAction() {
		let id = this.post('id');
		let has = await this.model('stock_apply').where({
			id
		}).find()
		if (think.isEmpty(has))
			return this.fail('数据不存在')
		if (has.status != 1) {
			return this.fail('只有申请中状态可删除')
		}
		await this.model('stock_in').where({
			id: has.in_id
		}).update({
			is_lock: 0
		})
		await this.model('stock_apply').where({
			id
		}).delete()
		return this.success()
	}
	async userListAction() {
		let {
			page,
			limit,
			param
		} = this.get();
		let wsql = this.turnSearch(param, {user_id : this.userId});
		let list = await this.model('stock_apply').where(wsql).page(page, limit).order('id desc').select();
		let count = await this.model('stock_apply').where(wsql).count();
		return this.success({
			list,
			count
		})
	}
	async userAddBeforeAction() {
		let {
			user_id,
			id
		} = this.get();
		// let user = await this.model('admin').where({
		// 	user_id
		// }).field('user_id,username,name').find();
		let data = await this.model('stock_in').where({
			id
		}).find();
		delete data.id;
		data.in_id = id;
		data.user_id = user_id;
		return this.success(data)

	}
}
