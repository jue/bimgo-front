<script setup>
const form = reactive({
  key: '',
  sort: '',
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between px-4">
      <div class="flex items-center h-11 text-xl shrink-0">
        任务进度
      </div>
      <TaskFilter :form="form" />
    </div>
    <task-table :form="form" />
  </div>
</template>
