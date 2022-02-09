const Base = require('./base.js');
/**
 * @class
 * @apiDefine plugins 应用市场管理
 */
const cateList = require(think.ROOT_PATH + '/data/plugins/cate.js')
module.exports = class extends Base {

    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = {};
        if (param) wsql = this.parseSearch(param, wsql);
        let list = await this.model('plugins').where(wsql).page(page, limit).order('id desc').select();
        let count = await this.model('plugins').where(wsql).count();
        list.forEach(item => {
            item.typeName = cateList[item.type];
        })
        return this.success({ list, count })
    }

    async addBeforeAction() {
        //let url = 'https://godocms.com/plugins/list';
        let url = '/plugin/index/list';
        

    }

    async addAction() {
        let post = this.post();
        let id = await this.model('plugins').add(post);
        return this.success(id);
    }

    async editAction() {
        let post = this.post();
        let has = await this.model('plugins').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        await this.model('plugins').update(post);
        return this.success()
    }

    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('plugins').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        return this.success(data);
    }

    async delAction() {
        let id = this.post('id');
        if (!await this.hasData('plugins', { id }))
            return this.fail('数据不存在')
        await this.model('plugins').where({ id }).delete()
        return this.success()
    }
}