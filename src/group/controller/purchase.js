const ProjectBase = require('./project_base.js');
const xlsx = require('node-xlsx').default;
const fs = require('fs');
/**
 * @class
 * @apiDefine purchase 采购列表管理
 */
module.exports = class extends ProjectBase {

    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = this.turnSearch(param, {user_id : this.userId});
        let list = await this.model('purchase')
                    .where(wsql)
                    .page(page, limit)
                    .order('id desc')
                    .select();
        let cates = await this.getCate(3)
        list.forEach(d => {
			d.cname = this.getName(cates, d.type)
		})
        let count = await this.model('purchase').where(wsql).count();
        return this.success({ list, count })
    }
    async addBeforeAction() {
		let cates = await this.getCate(3)
		return this.success(cates);
	}
    async addAction() {
        let post = this.post();
        post.group_id = this.groupId;
        post.user_id = this.userId;
        let id = await this.model('purchase').add(post);
        return this.success(id);
    }

    async editAction() {
        let post = this.post();
        let has = await this.model('purchase').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        if(has.status > 0) {
            return this.fail('审核状态不可编辑')
        }
        await this.model('purchase').update(post);
        return this.success()
    }

    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('purchase').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        let cates = await this.getCate(3)
        return this.success({data,cates});
    }

    async delAction() {
        let id = this.post('id');
        let statusCheck = await this.model('purchase').where({ id }).find()
        if(think.isEmpty(statusCheck)) {
            return this.fail('数据不存在')
        }
        if(statusCheck.status > 0) {
            return this.fail('审核状态不可编辑')
        }
        await this.model('purchase').where({ id }).delete()
        return this.success()
    }
    async detailAction() {
        let { page, limit, param,pur_id, pid } = this.get();
        let wsql = {group_id: this.groupId, pur_id, pid};
        if (param) wsql = this.turnSearch(param, wsql);
        let list = await this.model('purchase_list')
                    .where(wsql)
                    .page(page, limit)
                    .order('id asc')
                    .select();
        let sum = 0;
        list.forEach(d => {
            sum += d.all_price
        })
        list.forEach(d => {
            d.per = d.all_price > 0 ? (d.all_price/sum).toFixed(5) : 0
        })
        let count = await this.model('purchase_list').where(wsql).count();
        return this.success({ list, count })
    }
    async addOneAction() {
        let post = this.getPost();

        let statusCheck = await this.model('purchase').where({ id: post.pur_id }).find()
        if(think.isEmpty(statusCheck) || statusCheck.status > 0) {
            return this.fail('审核状态不可编辑')
        }

        post = this.parsePrice(post);
        let id = await this.model('purchase_list').add(post);
        if(post.write_supplier*1 > 0) {
            await this.writeSupplier(post, id);  
        }
        return this.success(id);
    }
    async writeSupplier(post, id) {
        if(think.isEmpty(post.supplier_name)){
            return this.fail('厂家名不能为空')
        }
        let hasSupplier = await this.model('supplier').where({
            name : post.supplier_name,
            group_id : this.groupId
        }).find()
        let supplier_id;
        if(think.isEmpty(hasSupplier)) {
            supplier_id = await this.model('supplier').add({
                name : post.supplier_name,
                group_id : this.groupId,
                user_id : this.userId
            })
        }else{
            supplier_id = hasSupplier.id;
        }
        let hasGoods = await this.model('supplier_goods').where(
            {
                supplier_id,
                name : post.name,
                model : post.desc
            }
        ).find()
        let goodsId;
        if(think.isEmpty(hasGoods)) {
            let goodsData = {
                name : post.name,
                price : post.price,
                price_show : post.price,
                model : post.desc,
                supplier_id,
                supplier_name : post.supplier_name,
                group_id : this.groupId,
                user_id : this.userId
            }
            goodsId = await this.model('supplier_goods').add(goodsData)
        }else{
            goodsId = hasGoods.id;
        }
        await this.model('purchase_list').where({ id }).update({goods_id : goodsId})
    }
    async editOneBeforeAction() {
        let id = this.get('id');
        let data = await this.model('purchase_list').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        return this.success(data);
    }
    parsePrice(data) {
        data.pid = data.pid*1;
        data.pur_id = data.pur_id*1;
        if(data.price && !data.all_price) {
            data.all_price = data.price*data.num;
        }
        if(!data.price && data.all_price) {
            data.price = data.all_price/data.num;
        }
        return data;
    }
    async editOneAction() {
        let post = this.post();
        let has = await this.model('purchase_list').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');

        let statusCheck = await this.model('purchase').where({ id: has.pur_id }).find()
        if(think.isEmpty(statusCheck) || statusCheck.status > 0) {
            return this.fail('审核状态不可编辑')
        }

        post = this.parsePrice(post);
        post.pur_id = has.pur_id;
        await this.model('purchase_list').update(post);
        if(post.write_supplier*1 > 0) {
            await this.writeSupplier(post, has.id);  
        }
        return this.success()
    }
    async delOneAction() {
        let id = this.post('id')*1;
        let has = await this.model('purchase_list').where({ id }).find();
        if (think.isEmpty(has)) return this.fail('删除的数据不存在');

        let statusCheck = await this.model('purchase').where({ id: has.pur_id }).find()
        if(think.isEmpty(statusCheck) || statusCheck.status > 0) {
            return this.fail('审核状态不可编辑')
        }

        if(has.pid < 1) {
            let hasSun = await this.model('purchase_list').where({ pid: id }).find();
            //console.log(hasSun)
            if (!think.isEmpty(hasSun)) return this.fail('该数据下存在子项');
        }
        await this.model('purchase_list').where({ id }).delete()
        return this.success()
    }
    async importAction() {
        let {type, pur_id, pid} = this.get();
        let statusCheck = await this.model('purchase').where({ id: pur_id }).find()
        if(think.isEmpty(statusCheck) || statusCheck.status > 0) {
            return this.fail('审核状态不可编辑')
        }

        const file = this.file('file');
        let end = file.path.split(".").pop();
        if(end !== 'xlsx'){
            return this.fail('上传文件格式错误')
        }
        //console.log(file);
        const jsonData = xlsx.parse(file.path, {
			cellDates: true
		});
        let resData = jsonData[0].data;
        resData.shift();
        if(resData.length > 0) {
            let saveData = [];
            let group_id = this.groupId;
            let user_id = this.userId;
            if(type == 'one') {
                resData.forEach(d => {
                    let s = {
                        no : d[0],
                        name : d[1],
                        all_price : d[2],
                        num : d[3],
                        remark : d[4],
                        pur_id : pur_id,
                        pid : 0,
                        group_id,
                        user_id
                    }
                    saveData.push(s)
                })
            }else{
                resData.forEach(d => {
                    let s = {
                        name : d[0],
                        desc : d[1] ? d[1] : '',
                        supplier_name : d[2] ? d[2] : '',
                        price : d[3]*1,
                        num : d[4]*1,
                        all_price : d[3] ? d[3] * d[4] : 0,
                        remark : d[6] ? d[6] : '',
                        pur_id : pur_id,
                        pid : pid,
                        group_id,
                        user_id
                    }
                    if(s.name) {
                        saveData.push(s)
                    }
                    
                })
            }
            await this.model('purchase_list').addMany(saveData)
        }
        //unlink(file.path)
        //await fs.unlink(file.path, res => { });
        return this.success()
    }
    async importGoodsAction() {
        const {pid, goods_id, pur_id} = this.post()

        let statusCheck = await this.model('purchase').where({ id: pur_id }).find()
        if(think.isEmpty(statusCheck) || statusCheck.status > 0) {
            return this.fail('审核状态不可编辑')
        }

        let has = await this.model('purchase_list').where({ goods_id, pur_id}).find()
        if(!think.isEmpty(has)) {
            return this.fail('该商品已导入')
        }
        let data = await this.model('supplier_goods').where({id : goods_id}).find()
        if(think.isEmpty(data)) {
            return this.fail('该商品不存在')
        }
        let s = {
            name : data.name,
            desc : data.model,
            supplier_name : data.supplier_name,
            price : data.price,
            num : 1,
            all_price : data.price,
            remark : data.remark,
            goods_id,
            pur_id,
            pid,
            group_id : this.groupId,
            user_id : this.userId
        }
        await this.model('purchase_list').add(s)
        return this.success()
    }
    async editDataAction() {
        let {id, field, value} = this.post();
        let has = await this.model('purchase_list').where({id}).find()

        let statusCheck = await this.model('purchase').where({ id: has.pur_id }).find()
        if(think.isEmpty(statusCheck) || statusCheck.status > 0) {
            return this.fail('审核状态不可编辑')
        }
        if (think.isEmpty(has))
            return this.fail("编辑的数据不存在");
        if (field == 'num' && think.isNumber(value)) {
            return this.fail('应该为数字')
        }
        if (field == 'price' && think.isNumber(value)) {
            return this.fail('应该为数字')
        }
        if (field == 'all_price' && think.isNumber(value)) {
            return this.fail('应该为数字')
        }
        let up = {};
        up[field] = value;
        if(field == 'num') {
            up.all_price = has.price*value;
        }
        if(field == 'price') {
            up.all_price = has.num*value;
        }
        if(field == 'all_price') {
            up.price = value/has.num;
        }
        await this.model('purchase_list').where({ id }).update(up);
        return this.success()
    }
    async countOneAction() {
        let pur_id = this.post('pur_id')*1
        let pid = this.post('pid') * 1 || 0
        let statusCheck = await this.model('purchase').where({ id: pur_id }).find()
        if(think.isEmpty(statusCheck) || statusCheck.status > 0) {
            return this.fail('审核状态不可编辑')
        }
        let list = await this.model('purchase_list').where({pur_id}).select()
        let top = []
        list.forEach(d => {
            if(d.pid  == pid) {
                top.push({
                    id : d.id,
                    num : 0,
                    price : 0,
                    all_price : 0
                })
            }
        })
        top.forEach(d => {
            list.forEach(k => {
                if(k.pid == d.id) {
                    d.num = d.num + k.num;
                    //d.price = d.price + k.all_price
                    d.all_price = d.all_price + k.all_price
                    //d.price = d.price + k.price
                }
            })
            d.price = d.all_price/d.num;
            //d.num = 0;
            //d.num = 
            //d.all_price = d.num*d.price
        })
        await this.model('purchase_list').updateMany(top)
        return this.success()
    }
    async delAllAction() {
        let {pur_id, ids} = this.post();
        let statusCheck = await this.model('purchase').where({ id: pur_id }).find()
        if(think.isEmpty(statusCheck) || statusCheck.status > 0) {
            return this.fail('审核状态不可删除')
        }
        let listIds = await this.model('purchase_list').where({
            pur_id, id : ["IN", ids]
        }).getField('id');
        if(think.isEmpty(listIds)){
            return this.fail('数据不存在')
        }
        let hasSun = await this.model('purchase_list').where({
            pid : ["IN", listIds]
        }).select()
        if(hasSun && hasSun.length > 0) {
            return this.fail('数据存在子项')
        }
        await this.model('purchase_list').where({
            id : ["IN", listIds]
        }).delete()
        return this.success()

    }
    async tickApproveAction() {
        let post = this.post();
        //console.log(post)
        let has = await this.model('purchase').where({ id: post.pur_id }).find();
        if (think.isEmpty(has)) return this.fail('数据不存在');
        if(has.status > 0) {
            return this.fail('审核状态不可提交')
        }
        let db = this.model('approve');
        await db.startTrans()
        try {
            let rt = await db.tickApprove(this.groupId, this.userId, 2, 0, has.id, '');
            if(rt.code > 0) {
                db.rollback()
                return this.fail(rt.msg)
            }else{
                db.commit()
                return this.success();
            }

        } catch (e) {
            db.rollback()
            return this.fail(e.message)
        }
    }
    async tockAction() {
        let id = this.post('id');
        //console.log(id)
        let data = await this.model('purchase_list').where({id}).find();
        if(think.isEmpty(data)) {
            return this.fail('数据不存在')
        }
        if(data.status > 0) {
            return this.fail('已提交')
        }
        if(data.all_price < 1) {
            return this.fail('提交的预算金额不能小于1 ')
        }
        let purId = data.pur_id;
        let statusCheck = await this.model('purchase').where({ id: purId }).find()
        console.log(statusCheck)
        if(think.isEmpty(statusCheck) || statusCheck.status < 1) {
            return this.fail('请先提交全局审核')
        }
        let list =await this.model('purchase_list').where({pur_id : purId}).select();
        //查找所有的父Id
        let topArr = []
        let findTop = (pid) => {
            list.forEach(d => {
                if(d.id === pid) {
                    topArr.push(d.id)
                    if(d.pid > 0) {
                        findTop(d.pid)
                    }
                }
            })
        }
        findTop(data.pid);
        //查找所有的子id
        let sunArr = []
        let findSun = (id) => {
            list.forEach(d => {
                if(d.pid === id) {
                    sunArr.push(d.id);
                    findSun(d.id)
                }
            })
        }
        findSun(data.id)
        //console.log(topArr)
        //console.log(sunArr)
        //如果父id有提交的则禁止提交
        let hasTop = false;
        topArr.forEach(d => {
            let topData = list.find(t => {
                return t.id == d.id
            })
            if(topData && topData.status > 0) {
                hasTop = true;
            }
        })
        if(hasTop) {
            return this.fail('父类已提交，无需重复提交！')
        }
        let hasSun = false;
        sunArr.forEach(d => {
            let sunData = list.find(t => {
                return t.id == d.id
            })
            if(sunData && sunData.status > 0) {
                hasSun = true;
            }
        })
        if(hasSun) {
            return this.fail('有提交的子项，请逐步提交子项！')
        }
        let allTick = 0, hasTick = 0;
        list.forEach(d => {
            if(d.pid === 0) {
                allTick += d.all_price;
            }
            if(d.status > 0 || d.id == data.id) {
                hasTick += d.all_price;
            }
        })
        if(hasTick > allTick) {
            return this.fail('已超额提交')
        }
        let db = this.model('approve');
        await db.startTrans()
        try {
            let rt = await db.tickApprove(this.groupId, this.userId, 6, 0, data.id, '');
            if(rt.code > 0) {
                db.rollback()
                return this.fail(rt.msg)
            }else{
                db.commit()
                return this.success();
            }

        } catch (e) {
            db.rollback()
            return this.fail(e.message)
        }
        //return this.success()
    }
    async viewBuyDataInfoAction() {
        let id = this.get('id');
        let info = await this.model('purchase_list').where({id}).find();
        //let data = await this.model('purchase_list').where({id}).find();
        let listAll = await this.model('purchase_list').where({pur_id : info.pur_id}).select();
        let data = [],list = [];
        console.log(listAll)
        listAll.forEach(d => {
            if(d.id == id) {
                data.push(d)
            }
            if(d.pid == id) {
                list.push(d)
            }
        })
        list.forEach(d => {
            d.have_child = false;
            listAll.forEach(e => {
                if(e.pid == d.id) {
                    d.have_child = true;
                }
            })
        })

        return this.success({data, list, count : list.length})
    }
}