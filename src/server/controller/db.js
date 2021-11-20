const Base = require('./base.js');

/**
 * @class
 * @apiDefine db 数据库管理
 */
module.exports = class extends Base {
    /**
     * @api {get} db/list 数据列表
     * @apiHeader {string} rttoken 必填
     * @apiGroup db
     */
    async listAction() {
        let list = await this.model('db').list();
        return this.success({ list });
    }
    /**
     * @api {get} db/update 更新缓存
     * @apiHeader {string} rttoken 必填
     * @apiGroup db
     */
    async updateAction() {
        await this.model('db').create();
        return this.success();
    }
    /**
     * @api {get} db/backup 备份数据
     * @apiHeader {string} rttoken 必填
     * @apiGroup db
     */
    async backupAction() {
        await this.model('db').backup();
        return this.success();
    }
    /**
     * @api {get} db/backupFile 列出备份数据文件
     * @apiHeader {string} rttoken 必填
     * @apiGroup db
     */
    async backupFileAction() {
        let list = await this.model('db').backupFile();
        return this.success(list)
    }
    /**
     * @api {get} db/reback 还原数据
     * @apiGroup db
     * @apiHeader {string} rttoken 必填
     */
    async rebackAction() {
        let file = this.post('file');
        await this.model('db').reback(file);
        return this.success()
    }
    /**
     * @api {get} db/delback 删除还原数据
     * @apiGroup db
     * @apiHeader {string} rttoken 必填
     */
    async delbackAction() {
        let file = this.post('file');
        await this.model('db').delBackupFile(file);
        return this.success()
    }
    /**
     * @api {get} db/doc 查看文档
     * @apiGroup db
     * @apiHeader {string} rttoken 必填
     */
    async docAction() {
        let rt = await this.service('md').db();
        return this.success(rt)
    }
    /**
     * @api {post} db/editTable 编辑表名/注释/autoId
     * @apiGroup db
     * @apiHeader {string} rttoken 必填
     */
    async editTableAction() {
        let data = this.post();
        //console.log(data)
        try {
            if(data.field == 'Auto_increment') {
                if(isNaN(data.value) || data.value < 1)
                    return this.fail('自增长id必须大于0')
                await this.model('db').editTableAutoId(data.table, data.value);
            }
            else if(data.field == 'Name') {
                await this.model('db').renameTable(data.old, data.value);
            }
            else if(data.field == 'Comment') {
                await this.model('db').editTableComment(data.table, data.value);
            }
            
            return this.success()
        } catch (error) {
            return this.fail(error.message)
        }
        
    }
    /**
     * @api {post} db/delTable 删除表
     * @apiGroup db
     * @apiHeader {string} rttoken 必填
     */
    async delTableAction() {
        let table = this.post('table');
        try {
            await this.model('db').drop(table);
            return this.success()
        } catch (e) {
            return this.fail(e.message)
        }
    }
    /**
     * @api {post} db/repair 修复表
     * @apiGroup db
     * @apiHeader {string} rttoken 必填
     */
    async repairAction() {
        let table = this.post('table');
        try {
            await this.model('db').repair(table);
            return this.success()
        } catch (e) {
            return this.fail(e.message)
        }
    }
    /**
     * @api {post} db/optimize 优化表
     * @apiGroup db
     * @apiHeader {string} rttoken 必填
     */
    async optimizeAction() {
        let table = this.post('table');
        try {
            await this.model('db').optimize(table);
            return this.success()
        } catch (e) {
            return this.fail(e.message)
        }
    }
    /**
     * @api {post} db/clear 清空表
     * @apiGroup db
     * @apiHeader {string} rttoken 必填
     */
    async clearAction() {
        let table = this.post('table');
        try {
            await this.model('db').clear(table);
            return this.success()
        } catch (e) {
            return this.fail(e.message)
        }
    }
    async fieldListAction() {
        let table = this.get('table');
        try {
            let list = await this.model('db').fieldList(table);
            let rt = [];
            list.forEach(d => {
                rt.push({
                    title: d.COLUMN_COMMENT ? d.COLUMN_COMMENT : d.COLUMN_NAME,
                    //title: d.COLUMN_NAME,
                    field: d.COLUMN_NAME,
                    align: 'center',
                    edit: 'text',
                    filter: true,
                    align: 'left',
                    sort : true
                })
            });
            return this.success([rt])
        } catch (e) {
            return this.fail(e.message)
        }
    }
    async fieldsAction() {
        let table = this.get('table');
        try {
            let data = await this.model('db').fieldList(table);
            let list = [];
            data.forEach(el => {
                list.push({
                    name: el.COLUMN_NAME,
                    comment: el.COLUMN_COMMENT,
                    type: el.COLUMN_TYPE,
                    isnull: el.IS_NULLABLE,
                    key: el.COLUMN_KEY,
                    extra: el.EXTRA,
                    default: el.COLUMN_DEFAULT,
                    order: el.ORDINAL_POSITION
                })
            });
            return this.success({list, count : list.length})
        } catch (e) {
            return this.fail(e.message)
        }
    }
    async listDataAction() {
        let { page, limit, param,table } = this.get();
        let wsql = {};
        if (param) wsql = this.parseSearch(param, wsql);
        let tname = table.replace(think.config('mysql.prefix'), '');
        let list = await this.model(tname)
            .where(wsql)
            .page(page, limit)
            .select();
        let count = await think.model(tname).where(wsql).count();
        //await this.adminViewLog('管理员列表');
        return this.success({ list, count })
    }
    async editDataAction() {
        let post = this.post(),
            table = post.table;
        if (this.model('db').sysTable(table))
            return this.fail('系统表数据不允许编辑');
        try {
            let tname = table.replace(think.config('mysql.prefix'), '');
            let whereSql = JSON.parse(post.data), sql = {};
            //delete whereSql[post.field];
            let keys = await this.model('db').getKey(post.table);
            if (!keys) return this.fail('该表无主键');
            for (let p in whereSql) {
                if (keys.includes(p)) {
                    if (p == post.field) {
                        sql[p] = old;
                    } else {
                        sql[p] = whereSql[p];
                    }
                }
            }
            let up = {};
            up[post.field] = post.value;
            let has = await this.model(tname).where(sql).find();
            if (!think.isEmpty(has)) {
                await this.model(tname).where(sql).update(up);
            } else {
                await this.model(tname).add(whereSql);
            }
            
            return this.success()
        } catch (e) {
            return this.fail(e.message)
        }
        
    }

    async delDataAction() {
        let post = this.post();
        //console.log(post)
        try {
            let whereSql = JSON.parse(post.data), sql = {};
            if (this.model('db').sysTable(post.table))
                return this.fail('系统表数据不允许删除');
            let keys = await this.model('db').getKey(post.table);
            if (!keys) return this.fail('该表无主键');
            for (let p in whereSql) {
                if (keys.includes(p)) {
                    sql[p] = whereSql[p];
                }
            }
            //console.log(sql)
            let tname = post.table.replace(think.config('mysql.prefix'), '');
            await this.model(tname).where(sql).delete();
            return this.success()
        } catch (e) {
            return this.fail(e.message)
        }
    }
    async delFieldAction() {
        //console.log(this.post())
        let { table, field } = this.post();
        try {
            await this.model('db').delField(table, field);
            return this.success()
        } catch (e) {
            return this.fail(e.message)
        }
    }
    async sortFieldAction() {
        let { table, field, t, sortField } = this.post();
        try {
            await this.model('db').sortField(table, field, t, sortField);
        } catch (e) {
            return this.fail(e.message)
        }
    }

}