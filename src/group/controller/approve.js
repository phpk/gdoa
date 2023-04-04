const Base = require('./base.js');
/**
 * @class
 * @apiDefine approve 审批流管理管理
 */

const dataType = require('./approve_type.js')
module.exports = class extends Base {
    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = this.turnSearch(param, {});
        let list = await this.model('approve').where(wsql).page(page, limit).order('id desc').select();
        list.forEach(d => {
            d.cname = dataType.find(e => e.id == d.type).name
        })
        let count = await this.model('approve').where(wsql).count();
        return this.success({ list, count })
    }
    async addBeforeAction() {
        let formData = await this.model('form')
            .where({ group_id: this.groupId })
            .select()
        return this.success({ formData, dataType })
    }
    async addAction() {
        let post = this.post();
        let type = post.type * 1;
        let ref_id = type < 2 ? post.ref_id * 1 : 0;
        let has = await this.model('approve')
            .where({
                group_id: this.groupId,
                type: type,
                ref_id: ref_id
            }).find()
        if (!think.isEmpty(has)) {
            return this.fail('你已添加过该引擎了')
        }
        let data = dataType.find(d => {
            return d.id == type
        })
        data.type = type;
        data.name = post.name;
        data.ref_id = ref_id;
        data.remark = post.remark;
        data.group_id = this.groupId;
        data.user_id = this.adminId;
        let id = await this.model('approve').add(data);
        return this.success(id);
    }

    async editAction() {
        let post = this.post();
        let has = await this.model('approve').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        let upData = {
            id: post.id,
            name: post.name,
            remark: post.remark
        }
        await this.model('approve').update(upData);
        return this.success()
    }

    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('approve').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        return this.success(data);
    }

    async delAction() {
        let id = this.post('id');
        if (!await this.hasData('approve', { id }))
            return this.fail('数据不存在')
        await this.model('approve').where({ id }).delete()
        return this.success()
    }
    /**
     * 状态管理
     */
    async statusListAction() {
        let { page, limit, param, aid } = this.get();
        let wsql = { group_id: this.groupId, approve_id: aid };
        if (param) wsql = this.turnSearch(param, wsql);
        let list = await this.model('approve_status').where(wsql).page(page, limit).order('id desc').select();
        list.forEach(d => {
            //d.cname = dataType.find(e => e.id == d.type).name
        })
        let count = await this.model('approve_status').where(wsql).count();
        return this.success({ list, count })
    }
    /**
     * 添加状态
     */
    async statusAddAction() {
        let post = this.post();
        let aid = post.aid * 1;
        if (!aid) {
            return this.fail('输入错误')
        }
        post.user_id = this.adminId;
        post.group_id = this.groupId;
        post.approve_id = aid;
        let has = await this.model('approve_status')
            .where({
                group_id: this.groupId,
                approve_id: aid
            })
            .order("val desc")
            .find()
        if (think.isEmpty(has)) {
            post.val = 2;
            post.back_val = 1;
            post.to_val = 3;
        } else {
            post.val = has.to_val;
            post.back_val = has.val;
            post.to_val = has.to_val + 1;
        }
        let id = await this.model('approve_status').add(post);
        return this.success(id);
    }
    /**
     * 编辑状态
     */
    async statusEditAction() {
        let post = this.post();
        let has = await this.model('approve_status').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        await this.model('approve_status').update(post);
        return this.success()
    }
    async statusEditBeforeAction() {
        let id = this.get('id')
        let has = await this.model('approve_status').where({ id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        return this.success(has)
    }
    /**
     * 删除状态
     */
    async statusDelAction() {
        let id = this.post('id') * 1;
        let has = await this.model('approve_status').where({ id }).find();
        if (think.isEmpty(has)) return this.fail('删除的数据不存在');
        let hasTo = await this.model('approve_status')
            .where({
                val: has.to_val,
                approve_id: has.approve_id
            })
            .find();
        if (!think.isEmpty(hasTo)) return this.fail('请从最后一个状态删除');
        let hasUser = await this.model('approve_auth')
            .where({
                approve_id: has.approve_id,
                status_id: id
            })
            .find()
        if (!think.isEmpty(hasUser)) return this.fail('该状态下存在权限用户');
        await this.model('approve_status').where({ id }).delete()
        return this.success()
    }
    /**
     * 用户管理
     */
    async userListAction() {
        let { page, limit, param, aid } = this.get();
        let wsql = { group_id: this.groupId, approve_id: aid };
        if (param) wsql = this.turnSearch(param, wsql);
        let list = await this.model('approve_auth').where(wsql).page(page, limit).order('id desc').select();
        let statusData = await this.service('approve').getStatus(aid);
        list.forEach(d => {
            d.statusName = statusData.find(e => e.approve_id == d.approve_id).name
        })
        let count = await this.model('approve_auth').where(wsql).count();
        return this.success({ list, count })
    }
    /**
     * 添加用户
     */
    async userAddAction() {

    }
    async userAddBeforeAction() {

    }
    /**
     * 编辑用户
     */
    async userEditBeforeAction() {

    }
    async userEditAction() {

    }
    /**
     * 删除用户
     */
    async userDelAction() {

    }
    /**
     * 查看日志
     */
    async msgListAction() {

    }
}