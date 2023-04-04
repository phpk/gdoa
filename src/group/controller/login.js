const jwt = require('jsonwebtoken');
//const userDIR = 'server';
/**
 * @class 
 * @apiDefine login 用户登录
 */
module.exports = class extends think.Controller {
	indexAction() {
		return this.display();
	}
	regAction() {
		return this.display();
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
	async doAction() {
		let post = this.post();
		let chkCode = await this.chkCapcha(post.captcha);
		if (!chkCode) {
			return this.fail('验证码错误')
		}
		//杜绝用户反复查表
		let loginNum = await this.session('loginNum');
		loginNum = loginNum ? loginNum : 0;
		if (loginNum > 10) {
			return this.fail('登录错误次数太多，大侠请留步，请一小时后再试!');
		}
		let user = await this.model('user').where({
			username: post.username
		}).find();
		let userId = user.id;
		if (think.isEmpty(user)) {
			await this.session('loginNum', loginNum + 1);
			return this.fail('用户不存在');
		}
		if (user.status != 0) {
			await this.session('loginNum', loginNum + 1);
			return this.fail('用户被禁用');
		}
		let pwd = this.service('login').createPassword(post.password, user.salt);
		//console.log(pwd)
		if (pwd != user.password) {
			await this.session('loginNum', loginNum + 1);
			return this.fail('密码错误');
		}
		//查询用户租户
		let groupData = await this.model('user_group')
						.where({id : user.group_id})
						.find()
		if(think.isEmpty(groupData)){
			return this.fail('租户不存在');
		}
		if(this.now() > this.now(groupData.end_time)) {
			return this.fail('租户已过期');
		}
		//生成一个16位的随机数
		let salt = this.service('login').randomString(),
			md5Salt = think.md5(salt);
		let token = jwt.sign({
			userId: userId
		}, md5Salt, {
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
		
		
		//添加缓存
		await this.session('userId', userId);
		await this.session('groupId', user.group_id);
		//设定权限缓存
		await this.cache('auth_' + userId, JSON.parse(user.users));
		//设置路由缓存
		await this.model('menu').cacheData(user);
		//console.log(routeData)
		//jwt校验用
		await this.session('GroupSalt', md5Salt);

		await this.session('loginNum', null);
		
		return this.success(token);
	}
	/**
	 * 
	 * @api {get} login/captcha 获取验证码
	 * @apiGroup login
	 * @apiDescription 返回base64位图片
	 * 
	 */

	async captchaAction() {
		let captchaData = await this.getCaptcha();
		this.header('Content-Type', 'image/svg+xml');
		this.ctx.body = captchaData;
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
		let chkCode = await this.chkCapcha(post.captcha);
		if (!chkCode) {
			return this.fail('验证码错误')
		}
		//杜绝用户反复查表
		let loginNum = await this.session('regNum');
		loginNum = loginNum ? loginNum : 0;
		if (loginNum > 10) {
			return this.fail('注册错误次数太多，大侠请留步，请一小时后再试!');
		}
		let user = await this.model('user').where({
			username: post.username
		}).find();
		if (!think.isEmpty(user)) {
			await this.session('regNum', loginNum + 1);
			return this.fail('用户已存在');
		}
		let freeGroup = await this.model('group_role')
			.where({ isfree: 1, status: 1 })
			.find()
		if (think.isEmpty(freeGroup)) {
			await this.session('regNum', loginNum + 1);
			return this.fail('免费申请已结束')
		}
		let salt = this.service('login').randomString()
		let password = this.service('login').createPassword(post.password, salt);
		//console.log(pwd)
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
			rule_id : freeGroup.id,
			users: JSON.stringify(userAuth),
			group_id: 0
		}
		let userId = await this.model('user').add(save);
		let thisnow = new Date().getTime();
		let addGroup = {
			name : post.name,
			contact : post.contact,
			tel : post.tel,
			user_id : userId,
			isfree : 1,
			role_id : freeGroup.id,
			limit_user : freeGroup.limit_user,
			use_user : 1,
			start_time : think.datetime(thisnow, 'YYYY-MM-DD HH:mm:ss'),
			end_time : think.datetime(thisnow + 86400*1000*freeGroup.time_limit, 'YYYY-MM-DD HH:mm:ss')

		}
		let groupId = await this.model('user_group').add(addGroup)
		//更新用户组
		await this.model('user').update({id : userId, group_id : groupId})

		return this.success(userId);
	}

};
