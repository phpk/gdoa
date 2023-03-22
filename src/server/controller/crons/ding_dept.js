module.exports = class extends think.Controller {
    async indexAction() {
        let ck = await this.model('ding_dept').find()
        if (think.isEmpty(ck)) {
            let listsub = await this.getDept();
            await this.model('ding_dept').addMany(listsub, { replace: true });
            return 1;
        } else {
            let has = await this.model('ding_dept').where({ is_sun: 0 }).find()
            if (think.isEmpty(has)) {
                console.log('is over');
                return 0;
            }
            let dept_id = has.dept_id;
            let data = await this.getDept(dept_id);
            if (data.length > 0)
                await this.model('ding_dept').addMany(data, { replace: true });
            await this.model('ding_dept').where({ dept_id }).update({
                is_sun: 1
            })
            return 1;
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
        let group_id = await this.session('groupId');
        if (data && data.errcode == 0) {
            listsub = data.result;
            listsub.forEach(d => {
                d.group_id = group_id
            });
            //await this.model('dept').addMany(listsub, {replace: true});
        }
        return listsub
        //console.log(listsub)

    }
}