const jwt = require('jsonwebtoken');
/**
 * @class 基础类
 */
module.exports = class extends think.Controller {
  constructor(ctx) {
    super(ctx);
    this.userId = 0;
    this.groupId = 0;
  }
  async __before() {
    let adminId = await this.session('adminId');
    if(!think.isEmpty(adminId)) return true;
    //token校验
    if (!await this.checkToken()) return false;
    //权限验证
    if (!await this.checkAuth()) return false;
    //判断保活
    if (!await this.checkStatusTime()) return false;
    //if(this.isPost) {
      //this.post('group_id') = this.groupId;
      //this.post('user_id') = this.userId;
    //}
  }
  /**
   * 权限校验
   * @returns boolean 
   */
  async checkAuth() {
    let url = `${this.ctx.controller}/${this.ctx.action}`;
    //console.log(url)
    // if (this.ctx.module) {
    //   url = this.ctx.module + '/' + url;
    // }
    // if (this.ctx.pluginName) {
    //   url = this.ctx.pluginName + '/' + url;
    // }
    //console.log(url)
    let perms = await this.cache('group_perms_' + this.userId);
    if (!perms.includes(url)) {
      this.status = 400;
      this.ctx.body = {
        code: 400,
        message: 'auth error!'
      };
      return false;
    }
    return true;
  }
  /**
   * token校验
   * @returns boolean
   */
  async checkToken() {
    let headers = this.ctx.headers;
    //console.log(headers)
    if (!headers.group_token || headers.group_token == 'undefined') {
      this.status = 401;
      this.ctx.body = {
        code: 401,
        message: 'token none!'
      };
      return false;
    }
    //token验证
    let jwtChk = await this.chkJwt(headers.group_token);
    if (jwtChk.code != 0) {
      this.status = 402;
      this.ctx.body = jwtChk;
      return false;
    }

    return true;
  }
  /**
   * 判断保活
   * @returns boolean
   */
  async checkStatusTime() {
    let preTime = await this.session('GroupStatusTime'),
      configTime = this.config('statusTime') || 60 * 60;
    //过期
    if (!preTime || this.now() - preTime > configTime) {
      await this.session('GroupStatusTime', null);
      this.status = 406;
      this.ctx.body = {
        code: 406,
        message: '超过保活时间!'
      };
      return false;
    } else {
      //没过期则加时间
      await this.session('GroupStatusTime', this.now() + configTime)
      return true;
    }
  }
  /**
   * 校验jwt
   * @param {*} token 
   * @returns object
   */
  async chkJwt(token) {
    let salt = await this.session('GroupSalt'),
      userId = await this.session('userId');
    if (!salt || !userId) {
      return {
        code: 4021,
        message: 'session 不存在'
      };
    }
    //只允许一个帐号在一个端下登录
    let chkSalt = await this.cache('user_' + userId);
    if (!chkSalt || salt != chkSalt) {
      await this.clearSatus(userId);
      return {
        code: 4022,
        message: '有其他用户登录该账户'
      };
    }
    //校验
    try {
      let rt = await jwt.verify(token, salt);
      //过期
      if (rt.userId != userId) {
        await this.clearSatus(userId);
        await this.cache('user_' + userId, null);
        return {
          code: 4023,
          message: '认证过期'
        };
      }
      this.userId = userId;
      this.groupId = await this.session('groupId');
      return {
        code: 0
      };
    } catch (e) {
      return {
        code: 4024,
        message: e.message
      };
    }

  }
  /**
   * 清除状态
   * @param {number} userId 
   */
  async clearSatus(userId) {
    await this.session(null);
    //await this.cache('admin_' + userId, null);

  }
  /**
 * 列表搜索
 * @param {string} param 
 * @param {object} where 
 * @param {boolean} isTime 
 * @returns 
 */
  turnSearch(param, where = {}, isTime = true) {
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
    where.group_id = this.groupId;
    return where;
  }
  /**
   * 记录操作日志
   * @param {string} msg 
   * @param {array} out 
   */
  async adminOpLog(msg, out = []) {
    try {
      let postData = this.post();
      //删除敏感字段
      if (out.length > 0) {
        out.forEach(e => {
          delete postData[e];
        })
      }
      let saveData = {
        admin_id: this.userId,
        log: msg,
        data: JSON.stringify(postData),
        ip: this.ctx.ip,
        agent: this.ctx.userAgent,
        url: this.ctx.path,
        method: this.ctx.method,
        addtime: this.now(),
        type: 'admin_op'
      };
      await this.model('adminlog').add(saveData);
    } catch (error) {
      console.log(error)
    }

  }
  /**
   * 记录查看日志
   * @param {sting} msg 
   */
  async adminViewLog(msg) {
    try {
      let url = this.ctx.path,
        ip = this.ctx.ip;
      let has = await this.model('adminlog').where({
        admin_id: this.userId,
        type: 'admin_view'
      }).order("addtime desc").find();
      let saveData = {
        admin_id: this.userId,
        log: msg,
        ip: ip,
        agent: this.ctx.userAgent,
        url,
        method: this.ctx.method,
        addtime: this.now(),
        type: 'admin_view'
      };
      //如果之前没有访问
      if (think.isEmpty(has)) {
        await this.model('adminlog').add(saveData);
      } else {
        //过滤掉刷新
        if (has.url != url || has.log != msg) {
          //先添加新访问的页面
          await this.model('adminlog').add(saveData);
          //更新离开时间
          await this.model('adminlog')
            .where({ id: has.id })
            .update({
              leavetime: this.now()
            })
        }
      }

    } catch (error) {
      console.log(error)
    }
  }
  /**
   * 判断是否有数据
   * @param {string} tableName 
   * @param {object} sql 
   * @returns 
   */

  async hasData(tableName, sql) {
    let has = await this.model(tableName).where(sql).find();
    //console.log(has)
    if (!think.isEmpty(has)) {
      return true;
    }
    return false;
  }
  __after() {

  }
};
