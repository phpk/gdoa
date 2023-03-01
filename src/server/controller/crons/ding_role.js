module.exports = class extends think.Controller {
    async indexAction(){
        let ck = await this.model('ding_role').find()
        if(think.isEmpty(ck)) {
            let listsub = await this.getRole();
            console.log(listsub)
            await this.model('ding_role').addMany(listsub, {replace: true});
        } 
    }
    async getRole() {
        let accToken = await this.dingToken();
        let postData = {
            "size":"100",
            "offset":"0"
        };
        let postUrl = `https://oapi.dingtalk.com/topapi/role/list?access_token=${accToken}`;
        let res = await this.fetch(postUrl, {method : "post",body: JSON.stringify(postData)});
        let data = await res.json();
        console.log(data)
        let listsub = [];
        if(data && data.errcode == 0) {
            let list = data.result.list;
            //await this.model('dept').addMany(listsub, {replace: true});
            if(list.length > 0) {
                list.forEach(el => {
                    let d = {
                        role_id : el.groupId,
                        name : el.name,
                        pid : 0
                    }
                    listsub.push(d)
                    if(el.roles.length > 0) {
                        el.roles.forEach(k => {
                            let s = {
                                role_id : k.id,
                                name : k.name,
                                pid : el.groupId
                            }
                            listsub.push(s)
                        })
                    }
                });
            }
        }
        return listsub
        //console.log(listsub)

    }
}