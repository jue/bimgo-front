<script setup>
const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  subTask: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <!-- <pre>{{ subTask }}</pre> -->
  <div class=" shadow border divide-y rounded-lg">
    <div v-for="(task, index) in subTask" :key="index" class="flex items-center h-9 px-2 justify-between hover:bg-gray-100/70 cursor-pointer">
      <div class="space-x-2  rounded-lg">
        <span class="text-sm text-gray-400">#{{ task?.id }}</span>
        <span>{{ task.title }}</span>
      </div>

      <div class=" rounded-lg flex space-x-2">
        <FieldPriority v-model="task.priority" :data="task" class="!shadow-none !ring-0 !px-0 bg-transparent !h-5" inline />
        <FieldStatus v-model="task.status" :data="task" class="!shadow-none !ring-0 !px-0 bg-transparent !h-5" inline />
        <FieldUids v-model="task.uids" :data="task" class="!shadow-none !ring-0 !px-0 bg-transparent !h-5" inline />
        <TaskSubMore />
      </div>
    </div>
  </div>
</template>
