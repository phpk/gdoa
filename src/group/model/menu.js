module.exports = class extends think.Model {
    /**
     * 获取列表
     * @param {Number} adminId 
     * @returns 
     */
    async list(user) {
        //let sql = { is_sys: 1 };
        let sql = {};
        if (user.rules != -1) {
            sql.id = ['IN', user.rules]
        }
        let data = await think.model('menu')
            .where(sql)
            .order('order_num asc')
            .select();
        let commonData = await this.model('menu')
            .where({ is_common: 1 })
            .select()
        commonData.forEach(d => {
            data.push(d)
        })

        //console.log('-----------')
        data = await this.addFormData(data, user)
        //console.log(JSON.stringify(data))
        //获取路由权限
        let perms = [];
        data.forEach(el => {
            el.href = '/res/group/' + el.href;

            el.route && perms.push(el.route);
        });
        //console.log(perms)
        //根据 id取出某一个分类的子集
        const findById = (id) => {
            let child = [];
            data.forEach((value) => {
                //前台是否显示
                if (value.pid == id && value.ifshow < 1) {

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
     * @param {Number} adminId 
     */
    async cacheData(user) {
        //设置路由缓存
        let routeData = await this.list(user);
        //console.log(routeData)
        await think.cache('group_perms_' + user.id, routeData);
        return routeData;
    }
    async cacheDataByUid(userId) {
        let user = await this.model('user').where({id : userId}).find();
        let routeData = await this.cacheData(user);
        return routeData;
    }
    async getPerms(userId) {
        return think.cache('group_perms_' + userId);
    }
    async addFormData(data, user) {
        //console.log(user)
        let formDataList = await think.cache(user.group_id + '_form_data')
        //console.log(formDataList)
        if (!think.isEmpty(formDataList) && formDataList.length > 0) {
            let workId = 100000;

            formDataList.forEach(d => {
                data.push({
                    id: workId + d.id,
                    pid: 581,
                    title: d.form_name,
                    route: "form/listData?fid=" + d.id,
                    href: "form/view.html?id=" + d.id,
                    type: 1,
                    issys: 1,
                    order_num: 0,
                    icon: "layui-icon layui-icon-share",
                    lid: 1,
                    ifshow: 0,
                    desktop: 0,
                })
            })

            let myId = 200000;
            data.push({
                id: 210001,
                pid: 582,
                title: '我的消息',
                route: "approve/msgList?uid=" + user.id,
                href: "approve/msg.html?uid=" + user.id,
                type: 1,
                issys: 1,
                order_num: 0,
                icon: "layui-icon layui-icon-notice",
                lid: 1,
                ifshow: 0,
                desktop: 1,
            })
            data.push({
                id: 210002,
                pid: 582,
                title: '我的审核',
                route: "approve/content?tid=" + user.id,
                href: "approve/content.html?tid=" + user.id,
                type: 1,
                issys: 1,
                order_num: 0,
                icon: "layui-icon layui-icon-find-fill",
                lid: 1,
                ifshow: 0,
                desktop: 1,
            })
            data.push({
                id: 210003,
                pid: 582,
                title: '我的申请',
                route: "approve/content?uid=" + user.id,
                href: "approve/content.html?uid=" + user.id,
                type: 1,
                issys: 1,
                order_num: 0,
                icon: "layui-icon layui-icon-chart-screen",
                lid: 1,
                ifshow: 0,
                desktop: 1,
            })
            let icons = ['layui-icon-picture-fine', 'layui-icon-reply-fill', 'layui-icon-headset', 'layui-icon-diamond', 'layui-icon-location', 'layui-icon-template', 'layui-icon-website', 'layui-icon-auz', 'layui-icon-export', 'layui-icon-service']
            formDataList.forEach((d, i) => {
                let ic = icons[i] ? icons[i] : 'layui-icon-picture-fine'
                data.push({
                    id: myId + d.id,
                    pid: 582,
                    title: d.form_name,
                    route: "form/listData?fid=" + d.id,
                    href: "form/view.html?id=" + d.id + '&uid=' + user.id,
                    type: 1,
                    issys: 1,
                    order_num: 0,
                    icon: "layui-icon " + ic,
                    lid: 1,
                    ifshow: 0,
                    desktop: 1,
                })
            })
            //console.log(data)
        }
        return data;
    }

    /**
         * 前台渲染递归
         * @param {array} tid 
         * @returns 
         */
    async tree() {
        let data = await this.model('menu').select()
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