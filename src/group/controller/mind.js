const Base = require('./base.js');
/**
 * @class
 * @apiDefine mind 思维导图管理
 */
module.exports = class extends Base {

    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = this.turnSearch(param, {user_id: this.userId});
        let list = await this.model('mind').where(wsql).page(page, limit).order('id desc').select();
        let count = await this.model('mind').where(wsql).count();
        return this.success({ list, count })
    }

    async addAction() {
        let post = this.getPost();
        let id = await this.model('mind').add(post);
        return this.success(id);
    }

    async editAction() {
        let post = this.post();
        let has = await this.model('mind').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        await this.model('mind').update(post);
        //分享处理
        await this.model('share').addHistory('mind', this.userId, has, post);
        return this.success()
    }

    async editBeforeAction() {
        let id = this.get('id');
        let rt = await this.model('share').viewBefore(id, 'mind', this.userId);
        if(rt.code > 0) {
            return this.fail(rt.msg)
        }
        return this.success(rt.data);
    }

    async delAction() {
        let id = this.post('id');
        if (!await this.hasData('mind', { id }))
            return this.fail('数据不存在')
        await this.model('mind').where({ id }).delete()
        return this.success()
    }
}