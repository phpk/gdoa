module.exports = class extends think.Logic {
    cateAction() {
        this.rules = {
            page: {
                default: 1,
                int: { min: 1 },
                aliasName: '页码'
            },
            limit: {
                default: 20,
                int: true,
                aliasName: '页数'
            }
        }
    }
};