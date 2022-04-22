module.exports = class extends think.Model {
    /**
     * 获取列表
     * @param {Number} userId 
     * @returns 
     */
    async list(userId) {
        //先从角色映射表里取出用户对应的角色
        let authIds = await think.model('user_map').where({
            user_id: userId
        }).getField('auth_id');
        //再从角色表里取出对应的菜单权限id
        let rulesId = await this.model('user_auth')
            .where({ id: ['IN', authIds] })
            .getField('rules');
        let data = [];
        if (rulesId.indexOf('-1') > -1) {
            data = await this.model('user_menu')
                .order('order_num asc')
                .select();
        } else {
            data = await think.model('user_menu')
                .order('order_num asc')
                .where({ id: ['IN', rulesId] })
                .select();
        }
        //获取路由权限
        let perms = [];
        data.forEach(el => {
            el.route && perms.push(el.route);
        });
        //根据 id取出某一个分类的子集
        const findById = (id) => {
            let child = [];
            data.forEach((value) => {
                //前台是否显示
                if (value.pid == id && value.ifshow < 1) {
                    //value.href = '/user/' + value.href;
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
        let menus = deeploop(0);
        let desktops = [];
        data.forEach(el => {
            el.desktop > 0 && desktops.push(el);
        });
        return { perms, menus, desktops };
    }
    /**
     * 设置缓存
     * @param {Number} userId 
     */
    async cacheData(userId) {
        //设置路由缓存
        let routeData = await this.list(userId);
        await think.cache('userperms_' + userId, routeData.perms);
        //设置菜单缓存
        await think.cache('usermenus_' + userId, routeData.menus);
        return routeData;
    }
    /**
     * 前台渲染递归
     * @param {array} tid 
     * @returns 
     */
    async tree() {
        let data = await this.model('user_menu').select()
        //根据 id取出某一个分类的子集
        //console.log(tid)
        const findById = (id) => {
            let child = [];
            data.forEach((value) => {
                if (value.pid == id) {
                    value.name = value.title;
                    value.field = 'id';
                    
                    value.spread = false;

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
                        value["child"] = deeploop(value.id);
                        value["children"] = value['child'];
                    }
                });
            }
            return dataArr;
        };
        return deeploop(0)
    }
    
}