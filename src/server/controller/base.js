const jwt = require('jsonwebtoken');

module.exports = class extends think.Controller {
  constructor(ctx) {
    super(ctx);
    this.adminId = 0;
  }
  async __before() {
    let headers = this.ctx.headers;
    //console.log(headers)
    if (!headers.rttoken) {
      this.status = 403;
      this.body = {
        code: 403,
        message : 'token none!'
      };
      return;
    }
    //token验证
    let jwtChk = await this.chkJwt(headers.rttoken);
    if (jwtChk.code != 200) {
      this.status = 401;
      this.body = jwtChk;
      return;
    }
    //判断保活
    if (!await this.checkStatusTime()) {
      this.status = 403;
      this.body = {
        code: 403,
        message: '超过保活时间!'
      };
      return;
    }
    //权限验证
    let url = `${this.ctx.controller}:${this.ctx.action}`;
    console.log(url)

  }
  //判断保活
  async checkStatusTime() {
    let preTime = await this.session('statusTime'),
      configTime = this.config('statusTime') || 15 * 60;
    //过期
    if (!preTime || this.now() - preTime > configTime) {
      await this.session('statusTime', null);
      return false;
    } else {
      //没过期则加时间
      await this.session('statusTime', this.now() + configTime)
      return true;
    }
  }
  //校验jwt
  async chkJwt(token) {
    let salt = await this.session('salt'),
      adminId = await this.session('adminId');
    if (!salt || !adminId) {
      return {
        code: 401,
        message: 'session 不存在'
      };
    }
    //只允许一个帐号在一个端下登录
    let chkSalt = await this.cache('admin_' + adminId);
    if (!chkSalt || salt != chkSalt) {
      await this.clearSatus(adminId);
      return {
        code: 401,
        message: '有其他用户登录该账户'
      };
    }
    //校验
    let rt = await jwt.verify(token, salt);
    //过期
    if (rt.adminId != adminId) {
      await this.clearSatus(adminId);
      await this.cache('admin_' + adminId, null);
      return {
        code: 401,
        message: '认证过期'
      };;
    }
    this.adminId = adminId;
    return {
      code : 200
    };
  }
  async clearSatus(adminId) {
    await this.session(null);
    //await this.cache('admin_' + adminId, null);
    
  }
  __after() {

  }
};
