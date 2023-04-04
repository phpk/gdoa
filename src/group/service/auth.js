module.exports = class extends think.Service {
    async getPerms(tabName, userId, groupId) {
        let authData = await think.cache('auth_' + userId);
        let list = await this.getTree(tabName, authData, groupId);
        let perms = await think.cache('group_perms_' + userId);
        return {list, menus : perms.menus}
    }
    /**
     * 前台渲染递归 表结构必须有id pid title
     * @param {array} tid 
     * @returns 
     */
    async getTree(tabName, authData, groupId) {
        //console.log(tabName)
        if(!tabName) return;
        let sql = {group_id : groupId}
        for(let p in authData) {
            if(tabName == p) {
                if(authData[p] != -1) {
                    if(tabName == 'project') {
                        sql.project_id = ["IN", authData[p]]
                    }else{
                        sql.id = ["IN", authData[p]]
                    }
                }
            }
        }
        let data = await this.model(tabName).where(sql).select()
        //根据 id取出某一个分类的子集
        //console.log(tid)
        const findById = (id) => {
            let child = [];
            data.forEach((value) => {
                if (value.pid == id) {
                    let d = {
                        title: value.name,
                        id: value.id
                    }
                    child.push(d);
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
                    }
                });
            }
            return dataArr;
        };
        return [
            {
                id: 0,
                title: '顶层',
                child: deeploop(0)
            }
        ];
    }
}