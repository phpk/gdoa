/**
* @logic
* @apiDefine art 文章
*/
module.exports = class extends think.Logic {
	/**
	* @name 文章列表
	*/
	listAction(){}
	/**
	* @name 添加文章
	*/
	addAction(){
		this.allowMethods = 'post';	}
	/**
	* @name 编辑文章
	*/
	editAction(){
		this.allowMethods = 'post';
	}
};