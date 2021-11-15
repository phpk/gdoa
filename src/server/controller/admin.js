const Base = require('./base.js');
const adminDto = {
    username: {
        "name": '登录名',
        "type": 'string',
        "require": true
    },
    password: {
        "name": "密码",
        "type": "string",
        "require": true
    },
    name: {
        "name": '用户名',
        "type": 'string',
        "require": true
    },
    mobile: {
        'name': '手机号',
        'type': 'number',
        'require': false
    },
    status: {
        'name': '状态',
        'type': 'number',
        'require': true
    }
}
/**
 * @class
 * @apiDefine admin 管理员管理
 */
module.exports = class extends Base {
    /**
    * @api {get} admin/list 角色列表
    * @apiGroup admin
    *
    * @apiHeader {string} rttoken 必填
    *
    * @apiParam  {number} page 页码
    * @apiParam  {number} page 每页显示数据
    *
    * @apiSuccess (200) {type} name description
    *
    */
    async listAction() {
        let page = this.get('page') * 1 || 1,
            limit = this.get('limit') * 1 || 10;
        let list = await this.model('admin')
            .page(page, limit)
            .select();
        let count = await think.model('admin').count();
        await this.adminViewLog('管理员列表');
        return this.ok({ list, count })
    }
    async addBeforeAction() {
        let authList = await this.model('admin_auth').select()
        authList.forEach(e => {
            e.title = e.name
        })
        return this.ok({ authList })
    }
    async addAction() {
        let post = this.post()
        let { msg, save } = this.params(adminDto, post);
        if (msg != '') {
            return this.err(msg)
        }
        let has = await this.model('admin')
            .where(`username = '${save.username}' or mobile = '${save.mobile}'`)
            .find()
        if (!think.isEmpty(has)) return this.err('系统中存在相同的用户名或手机号')
        save.salt = this.service('login').randomString()
        save.password = this.service('login').createPassword(save.password, save.salt);
        save.add_time = this.now()
        let rules = post.rules;
        if (!rules || rules.length < 1) {
            return this.err('请选择角色')
        }
        try {
            let adminId = await this.model('admin').add(save);
            let addRules = [];
            rules.split(',').forEach(auth_id => {
                addRules.push({
                    admin_id: adminId,
                    auth_id,
                    type: 0
                })
            })
            let rt = await this.model('admin_map').addMany(addRules)
            return this.ok(rt)
        } catch (e) {
            return this.err(e.message)
        }


    }
    async editBeforeAction() {
        let id = this.checkNumber('id');
        if (!id) return this.err('id error');


    }
};
