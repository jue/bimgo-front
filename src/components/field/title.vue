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
  openDetail: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const input = ref(null)

const value = ref(props.modelValue)
watch(() => props.modelValue, (val) => {
  value.value = val
})

const updateSelectedCell = inject('updateSelectedCell')

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
  updateSelectedCell({
    gid: props.data.gid,
    field: 'title',
  })
}

function handleEnter() {
  nextTick(() => {
    input.value?.blur()
  })
}
async function saveEdit() {
  isEdit.value = false

  // 如果props.data.gid不存在, 这表示是新增任务
  if (!props.data.gid) {
    // 如果value.value 是空字符串，就删除当前props.data数据
    if (value.value === '') {
      useTaskStore().getTasks()
    }
    else {
      const { data: res } = await http.post(apiAddUrl.value, {
        title: value.value,
        parent_gid: props.data.parent_gid,
      })
      if (res.code === 200) {
        emit('update:modelValue', value.value)
        props.data = res.data
        useTaskStore().getTasks()
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
  if (res.code === 200) {
    emit('update:modelValue', value.value)
    const { getLogs } = useLogsStore()
    getLogs(props.data.gid, props.cate)
  }
  else { value.value = props.data.title }
}

const unexpandedKeys = inject('unexpandedKeys')
// 创建子任务
async function addNew(data) {
  const index = unexpandedKeys.value.indexOf(data.gid)
  if (index > -1)
    unexpandedKeys.value.splice(index, 1)

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

// 打开任务详情
const openPanel = inject('openPanel')

function handleOpenPanel(gid) {
  openPanel(gid)
}

const isShow = ref(false)
function handleShow(val) {
  isShow.value = val
}

const dropdownRef = ref(null)
function handleParent() {
  updateSelectedCell({
    gid: props.data.gid,
    field: 'title',
  })
  console.log('323424')
}
</script>

<template>
  <div class="h-full w-full flex items-center min-h-[32px]">
    <div v-if="!isEdit" class="flex items-center w-full">
      <div class="flex-1">
        <span class="hover:text-blue-400 cursor-pointer" @click="handleOpenPanel(data.gid)">{{ data.title }}</span>
      </div>
      <div class="items-center space-x-2 hidden btns">
        <span v-tooltip.bottom="'添加子任务'" class="cursor-pointer bg-gray-300 hover:bg-gray-500 w-4 h-4 rounded flex items-center justify-center" @click.stop="addNew(data)">
          <span class="icon-[lucide--plus] text-xs text-white" />
        </span>
        <np-dropdown ref="dropdownRef" @show="handleShow" @hide="handleShow">
          <Button icon="icon-[lucide--ellipsis]" size="small" text plain class="!text-gray-400" :class="{ 'ring-2 ring-primary-500': isShow }" />
          <template #menu>
            <np-dropdown-item label="查看详细信息" icon @click="handleOpenPanel(data.gid)" />
            <np-dropdown-item label="新窗口打开" icon="icon-[lucide--external-link]" :href="`/task/detail?gid=${data.gid}`" target="_blank" />
            <TaskCopyItem
              :task="data"
              cate="task"
              @click="updateSelectedCell({
                gid: data.gid,
                field: 'title',
              })"
            />
            <np-dropdown-item label="收藏" icon="icon-[lucide--star]" divider />
            <np-dropdown-item label="添加子任务" icon="icon-[lucide--circle-plus]" @click="addNew(data)" />
            <!-- <TaskParentItem
              :task="task"
              cate="task"
              @click="handleParent"
            /> -->
            <!-- <np-dropdown-item label="选择父任务" icon="icon-[lucide--list-tree]" @click="handleParent" /> -->
            <np-dropdown-item label="重命名" icon divider @click="editInput" />
            <TaskDeleteItem :task="data" cate="task" />
          </template>
        </np-dropdown>
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
