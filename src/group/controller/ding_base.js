const Base = require('./base.js');
const TIMEOUT = 24 * 3600 * 1000 * 36500 //100年不过期
module.exports = class extends Base {
    //async __before() {
        //this.userId = await this.session('userId')
        //this.groupId = await this.session('groupId')
        //this.groupId = 1;
    //}
    async getConf() {
        return await this.cache(this.groupId + '_ding_setting');
    }
    async setConf(data) {
        await this.cache(this.groupId + '_ding_setting', data, {
            timeout: TIMEOUT
        });
    }
    async dingToken() {
        //await this.cache('ding_token', null)
        let token = await this.cache(this.groupId + '_ding_token');
        if (think.isEmpty(token)) {
            token = await this.getAccToken()
        }
        return token;
    }
    async getAccToken() {
        let conf = await this.getConf();
        if(think.isEmpty(conf)) return false;
        let accountUrl = 'https://oapi.dingtalk.com/gettoken?appkey=' + conf.appKey + '&appsecret=' + conf.appSecret;
        //console.log(accountUrl)
        let res = await this.fetch(accountUrl);
        let accToken = await res.json();
        if (accToken && accToken.access_token) {
            await this.cache(this.groupId + '_ding_token', accToken.access_token, {
                timeout: 3600 * 1000
            });
            return accToken.access_token;
        }else{
            return false;
        }
    }
}