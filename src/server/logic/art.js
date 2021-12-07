/**
* @logic
* @apiDefine art 文章
*/
module.exports = class extends think.Logic {
	/**
	* @name 文章列表
	*/
	listAction(){
		this.allowMethods = 'get';
		this.rules = {
			 id : {
				int : true,
				aliasName : '文章id'
			},
			 category_id : {
				required : true,
				int : true,
				defalut: 11,
				aliasName : '分类id'
			},
			 title : {
				required : true,
				string : true,
				defalut: '1231',
				aliasName : '标题'
			},
			 desc_content : {
				required : true,
				string : true,
				aliasName : ''
			},
			 image : {
				required : true,
				string : true,
				image: true,
				method: 'file',
				aliasName : '图片'
			},
			 content : {
				required : true,
				string : true,
				date: true,
				aliasName : '内容'
			},
			 author : {
				required : true,
				string : true,
				aliasName : '作者:id:name'
			},
		}
	}
};