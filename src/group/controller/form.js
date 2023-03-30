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
        let { page, limit, param, fid } = this.get();
        fid = fid*1;
        page = page*1 - 1
        page = page < 0 ? 0 : page;
        let wStr = `( group_id = ${this.groupId} ) AND ( fid = ${fid} )`;
        if (param) wStr = this.parseJsonSearch(param, wStr);
        let sql = `SELECT * FROM rt_form_data WHERE ${wStr} ORDER BY id desc LIMIT ${page},${limit}`
        let list = await this.model('form_data').query(sql);
        list.forEach(d => {
            let val = JSON.parse(d.data)
            for(let p in val) {
                d[p] = val[p]
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
        post.user_id = this.adminId;
        //post.formdesign = JSON.parse(post.formdesign)
        //console.log(post)
        let id = await this.model('form').add(post);
        return this.success(id);
    }

    async editAction() {
        let post = this.post();
        let has = await this.model('form').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        await this.model('form').update(post);
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
        return this.success()
    }


    async addDataAction() {
        let post = this.post();
        post.group_id = this.groupId;
        post.user_id = this.adminId;
        //post.formdesign = JSON.parse(post.formdesign)
        //console.log(post)
        //post.data = JSON.stringify(post);
        let id = await this.model('form_data').add(post);
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