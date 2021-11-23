const Base = require('./base.js');
/**
 * @class
 * @apiDefine mod 系统模块管理
 */
module.exports = class extends Base {
    /**
     * @api {get} mod/list 系统配置类目列表
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
        let { page, limit } = this.get();

        let list = await this.model('mod').page(page, limit).select();
        let types = {
            1: '控制层',
            2: '模型层',
            3: '服务层'
        };
        list.forEach(d => {
            d.typeName = types[d.type];
        })
        let count = await this.model('mod').count();

        return this.success({ list, count })
    }
    /**
     * @api {get} mod/addBefore 模块添加前
     * @apiGroup mod
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  {number} id 模块id
     *
     * @apiSuccess (200) {type} name description
     *
     */
    async addBeforeAction() {
        //let authTree = await this.model('mod').authTree();
        let params = await this.model('params').select();
        let tableList = await this.model('mod').tableList();
        return this.success({params,tableList});
    }
    /**
     * @api {get} mod/add 添加模块
     * @apiGroup mod
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  {string} tags 模块标志
     * @apiParam  {string} name 模块名
     *
     * @apiSuccess (200) {type} name description
     *
     */
    async addAction() {
        let post = this.post();
        let key = post.key;
        let sys = ['mod', 'admin', 'db', 'form', 'auth', 'admin', 'api', 'index', 'logs', 'set','base','demo','cate'];
        if (sys.includes(key)) return this.fail('系统中存在相同模块');
        if (await this.hasData('mod', { key: key, type: post.type })) {
            return this.fail('系统中存在相同的模块');
        }
        if (post.params) {
            post.paramsList  = await think.model('params')
                .where({ id: ['in', post.params.split(',')] })
                .select();
        }
        console.log(post);
        await this.service('mod').createModNone(post);
        
        let add = {
            name: post.name,
            key: post.key,
            server_path: post.server_path,
            params: post.params,
            type : post.type,
            tables_main: post.tables_main,
            tables_more : post.tables_more,
            remark : post.remark
        }
        let id = await this.model('mod').add(add);
        return this.success(id);
    }
    /**
     * @api {get} mod/editBefore 模块编辑前
     * @apiGroup mod
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  {number} id 模块id
     *
     * @apiSuccess (200) {type} name description
     *
     */
    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('mod').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        let params = await this.model('params').select();
        let tableList = await this.model('mod').tableList();
        return this.success({data, params, tableList});
    }
    /**
     * @api {get} mod/eidt 编辑模块
     * @apiGroup mod
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  {string} remark 模块注释
     * @apiParam  {string} name 模块名
     *
     * @apiSuccess (200) {type} name description
     *
     */
    async editAction() {
        let post = this.post();
        //if (post.key) return this.fail('tags不允许编辑');
        let has = await this.model('mod').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        await this.model('mod').update(post);
        return this.success()
    }
    /**
     * @api {get} mod/delete 删除模块
     * @apiGroup mod
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  {number} id 模块id
     *
     * @apiSuccess (200) {type} name description
     *
     */
    async deleteAction() {
        let id = this.post('id');
        if (!await this.hasData('mod', { id }))
            return this.fail('数据不存在')
        await this.model('mod').where({ id }).delete()

        return this.success()
    }
}