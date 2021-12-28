const serve = require('koa-static-router');
const path = require('path');
module.exports = (options = {}, app) => {
    return (ctx, next) => {
        //console.log(ctx.controller)
        //return;
        if (options.enable && ctx.request.url.indexOf('/p/') !== -1) {
            let urls = ctx.request.url.split('/');
            //console.log(urls)
            if (urls.length > 2 && urls[1] == 'p') {
                let pluginsName = urls[2],
                    pname = 'plugins/';
                let filePath = path.join(think.ROOT_PATH, 'plugins/');
                //测试目录
                if (!think.isFile(filePath + pluginsName + '/package.json')) {
                    //打包后的目录
                    pname = 'node_modules/';
                    filePath = path.join(think.ROOT_PATH, 'node_modules/');
                    //如果module层也冒得
                    if (!think.isFile(filePath + pluginsName + '/package.json')) {
                        return next();
                    }
                }
                app.use(serve({ dir: pname + pluginsName + '/src/view/', router: '/p/' + pluginsName + '/' }));
                if (urls[3] && urls[4]) {
                    if (think.isFile(filePath + pluginsName + '/src/' + urls[3] + '.js')) {
                        if (urls[4].indexOf('?') !== -1) {
                            ctx.action = urls[4].split('?')[0]
                        } else {
                            ctx.action = urls[4]
                        }
                        let Controller = require(filePath + pluginsName + '/src/' + urls[3] + '.js');
                        const instance = new Controller(ctx);
                        //console.log(instance)
                        let promise = Promise.resolve();
                        if (instance.__before) {
                            promise = Promise.resolve(instance.__before());
                        }
                        // if return false, it will be prevent next process
                        return promise.then(data => {
                            if (data === false) return false;
                            let method = `${ctx.action}Action`;
                            //console.log(method)
                            if (!instance[method]) {
                                method = '__call';
                            }
                            if (instance[method]) {
                                // pre set request status
                                if (ctx.body === undefined && options.preSetStatus) {
                                    ctx.status = options.preSetStatus;
                                }
                                return instance[method]();
                            }
                        }).then(data => {
                            if (data === false) return false;
                            if (instance.__after) return instance.__after();
                        }).then(data => {
                            if (data !== false) return next();
                        });
                    }
                }
            }


        }
        return next()
    }
}