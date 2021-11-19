const ThinkSessionFile = require('think-session-file');
const Base = require('./base.js');

/**
 * @class
 * @apiDefine db 数据库管理
 */
module.exports = class extends Base {
    /**
     * @api {get} db/list 数据列表
     * @apiGroup db
     */
    async listAction() {
        let list = await this.model('db').list();
        return this.success({ list });
    }
    /**
     * @api {get} db/update 更新缓存
     * @apiGroup db
     */
    async updateAction() {
        await this.model('db').create();
        return this.success();
    }
    /**
     * @api {get} db/backup 备份数据
     * @apiGroup db
     */
    async backupAction() {
        await this.model('db').backup();
        return this.success();
    }
    /**
     * @api {get} db/backupFile 列出备份数据文件
     * @apiGroup db
     */
    async backupFileAction() {
        let list = await this.model('db').backupFile();
        return this.success(list)
    }
    /**
     * @api {get} db/reback 还原数据
     * @apiGroup db
     */
    async rebackAction() {
        let file = this.post('file');
        await this.model('db').reback(file);
        return this.success()
    }
    /**
     * @api {get} db/delback 删除还原数据
     * @apiGroup db
     */
    async delbackAction() {
        let file = this.post('file');
        await this.model('db').delBackupFile(file);
        return this.success()
    }
    async docAction() {
        let rt = await this.service('md').db();
        return this.success(rt)
    }

}