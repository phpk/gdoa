const Base = require('./base.js');

module.exports = class extends think.Controller {
  async __before() {
    this.adminId = await this.session('adminId');
    if (think.isEmpty(this.adminId)) {
      this.redirect('login');
      return false;
    }
  }
  async indexAction() {
    const menus = await think.cache('menus_' + this.adminId);
    this.assign('menus', JSON.stringify(menus))
    return this.display();


  }
  async welcomeAction() {
    const destops = await think.cache('desktops_' + this.adminId);
    this.assign('destops', destops)
    return this.display();
  }
  async loginOutAction() {
    await this.session(null);
    await this.cache('admin_' + this.adminId, null);
    await this.session('adminId', null);
    await this.session('salt', null);
    await this.session('statusTime', null);
    return this.success()
  }

};
