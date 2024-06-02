<script setup>
import GanttDivider from './components/GanttDivider.vue'

const ganttRef = ref(null)
const { tableWidth, unexpandedKeys } = storeToRefs(useTaskStore())
const { setTableWidth } = useTaskStore()

onMounted(() => {
  nextTick(() => {
    const { width } = useElementSize(ganttRef)
    setTableWidth(width.value / 2)
  })
})
</script>

<template>
  <div ref="ganttRef" class="flex max-h-full overflow-y-auto">
    <div :style="{ width: `${tableWidth}px` }">
      <np-tree />
    </div>
    <GanttDivider />
    <div :style="{ width: `calc(100% - ${tableWidth}px)` }">
      <np-gantt-chart />
    </div>
  </div>
</template>

<route>
  {
    meta: {
      title: '工程进度',
    },
  }
</route>
