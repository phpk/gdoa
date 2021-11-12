const svgCaptcha = require("svg-captcha");
const jwt = require('jsonwebtoken');
const ADMINDIR = 'server';
/**
# 用户登录
*/
module.exports = class extends think.Controller {
/**
## 登录
> 方法：POST

### 参数

| **参数名** | **类型** | **说明** | **是否必填** |
| --- | --- | --- | --- |
|username| string|用户|√|
|password| string|密码| √|
|captcha | string|验证码 |√|
            
### 正确返回
```json
{
    code : 200,
    data : token|string
}
```
*/
    async doAction() {
        let post = this.post()
        if (!await this.chkCapcha(post.captcha)) {
            return this.err('验证码错误')
        }
        //杜绝用户反复查表
        let loginNum = await this.session('loginNum');
        loginNum = loginNum ? loginNum : 0;
        if (loginNum > 10) {
            return this.err('登录错误次数太多，大侠请留步，请一小时后再试!');
        }
        let admin = await this.model('admin').where({
            username: post.username
        }).find();
        let adminId = admin.admin_id;
        if (think.isEmpty(admin)) {
            await this.session('loginNum', loginNum + 1);
            return this.err('用户不存在');
        }
        if (admin.status < 1) {
            await this.session('loginNum', loginNum + 1);
            return this.err('用户被禁用');
        }
        let pwd = this.service('login').createPassword(post.password, admin.salt);
        //console.log(pwd)
        if (pwd != admin.password) {
            await this.session('loginNum', loginNum + 1);
            return this.err('密码错误');
        }
        //生成一个16位的随机数
        let salt = this.service('login').randomString(),
            md5Salt = think.md5(salt);
        let token = jwt.sign({
            adminId: adminId
        }, md5Salt, {
            expiresIn: 60 * 60 * 1 //1小时过期
        });

        let password = this.service('login').createPassword(post.password, salt);
        //更新用户密码和登录状态
        await this.model('admin')
            .where({ admin_id: adminId })
            .update({
                password,
                salt,
                login_num: admin.login_num + 1,
                login_time : this.now()
            })
        //添加缓存
        await this.session('adminId', adminId);
        //只允许一个帐号在一个端下登录
        await this.cache('admin_' + adminId, md5Salt);
        //设置路由缓存
        let routeData = await this.model('menu').list(adminId);
        await this.cache('perms_' + adminId, routeData.perms);
        //设置菜单缓存
        await this.cache('menus_' + adminId, routeData.menus);
        console.log(routeData)
        //jwt校验用
        await this.session('salt', md5Salt);
        //设定保活
        await this.session('statusTime', this.now());
        //添加登录日志
        this.adminId = adminId;
        this.adminLog(admin.username + '登录');
        return this.ok(token);
    }
/**

## 获取验证码
> 方法：GET

### 参数
> null

### 正确返回
```bash
base64位图片
```
*/
    async captchaAction() {
        let option = {
            size: 4, // 验证码长度
            ignoreChars: '0o1ilI', // 验证码字符中排除 0o1i
            noise: 1, // 干扰线条的数量
            color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
            background: '#eeeeee' // 验证码图片背景颜色
        };
        const captcha = svgCaptcha.create(option);
        await this.session('verifyCaptcha', captcha.text.toLowerCase());
        this.header('Content-Type', 'image/svg+xml');
        this.ctx.body = captcha.data;
    }
    //验证验证码
    async chkCapcha(code) {
        let verify = await this.session('verifyCaptcha');
        if (verify != code.toLowerCase()) {
            return false;
        }
        //验证成功清空
        await this.session('verifyCaptcha', null);
        return true;
    }

};
