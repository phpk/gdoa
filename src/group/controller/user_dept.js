const userBase = require('./user_base.js');
/**
 * @class
 * @apiDefine user_dept 部门管理
 */
module.exports = class extends userBase {

    async listAction() {
        let { page, limit, param, pid } = this.get();
        if(!pid) pid = 0;
        let wsql = this.turnSearch(param, {pid});
        let list = await this.model('user_dept').where(wsql).page(page, limit).order('id desc').select();
        let companys = await this.getCompanyData();
        list.forEach(d => {
            if(d.company_id > 0) {
                d.company = companys.find(e => e.id == d.company_id).name
            }else{
                d.company = '暂无'
            }
        })
        let count = await this.model('user_dept').where(wsql).count();
        return this.success({ list, count })
    }

    async addAction() {
        let post = this.getPost();
        post.old_id = await this.model('user_dept').max('id')
        let id = await this.model('user_dept').add(post);
        if(post.pid > 0) {
            await this.model('user_dept').update({id : post.pid, have_child : 1})
        }
        await this.upCacheDept();
        return this.success(id);
    }
    async addBeforeAction() {
        let companys = await this.getCompanyData();
        let menus = await this.getAuthMenu();
        let list = await this.getDeptData();
        return this.success({companys, menus, list})
    }
    async editAction() {
        let post = this.post();
        let has = await this.model('user_dept').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        await this.model('user_dept').where({id : post.id}).update(post);
        if(post.pid > 0) {
            await this.model('user_dept').update({id : post.pid, have_child : 1})
        }
        if(post.pid != has.pid) {
            let hasChild = await this.model('user_dept').where({pid : has.pid}).find()
            if(think.isEmpty(hasChild)) {
                await this.model('user_dept').update({id : has.pid, have_child : 0})
            }
        }
        await this.upCacheDept();
        return this.success()
    }

    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('user_dept').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        data.menus = await this.getAuthMenu();
        data.list = await this.getDeptData();
        data.companys = await this.getCompanyData();
        
        return this.success(data);
    }

    async delAction() {
        let id = this.post('id');
        if (!await this.hasData('user_dept', { id }))
            return this.fail('数据不存在')
        await this.model('user_dept').where({ id }).delete()
        await this.upCacheDept();
        return this.success()
    }
}