const Base = require('./base.js');
/**
 * @class
 * @apiDefine form 表单引擎管理
 */
module.exports = class extends Base {

    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = this.turnSearch(param, {});
        let list = await this.model('form').where(wsql).page(page, limit).order('id desc').select();
        let count = await this.model('form').where(wsql).count();
        return this.success({ list, count })
    }
    parseJsonSearch(param, where = ``, isTime = true) {
        param = decodeURI(param);
        let arr = param.split('&');
        arr.forEach(item => {
            let k = item.split('=');
            if (k[1]) {
                where += ` AND ( data->'$.${k[0]}' = '${k[1]}' ) `
            }
        })
        return where;
    }
    async listDataAction() {
        let { page, limit, param, fid, uid } = this.get();
        fid = fid*1;
        uid = uid * 1;
        page = page*1 - 1;
        page = page < 0 ? 0 : page;
        let wStr = `( group_id = ${this.groupId} ) AND ( fid = ${fid} )`;
        if(!think.isEmpty(uid)) {
            wStr += ` AND ( user_id = ${uid} )`;
        }
        if (param) wStr = this.parseJsonSearch(param, wStr);
        let sql = `SELECT * FROM rt_form_data WHERE ${wStr} ORDER BY id desc LIMIT ${page},${limit}`
        let list = await this.model('form_data').query(sql);
        let userList = await this.model('user').where({group_id : this.groupId}).select()
        let approveData = await this.service('approve').getApproveData(this.groupId)
        let statusCacheData = await this.service('approve').getStatusData(this.groupId)
        let hasApprove = approveData.find(a => a.type === 1 && a.ref_id === fid)
        let statusData;
        if(!think.isEmpty(hasApprove)) {
            statusData = statusCacheData.filter(d => d.approve_id === hasApprove.id)
        }
        list.forEach(d => {
            let val = JSON.parse(d.data)
            for(let p in val) {
                d[p] = val[p]
            }
            if(d.user_id > 0) {
                d.user_name = userList.find(u => u.id == d.user_id).name
            }else {
                d.user_name = '游客'
            }
            
            if(!think.isEmpty(statusData)) {
                let statusVal = this.service('approve').getStatusValue(statusData, d.status)
                d._status_name = statusVal.name;
                d._status_color = statusVal.color;
            }
            
        })
        let Csql = `SELECT count(*) as num  FROM rt_form_data WHERE ${wStr}`
        let countData = await this.model('form_data').query(Csql);
        //console.log(countData)
        return this.success({ list, count : countData[0]['num'] })
    }

    async addAction() {
        let post = this.post();
        post.group_id = this.groupId;
        post.user_id = this.userId;
        //post.formdesign = JSON.parse(post.formdesign)
        //console.log(post)
        let id = await this.model('form').add(post);
        await this.upFormCache();
        //await 
        return this.success(id);
    }

    async editAction() {
        let post = this.post();
        let has = await this.model('form').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        await this.model('form').update(post);
        await this.upFormCache();
        return this.success()
    }

    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('form').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        data.formdesign = JSON.parse(data.formdesign)
        return this.success(data);
    }

    async delAction() {
        let id = this.post('id');
        if (!await this.hasData('form', { id }))
            return this.fail('数据不存在')
        await this.model('form').where({ id }).delete()
        await this.upFormCache();
        return this.success()
    }
    async upFormCache() {
        let list = await this.model('form').where({group_id : this.groupId}).select();
        await this.cache(this.groupId + '_form_data', list, {
			timeout: 24 * 3600 * 1000 * 36500
		});
        let userInfo = await this.model('user').where({id : this.userId}).find()
        //设置路由缓存
		await this.model('menu').cacheData(userInfo);
    }

    async addDataAction() {
        let post = this.post();
        let userId = this.userId;
        post.group_id = this.groupId;
        post.user_id = userId;
        //post.formdesign = JSON.parse(post.formdesign)
        //console.log(post)
        //post.data = JSON.stringify(post);
        let db = this.model('form_data');
        if(post.post_type*1 < 1) {
            post.status = 0;
            await this.model('form_data').add(post);
            return this.success()
        }
        await db.startTrans()
        try {
            let id = await this.model('form_data').add(post);
            let rt = await this.model('approve').tickApprove(this.groupId, userId, 1, post.fid, id, '');
            if(rt.code > 0) {
                db.rollback()
                return this.fail(rt.msg)
            }else{
                db.commit()
                return this.success(id);
            }
        } catch (e) {
            db.rollback()
            return this.fail(e.message)
        }
        
    }

    async editDataAction() {
        let post = this.post();
        //console.log(post)
        let has = await this.model('form_data').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        if(has.status > 0) {
            return this.fail('审核状态不可编辑')
        }
        let db = this.model('form_data');
        await db.startTrans()
        try {
            post.status = 1;
            await db.update(post);
            let rt = await this.model('approve').tickApprove(this.groupId, this.userId, 1, has.fid, has.id, '');
            if(rt.code > 0) {
                db.rollback()
                return this.fail(rt.msg)
            }else{
                db.commit()
                return this.success();
            }

        } catch (e) {
            db.rollback()
            return this.fail(e.message)
        }
        
    }
    async addDataBeforeAction() {
        let id = this.get('fid');
        let data = await this.model('form').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        data.formdesign = JSON.parse(data.formdesign)
        return this.success(data);
    }
    async editDataBeforeAction() {
        let id = this.get('id');
        let data = await this.model('form_data').where({ id }).find()
        let val = JSON.parse(data.data)
        for(let p in val) {
            data[p] = val[p]
        }
        if (think.isEmpty(data)) return this.fail('数据为空')
        let formData = await this.model('form').where({ id : data.fid }).find()
        if (think.isEmpty(formData)) return this.fail('表单数据为空')
        formData.formdesign = JSON.parse(formData.formdesign)
        
        return this.success({data,formData});
    }

    async delDataAction() {
        let id = this.post('id');
        if (!await this.hasData('form_data', { id }))
            return this.fail('数据不存在')
        await this.model('form_data').where({ id }).delete()
        return this.success()
    }
}