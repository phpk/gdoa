// 监听函数
class watcher{
    constructor(opts){
        this.$data = this.getBaseType(opts.data) === 'Object' ? opts.data : {};
        this.$watch = this.getBaseType(opts.watch) === 'Object' ? opts.watch : {};
        for(let key in opts.data){
            this.setData(key)
        }
    }
 
    getBaseType(target) {
        const typeStr = Object.prototype.toString.apply(target);
     
        return typeStr.slice(8, -1);
    }
 
    setData(_key){
        Object.defineProperty(this,_key,{
            get: function () {
                return this.$data[_key];
            },
            set : function (val) {
                const oldVal = this.$data[_key];
                if(oldVal === val)return val;
                this.$data[_key] = val;
                this.$watch[_key] && typeof this.$watch[_key] === 'function' && (
                    this.$watch[_key].call(this,val,oldVal)
                );
                return val;
            },
        });
    }
}