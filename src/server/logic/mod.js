module.exports = class extends think.Logic {
    listAction() {
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
    addAction() {
        this.allowMethods = 'post';
        this.rules = {
            tags: {
                required: true,
                length: { min: 3, max: 255 },
                aliasName: '标志'
            },
            name: {
                required: true,
                length: { min: 2, max: 255 },
                aliasName: '名称'
            },
            path: {
                required: true,
                length: { min: 2, max: 255 },
                aliasName: '路径'
            },
            remark: {
                aliasName: '标注'
            },
            type: {
                int: { min: 1 },
                aliasName:'模块类型'
            }
        }
    }
    addBeforeAction() {
        this.allowMethods = 'get';
    }
    editBeforeAction() {
        this.allowMethods = 'get';
        this.rules = {
            id: {
                required: true,
                int: { min: 1 },
                aliasName: 'id'
            }
        }
    }
    editAction() {
        this.allowMethods = 'post';
        this.rules = {
            id: {
                required: true,
                int: { min: 1 },
                aliasName: 'id'
            },
            name: {
                required: true,
                length: { min: 2, max: 255 },
                aliasName: '名称'
            },
            remark: {
                aliasName: '标注'
            }
        }
    }
    deleteAction() {
        this.allowMethods = 'post';
        this.rules = {
            id: {
                required: true,
                int: { min: 1 },
                aliasName: '模块id'
            }
        }
    }
    
};