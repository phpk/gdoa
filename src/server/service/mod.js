const path = require('path');
const fs = require('fs');
const cachePath = path.join(think.ROOT_PATH, 'data/mod/');
const srcPath = path.join(think.ROOT_PATH, 'src/');
const viewPath = path.join(think.ROOT_PATH, 'www/admin/view/');
const tplFile = require(cachePath + 'tpl/curd.js');
const types = {
    1: 'controller',
    2: 'model',
    3: 'service',
    4: 'logic'
};
module.exports = class extends think.Service {
    async createMod(data) {
        let path = srcPath + 'server',//服务器端路径
            name = data.name,//模块名字
            tags = data.key,//模块标识
            controllerFile = path + '/controller/' + tags + '.js',
            logicFile = path + '/logic/' + tags + '.js',
            vPath = viewPath + tags,
            listFile = vPath + '/list.html',
            editFile = vPath + '/edit.html',
            listcateFile = vPath + '/cate.html',
            editcateFile = vPath + '/cateEdit.html',
            controllerTpl = '',
            logicTpl = '',
            htmlTpl = {};
        if (!think.isDirectory(vPath)) think.mkdir(vPath);
        //控制器
        controllerTpl = this.getControllerTpl(data);
        fs.writeFileSync(controllerFile, controllerTpl);
        //逻辑层
        logicTpl = this.getLogicTpl(data);
        fs.writeFileSync(logicFile, logicTpl);
        //视图层
        //todo 列表加字段
        if(data.type == 1) {
            let listcate = this.replaceTpl(tplFile.htmlTpl.listCate, data.name, data.key),
            editcate = this.replaceTpl(tplFile.htmlTpl.editCate, data.name, data.key),
            cate = this.replaceTpl(tplFile.htmlTpl.cate, data.name, data.key),
            cateEdit = this.replaceTpl(tplFile.htmlTpl.cateEdit, data.name, data.key);
            fs.writeFileSync(listFile, listcate);
            fs.writeFileSync(editFile, editcate);
            fs.writeFileSync(listcateFile, cate);
            fs.writeFileSync(editcateFile, cateEdit);
        }else{
            htmlTpl = this.getHtmlTpl(data);
            fs.writeFileSync(listFile, htmlTpl.list);
            fs.writeFileSync(editFile, htmlTpl.edit);
        }

    }
    async del(data) {
        //return false;
        //console.log(jsonfile)
        let jsfile = srcPath + data.server_path + '/controller/' + data.key + '.js';
        //console.log(jsfile)
        if (think.isFile(jsfile)) {
            await fs.unlink(jsfile, res => { });
        }
        let lgfile = srcPath + data.server_path + '/logic/' + data.key + '.js';
        //console.log(jsfile)
        if (think.isFile(lgfile)) {
            await fs.unlink(lgfile, res => { });
        }
        think.rmdir(viewPath + data.key, false).then(() => {
            console.log('模版删除完成')
        })
    }
 
    /**
     * 控制层模版
     * @param {object} data 
     * @returns 
     */
    getControllerTpl(data) {
        let controllerTpl = ``;
        if(data.params) {
            controllerTpl += this.getParseData(data);
        }
        controllerTpl += tplFile.ctpl.start;
        controllerTpl += tplFile.ctpl.list;
        controllerTpl += tplFile.ctpl.add;
        if(data.type == 1) {
            controllerTpl += tplFile.ctpl.addBefore.replace(/{{cate}}/g, data.tables_more);
        }
        controllerTpl += tplFile.ctpl.edit;
        if(data.type == 1) {
            controllerTpl += tplFile.ctpl.editBeforeCate.replace(/{{cate}}/g, data.tables_more);;
        }else{
            controllerTpl += tplFile.ctpl.editBefore
        }
        controllerTpl += tplFile.ctpl.del;
        if(data.type == 1) {
            controllerTpl += tplFile.ctpl.cate.replace(/{{cate}}/g, data.tables_more);
        }

        controllerTpl += tplFile.endTpl;
        
        controllerTpl = this.replaceTpl(controllerTpl, data.name, data.tables_main);

        return controllerTpl;
    }
    /**
     * 逻辑层模版
     * @param {object} data
     * @returns
     */
    getLogicTpl(data) {
        let logicTpl = tplFile.ltpl.start;
        logicTpl += tplFile.ltpl.list;
        logicTpl += tplFile.ltpl.add;
        logicTpl += tplFile.ltpl.addBefore;
        logicTpl += tplFile.ltpl.edit;
        logicTpl += tplFile.ltpl.editBefore;
        logicTpl += tplFile.ltpl.del;
        logicTpl += tplFile.endTpl;
        return logicTpl;
    }
    /**
     * 视图层模版
     * @param {object} data
     * @returns
     */
    getHtmlTpl(data) {
        //console.log(tplFile);
        let list = this.replaceTpl(tplFile.htmlTpl.list, data.name, data.key),
            edit = this.replaceTpl(tplFile.htmlTpl.edit, data.name, data.key);
        return { list, edit }
    }
    
    replaceTpl(tpl, name, tags) {
        return tpl.replace(/{{tags}}/g, tags).replace(/{{name}}/g, name);
    }
    getParseData(data) {
        let paramStr = ``;
        if (data.paramsList) {
            //解析顶部常量
            data.paramsList.forEach(d => {
                if (d.type == 1) {
                    paramStr += `const ${d.key} = require('${d.content}');\n`;
                }
                else if (d.type == 2 || d.type == 4 || d.type == 5) {
                    paramStr += `const ${d.key} = ${d.content};\n`;
                }
                else if (d.type == 3) {
                    paramStr += `const ${d.key} = \`${d.content}\`;\n`;
                }
            });
        }
        
        return paramStr;
    }
}