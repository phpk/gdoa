const Koa = require('koa');
const static = require('koa-static');
const app = new Koa();
const path = require('path')
// 静态文件根目录
const staticPath = './www';

// 注册koa-static中间件
app.use(static(
  path.join(__dirname, staticPath)
));

app.listen(3000);
