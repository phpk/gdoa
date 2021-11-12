const Base = require('./base.js');

module.exports = class extends Base {
    async listAction() {
        let menus = await this.cache('menus_' + this.adminId);
        console.log(menus);
        return this.ok(menus)
    }
};
