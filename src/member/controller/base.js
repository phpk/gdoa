const jwt = require('jsonwebtoken');
/**
 * @class 基础类
 */
module.exports = class extends think.Controller {
  constructor(ctx) {
    super(ctx);
    this.memberId = 0;
  }
  async __before() {
    //适配管理端
    this.adminId = await this.session('adminId');
    if (this.adminId > 0) return true;
    //token校验
    if (!await this.checkToken()) return false;
    //权限验证
    if (!await this.checkAuth()) return false;
    //console.log(this.groupId);
    //console.log(this.memberId)
    if (this.memberId < 1 || this.groupId < 1) return false;
  }
  /**
   * 权限校验
   * @returns boolean 
   */
  async checkAuth() {
    let url = `${this.ctx.controller}/${this.ctx.action}`;
    //console.log(url)
    let perms = await this.cache('member_perms_' + this.memberId);
    if (!perms.perms.includes(url)) {
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
    if (!headers.member_token || headers.member_token == 'undefined') {
      this.status = 401;
      this.ctx.body = {
        code: 401,
        message: 'token none!'
      };
      return false;
    }
    //token验证
    let jwtChk = await this.chkJwt(headers.member_token);
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
      memberId = await this.session('memberId');
    if (!salt || !memberId) {
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
      if (rt.memberId != memberId) {
        await this.clearSatus(memberId);
        return {
          code: 403,
          message: '认证过期'
        };
      }
      this.memberId = memberId;

      return {
        code: 0
      };
    } catch (e) {

      return {
        code: 404,
        message: e.message
      };
    }

  }
  /**
   * 清除状态
   * @param {number} memberId 
   */
  async clearSatus(memberId) {
    //await this.session(null);
    //await this.cache('admin_' + memberId, null);
    //await this.cache('user_' + memberId, null);
    await this.cache('member_' + memberId, null);
    await this.cache('member_perms_' + memberId, null);
    await this.session('memberId', null);

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

    where.member_id = this.memberId;
    //console.log(where)
    //适配管理端
    if (this.adminId > 0) {
      delete where.member_id;
    }
    if(Object.keys(where) < 1) {
      where = {}
    }
    //console.log(where)
    return where;
  }
  getPost() {
    let data = this.post()
    data.member_id = this.memberId;
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
