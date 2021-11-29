<template>
  <div class="editContainer">
    <div class="mindMapContainer" ref="mindMapContainer"></div>
    <Count></Count>
    <NavigatorToolbar :mindMap="mindMap"></NavigatorToolbar>
    <Outline></Outline>
    <Style></Style>
    <BaseStyle :data="mindMapData" :mindMap="mindMap"></BaseStyle>
    <Theme :mindMap="mindMap"></Theme>
    <Structure :mindMap="mindMap"></Structure>
    <ShortcutKey></ShortcutKey>
    <Contextmenu :mindMap="mindMap"></Contextmenu>
  </div>
</template>

<script>
import MindMap from '@/libs/index.js'
import Outline from './Outline'
import Style from './Style'
import BaseStyle from './BaseStyle'
import Theme from './Theme'
import Structure from './Structure'
import Count from './Count'
import NavigatorToolbar from './NavigatorToolbar'
import ShortcutKey from './ShortcutKey'
import Contextmenu from './Contextmenu'
import { getData, storeData, storeConfig } from '@/api'

/**
 * 编辑区域
 */
export default {
  name: 'Edit',
  components: {
    Outline,
    Style,
    BaseStyle,
    Theme,
    Structure,
    Count,
    NavigatorToolbar,
    ShortcutKey,
    Contextmenu,
  },
  data() {
    return {
      mindMap: null,
      mindMapData: null,
      prevImg: '',
      openTest: false
    }
  },
  async mounted() {
    await this.getData()
    this.init()
    this.$bus.$on('execCommand', this.execCommand)
    this.$bus.$on('export', this.export)
    this.$bus.$on('setData', this.setData)
  },
  methods: {
    /**
     * 获取思维导图数据，实际应该调接口获取
     */
    async getData() {
      let storeData = await getData()
      this.mindMapData = storeData
    },

    /**
     * 存储数据当数据有变时
     */
    async bindSaveEvent() {
      this.$bus.$on('data_change', async (data) => {
        await storeData(data)
      })
      this.$bus.$on('view_data_change', async (data) => {
        await storeConfig({
          view: data,
        })
      })
    },

    /**
     * 手动保存
     */
    async manualSave() {
      let data = this.mindMap.command.getCopyData()
      await storeData(data)
      let viewData = this.mindMap.view.getTransformData()
      await storeConfig({
        view: viewData,
      })
    },

    /**
     * 初始化
     */
    init() {
      let { root, layout, theme, view } = this.mindMapData
      this.mindMap = new MindMap({
        el: this.$refs.mindMapContainer,
        data: root,
        layout: layout,
        theme: theme.template,
        themeConfig: theme.config,
        viewData: view,
      })
      this.mindMap.keyCommand.addShortcut('Control+s', () => {
        this.manualSave()
      })
      // 转发事件
      ;[
        'node_active',
        'data_change',
        'view_data_change',
        'back_forward',
        'node_contextmenu',
        'node_click',
        'draw_click',
        'expand_btn_click',
        'svg_mousedown',
        'mouseup',
      ].forEach((event) => {
        this.mindMap.on(event, (...args) => {
          this.$bus.$emit(event, ...args)
        })
      })
      this.bindSaveEvent()
    },

    /**
     * @Author: 王林
     * @Date: 2021-08-03 23:01:13
     * @Desc: 动态设置思维导图数据
     */
    setData(data) {
      this.mindMap.setData(data)
      this.manualSave()
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-05 13:32:11
     * @Desc: 重新渲染
     */
    reRender() {
      this.mindMap.reRender()
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-04 13:08:28
     * @Desc: 执行命令
     */
    execCommand(...args) {
      this.mindMap.execCommand(...args)
    },

    /**
     * @Author: 王林
     * @Date: 2021-07-01 22:33:02
     * @Desc: 导出
     */
    async export(...args) {
      try {
        this.mindMap.export(...args)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.editContainer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  .mindMapContainer {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
  }
}
</style>
