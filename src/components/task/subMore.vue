<script setup>
import Button from 'primevue/button'

defineProps({
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
</script>

<template>
  <np-dropdown @show="handleShow" @hide="handleShow">
    <Button icon="icon-[lucide--ellipsis]" size="small" text plain :class="{ 'ring-2 ring-primary-500': isShow }" />
    <template #menu>
      <np-dropdown-item label="新窗口打开" icon="icon-[lucide--external-link]" :href="`/task/detail?gid=${task.gid}`" target="_blank" />
      <TaskCopyItem :task="task" cate="task" />
      <TaskParentItem :task="task" cate="task" />
      <TaskDeleteItem :task="task" cate="task" @deleted="emit('deleted', task)" />
    </template>
  </np-dropdown>
</template>
