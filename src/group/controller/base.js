const jwt = require('jsonwebtoken');
/**
 * @class 基础类
 */
module.exports = class extends think.Controller {
  constructor(ctx) {
    super(ctx);
    this.userId = 0;
    this.groupId = 0;
    //this.userId = 0;
  }
  async __before() {
    this.groupId = await this.session('groupId');
    this.userId = await this.session("userId");
    //适配管理端
    // this.userId = await this.session('userId');
    // if (this.userId > 0) return true;
    //token校验
    if (!await this.checkToken()) return false;
    //权限验证
    if (!await this.checkAuth()) return false;

    
    //console.log(this.groupId);
    //console.log(this.userId)
    if (this.userId < 1 || this.groupId < 1) return false;
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
    let perms = await this.cache('group_perms_' + this.userId);
    if (!perms || !perms.perms || !perms.perms.includes(url)) {
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
    //console.log(this.ctx)
    if (!headers.grouptoken || headers.grouptoken == 'undefined') {
      this.status = 401;
      this.ctx.body = {
        code: 401,
        message: 'token none!'
      };
      return false;
    }
    //token验证
    let jwtChk = await this.chkJwt(headers.grouptoken);
    if (jwtChk.code != 0) {
      this.status = jwtChk.code;
      this.ctx.body = jwtChk.message;
      return false;
    }

    return true;
  }

  /**
   * 校验jwt
   * @param {*} token 
   * @returns object
   */
  async chkJwt(token) {
    let salt = await this.session('GroupSalt'),
      userId = this.userId;
    if (!salt || !userId) {
      return {
        code: 402,
        message: 'session 不存在'
      };
    }
    //校验
    try {
      let rt = await jwt.verify(token, salt);
      //console.log(rt)
      //过期
      if (rt.userId != userId) {
        await this.clearSatus(userId);
        return {
          code: 403,
          message: '认证过期'
        };
      }
      this.userId = rt.userId;

      return {
        code: 0
      };
    } catch (e) {

      return {
        code: 409,
        message: e.message
      };
    }

  }
  /**
   * 清除状态
   * @param {number} userId 
   */
  async clearSatus(userId) {
    //await this.session(null);
    //await this.cache('admin_' + userId, null);
    //await this.cache('user_' + userId, null);
    await this.cache('auth_' + userId, null);
    await this.cache('group_perms_' + userId, null);
    await this.session('userId', null);
    await this.session('groupId', null);

  }
  /**
 * 列表搜索
 * @param {string} param 
 * @param {object} where 
 * @param {boolean} isTime 
 * @returns 
 */
  turnSearch(param, where = {}, isTime = true) {
    if (param) {
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
    }

    where.group_id = this.groupId;
    //console.log(where)
    //适配管理端
    // if (this.userId > 0) {
    //   delete where.group_id;
    // }
    //console.log(where)
    return where;
  }
  getPost() {
    let data = this.post()
    data.group_id = this.groupId;
    data.user_id = this.userId;
    
    return data;
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
