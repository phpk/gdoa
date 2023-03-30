const Base = require('./base.js');
const TIMEOUT = 24 * 3600 * 1000 * 36500 //100年不过期
/**
 * @class
 * @apiDefine stock_goods 物料管理管理
 */
module.exports = class extends Base {
	async getDict(id = 0) {
		let rt = await this.cache(this.groupId + '_stock_dict');
		if (think.isEmpty(rt)) {
			return await this.upDictCache();
		}
		if(id > 0) {
			return rt.find(d => d.id == id)
		}
		return rt;
	}
	async upDictCache() {
		let list = await this.model('stock_dict').where({
			group_id: this.groupId,
			//pid: pid,
			enable: 1
		}).select()
		let top = []
		list.forEach(d => {
			if(d.pid === 0) top.push(d)
		})
		top.forEach(d => {
			list.forEach(e => {
				if(e.pid == d.id) {
					d.child = d.child ? d.child : [];
					d.child.push(e)
				}
			})
		})
		await this.cache(this.groupId + '_stock_dict', top, {
			timeout: TIMEOUT
		});
		return top;
	}
	async getCate(cid = 0) {
		let rt = await this.cache(this.groupId + '_stock_cate');
		if (think.isEmpty(rt)) {
			rt = await this.upCateListCache();
		}
		let dictList = await this.cache(this.groupId + '_stock_dict');
		rt.forEach(d => {
			if(d.ext && d.ext.length > 0) {
				d.ext.forEach(e => {
					if(e.cdict) {
						let dictData = dictList.find(c => c.id == e.cdict)
						if(dictData && dictData.child) {
							e.dict = dictData.child;
						}
					}
				})
			}
			
		})
		if (cid > 0) {
			return rt.find(d => d.id == cid)
		}
		return rt;
	}
	async upCateListCache() {
		let cates = await this.model('stock_cate').where({
			//enable: 1,
			group_id: this.groupId
		}).order("id asc").select()
		cates.forEach(d => {
			d.ext = d.ext ? JSON.parse(d.ext) : []
		})
		await this.cache(this.groupId + '_stock_cate', cates, {
			timeout: TIMEOUT
		});
		return cates;
	}
	async getArea(cid = 0) {
		let rt = await this.cache(this.groupId + '_stock_area');
		if (think.isEmpty(rt)) {
			return await this.upStorehouseCache();
		}
		if (cid > 0) {
			return rt.find(d => d.id == cid)
		}
		return rt;
	}
	async upStorehouseCache() {
		let group_id = this.groupId;
		let list = await this.model('stock_storehouse').where({
			group_id
		}).order("id asc").select()
		for(let i = 0; i < list.length; i++) {
			list[i].title = list[i].name;
			list[i].pid = 0;
			list[i].child = await this.model('stock_bar').where({
				//groud_id,
				area_id: list[i].id
			}).select();
			list[i].child.forEach(e => {
				e.topname = list[i].name;
				e.title = e.name;
				e.pid = list[i].id;
			})
		}
		// list.forEach(async (d) => {
		// 	d.title = d.name;
		// 	d.pid = 0;
		// 	d.child = await this.model('stock_bar').where({
		// 		//groud_id,
		// 		area_id: d.id
		// 	}).select()
		// 	d.child.forEach(e => {
		// 		e.title = e.name;
		// 		e.pid = d.id;
		// 	})
		// })
		await this.cache(this.groupId + '_stock_area', list, {
			timeout: TIMEOUT
		});
		return list;
	}
	/*
	async getCate() {
		let cates = await this.model('stock_dict').where({
			enable: 1
		}).order("id asc").select()
		let top = {}
		cates.forEach(e => {
			if (e.pid === 0) {
				e.child = [];
				//top[e.key] = top[e.key] ? top[e.key] : [];
				top[e.key] = e;
			}
		});
		for (let p in top) {
			cates.forEach(e => {
				if (top[p].id === e.pid) {
					top[p].child.push(e)
				}
			})
		}
		return top;

	}*/
}
