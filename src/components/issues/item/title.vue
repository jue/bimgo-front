<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  placeholder: {
    type: String,
    default: '请输入',
  },
  postUrl: {
    type: String,
    default: '/issue/update/title',
  },
  autoSave: {
    type: Boolean,
    default: true,
  },
})
const model = defineModel()
const textareaRef = ref(null)

async function saveEdit() {
  if (!props.autoSave)
    return false

  // const { data: res } = await http.post(props.postUrl, {
  //   id: props.data.iid,
  //   title: value.value,
  // })
  // if (res.code === 200)
  //   props.data.title = value
  // else
  //   value.value = props.data.title
}
</script>

<template>
  <el-input
    ref="textareaRef" v-model="model" type="textarea" :autosize="{ minRows: 1 }"
    class="border-white border-b-2 pb-1.5 hover:border-blue-600" :placeholder="placeholder" @blur="saveEdit"
  />
</template>

<style scoped lang="scss">
:deep() {
  .el-textarea__inner {
    @apply p-0 resize-none shadow-none rounded-none;
  }
}
</style>
