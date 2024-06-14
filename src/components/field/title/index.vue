<script setup>
import { useDialog } from 'primevue/usedialog'

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

const emit = defineEmits(['update:modelValue'])

const TaskPanel = defineAsyncComponent(() => import('@/components/panel/index.vue'))

const dialog = useDialog()

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

// 当前的任务标题
const value = ref(props.modelValue)
watch(() => props.modelValue, (val) => {
  value.value = val
})

const { unexpandedKeys, selectedCell } = storeToRefs(useTaskStore())
// 是否重命名状态
const isEdit = ref(false)
// 重命名编辑状态
const input = ref(null)

// 打开任务详情面板
function handleOpenPanel(gid) {

}

// 菜单项
const items = ref([
  {
    label: '查看详细信息',
    icon: '',
    command: () => {
      dialog.open(TaskPanel, {
        props: {
          position: 'topright',
          gid: props.data.gid,
          cate: props.cate,
        },
      })
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
    copy: true,
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
    divider: true,
    label: '收藏',
    icon: 'icon-[lucide--star]',
  },
  {
    label: '添加子任务',
    icon: 'icon-[lucide--circle-plus]',
    command: () => {
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

      nextTick().then(() => {
        input.value?.focus()
      })
    },
  },
  {
    divider: true,
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
    command: () => {
      console.log('删除')
    },
  },
])
const menuRef = ref(null)
function toggle(event) {
  menuRef.value.toggle(event)
}

// 重命名任务名
function editInput() {
  isEdit.value = true

  selectedCell.value = {
    gid: props.data.gid,
    field: 'title',
  }
  nextTick(() => {
    input.value?.focus()
  })
}

function handleEnter() {
  nextTick(() => {
    input.value?.blur()
  })
}

// 保存数据
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
</script>

<template>
  <div class="h-full w-full flex items-center justify-between min-h-[32px]">
    <!-- 编辑状态 -->
    <div v-if="data?.edit && selectedCell.gid === data.gid" class="bg-red-100">
      <InputText
        ref="input"
        v-model="value"
        type="text"
        class="w-full h-full !p-0  min-h-[32px] !shadow-none ring-0"
        autofocus
        placeholder="请输入"
        @keyup.enter="handleEnter"
        @blur="saveEdit"
      />
    </div>

    <template v-else>
      <div>{{ data.title }}/{{ isEdit }}</div>
      <div>
        <span>
          <Button icon="icon-[lucide--ellipsis]" size="small" text plain class="!text-gray-400" :class="{ 'ring-2 ring-primary-500': isShow }" @click="toggle" />
          <Menu ref="menuRef" :model="items" popup append-to="body">
            <template #item="{ item }">
              <np-menu-item :label="item.label" :icon="item.icon" :divider="item.divider" :danger="item.danger" />
            </template>
          </Menu>
        </span>
      </div>
    </template>
  </div>
</template>
