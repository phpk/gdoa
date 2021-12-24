const Base = require('./base.js');
const fs = require('fs');
const path = require('path')
const rename = think.promisify(fs.rename, fs);
const mammoth = require('mammoth');
const pdf2html = require('pdf2html');
/**
 * @class
 * @apiDefine word 文档编辑器管理
 */
module.exports = class extends Base {

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
        let ext = this.post('ext');
        let end = file.path.split(".").pop();
        if (ext.indexOf(',') !== -1) {
            if (!ext.split(',').includes(end)) return this.fail('上传格式错误');
        } else {
            if (end != ext) return this.fail('上传格式错误');
        }
        
        let enableExt = ['doc', 'docx', 'pdf', 'txt', 'md', 'rtf'];

        if (!enableExt.includes(end)) return this.fail('不在系统可上传范围内');
        //let fileData = fs.readFileSync(file.path);
        let filename = file.name.replace('.' + end, '');
        //console.log(file.path)
        //console.log(fileData)
        try {
            let res;
            
            if (end == 'doc' || end == 'docx') {
                res = await this.toWord(file);
            }
            else if (end == 'pdf') {
                res = await this.toPdf(file);
            }
            //console.log(res)
            return this.success(res);

        } catch (e) {
            return this.fail(e.message)
        }
    }
    async toWord(file) {
        let name = Date.now() + ".docx",
            filepath = path.join(think.ROOT_PATH, 'www/upload/word/cache/' + name);
        think.mkdir(path.dirname(filepath));
        await rename(file.path, filepath);


        let options = {
            //transformDocument: mammoth.transforms.paragraph(transformParagraph),
            styleMap: [
                "p[style-name='Intro'] => p.intro",
                "p[style-name='List Bullet'] => ul > li:fresh",
                "b => em"
            ],
            includeDefaultStyleMap: true,
            convertImage: mammoth.images.imgElement(function (image) {
                return image.read("base64").then(function (imageBuffer) {
                    return {
                        src: "data:" + image.contentType + ";base64," + imageBuffer
                    };
                });
            })
        };
        let rt;
        try {
            rt = await mammoth.convertToHtml({ path: filepath, options });
            fs.unlink(filepath, a => { })
        } catch (e) {
            fs.unlink(filepath, a => { })
            console.log(e.message)
            rt.message = e.message;
        }
        return rt;
    }
    async toPdf(file) {
        let now = Date.now(),
            fpath = 'www/upload/word/cache/',
            pdfpath = path.join(think.ROOT_PATH, fpath + now + ".pdf");
        
        think.mkdir(path.dirname(pdfpath));
        await rename(file.path, pdfpath);
        return new Promise((reslove, reject) => { 
            return pdf2html.html(pdfpath, (err, value) => {
                if (err) {
                    console.error('Conversion error: ' + err)
                    fs.unlink(pdfpath, a => { })
                    reject(err)
                } else {
                    fs.unlink(pdfpath, a => { })
                    reslove({value})
                }
            })
        })
        
        
        
    }
}