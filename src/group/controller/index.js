const Base = require('./base.js');

module.exports = class extends think.Controller {
  async __before() {
    this.userId = await this.session('userId');
    if (think.isEmpty(this.userId)) {
      this.redirect('group/login/index');
      return false;
    }
  }
  async indexAction() {
    const menus = await think.cache('group_menus_' + this.userId);
    this.assign('menus', JSON.stringify(menus))
    return this.display();


  }
  async welcomeAction() {
    const destops = await think.cache('group_desktops_' + this.userId);
    this.assign('destops', destops)
    return this.display();
  }
  async loginOutAction() {
    await this.session(null);
    await this.cache('user_' + this.userId, null);
    await this.cache('group_perms_' + this.userId, null);
    await this.cache('group_menus_' + this.userId, null);
    await this.cache('group_desktops_' + this.userId, null);
    await this.session('userId', null);
    await this.session('GroupSalt', null);
    await this.session('GroupStatusTime', null);
    return this.success()
  }

};
