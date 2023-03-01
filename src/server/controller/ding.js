const Base = require('./base.js');
/**
 * @class
 * @apiDefine kanban 钉钉管理
 */
module.exports = class extends Base {

    async listDeptAction() {
        let list = await this.model('ding_dept').order('dept_id desc').select();
        await this.adminViewLog('钉钉部门列表');
        return this.success(list)
    }
    async userListAction() {
        let { page, limit, param } = this.get();
        let wsql = {};
        if (param) wsql = this.parseSearch(param, wsql);
        let list = await this.model('ding_user').where(wsql).page(page, limit).select();
        let count = await this.model('ding_user').where(wsql).count();
        await this.adminViewLog('钉钉用户列表');
        return this.success({ list, count })
    }
    async listRoleAction() {
        let list = await this.model('ding_role').order('role_id desc').select();
        await this.adminViewLog('钉钉角色列表');
        return this.success(list)
    }
   
}