module.exports = class extends think.Model {
    /**
     * 获取列表
     * @param {Number} adminId 
     * @returns 
     */
    async list(user) {
        let sql = { is_sys : 1 };
        if(user.rules != -1) {
            sql.id = ['IN', user.rules]
        }
        let data = await think.model('menu')
        .where(sql)
        .order('order_num asc')
        .select();
        let commonData = await this.model('menu')
        .where({is_common : 1})
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
    async getPerms(userId) {
        return think.cache('group_perms_' + userId);
    }
    async addFormData(data, user) {
        console.log(user)
        let formDataList = await think.cache(user.group_id + '_form_data')
        //console.log(formDataList)
        if(!think.isEmpty(formDataList) && formDataList.length > 0) {
            let workId = 100000;
            let mgrwork = {
                id : workId,
                pid : 570,
                title: "表单数据",
                route: "oa",
                href: "oa",
                type: 0,
                issys : 1,
                order_num: 0,
                icon: "layui-icon layui-icon-share",
                lid: 1,
                ifshow: 0,
                desktop: 0,
            }
            data.push(mgrwork);
            
            formDataList.forEach(d => {
                data.push({
                    id : workId + d.id,
                    pid : workId,
                    title: d.form_name,
                    route: "form/listData?fid=" + d.id,
                    href: "form/view.html?id=" + d.id,
                    type: 1,
                    issys : 1,
                    order_num: 0,
                    icon: "layui-icon layui-icon-share",
                    lid: 1,
                    ifshow: 0,
                    desktop: 0,
                })
            })

            let myId = 200000;
            let mywork = {
                id : myId,
                pid : 305,
                title: "我的工作台",
                route: "oa",
                href: "oa",
                type: 0,
                issys : 1,
                order_num: 0,
                icon: "layui-icon layui-icon-share",
                lid: 1,
                ifshow: 0,
                desktop: 0,
            }
            data.push(mywork);
            data.push({
                id : 210001,
                pid : myId,
                title: '我的消息',
                route: "approve/msgList?uid=" + user.id,
                href: "approve/msg.html?uid=" + user.id,
                type: 1,
                issys : 1,
                order_num: 0,
                icon: "layui-icon layui-icon-notice",
                lid: 1,
                ifshow: 0,
                desktop: 1,
            })
            data.push({
                id : 210002,
                pid : myId,
                title: '我的审核',
                route: "approve/content?tid=" + user.id,
                href: "approve/content.html?tid=" + user.id,
                type: 1,
                issys : 1,
                order_num: 0,
                icon: "layui-icon layui-icon-find-fill",
                lid: 1,
                ifshow: 0,
                desktop: 1,
            })
            data.push({
                id : 210003,
                pid : myId,
                title: '我的申请',
                route: "approve/content?uid=" + user.id,
                href: "approve/content.html?uid=" + user.id,
                type: 1,
                issys : 1,
                order_num: 0,
                icon: "layui-icon layui-icon-chart-screen",
                lid: 1,
                ifshow: 0,
                desktop: 1,
            })
            let icons = ['layui-icon-picture-fine','layui-icon-reply-fill','layui-icon-headset','layui-icon-diamond','layui-icon-location','layui-icon-template','layui-icon-website','layui-icon-auz','layui-icon-export','layui-icon-service']
            formDataList.forEach((d, i) => {
                let ic = icons[i] ? icons[i] : 'layui-icon-picture-fine'
                data.push({
                    id : myId + d.id,
                    pid : myId,
                    title: d.form_name,
                    route: "form/listData?fid=" + d.id,
                    href: "form/view.html?id=" + d.id + '&uid=' + user.id,
                    type: 1,
                    issys : 1,
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
    
}