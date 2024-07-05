<script setup>
import GanttDivider from './components/GanttDivider.vue'

const ganttRef = ref(null)
const { tableWidth, openedGid, payload } = storeToRefs(useTaskStore())
const { setTableWidth } = useTaskStore()
const route = useRoute()

onMounted(async () => {
  await useTaskStore().getTasks()

  nextTick(() => {
    const { width } = useElementSize(ganttRef)
    setTableWidth(width.value / 2)
  })
})
</script>

<template>
  <div class="app-container">
    <div class="flex items-center justify-between h-12 shrink-0 px-5">
      <div class="text-lg font-semibold">
        工程进度
      </div>
      <div class="flex items-center space-x-2">
        <IconField icon-position="left">
          <InputIcon>
            <i class="icon-[lucide--search]" />
          </InputIcon>
          <InputText v-model="payload.key" placeholder="标题或描述" />
        </IconField>
        <!-- <Button label="树形" icon="icon-[lucide--list-tree]" outlined severity="secondary" />
        <GlobalCreate /> -->
      </div>
    </div>

    <div ref="ganttRef" class="flex max-h-full overflow-y-auto">
      <div :style="{ width: `${tableWidth}px` }">
        <np-tree />
      </div>
      <GanttDivider />
      <div :style="{ width: `calc(100% - ${tableWidth}px)` }">
        <np-gantt-chart />
      </div>
    </div>
  </div>
  <GlobalCreate />
</template>

<route>
  {
    meta: {
      title: '工程进度',
    },
  }
</route>
