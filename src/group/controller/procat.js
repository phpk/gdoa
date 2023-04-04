const ProjectBase = require('./project_base.js');

/**
 * @class
 * @apiDefine project_type 项目分类管理
 */

module.exports = class extends ProjectBase {

    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = this.turnSearch(param, {});
        let list = await this.model('project_type').where(wsql).page(page, limit).order('id desc').select();
		list.forEach(el => {
			el.cname = this.catesData[el.sys_id]
		})
        let count = await this.model('project_type').where(wsql).count();
        return this.success({ list, count, catesData : this.catesData })
    }
	async addBeforeAction() {
	    return this.success(this.catesData);
	}
    async addAction() {
        let post = this.post();
		post.group_id = this.groupId;
        let id = await this.model('project_type').add(post);
        await this.upCache()
        return this.success(id);
    }

    async editAction() {
        let post = this.post();
        let has = await this.model('project_type').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        await this.model('project_type').update(post);
        await this.upCache()
        return this.success()
    }

    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('project_type').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        return this.success({data, catesData : this.catesData});
    }

    async delAction() {
        let id = this.post('id');
        if (!await this.hasData('project_type', { id }))
            return this.fail('数据不存在')
        await this.model('project_type').where({ id }).delete()
        await this.upCache()
        return this.success()
    }
    
}