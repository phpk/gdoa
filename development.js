const path = require('path');
const Application = require('thinkjs');
const typescript = require('think-typescript');
const watcher = require('think-watcher');
const notifier = require('node-notifier');
const instance = new Application({
  ROOT_PATH: __dirname,
  APP_PATH: path.join(__dirname, 'app'),
  watcher: watcher,
  transpiler: [typescript, {
    compilerOptions: {
      module: 'commonjs',
      target: 'es2017',
      sourceMap: true,
      noImplicitAny: true,
      removeComments: true,
      preserveConstEnums: true,
      suppressImplicitAnyIndexErrors: true,
      esModuleInterop: true
    }
  }],
  notifier: notifier.notify.bind(notifier),
  env: 'development'
});

instance.run();
