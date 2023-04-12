const Base = require('./base.js');
/**
 * @class
 * @apiDefine 分享管理
 */
const shareCate = {
    'baiban' : '白板',
    'mind' : '思维导图',
    'excel' : '表格',
    'flow' : '流程图',
    'doc' : '文集',
    'gant' : '甘特图',
    'planday' : '日程计划',
    'picedit' : '图片',
    'svg' : 'SVG',
    'word' : '文档',
    'txt' : '文本'
}
module.exports = class extends Base {
    /**
     * 分享给用户
     */
    async touserAction() {
        
    }
    /**
     * 分享给我的
     */
    async tomeAction() {

    }
    /**
     * 我分享的
     */
    async myAction() {

    }
}