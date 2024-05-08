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

const emit = defineEmits(['update:modelValue'])

const input = ref(null)

const value = ref(props.modelValue)
watch(() => props.modelValue, (val) => {
  value.value = val
})

const apiUpdateUrl = computed(() => {
  if (props.cate === 'task')
    return '/task/title/update'
  if (props.cate === 'issue')
    return '/issue/title/update'
})

const apiAddUrl = computed(() => {
  if (props.cate === 'task')
    return '/task/add'

  if (props.cate === 'issue')
    return '/issue/add'
})

const isEdit = ref(false)
function editInput() {
  isEdit.value = true
  nextTick(() => {
    input.value?.focus()
  })
}

function handleEnter() {
  nextTick(() => {
    input.value?.blur()
  })
}

const filterTasks = inject('filterTasks')

async function saveEdit() {
  isEdit.value = false

  // 如果props.data.gid不存在, 这表示是新增任务
  if (!props.data.gid) {
    // 如果value.value 是空字符串，就删除当前props.data数据
    if (value.value === '') {
      filterTasks()
    }
    else {
      const { data: res } = await http.post(apiAddUrl.value, {
        title: value.value,
        parent_gid: props.data.parent_gid,
      })
      if (res.code === 200) {
        emit('update:modelValue', value.value)
        props.data = res.data
      }
    }

    return false
  }

  if (value.value === '') {
    value.value = props.data.title
    return false
  }

  if (value.value === props.data.title)
    return false

  const { data: res } = await http.post(apiUpdateUrl.value, {
    gid: props.data.gid,
    title: value.value,
  })
  if (res.code === 200)
    emit('update:modelValue', value.value)
  else
    value.value = props.data.title
}

const updateSelectedCell = inject('updateSelectedCell')
// 创建子任务
async function addNew(data) {
  // 检查props.data里有没有children属性, 如果没有就添加一个children，默认是空数组，然后pusht {title: ''}空对象作为第一个元素
  if (!props.data.children) {
    props.data.children = []
    props.data.children.push({ title: '', parent_gid: data.gid })
  }
  else {
    props.data.children.push({ title: '', parent_gid: data.gid })
  }

  updateSelectedCell({
    gid: null,
    field: 'title',
  })
}

onMounted(() => {
  if (!props.data.gid)
    editInput()
})
</script>

<template>
  <div class="h-full w-full flex items-center min-h-[32px]">
    <div v-if="!isEdit" class="flex items-center w-full">
      <span class="flex-1">{{ data.title }}</span>
      <div class="items-center space-x-2 hidden btns">
        <span v-tooltip.bottom="'添加子任务'" class="cursor-pointer bg-gray-300 hover:bg-gray-500 w-4 h-4 rounded flex items-center justify-center" @click.stop="addNew(data)">
          <span class="icon-[lucide--plus] text-xs text-white" />
        </span>
        <span v-tooltip.bottom="'编辑'" class="cursor-pointer w-4 h-4 rounded flex items-center justify-center" @click.stop="editInput">
          <span class="icon-[lucide--pencil-line] text-xs text-gray-400 hover:text-green-500" />
        </span>
      </div>
    </div>

    <input
      v-else ref="input" v-model="value" type="text"
      class="w-full h-full !p-0  min-h-[32px] !shadow-none ring-0"
      autofocus
      placeholder="请输入"
      @keyup.enter="handleEnter"
      @blur="saveEdit"
    >
  </div>
</template>

<style lang="scss" scoped>
  .focus .btns {
    @apply flex;
  }
</style>
