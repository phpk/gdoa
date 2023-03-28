const Base = require('./base.js');
/**
 * @class
 * @apiDefine user_company 公司管理管理
 */
module.exports = class extends Base {

    async listAction() {
        let list = await this.model('user_company').order('id desc').select();
        return this.success(list)
    }

    async addAction() {
        let post = this.post();
        //console.log(post)
        let id = await this.model('user_company').add(post);
        return this.success(id);
    }
    async addBeforeAction() {
        let list = await this.model('auth').getTree('user_company');
        let menus = await this.service('menu').tree();
        return this.success({list, menus})
    }
    async editAction() {
        let post = this.post();
        let has = await this.model('user_company').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        await this.model('user_company').where({id : post.id}).update(post);
        return this.success()
    }

    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('user_company').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        data.list = await this.model('auth').getTree('department');
        data.menus = await this.service('menu').tree();
        if(data.pid > 0) {
            data.topname = await this.model('department').where({id : data.pid}).getField('title', true);
        }else{
            data.topname = '顶层'
        }
        return this.success(data);
    }

    async delAction() {
        let id = this.post('id');
        if (!await this.hasData('user_company', { id }))
            return this.fail('数据不存在')
        await this.model('user_company').where({ id }).delete()
        return this.success()
    }
}