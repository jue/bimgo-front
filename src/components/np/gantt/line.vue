<script setup>
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

function getStartDatePosition(startDate) {
  const startDateIndex = props.timeLines.flatMap(timeline => timeline.timeRange.map(date => date.date)).indexOf(startDate)
  return startDateIndex * props.config.dateWidth
}

function getEndDatePosition(endDate) {
  const endDateIndex = props.timeLines.flatMap(timeline => timeline.timeRange.map(date => date.date)).indexOf(endDate)
  return endDateIndex * props.config.dateWidth
}

console.log(props.task)
console.log(props.config)
</script>

<template>
  <div
    class="flex items-center w-full relative border-b border-transparent"
    :class="{ 'bg-[#ebf6ff]/50': task.gid === hoverGid }"

    @mouseenter="hoverGid = task.gid"
    @mouseleave="hoverGid = ''"
  >
    <div
      class="h-10 w-full bg-red-100"
      :style="{ width: `${totalLength * config.dateWidth}px` }"
    >
      sdfsdsdf
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
