const fileCache = require('think-cache-file');
//const nunjucks = require('think-view-nunjucks');
const fileSession = require('think-session-file');
const mysql = require('think-model-mysql');
const { Console, File, DateFile } = require('think-logger3');
const path = require('path');
const isDev = think.env === 'development';
const redisSession = require('think-session-redis');
const redisCache = require('think-cache-redis');
/**
 * cache adapter config
 * @type {Object}
 */
// exports.cache = {
//   type: 'file',
//   common: {
//     timeout: 24 * 60 * 60 * 1000 // millisecond
//   },
//   file: {
//     handle: fileCache,
//     cachePath: path.join(think.ROOT_PATH, 'runtime/cache'), // absoulte path is necessarily required
//     pathDepth: 1,
//     gcInterval: 24 * 60 * 60 * 1000 // gc interval
//   }
// };
exports.cache = {
  type: 'redis',
  common: {
    timeout: 24 * 3600 * 1000 // millisecond
  },
  redis: {
    handle: redisCache,
    port: 6379,
    host: '127.0.0.1',
    password: ''
  }
};
/**
 * model adapter config
 * @type {Object}
 */
exports.model = {
  type: 'mysql',
  common: {
    logConnect: isDev,
    logSql: isDev,
    logger: msg => think.logger.info(msg)
  },
  mysql: {
    handle: mysql,
    database: 'gdcms',
    prefix: 'rt_',
    encoding: 'utf8',
    host: '127.0.0.1',
    port: '8889',
    user: 'root',
    password: 'root',
    dateStrings: true
  }
};

/**
 * session adapter config
 * @type {Object}
 */
/*
exports.session = {
  type: 'file',
  common: {
    cookie: {
      name: 'thinkjs',
      keys: ['werwer', 'werwer'],
      signed: true
    }
  },
  file: {
    handle: fileSession,
    sessionPath: path.join(think.ROOT_PATH, 'runtime/session')
  }
};*/
exports.session = {
  type: 'redis',
  common: {
    cookie: {
      name: 'godocms',
      maxAge: 1 * 3600 * 1000,
      //expires: '',
      path: '/',  //a string indicating the path of the cookie
      //domain: '',
      //secure: false,
      //keys: [],
      httpOnly: true,
      sameSite: false,
      signed: false,
      overwrite: false
    }
  },
  redis: {
    handle: redisSession,
    maxAge: 3600 * 1000, //session timeout, if not set, session will be persistent.
    autoUpdate: true, //update expired time when get session, default is false
  }
}

/**
 * logger adapter config
 * @type {Object}
 */
exports.logger = {
  type: isDev ? 'console' : 'dateFile',
  console: {
    handle: Console
  },
  file: {
    handle: File,
    backups: 10, // max chunk number
    absolute: true,
    maxLogSize: 50 * 1024, // 50M
    filename: path.join(think.ROOT_PATH, 'logs/app.log')
  },
  dateFile: {
    handle: DateFile,
    level: 'ALL',
    absolute: true,
    pattern: '-yyyy-MM-dd',
    alwaysIncludePattern: true,
    filename: path.join(think.ROOT_PATH, 'logs/app.log')
  }
};
