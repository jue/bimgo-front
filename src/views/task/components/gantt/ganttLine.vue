<script setup>
import { computed } from 'vue'

const props = defineProps({
  task: { type: Object, default: () => ({}) },
  config: { type: Object, default: () => ({}) },
  timeLines: { type: Array, default: () => [] },
})

const gid = inject('gid')
const unexpandedKeys = inject('unexpandedKeys')
const hideChildren = computed(() => unexpandedKeys.value.includes(props.task.gid))
const totalLength = computed(() => {
  return props.timeLines.reduce((sum, item) => {
    return sum + item.timeRange.length
  }, 0)
})

function getStartDatePosition(startDate) {
  const startDateIndex = props.timeLines.flatMap(timeline => timeline.timeRange.map(date => date.date)).indexOf(startDate)
  return startDateIndex * props.config.dateWidth
}

function getEndDatePosition(endDate) {
  const endDateIndex = props.timeLines.flatMap(timeline => timeline.timeRange.map(date => date.date)).indexOf(endDate)
  return endDateIndex * props.config.dateWidth
}
</script>

<template>
  <div
    class="h-10 flex items-center w-full relative"
    :class="{ 'bg-[#ebf6ff]/50': task.gid === gid }"
    :style="{ width: `${totalLength * config.dateWidth}px` }"
    @mouseenter="gid = task.gid"
    @mouseleave="gid = ''"
  >
    <div
      class="absolute left-0 w-2 h-2 rounded-full bg-green-500"
      :style="{ transform: `translateX(${getStartDatePosition(task.start_time)}px)` }"
    />
    <div
      class="absolute right-0 w-2 h-2 rounded-full bg-red-500"
      :style="{ transform: `translateX(${getEndDatePosition(task.end_time)}px)` }"
    />
  </div>

  <template v-if="task.children && task.children.length > 0 && !hideChildren">
    <GanttLine
      v-for="(childTask, childIndex) in task.children"
      :key="childIndex"
      :task="childTask"
      :config="config"
      :time-lines="timeLines"
    />
  </template>
</template>
