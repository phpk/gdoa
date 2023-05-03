const Base = require('./base.js');
const fs = require('fs');
const path = require('path');
/**
 * @class
 * @apiDefine svg svg编辑器管理
 */
module.exports = class extends Base {

    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = this.turnSearch(param, {user_id: this.userId});
        let list = await this.model('svg').where(wsql).page(page, limit).order('id desc').select();
        let count = await this.model('svg').where(wsql).count();
        return this.success({ list, count })
    }

    async addAction() {
        let post = this.getPost();
        let name = Date.now() + '.svg';
        let filepath = path.join(think.ROOT_PATH, 'www/upload/svg/' + name);
        fs.writeFileSync(filepath, post.content)
        let save = {
            user_id: this.userId,
            group_id : this.groupId,
            title: post.title,
            url: name
        }
        let id = await this.model('svg').add(save);
        //await this.adminOpLog('添加svg');
        return this.success(id);
    }

    async editAction() {
        let post = this.post();
        let has = await this.model('svg').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        let url = Date.now() + '.svg';
        let filepath = path.join(think.ROOT_PATH, 'www/upload/svg/' + url);
        fs.writeFileSync(filepath, post.content)
        let save = {
            title: post.title,
            url
        }
        await this.model('svg').where({id : post.id}).update(save);
        //await this.adminOpLog('编辑svg');
        //分享处理
        has.content = has.url;
        save.content = url;
        await this.model('share').addHistory('svg', this.userId, has, save);
        return this.success()
    }

    async editBeforeAction() {
        let id = this.get('id');
        // let data = await this.model('svg').where({ id }).find()
        // if (think.isEmpty(data)) return this.fail('数据为空')
        let rt = await this.model('share').viewBefore(id, 'svg', this.userId);
        if(rt.code > 0) {
            return this.fail(rt.msg)
        }
        let data = rt.data;
        data.url = data.content ? data.content : data.url;
        //data.content = data.url;
        return this.success(data);
    }

    async delAction() {
        let id = this.post('id');
        let data = await this.model('svg').where({ id }).find()
        if (think.isEmpty(data))
            return this.fail('数据不存在')
        await this.model('svg').where({ id }).delete()
        let filepath = path.join(think.ROOT_PATH, 'www/upload/svg/' + data.url)
        fs.unlink(filepath, res => { })
        //await this.adminOpLog('删除svg');
        return this.success()
    }
}