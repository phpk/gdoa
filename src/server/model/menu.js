module.exports = class extends think.Model {

    async list(authId) {
        let list = await think.model('menu').select();
        let rulesId;
        if (authId > 1) {
            rulesId = await think.model('auth').where({
                id: authId
            }).getField('rules', true);
        } else {
            rulesId = list.map(item => {
                return item.id;
            })
        }
        //console.log(rulesId)
        let top = [];
        list.forEach(item => {
            if (item.pid == 0 && item.ismenu == 0 && rulesId.includes(item.id)) {
                top.push({
                    id: item.id,
                    title: item.name,
                    href: "",
                    icon: "fa " + item.icon,
                    target: item.target
                });
            }
        });
        //console.log(top)
        top.forEach((item, i) => {
            let id = item.id;
            list.forEach(e => {
                if (e.pid == id && rulesId.includes(e.id)) {
                    if (!think.isArray(top[i]['child'])) top[i]['child'] = [];
                    top[i]['child'].push({
                        id: e.id,
                        title: e.name,
                        href: e.url,
                        icon: "fa " + e.icon,
                        target: e.target
                    });
                }
            })
        })
        //console.log(JSON.stringify(top))
        let rt = {
            "homeInfo": {
                "title": "首页",
                "href": "index/welcome"
            },
            "logoInfo": {
                "title": "ADMIN",
                "image": "/static/admin/images/logo.png",
                "href": ""
            },
        };
        rt['menuInfo'] = top;
        return rt;
    }
}