const WEBURL = `http://gdoa.roter.me/group/`
module.exports = class extends think.Model {
    async conf(id) {
        if(think.isEmpty(id)) return false;
        let conf = await think.cache(id + '_ding_setting');
        if (think.isEmpty(conf) || !conf.appKey) {
            //return this.fail('请管理员在后台配置钉钉');
            return false;
        }
        return conf;
    }
    async token(id) {
        if(think.isEmpty(id)) return false;
        let conf = await this.conf(id);
        //await this.cache(id + '_ding_token', null);
        let token = await think.cache(id + '_ding_token');
        if (think.isEmpty(token)) {
            let accountUrl = `https://oapi.dingtalk.com/gettoken?appkey=${conf.appKey}&appsecret=${conf.appSecret}`;
            let resd = await think.fetch(accountUrl);
            let accToken = await resd.json();
            //console.log(accToken)
            if(accToken && accToken.access_token) {
                token = accToken.access_token;
                await think.cache(id + '_ding_token', token, {
                    timeout: 3600 * 1000
                });
            }else{
                return false;
            }
            
        }
        return token;
    }
    async getUserLoginInfo(acctoken, code) {
        let postUrl = `https://oapi.dingtalk.com/topapi/v2/user/getuserinfo?access_token=${acctoken}`;
		let postData = {
			"code": code
		}
		//console.log(postData)
		let res = await think.fetch(postUrl, { method: "post", body: JSON.stringify(postData) });
		return await res.json();
		
    }
    async sendApproveMsg(id, uid, msg, url) {
        let acctoken = await this.token(id);
        if(!acctoken) return false;
        let conf = await this.conf(id);
        let sql;
        if(think.isNumber(uid)) {
            sql = {id : uid}
        }else{
            sql = {id : ["IN", uid]}
        }
        let useridList = await this.model('user').where(sql).getField('ding_user_id')
        let postData = {
            "agent_id" : conf.agentId,
            "userid_list" : useridList.join(","),
            "msg" : {
                "msgtype": "action_card",
                "action_card": {
                    "title": "审计消息",
                    "markdown": msg,
                    "btn_orientation": "1",
                    "btn_json_list": [
                        {
                            "title": "去查看",
                            "action_url": `dingtalk://dingtalkclient/action/openapp?corpid=${conf.corpId}&container_type=work_platform&app_id=0_${conf.agentId}&redirect_type=jump&redirect_url=${WEBURL}${url}`
                        }
                    ]
                }
            }
        }
        let postUrl = `https://oapi.dingtalk.com/topapi/message/corpconversation/asyncsend_v2?access_token=${acctoken}`
        //console.log(postUrl)
        //console.log(postData)
        let res = await think.fetch(postUrl, { method: "post", body: JSON.stringify(postData) });
		return await res.json();

    }
};
