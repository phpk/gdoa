// default config
module.exports = {
  workers: 1,
  port: 8100,//启动端口
  statusTime: 60 * 60,//保活时间，默认1小时
  adminDir: 'server',//后端目录
  csrf: {
    headerName: 'csrf_token',
    enable: true
  },
  helmet: {
    enable: true
  },
  ratelimit: {
    enable: true,
    interval: 1 * 60 * 1000, // 1 minutes
    max: 100,
  },
  cache: {
    type: 'redis',//or 'file'
    timeout: 24 * 3600 * 1000
  },
  cookie: {
    name: 'csrf_token',
    maxAge: 1 * 3600 * 1000
  },
  session: {
    type: 'redis',//or 'file'
    maxAge: 1 * 3600 * 1000
  },
  mysql: {
    database: 'gdcms',
    prefix: 'rt_',
    encoding: 'utf8',
    host: '127.0.0.1',
    port: '8889',
    user: 'root',
    password: 'root',
    dateStrings: true
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
    password: '',
    db: 1
  },
};
