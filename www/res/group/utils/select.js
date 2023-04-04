
const getSelectData = (ins) => {
    const val = ins.getValue()
    let ids = []
    if(val && val.length > 0) {
        ids = val.map(d => {
            return d.id;
        })
    }
    if(ids.length > 0) {
        return ids.join(',')
    }else{
        return 0;
    }
    
}
const getAreaSelect = (el, name, type, ckId) => {
    let ins;
    let opt = {
        el: '#' + el,
        name,
        model: { label: { type: 'block' } },
        //checkbox: true,
        //clickClose: true,
        direction: 'down',
        toolbar: {
            show: true,
        },
        filterable: true,
        clickCheck: true,
        height: 'auto'
    }
    if(type == 'radio') {
        opt.clickClose = true
    }
    opt[type] = true;
    opt.tree = {
        show: true,
        showFolderIcon: true,
        expandedKeys: [],
        //点击节点是否展开
	    clickExpand: true,
        strict: false,
        //开启懒加载
        lazy: true,
        //加载方法
        load: function(item, cb){
            //console.log(item)
            if(item.have_child) {
                setTimeout(() => {
                    _get(layui, 'index/area?pid=' + item.id, res => {
                        cb(res)  
                    })
                }, 100)
            }
            
            
        }
    }
    //opt.data = []
    ins = xmSelect.render(opt)
    _get(layui, 'index/area?pid=0', res => {
        if(ckId) {
            res.forEach(d => {
                d = chkCkId(d, ckId)
            })
        }
        ins.update({
            data: res,
            autoRow: true,
        })
    })
    if(ckId) {
        setTimeout(() => {
            _get(layui, 'index/area?id=' + ckId, res => {
                console.log(res)
                ins.setValue(res)  
            })
        }, 500)
    }
    return ins;
}
const getElSelect = (data, ckId, el, type = 'checkbox', isTree = false, ext = {}) => {
    let opt = {
        el: '#' + el,
        model: { label: { type: 'block' } },
        //checkbox: true,
        //clickClose: true,
        toolbar: {
            show: true,
        },
        filterable: true,
        clickCheck: true,
        height: 'auto'
    }
    if(type == 'radio') {
        opt.clickClose = true
    }
    opt[type] = true;
    if(isTree) {
        opt.tree = {
            show: true,
            strict: false,
            expandedKeys: [-1],
        }
        opt.data = () => {
            return getCompanyTree(data, ckId)
        }
    }else{
        opt.paging = true
        opt.pageSize = 10
        opt.data = () => {
            return getDataList(data, ckId)
        }
    }
    for(let p in ext) {
        opt[p] = ext[p]
    }
    //console.log(opt)
    let ins = xmSelect.render(opt)
    if (typeof(ckId)=='string' && ckId.indexOf(',') > -1){
        ins.setValue(ckId.split(','))
    }
    return ins;
}
const chkCkId = (rt, ckId) => {
    //console.log(ckId)
    if (ckId) {
        //console.log(ckId)
        if (!isNaN(ckId) && ckId == rt.id*1) {
            //console.log(ckId)
            rt.selected = true;
        }
        else if (typeof(ckId)=='string' && ckId.indexOf(',') > -1) {
            //console.log(ckId.split(','))
            if (ckId.split(',').includes(rt.id)) {
                rt.selected = true;
                //console.log(rt)
            }
            
        }
    }
    return rt;
}
const getDataList = (data, ckId) => {
    if(data) {
        return data.map(d => {
            let rt = {
                name: d.name,
                value: d.id,
                id: d.id
            }
            return chkCkId(rt, ckId);
        })
    }else{
        return []
    }
    
}
const getCompanyTree = (data, ckId) => {
    const findById = (id) => {
        let children = [];
        data.forEach((val) => {
            if (val.pid == id) {
                let d = {
                    name: val.name,
                    value: val.id,
                    id: val.id
                }
                children.push(chkCkId(d, ckId));
            }
        });
        return children;
    };
    // 递归查询到数据并将数据存储到数组 
    const deeploop = function (id) {
        let dataArr = findById(id);
        if (dataArr.length <= 0) {
            return null;
        } else {
            dataArr.forEach((value) => {
                if (deeploop(value.id) != null) {
                    value["children"] = deeploop(value.id);
                }
            });
        }
        return dataArr;
    };
    return deeploop(0)
}