module.exports = class extends think.Model {
    get schema() {
        return {
            id: { // 字段名称
                type: 'int',
                primary: true,
                autoIncrement : true
            },
            admin_id: {
                type : 'int'
            },
            log: {
                type: 'String'
            },
            data: {
                type: 'String'
            },
            ip: {
                type: 'String'
            },
            agent: {
                type: 'String'
            },
            url: {
                type: 'String'
            },
            method: {
                type: 'String'
            },
            addtime: {
                type: 'int'
            },
            leavetime: {
                type : 'int'
            },
            type: {
                type: 'String'
            }
        }
    }
}