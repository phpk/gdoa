const Base = require('./base.js');
/**
 * @class
 * @apiDefine planday 日程计划管理
 */
module.exports = class extends Base {

    async listAction() {
        let { showdate, viewtype } = this.get();
        //console.log(showdate)
        let ret = this.getCalendarViewFormat(viewtype, new Date(showdate));
        //console.log(ret)
        // let thisday = this.now(showdate);
        let wsql = {};
        wsql.start_time = ['>', ret.start];
        wsql.end_time = ['<', ret.end];
        let list = await this.model('calendar').where(wsql).order('id desc').select();
        let rt = {
            start: think.datetime(ret.start*1000, 'YYYY-MM-DD HH:mm:ss'),
            end: think.datetime(ret.end*1000, 'YYYY-MM-DD HH:mm:ss'),
            error: null,
            events : []
        }
        if (list && list.length > 0) {
            let arr = []
            list.forEach(d => {
                arr.push([d.id,
                    d.title,
                    think.datetime(d.start_time * 1000, 'YYYY-MM-DD HH:mm:ss'),
                    think.datetime(d.end_time * 1000, 'YYYY-MM-DD HH:mm:ss'),
                d.isallday,//全天日程
                (d.end_time - d.start_time === 86399) ? 1 : 0,//是否跨天日程
                1, //是否循环日程
                0,
                1,//是否有权限
                0,
                0

                ]);
            })
            rt.events = arr;
        }
        return this.success(rt)
    }
    getCalendarViewFormat(viewtype, showdate) {
        //console.log(showdate)
        //获得某月的天数

        let ret = {},
            year = showdate.getFullYear(),
            month = showdate.getMonth(),
            day = showdate.getDate(),
            wday = showdate.getDay(),
            date = new Date(year, month, day),
            weekStartDate = new Date(year, month, day - wday + 1),//获得本周的开端日期
            weekEndDate = new Date(year, month, day + (8 - wday)),//获得本周的停止日期
            monthStartDate = new Date(year, month, 1),//获得本月的开端日期
            getMonthDays = (myMonth) => {
                let monthStartDate = new Date(year, myMonth, 1);
                let monthEndDate = new Date(year, myMonth + 1, 1);
                let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
                return days;
            },
            monthEndDate = new Date(year, month, getMonthDays(month)),//获得本月的停止日期
            nowtime = this.now(date);
        switch (viewtype) {
            case "day": //日
                ret.start = nowtime;
                ret.end = nowtime + 86400 - 1;
                break;
            case "week": // 周            
                ret.start = this.now(weekStartDate);
                ret.end = this.now(weekEndDate) - 1;
                break;
            case "month": // 月    
                ret.start = this.now(monthStartDate);
                ret.end = this.now(monthEndDate) + 86400 - 1;
                break;
        }
        return ret;
    }

    async addAction() {
        let post = this.post();
        console.log(post)
        let data = {
            id: post.id,
            title: post.title,
            start_time: this.now(post.start_time),
            end_time: this.now(post.end_time),
            user_id: this.adminId,
            add_time: this.now(),
            update_time: this.now(),
            isallday: post.isallday
        }
        let id = await this.model('calendar').add(data);
        return this.success(id);
    }

    async editAction() {
        let post = this.post();
        let has = await this.model('planday').where({ id: post.id }).find();
        if (think.isEmpty(has)) return this.fail('编辑的数据不存在');
        let data = {
            title: post.title,
            content: post.content,
            update_time: this.now()
        }
        await this.model('planday').where({ id: post.id }).update(data);
        return this.success()
    }

    async editBeforeAction() {
        let id = this.get('id');
        let data = await this.model('planday').where({ id }).find()
        if (think.isEmpty(data)) return this.fail('数据为空')
        return this.success(data);
    }

    async delAction() {
        let id = this.post('id');
        if (!await this.hasData('planday', { id }))
            return this.fail('数据不存在')
        await this.model('planday').where({ id }).delete()
        return this.success()
    }
}