const ProjectBase = require('./project_base.js');

/**
 * @class
 * @apiDefine project_file 项目文件管理
 */
module.exports = class extends ProjectBase {

	async listAction() {
		let {
			page,
			limit,
			param
		} = this.get();
		let wsql = {
			'group_id': this.groupId
		};
		if (param) wsql = this.turnSearch(param, wsql);
		let list = await this.model('project_file')
			.where(wsql)
			.page(page, limit)
			.order('id desc')
			.select();
		let cates = await this.getCate(2)
		//console.log(cates)
		list.forEach(d => {
			d.cname = this.getName(cates, d.type)
		})
		//console.log(list)
		let count = await this.model('project_file').where(wsql).count();
		return this.success({
			list,
			count
		})
	}
	async addBeforeAction() {
		let cates = await this.getCate(2)
		return this.success(cates);
	}
	async addAction() {
		let post = this.post();
		post.user_id = this.adminId;
		post.group_id = this.groupId;
		let id = await this.model('project_file').add(post);
		return this.success(id);
	}

	async editAction() {
		let post = this.post();
		let has = await this.model('project_file').where({
			id: post.id
		}).find();
		if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
		await this.model('project_file').update(post);
		return this.success()
	}

	async editBeforeAction() {
		let id = this.get('id');
		let data = await this.model('project_file').where({
			id
		}).find()
		if (think.isEmpty(data)) return this.fail('数据为空')
		let cates = await this.getCate(2)
		return this.success({
			data,
			cates
		});
	}

	async delAction() {
		let id = this.post('id');
		if (!await this.hasData('project_file', {
				id
			}))
			return this.fail('数据不存在')
		await this.model('project_file').where({
			id
		}).delete()
		return this.success()
	}
}
