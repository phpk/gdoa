const Base = require('./base.js');

/**
 * @class
 * @apiDefine db 数据库管理
 */
module.exports = class extends Base {
    async listAction() {
        let list = await this.model('db').list();
        return this.success({ list });
    }
    async updateAction() {
        await this.model('db').create();
        return this.success();
    }
    async backupAction() {
        await this.model('db').backup();
        return this.success();
    }
    async backupFileAction() {
        let list = await this.model('db').backupFile();
        return this.success(list)
    }
    async rebackAction() {
        let file = this.post('file');
        await this.model('db').reback(file);
        return this.success()
    }
    async delbackAction() {
        let file = this.post('file');
        await this.model('db').delBackupFile(file);
        return this.success()
    }

}