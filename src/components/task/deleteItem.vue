<script setup>
import { useToast } from 'primevue/usetoast'

const props = defineProps({
  task: {
    type: Object,
    default: () => {},
  },
  cate: {
    type: String,
    default: 'task',
  },
})
const emit = defineEmits(['deleted'])
const toast = useToast()
const apiDeleteUrl = computed(() => {
  if (props.cate === 'task')
    return '/task/delete'
  if (props.cate === 'issue')
    return '/issue/delete'
})

const updateSelectedCell = inject('updateSelectedCell')

const isDelete = ref(false)

async function handleDelte() {
  const { data: res } = await http.post(apiDeleteUrl.value, { gid: props.task.gid })

  if (res.code === 200) {
    toast.add({ severity: 'success', summary: '删除成功', life: 3000, closable: false })
    emit('deleted', props.task)
    useTaskStore().getTasks()
  }
}

function changeDelete() {
  isDelete.value = true
  updateSelectedCell({
    gid: props.task.gid,
    field: 'title',
  })
}
</script>

<template>
  <np-dropdown-item v-if="!isDelete" label="删除" icon="icon-[lucide--trash]" danger @click.stop="changeDelete" />
  <np-dropdown-item v-else label="确定删除?" icon="icon-[lucide--check]" danger @click="handleDelte" />
</template>
