<script setup>
// 当前的任务数据
const { cate, tasks, columns } = storeToRefs(useTaskStore())
</script>

<template>
  <ScrollPanel class="flex-1 overflow-x-auto">
    <ScrollPanel class="flex flex-col min-w-full flex-1 w-fit">
      <np-tree-header />

      <div
        v-if="tasks.length === 0"
        class="flex items-center justify-center text-gray-400 text-xs h-40 border-b"
      >
        暂无数据
      </div>
      <template v-else>
        <np-tree-item :tasks="tasks" />
      </template>
      <CreateData :cate="cate" />
    </ScrollPanel>
  </ScrollPanel>
</template>
