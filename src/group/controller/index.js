//const Base = require('./base.js');

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
  async msgAction() {
    let msgList = await this.model('approve_msg').where({to_user_id : this.userId}).order("id desc").limit(30).select();
    let rt0 = {
      "id": 1,
      "title": "通知",
      "children": []
    }
    let rt1 = {
      "id": 2,
      "title": "消息",
      "children": []
    }
    let rt2 = {
      "id": 3,
      "title": "代办",
      "children": []
    }
    msgList.forEach(d => {
      if(d.msg_type === 0) {
        rt0.children.push({
          id : d.id,
          title : d.msg,
          time : think.datetime(d.add_time, "MM-DD HH:mm")
        })
      }
      else if(d.msg_type === 1) {
        rt1.children.push({
          id : d.id,
          title : d.msg,
          time : think.datetime(d.add_time, "MM-DD HH:mm")
        })
      }
      else if(d.msg_type === 2) {
        rt2.children.push({
          id : d.id,
          title : d.msg,
          time : think.datetime(d.add_time, "MM-DD HH:mm")
        })
      }
    })
    return this.success([rt0, rt1, rt2])
  }
  async welcomeAction() {
    let userInfo = await this.model('user').where({id : this.userId}).find();
    userInfo.avatar = userInfo.avatar ? userInfo.avatar : '/static/images/avatar.png'
    this.assign('user', userInfo);
    let msgList = await this.model('approve_msg').where({to_user_id : this.userId}).order("id desc").limit(10).select();
    msgList.forEach(d => {
      d.add_time = think.datetime(d.add_time, "MM-DD HH:mm")
    })
    this.assign('msglist', msgList);
    this.assign('desktops', this.perms.desktops)
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
