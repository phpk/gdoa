module.exports = class extends think.Logic {
    listAction() {
        this.allowMethods = 'get';
    }
    updateAction() {
        this.allowMethods = 'post';
    }
    backupAction() {
        this.allowMethods = 'post';
    }
    backupFileAction() {
        this.allowMethods = 'get';
    }
    rebackAction() {
        this.allowMethods = 'post';
        this.rules = {
            file: {
                required : true,
                aliasName: '文件名'
            }
        }
    }
    delbackAction() {
        this.allowMethods = 'post';
        this.rules = {
            file: {
                required : true,
                aliasName: '文件名'
            }
        }
    }
    docAction() {
        this.allowMethods = 'get';
    }
    editTableAction() {
        this.allowMethods = 'post';
        this.rules = {
            table: {
                required : true,
                aliasName: '表名'
            },
            field : {
                required : true,
                aliasName:'字段名'
            },
            value : {
                required : true,
                aliasName:'修改的内容'
            },
            old : {
                aliasName:'旧值'
            }
        }
    }
    delTableAction() {
        this.allowMethods = 'post';
        this.rules = {
            table: {
                required : true,
                aliasName: '表名'
            }
        }
    }
    optimizeAction() {
        this.allowMethods = 'post';
        this.rules = {
            table: {
                required : true,
                aliasName: '表名'
            }
        }
    }
    repairAction() {
        this.allowMethods = 'post';
        this.rules = {
            table: {
                required : true,
                aliasName: '表名'
            }
        }
    }
    clearAction() {
        this.allowMethods = 'post';
        this.rules = {
            table: {
                required : true,
                aliasName: '表名'
            }
        }
    }
}