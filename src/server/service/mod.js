const path = require('path');
const fs = require('fs');
const noneTpl = require('./modtpl/none.js');
const curdTpl = require('./modtpl/curd.js');
const srcPath = path.join(think.ROOT_PATH, 'src/');
const viewPath = path.join(think.ROOT_PATH, 'www/admin/view/');
module.exports = class extends think.Service {
    async createModNone(data) {
        let file,
            path = srcPath + data.path,
            tags = data.tags;
        if (data.none_controller) {
            file = path + '/controller/' + tags + '.js';
            if (!think.isFile(file)) {
                fs.writeFileSync(file, noneTpl.controllerTpl);
            }
        }
        if (data.none_logic) {
            file = path + '/logic/' + tags + '.js';
            if (!think.isFile(file)) {
                fs.writeFileSync(file, noneTpl.logicTpl);
            }
        }
        if (data.none_model) {
            file = path + '/model/' + tags + '.js';
            if (!think.isFile(file)) {
                fs.writeFileSync(file, noneTpl.modelTpl);
            }
        }
        if (data.none_service) {
            file = path + '/service/' + tags + '.js';
            if (!think.isFile(file)) {
                fs.writeFileSync(file, noneTpl.serviceTpl);
            }
        }
    }
    async createModCurd(data) {
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
        
    }
}