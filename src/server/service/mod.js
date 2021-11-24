const path = require('path');
const fs = require('fs');
const cachePath = path.join(think.ROOT_PATH, 'data/mod/');
const srcPath = path.join(think.ROOT_PATH, 'src/');
const types = {
    1: 'controller',
    2: 'model',
    3: 'service',
    4: 'logic'
};
module.exports = class extends think.Service {
    createModNone(data) {
        let obj = this.getParseData(data);
        this.setParseData(obj);
        if (data.type == 1) {
            data.type = 4;
            delete data.paramsList;
            let logic = this.getParseData(data);
            this.setParseData(logic);
        }
    }
    async del(data) {
        await this.delFile(data);
        if (data.type == 1) {
            data.type = 4;
            await this.delFile(data);
        }
    }
    async delFile(data) {
        let jsonfile = cachePath + data.server_path + '/' + types[data.type] + '/' + data.key + '.json';
        console.log(jsonfile)
        let jsfile = srcPath + data.server_path + '/' + types[data.type] + '/' + data.key + '.js';
        console.log(jsfile)
        if (think.isFile(jsfile)) {
            await fs.unlink(jsfile, res => {});
        }
        if (think.isFile(jsonfile)) {
            await fs.unlink(jsonfile, res => { });
        }
        
    }
    setParseData(data) {
        let str = ``;
        if (data.comments) str += data.comments;
        if (data.params) str += data.params;
        str += data.start;
        if (data.content) str += data.content;
        str += data.end;
        fs.writeFileSync(data.path, str);
    }
    getParseData(data) {
        let typesName = types[data.type];
        let comments = `/**\n* @${typesName}\n* @apiDefine ${data.key} ${data.name}\n*/\n`;
        let paramStr = ``;
        if (data.paramsList) {
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
        let start = {
            1: `const Base = require('./base.js');\nmodule.exports = class extends Base {\n`,
            2: `module.exports = class extends think.Model {\n`,
            3: `module.exports = class extends think.Service {\n`,
            4:`module.exports = class extends think.Logic {\n`
        }
        let end = `};`;
        let file = cachePath + data.server_path + '/' + typesName + '/' + data.key + '.json';
        let path = srcPath + data.server_path + '/' + typesName + '/' + data.key + '.js';
        //console.log(file);
        let jsonData;
        if (think.isFile(file)) {
            jsonData = require(file);
            jsonData.info = data;
            jsonData.path = path;
            jsonData.typesName = typesName;
            jsonData.params = paramStr;
            jsonData.comments = comments;
            jsonData.start = start[data.type];
            jsonData.end = end;
            fs.writeFileSync(file, JSON.stringify(jsonData));
        } else {
            jsonData = {
                info: data,
                path: path,
                linkPath : '',
                typesName: typesName,
                params: paramStr,
                comments: comments,
                start: start[data.type],
                content: ``,
                funcs: {},
                end : end
            };
            //console.log(jsonData)
            fs.writeFileSync(file, JSON.stringify(jsonData));
        }
        return jsonData;
    }
    async createModCurd(data) {
        /*
        let path = srcPath + data.path,
            name = data.name,
            tags = data.tags,
            controllerFile = path + '/controller/' + tags + '.js',
            logicFile = path + '/logic/' + tags + '.js',
            listFile = viewPath + tags + '/list.html',
            addFile = viewPath + tags + '/add.html',
            editFile = viewPath + tags + '/edit.html';
        let controllerTpl = curdTpl.controllerTpl.replace(/{{tags}}/g, tags).replace(/{{name}}/g, name),
            logicTpl = curdTpl.logicTpl;
        if (!think.isFile(controllerFile)) {
            fs.writeFileSync(controllerFile, controllerTpl);
        }
        if (!think.isFile(logicTpl)) {
            fs.writeFileSync(logicFile, logicTpl);
        }
        */
    }
}