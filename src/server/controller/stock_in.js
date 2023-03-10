const stockBase = require('./stock_base.js');
const path = require('path');
//const LuckyExcel = require('luckyexcel');
const xlsx = require('node-xlsx').default;
/**
 * @class
 * @apiDefine stock_in 入库单管理
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
		let cates = await this.getCate();

		let area = await this.model('stock_storehouse').select();
		let list = await this.model('stock_in')
			.where(wsql)
			.page(page, limit)
			.order('id desc')
			.select();
		let cateChild = cates.cate.child;
		//console.log(area)
		list.forEach(d => {
			d.cname = cateChild.find(e => e.id == d.cate_id).name;
			d.addrname = area.find(e => e.id == d.area_id).name;
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

	async addBeforeAction() {
		let id = this.get('goods_id');
		let data = await this.model('stock_goods').field('name,cate_id,unit_id').where({
			id
		}).find()
		if (think.isEmpty(data)) return this.fail('数据为空')
		let {
			unit,
			cate
		} = await this.getCate();
		//console.log(unit)
		data.unit_name = unit.child.find(el => el.id == data.unit_id).name;
		data.cate_name = cate.child.find(el => el.id == data.cate_id).name;
		data.goods_name = data.name;
		data.goods_id = id;
		//delete data.id;
		data.storehouse = await this.model('stock_storehouse').select()
		return this.success(data);
	}

	async addAction() {
		let post = this.post();
		if (!post.stock_num || post.stock_num < 1) return this.fail('数量错误');
		post.pan_num = post.stock_num;
		let id = await this.model('stock_in').add(post);
		await this.model('stock_goods').where({
			id: post.goods_id
		}).update({
			stock_num: ['exp', 'stock_num+' + post.stock_num],
			pan_num: ['exp', 'pan_num+' + post.stock_num]
		});
		let {rt, tabName} = this.parseIn(post.cate_id * 1, post, id);
		await this.model(tabName).add(rt);

		return this.success(id);
	}
	parseIn(cid, post, id = '') {
		let rt = {}, tabName = '';
		if (cid === 4 || cid === 5) {
			rt = {
				repair_cate : post.repair_cate,
				repair_space: post.repair_space,
				repair_no: post.repair_no
			}
			tabName = 'stock_repair'
		} else if (cid === 6) {
			rt = {
				left_desc: post.left_desc,
				left_factory: post.left_factory,
				left_user: post.left_user,
				left_price: post.left_price,
				left_belong_pro: post.left_belong_pro,
		
			}
			tabName = 'stock_left'
		} else if (cid === 7) {
			rt = {
				oa_no: post.oa_no,
				oa_buy_time: post.oa_buy_time,
				oa_buyer: post.oa_buyer,
				oa_state_address: post.oa_state_address,
				oa_user: post.oa_user,
				oa_status: post.oa_status,
				oa_factory: post.oa_factory,
				oa_price: post.oa_price,
		
			}
			tabName = 'stock_oa'
		}
		if(id) rt.in_id = id;
		return {rt, tabName};
	}
	async editAction() {
		let post = this.post();
		let has = await this.model('stock_in').where({
			id: post.id
		}).find();
		if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
		await this.model('stock_in').update(post);
		let {rt, tabName} = this.parseIn(has.cate_id, post);
		await this.model(tabName).where({in_id : has.id}).update(rt);
		return this.success()
	}

	async editBeforeAction() {
		let id = this.get('id');
		let data = await this.model('stock_in').where({
			id
		}).find()
		if (think.isEmpty(data)) return this.fail('数据为空')
		let {
			//unit,
			cate
		} = await this.getCate();
		//console.log(unit)
		//data.unit_name = unit.child.find(el => el.id == data.unit_id).name;
		data.cate_name = cate.child.find(el => el.id == data.cate_id).name;
		//data.goods_name = data.name;
		data.storehouse = await this.model('stock_storehouse').select()
		let mdata;
		if(data.cate_id === 4 || data.cate_id === 5) {
			mdata = await this.model('stock_repair').where({in_id : data.id}).find()
		}
		else if(data.cate_id === 6) {
			mdata = await this.model('stock_left').where({in_id : data.id}).find()
		}
		else if(data.cate_id === 7) {
			mdata = await this.model('stock_oa').where({in_id : data.id}).find()
		}
		return this.success({...data,...mdata});
	}

	async delAction() {
		let id = this.post('id');
		let data = await this.model('stock_in').where({id}).find()
		if (think.isEmpty(data))
			return this.fail('数据不存在')
		if(data.stock_num > 0 || data.pan_num > 0) 
			return this.fail('库存数或盘点数大于0')
		//判断出库单
		//判断盘点单
		//判断申请单
		await this.model('stock_in').where({
			id
		}).delete()
		if(data.cate_id === 4 || data.cate_id === 5) {
			await this.model('stock_repair').where({in_id : data.id}).delete()
		}
		else if(data.cate_id === 6) {
			await this.model('stock_left').where({in_id : data.id}).delete()
		}
		else if(data.cate_id === 7) {
			await this.model('stock_oa').where({in_id : data.id}).delete()
		}
		return this.success()
	}
	async importAction() {
		let data = this.post()
		let sysPath = path.join(think.ROOT_PATH, 'www');
		const jsonData = xlsx.parse(sysPath + data.path, { cellDates: true });
		const resData = jsonData[0].data;
		let titleData = resData[0][0].trim();
		let topData = resData[1];
		resData.shift();
		resData.shift();
		//console.log(titleData);
		//console.log(JSON.stringify(resData))
		//console.log(JSON.stringify(topData))
		let cid = this.getTitleKey(titleData)
		//console.log(cid)
		let mapKey = this.getMapKey(cid);
		//console.log(mapKey)
		let fieldKey = []
		topData.forEach(d => {
			fieldKey.push(mapKey[d.trim()])
		})
		console.log(fieldKey)
		
	}
	getTitleKey(title) {
		let m = {
			'维修板件入库单' : 4,
			'维修元器件入库单' : 5,
			'剩余物料入库单' : 6,
			'办公用品入库单' : 7
		}
		return m[title]
	}
	getMapKey(cid) {
		if(cid === 4 || cid === 5) {
			return {
				'入库日期' : 'in_time',
				'名称' : 'goods_name',
				'单位' : 'unit_name',
				'数量' : 'stock_num',
				'备注' : 'remark',
				'类型' : 'repair_cate',
				'型号' : 'model',
				'编号' : 'in_no',
				'送修单号' : 'repair_no',
				'送修单位' : 'repair_space'
			};
		}
		else if(cid === 6) {
			return {
				'入库日期' : 'in_time',
				'名称' : 'goods_name',
				'单位' : 'unit_name',
				'数量' : 'stock_num',
				'备注' : 'remark',
				'类型' : 'repair_cate',
				'型号' : 'model',
				'编号' : 'in_no',
				'详情' : 'left_desc',
				'厂家' : 'left_factory',
				'入库经手人' : 'left_user',
				'单价' : 'left_price',
				'隶属项目' : 'left_belong_pro'
			};
		}
		else if(cid === 7) {
			return {
				'入库日期' : 'in_time',
				'名称' : 'goods_name',
				'单位' : 'unit_name',
				'数量' : 'stock_num',
				'备注' : 'remark',
				'型号' : 'model',
				'编号' : 'in_no',
				'产品系统编号' : 'oa_no',
				'购买时间' : 'oa_buy_time',
				'采购人' : 'oa_buyer',
				'单价' : 'oa_price',
				'存放地址' : 'oa_state_address',
				'使用人' : 'oa_user',
				'设备状态' : 'oa_status',
				'厂家' : 'oa_factory'
			};
		}
	}
}
