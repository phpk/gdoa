const prefix = think.config('mysql.prefix');
const dbName = think.config('mysql.database');
module.exports = class extends think.Model {
    /**
     * 前台渲染递归 表结构必须有id pid title
     * @param {array} tid 
     * @returns 
     */
    async getTree(tabName) {
        let data = await this.model(tabName).select()
        //根据 id取出某一个分类的子集
        //console.log(tid)
        const findById = (id) => {
            let child = [];
            data.forEach((value) => {
                if (value.pid == id) {
                    let d = {
                        title: value.title,
                        id: value.id,
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
                title: '顶层目录',
                child: deeploop(0)
            }
        ];
    }
    /**
     * 判断表是否存在
     * @param {*} table 
     * @returns 
     */
    async hasTable(table) {
        
        if (table.indexOf(prefix) === -1) {
            table = prefix + table;
        }
        let rows = await this.query(`select * FROM information_schema.COLUMNS where table_name = '${table}'`);
        if (rows.length > 0) {
            return true;
        }
        return false;
    }
    /**
     * 获取所有表
     * @returns []
     */
    async tableList() {
        let list = await this.query("SELECT TABLE_NAME,TABLE_COMMENT FROM information_schema.TABLES WHERE `TABLE_SCHEMA` = '" + dbName + "'");
        let rt = {}, res = [];
        list.forEach(d => {
            //let name = d.TABLE_NAME.replace(new RegExp(prefix, 'g'), '');
            let name = d.TABLE_NAME.replace(prefix, '');
            if (!rt[name]) {
                rt[name] = d.TABLE_COMMENT;
            }
        });
        for (let p in rt) {
            res.push({ name: rt[p], id : p })
        }
        return res;
    }
    /**
     * 获取表结构
     * @returns []
     */
    async allList() {
        let list = await this.sql("SELECT t.TABLE_NAME,t.TABLE_COMMENT,c.COLUMN_NAME,c.COLUMN_TYPE,c.COLUMN_COMMENT,c.EXTRA,c.IS_NULLABLE,c.COLUMN_KEY,c.COLUMN_DEFAULT,c.ORDINAL_POSITION FROM information_schema.TABLES t,INFORMATION_SCHEMA.Columns c WHERE c.TABLE_NAME=t.TABLE_NAME AND t.`TABLE_SCHEMA`='" + dbName + "'");
        let tabs = {};
        list.forEach(el => {
            let tabname = el.TABLE_NAME.replace(prefix, '');
            if (!tabs[tabname]) tabs[tabname] = {};
            tabs[tabname].tabname = tabname;
            tabs[tabname].tabcomment = el.TABLE_COMMENT;
            if (!tabs[tabname].fields) tabs[tabname].fields = {};
            tabs[tabname].fields[el.COLUMN_NAME] = {
                name: el.COLUMN_NAME,
                comment: el.COLUMN_COMMENT,
                type: el.COLUMN_TYPE,
                isnull: el.IS_NULLABLE,
                key: el.COLUMN_KEY,
                extra: el.EXTRA,
                default: el.COLUMN_DEFAULT,
                order: el.ORDINAL_POSITION
            };
        });
        //索引
        let indexData = await this.sql("SELECT * FROM information_schema.statistics WHERE table_schema = '" + dbName + "'");
        indexData.forEach(el => {
            let tabname = el.TABLE_NAME.replace(prefix, '');
            if (tabs[tabname]) {
                if (!tabs[tabname].indexs)
                    tabs[tabname].indexs = {};
                if (!tabs[tabname].indexs[el.INDEX_NAME])
                    tabs[tabname].indexs[el.INDEX_NAME] = {
                        type: el.INDEX_TYPE,
                        fields : []
                    };
                tabs[tabname].indexs[el.INDEX_NAME].fields.push(el.COLUMN_NAME)
            }
        })
        return tabs;
    }

};
