module.exports = class extends think.Service {

    /**
         * 前台渲染递归
         * @param {array} tid 
         * @returns 
    */
    async tree(data) {
        //根据 id取出某一个分类的子集
        const findById = (id) => {
            let child = [];
            data.forEach((value) => {

                if (value.pid == id) {
                    value.name = value.title;
                    value.field = 'id';
                    value.spread = false;
                    child.push(value);
                }
            });
            //console.log(child)
            return child;
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
                        //= value['child'];
                    }
                });
            }
            return dataArr;
        };
        return deeploop(0)
    }

}