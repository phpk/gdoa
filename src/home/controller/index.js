const Base = require('./base.js');
const marked = require('marked');
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
  async newsAction() {
    let { page, limit } = this.get();
    page = page > 0 ? page : 1;
    limit = limit ? limit : 20;
    let list = await this.model('article').where({ cid: 1 }).page(page, limit).select();
    list.forEach(d => {
      d.image = d.image ? d.image : '/static/home/img/news_img1.jpg'
    })
    this.assign('list', list);
    return this.display();
  }
  htmlDecode(str) {
		let s = '';
		if(str.length === 0) {
			return '';
		}
		s = str.replace(/&amp;/g, '&');
		s = s.replace(/&lt;/g,'<');
		s = s.replace(/&gt;/g,'>');
		s = s.replace(/&nbsp;/g,' ');
		s = s.replace(/&#39;/g,'\'');
		s = s.replace(/&quot;/g,'\"');
    s = s.replace(/\n/g,'<br />');
    s = s.replace(/' +/g,'');
		return s;
	}
  async newsDetailAction() {
    let id = this.get('id') * 1;
    let data = await this.model('article').where({ id }).find()
    data.content = marked.parse(data.content)
    //data.content = this.htmlDecode(data.content)
    //console.log(data)
    this.assign('data', data)
    return this.display();
  }
  caseAction() {
    return this.display();
  }
  aboutAction() {
    return this.display();
  }
};
