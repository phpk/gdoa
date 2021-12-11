const Base = require('./base.js');
module.exports = class extends Base {
    async listAction() {
        let aid = this.get('aid');
        let api = await this.model('api').where({id : aid}).find()
        let list = await this.model('api_test').where({ aid }).select()
        return this.success({ list,api })
    }
    async addBeforeAction() {
        let aid = this.get('aid')
        let api = await this.model('api').where({ id: aid }).find()
        let mod = await this.model('mod').where({ id: api.mod_id }).find()
        api.test_path = '/' + mod.server_path + '/' + mod.key + '/' + api.key;
        let params = await this.model('api_params').where({ aid }).select()
        let headers = [
            {
                key : 'Accept',
                val : '*/*'
            },
            {
                key : 'Cookie',
                val : 'godoSystem'
            },
            {
                key : 'rttoken',
                val : 'godoSystem'
            },
        ];
        let restop = [
            {
                key : 'code',
                val: 0,
                stype: 'number',
                isdata : 0
            },
            {
                key: 'message',
                val: '',
                stype: 'exist',
                isdata: 0
            },
            {
                key : 'data',
                val: '',
                stype: 'object',
                isdata : 1
            }
        ]
        return this.success({api, mod, params, headers, restop})
    }
}