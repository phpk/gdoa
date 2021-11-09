const svgCaptcha = require("svg-captcha");
module.exports = class extends think.Controller {
    async captchaAction() {
        let option = {
            size: 4, // 验证码长度
            ignoreChars: '0o1ilI', // 验证码字符中排除 0o1i
            noise: 1, // 干扰线条的数量
            //color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
            //background: '#ba00cd' // 验证码图片背景颜色
        };
        const captcha = svgCaptcha.create(option);
        await this.session('verify', captcha.text.toLowerCase());
        this.header('Content-Type', 'image/svg+xml');
        this.ctx.body = captcha.data;
    }
};
