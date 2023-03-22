const fs = require('fs');
let ctpl = {}, ltpl = {};

ctpl.start = `const Base = require('./base.js');
/**
 * @class
 * @apiDefine {{tags}} {{name}}管理
 */
module.exports = class extends Base {
`;
ctpl.list = `
    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = {group_id : this.groupId};
        if (param) wsql = this.parseSearch(param, wsql);
        let list = await this.model('{{tags}}').where(wsql).page(page, limit).order('id desc').select();
        let count = await this.model('{{tags}}').where(wsql).count();
        return this.success({ list, count })
    }
`;
ctpl.add = `
    async addAction() {
        let post = this.post();
        post.group_id = this.groupId;
        post.user_id = this.adminId;
        let id = await this.model('{{tags}}').add(post);
        return this.success(id);
    }
`;
ctpl.edit = `
    async editAction() {
        let post = this.post();
        let has = await this.model('{{tags}}').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        await this.model('{{tags}}').update(post);
        return this.success()
    }
`;
ctpl.editBefore = `
    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('{{tags}}').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        return this.success(data);
    }
`;

ctpl.del = `
    async delAction() {
        let id = this.post('id');
        if (!await this.hasData('{{tags}}', { id }))
            return this.fail('数据不存在')
        await this.model('{{tags}}').where({ id }).delete()
        return this.success()
    }
`;

ctpl.addBefore = `
    async addBeforeAction() {
        let data = await this.model('mod').getTree('{{cate}}');
        if (think.isEmpty(data)) return this.fail('数据为空')
        return this.success(data);
    }
`;
ctpl.editBeforeCate = `
    async editBeforeAction() {
        let id = this.get('id');
        let cate = await this.model('mod').getTree('{{cate}}');
        let data = await this.model('{{tags}}').where({ id }).find();
        data.cateName = await this.model('{{cate}}').where({cid : data.cid}).getField('title', true);
        if (think.isEmpty(data)) return this.fail('数据为空')
        return this.success({data,cate});
    }
`;
//7个方法
ctpl.cate = `
    async cateListAction() {
        let pid = this.get('pid')
        let data = await this.model('{{cate}}').where({pid}).order('id desc').select();
        
        data.forEach(async (el) => {
            el.haveChild = true;
            //如果数据量过大 直接设置有下游 不大参考如下
            // let has = await this.model('{{cate}}').where({pid : el.id}).count()
            // if(has > 0) {
            //     el.haveChild = true;
            // }else{
            //     el.haveChild = false;
            // }
        });
        return this.success({data})
    }

    async cateAddAction() {
        let post = this.post();
        let id = await this.model('{{cate}}').add(post);
        return this.success(id);
    }
    async cateAddBeforeAction() {
        let areaTree = await this.model('mod').getTree('{{cate}}');
        return this.success(areaTree);
    }
    async cateEnableAction() {
        let post = this.post(),
            id = post.id;

        if (!await this.hasData('{{cate}}', { id }))
            return this.fail("数据不存在");

        let rt = await this.model('{{cate}}')
            .where({ id })
            .update({
                status: post.status
            })
        await this.adminOpLog('设置地区可用');
        return this.success(rt)
    }
    async cateEditAction() {
        let post = this.post();
        let has = await this.model('{{cate}}').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        await this.model('{{cate}}').where({id : post.id}).update(post);
        return this.success()
    }

    async cateEditBeforeAction() {
        let id = this.get('id');
        let data = await this.model('{{cate}}').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        data.list = await this.model('mod').getTree('{{cate}}');
        if (data.pid > 0) {
            data.cname = await this.model('{{cate}}').where({id : data.pid}).getField('name', true)
        } else {
            data.cname = '顶层地区'
        }
        return this.success(data);
    }

    async cateDeleteAction() {
        let id = this.post('id');
        if (!await this.hasData('{{cate}}', { id }))
            return this.fail('数据不存在')
        let hasSun = await this.model('{{cate}}').where({pid : id}).find();
        if(!think.isEmpty)
            return this.fail('该分类下存在子分类')
        await this.model('{{cate}}').where({ id }).delete()
        return this.success()
    }
   
`;
ltpl.start = `module.exports = class extends think.Logic {`;
ltpl.list = `
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
            },
            param: {
                aliasName: '查询字段'
            }
        }
    }
`;
ltpl.add = `
    addAction() {
        this.allowMethods = 'post';
        this.rules = {}
    }
`;
ltpl.addBefore = `
    addBeforeAction() {
        this.allowMethods = 'get';
        this.rules = {}
    }
`;
ltpl.del = `
    delAction() {
        this.allowMethods = 'post';
        this.rules = {
            id: {
                int: { min: 1 },
                required: true
            }
        }
    }
`;
ltpl.editBefore = `
    editBeforeAction() {
        this.allowMethods = 'get';
        this.rules = {
            id: {
                int: { min: 1 },
                required: true
            }
        }
    }
`;
ltpl.editBeforeCate = `
    editBeforeCateAction() {
        this.allowMethods = 'get';
        this.rules = {
            id: {
                int: { min: 1 },
                required: true
            }
        }
    }
`;

ltpl.edit = `
    editAction() {
        this.allowMethods = 'post';
        this.rules = {
            id: {
                int: { min: 1 },
                required: true
            }
        }
    }
`;

let endTpl = `}`;
let htmlTpl = {};
//不带分类的模块
htmlTpl.list = require('./list.html.js');
htmlTpl.edit = require('./edit.html.js');
//带分类的模版
htmlTpl.listCate = require('./list-cate.html.js');
htmlTpl.editCate = require('./edit-cate.html.js');
htmlTpl.cate = require('./cate.html.js')
htmlTpl.cateEdit = require('./cate-edit.html.js')
module.exports = {
    ctpl,
    ltpl,
    endTpl,
    htmlTpl
}