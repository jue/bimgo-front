<script setup>
import Sidebar from 'primevue/sidebar'
import Tree from './tree.vue'
import GanttChart from './ganttChart.vue'
import Divider from './divider.vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})

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

// 更新数据
function uddateData(task) {
  props.data.push(task)
}

// 打开任务详情
const visible = ref(false)
const panelRef = ref(null)
const panelGid = ref('')
provide('openPanel', (gid) => {
  panelGid.value = gid
  visible.value = true

  nextTick(() => {
    panelRef.value.getData(gid)
  })
})
</script>

<template>
  <div ref="ganttRef" class="flex h-full border-y overflow-y-auto">
    <div :style="{ width: `${tableWidth}px` }">
      <Tree :tasks="data" />
      <CreateData cate="task" @refresh="uddateData" />

      <Sidebar
        v-model:visible="visible"
        position="right"
        :show-close-icon="false"
        :modal="false"
        class="w-[900px] relative"
        :dismissable="false"
        :pt="{
          root: ({ context }) => ({
            class: ['max-w-[900px]'],
          }),
          mask: ({ props }) => ({
            class: ['!right-0 !w-[900px] !left-auto'],
          }),
        }"
        @show="panelRef.getData(panelGid)"
      >
        <template #container>
          <Panel ref="panelRef" cate="task" />
          <Button text raised rounded class="!absolute top-3 left-0 shadow bg-gray-600 text-white hover:bg-blue-500 !p-0 w-5 h-5 !min-w-0 -translate-x-1/2" @click="visible = false">
            <div class="icon-[lucide--x] text-md" />
          </Button>
        </template>
      </Sidebar>
    </div>
    <Divider />
    <div :style="{ width: `calc(100% - ${tableWidth}px)` }">
      <!-- <pre>{{ data }}</pre> -->
      <GanttChart :tasks="data" />
    </div>
  </div>
</template>
