const helmet = require('koa-helmet');
const defaultOptions = {
    enable: true
}
module.exports = (options = {}, app) => {
    // 合并传递进来的配置
    options = Object.assign({}, defaultOptions, options);
    return (ctx, next) => {
        if (options.enable) {
            //  apply to all requests
            app.use(helmet());
        }
        return next()
    }
}