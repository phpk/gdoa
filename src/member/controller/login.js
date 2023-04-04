const svgCaptcha = require("svg-captcha");
const jwt = require('jsonwebtoken');
//const memberDIR = 'server';
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
		let loginNum = await this.session('loginNum');
		loginNum = loginNum ? loginNum : 0;
		if (loginNum > 10) {
			return this.fail('登录错误次数太多，大侠请留步，请一小时后再试!');
		}
		let member = await this.model('member').where({
			username: post.username
		}).find();
		let memberId = member.member_id;
		if (think.isEmpty(member)) {
			await this.session('loginNum', loginNum + 1);
			return this.fail('用户不存在');
		}
		if (member.status != 0) {
			await this.session('loginNum', loginNum + 1);
			return this.fail('用户被禁用');
		}
		let pwd = this.service('login').createPassword(post.password, member.salt);
		//console.log(pwd)
		if (pwd != member.password) {
			await this.session('loginNum', loginNum + 1);
			return this.fail('密码错误');
		}
		//生成一个16位的随机数
		let salt = this.service('login').randomString(),
			md5Salt = think.md5(salt);
		let token = jwt.sign({
			memberId: memberId
		}, md5Salt, {
			expiresIn: 60 * 60 * 12 //12小时过期
			//expiresIn:-1//永不过期
		});

		let password = this.service('login').createPassword(post.password, salt);
		//更新用户密码和登录状态
		await this.model('member')
			.where({
				member_id: memberId
			})
			.update({
				password,
				salt,
				login_num: member.login_num + 1,
				login_time: this.now()
			})
		//添加缓存
		await this.session('memberId', memberId);
		//只允许一个帐号在一个端下登录
		await this.cache('member_' + memberId, md5Salt);
		//设置路由缓存
		let routeData = await this.model('menu').cacheData(memberId);
		//console.log(routeData)
		//jwt校验用
		await this.session('salt', md5Salt);
		//console.log(md5Salt)
		
		return this.success({
			token,
			routeData
		});
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
			mathMin : 1,
			mathMax : 30,
			mathOperator: "+",
			noise: 1, // 干扰线条的数量
			color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
			background: '#eeeeee' // 验证码图片背景颜色
		};
		const captcha = svgCaptcha.createMathExpr(option);
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
		if (!await this.chkCapcha(post.captcha)) {
			return this.fail('验证码错误')
		}
		//杜绝用户反复查表
		let loginNum = await this.session('regNum');
		loginNum = loginNum ? loginNum : 0;
		if (loginNum > 10) {
			return this.fail('注册错误次数太多，大侠请留步，请一小时后再试!');
		}
		let member = await this.model('member').where({
			username: post.username
		}).find();
		if (!think.isEmpty(member)) {
			await this.session('regNum', loginNum + 1);
			return this.fail('用户已存在');
		}
		let freeGroup = await this.model('member_role')
			.where({ isfree: 1, status: 1 })
			.find()
		if (think.isEmpty(freeGroup)) {
			await this.session('regNum', loginNum + 1);
			return this.fail('免费申请已结束')
		}

		let salt = this.service('login').randomString()
		let password = this.service('login').createPassword(post.password, salt);
		//console.log(pwd)
		let save = {
			username: post.username,
			password,
			salt,
			status: 0,
			login_num: 1,
			add_time: this.now(),
			login_time: this.now(),
			group_id : 0
		}
		let member_id = await this.model('member').add(save);
	
		
		return this.success({
			member_id
		});
	}

};
