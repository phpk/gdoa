const Base = require('./base.js');
const TIMEOUT = 24 * 3600 * 1000 * 36500 //100年不过期
/**
 * @class
 * @apiDefine user_base 用户管理基类
 */
module.exports = class extends Base {
    // constructor(ctx) {
    //     super(ctx);
    //   }
    //async __before() {
    //    console.log(this.userId)
        //this.userId = await this.session('userId')
        //this.groupId = await this.session('groupId')
    //}
    //地区
    async getSysArea() {
        let data = await this.cache("system_area");
        if(think.isEmpty(data)) {
            data = await this.model('area').where({status : 1}).select()
            await this.cache('system_area', data, {
                timeout: TIMEOUT
            });
        }
        return data;
    }
    //公司
    async getCompanyData() {
        let data = await this.cache(this.groupId + '_group_company');
        if(think.isEmpty(data)) {
            data = await this.upCacheCompany();
        }
        return data;
    }
    async upCacheCompany() {
        let data = await this.model('user_company').where({group_id : this.groupId}).select();
        await this.cache(this.groupId + '_group_company', data, {
            timeout: TIMEOUT
        });
        return data;
    }
    //部门
    async getDeptData() {
        let data = await this.cache(this.groupId + '_group_dept');
        if(think.isEmpty(data)) {
            data = await this.upCacheDept();
        }
        return data;
    }
    async upCacheDept() {
        let data = await this.model('user_dept').where({group_id : this.groupId}).select();
        await this.cache(this.groupId + '_group_dept', data, {
            timeout: TIMEOUT
        });
        return data;
    }
    //门店
    async getStoreData() {
        let data = await this.cache(this.groupId + '_group_store');
        if(think.isEmpty(data)) {
            data = await this.upCacheStore();
        }
        return data;
    }
    async upCacheStore() {
        let data = await this.model('user_store').where({group_id : this.groupId}).select();
        await this.cache(this.groupId + '_group_store', data, {
            timeout: TIMEOUT
        });
        return data;
    }
    //角色
    async getRoleData() {
        let data = await this.cache(this.groupId + '_group_role');
        if(think.isEmpty(data)) {
            data = await this.upCacheRole();
        }
        return data;
    }
    async upCacheRole() {
        let data = await this.model('user_role').where({group_id : this.groupId}).select();
        await this.cache(this.groupId + '_group_role', data, {
            timeout: TIMEOUT
        });
        return data;
    }
    //岗位
    async getPosData() {
        let data = await this.cache(this.groupId + '_group_pos');
        if(think.isEmpty(data)) {
            data = await this.upCachePos();
        }
        return data;
    }
    async upCachePos() {
        let data = await this.model('user_pos').where({group_id : this.groupId}).select();
        await this.cache(this.groupId + '_group_pos', data, {
            timeout: TIMEOUT
        });
        return data;
    }
    async getAuthData() {
        return await this.cache('group_perms_' + this.userId);
    }
    async getAuthMenu() {
        let authData = await this.getAuthData()
        return authData.menus;
    }
    async getStockData() {
        return await this.cache(this.groupId + '_stock_area');
    }
    async getProjectData() {
        return await this.cache(this.groupId + '_group_project');
    }

}