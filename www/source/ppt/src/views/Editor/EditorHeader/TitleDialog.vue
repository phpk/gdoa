<template>
  <div class="title-dialog">
    <Input v-model:value="title" placeholder="请输入保存名字" />

    <div class="btns">
      <Button @click="close()" style="margin-right: 10px;">取消</Button>
      <Button type="primary" @click="save()">确认</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useServer from '@/hooks/useServer'
export default defineComponent({
  name: 'title-dialog',
  emits: ['close'],
  setup(props, { emit }) {
    
    const { saveJSON, getTitle } = useServer()
    const title = ref('')
    title.value = getTitle() || '演示文稿'
    const close = () => emit('close')

    const save = () => {
      if (title.value) {
        saveJSON(title.value)
        close()
      }
    }

    return {
      title,
      close,
      save,
    }
  },
})
</script>

<style lang="scss" scoped>
.title-dialog {
  padding: 25px 10px 10px 10px;
}
.btns {
  margin-top: 10px;
  text-align: right;
}
</style>