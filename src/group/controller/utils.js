/**
 * @class 基础类
 */
module.exports = class extends think.Controller {
    getClientUUid() {
        //console.log(this.ctx.header)
        let key = this.ctx.header.uuid + this.ctx.ip;
        //console.log(key)
        return think.md5(key)
      }
      async ses(key, val = '') {
        let uuid = this.getClientUUid()
        if (val == '') {
          return await this.cache(uuid + key)
        } else {
          return await this.cache(uuid + key, val)
        }
      }
}