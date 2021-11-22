let controllerTpl = `const Base = require('./base.js');
module.exports = class extends Base {
    async listAction() {
        return 'Hi,godo!';
    }
};`;
let logicTpl = `module.exports = class extends think.Logic {
    listAction() {
        this.allowMethods = 'get';
        this.rules = {};
    }
};`;
let modelTpl = `module.exports = class extends think.Model {
    async index() {}
};`;
let serviceTpl = `module.exports = class extends think.Service {
    async index() {}
};`;
module.exports = {
    controllerTpl,
    logicTpl,
    modelTpl,
    serviceTpl
}