<script setup>
import { generateDateRanges, getEarliestStartAndLatestEnd } from './gantt.js'

const config = reactive({
  dateWidth: 56,
  cellWidth: 40,
})

const { tasks } = storeToRefs(useTaskStore())

const timeLines = computed(() => {
  const { startDay, endDay } = getEarliestStartAndLatestEnd(tasks.value)
  return generateDateRanges(startDay, endDay)
})
</script>

<template>
  <ScrollPanel class="overflow-auto flex-1">
    <!-- 表头 -->
    <div class="flex items-center text-[#00021bf8] border-y min-w-full w-fit">
      <div v-for="(timeLine, index) in timeLines" :key="index" class="text-xs shrink-0 flex flex-wrap" :style="{ width: `${config.dateWidth * 7}px` }">
        <div class="w-full border-l border-b px-2">
          <div class="flex items-center h-8">
            {{ timeLine.title }}
          </div>
        </div>
        <div v-for="(date, dateIndex) in timeLine.timeRange" :key="dateIndex" :style="{ width: `${config.dateWidth}px` }" class="h-8 border-l border-l-[#efefef] flex items-center justify-center" :class="{ 'is-weekend': date.subTitle === '周日' || date.subTitle === '周六' }">
          <span v-tooltip.bottom="date.dateTitle" class="hover:text-blue-400">{{ date.subTitle }}</span>
        </div>
      </div>
    </div>

    <div class="relative">
      <!-- 竖线 -->
      <div class="flex absolute top-0 left-0 w-full h-full z-0  border-b">
        <template v-for="(timeLine, index) in timeLines" :key="index">
          <div v-for="(date, dateIndex) in timeLine.timeRange" :key="dateIndex" :style="{ width: `${config.dateWidth}px` }" class="shrink-0 border-l border-[#efefef]" :class="{ 'is-weekend': date.subTitle === '周日' || date.subTitle === '周六' }" />
        </template>
      </div>

      <!-- 横线开始 -->
      <div class="relative z-10">
        <!-- 如果data为空，显示空提示 -->
        <div
          v-if="tasks.length === 0"
          class="w-full flex items-center justify-center h-40"
        />
        <template v-else>
          <np-gantt-line
            v-for="(task, index) in tasks"
            :key="index"
            :task="task"
            :config="config"
            :time-lines="timeLines"
          />
        </template>
      </div>
      <!-- 横线结束 -->
    </div>
    <div class="w-full h-10 border-b min-w-full" />
  </ScrollPanel>
</template>

<style lang="scss" scoped>
.is-weekend {
  background-image: repeating-linear-gradient(135deg, transparent, transparent 2px, #efefef 2px, #efefef 4px);
}
</style>
