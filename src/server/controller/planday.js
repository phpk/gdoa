const Base = require('./base.js');
/**
 * @class
 * @apiDefine planday 日程计划管理
 */
module.exports = class extends Base {

    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = {};
        if (param) wsql = this.parseSearch(param, wsql);
        let list = await this.model('planday').where(wsql).page(page, limit).order('id desc').select();
        let count = await this.model('planday').where(wsql).count();
        return this.success({ list, count })
    }

    async addAction() {
        let post = this.post();
        let data = {
            id: post.id,
            title: post.title,
            content: JSON.stringify(post),
            start: post.start / 1000,
            end : post.end/1000,
            user_id: this.adminId,
            add_time: this.now(),
            update_time: this.now()
        }
        let id = await this.model('planday').add(data);
        return this.success(id);
    }

    async editAction() {
        let post = this.post();
        let has = await this.model('planday').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        let data = {
            title: post.title,
            content: post.content,
            update_time: this.now()
        }
        await this.model('planday').where({ id: post.id }).update(data);
        return this.success()
    }

    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('planday').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        return this.success(data);
    }

    async delAction() {
        let id = this.post('id');
        if (!await this.hasData('planday', { id }))
            return this.fail('数据不存在')
        await this.model('planday').where({ id }).delete()
        return this.success()
    }
}