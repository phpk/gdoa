const Base = require('./base.js');

module.exports = class extends Base {
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
