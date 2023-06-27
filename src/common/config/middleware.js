const path = require('path');
const isDev = think.env === 'development';
//const csrf = require('think-csrf');
const conf = require('./config.js')
module.exports = [
  {
    handle: 'csrf',
    enable: conf.csrf.enable,
    match: /^\/server|users/,
    options: {
      headerName: conf.csrf.headerName
    }
  },
  {
    handle: 'helmet',
    enable: conf.helmet.enable,
    match: /^\/server|users/,
    options: {
      enable: conf.helmet.enable
    }
  },
  {
    handle: 'ratelimit',
    enable: conf.ratelimit.enable,
    match: /^\/server|users/,
  },
  {
    handle: 'plugins',
    enable: true,
    options: {
      enable : true//插件是否开启
    }
  },
  {
    handle: 'meta',
    match: /^\/server/,
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: 'resource',
    enable: true,
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(static|docs|res|libs|upload|favicon\.ico)/
    }
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: isDev,
      //customed set as object
      templates: {
        404: path.join(think.ROOT_PATH, 'www/static/error/404.html'),
        500: path.join(think.ROOT_PATH, 'www/static/error/500.html')
      },
      error(err, ctx) {
        return console.error(err);
      }
    }
  },
  {
    handle: 'payload',
    options: {
      keepExtensions: true,
      limit: '5mb'
    }
  },
  {
    handle: 'router',
    options: {
      suffix: ['.html'],
    }
  },
  'logic',
  'controller'
];
