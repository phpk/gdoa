const Base = require('./base.js');
const fs = require('fs');
const path = require('path');
/**
 * @class
 * @apiDefine picedit 图片编辑器管理
 */
module.exports = class extends Base {

    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = this.turnSearch(param, {user_id: this.userId});
        let list = await this.model('picedit').where(wsql).page(page, limit).order('id desc').select();
        let count = await this.model('picedit').where(wsql).count();
        return this.success({ list, count })
    }

    async addAction() {
        let post = this.getPost();
        let content = Date.now() + '.png';
        let filepath = path.join(think.ROOT_PATH, 'www/upload/picedit/' + content);
        let base64Data = post.content.split('base64,')[1].replace(/\s/g, "+");
        var dataBuffer = Buffer.from(base64Data, 'base64');
        fs.writeFileSync(filepath, dataBuffer)
        let save = {
            user_id: this.userId,
            group_id : this.groupId,
            title: post.title,
            content
        }
        let id = await this.model('picedit').add(save);
        return this.success(id);
    }

    async editAction() {
        let post = this.post();
        let has = await this.model('picedit').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        let content = Date.now() + '.png';
        let filepath = path.join(think.ROOT_PATH, 'www/upload/picedit/' + content);
        let base64Data = post.content.split('base64,')[1].replace(/\s/g, "+");
        var dataBuffer = Buffer.from(base64Data, 'base64');
        fs.writeFileSync(filepath, dataBuffer)

        let save = {
            title : has.title,
            content
        }
        await this.model('picedit').where({id : post.id}).update(save);
        //分享处理
        await this.model('share').addHistory('picedit', this.userId, has, save);
        return this.success()
    }

    async editBeforeAction() {
        let id = this.get('id');
        // let data = await this.model('picedit').where({ id }).find()
        // if (think.isEmpty(data)) return this.fail('数据为空')
        let rt = await this.model('share').viewBefore(id, 'picedit', this.userId);
        if(rt.code > 0) {
            return this.fail(rt.msg)
        }
        let data = rt.data;
        data.url = '/upload/picedit/' + data.content;
        return this.success(data);
    }

    async delAction() {
        let id = this.post('id'),
            has = await this.model('picedit').where({id}).find()
        if (think.isEmpty(has))
            return this.fail('数据不存在')
        await this.model('picedit').where({ id }).delete()
        let filepath = path.join(think.ROOT_PATH, 'www/upload/picedit/' + has.content)
        fs.unlink(filepath, res => { })
        return this.success()
    }
    async editNameAction() {
        let id = this.post('id');
        if (!await this.hasData('picedit', { id }))
            return this.fail('数据不存在')
        await this.model('picedit').where({ id }).update({ title: this.post('value')})
        return this.success()
    }
}