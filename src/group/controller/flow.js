const Base = require('./base.js');
const flowType = {
    1: '图形编辑器',
    2: '图表编辑器',
    3: '权限编辑器',
    4: '工作流编辑器',
    5: '拓扑图编辑器'

}
/**
 * @class
 * @apiDefine flow 流程图管理
 */
module.exports = class extends Base {

    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = this.turnSearch(param, {user_id: this.userId});
        let list = await this.model('flow').where(wsql).page(page, limit).order('id desc').select();
        list.forEach(d => {
            d.typeName = flowType[d.type]
        })
        let count = await this.model('flow').where(wsql).count();
        return this.success({ list, count })
    }
    
    async addAction() {
        let post = this.getPost();
        let id = await this.model('flow').add(post);
        return this.success(id);
    }

    async editAction() {
        let post = this.post();
        let has = await this.model('flow').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        await this.model('flow').update(post);
        //分享处理
        post.ref_id = has.type;
        await this.model('share').addHistory('flow', this.userId, has, post);
        return this.success()
    }

    async editBeforeAction() {
        // let id = this.get('id');
        // let data = await this.model('flow').where({ id }).find()
        // if (think.isEmpty(data)) return this.fail('数据为空')
        // return this.success(data);
        let id = this.get('id');
        let rt = await this.model('share').viewBefore(id, 'flow', this.userId);
        if(rt.code > 0) {
            return this.fail(rt.msg)
        }
        return this.success(rt.data);
    }

    async delAction() {
        let id = this.post('id');
        if (!await this.hasData('flow', { id }))
            return this.fail('数据不存在')
        await this.model('flow').where({ id }).delete()
        return this.success()
    }
    async editNameAction() {
        let id = this.post('id');
        if (!await this.hasData('flow', { id }))
            return this.fail('数据不存在')
        await this.model('flow').where({ id }).update({ title: this.post('value')})
        return this.success()
    }
}