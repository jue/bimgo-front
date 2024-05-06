<script setup>
import Table from './table.vue'
import GanttChart from './ganttChart.vue'
import Divider from './divider.vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})

provide('data', props.data)

// 甘物图元素
const ganttRef = ref(null)
const tableWidth = ref(0)
provide('tableWidth', tableWidth)
provide('updateTableWidth', (newWidth) => {
  tableWidth.value = newWidth
})

// 当前gid，鼠标移动上时，高亮
const gid = ref('')
provide('gid', gid)

onMounted(() => {
  nextTick(() => {
    const { width } = useElementSize(ganttRef)
    tableWidth.value = width.value / 2
  })
})

// 未展开的节点
const unexpandedKeys = ref([])
provide('unexpandedKeys', unexpandedKeys)
</script>

<template>
  <div ref="ganttRef" class="flex h-full border-y overflow-y-auto">
    <div :style="{ width: `${tableWidth}px` }">
      <Table />
    </div>
    <Divider />
    <div :style="{ width: `calc(100% - ${tableWidth}px)` }">
      <GanttChart />
    </div>
  </div>
</template>
