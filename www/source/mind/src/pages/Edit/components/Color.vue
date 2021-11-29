<template>
  <div>
    <div class="colorList">
      <span
        class="colorItem"
        v-for="item in colorList"
        :style="{ backgroundColor: item }"
        :key="item"
        @click="clickColorItem(item)"
      ></span>
    </div>
    <div class="moreColor">
      <span>更多颜色</span>
      <el-color-picker
        size="mini"
        v-model="selectColor"
        @change="changeColor"
      ></el-color-picker>
    </div>
  </div>
</template>

<script>
import { colorList } from "@/config";

/** 
 * 颜色选择器 
 */
export default {
  name: "Color",
  props: {
    color: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      colorList,
      selectColor: "",
    };
  },
  watch: {
    color() {
      this.selectColor = this.color;
    },
  },
  created() {
    this.selectColor = this.color;
  },
  methods: {
    /**
     * 点击预设颜色
     */
    clickColorItem(color) {
      this.$emit("change", color);
    },

    /**
     * 修改颜色
     */
    changeColor() {
      this.$emit("change", this.selectColor);
    },
  },
};
</script>

<style lang="less" scoped>
.colorList {
  width: 240px;

  .colorItem {
    display: inline-block;
    width: 15px;
    height: 15px;
    margin-right: 5px;
    margin-bottom: 5px;
    cursor: pointer;
  }
}

.moreColor {
  display: flex;
  align-items: center;

  span {
    margin-right: 5px;
  }
}
</style>
