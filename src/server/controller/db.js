const ThinkSessionFile = require('think-session-file');
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

}