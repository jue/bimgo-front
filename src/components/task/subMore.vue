<script setup>
import Button from 'primevue/button'

const props = defineProps({
  task: {
    type: Object,
    default: () => {
      return {}
    },
  },
})

const emit = defineEmits(['deleted'])

const isShow = ref(false)
function handleShow(val) {
  isShow.value = val
}
const seletParentRef = ref(null)
function handleParent() {
  seletParentRef.value.open(props.task.gid)
}

function handleDeleted(task) {
  emit('deleted', task)
}
</script>

<template>
  <np-dropdown @show="handleShow" @hide="handleShow">
    <Button icon="icon-[lucide--ellipsis]" size="small" text plain :class="{ 'ring-2 ring-primary-500': isShow }" />
    <template #menu>
      <np-dropdown-item label="新窗口打开" icon="icon-[lucide--external-link]" :href="`/task/detail?gid=${task.gid}`" target="_blank" />
      <TaskCopyItem :task="task" cate="task" />
      <!-- <np-dropdown-item label="选择父任务" icon="icon-[lucide--list-tree]" @click="handleParent" /> -->
      <TaskDeleteItem :task="task" cate="task" @deleted="handleDeleted" />
    </template>
  </np-dropdown>
  <TaskSeletParent ref="seletParentRef" />
</template>
