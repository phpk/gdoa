const Base = require('./base.js');

module.exports = class extends think.Controller {
  async __before() {
    this.userId = await this.session('userId');
    if (think.isEmpty(this.userId)) {
      this.redirect('group/login/index');
      return false;
    }
    this.perms = await think.cache('group_perms_' + this.userId);
  }
  async indexAction() {
    this.assign('menus', JSON.stringify(this.perms.menus))
    return this.display();


  }
  async welcomeAction() {
    this.assign('destops', this.perms.destops)
    return this.display();
  }
  async areaAction() {
    let pid = this.get('pid')*1 || 0,
        id = this.get('id'),
        wsql = {}
    if(think.isEmpty(id)) {
      wsql.pid = pid;
    }else{
      wsql.id = ["IN", id];
    }
    let data = await this.model('area').where(wsql).order('order_num asc').select();
    data.forEach(d => {
      d.value = d.id;
      if(d.have_child > 0){
        d.children = []
      }
    })
    return this.success(data)
}
  async loginOutAction() {
    await this.cache('auth_' + this.userId, null);
    await this.cache('group_perms_' + this.userId, null);
    await this.session('userId', null);
    await this.session('groupId', null);
    return this.success()
}

};
