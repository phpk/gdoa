const Base = require('./base.js');
const TIMEOUT = 24 * 3600 * 1000 * 36500 //100年不过期
/**
 * @class
 * @apiDefine project_type 项目分类管理
 */
const catesData = {
	1 : '项目分类',
	2 : '文件分类',
    3 : '采购分类',
    4 : '合同分类',
    5 : '客户分类'
}
module.exports = class extends Base {
    constructor(ctx) {
        super(ctx);
        this.catesData = catesData;
    }
    async getCate(sid = 1) {
        let cates = await this.cache(this.groupId + '_projects_cate');
        if(think.isEmpty(cates)) {
            cates = await this.upCache()
        }
        return cates[sid] ? cates[sid] : []
    }
    getName(cates, id) {
        let data = cates.find(d => d.id == id)
        if(!think.isEmpty(data)) {
            return data.name
        }else{
            return ''
        }
    }
    async upCache() {
        let data = await this.model('project_type')
                    .where({group_id : this.groupId})
                    .select();
        let cates = {}
        data.forEach(d => {
            if(think.isEmpty(cates[d.sys_id])) cates[d.sys_id] = [];
            cates[d.sys_id].push(d)
        })
        await this.cache(this.groupId + '_projects_cate', cates, {
			timeout: TIMEOUT
		});
		return cates;
    }
}