const Base = require('./base.js');
/**
 * @class
 * @apiDefine group_role 租户组管理
 */
module.exports = class extends Base {

    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = {};
        if (param) wsql = this.parseSearch(param, wsql);
        let list = await this.model('group_role').where(wsql).page(page, limit).order('id desc').select();
        let count = await this.model('group_role').where(wsql).count();
        return this.success({ list, count })
    }
    async addBeforeAction() {
        let treeData = await this.model('menu')
            .where({
                is_sys: 1,
                is_common: 0
            }).select()
        let menus = await this.service('menu').tree(treeData);
        return this.success(menus)
    }

    async addAction() {
        let post = this.post();
        post.user_id = this.adminId;
        let id = await this.model('group_role').add(post);
        return this.success(id);
    }

    async editAction() {
        let post = this.post();
        let has = await this.model('group_role').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        await this.model('group_role').update(post);
        return this.success()
    }

    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('group_role').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        let treeData = await this.model('menu')
            .where({
                is_sys: 1,
                is_common: 0
            }).select()
        data.menus = await this.service('menu').tree(treeData);
        return this.success(data);
    }

    async delAction() {
        let id = this.post('id');
        if (!await this.hasData('group_role', { id }))
            return this.fail('数据不存在')
        await this.model('group_role').where({ id }).delete()
        return this.success()
    }
}