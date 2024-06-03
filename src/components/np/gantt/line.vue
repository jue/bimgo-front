<script setup>
import dayjs from 'dayjs'

const props = defineProps({
  task: { type: Object, default: () => ({}) },
  config: { type: Object, default: () => ({}) },
  timeLines: { type: Array, default: () => [] },
})
const { hoverGid, unexpandedKeys } = storeToRefs(useTaskStore())

const hideChildren = computed(() => unexpandedKeys.value.includes(props.task.gid))
const totalLength = computed(() => {
  return props.timeLines.reduce((sum, item) => {
    return sum + item.timeRange.length
  }, 0)
})

// 计算任务工期
const taskLength = computed(() => {
  const { start_time, end_time } = props.task
  const { dateWidth } = props.config

  let days = 0

  if (start_time && end_time) {
    const startDate = dayjs(start_time)
    const endDate = dayjs(end_time)
    days = endDate.diff(startDate, 'day') + 1 // Include both start and end days
  }
  else if (start_time || end_time) {
    days = 1
  }

  // Calculate the length
  const length = days * dateWidth
  return length
})

const taskOffsetLength = computed(() => {
  const { start_time, end_time } = props.task
  const { dateWidth } = props.config

  let days = 0
  const startDate = start_time ? dayjs(start_time) : (end_time ? dayjs(end_time) : null)

  if (startDate)
    days = startDate.diff(dayjs(props.timeLines[0].timeRange[0].date), 'day')

  // Calculate the length
  const length = days * dateWidth
  return length
})
</script>

<template>
  <div
    class="flex items-center w-full relative border-b h-10 box-content"
    :class="{ 'bg-[#ebf6ff]/50': task.gid === hoverGid }"
    :style="{ width: `${totalLength * config.dateWidth}px` }"
    @mouseenter="hoverGid = task.gid"
    @mouseleave="hoverGid = ''"
  >
    <div
      v-if="!!taskLength"
      class="h-7 bg-[#d4edff] border border-transparent rounded-full absolute hover:border-[#80c6ff] flex items-center justify-between group"
      :style="{ width: `${taskLength}px`, left: `${taskOffsetLength}px` }"
    >
      <span class="icon-[lucide--grip-vertical] text-gray-400 text-xs opacity-0 group-hover:opacity-100 w-4 cursor-ew-resize" />
      <span v-tooltip.top="task.title" class="text-xs truncate select-none cursor-grab">
        {{ task.title }}
      </span>
      <span class="icon-[lucide--grip-vertical] text-gray-400 text-xs opacity-0 group-hover:opacity-100 w-4 cursor-ew-resize" />
    </div>
    <!-- <div
      class="absolute left-0 w-2 h-2 rounded-full bg-green-500"
      :style="{ transform: `translateX(${getStartDatePosition(task.start_time)}px)` }"
    />
    <div
      class="absolute right-0 w-2 h-2 rounded-full bg-red-500"
      :style="{ transform: `translateX(${getEndDatePosition(task.end_time)}px)` }"
    /> -->
  </div>

  <template v-if="task.children && task.children.length > 0 && !hideChildren">
    <Line
      v-for="(childTask, childIndex) in task.children"
      :key="childIndex"
      :task="childTask"
      :config="config"
      :time-lines="timeLines"
    />
  </template>
</template>
