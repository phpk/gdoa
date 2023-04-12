const Base = require('./base.js');
/**
 * @class
 * @apiDefine gant 甘特图管理
 */
module.exports = class extends Base {

    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = this.turnSearch(param, {user_id: this.userId});
        let list = await this.model('gant').where(wsql).page(page, limit).order('id desc').select();
        let count = await this.model('gant').where(wsql).count();
        return this.success({ list, count })
    }

    async addAction() {
        let post = this.getPost();
        let data = {
            title: post.title,
            content: post.content,
            user_id : post.user_id,
            group_id: post.group_id
        }
        let id = await this.model('gant').add(data);
        return this.success(id);
    }

    async editAction() {
        let post = this.post();
        let has = await this.model('gant').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        let data = {
            title: post.title,
            content: post.content
        }
        await this.model('gant').where({id : post.id}).update(data);
        return this.success()
    }

    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('gant').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        
        return this.success(data);
    }

    async delAction() {
        let id = this.post('id');
        if (!await this.hasData('gant', { id }))
            return this.fail('数据不存在')
        await this.model('gant').where({ id }).delete()
        return this.success()
    }
}