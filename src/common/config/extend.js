const model = require('think-model');
const cache = require('think-cache');
const session = require('think-session');
//const websocket = require('think-websocket');
//const mongoose = require('think-mongoose');
//const mongo = require('think-mongo');
module.exports = [
  model(think.app),
  cache,
  session,
  //websocket(think.app),
  //mongo(think.app) 
  //mongoose(think.app)
];
