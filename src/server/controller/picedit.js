const Base = require('./base.js');
const fs = require('fs');
const path = require('path');
const rename = think.promisify(fs.rename, fs);
/**
 * @class
 * @apiDefine picedit 图片编辑器管理
 */
module.exports = class extends Base {

    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = {};
        if (param) wsql = this.parseSearch(param, wsql);
        let list = await this.model('picedit').where(wsql).page(page, limit).order('id desc').select();
        let count = await this.model('picedit').where(wsql).count();
        return this.success({ list, count })
    }

    async addAction() {
        let post = this.post();
        post.user_id = this.adminId;
        post.add_time = this.now();
        //console.log(post)
        let name = Date.now() + post.title,
            filepath = path.join(think.ROOT_PATH, 'www/upload/picedit/' + name);
        fs.writeFileSync(filepath, post.content);
        let save = {
            user_id: this.adminId,
            add_time: this.now(),
            title: post.title,
            content : name
        }
        let id = await this.model('picedit').add(save);
        return this.success(id);
    }

    async editAction() {
        let post = this.post();
        let has = await this.model('picedit').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        post.update_time = this.now();
        let name = has.content,
            filepath = path.join(think.ROOT_PATH, 'www/upload/picedit/' + name);
        fs.writeFileSync(filepath, post.content);
        let save = {
            update_time: this.now(),
            title: post.title,
            content: name
        }
        await this.model('picedit').where({id : post.id}).update(save);
        return this.success()
    }

    async editBeforeAction() {
        let id = this.post('id');
        let data = await this.model('picedit').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        let name = data.content,
            filepath = path.join(think.ROOT_PATH, 'www/upload/picedit/' + name);
        let file = fs.readFileSync(filepath, 'utf-8')
        data.file = file;
        return this.success(data);
    }

    async delAction() {
        let id = this.post('id');
        if (!await this.hasData('picedit', { id }))
            return this.fail('数据不存在')
        await this.model('picedit').where({ id }).delete()
        return this.success()
    }
}