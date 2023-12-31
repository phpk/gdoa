const Base = require('./base.js');
/**
 * @class
 * @apiDefine doc 文档管理
 */
module.exports = class extends Base {

    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = this.turnSearch(param, {user_id: this.userId});
        let list = await this.model('doc').where(wsql).page(page, limit).order('id desc').select();
        let count = await this.model('doc').where(wsql).count();
        return this.success({ list, count })
    }

    async addAction() {
        let post = this.getPost();
        let has = await this.model('doc').where({ key: post.key }).find()
        if (!think.isEmpty(has)) return this.fail('系统中存在相同的键')
        if (this.service('doc').checkPath(post.key)) return this.fail('系统中存在该目录')
     
        let add = {
            name: post.name,
            title: post.title,
            key: post.key,
            version: post.version,
            logo: 'img/logo.png',
            remark: post.remark,
            //summary: JSON.stringify(summary),
            user_id: this.userId,
            group_id : this.groupId
        }
        post.did = await this.model('doc').add(add);
        
        let topData = {
            title: '安装必读',
            name: '',
            content: '',
            type: 0,
            did: post.did,
            user_id: this.userId,
            group_id : this.groupId,
            have_child : 1
        }
        post.pid = await this.model('doc_cate').add(topData);
        //post.now = now;
        post.uid = this.userId;
        let fileData = this.service('doc').copyFile(post);
        await this.model('doc_cate').addMany(fileData);

        return this.success(post.did);
    }
    async addmdAction() {
        let post = this.post()
        let data = await this.model('doc').where({ id: post.did }).find();
        if (think.isEmpty(data)) return this.fail('文集不存在');
        //let summary = JSON.parse(data.summary);
        let has = await this.model('doc_cate').where({ did: post.did, name: post.name }).find();
        if (!think.isEmpty(has)) return this.fail('系统中存在相同的文件名');
        let pid = await this.getPid(post)
        let addData = {
            title: post.title,
            name: post.name,
            pid : pid,
            content: post.content,
            type: 1,
            did: post.did,
            user_id: this.userId,
            group_id : this.groupId,
            order_num : post.order_num*1 || 0
        }
        let id = await this.model('doc_cate').add(addData);
        await this.updateFile(post);
        return this.success()
    }
    async editmdAction() {
        let post = this.post()
        let data = await this.model('doc_cate').where({ id: post.id }).find();
        if (think.isEmpty(data)) return this.fail('数据不存在');
        //let summary = JSON.parse(data.summary);
        //如果更改了文件名
        if (post.name != data.name) {
            let has = await this.model('doc_cate').where({ did: data.did, name: post.name }).find();
            if (!think.isEmpty(has)) return this.fail('系统中存在相同的文件名');
        }

        let pid = await this.getPid(post);
        let upData = {
            title: post.title,
            name: post.name,
            pid: pid,
            content: post.content,
            type: 1,
            order_num: post.order_num*1
        }
        await this.model('doc_cate').where({ id: data.id }).update(upData);

        await this.updateFile(post);
        //分享处理
        await this.model('share').addHistory('doc_cate', this.userId, data, post);
        return this.success()

    }
    async getPid(post) {
        let pid = await this.model('doc_cate').where({ did: post.did, title: post.catename, type: 0 }).getField('id', true);
        if (!pid) {
            let cateData = {
                title: post.catename,
                name: '',
                content: '',
                type: 0,
                did: post.did,
                user_id: this.userId,
                group_id : this.groupId,
                order_num : 0,
                have_child : 1
            }
            pid = await this.model('doc_cate').add(cateData);
        }
        return pid;
    }
    async updateFile(post) {
        let cateList = await this.model('doc_cate').where({ did: post.did }).field('id,title,type,pid,name').order('order_num desc').select();
        let topCate = [];
        cateList.forEach(d => {
            if (d.type == 0) {
                topCate.push(d)
            }
        });
        topCate.forEach(d => {
            cateList.forEach(p => {
                if (p.pid == d.id) {
                    if (!d.child) d.child = [];
                    d.child.push(p)
                }
            });
        });
        post.cateList = topCate;
        post.key = await this.model('doc').where({id : post.did}).getField('key', true);
        await this.service('doc').addmd(post);
        // await this.model('doc').where({ id: post.did }).update({
        //     update_time: this.now()
        // })
    }
    async listmdAction() {
        let did = this.get('did');
        let pid = this.get('pid');
        let cateList = await this.model('doc_cate')
        .where({ did: did, pid : pid })
        .field('id,title,type,pid,name,add_time, up_time,order_num,have_child')
        .order('order_num desc').select();
        return this.success(cateList)
    }
    async editAction() {
        let post = this.post();
        let has = await this.model('doc').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        if (has.key != post.key) return this.fail('系统标志不允许更改')
        if (post.logo != has.logo) {
            await this.service('doc').changeLogo(post);
            post.logo = 'img/logo.png'
        }
        await this.model('doc').update(post);

        return this.success()
    }
    async backAction() {
        let did = this.post('did');
        let data = await this.model('doc').where({ id: did }).find()
        if (think.isEmpty(data)) return this.fail('数据不存在');
        let list = this.service('doc').getList(data.key);
        //console.log(JSON.stringify(list))
        //return;
        if (list && list.data) {
            //先清空
            await this.model('doc_cate').where({ did }).delete()
            let uid = this.userId, now = this.now();
            //await this.model('doc_cate').addMany()
            list.data.forEach(async d => {
                let addData = {
                    title: d.name,
                    name: '',
                    pid: 0,
                    content: '',
                    type: 0,
                    did: did,
                    user_id: this.userId,
                    group_id : this.groupId,
                    order_num: 0
                }
                let pid = await this.model('doc_cate').add(addData);
                if (pid && d.child && d.child.length > 0) {
                    let adds = [];
                    d.child.forEach(p => {
                        if (p && p.name) {
                            adds.push({
                                title: p.title,
                                name: p.name,
                                content: p.content,
                                type: 1,
                                did: did,
                                pid: pid,
                                user_id: this.userId,
                                group_id : this.groupId,
                                order_num: 0
                            });
                        }
                        
                    })
                    if (adds.length > 0) {
                        await this.model('doc_cate').addMany(adds)
                    }
                    
                }
            })
            return this.success()
        } else {
            return this.fail(list);
        }
        
    }
    async addBeforeAction() {
        let id = this.get('did');
        if(!id) return this.fail('id为空')
        let data = await this.model('doc').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        let list = await this.model('doc_cate').field('id,title').where({ type: 0, did: id }).select();
        return this.success(list);
    }
    async editmdBeforeAction() {
        let id = this.get('id');
        // if (!id) return this.fail('id为空')
        // let data = await this.model('doc_cate').where({ id }).find()
        // if (think.isEmpty(data)) return this.fail('数据为空')
        let rt = await this.model('share').viewBefore(id, 'doc_cate', this.userId);
        if(rt.code > 0) {
            return this.fail(rt.msg)
        }
        let data = rt.data;
        data.cate = await this.model('doc_cate').field('id,title').where({ type: 0, did: data.did }).select();
        data.cate.forEach(d => {
            if (d.id == data.pid) {
                data.catename = d.title
            }
        })
        return this.success(data)
    }
    
    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('doc').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        return this.success(data);
    }
    async delmdAction() {
        let { id, did } = this.post()
        let data = await this.model('doc_cate').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据不存在')
        if (data.type == 0) {
            let has = await this.model('doc_cate').where({ pid: id }).find()
            if(!think.isEmpty(has)) return this.fail('该目录下存在文档')
        }
        await this.model('doc_cate').where({ id }).delete()
        await this.updateFile({did});
        return this.success()
    }
    async editDataAction() {
        let { id, field, value } = this.post();
        if (!await this.hasData('doc_cate', { id }))
            return this.fail("编辑的数据不存在");
        if (field == 'order_num' && think.isNumber(value)) {
            return this.fail('排序应该为数字')
        }
        let up = {};
        up[field] = value;
        await this.model('doc_cate').where({ id }).update(up);

        return this.success()
    }
    async delAction() {
        let id = this.post('id');
        if(id < 3) return this.fail('系统文档不允许删除')
        let data = await this.model('doc').where({id}).find()
        if (think.isEmpty(data))
            return this.fail('数据不存在')
        await this.model('doc').where({ id }).delete()
        await this.model('doc_cate').where({ did: id }).delete()
        await this.service('doc').delDoc(data.key);
        return this.success()
    }
    
    async uploadAction() {
        let id = this.post('did');
        if (!id) return this.fail('id为空')
        let data = await this.model('doc').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        let fpath = data.key;
        const file = this.file('file[]');
        //console.log(this.file());
        if (!file) return this.fail(100, '请上传文件');
        let rt = await this.service('doc').uploadFile(file, fpath);
        if (!rt) return this.fail('上传格式错误')
        return this.success(rt)
    }
    async downAction() {
        let did = this.get('did');
        let docData = await this.model('doc').where({ id: did }).find();
        let cateList = await this.model('doc_cate').where({ did: did }).field('id,title,type,pid,name,content,order_num').order('order_num desc').select();
        
        const numberToString = (number) => {
            //if (number.match(/\D/) || number.length >= 14) return;
            let zhArray = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']; // 数字对应中文
            let baseArray = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万']; //进位填充字符，第一位是 个位，可省略
            let string = String(number).split('').reverse().map((item, index) => { // 把数字切割成数组并倒序排列，然后进行遍历转成中文
                // 如果当前位为0，直接输出数字， 否则输出 数字 + 进位填充字符
                item = Number(item) == 0 ? zhArray[Number(item)] : zhArray[Number(item)] + baseArray[index];
                return item;
            }).reverse().join(''); // 倒叙回来数组，拼接成字符串
            string = string.replace(/^一十/, '十');  // 如果以 一十 开头，可省略一
            string = string.replace(/零+/, '零');  // 如果有多位相邻的零，只写一个即可
            return string;
        } 
        let data = '# <center>'+ docData.title + '</center> \n\n\n', i = 0;

        cateList.forEach(d => {
            if (d.type == 0) {
                i++;
                data += '# 第' + numberToString(i * 1) + '章 ' + d.title + '  \n\n';
                
                let j = 0;
                cateList.forEach(dd => { 
                    if (d.id == dd.pid) {
                        j++;
                        dd.content = dd.content.replaceAll("](img/", "](/docs/" + docData.key + "/img/");
                        data += '## 第' + numberToString(j * 1) + '节 ' + dd.title + '  \n\n\n' + dd.content;
                        //data += dd.content;
                    }
                })
            }
        });
        return this.success({ data, title : docData.title });

    }
}