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
    * @api {get} admin/list 管理员列表
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
        let wh = this.get('param'),
            wsql = {};
        if (wh) wsql = this.parseSearch(wh, wsql);

        let list = await this.model('admin')
            .where(wsql)
            .page(page, limit)
            .select();
        let count = await think.model('admin').where(wsql).count();
        await this.adminViewLog('管理员列表');
        return this.ok({ list, count })
    }
    /**
    * @api {get} admin/addBefore 添加管理员前
    * @apiGroup admin
    *
    * @apiHeader {string} rttoken 必填
    *
    * @apiParam  null
    *
    * @apiSuccess (200) {type} name description
    *
    */
    async addBeforeAction() {
        let authList = await this.model('admin_auth').select()
        authList.forEach(e => {
            e.title = e.name
        })
        await this.adminViewLog('添加管理员');
        return this.ok({ authList })
    }
    /**
   * @api {post} admin/add 添加管理员
   * @apiGroup admin
   *
   * @apiHeader {string} rttoken 必填
   *
   * @apiParam  {string} username 用户名
   * @apiParam {string} password 密码
   * @apiParam {string} name 真实姓名
   * @apiParam {Number} mobile 手机号
   * @apiParam {Number} status 状态
   *
   * @apiSuccess (200) {type} name description
   *
   */
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
            await this.adminOpLog('添加管理员', ['password']);
            return this.ok(rt)
        } catch (e) {
            return this.err(e.message)
        }

    }
    /**
        * @api {get} admin/editBefore 编辑管理员前
        * @apiGroup admin
        *
        * @apiHeader {string} rttoken 必填
        *
        * @apiParam  {number} id 管理员id
        *
        * @apiSuccess (200) {type} name description
        *
        */
    async editBeforeAction() {
        let id = this.checkNumber('id');
        if (!id) return this.err('id error');
        let data = await this.model('admin').where({ admin_id: id }).find();
        if (think.isEmpty(data)) return this.err('data is none');
        delete data.password;
        delete data.salt;
        data.rules = await this.model('admin_map').where({ admin_id: id }).getField('auth_id');
        let authList = await this.model('admin_auth').select()
        authList.forEach(e => {
            e.title = e.name
        });
        data.authList = authList;
        await this.adminViewLog('编辑管理员');
        return this.ok(data)

    }
    /**
      * @api {post} admin/edit 编辑管理员
      * @apiGroup admin
      *
      * @apiHeader {string} rttoken 必填
      * 
      * @apiParam  {Number} admin_id 管理员id
      * @apiParam  {string} username 用户名
      * @apiParam {string} password 密码
      * @apiParam {string} name 真实姓名
      * @apiParam {Number} mobile 手机号
      * @apiParam {Number} status 状态
      *
      * @apiSuccess (200) {type} name description
      *
      */
    async editAction() {
        let adminId = this.checkNumber('admin_id');
        if (!adminId) return this.err('id error');
        let post = this.post()
        delete adminDto.password;
        let { msg, save } = this.params(adminDto, post);
        if (msg != '') {
            return this.err(msg)
        }
        save.admin_id = adminId;
        if (post.password != '') {
            save.salt = this.service('login').randomString()
            save.password = this.service('login').createPassword(save.password, save.salt);
            save.update_time = this.now()
        }
        //判断是否存在该管理员
        let exist = await this.model('admin')
            .where({ admin_id: adminId })
            .find()
        if (think.isEmpty(exist)) return this.err("编辑的管理员不存在")
        //判断用户名或手机号
        let has = await this.model('admin')
            .where(`(username = '${save.username}' or mobile = '${save.mobile}') and admin_id != '${adminId}'`)
            .find()
        if (!think.isEmpty(has)) return this.err('系统中存在相同的用户名或手机号')

        let rules = post.rules;
        if (!rules || rules.length < 1) {
            return this.err('请选择角色')
        }
        try {
            await this.model('admin')
                .where({ admin_id: adminId })
                .update(save);
            //先删除
            await this.model('admin_map')
                .where({ admin_id: adminId })
                .delete();
            //再添加
            let addRules = [];
            rules.split(',').forEach(auth_id => {
                addRules.push({
                    admin_id: adminId,
                    auth_id,
                    type: 0
                })
            })
            let rt = await this.model('admin_map').addMany(addRules)
            await this.adminOpLog('编辑管理员', ['password']);
            return this.ok(rt)
        } catch (e) {
            return this.err(e.message)
        }

    }
    /**
     * @api {post} admin/del 删除管理员
     * @apiGroup admin
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  {number} id
     *
     * @apiSuccess (200) {type} name description
     *
     */
    async delAction() {
        let admin_id = this.checkNumber('admin_id');
        if (!admin_id) return this.err('id error');
        if (admin_id == 1) return this.err('系统管理员禁止删除');
        let has = await this.model('admin').where({ admin_id }).find()
        if (think.isEmpty(has)) return this.err("数据不存在")

        await this.model('admin').where({ admin_id }).delete();
        await this.model('admin_map').where({ admin_id }).delete();
        await this.adminOpLog('删除管理员');
        return this.ok()
    }
    /**
     * @api {post} admin/enable 设置管理员是否可用
     * @apiGroup admin
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  {number} status 状态
     * @apiParam  {number} id
     * 
     * @apiSuccess (200) {type} name description
     *
     */
    async enableAction() {
        let post = this.post(),
            admin_id = post.id * 1;
        if (isNaN(admin_id) || admin_id < 1) return this.err('id error')
        let has = await this.model('admin').where({ admin_id }).find()
        if (think.isEmpty(has)) return this.err("数据不存在")
        let rt = await this.model('admin')
            .where({ admin_id })
            .update({
                status: post.status * 1
            })
        await this.adminOpLog('设置管理员可用');
        return this.ok(rt)
    }
};
