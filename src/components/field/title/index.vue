<script setup>
import { useConfirm } from 'primevue/useconfirm'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  data: {
    type: Object,
    default: () => {},
  },
  cate: {
    type: String,
    default: 'task',
  },
})

const emit = defineEmits(['update:modelValue', 'openPanel'])

const confirm = useConfirm()

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

// 打开任务详情面板
function handleOpenPanel() {
  // dialog.open(TaskPanel, {
  //   props: {
  //     position: 'topright',
  //     gid: props.data.gid,
  //     cate: props.cate,
  //   },
  // })

  emit('openPanel', props.data.gid)
}

// 当前的任务标题
const value = ref(props.modelValue)
watch(() => props.modelValue, (val) => {
  value.value = val
})

const { unexpandedKeys, selectedCell } = storeToRefs(useTaskStore())
// 是否重命名状态
const isEdit = ref(false)

const menuButtonRef = ref(null)
const menuRef = ref(null)
function toggle(event) {
  menuRef.value.toggle(event)
}

// 菜单项
const items = ref([
  {
    label: '查看详细信息',
    icon: '',
    command: () => {
      handleOpenPanel()
    },
  },

  {
    label: '新窗口打开',
    icon: 'icon-[lucide--external-link]',
    command: () => {
      window.open(`/task/detail?gid=${props.data.gid}`)
    },
  },
  {
    label: '复制链接',
    icon: 'icon-[lucide--copy]',
    command: () => {
      const { copy, copied, isSupported } = useClipboard({
        legacy: true,
      })
      copy(`${window.location.origin}/${props.cate}/detail?gid=${props.data.gid}`)
    },
  },
  {
    separator: true,
  },
  {
    label: '收藏',
    icon: 'icon-[lucide--star]',
  },
  {
    label: '添加子任务',
    icon: 'icon-[lucide--circle-plus]',
    command: () => {
      addChildren()
    },
  },
  {
    separator: true,
  },
  {
    label: '重命名',
    icon: 'icon-[lucide--edit]',
    command: () => {
      editInput()
    },
  },
  {
    danger: true,
    label: '删除',
    icon: 'icon-[lucide--trash]',
    class: 'np-delete',
    command: ({ originalEvent, item }) => {
      selectedCell.value = {
        gid: props.data.gid,
        field: 'title',
      }

      confirm.require({
        message: '确定删除任务？',
        header: '删除任务',
        icon: 'icon-[lucide--trash]',
        rejectLabel: '取消',
        rejectProps: {
          label: '取消',
          severity: 'secondary',
          outlined: true,
        },
        acceptLabel: '确定删除',
        acceptProps: {
          label: 'Delete',
          severity: 'danger',
        },
        accept: () => {
          // toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 })
        },
        reject: () => {
          // toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 })
        },
      })
    },
    // command: ({ originalEvent, item }) => {
    //   selectedCell.value = {
    //     gid: props.data.gid,
    //     field: 'title',
    //   }

    //   // 阻止冒泡
    //   item.label = '确定删除？'

    //   return false
    // },
  },
])

// 重命名编辑状态
const inputRef = ref(null)
// 添加子任务
function addChildren() {
  const index = unexpandedKeys.value.indexOf(props.data.gid)
  if (index > -1)
    unexpandedKeys.value.splice(index, 1)

  // 检查props.data里有没有children属性, 如果没有就添加一个children，默认是空数组，然后pusht {title: ''}空对象作为第一个元素
  if (!props.data.children) {
    props.data.children = []
    props.data.children.push({ title: '', parent_gid: props.data.gid, gid: null, edit: true })
  }
  else {
    props.data.children.push({ title: '', parent_gid: props.data.gid, gid: null, edit: true })
  }

  selectedCell.value = {
    gid: null,
    field: 'title',
  }

  // nextTick(() => {
  //   console.log(inputRef.value)
  //   inputRef.value?.focus()
  // })

  // nextTick(() => {
  //   inputRef.value?.focus()
  // })
}

// 重命名任务名
function editInput() {
  props.data.edit = true

  selectedCell.value = {
    gid: props.data.gid,
    field: 'title',
  }

  nextTick(() => {
    inputRef.value?.focus()
  })
}

function handleEnter() {
  nextTick(() => {
    inputRef.value?.blur()
  })
}

// 保存数据
async function saveEdit() {
  delete props.data.edit

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
    try {
      const { getLogs } = useLogsStore()
      getLogs(props.data.gid, props.cate)
    }
    catch (error) {
      console.log(error)
    }
  }
  else { value.value = props.data.title }
}

// 页面更新时，如果当前任务是重命名状态，就让input获取焦点
onMounted(() => {
  if (props.data.edit) {
    nextTick(() => {
      inputRef.value?.focus()
      return false
    })
  }
})
</script>

<template>
  <div class="h-full w-full flex items-center justify-between min-h-[32px]">
    <!-- 编辑状态 -->
    <div v-if="data?.edit && selectedCell.gid === data.gid" class="bg-red-100">
      <input
        ref="inputRef"
        v-model="value"
        type="text"
        class="w-full h-full !p-0  min-h-[32px] !shadow-none ring-0"
        autofocus
        placeholder="请输入"
        @keyup.enter="handleEnter"
        @blur="saveEdit"
      >
    </div>

    <template v-else>
      <div class="hover:text-blue-400 cursor-pointer" @click="handleOpenPanel(data.gid)">
        {{ data.title }}
      </div>
      <div class="items-center space-x-2 flex btns invisible">
        <span v-tooltip.bottom="'重新编辑'" class="cursor-pointer  w-4 h-4 rounded flex items-center justify-center" @click="editInput">
          <span class="icon-[lucide--edit] text-gray-400" />
        </span>
        <span>
          <Button ref="menuButtonRef" icon="icon-[lucide--ellipsis]" size="small" text plain class="!text-gray-400" :class="{ 'ring-2 ring-primary-500': isShow }" @click="toggle" />
          <TieredMenu
            ref="menuRef"
            :model="items"
            popup
            append-to="body"
          >
            <template #item="{ item }">
              <TaskDeleteItem v-if="item.label === '删除'" :task="data" :cate="cate" />
              <np-menu-item v-else :label="item.label" :icon="item.icon" :divider="item.divider" :danger="item.danger" />
            </template>
          </TieredMenu>

          <!-- <Menu :model="items" popup append-to="body">
            <template #item="{ item }">
              <np-menu-item :label="item.label" :icon="item.icon" :divider="item.divider" :danger="item.danger" />
            </template>
          </Menu> -->
        </span>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .focus .btns {
    @apply visible;
  }
</style>
