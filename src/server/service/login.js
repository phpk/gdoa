module.exports = class extends think.Service {
    //创建密码
    createPassword(password, random = 9999, type = 1) {
        if (type == 1) {
            return think.md5(think.md5(password) + random);
        } else {
            return think.md5(random + think.md5(password));
        }
    }
    //校验密码
    checkPassword(uInfo, password, type = 1) {
        let xpassword = this.createPassword(password, uInfo['random'], type);
        if (type == 1 && xpassword == uInfo['password']) {
            return true;
        }
        if (type == 2 && xpassword == uInfo['password_account']) {
            return true;
        }
        return false;
    }
    //生成一个随机字符串
    randomString(len = 16) {
        let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
            maxPos = $chars.length,
            pwd = '';
        for (i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }
}