const Base = require('./base.js');

/**
 * @class
 * @apiDefine api 接口设计器
 */
module.exports = class extends Base {
    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = {};
        if (param) wsql = this.parseSearch(param, wsql);
        let list = await this.model('api').where(wsql).page(page, limit).select();
        let count = await this.model('api').where(wsql).count();
        return this.success({ list, count });
    }
    async addBeforeAction() {
        let list = await this.model('mod').where({ type: 1 }).select();
        return this.success(list)
    }
    async addAction() {

    }
}