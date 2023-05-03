const Base = require('./base.js');
/**
 * @class
 * @apiDefine ppt 演示文稿管理
 */
module.exports = class extends Base {

    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = this.turnSearch(param, {user_id: this.userId});
        let list = await this.model('ppt').where(wsql).order('id desc').page(page, limit).select();
        let count = await this.model('ppt').where(wsql).count();
        return this.success({ list, count })
    }

    async addAction() {
        let post = this.getPost();
        let id = await this.model('ppt').add(post);
        return this.success(id);
    }

    async editAction() {
        let post = this.post();
        let has = await this.model('ppt').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        await this.model('ppt').update(post);
        //分享处理
        await this.model('share').addHistory('ppt', this.userId, has, post);
        return this.success()
    }

    async editBeforeAction() {
        // let id = this.get('id');
        // let data = await this.model('ppt').where({ id }).find()
        // if (think.isEmpty(data)) return this.fail('数据为空')
        // return this.success(data);
        let id = this.get('id');
        let rt = await this.model('share').viewBefore(id, 'ppt', this.userId);
        if(rt.code > 0) {
            return this.fail(rt.msg)
        }
        return this.success(rt.data);
    }

    async delAction() {
        let id = this.post('id');
        if (!await this.hasData('ppt', { id }))
            return this.fail('数据不存在')
        await this.model('ppt').where({ id }).delete()
        return this.success()
    }
}