const Base = require('./base.js');

module.exports = class extends Base {
  __before() {
    this.assign('act', this.ctx.action);
  }
  indexAction() {
     
    return this.display();
    //this.redirect('/admin/index.html')
  }
  productAction() {
    return this.display();
  }
  newsAction() {
    return this.display();
  }
  newsDetailAction() {
    return this.display();
  }
  caseAction() {
    return this.display();
  }
  aboutAction() {
    return this.display();
  }
};
