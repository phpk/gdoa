module.exports = class extends think.Model {
    async getApproveData(groupId) {
        return await think.cache(groupId + '_approve_data');
    }
    async getStatusData(groupId) {
        return await think.cache(groupId + '_status_data');
    }
    getStatusValue(statusData, val) {
        if(val > 1) {
            let data = statusData.find(d => d.val === val)
            return {
                name : data.name,
                color : data.color
            }
        }
        else if(val === 1) {
            return {
                name : '待审核',
                color : 'layui-btn'
            }
        }else{
            return {
                name : '初始',
                color : 'layui-btn layui-btn-primary'
            }
        }
    }
    /**
     * 提交审批
     * @param {*} groupId 集团id
     * @param {*} userId 操作人id
     * @param {*} typeId 类型id
     * @param {*} refId 关联表单id
     * @param {*} dataId 关联数据id
     * @param {*} remark 
     * @returns 
     */
    async tickApprove(groupId, userId, typeId, refId, dataId, remark) {
        let hasData = {
            group_id : groupId,
            user_id : userId,
            type : typeId,
            ref_id : refId,
            data_id : dataId,
            remark
        }
        let approveAndStatus = await this.getApproveAndStatus(hasData)
        if (approveAndStatus.code > 0) {
            return approveAndStatus;
        }
        let approveData = approveAndStatus.approveData;
        let statusData = approveAndStatus.statusData;

        let has = await this.model('approve_list').where({
            group_id: groupId,
            user_id: userId,
            type: typeId,
            val: statusData.val,
            approve_id: approveData.id,
            status_id: statusData.id,
            ref_id: refId,
            data_id: dataId,
            status : 0
        }).find()
        if (!think.isEmpty(has)) {
            return {
                code :1,
                msg : '你已经提交过了'
            };
        }
        
        await this.addApprove(hasData, approveData, statusData, remark);
        //1待审核 0 被打回
        //console.log(approveData)
        await this.model(approveData.table).where({ id: dataId }).update({
            status: 1
        })
        return true;
    }
    async getUserHas(id, user_id) {
        let has = await this.model('approve_list').where({ id }).find()
        if (think.isEmpty(has)) {
            return {
                code: 1,
                msg: '数据不存在'
            }
        }
        if (has.status > 0) {
            return {
                code: 1,
                msg: '已经操作过了'
            }
        }
        let userInfo = await this.model('user').where({ id: user_id }).find()
        if (user_id != has.op_id) {
            //管理员可操作审核
            if (userInfo.isadmin < 1) {
                return {
                    code: 1,
                    msg: '你没有操作权限'
                }
            }
        }
        return { userInfo, has, code: 0 }
    }
    async getApproveAndStatus(has) {
        let approveCacheData = await this.getApproveData(has.group_id)
        if (think.isEmpty(approveCacheData)) {
            return {
                code: 1,
                msg: 'approveCacheData cache error'
            }
        }
        //let approveData = approveCacheData.find(d => d.id == has.approve_id)
        let approveData = approveCacheData.find(d => d.type == has.type && d.ref_id == has.ref_id)
        if (think.isEmpty(approveData)) {
            return {
                code: 1,
                msg: 'approveData cache error'
            }
        }
        let statusCacheData = await this.getStatusData(has.group_id)
        if (think.isEmpty(statusCacheData)) {
            return {
                code: 1,
                msg: 'statusCacheData cache error'
            }
        }
        let statusData;
        if(has.status_id) {
            statusData = statusCacheData.find(d => d.id === has.status_id)
        }else{
            statusData = statusCacheData.find(d => d.approve_id == approveData.id && d.val === 2)
        }
        
        if (think.isEmpty(statusData)) {
            return {
                code: 1,
                msg: 'old statusData cache error'
            }
        }
        return { approveData, statusCacheData, statusData, code: 0 }
    }
    
    async getPassNum(has, oldStatusData) {
        let accessList = await this.model('approve_list')
            .where({
                type: has.type,
                val: has.val,
                approve_id: has.approve_id,
                status_id: has.status_id,
                ref_id: has.ref_id,
                data_id: has.data_id
            })
            .field("id, status").select();
        let notOp = 0,
            hasPass = 0,
            hasBack = 0,
            accessLen = accessList.length,
            pass = false,
            back = false;
        accessList.forEach(d => {
            if (d.status === 0) {
                notOp++;
            }
            else if (d.status === 1) {
                hasPass++;
            }
            else if (d.status === 2) {
                hasBack++;
            }
        })
        //严格模式
        if (oldStatusData.pass_type == 0) {
            if(hasPass === accessLen) {
                pass = true;
            }
            //如果通过票数和驳回票数相同
            if(hasBack + hasPass === accessLen && hasBack === hasPass) {
                pass = true;
            }
        }
        //少数服从多数
        if (oldStatusData.pass_type == 2 && hasPass > hasBack && hasPass + hasBack == accessLen) {
            pass = true;
        }
        //一票通过
        if (oldStatusData.pass_type == 1) {
            pass = true;
        }
        if (notOp > 0) {
            pass = false;
        }
        //严格模式
        if (oldStatusData.back_type == 0) {
            if(hasBack === accessLen) {
                back = true;
            }
            //如果通过票数和驳回票数相同
            if(hasBack + hasPass === accessLen && hasBack === hasPass) {
                back = true;
            }
        }
        //少数服从多数
        if (oldStatusData.back_type == 2 && hasPass < hasBack && hasPass + hasBack == accessLen) {
            back = true;
        }
        //一票否决
        if (oldStatusData.back_type == 1) {
            back = true;
        }
        if (notOp > 0) {
            back = false;
        }
        return { pass, back, notOp, hasPass, hasBack, accessLen }
    }
    /**
     * 添加审计流
     * @param {*} has 
     * @param {*} approveData 
     * @param {*} statusData 
     * @param {*} remark 
     */
    async addApprove(has, approveData, statusData, remark) {
        let userList = statusData.user_list.split(',');
        let save = [];
        userList.forEach(op_id => {
            save.push({
                group_id: has.group_id,
                user_id: has.user_id,
                op_id,
                type: has.type,
                val: statusData.val,
                approve_id: approveData.id,
                status_id: statusData.id,
                ref_id: has.ref_id,
                data_id: has.data_id,
                status: 0,
                //remark,
                //pass_remark,
                table: approveData.table,
                field: approveData.field,
                approve_name: approveData.name,
                status_name: statusData.name,
                color: statusData.color
            })
        })
        let listIds = await this.model('approve_list').addMany(save)
        //给审核人员发送审核消息
        let msgSave = []
        listIds.forEach((list_id, i) => {
            msgSave.push({
                to_user_id: userList[i],
                msg: statusData.my_msg,
                user_id: has.user_id,
                group_id: has.group_id,
                type: has.type,
                list_id,
                ref_id: has.ref_id,
                isread: 0,
                msg_type : 1,
                remark
            })
        })
        await this.model('approve_msg').addMany(msgSave)
        if(statusData.ding_notice > 0) {
            await this.model('ding').sendApproveMsg(has.group_id, userList, statusData.my_msg, '')
        }
        
    }
    /**
     * 通过审批
     * @param {*} id 
     * @param {*} user_id 
     * @param {*} pass_remark 
     * @returns 
     */
    async accessApprove(id, user_id, pass_remark) {
        let userHas = await this.getUserHas(id, user_id);
        if (userHas.code > 0) {
            return userHas;
        }
        let userInfo = userHas.userInfo;
        let has = userHas.has;
        let approveAndStatus = await this.getApproveAndStatus(has)
        if (approveAndStatus.code > 0) {
            return approveAndStatus;
        }
        let approveData = approveAndStatus.approveData;
        let oldStatusData = approveAndStatus.statusData;
        let statusCacheData = approveAndStatus.statusCacheData;
        //部分通过和最后一步
        await this.model('approve_list').where({ id: has.id }).update({ status: 1, pass_remark })
        let passNum = await this.getPassNum(has, oldStatusData);
        //console.log(passNum)
        //return;
        //全部通过了，进入下一步
        if (passNum.pass) {
            //一票通过的情况下，该数据下的本状态都要更改
            if (oldStatusData.pass_type === 2) {
                await this.model('approve_list')
                    .where({
                        type: has.type,
                        val: has.val,
                        approve_id: has.approve_id,
                        status_id: has.status_id,
                        ref_id: has.ref_id,
                        data_id: has.data_id
                    }).update({ status: 1, pass_remark })
            }
            let statusData = statusCacheData.find(d => d.approve_id == has.approve_id && d.back_val === has.val)
            //最后一步
        //console.log(statusData)
            if (think.isEmpty(statusData)) {
                //await this.model('approve_list').where({ id: has.id }).update({ status: 1 })
                return {
                    code: 2,
                    msg: '没有下一步操作了'
                }
            }
            has.user_id = user_id;
            await this.addApprove(has, approveData, statusData, pass_remark);
            await this.model(approveData.table).where({ id: has.data_id }).update({
                status: statusData.val
            })

        }
        //给用户发送审核通过的消息
        let sendmsg = oldStatusData.to_msg.replace("{{username}}", userInfo.name);
        let msgSave = {
            to_user_id: has.user_id,
            msg: sendmsg,
            user_id: user_id,
            group_id: has.group_id,
            type: has.type,
            list_id: has.list_id,
            ref_id: has.ref_id,
            isread: 0,
            msg_type : 0,
            remark : pass_remark
        }
        await this.model('approve_msg').add(msgSave)
        if(oldStatusData.ding_notice > 0) {
            await this.model('ding').sendApproveMsg(has.group_id, has.user_id, sendmsg, '')
        }
        return { code: 0 };
    }
    /**
     * 打回初始，让用户从新提交审核
     * @param {*} id 
     * @param {*} user_id 
     * @param {*} back_remark 
     */
    async backOpenApprove(id, user_id, back_remark) {
        let userHas = await this.getUserHas(id, user_id);
        if (userHas.code > 0) {
            return userHas;
        }
        let userInfo = userHas.userInfo;
        let has = userHas.has;
        let approveAndStatus = await this.getApproveAndStatus(has)
        if (approveAndStatus.code > 0) {
            return userHas;
        }
        //let approveData = approveAndStatus.approveData;
        let oldStatusData = approveAndStatus.statusData;
        //let statusCacheData = approveAndStatus.statusCacheData;
        await this.model('approve_list').where({ id: has.id }).update({ status: 2, back_remark })
        let passNum = await this.getPassNum(has, oldStatusData);
        let toUserMsg = oldStatusData.back_msg.replace("{{username}}", userInfo.name);
        //执行回退
        if (passNum.back) {
            //一票否决情况下，该数据下的所有状态都要被打回
            if (oldStatusData.back_type === 2) {
                await this.model('approve_list')
                    .where({
                        type: has.type,
                        val: has.val,
                        approve_id: has.approve_id,
                        ref_id: has.ref_id,
                        data_id: has.data_id
                    }).update({ status: 2, back_remark })
            }

            await this.model(has.table).where({ id: has.data_id }).update({
                status: 0
            })
            toUserMsg += ',需要从新提交！';
        }
        //给用户发送打回的消息
        let msgSave = {
            to_user_id: has.user_id,
            msg: toUserMsg,
            user_id: user_id,
            group_id: has.group_id,
            type: has.type,
            list_id: has.list_id,
            ref_id: has.ref_id,
            isread: 0,
            msg_type : 0,
            remark : back_remark
        }
        await this.model('approve_msg').add(msgSave)
        if(oldStatusData.ding_notice > 0) {
            await this.model('ding').sendApproveMsg(has.group_id, has.user_id, toUserMsg, '')
        }

        return { code: 0 }
    }
    /**
     * 打回上一步，分一票否决和少数服从多数
     * @param {*} id 
     * @param {*} user_id 
     * @param {*} back_remark 
     */
    async backPrevArrpove(id, user_id, back_remark) {
        let userHas = await this.getUserHas(id, user_id);
        if (userHas.code > 0) {
            return userHas;
        }
        let userInfo = userHas.userInfo;
        let has = userHas.has;
        // if (has.val === 2) {
        //     return {
        //         code: 1,
        //         msg: '状态有误'
        //     }
        // }
        let approveAndStatus = await this.getApproveAndStatus(has)
        if (approveAndStatus.code > 0) {
            return userHas;
        }
        let approveData = approveAndStatus.approveData;
        let oldStatusData = approveAndStatus.statusData;
        let statusCacheData = approveAndStatus.statusCacheData;
        await this.model('approve_list').where({ id: has.id }).update({ status: 2, back_remark })
        let passNum = await this.getPassNum(has, oldStatusData);
        //console.log(passNum)
        //执行回退
        if (passNum.back) {
            //一票否决情况下，该数据下的本状态都要被打回
            if (oldStatusData.back_type === 2) {
                await this.model('approve_list')
                    .where({
                        type: has.type,
                        val: has.val,
                        approve_id: has.approve_id,
                        status_id: has.status_id,
                        ref_id: has.ref_id,
                        data_id: has.data_id
                    }).update({ status: 2, back_remark })
            }

            await this.model(approveData.table).where({ id: has.data_id }).update({
                status: oldStatusData.back_val
            })
            //添加新的审批流
            let statusData = statusCacheData.find(d => d.approve_id == has.approve_id && d.val == oldStatusData.back_val)
            //上一步
            //console.log(statusData)
            if (!think.isEmpty(statusData)) {
                // return {
                //     code: 2,
                //     msg: '没有上一步操作'
                // }
                has.user_id = user_id;
                await this.addApprove(has, approveData, statusData, back_remark);
            }
            
        }
        //给用户发送打回的消息
        let toUserMsg = oldStatusData.back_msg.replace("{{username}}", userInfo.name)
        let msgSave = {
            to_user_id: has.user_id,
            msg: toUserMsg,
            user_id: user_id,
            group_id: has.group_id,
            type: has.type,
            list_id: has.list_id,
            ref_id: has.ref_id,
            isread: 0,
            msg_type : 0,
            remark : back_remark
        }
        await this.model('approve_msg').add(msgSave)
        if(oldStatusData.ding_notice > 0) {
            await this.model('ding').sendApproveMsg(has.group_id, has.user_id, toUserMsg, '')
        }

        return { code: 0 }
    }

}