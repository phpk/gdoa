const Base = require('./base.js');
const fs = require('fs');
const path = require('path');
const DATA_PATH = path.join(think.ROOT_PATH, 'data/');
/**
 * @class
 * @apiDefine db 数据库管理
 */
module.exports = class extends Base {
    async listAction() {
        console.log(DATA_PATH)
        //console.log(this)
    }
    async initList() {
        //SELECT t.TABLE_NAME,t.TABLE_COMMENT,c.COLUMN_NAME,c.COLUMN_TYPE,c.COLUMN_COMMENT FROM information_schema.TABLES t,INFORMATION_SCHEMA.Columns c WHERE c.TABLE_NAME=t.TABLE_NAME AND t.`TABLE_SCHEMA`='gdcms'
        //select * from information_schema.columns where table_name='rt_admin';

    }
}