/**
* @controller
* @apiDefine art 文章
*/
const Base = require('./base.js');
module.exports = class extends Base {
	/**
	* @name 文章列表
	*/
	async listAction(){}
	/**
	* @name 添加文章
	*/
	async addAction(){}
	/**
	* @name 编辑文章
	*/
	async editAction(){}
};