<script setup>
const props = defineProps({
  cate: {
    type: String,
    default: 'task',
  },
})
const emit = defineEmits(['refresh'])
const apiUrl = computed(() => {
  if (props.cate === 'task')
    return '/task/add'
  if (props.cate === 'issue')
    return '/issue/add'
})

const value = ref('')
async function addData() {
  if (!value.value)
    return false

  const { data: res } = await http.post(apiUrl.value, {
    title: value.value,
  })
  if (res.code === 200) {
    emit('refresh', res.data)
    value.value = ''
  }
}
</script>

<template>
  <div class="flex items-center h-10 border-b">
    <div class="w-10 flex items-center justify-center shrink-0">
      <span class="icon-[lucide--plus] text-[#cbd5e1]" />
    </div>
    <input v-model="value" class="w-full rounded-none !shadow-none ring-0 px-2" :placeholder="`创建新${type === 'task' ? '任务' : '问题'}`" @keyup.enter="addData">
  </div>
</template>
