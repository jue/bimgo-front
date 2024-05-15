<script setup>
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'

const props = defineProps({
  cate: {
    type: String,
    default: 'task',
  },
  task: {
    type: Object,
    default: () => {
      return {}
    },
  },
})

const emit = defineEmits(['deleted'])

const url = computed(() => {
  if (props.cate === 'task')
    return `${location.origin}/task/detail?id=${props.task.id}`
  if (props.cate === 'issue')
    return `${location.origin}/issue/detail?id=${props.task.id}`
})

const { copy, copied } = useClipboard()

const toast = useToast()

// function copy() {
//   navigator.clipboard.writeText(url.value)
//   toast.add({ severity: 'success', summary: '复制成功', life: 3000, closable: false })
// }

const isDelete = ref(false)
const isShow = ref(false)
function handleShow(val) {
  if (!val)
    isDelete.value = false

  isShow.value = val
}

// 删除功能
const apiDeleteUrl = computed(() => {
  if (props.cate === 'task')
    return '/task/delete'
  if (props.cate === 'issue')
    return '/issue/delete'
})

async function handleDelte() {
  const { data: res } = await http.post(apiDeleteUrl.value, { gid: props.task.gid })

  if (res.code === 200) {
    toast.add({ severity: 'success', summary: '删除成功', life: 3000, closable: false })
    emit('deleted', props.task)
    useTaskStore().getTasks()
  }
}
</script>

<template>
  <np-dropdown @show="handleShow" @hide="handleShow">
    <Button icon="icon-[lucide--ellipsis]" size="small" text plain :class="{ 'ring-2 ring-primary-500': isShow }" />
    <template #menu>
      <np-dropdown-item label="新窗口打开" icon="icon-[lucide--external-link]" :href="`/task/detail?id=${task.id}`" target="_blank" />
      <np-dropdown-item :label="copied ? '已复制' : '复制链接'" :icon="copied ? 'icon-[lucide--check]' : 'icon-[lucide--copy]'" :class="{ 'text-green-500': copied }" @click.stop="copy(url)" />
      <np-dropdown-item label="更改父任务" icon="icon-[lucide--list-tree]" />
      <np-dropdown-item v-if="!isDelete" label="删除" icon="icon-[lucide--trash]" danger @click.stop="isDelete = true" />
      <np-dropdown-item v-else label="确定删除?" icon="icon-[lucide--check]" danger @click="handleDelte" />
    </template>
  </np-dropdown>
</template>
