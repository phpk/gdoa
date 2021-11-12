module.exports = class extends think.Model {
    async list(adminId) {
        //先从角色映射表里取出管理员对应的角色
        let authIds = await think.model('admin_map').where({
            admin_id: adminId
        }).getField('auth_id');
        //再从角色表里取出对应的菜单权限id
        let rulesId = await this.model('admin_auth')
            .where({ id: ['IN', authIds]})
            .getField('rules');
        let data = [];
        if (rulesId.indexOf('-1') > -1) {
            data = await this.model('menu')
                .order('order_num asc')
                .select();
        } else {
            data = await think.model('menu')
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
                if (value.pid == id) {
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
        return { perms, menus };
    }
    
}