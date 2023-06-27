const Base = require('./base.js');
/**
 * @class
 * @apiDefine user 视图管理
 */
module.exports = class extends Base {
    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = this.turnSearch(param, {});
        let list = await this.model('view').where(wsql).page(page, limit).order('id desc').select();
        let count = await this.model('view').where(wsql).count();
        return this.success({ list, count })
    }
    async getMenu() {
        let data = await think.cache('group_perms_' + this.userId);
        let menus = data.menus;
        menus.forEach(d => {
            d.child = d.children;
        })
        menus.push({
            id : 53,
            title : '首页工作台',
            pid : 6
        })
        return menus;
    }
    async addBeforeAction() {
        let userlist = await this.model('user').where({ group_id: this.groupId }).select();
        let menus = await this.getMenu()
        return this.success({userlist, user_ids : false, menus});
    }
    async addAction() {
        let data = this.getPost()
        let id = await this.model('view').add(data)
        let userIds = data.user_ids.split(',')
        let save = []
        userIds.forEach(d => {
            save.push({
                view_id : id,
                user_id : d,
                pid : data.pid,
                group_id : this.groupId
            })
        })
        //删除以前设置的首页
        if(data.pid == 53) {
            await this.model('view_user').where({
                pid : 53,
                user_id : ["IN", userIds]
            }).delete()
        }
        await this.model('view_user').addMany(save)

        return this.success(id)
    }
    async editBeforeAction() {
        let id = this.get('id') * 1;
        let data = await this.model('view').where({id}).find()
        if(think.isEmpty(data)) {
            return this.fail('数据不存在')
        }
        let userIds = await this.model('view_user').where({view_id : id}).getField('user_id');
        data.user_ids = userIds.join(',')
        data.userlist = await this.model('user').where({ group_id: this.groupId }).select();
        data.menus = await this.getMenu()
        data.menus.forEach(d => {
            if(d.id === data.pid) {
                data.title = d.title;
            }else{
                if(d.child) {
                    d.child.forEach(dd => {
                        if(dd.id == data.pid) {
                             data.title = dd.title;
                        }
                    })
                }
            }
        })
        data.data = data.data ? data.data : []
        return this.success(data);
    }
    async editAction() {
        let data = this.getPost()
        let id = data.id;
        await this.model('view').where({id}).update(data)
        if(!think.isEmpty(data.user_ids)) {
            let userIds = data.user_ids.split(',')
            let save = []
            userIds.forEach(d => {
                save.push({
                    view_id : id,
                    user_id : d,
                    pid : data.pid,
                    group_id : this.groupId
                })
            })
            //删除以前设置的
            await this.model('view_user').where({
                view_id : id
            }).delete()
            await this.model('view_user').addMany(save)
        }
        
        return this.success()
    }
}