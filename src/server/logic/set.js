module.exports = class extends think.Logic {
    cateAction() {
        this.allowMethods = 'get';
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
    cateAddAction() {
        this.allowMethods = 'post';
        this.rules = {
            key: {
                required: true,
                length: { min: 3, max: 255 },
                aliasName : '类目键值'
            },
            name: {
                required: true,
                length: { min: 2, max: 255 },
                aliasName: '类目名'
            },
            remark: {
                aliasName : '标注'
            }
        }
    }
};