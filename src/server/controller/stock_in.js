const stockBase = require('./stock_base.js');
const path = require('path');
//const LuckyExcel = require('luckyexcel');
const xlsx = require('node-xlsx').default;
const fs = require('fs');
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
			let areaData = area.find(e => e.id == d.area_id);
			d.addrname = areaData ? areaData.name : '';
			let barData = areaData.child.find(e => e.id == d.bar_id)
			d.barname = barData ? barData.name : '';
			//d.trans_num = d.trans_num > 0 ? d.trans_num : d.stock_num;
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
		if (data.bar_id > 0)
			data.bar_name = dataArea.child.find(d => data.bar_id == d.id).name;
		if (data.ext) {
			let extData = JSON.parse(data.ext);
			for (let p in extData) {
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

		let index = `${this.groupId}-${post.area_id}-${post.bar_id}-${post.goods_id}`;
		let hasNum = await this.model('stock_num')
			.where({
				index
			}).find()
		if (think.isEmpty(hasNum)) {
			let save = {
				group_id: this.groupId,
				area_id: post.area_id,
				bar_id: post.bar_id,
				goods_id: post.goods_id,
				stock_num: post.stock_num,
				index
			}
			await this.model('stock_num').add(save)
		} else {
			let stock_num = post.stock_num * 1 + hasNum.stock_num * 1;
			await this.model('stock_num').where({
				id: hasNum.id
			}).update({
				stock_num
			});
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
		return this.success({
			area,
			cates
		});
	}
	async downXlsxTplAction() {
		let cid = this.get('cid');
		let cates = await this.getCate(cid);
		let filename = cates.name + '.xlsx';
		let headers = ['入库日期', '名称', '编码', '型号', '数量'];
		cates.ext.forEach(d => {
			headers.push(d.cname);
		});
		headers.push('备注')
		const data = [
			[cates.name],
			headers
		];
		const range = {
			s: {
				c: 0,
				r: 0
			},
			e: {
				c: headers.length - 1,
				r: 0
			}
		}; // A1:A4
		const sheetOptions = {
			'!merges': [range]
		};
		let buffer = xlsx.build([{
			name: cates.name,
			data: data
		}], {
			sheetOptions
		});
		let sysPath = path.join(think.ROOT_PATH, 'www/upload/xlsx/');
		let filePath = sysPath + filename;
		fs.writeFileSync(filePath, buffer, {
			'flag': 'w'
		});
		let url = '/upload/xlsx/' + filename;
		return this.success({
			url,
			filename
		})

	}
	async importAction() {
		let data = this.post()
		let area_id = data.area_id * 1;
		if (area_id < 1) return this.fail('请选择仓库');
		let bar_id = data.bar_id * 1;
		let sysPath = path.join(think.ROOT_PATH, 'www');
		const jsonData = xlsx.parse(sysPath + data.path, {
			cellDates: true
		});

		const resData = jsonData[0].data;
		let titleData = resData[0][0].trim();
		let topData = resData[1];
		resData.shift();
		resData.shift();
		let cateData = await this.getCate();
		let cates = cateData.find(d => d.name == titleData)
		if (think.isEmpty(cates)) {
			return this.fail('模版表头文件缺失')
		}
		let cate_id = cates.id;
		if (resData.length < 1) {
			return this.fail('上传数据为空')
		}
		//['入库日期', '名称', '编码', '型号', '数量']
		let mapsTitle = {
			'入库日期': 'in_time',
			'名称': 'goods_name',
			'编码': 'in_no',
			'型号': 'model',
			'数量': 'stock_num',
			'备注': 'remark'
		};
		let extTitle = [],
			timeTitle = []
		cates.ext.forEach(d => {
			extTitle.push(d.ckey)
			if (d.ctype == 'timeinput') {
				timeTitle.push(d.ckey)
			}
			mapsTitle[d.cname] = d.ckey
		})
		let fieldKey = []
		topData.forEach(d => {
			fieldKey.push(mapsTitle[d.trim()])
		})
		//console.log(fieldKey)
		//格式化数据
		let saveData = [];
		const formatTime = (t) => {
			return think.datetime(new Date(t).getTime() + 86400000, 'YYYY-MM-DD')
		}
		let goodsNames = [],
			group_id = this.groupId,
			user_id = this.adminId,
			goods_id = 0;

		resData.forEach(d => {
			let s = {
					cate_id,
					area_id,
					bar_id,
					group_id,
					user_id,
					goods_id
				},
				k = {};
			d.in_time = formatTime(d.in_time);
			d.forEach((e, i) => {
				let index = fieldKey[i];
				//判断后面的商品是否存在
				if (index == 'goods_name' && !goodsNames.includes(e)) {
					goodsNames.push(e)
				}
				//格式化时间
				if (index == 'in_time') {
					e = formatTime(e);
				}
				if (timeTitle.includes(index)) {
					e = formatTime(e);
				}
				if (extTitle.includes(index)) {
					k[index] = e;
				} else {
					s[index] = e
				}

			})
			s.ext = JSON.stringify(k)
			saveData.push(s)
		})

		//console.log(saveData)
		//console.log(goodsNames)
		let db = this.model('stock_goods');
		try {
			await db.startTrans();
			let hasGoods = await db.where({
				name: ['in', goodsNames],
				group_id
			}).getField('id, name');
			let noGoods = []
			if (hasGoods.name.length > 0) {
				goodsNames.forEach((d, i) => {
					if (!hasGoods.name.includes(d)) {
						noGoods.push(d)
					}
				})
			} else {
				noGoods = goodsNames
			}
			let goodsNew = [],
				newGoodsIds = [];
			if (noGoods.length > 0) {
				noGoods.forEach((d, i) => {
					let s = {
						name: d,
						stock_num: 0,
						pan_num: 0,
						desc: '',
						status: 0,
						user_id,
						cate_id,
						group_id
					}
					goodsNew.push(s)

				})
				newGoodsIds = await db.addMany(goodsNew)
			}
			let goodsIds = hasGoods.id.concat(newGoodsIds)
			let goodsNas = hasGoods.name.concat(noGoods)
			let nums = {},
				gids = {};
			saveData.forEach(d => {
				let gid = goodsIds[goodsNas.indexOf(d.goods_name)];
				let ni = `${group_id}-${area_id}-${bar_id}-${gid}`;
				if (!nums[ni]) {
					nums[ni] = d.stock_num;
				} else {
					nums[ni] = nums[ni] + d.stock_num;
				}
				if (!gids[gid]) {
					gids[gid] = d.stock_num
				} else {
					gids[gid] = gids[gid] + d.stock_num
				}
				d.goods_id = gid;
			})
			let upGoods = []
			for (let p in gids) {
				upGoods.push({
					id: p,
					stock_num: ['exp', 'stock_num+' + gids[p]]
				})
			}
			await this.model('stock_in').addMany(saveData, {
				ignore: true
			})
			await db.updateMany(upGoods)
			await this.model('stock').addStockNum(nums);
			await db.commit();
			return this.success()
		} catch (e) {
			await db.rollback();
			console.log(e.message)
			return this.fail(e.message)
		}

	}

}
