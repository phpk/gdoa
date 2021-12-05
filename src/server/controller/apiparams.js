const Base = require('./base.js');
/**
 * @class
 * @apiDefine api 接口参数管理
 */
module.exports = class extends Base {
    async listAction() {
        let aid = this.get('aid');
        let list = await this.model('api_params').where({ aid }).select()
        let tabs = await this.model('api').getTables(aid);
        let fields = await this.model('api').getFields(tabs);
        //console.log(tabs)
        return this.success({ list, fields})
    }
    async addFromDbAction() {
        let { aid, fields } = this.post()
        //console.log(fields)
        let data = await this.model('api').parseFields(fields, aid);
        //console.log(data)
        if (data.length > 0)
            await this.model('api_params').addMany(data)
        return this.success()
    }
}