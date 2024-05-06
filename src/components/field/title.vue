<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  data: {
    type: Object,
    default: () => ({}),
  },
  cate: {
    type: String,
    default: 'task',
  },
})
const input = ref(null)

const value = ref(props.modelValue)
watch(() => props.modelValue, (val) => {
  value.value = val
})

const apiUrl = computed(() => {
  if (props.cate === 'task')
    return '/task/update/title'
  if (props.cate === 'issue')
    return '/issue/update/title'
})

const isEdit = ref(false)
function editInput() {
  isEdit.value = true
  nextTick(() => {
    input.value?.input?.focus()
  })
}

function handleEnter() {
  nextTick(() => {
    input.value?.input?.blur()
  })
}

async function saveEdit() {
  isEdit.value = false
  if (value.value === '') {
    value.value = props.data.title
    return false
  }

  if (value.value === props.data.title)
    return false

  const { data: res } = await http.post(apiUrl, {
    gid: props.data.gid,
    title: value.value,
  })
  if (res.code === 200)
    props.data.title = value.value
  else
    value.value = props.data.title
}
</script>

<template>
  <div class="h-full w-full flex items-center min-h-[32px]">
    <div v-if="!isEdit" class="flex items-center w-full">
      <span class="flex-1">{{ data.title }}</span>
      <div class="items-center space-x-2 hidden btns">
        <span v-tooltip:bottom="'添加子任务'" class="cursor-pointer bg-gray-300 hover:bg-gray-500 w-4 h-4 rounded flex items-center justify-center">
          <span class="icon-[lucide--plus] text-xs text-white" />
        </span>
        <span v-tooltip:bottom="'编辑'" class="cursor-pointer w-4 h-4 rounded flex items-center justify-center" @click="editInput">
          <span class="icon-[lucide--pencil-line] text-xs text-gray-400 hover:text-green-500" />
        </span>
      </div>
    </div>

    <InputText
      v-else ref="input" v-model="value" type="text"
      class="w-full h-full !p-0  min-h-[32px] !shadow-none ring-0"
      autofocus
      @keyup.enter="handleEnter"
      @blur="saveEdit"
    />
  </div>
</template>

<style lang="scss" scoped>
  .focus .btns {
    @apply flex;
  }
</style>
