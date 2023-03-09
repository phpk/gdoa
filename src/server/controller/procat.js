const Base = require('./base.js');
/**
 * @class
 * @apiDefine project_type 项目分类管理
 */
const cates = {
	1 : '项目分类',
	2 : '文件分类'
}
module.exports = class extends Base {

    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = {};
        if (param) wsql = this.parseSearch(param, wsql);
        let list = await this.model('project_type').where(wsql).page(page, limit).order('id desc').select();
        let count = await this.model('project_type').where(wsql).count();
        return this.success({ list, count })
    }
	async addBeforeAction() {
	    return this.success(cates);
	}
    async addAction() {
        let post = this.post();
        let id = await this.model('project_type').add(post);
        return this.success(id);
    }

    async editAction() {
        let post = this.post();
        let has = await this.model('project_type').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        await this.model('project_type').update(post);
        return this.success()
    }

    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('project_type').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        return this.success(data);
    }

    async delAction() {
        let id = this.post('id');
        if (!await this.hasData('project_type', { id }))
            return this.fail('数据不存在')
        await this.model('project_type').where({ id }).delete()
        return this.success()
    }
}