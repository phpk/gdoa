const model = require('think-model');
const cache = require('think-cache');
const fetch = require('think-fetch');
const view = require('think-view');

module.exports = [
  model(think.app),
  cache,
  fetch,
  view,
];
