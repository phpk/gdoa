<template>
<el-dialog class="nodeDialog" title="导入" :visible.sync="dialogVisible" width="500">
    <el-upload ref="upload" action="x" :file-list="fileList" :auto-upload="false" :multiple="false" :on-change="onChange" :limit="1" :on-exceed="onExceed">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传.json文件</div>
    </el-upload>
    <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
</el-dialog>
</template>

<script>
/**
 * 导入
 */
export default {
    name: "Import",
    data() {
        return {
            dialogVisible: false,
            fileList: [],
        };
    },
    watch: {
        dialogVisible(val, oldVal) {
            if (!val && oldVal) {
                this.fileList = [];
            }
        },
    },
    created() {
        this.$bus.$on("showImport", () => {
            this.dialogVisible = true;
        });
    },
    methods: {
        /**
         * 文件选择
         */
        onChange(file) {
            let reg = /\.json$/;
            if (!reg.test(file.name)) {
                this.$message.error("请选择.json文件");
                this.fileList = [];
            } else {
                this.fileList.push(file)
            }
        },

        /**
         * 数量超出限制
         */
        onExceed() {
            this.$message.error("最多只能选择一个文件");
        },

        /**
         * 取消
         */
        cancel() {
            this.dialogVisible = false;
        },

        /**
         * 确定
         */
        confirm() {
            if (this.fileList.length <= 0) {
                return this.$message.error("请选择要导入的文件");
            }
            let file = this.fileList[0];
            let fileReader = new FileReader()
            fileReader.readAsText(file.raw)
            fileReader.onload = (evt) => {
                try {
                    let data = JSON.parse(evt.target.result)
                    if (typeof data !== 'object') {
                        throw new Error('文件内容有误')
                    }
                    this.$bus.$emit('setData', data)
                    this.$message.success("导入成功");
                } catch (error) {
                    console.log(error)
                    this.$message.error("文件解析失败");
                }
            }
            this.cancel();
        },
    },
};
</script>

<style lang="less" scoped>
.nodeDialog {}
</style>
