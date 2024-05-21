<script setup>
onMounted(async () => {
  const taskStore = useTaskStore()
  await taskStore.getTasks()
})

const { tasks } = storeToRefs(useTaskStore())
</script>

<template>
  <div class="p-4">
    <NpUftree :nodes="tasks" />
  </div>
</template>
