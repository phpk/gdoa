// default config
module.exports = {
    workers: 0,
    port: 8200, //启动端口
    statusTime: 12 * 60 * 60, //保活时间，默认12小时
    adminDir: 'group', //后端目录
    tokenKey : 'fdsfkdsfda@#2',
    csrf: {
        headerName: 'grouptoken',
        enable: true
    },
    helmet: {
        enable: true
    },
    ratelimit: {
        enable: true,
        interval: 10 * 60 * 1000, // 1 minutes
        max: 10000,
        prefixKey: 'login/captcha'
    },
    cache: {
        //type: 'redis', //or 'file'
        type : 'file',
        timeout: 24 * 3600 * 1000
    },
    cookie: {
        name: 'thinkjs',
        maxAge: 12 * 3600 * 1000
    },
    session: {
        //type: 'redis', //or 'file'
        type : 'file',
        maxAge: 12 * 3600 * 1000
    },
    mysql: {   
        prefix: 'rt_',
        encoding: 'utf8',
        host: '127.0.0.1',
        database: 'godocms',
        port: '8889',
        user: 'root',
        password: 'root',
        // database: 'godo',
        // password: 'Hnaqw2021!@#Rt',
        // port: '3306',
        // user: 'root',

        dateStrings: true
    },
    redis: {
        host: '127.0.0.1',
        port: 6379,
        password: '',
        db: 1
    },
    errnoField: 'code', // errno field
    errmsgField: 'message', // errmsg field
    defaultErrno: 201, // default errno
    validateDefaultErrno: 202, // validate default errno
    stickyCluster: true,//websocket
    email: {
        host: 'smtp.163.com',//邮箱服务的主机，如smtp.qq.com
        port: '25',//对应的端口号
        from: '"godocms.com" <godocms@163.com>',
        //开启安全连接
        secure: false,
        //secureConnection:false,
        //用户信息
        auth: {
            user: 'godocms@163.com',
            pass: 'HUTGFDVQFTSXRXFK'
        }
    }
};