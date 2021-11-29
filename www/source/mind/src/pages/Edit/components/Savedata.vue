<template>
  <el-dialog
    class="nodeDialog"
    title="保存"
    :visible.sync="savedialogVisible"
    width="500"
  >
    <div>
      <div class="nameInputBox">
        <span class="name">文件名称</span>
        <el-input style="width: 300px" v-model="fileName" size="mini"></el-input>
      </div>
     
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
/**
 * 保存
 */
export default {
  name: "Savedata",
  data() {
    return {
      savedialogVisible: false,
      fileName: '思维导图'
    };
  },
  created() {
    this.$bus.$on("showSave", () => {
      this.savedialogVisible = true;
    });
  },
  methods: {
    /**
     * 取消
     */
    cancel() {
      this.savedialogVisible = false;
    },

    /**
     * 确定
     */
    confirm() {
      
      this.savedialogVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.nodeDialog {
  .nameInputBox {
    margin-bottom: 20px;

    .name {
      margin-right: 10px;
    }
  }

  .tip {
    margin-top: 10px;
  }
}
</style>