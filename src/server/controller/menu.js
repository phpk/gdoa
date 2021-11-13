const Base = require('./base.js');
/**
 * @apiDefine menu 菜单管理
 */
module.exports = class extends Base {
    /**
    * @api {get} menu/list  获取管理界面菜单
    * @apiGroup menu
    *
    * @apiHeader {string} rttoken 必填
    *
    * @apiSuccess {number}  code   结果码
    * @apiSuccess {string} data   数据
    * @apiSuccess {string} message  提示
    *
    * @apiSuccessExample Success-Response:
    * {
    * "code": 200,
    * "message": "ok",
    * "data":{[
    * ]}
    * }
    */

    async listAction() {
        let menus = await this.cache('menus_' + this.adminId);
        //console.log(menus);
        return this.ok(menus)
    }
    /**
     * 
     * @api {get} menu/oplist 获取管理菜单列表
     * @apiName 管理菜单列表
     * @apiGroup menu
     * 
     * @apiHeader {string} rttoken 必填
    *
    * @apiSuccess {number}  code   结果码
    * @apiSuccess {string} data   数据
    * @apiSuccess {string} message  提示
     */
    async oplistAction() {
        let list = await this.model('menu').select()
        return this.ok(list)
    }
    //前台渲染递归
    async tree(tid) {
        let data = await this.model('menu').select()
        //根据 id取出某一个分类的子集
        const findById = (id) => {
            let child = [];
            data.forEach((value) => {
                if (value.pid == id) {
                    value.name = value.title;
                    if (id == tid) {
                        value.checked = true;
                    }
                    value.open = false;
                    child.push(value);
                }
            });
            return child;
        };
        // 递归查询到数据并将数据存储到数组 
        const deeploop = function (id) {
            let dataArr = findById(id);
            if (dataArr.length <= 0) {
                return null;
            } else {
                dataArr.forEach((value) => {
                    if (deeploop(value.id) != null) {
                        value["children"] = deeploop(value.id);
                    }
                });
            }
            return dataArr;
        };
        return deeploop(0)
    }
    /**
     * 
     * @api {get} menu/one 获取单个菜单数据
     * @apiGroup menu
     * 
     * @apiHeader {string} rttoken 必填
     * 
     * @apiParam  {Number} id 菜单id
     * @apiSuccess (200) {type} name description
     * 
     */
    async oneAction() {
        let id = this.get('id') * 1;
        if (isNaN(id)) return this.err('id error');
		let data;
		if(id > 0) {
			data = await this.model('menu').where({ id }).find();
		}else{
			data = {};
		}
        
        let list = await this.tree(id);
        let pname = '顶层目录';
        data.list = [
            {
                id: 0,
                name: pname,
                children: list,
                open: true
            }
        ]
        if (data.pid) {
            data.pname = await this.model('menu').where({ id: data.pid }).getField('title');
        } else {
            data.pname = pname;
        }

        return this.ok(data)
    }
    async editAction() {
        let post = this.post(),
            id = post.id * 1;
        if (isNaN(id) || id < 1) return this.err('id error')
        let has = await this.model('menu').where({ id }).find();
        if (think.isEmpty(has)) return this.err("编辑的菜单不存在");
        let save = {
            title: post.title,
            href: post.href,
            route: post.route,
            icon: post.icon,
            type: post.type,
            order_num: post.order_num,
			pid : post.pid
        }
        let rt = await this.model('menu').where({ id }).update(save)
		await this.model('menu').cacheData(this.adminId);
        return this.ok(rt)
    }
	async addAction() {
	    let post = this.post();
	    if (!post.title) return this.err('title error')
	    let save = {
	        title: post.title,
	        href: post.href,
	        route: post.route,
	        icon: post.icon,
	        type: post.type,
	        order_num: post.order_num,
			pid : post.pid
	    }
	    let rt = await this.model('menu').add(save)
		await this.model('menu').cacheData(this.adminId);
	    return this.ok(rt)
	}
};
