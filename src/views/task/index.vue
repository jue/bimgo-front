<script setup>
const form = reactive({
  key: '',
  sort: 'default',
})
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex items-center justify-between h-12 shrink-0 px-5">
      <div class="flex items-center h-11 shrink-0" />
      <TaskFilter :form="form" />
    </div>
    <task-table :form="form" />
  </div>
</template>

<route>
  {
    meta: {
      title: '工程进度',
    },
  }
</route>
