import * as qiniu from 'qiniu';

export default {
  rootRoleId: 1,
  // jwt sign secret
  jwt: {
    secret: '123456',
  },
  // typeorm config
  database: {
    type: 'mysql',
    host: '127.0.0.1',
    port: 8889,
    username: 'root',
    password: 'root',
    database: 'admin',
    synchronize: true,
    logging: true,
    //prefix: 'rt_'
  },
  redis: {
    host: '127.0.0.1', // default value
    port: 6379, // default value
    password: '',
    db: 0,
  },
  // qiniu config
  qiniu: {
    accessKey: 'xxx',
    secretKey: 'xxx',
    domain: 'xxx',
    bucket: 'xxx',
    zone: qiniu.zone.Zone_z0,
    access: 'public',
  },
  swagger: {
    enable: true,
    title: '接口文档',
    desc: 'godo api'
  }
};
