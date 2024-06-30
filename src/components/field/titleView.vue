<script setup>
const props = defineProps({
  task: {
    type: Object,
    default: () => ({}),
  },
})

const { cate } = storeToRefs(useTaskStore())

const apiUpdateUrl = computed(() => {
  if (cate.value === 'task')
    return '/task/title/update'
  if (cate.value === 'issue')
    return '/issue/title/update'
})

const value = ref(props.task.title)
watch(() => props.task, () => {
  value.value = props.task.title
}, { deep: true })

const input = ref(null)

async function saveData() {
  if (!value.value || value.value === props.task.title) {
    value.value = props.task.title
    return false
  }

  const { data: res } = await http.post(apiUpdateUrl.value, {
    title: value.value,
    gid: props.task.gid,
  })
  if (res.code === 200) {
    props.task.title = value.value
    const { getLogs } = useLogsStore()
    getLogs(props.task.gid, cate.value)
  }
  else { value.value = props.task.title }
}

function handleEnter() {
  nextTick(() => {
    input.value?.blur()
  })
}
</script>

<template>
  <input
    ref="input"
    v-model="value"
    class="w-full text-lg font-medium px-2 h-10 border border-white rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-300/50 cursor-pointer"
    @blur="saveData"
    @keyup.enter="handleEnter"
  >
</template>
