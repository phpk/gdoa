const svgCaptcha = require("svg-captcha");
const jwt = require('jsonwebtoken');
/**
 * @class 
 * @apiDefine login 用户登录
 */
module.exports = class extends think.Controller {
    /**
     * @api {post} login/do  用户登录
     * @apiGroup login
     *
     * @apiParam {string} username 用户 必填
     * @apiParam {string} password 密码 必填
     * @apiParam {string} captcha 验证码 必填
     *
     * @apiSuccess {number}  code   结果码
     * @apiSuccess {string} data   数据
     * @apiSuccess {string} message  提示
     *
     * @apiSuccessExample Success-Response:
     * {
     * "code": 0,
     * "message": "ok",
     * "data":token
     * }
     */
    async doAction() {
        let post = this.post();
        if (!await this.chkCapcha(post.captcha)) {
            return this.fail('验证码错误')
        }
        //杜绝用户反复查表
        let userLoginNum = await this.session('userLoginNum');
        userLoginNum = userLoginNum ? userLoginNum : 0;
        if (userLoginNum > 10) {
            return this.fail('登录错误次数太多，大侠请留步，请一小时后再试!');
        }
        let user = await this.model('user').where({
            username: post.username
        }).find();
        let userId = user.user_id;
        if (think.isEmpty(user)) {
            await this.session('userLoginNum', userLoginNum + 1);
            return this.fail(101, '用户不存在');
        }
        if (user.status != 0) {
            await this.session('userLoginNum', userLoginNum + 1);
            return this.fail('用户被禁用');
        }
        let pwd = this.service('login', 'admin').createPassword(post.password, user.salt);
        //console.log(pwd)
        if (pwd != user.password) {
            await this.session('userLoginNum', userLoginNum + 1);
            return this.fail('密码错误');
        }
        //生成一个16位的随机数
        let salt = this.service('login', 'admin').randomString(),
            md5Salt = think.md5(salt);
        let token = jwt.sign({
            userId: userId
        }, md5Salt, {
            expiresIn: 60 * 60 * 12 //12小时过期
            //expiresIn:-1//永不过期
        });

        let password = this.service('login','admin').createPassword(post.password, salt);
        //更新用户密码和登录状态
        await this.model('user')
            .where({
                user_id: userId
            })
            .update({
                password,
                salt,
                login_num: user.login_num + 1,
                login_time: this.now()
            })
        //添加缓存
        await this.session('userId', userId);
        //只允许一个帐号在一个端下登录
        await this.cache('user_' + userId, md5Salt, {
            type: 'redis',
            redis: {
                timeout: 6 * 60 * 60 * 1000
            }
        });
        //聊天服务器用
        await this.cache('token_' + think.md5(token), userId, {
            type: 'redis',
            redis: {
                timeout: 6 * 60 * 60 * 1000
            }
        });
        //console.log('token_' + think.md5(token))
        //设置路由缓存
        let routeData = await this.model('menu').cacheData(userId);
        //console.log(routeData)
        //jwt校验用
        await this.session('salt', md5Salt);
        //console.log(md5Salt)
        //设定保活
        await this.session('statusTime', this.now());
        //添加登录日志
        delete post.password;
        let logData = {
            user_id: userId,
            log: user.username + '用户登录',
            data: JSON.stringify(post),
            ip: this.ctx.ip,
            agent: this.ctx.userAgent,
            url: this.ctx.path,
            method: this.ctx.method,
            addtime: this.now()
        };
        await think.model('user_loginlog').add(logData);
        return this.success({ token, routeData });
    }
    /**
     * 
     * @api {get} login/captcha 获取验证码
     * @apiGroup login
     * @apiDescription 返回base64位图片
     * 
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
        //return this.success({ img: captcha.data })
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