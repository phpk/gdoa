const fs = require('fs');
const path = require('path');
const datapath = path.join(think.ROOT_PATH, 'data/db.json');
const backpath = path.join(think.ROOT_PATH, 'data/backup/');
const mysqldump = require('mysqldump');
const Importer = require('mysql-import');
module.exports = class extends think.Model {
    async list() {
        return await this.query("SHOW TABLE STATUS");
    }
    async tab() {
        if (think.isFile(datapath)) {
            return require(datapath);
        } else {
            return await this.create();
        }
    }
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
     * 备份表
     */
    async backup() {
        let date = (new Date()).valueOf();
        let file = backpath + think.datetime(date, 'YYYYMMDD-HH:mm:ss') + '.sql';
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
