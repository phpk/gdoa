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
        let formList = await this.model('form').where({group_id : this.groupId}).select();
        let list = await this.model('approve').where(wsql).page(page, limit).order('id desc').select();
        list.forEach(d => {
            let data = dataType.find(e => e.id == d.type);
            d.cname = data ? data.name : ''
            if(d.ref_id > 0) {
                let formData = formList.find(f => f.id == d.ref_id)
                d.fname = formData ? formData.form_name : '';
            }else{
                d.fname = d.cname
            }
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
        data.user_id = this.userId;
        data.ding_notice = post.ding_notice;
        delete data.id;
        let id = await this.model('approve').add(data);
        await this.upApproveCache();
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
        await this.upApproveCache();
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
        await this.upApproveCache();
        return this.success()
    }
    /**
     * 状态管理
     */
    async statusListAction() {
        let { page, limit, param, aid } = this.get();
        let wsql = this.turnSearch(param, {approve_id: aid});
        let list = await this.model('approve_status').where(wsql).page(page, limit).order('id desc').select();
        
        let count = await this.model('approve_status').where(wsql).count();
        return this.success({ list, count })
    }
    async statusAddBeforeAction() {
        let userList = await this.model('user').where({group_id : this.groupId}).select()
        return this.success({userList})
    }
    /**
     * 添加状态
     */
    async statusAddAction() {
        let post = this.getPost();
        let aid = post.aid * 1;
        if (!aid) {
            return this.fail('输入错误')
        }
        //post.user_id = this.userId;
        //post.group_id = this.groupId;
        if(!post.user_list) {
            return this.fail('请选择用户')
        }
        let group_id = this.groupId;
        let user_id = this.userId;
        post.approve_id = aid;
        let has = await this.model('approve_status')
            .where({
                group_id,
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
        let userList = post.user_list.split(",")
        let userSave = []
        userList.forEach(d => {
            userSave.push({
                group_id,
                user_id,
                op_id : d,
                status_id : id,
                approve_id : aid
            })
        })
        await this.model('approve_auth').addMany(userSave)
        await this.upStatusCache();
        return this.success(id);
    }
    /**
     * 编辑状态
     */
    async statusEditAction() {
        let post = this.post();
        let has = await this.model('approve_status').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        if(!post.user_list) {
            return this.fail('请选择用户')
        }
        await this.model('approve_status').update(post);
        let group_id = this.groupId;
        let user_id = this.userId;
        await this.model('approve_auth').where({
            group_id,
            status_id : has.id,
            approve_id : has.approve_id
        }).delete()
        let userList = post.user_list.split(",")
        let userSave = []
        userList.forEach(d => {
            userSave.push({
                group_id,
                user_id,
                op_id : d,
                status_id : has.id,
                approve_id : has.approve_id
            })
        })
        await this.model('approve_auth').addMany(userSave)
        await this.upStatusCache();
        return this.success()
    }
    async statusEditBeforeAction() {
        let id = this.get('id')
        let has = await this.model('approve_status').where({ id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        has.userList = await this.model('user').where({group_id : this.groupId}).select()
        // let list = await this.model('approve_auth')
        // .where({group_id : this.groupId, approve_id : has.approve_id, status_id : has.id})
        // .getField('op_id');
        // has.user_list = list.join(',')

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
        // let hasUser = await this.model('approve_auth')
        //     .where({
        //         approve_id: has.approve_id,
        //         status_id: id
        //     })
        //     .find()
        // if (!think.isEmpty(hasUser)) return this.fail('该状态下存在权限用户');
        let hasList = await this.model('approve_list').where({status_id : id}).find()
        if(!think.isEmpty(hasList)) {
            return this.fail('状态中存在审核数据')
        }
        await this.model('approve_status').where({ id }).delete()
        await this.model('approve_auth').where({
            status_id : has.id,
            approve_id : has.approve_id
        }).delete()
        await this.upStatusCache();
        return this.success()
    }
    async contentAction() {
        let { page, limit, param, aid, uid, tid } = this.get();
        aid = aid ? aid*1 : 0;
        uid = uid ? uid*1 : 0;
        tid = tid ? tid*1 : 0;
        let sql = {}
        if(!think.isEmpty(aid)) {
            sql.approve_id = aid;
        }
        if(!think.isEmpty(uid)) {
            sql.user_id = uid;
        }
        if(!think.isEmpty(tid)) {
            sql.op_id = tid;
        }
        let wsql = this.turnSearch(param, sql);
        let list = await this.model('approve_list').where(wsql).page(page, limit).order('id desc').select();
        let userList = await this.model('user').where({group_id : this.groupId}).select()
        list.forEach(d => {
            d.op_name = userList.find(e => e.id == d.op_id).name
            d.user_name = userList.find(e => e.id == d.user_id).name
            d.infoDetail = dataType.find(e => e.id == d.type).info
        })
        let count = await this.model('approve_list').where(wsql).count();
        return this.success({ list, count })
    }
    //通过审核
    async passApproveAction() {
        let id = this.post('id')
        let remark = this.post('remark')
        let db = this.model('approve');
        await db.startTrans()
        try {
            let rt = await db.accessApprove(id , this.userId, remark);
            if(rt.code === 1) {
                db.rollback()
                return this.fail(rt.msg)
            }else{
                db.commit()
                return this.success()
            }

        } catch (e) {
            db.rollback()
            return this.fail(e.message)
        }
        
    }
    //打回初始
    async backOpenArrpoveAction() {
        let id = this.post('id')
        let remark = this.post('remark')
        let db = this.model('approve');
        await db.startTrans()
        try {
            let rt = await db.backOpenApprove(id , this.userId, remark);
            if(rt.code === 1) {
                db.rollback()
                return this.fail(rt.msg)
            }else{
                db.commit()
                return this.success()
            }
        } catch (e) {
            db.rollback()
            return this.fail(e.message)
        }
        
    }
    //打回上一步
    async backPrevArrpoveAction() {
        let id = this.post('id')
        let remark = this.post('remark')
        let db = this.model('approve');
        await db.startTrans()
        try {
            let rt = await db.backPrevArrpove(id , this.userId, remark);
            if(rt.code === 1) {
                db.rollback()
                return this.fail(rt.msg)
            }else{
                db.commit()
                return this.success()
            }
        } catch (e) {
            db.rollback()
            return this.fail(e.message)
        }
        
    }
    //删除审批流
    async delApproveListAction() {

    }
    /*
    async msgListAction() {
        let { page, limit, param, aid, uid, tid } = this.get();
        aid = aid ? aid*1 : 0;
        uid = uid ? uid*1 : 0;
        tid = tid ? tid*1 : 0;
        let sql = {}
        if(!think.isEmpty(aid)) {
            sql.approve_id = aid;
        }
        if(!think.isEmpty(uid)) {
            sql.user_id = uid;
        }
        if(!think.isEmpty(tid)) {
            sql.to_user_id = tid;
        }
        let wsql = this.turnSearch(param, sql);
        let list = await this.model('approve_msg').where(wsql).page(page, limit).order('id desc').select();
    
        let count = await this.model('approve_msg').where(wsql).count();
        return this.success({ list, count })
    }*/
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
    async upApproveCache() {
        let list = await this.model('approve').where({group_id : this.groupId}).select()
        list.forEach(d => {
            d.info = dataType.find(e => e.id == d.type);
        })
        await this.cache(this.groupId + '_approve_data', list, {
			timeout: 24 * 3600 * 1000 * 36500
		});
    }
    async upStatusCache() {
        let list = await this.model('approve_status').where({group_id : this.groupId}).select()
        await this.cache(this.groupId + '_status_data', list, {
			timeout: 24 * 3600 * 1000 * 36500
		});
    }
    /**
     * 查看日志
     */
    async msgListAction() {
        let { page, limit, param, uid, aid} = this.get();
        //console.log(uid)
        uid = uid ? uid*1 : 0;
        aid = aid ? aid*1 : 0;
        //console.log(uid)
        let sql = {}
        if(uid > 0) sql.to_user_id = uid;
        if(aid > 0) {
            let approveData = await this.model('approve').where({id : aid}).find()
            if(!think.isEmpty(approveData)) {
                sql.ref_id = approveData.ref_id;
                sql.type = approveData.type;
            }
        }
        let wsql = this.turnSearch(param, sql);
        let list = await this.model('approve_msg').where(wsql).page(page, limit).order('id desc').select();
        let userList = await this.model('user').where({group_id : this.groupId}).select()
        let msgType = {
            0 : '消息',
            1 : '代办',
            2 : '通知'
        }
        list.forEach(d => {
            d.name = userList.find(u => u.id == d.to_user_id).name
            d.msgtype = msgType[d.msg_type]
        })
        let count = await this.model('approve_msg').where(wsql).count();
        return this.success({ list, count })
    }
}