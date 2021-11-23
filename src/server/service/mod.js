const path = require('path');
const fs = require('fs');
const noneTpl = require('./modtpl/none.js');
const curdTpl = require('./modtpl/curd.js');
const srcPath = path.join(think.ROOT_PATH, 'src/');
const viewPath = path.join(think.ROOT_PATH, 'www/admin/view/');
module.exports = class extends think.Service {
    async createModNone(data) {
        let path = srcPath + data.server_path,
            key = data.key,
            name = data.name,
            type = data.type,
            paramStr = ``;
        if (data.paramsList) {
            data.paramsList.forEach(d => {
                if (d.type == 1) {
                    paramStr += `const ${d.key} = require('${d.content}');\n`;
                }
                else if (d.type == 2) {
                    paramStr += `const ${d.key} = ${d.content};\n`;
                }
                else if (d.type == 3) {
                    paramStr += `const ${d.key} = '${d.content}';\n`;
                }
            });
        }
        //console.log(paramStr)
        if (type == 1) {
            let controllerFile = path + '/controller/' + key + '.js';
            if (!think.isFile(controllerFile)) {
                fs.writeFileSync(controllerFile, paramStr + noneTpl.controllerTpl.replace(/{{key}}/g, key).replace(/{{name}}/g, name));
            }
            let logicFile = path + '/logic/' + key + '.js';
            if (!think.isFile(logicFile)) {
                fs.writeFileSync(logicFile, noneTpl.logicTpl.replace(/{{key}}/g, key).replace(/{{name}}/g, name));
            }
        }
        if (type == 2) {
            let modelFile = path + '/model/' + key + '.js';
            if (!think.isFile(modelFile)) {
                fs.writeFileSync(modelFile, paramStr + noneTpl.modelTpl.replace(/{{key}}/g, key).replace(/{{name}}/g, name));
            }
        }
        if (type == 3) {
            let serviceFile = path + '/service/' + key + '.js';
            if (!think.isFile(serviceFile)) {
                fs.writeFileSync(serviceFile, paramStr + noneTpl.serviceTpl.replace(/{{key}}/g, key).replace(/{{name}}/g, name));
            }
        }
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