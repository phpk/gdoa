const Base = require('./base.js');
/**
 * @class
 * @apiDefine set 系统配置
 */
module.exports = class extends Base {
     /**
     * @api {get} set/list 系统配置列表
     * @apiGroup set
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  {number} page 页码
     * @apiParam  {number} limit 每页显示数据
     *
     * @apiSuccess (200) {type} name description
     *
     */
    async listAction() {

    }
};
