// default config
module.exports = {
  workers: 1,
  port: 8100,//启动端口
  statusTime : 15 * 60,//保活时间
  adminDir : 'server',//后端目录
  redis: {
    host: '127.0.0.1',
    port: 6379,
    password: ''
  }
};
