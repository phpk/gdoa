const dingBase = require('./ding_base.js');
/**
 * @class
 * @apiDefine kanban 钉钉管理
 */
module.exports = class extends dingBase {
    async synchroAction() {
        let that = this;
        let type = this.get('type');
        let flag = false;
        let token = await this.getAccToken()
        if (!token) {
            return this.fail('请仔细设置钉钉配置')
        }
        if (type == 'dept') {
            await this.model('ding_dept').where({ is_sun: 1 }).update({ is_sun: 0 })
        }
        else if (type == 'user') {
            await this.model('ding_dept').where({ is_user: 1 }).update({ is_user: 0 })
        }
        let errmsg = `访问ip不在白名单之中`
        let func = async () => {
            setTimeout(async () => {
                //console.log(type)
                let rt = await that[type]();
                //console.log(rt)
                if (rt.code == 1) {
                    await func()
                } else if (rt.code == 0) {
                    flag = true
                    //return that.success()
                } else {
                    errmsg = rt.msg
                    //return that.fail(rt.msg)
                }
            }, 1000)
        }
        await func();
        if (flag) {
            return this.success()
        } else {
            return this.fail(errmsg)
        }
    }
    //同步钉钉数据到数据库
    async dataechoAction() {
        //let db = this.model('user');
        //console.log(this.userId)
        try {
            let rules = await this.model('user').where({id : this.userId}).getField("rules", true)
            //db.startTrans();
            await this.dataRole(rules);
            let deptData = await this.dataDept(rules);
            await this.dataUser(rules, deptData);
            //db.commit();
            return this.success();
        } catch (e) {
            console.log(e)
            //db.rollback();
            return this.fail(e.message)
        }
    }
    async dataRole(rules) {
        let list = await this.model('ding_role')
        .where({ group_id: this.groupId })
        .order('role_id desc')
        .select();
        //console.log(list);
        if(!think.isEmpty(list) && list.length > 0) {
            let maxId = await this.model('user_role').max('id');
            let group_id = this.groupId;
            let user_id = this.userId;
            let save = [];
            //let rules = await this.model('user').where({id : this.userId}).getField("rules", true)
            //console.log(rules)
            let sids = []

            let loopFunc = (pid, nid) => {
                list.forEach(d => {
                    if(d.pid === pid && !sids.includes(d.role_id)) {
                        maxId++;
                        sids.push(d.role_id)
                        save.push({
                            id : maxId,
                            name : d.name,
                            pid : nid,
                            group_id,
                            user_id,
                            rules,
                            old_id : d.role_id,
                            have_child : 0
                        })
                    }
                })
                if(save.length < list.length) {
                    let findPid, newPid;
                    list.forEach(d => {
                        if(!sids.includes(d.role_id)) {
                            let top = save.find(s => s.old_id == d.pid)
                            //console.log(top)
                            if(top) {
                                newPid = top.id;
                                findPid = d.pid;
                                save.forEach(n => {
                                    if(n.id == top.id) {
                                        n.have_child = 1;
                                    }
                                })
                            }
                        }
                    })
                    //console.log(findPid)
                    if(!think.isEmpty(findPid) && !think.isEmpty(newPid)) {
                        loopFunc(findPid,newPid)
                    }
                }
            }
            loopFunc(0, 0)
            //console.log(save)
            if(save.length > 0) {
                await this.model('user_role').addMany(save, {ignore : true})
            }
        }
    }
    async dataDept(rules) {
        let list = await this.model('ding_dept')
        .where({ group_id: this.groupId })
        .order('dept_id desc')
        .select();
        //console.log(list);
        let save = [];
        if(!think.isEmpty(list) && list.length > 0) {
            let maxId = await this.model('user_dept').max('id');
            let group_id = this.groupId;
            let user_id = this.userId;
            //console.log(rules)
            let sids = []
            let loopFunc = (pid, nid) => {
                list.forEach(d => {
                    if(d.parent_id === pid && !sids.includes(d.dept_id)) {
                        maxId++;
                        sids.push(d.dept_id)
                        save.push({
                            id : maxId,
                            name : d.name,
                            pid : nid,
                            group_id,
                            user_id,
                            rules,
                            old_id : d.dept_id,
                            have_child : 0
                        })
                    }
                })
                if(save.length < list.length) {
                    let findPid, newPid;
                    list.forEach(d => {
                        if(!sids.includes(d.dept_id)) {
                            let top = save.find(s => s.old_id == d.parent_id)
                            //console.log(top)
                            if(top) {
                                newPid = top.id;
                                findPid = d.parent_id;
                                save.forEach(n => {
                                    if(n.id == top.id) {
                                        n.have_child = 1;
                                    }
                                })
                            }
                        }
                    })
                    //console.log(findPid)
                    if(!think.isEmpty(findPid) && !think.isEmpty(newPid)) {
                        loopFunc(findPid,newPid)
                    }
                }
            }
            loopFunc(1, 0)
            //console.log(save)
            if(save.length > 0) {
                await this.model('user_dept').addMany(save, {ignore : true})
            }
        }
        return save;
    }
    async dataUser(rules, deptData) {
        let list = await this.model('ding_user')
        .where({ group_id: this.groupId })
        .select();
        if(think.isEmpty(list) || list.length < 1){
            return false;
        }
        let salt = this.service('login').randomString()
		let password = this.service('login').createPassword("123456", salt);
        let save = []
        let userAuth = think.config('userExt', undefined, 'group');
        let group_id = this.groupId;
        const getTime = (t) => {
            if(t) {
                return think.datetime(new Date(t).getTime(), 'YYYY-MM-DD')
            }else{
                return think.datetime(new Date().getTime(), 'YYYY-MM-DD')
            }
            
        }
        list.forEach(d => {
            let s = {
                username : d.unionid,
                name : d.name,
                password,
                salt,
                ding_user_id : d.userid,
                avatar : d.avatar,
                remark : d.title,
                email : d.email,
                phone : d.mobile,
                hired_date : getTime(d.hired_date),
                job_number : d.job_number,
                work_place : d.work_place,
                telephone : d.telephone,
                group_id,
                rules,
                users : userAuth
            }
            if(d.dept_id_list) {
                let deptArr = d.dept_id_list.split(',')
                let deptIds = []
                deptArr.forEach(id => {
                    deptData.forEach(ii => {
                        if(id == ii.old_id) {
                            deptIds.push(ii.id)
                        }
                    })
                })
                s.users.user_dept = deptIds.join(",")
            }
            s.users = JSON.stringify(s.users)
            save.push(s)
        })
        if(save.length > 0) {
            await this.model('user').addMany(save, {ignore : true})
        }
    }
    async listDeptAction() {
        let list = await this.model('ding_dept')
            .where({ group_id: this.groupId })
            .order('dept_id desc')
            .select();
        //await this.adminViewLog('钉钉部门列表');
        return this.success(list)
    }
    async userListAction() {
        let { page, limit, param } = this.get();
        let wsql = {group_id: this.groupId};
        if (param) wsql = this.turnSearch(param, wsql);
        let list = await this.model('ding_user').where(wsql).page(page, limit).select();
        let count = await this.model('ding_user').where(wsql).count();
        //await this.adminViewLog('钉钉用户列表');
        return this.success({ list, count })
    }
    async listRoleAction() {
        let list = await this.model('ding_role')
        .where({ group_id: this.groupId })
        .order('role_id desc')
        .select();
        //await this.adminViewLog('钉钉角色列表');
        return this.success(list)
    }
    async settingAction() {
        let setKey = this.groupId + '_ding_setting'

        if (this.isPost) {
            await this.cache(setKey, this.post(), {
                timeout: 24 * 3600 * 1000 * 36500
            });
            return this.success()
        } else {
            let setting = await this.cache(setKey);
            return this.success(setting)
        }
    }

    async dept() {
        //console.log(this)
        let ck = await this.model('ding_dept').find()
        //console.log(ck)
        if (think.isEmpty(ck)) {
            let listsub = await this.getDept();
            if (listsub && listsub.sub_msg) {
                return {
                    code: -1,
                    msg: listsub.sub_msg
                };
            }
            await this.model('ding_dept').addMany(listsub, { ignore: true });
            return {
                code: 1
            };
        } else {
            let has = await this.model('ding_dept').where({ is_sun: 0 }).find()
            //console.log(has)
            if (think.isEmpty(has)) {
                console.log('is over');
                return {
                    code: 0
                };
            }
            let dept_id = has.dept_id;
            let data = await this.getDept(dept_id);
            if (data && data.sub_msg) {
                return {
                    code: -1,
                    msg: data.sub_msg
                };
            }
            if (data.length > 0) {
                await this.model('ding_dept').addMany(data, { ignore: true });
            }

            await this.model('ding_dept').where({ dept_id }).update({
                is_sun: 1
            })
            return {
                code: 1
            };
        }
    }
    async getDept(deptId = 1) {
        let accToken = await this.dingToken();
        let postData = {
            "language": "zh_CN",
            "dept_id": deptId
        };
        let postUrl = `https://oapi.dingtalk.com/topapi/v2/department/listsub?access_token=${accToken}`;
        let res = await this.fetch(postUrl, { method: "post", body: JSON.stringify(postData) });
        let data = await res.json();
        //console.log(data)
        let listsub = [];
        let group_id = this.groupId;
        if (data && data.errcode == 0) {
            listsub = data.result;
            listsub.forEach(d => {
                d.group_id = group_id
            });
            //await this.model('dept').addMany(listsub, {replace: true});
            return listsub
        } else {
            return data;
        }

        //console.log(listsub)

    }

    async role() {
        let listsub = await this.getRole();
        if (listsub && listsub.sub_msg) {
            return {
                code: -1,
                msg: listsub.sub_msg
            };
        }
        //console.log(listsub)
        await this.model('ding_role').addMany(listsub, { ignore: true });
        return {
            code: 0
        };
    }
    async getRole() {
        let accToken = await this.dingToken();
        let postData = {
            "size": "100",
            "offset": "0"
        };
        let postUrl = `https://oapi.dingtalk.com/topapi/role/list?access_token=${accToken}`;
        let res = await this.fetch(postUrl, { method: "post", body: JSON.stringify(postData) });
        let data = await res.json();
        //console.log(data)
        let listsub = [];
        let group_id = this.groupId;
        if (data && data.errcode == 0) {
            let list = data.result.list;
            //await this.model('dept').addMany(listsub, {replace: true});
            if (list.length > 0) {
                list.forEach(el => {
                    let d = {
                        role_id: el.groupId,
                        name: el.name,
                        pid: 0,
                        group_id
                    }
                    listsub.push(d)
                    if (el.roles.length > 0) {
                        el.roles.forEach(k => {
                            let s = {
                                role_id: k.id,
                                name: k.name,
                                pid: el.groupId,
                                group_id
                            }
                            listsub.push(s)
                        })
                    }
                });
            }
            return listsub
        } else {
            return data
        }

        //console.log(listsub)

    }
    async user() {
        let has = await this.model('ding_dept').where({ is_user: 0 }).find()
        if (think.isEmpty(has)) {
            console.log('is over');
            return {
                code: 0
            };
        }
        let dept_id = has.dept_id
        let res = await this.getUsers(dept_id, has.cursor);
        if (res && res.sub_msg) {
            return {
                code: -1,
                msg: res.sub_msg
            };
        }
        let saveData = [];
        let group_id = this.groupId;
        res.list.forEach(el => {
            let adata = {
                unionid: el.unionid,
                userid: el.userid.toString(),
                name: el.name ? el.name.toString() : el.name,
                avatar: el.avatar ? el.avatar : '',
                mobile: el.mobile ? el.mobile.toString() : '',
                telephone: el.telephone ? el.telephone.toString() : '',
                job_number: el.job_number ? el.job_number.toString() : '',
                title: el.title ? el.title : '',
                work_place: el.work_place ? el.work_place : '',
                email: el.email ? el.email : '',
                dept_id_list: el.dept_id_list ? el.dept_id_list.join(',') : '',
                hired_date: el.hired_date ? think.datetime(el.hired_date) : '',
                group_id
            }
            saveData.push(adata)

        });
        //console.log(saveData)
        //console.log(res.list)
        await this.model('ding_user').addMany(saveData, { ignore: true });
        if (!res.has_more) {
            await this.model('ding_dept').where({ dept_id }).update({
                is_user: 1
            })
        } else {
            await this.model('ding_dept').where({ dept_id }).update({
                is_user: 0,
                cursor: res.cursor
            })
        }
        return {
            code: 1
        };

    }
    async getUsers(dept_id = 1, cursor = "0") {
        let accToken = await this.dingToken();
        let postData = {
            cursor,
            "contain_access_limit": "true",
            "size": "100",
            "order_field": "modify_desc",
            "language": "zh_CN",
            dept_id
        };
        let postUrl = `https://oapi.dingtalk.com/topapi/v2/user/list?access_token=${accToken}`;
        let res = await this.fetch(postUrl, { method: "post", body: JSON.stringify(postData) });
        let data = await res.json();
        console.log(data)
        let listsub = [];
        if (data && data.errcode == 0) {
            listsub = data.result;
            return listsub
            //await this.model('dept').addMany(listsub, {replace: true});
        } else {
            return data
        }

        //console.log(listsub)

    }
}