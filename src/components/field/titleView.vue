<script setup>
const props = defineProps({
  task: {
    type: Object,
    default: () => ({}),
  },
  cate: {
    type: String,
    default: 'task',
  },
})

const apiUpdateUrl = computed(() => {
  if (props.cate === 'task')
    return '/task/title/update'
  if (props.cate === 'issue')
    return '/issue/title/update'
})

const value = ref(props.task.title)
watch(() => props.task, () => {
  value.value = props.task.title
}, { deep: true })

const input = ref(null)

async function saveData() {
  if (!value.value)
    value.value = props.task.title

  const { data: res } = await http.post(apiUpdateUrl.value, {
    title: value.value,
    gid: props.task.gid,
  })
  if (res.code === 200)
    props.task.title = value.value
  else
    value.value = props.task.title
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
