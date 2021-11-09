## 开发环境

> nodejs v12.16.2 mysql 5.6


项目解压到server根目录

```bash
cd server
npm i
```

## 初始化项目

用工具导入`www/data/pro.sql`，然后更改`src/common/config/adapter.js`

```bash
mysql: {
    handle: mysql,
    database: 'pro',//改成自己的数据库
    prefix: 'rt_',
    encoding: 'utf8',
    host: '127.0.0.1',
    port: '3306',
    user: 'root',//改自己的用户名
    password: 'root',//改密码
    dateStrings: true
  }
```


## 本地预览

通过运行 `npm start` 启动一个本地服务器。默认访问地址 http://localhost:8360 。

```bash
npm start
```

## 正式环境

```bash
pm2 start pm2.json
```
