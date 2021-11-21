const fs = require('fs');
const path = require('path');
const datapath = path.join(think.ROOT_PATH, 'data/db.json');
const backpath = path.join(think.ROOT_PATH, 'data/backup/');
const mysqldump = require('mysqldump');
const Importer = require('mysql-import');
module.exports = class extends think.Model {
    /**
     * 表列表
     * @returns array
     */
    async list() {
        return await this.query("SHOW TABLE STATUS");
    }
    /**
     * 所有的缓存数据
     * @returns object
     */
    async tab() {
        if (think.isFile(datapath)) {
            return require(datapath);
        } else {
            return await this.create();
        }
    }
    /**
     * 创建缓存
     * @returns object
     */
    async create() {
        let data = await this.all();
        fs.writeFileSync(datapath, JSON.stringify(data));
        return data;
    }
    async all() {
        let list = await this.query("SELECT t.TABLE_NAME,t.TABLE_COMMENT,c.COLUMN_NAME,c.COLUMN_TYPE,c.COLUMN_COMMENT,c.EXTRA,c.IS_NULLABLE,c.COLUMN_KEY,c.COLUMN_DEFAULT,c.ORDINAL_POSITION FROM information_schema.TABLES t,INFORMATION_SCHEMA.Columns c WHERE c.TABLE_NAME=t.TABLE_NAME AND t.`TABLE_SCHEMA`='" + think.config('mysql.database') + "'");
        let tabs = {};
        list.forEach(el => {
            let tabname = el.TABLE_NAME;
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
        let indexData = await this.query("SELECT * FROM information_schema.statistics WHERE table_schema = '" + think.config('mysql.database') + "'");
        indexData.forEach(el => {
            let tabname = el.TABLE_NAME;
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
        //创建语句
        for (let p in tabs) {
            let sql = await this.query("show create table " + p);
            tabs[p].sql = "DROP TABLE IF EXISTS `" + p + "`;\n " +
                        sql[0]['Create Table'];
        }

        return tabs;
    }
    /**
     * 获取表字段
     * @param {string} table 
     * @returns 
     */
    async fieldList(table) {
        //过滤掉重复的
        let rt = await this.query(`select COLUMN_NAME,COLUMN_COMMENT,COLUMN_KEY,COLUMN_TYPE,COLUMN_TYPE,EXTRA,IS_NULLABLE,COLUMN_KEY,COLUMN_DEFAULT,ORDINAL_POSITION FROM information_schema.COLUMNS where table_name = '${table}'`);
        let cache = [],keys = [];
        rt.forEach(d => {
            if(!keys.includes(d.COLUMN_NAME)){
                keys.push(d.COLUMN_NAME)
                cache.push(d)
            }
        })
        return cache;
    }
    async fieldRow(table, field) {
        let list = await this.fieldList(table);
        //console.log(list)
        return list.find(d => {
            return d.COLUMN_NAME === field;
        })
    }
    async keysList(table) {
        let indexData = await this.query("SELECT * FROM information_schema.statistics WHERE table_schema = '" + think.config('mysql.database') + "' and TABLE_NAME = '" + table + "'");
        let rt = {}, cache = [];
        indexData.forEach(el => {
            if (!rt[el.INDEX_NAME]) {
                rt[el.INDEX_NAME] = {
                    type: el.INDEX_TYPE,
                    fields: []
                }
            }
            rt[el.INDEX_NAME].fields.push(el.COLUMN_NAME)
        })
        for (let p in rt) {
            cache.push({
                name: p,
                type: rt[p].type,
                fields : rt[p].fields
            })
        }
        return cache;
    }
    /**
     * 获取表主键
     * @param {string} table 
     */
    async getKey(table) {
        let data = await this.query(`select COLUMN_NAME,COLUMN_COMMENT,COLUMN_KEY from information_schema.COLUMNS where table_name = '${table}' AND (COLUMN_KEY='PRI' OR COLUMN_KEY='UNI')`);
        //console.log(data)
        if (data.length > 0) {
            let rt = []
            data.forEach(d => {
                if(!rt.includes(d.COLUMN_NAME))
                    rt.push(d.COLUMN_NAME);
            })
            return rt;
        }
        return false;
    }
    
    /**
     * 优化表
     */
    async optimize(table) {
        await this.query('OPTIMIZE TABLE ' + table);
    }
    /**
     * 修复表
     * @returns {*}
     */
    async repair(table) {
        await this.query('REPAIR TABLE ' + table);
    }
    /**
     * 获取创建sql
     * @param {string} table 
     * @returns 
     */
    async getSql(table){
        let sql = await this.query("show create table " + table);
        return "DROP TABLE IF EXISTS `" + table + "`;\n " +
        sql[0]['Create Table'];
    }
    /**
     * 复制表
     * @param {string} table 
     */
    async opcopy(table) {
        let sqldata = await this.query("show create table " + table);
        let sql = sqldata[0]['Create Table'];
        let newsql = sql.replace(new RegExp(table,'g'),table + "_copy");
        await this.query(newsql)
    }
    /**
     * 删除表
     * @returns {*}
     */
    async drop(table) {
        if(!this.sysTable(table))
        await this.query('DROP TABLE ' + table);
    }
    /**
     * 清空表
     * @param {string} table 
     */
    async clear(table) {
        if(!this.sysTable(table))
        await this.query('truncate TABLE ' + table);
    }
    /**
     * 改表名
     * @param {string} table 
     * @param {string} newTable 
     */
    async renameTable(table, newTable) {
        if(!this.sysTable(table))
        await this.query('alter table '+table+' rename to '+ newTable);
    }
    /**
     * 改表备注
     * @param {string} table 
     * @param {string} newComment 
     */
    async editTableComment(table, newComment) {
        if(!this.sysTable(table))
        await this.query(`ALTER TABLE ${table} COMMENT '${newComment}'`);
    }
    
    /**
     * 改表自增长id
     * @param {string} table 
     * @param {string} id 
     */
    async editTableAutoId(table, id) {
        if(!this.sysTable(table))
        await this.query(`ALTER TABLE ${table} auto_increment = ${id}`);
    }
    sysTable(table) {
        let tabs = ['admin','admin_auth','admin_map','admin_oplog','admin_viewlog',
            'error', 'menu', 'set', 'form', 'crons'];
        let prefix = think.config('mysql.prefix');
        if (tabs.includes(prefix + table) || tabs.includes(table)) return true;
        return false;
    }
    /**
     * 删除字段
     * @param {string} table 
     * @param {string} field 
     */
    async delField(table, field) {
        if (!this.sysTable(table))
        //console.log(`alter table ${table} drop column ${field}`)
        await this.query(`alter table ${table} drop column ${field}`);
    }
    parseRow(row) {
        
        let str = row.type + " ";
        if(row.isnull !== 'YES') {
            str += "NOT NULL ";
        }
        if(row.extra == 'auto_increment') {
            str += "AUTO_INCREMENT ";
        }else{
            if(row.default === null) {
                str += "DEFAULT NULL ";
            }else{
                str += "DEFAULT '" + row.default + "' ";
            }
        }
        // if(row.comment) {
        //     str += " COMMENT '"+row.comment+"'";
        // }
        return str;

    }
    parseField(row) {
        let def = row.COLUMN_DEFAULT !== null ? ` DEFAULT '${row.COLUMN_DEFAULT}'` : '';
        let nul = row.IS_NULLABLE !== 'YES' ? ' NOT NULL ' : ' NULL ';
        let comment = row.COLUMN_COMMENT !== '' ? " COMMENT '" + row.COLUMN_COMMENT+"'" : "";
        let auto = row.EXTRA === 'auto_increment' ? " AUTO_INCREMENT " : "";
        return { nul, def, auto, comment };
    }
    async sortField(table, row, t = 'AFTER', sortField) {
        //console.log(row)
        if(this.sysTable(table)) return;
        let sql = this.parseRow(row);
        if(t !== 'AFTER') {
            await this.query(`ALTER TABLE ${table} modify ${row.name} ${sql} COMMENT '${row.comment}' first`);
        }else{
            await this.query(`ALTER TABLE ${table} modify ${row.name} ${sql} COMMENT '${row.comment}' after ${sortField}`);
        }
    }
    async changeFieldName(table, row, newName) {
        let { nul, def, auto, comment } = this.parseField(row);
        await this.query(`alter table ${table} change ${row.COLUMN_NAME} ${newName} ${row.COLUMN_TYPE} ${nul} ${def} ${auto} ${comment}`);
        console.log(this.lastSql)
    }
    async changeFieldComment(table, row, newComment) {
        let { nul, def, auto } = this.parseField(row);
        await this.query(`ALTER TABLE ${table} MODIFY COLUMN ${row.COLUMN_NAME} ${row.COLUMN_TYPE} ${nul} ${def} ${auto} COMMENT '${newComment}'`);
    }
    async changeFieldType(table, row, ntype) {
        let { nul, def, auto, comment } = this.parseField(row);
        await this.query(`ALTER TABLE ${table} MODIFY COLUMN ${row.COLUMN_NAME} ${ntype} ${nul} ${def} ${auto} ${comment}`);
    }
    async changeFieldDefault(table, row, val) {
        await this.query(`alter table ${table} alter column ${row.COLUMN_NAME} set default '${val}'`);
    }
    async changeFieldNull(table, row, status) {
        let { def, auto, comment } = this.parseField(row);
        if (row.IS_NULLABLE === 'NO' && status === 0) {
            //console.log(row)
            await this.query(`ALTER TABLE ${table} MODIFY COLUMN ${row.COLUMN_NAME} ${row.COLUMN_TYPE} NULL ${def} ${auto} ${comment}`);
        }
        if (row.IS_NULLABLE === 'YES' && status === 1) {
            //console.log(row)
            await this.query(`ALTER TABLE ${table} MODIFY COLUMN ${row.COLUMN_NAME} ${row.COLUMN_TYPE} NOT NULL ${def} ${auto} ${comment}`);
        }
    }
    async changeFieldAuto(table, row, status) {
        let {nul, def, comment } = this.parseField(row);
        if (status === 1 && row.EXTRA === 'auto_increment') {
            await this.query(`ALTER TABLE ${table} MODIFY COLUMN ${row.COLUMN_NAME} ${row.COLUMN_TYPE} ${nul} ${def} ${comment}`);
        }
        if (status === 0 && row.EXTRA === '') {
            //console.log(row)
            await this.query(`ALTER TABLE ${table} MODIFY COLUMN ${row.COLUMN_NAME} ${row.COLUMN_TYPE} ${nul} ${def} AUTO_INCREMENT ${comment}`);
        }
    }
    async addField(table, data) {
        let sql = `ALTER TABLE ${table} ADD COLUMN ${data.name} ${data.type}`;
        if (data.len > 0) {
            sql += `(${data.len}`;
            if (data.decimals > 0) {
                sql += `,${data.decimals}) `;
            } else {
                sql += `) `;
            }
        }
        if (data.attribute) {
            sql += ` ${data.attribute} `;
        }
        if (data.virtuality != '' && data.virtualitycode != '') {
            sql += ` as (${data.virtualitycode}) ${data.virtuality} `;
        }
        if (data.isnull > 0) {
            sql += ` NULL `;
        } else {
            sql += ` NOT NULL `;
        }
        if (data.collation) {
            sql += ` COLLATE ${data.collation} `;
        }
        if (data.default != '') {
            sql += ` DEFAULT ${data.default} `;
        }
        if (data.comment) {
            sql += ` COMMENT '${data.comment}'`;
        }
        //console.log(sql)
        await this.query(sql);
    }
    async hasField(table, field) {
        let rows =  await this.query(`select * FROM information_schema.COLUMNS where table_name = '${table}' and COLUMN_NAME = '${field}'`);
        if(rows.length > 0) {
            return true;
        }
        return false;
    }
    async delKey(table, name){
        if(name === 'PRIMARY') {
            await this.query(`alter table ${table} drop primary key;`);
        }else{
            await this.query(`alter table ${table} drop index ${name}`);
        }
    }
    async setKey(table, names, type) {
        if(type == 'setKey') {
            await this.query("ALTER TABLE `"+table+"` ADD PRIMARY KEY("+names+")");
        }
        else if(type == 'setUnikeyBtree') {
            await this.query("ALTER TABLE `"+table+"` ADD UNIQUE("+names+")");
        }
        else if(type == 'setKeyBtree') {
            await this.query("ALTER TABLE `"+table+"` ADD INDEX("+names+")");
        }
    }
    async createTable(data) {
        let sql = "CREATE TABLE `"+data.name+"` (`id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标志'";
        if(data.add_time) sql += ",`add_time` int(10) NOT NULL DEFAULT '0' COMMENT '添加时间'";
        if(data.update_time) sql += ",`update_time` int(10) NOT NULL DEFAULT '0' COMMENT '更新时间'";
        if(data.user_id) sql += ",`user_id` int(10) NOT NULL DEFAULT '0' COMMENT '用户id'";
        if(data.admin_id) sql += ",`admin_id` int(10) NOT NULL DEFAULT '0' COMMENT '管理员id'";
        sql += ",PRIMARY KEY (`id`)";
        sql += ") ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='"+data.comment+"'";
        await this.query(sql);
    }
    /**
     * 备份表
     */
    async backup() {
        let date = (new Date()).valueOf();
        let file = backpath + think.datetime(date, 'YYYY-MM-DD_HH:mm:ss') + '.sql';
        try {
            await mysqldump({
                connection: think.config('mysql'),
                dumpToFile: file,
                dump: {
                    schema: {
                        autoIncrement: true,
                        engine: true,
                        format: true,
                        table: {
                            dropIfExist: true,
                            ifNotExist: true,
                            charset: true,
                        },
                    }
                },
            });
        } catch (e) {
            console.log(e)
        }
        
    }
    /**
     * 还原数据
     * @param {ring} file
     */
    reback(file) {
        const importer = new Importer(think.config('mysql'));
        importer.onProgress(progress => {
            var percent = Math.floor(progress.bytes_processed / progress.total_bytes * 10000) / 100;
            console.log(`${percent}% Completed`);
        });

        importer.import(backpath + file).then(() => {
            var files_imported = importer.getImported();
            console.log(`${files_imported.length} SQL file(s) imported.`);
        }).catch(err => {
            console.error(err);
        });
    }
    backupFile() {
        let data = think.getdirFiles(backpath),
            rt = [];
        data.forEach(d => {
            rt.push({name : d})
        })
        return { list: rt.reverse(), count : data.length}
    }
    async delBackupFile(file) {
        //console.log(backpath + file)
        //await think.rmdir(backpath + file, false);
        let fileName = backpath + file;
        if (think.isFile(fileName)) {
            fs.unlinkSync(fileName);
        }
    }
};
