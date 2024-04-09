<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})
const value = ref(props.data.title)

watch(() => props.data, (val) => {
  value.value = val.title
}, { deep: true })

const saveEdit = debounce(async () => {
  const { data: res } = await http.post('/issue/update/title', {
    iid: props.data.iid,
    title: value.value,
  })
  if (res.code === 200)
    props.data.title = value
  else
    value.value = props.data.title
}, 800)
</script>

<template>
  <el-input
    ref="textareaRef" v-model="value" type="textarea" :autosize="{ minRows: 1 }"
    class="border-b border-white border-b-2 pb-1.5 hover:border-blue-600" placeholder="请输入问题" @input="saveEdit"
  />
</template>

<style scoped lang="scss">
:deep() {
  .el-textarea__inner {
    @apply p-0 resize-none shadow-none rounded-none;
  }
}
</style>
