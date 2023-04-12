const stockBase = require('./stock_base.js');
/**
 * @class
 * @apiDefine stock_cate 库存分类管理管理
 */
// const objType = {
// 	'input': '输入框',
// 	'radio': '单选',
// 	'checkbox': '多选',
// 	'select': '下拉',
// 	'textarea': '文本',
// 	'time': '时间'
// }
module.exports = class extends stockBase {

	async listAction() {
		let {
			page,
			limit,
			param,
			id
		} = this.get();
		if (!id) {
			let wsql = this.turnSearch(param, {});
			let list = await this.model('stock_cate').where(wsql).page(page, limit).order('id desc').select();
			let count = await this.model('stock_cate').where(wsql).count();
			return this.success({
				list,
				count
			})
		} else {
			let rt = await this.model('stock_cate').where({
				id
			}).find()
			rt.ext = rt.ext ? JSON.parse(rt.ext) : [];

			return this.success({
				count: rt.ext.length,
				list: rt.ext
			})
		}

	}
	
	async addAction() {
		let post = this.post();
		post.group_id = this.groupId;
		post.user_id = this.userId;
		let id = await this.model('stock_cate').add(post);
		await this.upCateListCache();
		return this.success(id);
	}

	async editAction() {
		let post = this.post();
		let id = post.id;
		let has = await this.model('stock_cate').where({
			id
		}).find();
		if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
		//console.log(post)
		let pext = {
			cname : post.cname,
			ckey : post.ckey,
			ctype : post.ctype,
			cdef : post.cdef,
			corder : post.corder*1,
			cdict : post.cdict,
			cdesc : post.cdesc
		}
		let key = pext.ckey
		//console.log(pext)
		if (key) {
			let ext = has.ext ? JSON.parse(has.ext) : [];
			if(ext.length < 1){
				ext.push(pext)
			}
			else{
				let has = ext.some(d => d.ckey == key)
				if(has) {
					ext.forEach((d, i) => {
						if(d.ckey == key) {
							ext[i] = pext;
						}
					})
				}else{
					ext.push(pext)
				}
				ext.sort((a, b) => {
					return a.corder - b.corder
				})
			}
			//console.log(ext)
			//ext[post.key] = post.ext;
			await this.model('stock_cate')
				.where({id})
				.update({
					ext : JSON.stringify(ext)
				});
		} else {
			await this.model('stock_cate')
				.where({id})
				.update({
					name: post.name,
					desc: post.desc
				});
		}
		await this.upCateListCache();
		return this.success()
	}

	async editBeforeAction() {
		let id = this.get('id');
		let data = await this.model('stock_cate').where({
			id
		}).find()
		if (think.isEmpty(data)) return this.fail('数据为空')
		data.dict = await this.model('stock_dict').where({
			pid: 0
		}).select()
		data.ext = data.ext ? JSON.parse(data.ext) : []
		return this.success(data);
	}

	async delAction() {
		let id = this.post('id'), key =this.post('key');
		
		let has = await this.model('stock_cate').where({id}).find()
		if (think.isEmpty(has))
			return this.fail('数据不存在')
		if(think.isEmpty(key)) {
			if(id < 5){
				return this.fail('系统分类不允许删除')
			}
			await this.model('stock_cate').where({
				id
			}).delete()
		}else{
			let ext = JSON.parse(has.ext)
			let s = []
			ext.forEach((d ,i) => {
				if(d.ckey !== key) {
					s.push(d)
				}
			})
			await this.model('stock_cate').where({id}).update({ext : JSON.stringify(s)})
		}
		await this.upCateListCache();
		
		return this.success()
	}
}
