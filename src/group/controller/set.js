const Base = require('./base.js');
/**
 * @class
 * @apiDefine set 系统配置
 */
module.exports = class extends Base {

    async addAction() {
        let post = this.post();
        if (await this.hasData('set', { key: post.key }))
            return this.fail('系统中存在相同的配置标志');
        //console.log(post)
        post.admin_id = this.userId;
        let id = await this.model('set').add(post);
        return this.success(id);

    }
    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('set').where({ id }).find();

        if (think.isEmpty(data)) return this.fail('数据为空')
        return this.success(data);
    }
    async setKey(key, val) {
        let str = val.replace(new RegExp('\r?\n', 'g'), "");
        //console.log(str)
        let obj = eval("(" + str + ")");
        //console.log(obj)
        //console.log(JSON.parse(str))
        await this.cache('set:' + key, obj, {
            timeout: 24 * 3600 * 1000 * 3650 //十年不过期
        });
    }
    async editAction() {
        let post = this.post();
        let rt = await this.model('set').update(post);
        if (post.val != '') {
            await this.setKey(post.key, post.val);
        }
        return this.success(rt)
    }
    async listAction() {
        let { page, limit } = this.get();

        let list = await this.model('set').page(page, limit).select();
        let count = await this.model('set').count();

        return this.success({ list, count })
    }
    async deleteAction() {
        let id = this.post('id');
        let data = await this.model('set').where({ id }).find();

        if (think.isEmpty(data))
            return this.fail('数据不存在')
        await this.model('set').where({ id }).delete()
        await this.cache('set:' + data.key, null);
        return this.success()
    }
    /**
     * @api {post} set/enable 设置是否可用
     * @apiGroup set
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  {number} status 状态
     * @apiParam  {number} id
     * 
     * @apiSuccess (200) {type} name description
     *
     */
    async enableAction() {
        let post = this.post(),
            id = post.id;
        console.log(post)
        let has = await this.model('set').where({ id }).find();
        if (think.isEmpty(has))
            return this.fail("数据不存在");
        //console.log(post)

        let rt = await this.model('set')
            .where({ id })
            .update({
                enable: post.status
            })
        await this.adminOpLog('设置配置可用');
        if (post.status > 0) {
            await this.cache('set:' + has.key, null);
        } else {
            await this.setKey(has.key, has.val);
        }
        return this.success(rt)
    }
};