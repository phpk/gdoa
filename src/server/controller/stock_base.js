const Base = require('./base.js');
/**
 * @class
 * @apiDefine stock_goods 物料管理管理
 */
module.exports = class extends Base {
	async getCate() {
		let cates = await this.model('stock_dict').where({
			enable: 1
		}).order("id asc").select()
		let top = {}
		cates.forEach(e => {
			if (e.pid === 0) {
				e.child = [];
				//top[e.key] = top[e.key] ? top[e.key] : [];
				top[e.key] = e;
			}
		});
		for (let p in top) {
			cates.forEach(e => {
				if (top[p].id === e.pid) {
					top[p].child.push(e)
				}
			})
		}
		return top;
	
	}
}