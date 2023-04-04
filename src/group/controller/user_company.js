const userBase = require('./user_base.js');
/**
 * @class
 * @apiDefine user_company 公司管理
 */
module.exports = class extends userBase {

    async listAction() {
        let { page, limit, param, pid } = this.get();
        if(!pid) pid = 0;
        let wsql = this.turnSearch(param, {pid});
        let list = await this.model('user_company').where(wsql).page(page, limit).order('id desc').select();
        let count = await this.model('user_company').where(wsql).count();
        return this.success({ list, count })

    }

    async addAction() {
        let post = this.getPost();
        //console.log(post)
        let id = await this.model('user_company').add(post);
        if(post.pid > 0) {
            await this.model('user_company').update({id : post.pid, have_child : 1})
        }
        await this.upCacheCompany()
        return this.success(id);
    }
    async addBeforeAction() {
        let menus = await this.getAuthMenu();
        let list = await this.getCompanyData();
        return this.success({menus, list})
    }
    async editAction() {
        let post = this.post();
        let has = await this.model('user_company').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        await this.model('user_company').where({id : post.id}).update(post);
        if(post.pid > 0) {
            await this.model('user_company').update({id : post.pid, have_child : 1})
        }
        if(post.pid != has.pid) {
            let hasChild = await this.model('user_company').where({pid : has.pid}).find()
            if(think.isEmpty(hasChild)) {
                await this.model('user_company').update({id : has.pid, have_child : 0})
            }
        }
        await this.upCacheCompany()
        return this.success()
    }

    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('user_company').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')

        data.menus = await this.getAuthMenu();
        data.list = await this.getCompanyData();
        
        return this.success(data);
    }

    async delAction() {
        let id = this.post('id');
        if (!await this.hasData('user_company', { id }))
            return this.fail('数据不存在')
        await this.model('user_company').where({ id }).delete()
        await this.upCacheCompany()
        return this.success()
    }
}