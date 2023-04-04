module.exports = class extends think.Service {
    async getApproveData(groupId) {
        return await think.cache(groupId + '_approve_data');
    }
    async getStatusData(groupId) {
        return await think.cache(groupId + '_status_data');
    }
    //提交审批
    async tickApprove(groupId, userId, typeId, refId, dataId, remark) {
        let approveCacheData = await this.getApproveData(groupId)
        if(think.isEmpty(approveCacheData)){
            return false;
        }
        let approveData = approveCacheData.find(d => d.type == typeId && d.ref_id == refId)
        if(think.isEmpty(approveData)){
            return false;
        }
        let statusCacheData = await this.getStatusData(groupId)
        if(think.isEmpty(statusCacheData)){
            return false;
        }
        let statusData = statusCacheData.find(d => d.approve_id == approveData.id && d.val === 2)
        if(think.isEmpty(statusData)){
            return false;
        }
        let has = await this.model('approve_list').where({
            group_id : groupId,
            user_id : userId,
            type : typeId,
            val:statusData.val,
            approve_id : approveData.id,
            status_id : statusData.id,
            ref_id : refId,
            data_id : dataId
        }).find()
        if(!think.isEmpty(has)){
            return false;
        }
        let userList = statusData.user_list.split(',')
        let save = []
        userList.forEach(op_id => {
            save.push({
                group_id : groupId,
                user_id : userId,
                op_id,
                type : typeId,
                val:statusData.val,
                approve_id : approveData.id,
                status_id : statusData.id,
                ref_id : refId,
                data_id : dataId,
                status : 0,
                remark,
                table : approveData.table,
                field : approveData.field,
                approve_name : approveData.name,
                status_name : statusData.name,
                color : statusData.color
            })
        })
        let listIds = await this.model('approve_list').addMany(save)
        let msgSave = []
        listIds.forEach((list_id, i) => {
            msgSave.push({
                to_user_id : userList[i],
                msg : statusData.my_msg,
                user_id : userId,
                group_id : groupId,
                type : typeId,
                list_id,
                ref_id : refId,
                isread : 0
            })
        })
        await this.model('approve_msg').addMany(msgSave)
    }
    
}