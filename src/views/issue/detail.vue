<script setup>
const route = useRoute()
const taskPanelRef = ref(null)

onMounted(() => {
  taskPanelRef.value.getData(route.query.gid)
})
</script>

<template>
  <div class="container h-full border-x p-0">
    <TaskPanel ref="taskPanelRef" />
  </div>
</template>
