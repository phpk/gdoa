const userBase = require('./user_base.js');
/**
 * @class
 * @apiDefine user_pos 岗位管理
 */
module.exports = class extends userBase {

    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = this.turnSearch(param, {});
        let list = await this.model('user_pos').where(wsql).page(page, limit).order('id desc').select();
        let count = await this.model('user_pos').where(wsql).count();
        return this.success({ list, count })
    }

    async addAction() {
        let post = this.getPost();
        //console.log(post)
        let id = await this.model('user_pos').add(post);
        await this.upCachePos();
        return this.success(id);
    }
    async editAction() {
        let post = this.post();
        let has = await this.model('user_pos').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        await this.model('user_pos').update(post);
        await this.upCachePos();
        return this.success()
    }

    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('user_pos').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        //data.menus = await this.model('menu').tree();
        return this.success(data);
    }

    async delAction() {
        let id = this.post('id');
        if (!await this.hasData('user_pos', { id }))
            return this.fail('数据不存在')
        await this.model('user_pos').where({ id }).delete()
        await this.upCachePos();
        return this.success()
    }
}