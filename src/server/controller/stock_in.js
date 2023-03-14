const stockBase = require('./stock_base.js');
const path = require('path');
//const LuckyExcel = require('luckyexcel');
const xlsx = require('node-xlsx').default;
const stream = require('stream');
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
		let wsql = {
			group_id: this.groupId
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
		list.forEach(d => {
			d.cname = cates.find(e => e.id == d.cate_id).name;
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
		let cates = await this.getCate(data.cate_id);
		//console.log(unit)
		//data.unit_name = unit.child.find(el => el.id == data.unit_id).name;
		data.cate_name = cates.name;
		data.ext = cates.ext;
		data.goods_name = data.name;
		data.goods_id = id;
		//delete data.id;
		data.area = await this.getArea()
		return this.success(data);
	}
	async editBeforeAction() {
		let id = this.get('id');
		let data = await this.model('stock_in').where({
			id
		}).find()
		if (think.isEmpty(data)) return this.fail('数据为空')
		let cates = await this.getCate(data.cate_id);
		//console.log(unit)
		//data.unit_name = unit.child.find(el => el.id == data.unit_id).name;
		data.cate_name = cates.name;
		data.in_time = think.datetime(new Date(data.in_time).getTime(), 'YYYY-MM-DD')
		//data.ext = cates.ext;
		//data.goods_name = data.name;
		let dataArea = await this.getArea(data.area_id);
		data.area_name = dataArea.name;
		if(data.bar_id > 0)
			data.bar_name = dataArea.child.find(d => data.bar_id == d.id).name;
		if(data.ext) {
			let extData = JSON.parse(data.ext);
			for(let p in extData) {
				data["ext." + p] = extData[p];
			}
			data.ext = cates.ext;
		}
		return this.success(data);
	}
	async addAction() {
		let post = this.post();
		if (!post.stock_num || post.stock_num < 1) return this.fail('数量错误');
		//post.pan_num = post.stock_num;
		if (post.area_id < 1) return this.fail('请选择仓库');
		let ext = {};
		for (let p in post) {
			//let val = post[p]
			if (p.includes('ext.')) {
				let n = p.replace('ext.', '');
				ext[n] = post[p];
			}
		}
		post.ext = JSON.stringify(ext);
		post.group_id = this.groupId;
		post.user_id = this.adminId;
		let id = await this.model('stock_in').add(post);
		await this.model('stock_goods').where({
			id: post.goods_id
		}).update({
			stock_num: ['exp', 'stock_num+' + post.stock_num],
			//pan_num: ['exp', 'pan_num+' + post.stock_num]
		});
		//记录地区地址货架数目
		let numSql = {
			group_id: this.groupId,
			area_id: post.area_id,
			bar_id: post.bar_id,
			goods_id: post.goods_id
		}
		let hasNum = await this.model('stock_num')
			.where(numSql).find()
		if (think.isEmpty(hasNum)) {
			numSql.stock_num = post.stock_num;
			await this.model('stock_num').add(numSql)
		}else{
			let stock_num = post.stock_num*1 + hasNum.stock_num*1;
			await this.model('stock_num').where({id : hasNum.id}).update({stock_num});
		}
		return this.success(id);
	}
	
	async editAction() {
		let post = this.post();
		let has = await this.model('stock_in').where({
			id: post.id
		}).find();
		if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
		if (post.area_id < 1) return this.fail('请选择仓库');
		let ext = {};
		for (let p in post) {
			//let val = post[p]
			if (p.includes('ext.')) {
				let n = p.replace('ext.', '');
				ext[n] = post[p];
			}
		}
		post.ext = JSON.stringify(ext);
		await this.model('stock_in').update(post);
		return this.success()
	}



	async delAction() {
		let id = this.post('id');
		let data = await this.model('stock_in').where({
			id
		}).find()
		if (think.isEmpty(data))
			return this.fail('数据不存在')
		// if (data.stock_num > 0 || data.pan_num > 0)
		// 	return this.fail('库存数或盘点数大于0')
		//判断出库单
		//判断盘点单
		//判断申请单
		await this.model('stock_in').where({
			id
		}).delete()
		return this.success()
	}
	async importBeforeAction() {
		let area = await this.getArea()
		let cates = await this.getCate()
		return this.success({area, cates});
	}
	async downXlsxTplAction() {
		let cid = this.get('cid');
		const data = [
		  [1, 2, 3],
		  [true, false, null, 'sheetjs'],
		  ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'],
		  ['baz', null, 'qux'],
		];
		let buffer = xlsx.build([{name: 'mySheetName', data: data}]);
		this.ctx.set({
			'Content-Type' : 'application/octet-stream;charset=utf-8;',
			"Content-Disposition" : `attachment;filename=${encodeURIComponent('结果呢')}.xlsx`
		});
		
		// let readStream = new stream.PassThrough();
		// readStream.end(buffer);
		// readStream.pipe(this.ctx);
		this.ctx.body = buffer;
		return;
		
	}
	async importAction() {
		let data = this.post()
		let sysPath = path.join(think.ROOT_PATH, 'www');
		const jsonData = xlsx.parse(sysPath + data.path, {
			cellDates: true
		});
		let area_id = data.area_id;
		const resData = jsonData[0].data;
		let titleData = resData[0][0].trim();
		let topData = resData[1];
		resData.shift();
		resData.shift();
		let cid = this.getTitleKey(titleData)
		//console.log(cid)
		let mapKey = this.getMapKey(cid);
		//console.log(mapKey)
		let fieldKey = []
		topData.forEach(d => {
			fieldKey.push(mapKey[d.trim()])
		})
		//console.log(fieldKey)
		let saveData = [],
			goodsName = [],
			units = [];
		resData.forEach(d => {
			let s = {}
			d.forEach((e, i) => {
				s[fieldKey[i]] = e
			})
			saveData.push(s)
		})
		if (saveData.length < 1) {
			return this.fail('数据为空')
		}
		let goodsUnits = []
		saveData.forEach(d => {
			if (!goodsName.includes(d.goods_name)) {
				goodsName.push(d.goods_name)
				goodsUnits.push(d.unit_name)
			}
			if (!units.includes(d.unit_name)) {
				units.push(d.unit_name)
			}
		})
		let hasGoods = await this.model('stock_goods').where({
			name: ['in', goodsName]
		}).getField('id, name');
		let hasUnits = await this.model('stock_dict').where({
			pid: 2
		}).getField('id,name');
		//console.log(hasGoods)
		//console.log(hasUnits)
		//return;
		let noGoods = [],
			noGoodsUnits = [],
			noUnits = [],
			unitIds = [],
			unitNames = [],
			newUnitId = [],

			goodsNew = [],
			goodsIds = [],
			goodsNames = [],
			newGoodsIds = [];

		if (hasGoods.name.length > 0) {
			goodsName.forEach((d, i) => {
				if (!hasGoods.name.includes(d)) {
					noGoods.push(d)
					noGoodsUnits.push(goodsUnits[i])
				}
			})
		} else {
			noGoods = goodsName
			noGoodsUnits = goodsUnits
		}
		units.forEach(d => {
			if (!hasUnits.name.includes(d)) {
				noUnits.push(d)
			}
		})
		if (noUnits.length > 0) {
			let addUnits = []
			noUnits.forEach(d => {
				let s = {
					pid: 2,
					name: d,
					key: 'unit',
					enable: 1,
					desc: ''
				}
				addUnits.push(s)
			})
			newUnitId = await this.model('stock_dict').addMany(addUnits)

		}
		unitIds = hasUnits.id.concat(newUnitId)
		unitNames = hasUnits.name.concat(noUnits)

		//console.log(unitIds)
		//console.log(unitNames)
		//console.log(saveData)
		//console.log(noGoodsUnits)
		if (noGoods.length > 0) {
			noGoods.forEach((d, i) => {
				let k = unitNames.indexOf(noGoodsUnits[i])
				let s = {
					name: d,
					stock_num: 0,
					pan_num: 0,
					desc: '',
					status: 0,
					user_id: this.adminId,
					cate_id: cid,
					unit_id: unitIds[k] //先设置为0 最后update更新
				}
				goodsNew.push(s)

			})
			newGoodsIds = await this.model('stock_goods').addMany(goodsNew)
		}
		goodsIds = hasGoods.id.concat(newGoodsIds)
		goodsNames = hasGoods.name.concat(noGoods)
		//console.log(goodsIds)
		//console.log(goodsNames)
		let maxId = await this.model('stock_in').max('id');
		maxId++;
		saveData.forEach(async (d) => {
			d.cate_id = cid;
			d.goods_id = goodsIds[goodsNames.indexOf(d.goods_name)];
			d.unit_id = unitIds[unitNames.indexOf(d.unit_name)]
			d.area_id = area_id;
			d.pan_num = d.stock_num;
			//console.log(d.in_time)
			//console.log(this.now(d.in_time))
			d.in_time = think.datetime(new Date(d.in_time).getTime() + 86400000, 'YYYY-MM-DD')
			let id = await this.model('stock_in').add(d);
			await this.model('stock_goods').where({
				id: d.goods_id
			}).update({
				stock_num: ['exp', 'stock_num+' + d.stock_num],
				pan_num: ['exp', 'pan_num+' + d.stock_num]
			});
			if (cid === 7) {
				d.oa_buy_time = think.datetime(new Date(d.oa_buy_time).getTime() + 86400000,
					'YYYY-MM-DD')
			}
			let {
				rt,
				tabName
			} = this.parseIn(cid, d, id);
			await this.model(tabName).add(rt);
		})
		return this.success()

	}
	getTitleKey(title) {
		let m = {
			'维修板件入库单': 4,
			'维修元器件入库单': 5,
			'剩余物料入库单': 6,
			'办公用品入库单': 7
		}
		return m[title]
	}
	getMapKey(cid) {
		if (cid === 4 || cid === 5) {
			return {
				'入库日期': 'in_time',
				'名称': 'goods_name',
				'单位': 'unit_name',
				'数量': 'stock_num',
				'备注': 'remark',
				'类型': 'repair_cate',
				'型号': 'model',
				'编号': 'in_no',
				'送修单号': 'repair_no',
				'送修单位': 'repair_space'
			};
		} else if (cid === 6) {
			return {
				'入库日期': 'in_time',
				'名称': 'goods_name',
				'单位': 'unit_name',
				'数量': 'stock_num',
				'备注': 'remark',
				'类型': 'repair_cate',
				'型号': 'model',
				'编号': 'in_no',
				'详情': 'left_desc',
				'厂家': 'left_factory',
				'入库经手人': 'left_user',
				'单价': 'left_price',
				'隶属项目': 'left_belong_pro'
			};
		} else if (cid === 7) {
			return {
				'入库日期': 'in_time',
				'名称': 'goods_name',
				'单位': 'unit_name',
				'数量': 'stock_num',
				'备注': 'remark',
				'型号': 'model',
				'编号': 'in_no',
				'产品系统编号': 'oa_no',
				'购买时间': 'oa_buy_time',
				'采购人': 'oa_buyer',
				'单价': 'oa_price',
				'存放地址': 'oa_state_address',
				'使用人': 'oa_user',
				'设备状态': 'oa_status',
				'厂家': 'oa_factory'
			};
		}
	}
}
