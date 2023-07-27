const Base = require('./base.js');
/**
 * @class
 * @apiDefine area 地区管理
 */
module.exports = class extends Base {

    async listAction() {
        let pid = this.get('pid')
        let data = await this.model('area').where({pid}).order('order_num asc').select();
        //如果数据量过大 直接设置有下游
        // data.forEach(async (el) => {
        //     el.haveChild = true;
        // });
        return this.success({data})
    }

    async addAction() {
        let post = this.post();
        let id = await this.model('area').add(post);
        await this.adminOpLog('添加地区');
        return this.success(id);
    }
    async addBeforeAction() {
        let areaTree = await this.model('area').getTree();
        return this.success(areaTree);
    }
    async enableAction() {
        let post = this.post(),
            id = post.id;

        if (!await this.hasData('area', { id }))
            return this.fail("数据不存在");

        let rt = await this.model('area')
            .where({ id })
            .update({
                status: post.status
            })
        await this.adminOpLog('设置地区可用');
        return this.success(rt)
    }
    async editAction() {
        let post = this.post();
        let has = await this.model('area').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        await this.model('area').where({id : post.id}).update(post);
        return this.success()
    }

    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('area').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        data.list = await this.model('area').getTree();
        if (data.pid > 0) {
            data.cname = await this.model('area').where({id : data.pid}).getField('name', true)
        } else {
            data.cname = '顶层地区'
        }
        return this.success(data);
    }

    async delAction() {
        let id = this.post('id');
        if (!await this.hasData('area', { id }))
            return this.fail('数据不存在')
        await this.model('area').where({ id }).delete()
        return this.success()
    }
}