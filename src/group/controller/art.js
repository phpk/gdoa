const Base = require('./base.js');
const path = require('path');
const fs = require('fs');

/**
 * @class
 * @apiDefine article 文章管理
 */
const artCate = [
    {
        id : 1,
        name : '新闻'
    },
    {
        id : 2,
        name : '公告'
    },
    {
        id : 3,
        name : '技巧'
    },
]
module.exports = class extends Base {

    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = {user_id: this.userId};
        if (param) wsql = this.parseSearch(param, wsql);
        let list = await this.model('article').where(wsql).page(page, limit).order('id desc').select();
        list.forEach(d => {
            d.cname = artCate.find(c => c.id === d.cid).name;
        })
        let count = await this.model('article').where(wsql).count();
        return this.success({ list, count })
    }
    async addBeforeAction() {
        return this.success(artCate)
    }
    async addAction() {
        let post = this.post();
        post.user_id = this.userId;
        let id = await this.model('article').add(post);
        return this.success(id);
    }

    async editAction() {
        let post = this.post();
        let has = await this.model('article').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        await this.model('article').update(post);
        if(has.image && post.image != has.image) {
            fs.unlink(path.join(think.ROOT_PATH, 'www' + has.image), (e)=>{})
        }
        return this.success()
    }

    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('article').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        data.artCate = artCate;
        return this.success(data);
    }

    async delAction() {
        let id = this.post('id');
        if (!await this.hasData('article', { id }))
            return this.fail('数据不存在')
        await this.model('article').where({ id }).delete()
        return this.success()
    }
    async uploadAction() {
        const file = this.file('file[]');
        let canupload = ["png", "jpg", "jpeg", "gif", "wav"],
            end = file.path.split(".").pop();
        if (!canupload.includes(end)) return false;
        try {
            let name = Date.now() + "." + end,
                filepath = path.join(think.ROOT_PATH, 'www/upload/jpg/' + name);
            think.mkdir(path.dirname(filepath));
            const rename = think.promisify(fs.rename, fs);
            await rename(file.path, filepath);
            let filename = '/upload/jpg/' + name;
            return this.success({
                name: file.name,
                filename
            })
        } catch (e) {
            //console.log(e.message)
            return this.fail(e.message);
        }
    }
}