const Base = require('./base.js');
const fs = require('fs');
const path = require('path')
const rename = think.promisify(fs.rename, fs);
const textract = require('textract');
const { createWorker } = require('tesseract.js');
//const pdf2html = require('pdf2html');
/**
 * @class
 * @apiDefine word 文档编辑器管理
 */
module.exports = class extends think.Controller {
//module.exports = class extends Base {
    async listAction() {
        let { page, limit, param } = this.get();
        let wsql = {};
        if (param) wsql = this.parseSearch(param, wsql);
        let list = await this.model('word').where(wsql).page(page, limit).order('id desc').select();
        let count = await this.model('word').where(wsql).count();
        return this.success({ list, count })
    }

    async addAction() {
        let post = this.post();
        let id = await this.model('word').add(post);
        return this.success(id);
    }

    async editAction() {
        let post = this.post();
        let has = await this.model('word').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        await this.model('word').update(post);
        return this.success()
    }

    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('word').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        return this.success(data);
    }

    async delAction() {
        let id = this.post('id');
        if (!await this.hasData('word', { id }))
            return this.fail('数据不存在')
        await this.model('word').where({ id }).delete()
        return this.success()
    }
    async openFileAction() {
        const file = this.file('file');
        //console.log(file);
        if (!file) return this.fail('请上传文件');
        let end = file.path.split(".").pop();
        let filename = Date.now() + '.' + end,
            filepath = path.join(think.ROOT_PATH, 'www/upload/word/cache/' + filename)
        try {
            think.mkdir(path.dirname(filepath));
            await rename(file.path, filepath);
            let res;
            let imgs = ['bmp', 'jpg', 'png', 'pbm'];
            if (imgs.includes(end)) {
                res = await this.openPic(filepath);
            } else {
                res = await this.openText(filepath);
            }
            
            //console.log(err)
            //console.log(res)
            fs.unlink(filepath, e => { })
            return this.success(res);

        } catch (e) {
            return this.fail(e.message)
        }
    }
    async openText(filepath) {
        return new Promise((reslove, reject) => {
            textract.fromFileWithPath(filepath, function (error, text) {
                reslove(text)
                console.log(error)
            })
        })
    }
    async openPic(filepath) {
        const worker = createWorker({
            logger: m => console.log(m)
        });
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        //onst { data: { text } } = await worker.recognize(filepath);
        const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');

        console.log(text)
        await worker.terminate();
        return text;
            
    }
    
}