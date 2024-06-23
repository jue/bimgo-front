<script setup>
defineProps({
  task: {
    type: Object,
    default: () => {
      return {}
    },
  },
})
</script>

<template>
  <div class="space-y-4">
    <div class="space-y-2">
      <div class="text-gray-400 text-xs font-medium">
        执行人
      </div>
      <FieldUids v-model="task.uids" class="h-10" :data="task" />
    </div>

    <div class="space-y-2">
      <div class="text-gray-400 text-xs font-medium">
        状态
      </div>
      <FieldStatus v-model="task.status" class="h-10" :data="task" />
    </div>

    <div class="space-y-2">
      <div class="text-gray-400 text-xs font-medium">
        优先级
      </div>
      <FieldPriority v-model="task.priority" :data="task" class="h-10" />
    </div>

    <div class="space-y-2">
      <div class="text-gray-400 text-xs font-medium">
        开始日期
      </div>
      <FieldDate v-model="task.start_time" class="!h-10 bg-white" field="start_time" :data="task" />
    </div>

    <div class="space-y-2">
      <div class="text-gray-400 text-xs font-medium">
        结束日期
      </div>
      <FieldDate v-model="task.end_time" class="!h-10 bg-white" field="end_time" :data="task" />
    </div>

    <div class="space-y-2">
      <div class="text-gray-400 text-xs font-medium">
        实际完工日期
      </div>
      <FieldDate v-model="task.done_time" class="!h-10 bg-white" field="done_time" :data="task" />
    </div>

    <!-- 结束 -->
  </div>
</template>
