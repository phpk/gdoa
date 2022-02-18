const nodemailer = require('nodemailer');
module.exports = class extends think.Service {
	async send(to, title, content) {
		//设置邮箱配置
		let emailConf = think.config('email');
		//console.log(emailConf)
		let transporter = nodemailer.createTransport(emailConf);
		//设置收件人信息
		let mailOptions = {
			from: emailConf.from,//谁发的
			to: to,//发给谁
			subject: title,//主题是什么
			text: content,//文本内容
			//html: '',//html模板
			//附件信息
			//attachments: []
		};
		//发送邮件
		transporter.sendMail(mailOptions, (error, info) => {
			if (error)
				return console.log(error);
			console.log(`Message: ${info.messageId}`);
			console.log(`sent: ${info.response}`);
		});
	}
}