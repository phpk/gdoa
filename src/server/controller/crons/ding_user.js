module.exports = class extends think.Controller {
    async indexAction() {
        let has = await this.model('ding_dept').where({ is_user: 0 }).find()
        if (think.isEmpty(has)) {
            console.log('is over');
            return;
        }
        let dept_id = has.dept_id
        let res = await this.getUsers(dept_id, has.cursor);
        let saveData = [];
        res.list.forEach(el => {
            let adata = {
                unionid : el.unionid,
                userid : el.userid.toString(),
                name : el.name ? el.name.toString() : el.name,
                avatar : el.avatar ? el.avatar : '',
                mobile : el.mobile ? el.mobile.toString() : '',
                telephone : el.telephone ? el.telephone.toString() : '',
                job_number : el.job_number ? el.job_number.toString() : '',
                title : el.title ? el.title : '',
                work_place : el.work_place ? el.work_place : '',
                email : el.email ? el.email : '',
                dept_id_list : el.dept_id_list ? el.dept_id_list.join(',') : '',
                hired_date : el.hired_date ? think.datetime(el.hired_date) : ''
            }
            saveData.push(adata)
            
        });
        //console.log(saveData)
        //console.log(res.list)
        await this.model('ding_user').addMany(saveData, {replace: true});
        if(!res.has_more) {
            await this.model('ding_dept').where({ dept_id }).update({
                is_user : 1
            })
        }else{
            await this.model('ding_dept').where({ dept_id }).update({
                is_user : 0,
                cursor : res.cursor
            })
        }
        
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
        //console.log(data)
        let listsub = [];
        if (data && data.errcode == 0) {
            listsub = data.result;
            //await this.model('dept').addMany(listsub, {replace: true});
        }
        return listsub
        //console.log(listsub)

    }
}