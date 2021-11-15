const Base = require('./base.js');
/**
 * @class
 * @apiDefine auth 角色管理
 */
module.exports = class extends Base {
    /**
     * @api {get} auth/list 角色列表
     * @apiGroup auth
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
        let page = this.get('page') * 1 || 1,
            limit = this.get('limit') * 1 || 10;
        let list = await this.model('admin_auth')
            .page(page, limit)
            .select();
        let count = await think.model('admin_auth').count();
        await this.adminViewLog('角色列表');
        return this.ok({ list, count })
    }
    /**
     * @api {post} auth/add 添加角色
     * @apiGroup auth
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  {string} name 角色名
     * @apiParam  {number} status 是否可用0可用1不可用
     * @apiParam  {string} rules 菜单id集合，逗号隔开
     * @apiParam  {string} remark 备注
     * @apiSuccess (200) {type} name description
     *
     */
    async addAction() {
        let post = this.post();
        if (!post.name) return this.err('名称不能为空');
        let add = {
            name: post.name,
            status: post.status * 1,
            rules: post.rules,
            remark: post.remark
        }
        let rt = await this.model('admin_auth').add(add)
        await this.adminOpLog('添加角色');
        return this.ok(rt)
    }
    /**
     * @api {post} auth/addTree 角色添加前
     * @apiGroup auth
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  null
     *
     * @apiSuccess (200) {type} name description
     *
     */
    async addTreeAction() {
        let menus = await this.model('menu').tree();
        await this.adminViewLog('添加角色');
        return this.ok(menus);
    }
    /**
     * @api {post} auth/beforEdit 角色编辑前
     * @apiGroup auth
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  {number} id
     *
     * @apiSuccess (200) {type} name description
     *
     */
    async beforEditAction() {
        let id = this.get('id') * 1;
        if (!think.isNumber(id) || id < 1) return this.err('id error');
        let data = await this.model('admin_auth').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('the data none')
        //console.log(data.rules.split(','))
        data.menus = await this.model('menu').tree()
        await this.adminViewLog('编辑角色');
        return this.ok(data)
    }
    /**
     * @api {post} auth/eidt 编辑角色
     * @apiGroup auth
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  {string} name 角色名
     * @apiParam  {number} status 是否可用0可用1不可用
     * @apiParam  {string} rules 菜单id集合，逗号隔开
     * @apiParam  {string} remark 备注
     * @apiSuccess (200) {type} name description
     *
     */
    async editAction() {
        let post = this.post(),
            id = post.id * 1;
        if (!post.name) return this.err('名称不能为空');
        if (!think.isNumber(id) || id < 1) return this.err('id error');
        let has = await this.model('admin_auth').where({ id }).find()
        if (think.isEmpty(has)) return this.fail('the data none')

        let save = {
            name: post.name,
            status: post.status * 1,
            rules: post.rules,
            remark: post.remark
        }
        let rt = await this.model('admin_auth')
            .where({ id })
            .update(save)
        await this.adminOpLog('编辑角色');
        return this.ok(rt)
    }
    /**
     * @api {post} auth/enable 设置角色是否可用
     * @apiGroup auth
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
            id = post.id * 1;
        if (isNaN(id) || id < 1) return this.err('id error')
        let has = await this.model('admin_auth').where({ id }).find()
        if (think.isEmpty(has)) return this.err("数据不存在")
        let rt = await this.model('admin_auth')
            .where({ id })
            .update({
                status: post.status
            })
        await this.adminOpLog('设置角色可用');
        return this.ok(rt)
    }
    /**
     * @api {post} auth/del 删除角色
     * @apiGroup auth
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  {number} id
     *
     * @apiSuccess (200) {type} name description
     *
     */
    async delAction() {
        let post = this.post(),
            id = post.id * 1;
        if (isNaN(id) || id < 1) return this.err('id error')
        if (id == 1) return this.err('系统角色禁止删除');
        let has = await this.model('admin_auth').where({ id }).find()
        if (think.isEmpty(has)) return this.err("数据不存在")

        let sun = await this.model('admin_map').where({ auth_id: id }).find()
        if (!think.isEmpty(sun)) return this.err("请先删除角色下的管理员")

        let rt = await this.model('admin_auth').where({ id }).delete();
        await this.adminOpLog('删除角色');
        return this.ok(rt)
    }

}