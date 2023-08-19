
/**
 * 获取当前时间撮
 */
function now(t = '') {
    if (t == '') {
        return parseInt((new Date().getTime()) / 1000);
    } else {
        return parseInt((new Date(t).getTime()) / 1000);
    }
}

function randomStr(len = 16) {
    let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
        maxPos = $chars.length,
        pwd = '',
        i = 0;
    for (; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

/**
 * 列表搜索
 * @param {string} param 
 * @param {object} where 
 * @param {boolean} isTime 
 * @returns 
 */
function parseSearch(param, where = {}, isTime = true) {
    param = decodeURI(param);
    let arr = param.split('&');
    arr.forEach(item => {
        let k = item.split('=');
        //console.log(k);
        if (k[0].includes('<') && k[0].includes('>') && k[1]) {
            k[0] = k[0].replace('<', '').replace('>', '');
            k[1] = ['like', '%' + k[1] + '%'];
        }
        if (k[1] && k[1].includes('+-+')) {
            let kk = k[1].split('+-+');
            //console.log(kk);
            if (k[0].includes('time')) {
                if (isTime) {
                    kk[0] = parseInt(new Date(kk[0]).getTime() / 1000 - 8 * 3600);
                    kk[1] = parseInt(new Date(kk[1]).getTime() / 1000 + 86400 - 1 - 8 * 3600);
                }
            }
            k[1] = ['between', [kk[0], kk[1]]];
        }
        if (k[1]) {
            where[k[0]] = k[1];
        }
    })
    return where;
}
async function err(name, msg) {
    let data = {
        name: name,
        url: this.ctx.path,
        msg: msg,
        addtime: think.now()
    };
    await think.model('error').add(data);
}
// function mg(tabname) {
//     return think.mongo(tabname, 'mongo');
// }

async function getDingToken(id) {
    let conf = await this.cache(id + '_ding_setting');
    if (think.isEmpty(conf) || !conf.appKey) {
        return this.fail('请管理员在后台配置钉钉');
    }
    //await this.cache(id + '_ding_token', null);
    let token = await this.cache(id + '_ding_token');
    if (think.isEmpty(token)) {
        let accountUrl = `https://oapi.dingtalk.com/gettoken?appkey=${conf.appKey}&appsecret=${conf.appSecret}`;
        let resd = await this.fetch(accountUrl);
        let accToken = await resd.json();
        //console.log(accToken)
        token = accToken.access_token;
        await this.cache(id + '_ding_token', token, {
            timeout: 3600 * 1000
        });
    }
    return token;
}

module.exports = {
    now,
    parseSearch,
    err,
    randomStr,
    getDingToken
}