const Base = require('./base.js');
/**
 * @class
 * @apiDefine logs 日志管理
 */
module.exports = class extends Base {
    /**
     * @api {get} logs/op 操作日志列表
     * @apiGroup logs
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  {number} page 页码
     * @apiParam  {number} limit 每页显示数据
     *
     * @apiSuccess (200) {type} name description
     *
     */
    async opAction() {
        let page = this.get('page') * 1 || 1,
            limit = this.get('limit') * 1 || 10;
        let wh = this.get('param'),
            wsql = {};
        if (wh) wsql = this.parseSearch(wh, wsql);

        let list = await this.model('admin_oplog')
            .alias('l')
            .field('l.*,u.admin_id,u.username')
            .join({
                table: 'admin',
                join: 'left',
                as: 'u',
                on: ['admin_id', 'admin_id']
            })
            .where(wsql)
            .page(page, limit)
            .order("l.addtime desc")
            .select();
        let count = await this.model('admin_oplog')
            .alias('l')
            .field('l.*,u.admin_id,u.name')
            .join({
                table: 'admin',
                join: 'left',
                as: 'u',
                on: ['admin_id', 'admin_id']
            })
            .where(wsql).count();
        await this.adminViewLog('管理员操作日志');
        return this.ok({ list, count })
    }
    /**
     * @api {get} logs/view 行为日志列表
     * @apiGroup logs
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  {number} page 页码
     * @apiParam  {number} limit 每页显示数据
     *
     * @apiSuccess (200) {type} name description
     *
     */
    async viewAction() {
        let page = this.get('page') * 1 || 1,
            limit = this.get('limit') * 1 || 10;
        let wh = this.get('param'),
            wsql = {};
        if (wh) wsql = this.parseSearch(wh, wsql);

        let list = await this.model('admin_viewlog')
            .alias('l')
            .field('l.*,u.admin_id,u.username')
            .join({
                table: 'admin',
                join: 'left',
                as: 'u',
                on: ['admin_id', 'admin_id']
            })
            .where(wsql)
            .page(page, limit)
            .order("l.addtime desc")
            .select();
        let count = await this.model('admin_viewlog')
            .alias('l')
            .field('l.*,u.admin_id,u.name')
            .join({
                table: 'admin',
                join: 'left',
                as: 'u',
                on: ['admin_id', 'admin_id']
            })
            .where(wsql).count();
        await this.adminViewLog('管理员行为日志');
        return this.ok({ list, count })
    }
    /**
     * @api {get} logs/err 错误日志列表
     * @apiGroup logs
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  {number} page 页码
     * @apiParam  {number} limit 每页显示数据
     *
     * @apiSuccess (200) {type} name description
     *
     */
    async errAction() {
        let page = this.get('page') * 1 || 1,
            limit = this.get('limit') * 1 || 10;
        let wh = this.get('param'),
            wsql = {};
        if (wh) wsql = this.parseSearch(wh, wsql);

        let list = await this.model('error')
            .alias('l')
            .field('l.*,u.admin_id,u.username')
            .join({
                table: 'admin',
                join: 'left',
                as: 'u',
                on: ['admin_id', 'admin_id']
            })
            .where(wsql)
            .page(page, limit)
            .order("l.addtime desc")
            .select();
        let count = await this.model('error')
            .alias('l')
            .field('l.*,u.admin_id,u.name')
            .join({
                table: 'admin',
                join: 'left',
                as: 'u',
                on: ['admin_id', 'admin_id']
            })
            .where(wsql).count();
        await this.adminViewLog('系统错误日志');
        return this.ok({ list, count })
    }
};
