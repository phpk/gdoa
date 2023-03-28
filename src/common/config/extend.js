const model = require('think-model');
const cache = require('think-cache');
const session = require('think-session');
const fetch = require('think-fetch');
const view = require('think-view');
//const websocket = require('think-websocket');
//const mongoose = require('think-mongoose');
//const mongo = require('think-mongo');
module.exports = [
  model(think.app),
  cache,
  session,
  fetch,
  view,
  //websocket(think.app),
  //mongo(think.app) 
  //mongoose(think.app)
];
