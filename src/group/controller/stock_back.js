const Base = require('./base.js');
/**
 * @class
 * @apiDefine stock_back 库存归还单管理
 */
module.exports = class extends Base {

    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = this.turnSearch(param, {});
        let list = await this.model('stock_back').where(wsql).page(page, limit).order('id desc').select();
        let count = await this.model('stock_back').where(wsql).count();
        return this.success({ list, count })
    }

    async addAction() {
        let post = this.post();
        let has = await this.model('stock_apply').where({ id: post.apply_id }).find()
        if (think.isEmpty(has)) {
            return this.fail('申请单不存在')
        }
        if(post.num > has.num - has.back_num) {
            return this.fail('归还数量不能大于申请数量')
        }
        if(![2, 5].includes(has.status*1)) {
            return this.fail('申请单状态不对')
        }
        
        let hasBack = await this.model('stock_back').where({apply_id : post.apply_id, status : 1}).find()
        if(!think.isEmpty(hasBack)) {
            return this.fail('该单号在申请中')
        }

        await this.model('stock_apply').where({ id: post.apply_id }).update({status : 4})

        post.status = 1;
        post.user_id = this.userId
        post.group_id = this.groupId
        
        let id = await this.model('stock_back').add(post);
        return this.success(id);
    }

    async editAction() {
        let id = this.post('id');
        let db = this.model('stock_back');
        let has = await db.where({ id }).find();
        if (think.isEmpty(has)) return this.fail('数据不存在');
        if(has.status != 1) {
            return this.fail('归还单状态不对')
        }
        let now = think.datetime(new Date().getTime(), 'YYYY-MM-DD HH:mm:ss')
        let upData = {
			id,
			status: 2,
			check_id : this.userId,
			check_time : now
		}
        
        let applyData = await this.model('stock_apply').where({id : has.apply_id}).find()
        let upApply = {
            id : has.apply_id,
            back_time : now,
            back_num : has.num + applyData.back_num
        }
        if(upApply.back_num < applyData.num) {
            upApply.status = 5
        }else{
            upApply.status = 3
        }
        if(upApply.back_num > applyData.num) {
            return this.fail('归还数量异常')
        }
        let inData = await this.model('stock_in').where({id : applyData.in_id}).find();
        let inUpData = {
			id: inData.id,
			stock_num: ['exp', `stock_num+${has.num}`],
			is_lock: 0
		}
		let goodsUpData = {
			id: inData.goods_id,
			stock_num: ['exp', `stock_num+${has.num}`]
		}
		let numUpData = {
			id : `${inData.group_id}-${inData.area_id}-${inData.bar_id}-${inData.goods_id}`,
			stock_num: ['exp', `stock_num+${has.num}`]
		}
        try {
			await db.startTrans();
			//申请单
			await db.update(upData);
            //归还单
            await this.model('stock_apply').update(upApply)
			//执行入库动作
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

    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('stock_back').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        return this.success(data);
    }

    async delAction() {
        let id = this.post('id');
        let has = await this.model('stock_back').where({ id }).find()
        if (think.isEmpty(has)) {
            return this.fail('申请单不存在')
        }
        if(has.status != 1) {
            return this.fail('状态不对')
        }
        await this.model('stock_apply').where({ id: has.apply_id }).update({status : 2})

        await this.model('stock_back').where({ id }).delete()
        return this.success()
    }
}