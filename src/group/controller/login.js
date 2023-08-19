const jwt = require('jsonwebtoken');
const svgCaptcha = require("svg-captcha");
const Utils = require('./utils')
/**
 * @class 
 * @apiDefine login 用户登录
 */
module.exports = class extends Utils {

	async dingAction() {
		let id = 1;
		if (think.isEmpty(id)) {
			return this.fail('id error');
		}
		let data = await this.cache(id + '_ding_setting');
		if (think.isEmpty(data) || !data.corpId) {
			return this.fail('请管理员在后台配置钉钉');
		}
		return this.success(data)
	}
	async dingAuthAction() {
		let code = this.get('code');
		let id = this.get('id') * 1;
		if (think.isEmpty(id)) {
			return this.fail('id error');
		}
		if (think.isEmpty(code)) {
			return this.fail('code error');
		}
		let acctoken = await this.model('ding').token(id);
		if(!acctoken) {
			return this.fail('请管理员在后台配置钉钉')
		}
		let d = await this.model('ding').getUserLoginInfo(acctoken, code);
		//console.log(d)
		if (d.errcode !== 0) {
			return this.fail(d.errmsg)
		}

		let username = d.result.unionid;
		let user = await this.model('user').where({
			username: username
		}).find();
		let userId = user.id;
		if (think.isEmpty(user)) {
			return this.fail('用户不存在');
		}
		if (user.status != 0) {
			return this.fail('用户被禁用');
		}
		
		let userToken = jwt.sign({
			userId: userId
		}, think.config('tokenKey'), {
			expiresIn: 60 * 60 * 12 //12小时过期
			//expiresIn:-1//永不过期
		});
		//设定权限缓存
		await this.ses('userId', userId);
		await this.cache('auth_' + userId, JSON.parse(user.users));
		//设置路由缓存
		await this.model('menu').cacheData(user);

		return this.success(userToken);

	}

	/**
	 * @api {post} login/do  用户登录
	 * @apiGroup login
	 */
	async loginInAction() {
		let post = this.post();
		//console.log(post)
		let chkCode = await this.chkCapcha(post.codekey, post.captcha);
		if (!chkCode) {
			return this.fail('验证码错误')
		}
		
		let user = await this.model('user').where({
			username: post.username,
			name: post.username,
			phone: post.username,
			_logic: 'OR'
		}).find();
		let userId = user.id;
		if (think.isEmpty(user)) {
			return this.fail('用户不存在');
		}
		if (user.status != 0) {
			return this.fail('用户被禁用');
		}
		let pwd = this.service('login').createPassword(post.password, user.salt);
		//console.log(pwd)
		if (pwd != user.password) {
			return this.fail('密码错误');
		}
		//生成一个16位的随机数
		let salt = this.service('login').randomString();
		let token = jwt.sign({
			userId: userId,
			username : user.username
		}, think.config('tokenKey'), {
			expiresIn: 60 * 60 * 12 //12小时过期
			//expiresIn:-1//永不过期
		});

		let password = this.service('login').createPassword(post.password, salt);
		//更新用户密码和登录状态
		await this.model('user')
			.where({
				id: userId
			})
			.update({
				password,
				salt,
				login_num: user.login_num + 1
			})
		await this.ses('userId', userId);
		//设定权限缓存
		await this.cache('auth_' + userId, JSON.parse(user.users));
		//设置路由缓存
		await this.model('menu').cacheData(user);

		return this.success(token);
	}
	
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
	async regDoAction() {
		let post = this.post();
		let chkCode = await this.chkCapcha(post.codekey, post.captcha);
		if (!chkCode) {
			return this.fail('验证码错误')
		}
		let user = await this.model('user').where({
			username: post.username
		}).find();
		if (!think.isEmpty(user)) {
			return this.fail('用户已存在');
		}
		let salt = this.service('login').randomString()
		let password = this.service('login').createPassword(post.password, salt);
		//console.log(pwd)
		let freeGroup = await this.model('group_role')
			.where({ isfree: 1, status: 1 })
			.find();
		let userAuth = think.config('userExt')
		let save = {
			username: post.username,
			name: post.name,
			password,
			salt,
			status: 0,
			login_num: 1,
			isadmin: 1,
			isleader: 1,
			rules: freeGroup.rules,
			rule_id: freeGroup.id,
			users: JSON.stringify(userAuth),
			group_id: 1
		}
		let userId = await this.model('user').add(save);
		
		return this.success(userId);
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
			mathMin: 1,
			mathMax: 30,
			mathOperator: "+",
			noise: 1, // 干扰线条的数量
			color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
			background: '#eeeeee' // 验证码图片背景颜色
		};
		const captcha = svgCaptcha.createMathExpr(option);
		await this.ses('captchaId', captcha.text);
		return this.success({svg : captcha.data});
	}
	async chkCapcha(key, code) {
		let verify = await this.ses('captchaId');
		if (verify != code) {
			return false;
		}
		//验证成功清空
		await this.ses(key, null);
		return true;
	}

};
