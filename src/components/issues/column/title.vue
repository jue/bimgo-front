<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['show'])

const value = ref(props.data.title)
const input = ref(null)
const loading = ref(false)

const isEdit = ref(false)
function editInput() {
  isEdit.value = true
  nextTick(() => {
    input.value?.input?.focus()
  })
}

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
  <div class="flex items-center w-full h-full">
    <IssuesColumnTask :tid="data.tid" />
    <el-input
      v-if="isEdit" ref="input" v-model="value" placeholder="请输入" class="h-full w-full" @input="saveEdit"
      @blur="isEdit = false"
    />
    <div v-else class="flex items-center justify-between w-full h-full px-[6px]" @dblclick="editInput">
      <span
        class="truncate hover:text-blue-600 hover:underline cursor-pointer underline-offset-4"
        @click="emit('show', data)"
      >{{ data.title }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep() {
  .el-input__wrapper {
    @apply rounded-none shadow-none px-[6px];
  }
}
</style>
