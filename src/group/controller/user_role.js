const userBase = require('./user_base.js');
/**
 * @class
 * @apiDefine user_role 角色管理管理
 */
module.exports = class extends userBase {

    async listAction() {
        let { page, limit, param, pid } = this.get();
        pid = pid ? pid : 0;
        let wsql = this.turnSearch(param, {pid});
        let list = await this.model('user_role').where(wsql).page(page, limit).order('id desc').select();
        let count = await this.model('user_role').where(wsql).count();
        return this.success({ list, count })
    }
    async addBeforeAction() {
        let menus = await this.getAuthMenu();
        let list = await this.getRoleData();
        return this.success({menus,list})
    }
    async addAction() {
        let post = this.getPost();
        post.old_id = await this.model('user_role').max('id')
        let id = await this.model('user_role').add(post);
        await this.upCacheRole();
        return this.success(id);
    }

    async editAction() {
        let post = this.post();
        let has = await this.model('user_role').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        await this.model('user_role').update(post);
        await this.upCacheRole();
        return this.success()
    }

    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('user_role').where({ id }).find()
        data.menus = await this.getAuthMenu();
        data.list = await this.getRoleData();
        if (think.isEmpty(data)) return this.fail('数据为空')
        return this.success(data);
    }

    async delAction() {
        let id = this.post('id');
        if (!await this.hasData('user_role', { id }))
            return this.fail('数据不存在')
        await this.model('user_role').where({ id }).delete()
        await this.upCacheRole();
        return this.success()
    }
}