const userBase = require('./user_base.js');
/**
 * @class
 * @apiDefine user 用户管理
 */
module.exports = class extends userBase {

    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = this.turnSearch(param, {});
        let list = await this.model('user').where(wsql).page(page, limit).order('id desc').select();
        let count = await this.model('user').where(wsql).count();
        return this.success({ list, count })
    }
    async addBeforeAction() {
        let wsql = { group_id: this.groupId }
        let companys = await this.getCompanyData();
        let roles = await this.getRoleData();
        let stores = await this.getStoreData();
        let depts = await this.getDeptData();
        let pos = await this.getPosData();
        let stocks = await this.getStockData();
        let projects = await this.getProjectData();
        //let areas = await this.getSysArea();
        let userlist = await this.model('user').where(wsql).select();
        // users.forEach(d => {
        //     d.name = d.username;
        // })
        return this.success({ companys, roles, stores, depts, pos, stocks, userlist, projects })
    }
    async addAction() {
        let post = this.getPost();
        delete post.user_id;
        if(!post.group_id || post.group_id < 1) {
            return this.fail('租户id不存在')
          }
        console.log(post)
        let has = await this.model('user')
            .where({ username: post.username })
            .find()
        if (!think.isEmpty(has)) return this.fail('系统中存在相同的用户名')
        let ckNumData = await this.model('user_group').where({id : this.groupId}).find()
        if(think.isEmpty(ckNumData)) {
            return this.fail('租户不存在')
        }
        if(ckNumData.limit_user < ckNumData.use_user) {
            return this.fail('人数已达上限')
        }
        post.salt = this.service('login').randomString()
        post.password = this.service('login').createPassword(post.password, post.salt);
        let parseData = await this.parsePost(post)
        post = parseData.post
        //console.log(post)
        //return this.fail('test');
        let uid = await this.model('user').add(post);
        if(parseData.authObj.length > 0) {
            parseData.authObj.forEach(d => {
                d.user_id = uid;
                d.group_id = this.groupId;
            })
            await this.model('user_auth').addMany(parseData.authObj)
        }
        let useUser = await this.model('user').where({group_id : this.groupId}).count()
        await this.model("user_group").update({
            id : ckNumData.id,
            use_user : useUser
        })

        return this.success(uid);
    }
    async parsePost(post) {
        let userAuth = think.config('userExt', undefined, 'group');
        //console.log(userAuth)
        let ext = {}
        for (let p in userAuth) {
            if (post['ext_' + p]) {
                ext[p] = post['ext_' + p]
            } else {
                ext[p] = userAuth[p]
            }
        }

        let userType = post.userType * 1;
        if (userType != 1) {
            ext.user = userType
        }
        //console.log(ext)
        post.users = JSON.stringify(ext)
        let rtObj = await this.parseRules(ext)
        post.rules = rtObj.arr.join(',')
        return {post, authObj : rtObj.obj}
    }
    async parseRules(ext) {
        let companys = await this.getCompanyData();
        let roles = await this.getRoleData();
        let stores = await this.getStoreData();
        let depts = await this.getDeptData();
        let pos = await this.getPosData();
        let stocks = await this.getStockData();
        let projects = await this.getProjectData();
        let rtObj = { arr: [], obj: [] }
        rtObj = this._parseRules(companys, ext, "user_company", rtObj)
        rtObj = this._parseRules(roles, ext, "user_role", rtObj)
        rtObj = this._parseRules(stores, ext, "user_store", rtObj)
        rtObj = this._parseRules(depts, ext, "user_dept", rtObj)
        rtObj = this._parseRules(pos, ext, "user_pos", rtObj)
        rtObj = this._parseRules(stocks, ext, "stock_storehouse", rtObj)
        rtObj = this._parseRules(projects, ext, "project", rtObj)
        console.log(ext)
        if(!think.isEmpty(ext.user_area) && ext.user_area != -1) {
            let areaArr = ext.user_area.split(','),areaData = []
            areaArr.forEach(aid => {
                areaData.push({
                    id : aid
                })
            })
            rtObj = this._parseRules(areaData, ext, "user_area", rtObj)
        }
        if(!think.isNumber(ext.user) && ext.user != -1 && ext.user != 0) {
            let userArr = ext.user.split(','),userData = []
            userArr.forEach(uid => {
                userData.push({
                    id : uid
                })
            })
            rtObj = this._parseRules(userData, ext, "user", rtObj)
        }
        return rtObj;
    }
    _parseRules(data, extData, name, rtObj) {
        let ext = extData[name]
        if (!think.isEmpty(ext) && ext != -1) {
            let arr = ext.split(',')
            //console.log(arr)
            data.forEach(d => {
                if (arr.includes(d.id + "")) {
                    rtObj.obj.push({
                        auth_id: d.id,
                        flag: name
                    })
                    if (d.rules && d.rules != -1) {
                        let rulesArr = d.rules.split(',')
                        //console.log(rulesArr)
                        if (rulesArr.length > 0) {
                            rulesArr.forEach(id => {
                                if (id && !rtObj.arr.includes(id)) {
                                    rtObj.arr.push(id)
                                }
                            })
                        }

                    }
                }
            })
        }
        return rtObj;
    }
    async editAction() {
        let post = this.post();
        let has = await this.model('user').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        if(post.password) {
            post.salt = this.service('login').randomString()
            post.password = this.service('login').createPassword(post.password, post.salt);
        }

        let parseData = await this.parsePost(post)
        post = parseData.post
        //console.log(post)
        //return this.fail('test');
        await this.model('user').update(post);
        if(parseData.authObj.length > 0) {
            await this.model('user_auth').where({user_id : has.id}).delete();
            parseData.authObj.forEach(d => {
                d.user_id = has.id;
                d.group_id = this.groupId;
            })
            await this.model('user_auth').addMany(parseData.authObj)
        }
        return this.success()
    }

    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('user').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        let wsql = { group_id: this.groupId }
        data.companys = await this.getCompanyData();
        data.roles = await this.getRoleData();
        data.stores = await this.getStoreData();
        data.depts = await this.getDeptData();
        data.pos = await this.getPosData();
        data.stocks = await this.getStockData();
        data.projects = await this.getProjectData();
        //let areas = await this.getSysArea();
        data.userlist = await this.model('user').where(wsql).select();
        let ext = JSON.parse(data.users);
        for(let p in ext) {
            data["ext_" + p] = ext[p];
        }
        delete data.password;
        return this.success(data);
    }

    async delAction() {
        let id = this.post('id');
        let has = await this.model('user').where({ id }).find()
        if (think.isEmpty(has))
            return this.fail('数据不存在')
        if (id == this.userId) {
            return this.fail('您不能删除自己')
        }
        await this.model('user').where({ id }).delete()
        return this.success()
    }
    async changepwdAction() {
        let {oldpwd, newpwd} = this.post();
        let user = await this.model('user').where({id : this.userId}).find();
        if(think.isEmpty(user)){
            return this.fail("用户不存在")
        }
        let pwd = this.service('login').createPassword(oldpwd, user.salt);
		//console.log(pwd)
		if (pwd != user.password) {
			return this.fail('原密码错误');
		}
        let password = this.service('login').createPassword(newpwd, user.salt);
        if(password != pwd) {
            await this.model('user').where({id : this.userId}).update({
                password
            })
        }
        
        return this.success()
    }

}