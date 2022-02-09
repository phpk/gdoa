const Base = require('./base.js');
const cateList = require(think.ROOT_PATH + '/data/plugins/cate.js')
module.exports = class extends Base {
  async listAction() {
    let { page, limit, param } = this.get();
    page = page || 1;
    limit = limit || 20;
    let wsql = {};
    if (param) wsql = this.parseSearch(param, wsql);
    let list = await this.model('plugins').where(wsql).page(page, limit).order('id desc').select();
    let count = await this.model('plugins').where(wsql).count();
    list.forEach(item => {
      item.typeName = cateList[item.type];
    })
    return this.success({ list, count })
  }
};
