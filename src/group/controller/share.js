const Base = require('./base.js');
/**
 * @class
 * @apiDefine 分享管理
 */
const shareCate = {
    'baiban': {
        'name': '白板',
        'edit': `/libs/baiban/index.html?bid=`,
        'view': `/libs/baiban/index.html?bid=`
    },
    'mind': {
        'name': '思维导图',
        'edit': '/libs/mind/index.html?id=',
        'view': '/libs/mind/index.html?id='
    },
    'excel': {
        'name': '表格',
        'edit': '/res/group/excel/edit.html?id=',
        'view': '/res/group/excel/edit.html?id='
    },
    'flow': {
        'name': '流程图',
        'edit': {
            1 : '/libs/flow/graph/index.html?id=',
			2 : '/libs/flow/editors/diagrameditor.html?id=',
		    3 : '/libs/flow/editors/processeditor.html?id=',
			4 : '/libs/flow/editors/workfloweditor.html?id=',
			5 : '/libs/flow/top/index.html?id='
        },
        'view': {
            1 : '/libs/flow/graph/index.html?id=',
			2 : '/libs/flow/editors/diagrameditor.html?id=',
		    3 : '/libs/flow/editors/processeditor.html?id=',
			4 : '/libs/flow/editors/workfloweditor.html?id=',
			5 : '/libs/flow/top/index.html?id='
        }
    },
    'gant': {
        'name': '甘特图',
        'edit': '/libs/gantt/index.html?id=',
        'view': '/libs/gantt/index.html?id='
    },
    // 'planday': {
    //     'name': '日程计划',
    //     'edit': '',
    //     'view': ''
    // },
    'picedit': {
        'name': '图片',
        'edit': '/libs/imgeditor/index.html?id=',
        'view': '/res/group/picedit/view.html?id='
    },
    'svg': {
        'name': 'SVG',
        'edit': '/res/group/svgedit/edit.html?id=',
        'view': '/res/group/svgedit/view.html?id='
    },
    'doc_cate': {
        'name': '文集',
        'edit': '/res/group/doc/editmd.html?id=',
        'view': '/res/group/doc/view.html?id='
    },
    'ppt': {
        'name': '演示文稿',
        'edit': '/libs/ppt/index.html?id=',
        'view': '/libs/ppt/index.html?id='
    },
    'word': {
        'name': '文档',
        'edit': '/libs/word/index.html?id=',
        'view': '/res/group/word/view.html?id='
    },
    'txt': {
        'name': '文本',
        'edit': '/libs/text/index.html?id=',
        'view': '/libs/text/index.html?id='
    }
}
module.exports = class extends Base {
    /**
     * 分享给用户
     */
    async touserBeforeAction() {
        let type = this.get('type');
        if (think.isEmpty(shareCate[type])) {
            return this.fail('分类错误')
        }
        let id = this.get('id') * 1;
        if (think.isEmpty(id)) {
            return this.fail('id error')
        }
        let has = await this.model(type).where({ id }).find()
        if (think.isEmpty(has)) {
            return this.fail('分享的数据不存在')
        }
        let userlist = await this.model('user').where({ group_id: this.groupId }).select();
        let datalist = await this.model('share').where({
            group_id: this.groupId,
            data_id: id,
            type,
            user_id: this.userId
        }).select()
        let data = { userlist }
        if (!think.isEmpty(datalist) && datalist.length > 0) {
            data.can_edit = datalist[0].can_edit;
            //data.can_out = datalist[0].can_out;
            let to_user_id = datalist.map(d => {
                return d.to_user_id;
            })
            data.to_user_id = to_user_id.join(",")

        }
        data.title = has.title;
        return this.success(data)
    }
    async touserAction() {
        let type = this.post('type');
        if (think.isEmpty(shareCate[type])) {
            return this.fail('分类错误')
        }
        let data_id = this.post('data_id') * 1;
        if (think.isEmpty(data_id)) {
            return this.fail('data_id error')
        }
        let has = await this.model(type).where({ id: data_id }).find()
        if (think.isEmpty(has)) {
            return this.fail('分享的数据不存在')
        }
        //let title = this.post('title');
        let can_edit = this.post('can_edit') * 1;
        //let can_out = this.post("can_out") * 1;
        let to_user_id = this.post('to_user_id');
        // if(to_user_id == this.userId) {
        //     return this.fail('您不能分享给自己')
        // }
        let ref_id = this.post('ref_id') * 1;
        let db = this.model('share');
        await db.startTrans()
        try {
            let hasDel = await db.where({
                type,
                data_id,
                user_id: this.userId,
                group_id: this.groupId
            })
                .find();
            if (!think.isEmpty(hasDel)) {
                await db.where({
                    type,
                    data_id,
                    user_id: this.userId,
                    group_id: this.groupId
                })
                    .delete()
            }

            if (!think.isEmpty(to_user_id)) {
                let save = []
                to_user_id.split(',').forEach(tid => {
                    //if (tid != this.userId) {
                    save.push({
                        user_id: this.userId,
                        to_user_id: tid,
                        group_id: this.groupId,
                        data_id,
                        type,
                        title: has.title,
                        can_edit,
                        //can_out
                        ref_id
                    })
                    //}
                })
                //console.log(save)
                if (save.length > 0) {
                    await db.addMany(save)
                }
            }
            await db.commit()
            return this.success()
        } catch (e) {
            await db.rollback()
            return this.fail(e.message)
        }


    }
    /**
     * 分享给我的
     */
    async tomeAction() {
        let {
            page,
            limit,
            param
        } = this.get();
        let wsql = this.turnSearch(param, { to_user_id: this.userId });
        let list = await this.model('share').where(wsql).page(page, limit).order('id desc').select();
        let userlist = await this.model('user').where({ group_id: this.groupId }).select();
        list.forEach(d => {
            d.typename = shareCate[d.type]['name']
            d.username = userlist.find(u => u.id === d.user_id).name
            if(d.ref_id > 0) {
                d.editurl = shareCate[d.type]['edit'][d.ref_id] + d.data_id
                d.viewurl = shareCate[d.type]['view'][d.ref_id] + d.data_id
            }else{
                d.editurl = shareCate[d.type]['edit'] + d.data_id
                d.viewurl = shareCate[d.type]['view'] + d.data_id
            }
            
        })
        let count = await this.model('share').where(wsql).count();
        return this.success({
            list,
            count,
            shareCate
        })
    }
    /**
     * 我分享的
     */
    async myAction() {
        let {
            page,
            limit,
            param
        } = this.get();
        let wsql = this.turnSearch(param, { user_id: this.userId });
        let list = await this.model('share').where(wsql).page(page, limit).order('id desc').select();
        let userlist = await this.model('user').where({ group_id: this.groupId }).select();
        list.forEach(d => {
            d.typename = shareCate[d.type]['name']
            d.username = userlist.find(u => u.id === d.to_user_id).name
            if(d.ref_id > 0) {
                d.editurl = shareCate[d.type]['edit'][d.ref_id] + d.data_id
                d.viewurl = shareCate[d.type]['view'][d.ref_id] + d.data_id
            }else{
                d.editurl = shareCate[d.type]['edit'] + d.data_id
                d.viewurl = shareCate[d.type]['view'] + d.data_id
            }
        })
        let count = await this.model('share').where(wsql).count();
        return this.success({
            list,
            count,
            shareCate
        })
    }
    async historyAction() {
        let {
            page,
            limit,
            param,
            data_id,
            type
        } = this.get();
        data_id = data_id * 1;
        //console.log(data_id)
        if (!data_id || data_id < 1) {
            return this.fail('data_id error')
        }
        let wsql = this.turnSearch(param, { data_id, type });
        let list = await this.model('share_log').where(wsql).page(page, limit).order('id desc').select();
        let userlist = await this.model('user').where({ group_id: this.groupId }).select();
        list.forEach(d => {
            d.toname = userlist.find(u => u.id === d.to_user_id).name
            d.opname = userlist.find(u => u.id === d.op_user_id).name
            d.username = userlist.find(u => u.id === d.user_id).name
            d.viewurl = shareCate[d.type]['view'] + "000" + d.id
            if(d.ref_id > 0) {
                d.viewurl = shareCate[d.type]['view'][d.ref_id] + "000" + d.id
            }else{
                d.viewurl = shareCate[d.type]['view'] + "000" + d.id
            }
        })
        let count = await this.model('share_log').where(wsql).count();
        return this.success({
            list,
            count,
            shareCate
        })
    }
    async rebackAction() {
        let id = this.post('id') * 1;
        if (id < 1) return this.fail('id error');
        let logData = await this.model('share_log').where({ id }).find()
        if (think.isEmpty(logData)) return this.fail('数据不存在')

        let userIds = await this.model('share').where({
            type: logData.type,
            data_id: logData.data_id,
            user_id: logData.user_id
        }).getField('to_user_id');
        
        if (!think.isArray(userIds) || !userIds.includes(this.userId)) {
            return this.fail('您没有回滚权限')
        }
        let save = {
            share_id: logData.share_id,
            to_user_id: logData.to_user_id,
            op_user_id: this.userId,
            user_id: logData.user_id,
            data_id: logData.data_id,
            type: logData.type,
            title: logData.old_title,
            group_id: logData.group_id,
            content: logData.old_content,
            old_content: logData.content,
            old_title: logData.title
        }
        await this.model('share_log').add(save)
        if (logData.old_title != logData.title) {
            await this.model('share')
                .where({
                    type: logData.type,
                    data_id: logData.data_id,
                    user_id: logData.user_id,
                    to_user_id: logData.to_user_id
                })
                .update({
                    title: logData.old_title
                })
        }
        await this.model(logData.type).where({ id: logData.data_id }).update({
            title: logData.old_title,
            content: logData.old_content
        })
        return this.success()
    }
}