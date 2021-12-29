const serve = require('koa-static-router');
const path = require('path');
const pluginConfig = require(think.ROOT_PATH + '/data/plugin.json');
const getFilePath = (pluginsName) => {
    //console.log(pluginsName)
    //console.log(pluginConfig)
    if (!pluginConfig[pluginsName]) return false;
    let data = pluginConfig[pluginsName];
    if (data.isTest) {
        data.filePath = think.ROOT_PATH + '/plugins/' + data.path + '/';
    } else {
        data.filePath = think.ROOT_PATH + '/node_modules/' + data.path + '/';
    }
    return data;
    /*
    let filePath = path.join(think.ROOT_PATH, 'plugins/' + pluginsName);
    if (think.isDirectory(filePath)) {
        return { filePath : filePath + '/src/', isTest : true}
    } else {
        filePath = path.join(think.ROOT_PATH, 'node_modules/' + pluginsName);
        if (think.isDirectory(filePath)) { 
            return { filePath: filePath + '/src/', isTest: false }
        } else {
            return false;
        }
    }*/
}
module.exports = (options = {}, app) => {
    return (ctx, next) => {
        //console.log(ctx.controller)
        //return;
        if (!options.enable || ctx.request.url.indexOf('/p/') === -1) {
            return next();
        }
        let urls = ctx.request.url.split('/');
        console.log(urls)
        if (urls.length < 3 && urls[1] !== 'p') { 
            return next();
        }
        let pluginsName = urls[2],
            fileData = getFilePath(pluginsName);
        console.log(fileData)
        if (fileData === false) {
            return next();
        }
        let filePath = fileData.filePath;
        console.log(filePath)
        console.log('plugins/' + fileData.path + '/public/')
        console.log('/p/' + pluginsName + '/')
        //处理静态路由
        if (fileData.isTest) {
            app.use(serve({ dir: 'plugins/' + fileData.path + '/public/', router: '/p/' + pluginsName + '/' }));
        } else {
            app.use(serve({ dir: 'node_modules/' + fileData.path + '/public/', router: '/p/' + pluginsName + '/' }));
        }
        ctx.pluginName = pluginsName;

        let controllerName = urls[3] || 'index',
            actionName = urls[4] || 'index';
        
        //多层级
        if (think.isDirectory(filePath + controllerName + '/')) {
            filePath = filePath + urls[3] + '/';
            controllerName = urls[4] || 'index';
            actionName = urls[5] || 'index';
            ctx.module = urls[3];
        }
        //后缀
        if (actionName.indexOf('?') !== -1) {
            actionName = actionName.split('?')[0]
        }
        
        //处理逻辑层
        let logicFile = filePath + '/logic/' + controllerName + '.js';
        if (think.isFile(logicFile)) {
            let Logic = require(logicFile);
            const logicInstance = new Logic(ctx);
            let logicMethod = actionName + 'Action';
            if (!logicInstance[logicMethod]) {
                logicMethod = '__call';
            }
            let allowMethods = logicInstance.allowMethods;
            if (!think.isEmpty(allowMethods)) {
                if (think.isString(allowMethods)) {
                    allowMethods = allowMethods.split(',').map(e => {
                        return e.trim().toUpperCase();
                    });
                }
                if (allowMethods.indexOf(ctx.method) === -1) {
                    return ctx.fail(ctx.config('validateDefaultErrno'), 'METHOD_NOT_ALLOWED');
                }
            }
            const rules = think.extend({}, logicInstance.scope, logicInstance.rules);
            if (!think.isEmpty(rules) && !logicInstance.validate(rules)) {
                return ctx.fail(ctx.config('validateDefaultErrno'), instance.validateErrors);
            }

        }
        //处理控制层
        let controllerFile = filePath + '/controller/' + controllerName + '.js';
        if (!think.isFile(controllerFile)) {
            return next();
        }
        //处理权限
        think.adminBase = require(path.join(think.ROOT_PATH, 'src/server/controller/base.js'));
        ctx.controller = controllerName;

        let Controller = require(controllerFile);
        const controllerInstance = new Controller(ctx);
        let controllerPromise = Promise.resolve();
        
        ctx.action = actionName;
        if (controllerInstance.__before) {
            controllerPromise = Promise.resolve(controllerInstance.__before());
        }
        return controllerPromise.then(data => {
            if (data === false) return false;
            let controllerMethod = actionName + 'Action';
            if (!controllerInstance[controllerMethod]) {
                controllerMethod = '__call';
            }

            if (controllerInstance[controllerMethod]) {
                // pre set request status
                if (ctx.body === undefined) {
                    ctx.status = 200;
                }
                return controllerInstance[controllerMethod]();
            }
        }).then(data => {
            if (data === false) return false;
            if (controllerInstance.__after) return instance.__after();
        }).then(data => {
            if (data !== false) return next();
        });

        //return next()
    }
}