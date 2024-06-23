<script setup>
import GanttDivider from './components/GanttDivider.vue'

const ganttRef = ref(null)
const { tableWidth, openedGid } = storeToRefs(useTaskStore())
const { setTableWidth } = useTaskStore()

onMounted(() => {
  nextTick(() => {
    const { width } = useElementSize(ganttRef)
    setTableWidth(width.value / 2)
  })
})

// 任务面板
watch(openedGid, (val) => {
  if (val)
    handleOpenPanel(val)
})

const taskPanleVisible = ref(false)
const taskPanelRef = ref(null)
function handleOpenPanel(gid) {
  taskPanleVisible.value = true
  nextTick(() => {
    taskPanelRef.value.getData(gid)
  })
}
function handlePanleHide() {
  openedGid.value = ''
  useTaskStore().getTasks()
}
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

  <Sidebar
    v-model:visible="taskPanleVisible"
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
    @hide="handlePanleHide"
  >
    <template #container>
      <TaskPanel ref="taskPanelRef" :cate="cate" />
      <Button icon="icon-[lucide--x]" raised rounded size="small" severity="contrast" class="!absolute top-3 left-0 -translate-x-1/2" @click="taskPanleVisible = false" />
    </template>
  </Sidebar>
</template>

<route>
  {
    meta: {
      title: '工程进度',
    },
  }
</route>
