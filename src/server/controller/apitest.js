const Base = require('./base.js');
module.exports = class extends Base {
    async listAction() {
        let aid = this.get('aid');
        let paramsList = await this.model('api_params').where({ aid }).select()
        
        return this.success({ paramsList })
    }
}