const Base = require('./base.js');
/**
 * @class
 * @apiDefine form 表单引擎管理
 */
module.exports = class extends Base {

    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = {group_id : this.groupId};
        if (param) wsql = this.turnSearch(param, wsql);
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
        page = page*1 - 1
        page = page < 0 ? 0 : page;
        let wStr = `( group_id = ${this.groupId} ) AND ( fid = ${fid} )`;
        if(!think.isEmpty(uid)) {
            wStr += ` AND ( user_id = ${uid} )`;
        }
        if (param) wStr = this.parseJsonSearch(param, wStr);
        let sql = `SELECT * FROM rt_form_data WHERE ${wStr} ORDER BY id desc LIMIT ${page},${limit}`
        let list = await this.model('form_data').query(sql);
        let userList = await this.model('user').where({group_id : this.groupId}).select()
        list.forEach(d => {
            let val = JSON.parse(d.data)
            for(let p in val) {
                d[p] = val[p]
            }
            d.user_name = userList.find(u => u.id == d.user_id).name
        })
        let Csql = `SELECT count(*) as num  FROM rt_form_data WHERE ${wStr}`
        let countData = await this.model('form_data').query(Csql);
        //console.log(countData)
        return this.success({ list, count : countData[0]['num'] })
    }

    async addAction() {
        let post = this.post();
        post.group_id = this.groupId;
        post.user_id = this.adminId;
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
        post.group_id = this.groupId;
        post.user_id = this.adminId;
        //post.formdesign = JSON.parse(post.formdesign)
        //console.log(post)
        //post.data = JSON.stringify(post);
        let id = await this.model('form_data').add(post);
        await this.service('approve').tickApprove(this.groupId, this.userId, 1, post.fid, id, '');
        return this.success(id);
    }

    async editDataAction() {
        let post = this.post();
        //console.log(post)
        let has = await this.model('form_data').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        await this.model('form_data').update(post);
        return this.success()
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