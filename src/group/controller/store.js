const userBase = require('./user_base.js');
/**
 * @class
 * @apiDefine user_store 门店管理
 */
module.exports = class extends userBase {

    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = this.turnSearch(param, {});
        let list = await this.model('user_store').where(wsql).page(page, limit).order('id desc').select();
        let companys = await this.getCompanyData();
        let areaData = await this.getSysArea()
        list.forEach(d => {
            if(d.area_id > 0) {
                d.area_name = areaData.find(a => a.id == d.area_id).name
            }
            if(d.company_id > 0) {
                d.company_name = companys.find(c => c.id == d.company_id).name
            }
        })
        let count = await this.model('user_store').where(wsql).count();
        return this.success({ list, count })
    }
    async addBeforeAction() {
        let authData = await think.cache('group_perms_' + this.userId);
        let companys = await this.getCompanyData();
        //let areaData = await this.getSysArea()
        return this.success({menus : authData.menus, companys})
    }
    async addAction() {
        let post = this.getPost();
        let id = await this.model('user_store').add(post);
        await this.upCacheStore();
        return this.success(id);
    }

    async editAction() {
        let post = this.getPost();
        let has = await this.model('user_store').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        await this.model('user_store').update(post);
        await this.upCacheStore();
        return this.success()
    }

    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('user_store').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        let authData = await think.cache('group_perms_' + this.userId);
        data.menus = authData.menus;
        data.companys = await this.getCompanyData();
        //data.areaData = await this.getSysArea()
        return this.success(data);
    }

    async delAction() {
        let id = this.post('id');
        if (!await this.hasData('user_store', { id }))
            return this.fail('数据不存在')
        await this.model('user_store').where({ id }).delete()
        await this.upCacheStore();
        return this.success()
    }
}