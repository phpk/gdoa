const Base = require('./base.js');
/**
 * @class
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
        let menus = await this.cache('group_perms_' + this.userId);
        //console.log(menus);
        return this.success(menus.menus)
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
        let pid = this.get('pid')
        let data = await this.model('menu').where({pid}).order("order_num asc").select()
        for(let i = 0; i < data.length; i++) {
            let el = data[i];
            let has = await this.model('menu').where({pid : el.id}).count()
            if(has > 0) {
                el.haveChild = true;
            }else{
                el.haveChild = false;
            }
        }
        // data.forEach(async (el) => {
            
        // });
        return this.success({data})
    }

    /**
     * 
     * @api {get} menu/one 获取单个菜单数据
     * @apiGroup menu
     * 
     * @apiHeader {string} rttoken 必填
     * 
     * @apiParam  {Number} id 菜单id 可为0 为0时添加数据前拉取
     * @apiSuccess (200) {type} name description
     * 
     */
    async oneAction() {
        let id = this.get('id');
        
        let data;
        if (id > 0) {
            data = await this.model('menu').where({ id }).find();
        } else {
            data = {};
        }

        let list = await this.model('menu').tree();
        let pname = '顶层菜单';
        data.list = [
            {
                id: 0,
                title: pname,
                child: list,
                open: true
            }
        ]
        if (data.pid) {
            data.pname = await this.model('menu').where({ id: data.pid }).getField('title');
        } else {
            data.pname = pname;
        }

        return this.success(data)
    }
    async cacheMenu() {
        let routeData = await this.model('menu').cacheDataByUid(this.userId);
        return routeData;
    }
    /**
     *
     * @api {post} menu/edit 编辑菜单
     * @apiGroup menu
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  {Number} id 菜单id
     * @apiParam  {Number} pid 菜单上级id
     * @apiParam  {String} title 菜单名称
     * @apiParam  {String} href 前端模版
     * @apiParam  {String} route 后端路由
     * @apiParam  {String} icon 菜单icon
     * @apiParam  {Number} type 类型 0 1 2 3
     * 
     * @apiParam  {Number} order_num 排序
     * @apiSuccess (200) {type} name description
     *
     */
    async editAction() {
        let post = this.post(),
            id = post.id;
        if (!await this.hasData('menu', { id }))
            return this.fail("编辑的菜单不存在");
        
        let rt = await this.model('menu').where({ id }).update(post)
        let routeData = await this.cacheMenu();
        
        return this.success({rt, routeData})
    }
    async editDataAction() {
        let {id, field, value} = this.post();
        if (!await this.hasData('menu', { id }))
            return this.fail("编辑的菜单不存在");
        if (field == 'order_num' && think.isNumber(value)) {
            return this.fail('排序应该为数字')
        }
        let up = {};
        up[field] = value;
        await this.model('menu').where({ id }).update(up);
        let routeData = await this.cacheMenu();
        return this.success({routeData})
    }
    /**
     *
     * @api {post} menu/edit 添加菜单
     * @apiGroup menu
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  {Number} pid 菜单上级id
     * @apiParam  {String} title 菜单名称
     * @apiParam  {String} href 前端模版
     * @apiParam  {String} route 后端路由
     * @apiParam  {String} icon 菜单icon
     * @apiParam  {Number} type 类型 0 1 2 3
     * @apiParam  {Number} desktop 桌面推荐 0 1
     * @apiParam  {Number} order_num 排序
     * 
     * @apiSuccess (200) {type} name description
     *
     */
    async addAction() {
        let post = this.post();
        let rt = await this.model('menu').add(post);
        let routeData = await this.cacheMenu();
       
        return this.success({rt, routeData})
    }
    async addManyAction() {
        let post = this.post();
        //console.log(post)
        let manytype = post.manytype.split(',')
        //console.log(manytype)
        let save = []
        let titles = {
            add : '添加',
            edit : '编辑',
            list : '列表',
            del : '删除',
            addBefore : '添加前',
            editBefore : '编辑前'

        }
        manytype.forEach(d => {
            let s = {...post}
            s.route = s.route + d
            s.title = s.title + titles[d]
            save.push(s)
        })
        let rt = await this.model('menu').addMany(save);
        let routeData = await this.cacheMenu();
        return this.success({rt, routeData})

    }
    /**
     *
     * @api {post} menu/ifshow 菜单是否显示
     * @apiGroup menu
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  {Number} id 菜单id
     * @apiParam  {Number} ifshow 显示状态0或1
     * @apiSuccess (200)  name description
     *
     */
    async ifshowAction() {
        let post = this.post(),
            id = post.id;
        if (!await this.hasData('menu', { id }))
            return this.fail("数据不存在");
        
        let rt = await this.model('menu')
            .where({ id })
            .update({
                ifshow: post.ifshow
            })
        let routeData = await this.cacheMenu();
        return this.success({rt, routeData})

    }
    /**
     *
     * @api {post} menu/del 删除菜单
     * @apiGroup menu
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  {Number} id 菜单id
     * 
     * @apiSuccess (200) name description
     *
     */
    async delAction() {
        let post = this.post(),
            id = post.id;
        
        if (!await this.hasData('menu', { id }))
            return this.fail("数据不存在");
        
        if (await this.hasData('menu', { pid: id }))
            return this.fail("请先删除菜单下的子目录");
        
        let rt = await this.model('menu').where({ id }).delete();
        let routeData = await this.cacheMenu();
        return this.success({rt, routeData})
    }
    /**
     *
     * @api {post} menu/sql 导出菜单
     * @apiGroup menu
     *
     * @apiHeader {string} rttoken 必填
     *
     * @apiParam  {Number} id 菜单id
     * 
     * @apiSuccess (200) name description
     *
     */
    async sqlAction() {
        let id = this.get('id');
        let fields = "title,key,route,href,type,order_num,icon,lid,ifshow,desktop";
        let data = await this.model('menu').field(fields).where({ id }).find();
        data.child = await this.model('menu')
            .field(fields)
            .where({ pid: id })
            .select();
        return this.success(data);
    }

};
