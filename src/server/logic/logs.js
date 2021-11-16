module.exports = class extends think.Logic {
    get scope() {
        return {
            page: {
                default: 1,
                int: { min: 1 },
                aliasName: '页码'
            },
            limit: {
                default: 20,
                int: true,
                aliasName: '页数'
            },
            param: {
                aliasName: '查询字段'
            }
        }
    }
    opAction() {
        this.rules = {};
    }
    viewAction() {
        this.rules = {};
    }
    errAction() {
        this.rules = {};
    }
};
