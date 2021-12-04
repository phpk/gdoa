const path = require('path');
const fs = require('fs');
const cachePath = path.join(think.ROOT_PATH, 'data/mod/');
const srcPath = path.join(think.ROOT_PATH, 'src/');
module.exports = class extends think.Service {
    addApi(mod, post) {
        let cPath = cachePath + mod.server_path + '/controller/' + mod.key + '.json';
        let cData = require(cPath);
        cData.funcs[post.key] = { info: post };
        let comments = `\t/**\n\t* @name ${post.name}\n\t*/\n\t`;
        cData.content += `${comments}async ${post.key}Action(){}\n`;
        fs.writeFileSync(cPath, JSON.stringify(cData));
        this.setParseData(cData);
        let lPath = cachePath + mod.server_path + '/logic/' + mod.key + '.json';
        let lData = require(lPath);
        lData.funcs[post.key] = {info: post};
        lData.content += `${comments}${post.key}Action(){\n\t\tthis.allowMethods = '${post.method}';\n\t}\n`;
        fs.writeFileSync(lPath, JSON.stringify(lData));
        this.setParseData(lData);
    }
    setParseData(data) {
        let str = ``;
        if (data.comments) str += data.comments;
        if (data.params) str += data.params;
        str += data.start;
        if (data.content) str += data.content;
        str += data.end;
        fs.writeFileSync(data.path, str);
    }
}