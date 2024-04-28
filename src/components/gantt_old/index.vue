<script setup>
import { countTasks, getFormattedWeeksInRange, getStartAndEndTimes } from './gannt.js'
import Line from './line.vue'

const props = defineProps({
  tasks: {
    type: Array,
    default: () => [],
  },
})

const config = reactive({
  dateWidth: 56,
  cellWidth: 40,
})

const startAndEndDate = ref({})
const WeekArr = ref([])

watch(
  () => props.tasks,
  () => {
    startAndEndDate.value = getStartAndEndTimes(props.tasks)
    // 计算周数据
    WeekArr.value = getFormattedWeeksInRange(startAndEndDate.value.earliestStartTime, startAndEndDate.value.latestEndTime, 1)
    countTasks(WeekArr.value, props.tasks)
  },
)
</script>

<template>
  <div class="flex-1 overflow-x-scroll w-full">
    <div class="gantt-chart select-none w-fit h-full">
      <div class="gantt-header">
        <div class="flex items-center text-[#737577] text-xs">
          <div
            v-for="(week, index) in WeekArr" :key="index" class="shrink-0"
            :style="{ width: `${config.dateWidth * week.daysInWeek}px` }"
          >
            <div class="h-8 flex items-center w-full px-2 border-l border-l-[#efefef]">
              {{ week.formattedWeek }}
            </div>
            <div class="flex bg-[#f7f9fa] border-y border-y-[#dfe5eb]">
              <div
                v-for="day in week.weekDays" :key="day"
                class="flex items-center justify-center h-8 border-l border-l-[#efefef]"
                :style="{ width: `${config.dateWidth}px` }"
                :class="{ 'bg-weekend': day.dayName === '周六' || day.dayName === '周日' }"
              >
                {{ day.day }} {{ day.dayName }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="gantt-body w-full h-full relative flex-1">
        <div class="absolute top-0 left-0 bottom-0  z-0 flex">
          <div
            v-for="(week, index) in WeekArr" :key="index" class=" shrink-0"
            :style="{ width: `${config.dateWidth * week.daysInWeek}px` }"
          >
            <div class="flex h-full bg-[#f7f9fa]">
              <div
                v-for="day in week.weekDays" :key="day"
                class="flex items-center justify-center h-full border-l border-l-[#efefef]"
                :style="{ flexBasis: `${config.dateWidth}px` }"
                :class="{ 'bg-weekend': day.dayName === '周六' || day.dayName === '周日' }"
              />
            </div>
          </div>
        </div>
        <div class="relative z-10 w-full left-0 right-0 flex flex-col">
          <div v-for="(task, index) in tasks" :key="index" class="h-10 hover:bg-[#d4edff]/40 py-1">
            <Line :task="task" :start-and-end-date="startAndEndDate" :config="config" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- {{ startAndEndDate }}
  <pre>{{ tasks }}</pre> -->
</template>

<style scoped>
  .bg-weekend {
    @apply bg-[#efefef]/60;
  }
</style>
