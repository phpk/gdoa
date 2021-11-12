const Base = require('./base.js');
/**
 # 菜单管理
 */
module.exports = class extends Base {
    /**
## 获取系统菜单
> 方法：GET

### 参数

> null          
### 正确返回
```json
{
    code : 200,
    data : {[]}
}
```
*/
    async listAction() {
        let menus = await this.cache('menus_' + this.adminId);
        //console.log(menus);
        return this.ok(menus)
    }
};
