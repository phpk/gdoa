module.exports = class extends think.Model {
    async chkAuth(type, user_id, data) {
        let has = await this.model('share').where({
            type,
            data_id: data.id,
            to_user_id: user_id,
            user_id: data.user_id
        }).find()
        if (think.isEmpty(has)) {
            return false;
        } else {
            return has;
        }
    }
    async addHistory(type, user_id, data, post) {
        let has = await this.chkAuth(type, user_id, data);
        if (has === false) {
            return false;
        }
        //未做任何动作则不添加
        if(data.title == post.title && data.content == post.content) {
            return false;
        }
        let save = {
            share_id: has.id,
            to_user_id: user_id,
            op_user_id: user_id,
            user_id: data.user_id,
            data_id: data.id,
            type: type,
            title: post.title,
            group_id: data.group_id,
            content: post.content,
            old_content: data.content,
            old_title: data.title,
            ref_id : post.ref_id ? post.ref_id : 0 //flow
        }
        await this.model('share_log').add(save)
        if (post.title != data.title) {
            await this.model('share').update({
                id: has.id,
                title: post.title
            })
        }
        return true;
    }
    async viewBefore(id, typeTable, userId) {
        id = id.toString();
        let isHistory = id.substring(0, 3);
        let historyData;
        if (isHistory == "000") {
            let history_id = id.substring(3, id.length) * 1;
            historyData = await this.model('share_log').where({ id: history_id }).find();
            if (think.isEmpty(historyData)) {
                return {
                    code : 1,
                    msg : '历史数据不存在'
                }
            }
            id = historyData.data_id;
        }
        //console.log(id)
        let data = await this.model(typeTable).where({ id }).find()
        if (think.isEmpty(data)) {
            return {
                code : 1,
                msg : '编辑数据为空'
            }
        }
        if (userId != data.user_id) {
            let isAuth = await this.chkAuth(typeTable, userId, data);
            if (isAuth === false) {
                return {
                    code : 1,
                    msg : '你没有查看权限'
                }
            }
        }
        if (isHistory == "000") {
            data.title = historyData.title;
            data.content = historyData.content;
            //data.url = historyData.content;//兼容
        }
        return {
            code : 0,
            data
        };
    }
}