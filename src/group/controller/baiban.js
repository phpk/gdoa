const Base = require('./base.js');
/**
 * @class
 * @apiDefine baiban 白板管理管理
 */
module.exports = class extends Base {

    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = this.turnSearch(param, {user_id: this.userId});
        let list = await this.model('baiban').where(wsql).page(page, limit).order('id desc').select();
        let count = await this.model('baiban').where(wsql).count();
        return this.success({ list, count })
    }

    async addAction() {
        let post = this.getPost();
        let id = await this.model('baiban').add(post);
        return this.success(id);
    }

    async editAction() {
        let post = this.post();
        let has = await this.model('baiban').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        await this.model('baiban').update(post);
        //分享处理
        await this.model('share').addHistory('baiban', this.userId, has, post);
        return this.success()
    }

    async editBeforeAction() {
        let id = this.get('id');
        let rt = await this.model('share').viewBefore(id, 'baiban', this.userId);
        if(rt.code > 0) {
            return this.fail(rt.msg)
        }
        return this.success(rt.data);
    }

    async delAction() {
        let id = this.post('id');
        if (!await this.hasData('baiban', { id }))
            return this.fail('数据不存在')
        await this.model('baiban').where({ id }).delete()
        return this.success()
    }
}