<script setup>
import { useMouse, useMousePressed } from '@vueuse/core'
import { calculateDays, calculateMonitorData } from './gannt'
import ResizeBtn from './resizeBtn.vue'

const props = defineProps({
  task: {
    type: Object,
    default: () => ({}),
  },
  startAndEndDate: {
    type: Object,
    default: () => ({}),
  },
  config: {
    type: Object,
    default: () => ({}),
  },
})

const lineRef = ref(null)
const resizeBtnLeft = ref(null)
const resizeBtnRight = ref(null)

const btnType = ref('')

const isDragging = ref(false)
const startX = ref(0)
const lineWidth = ref(0)
const lineLeft = ref(0)

function getPosition() {
  const { earliestStartTime, latestEndTime } = props.startAndEndDate
  const { start_time, end_time } = props.task
  const daysArr = calculateDays(earliestStartTime, start_time, end_time)

  lineLeft.value = daysArr.leftDate * props.config.dateWidth
  lineWidth.value = daysArr.durationDate * props.config.dateWidth
}

onMounted(() => {
  getPosition()
})

watch(() => props.task, () => {
  getPosition()
})

watch(() => props.startAndEndDate, () => {
  getPosition()
})

function startDrag(event, type) {
  isDragging.value = true
  startX.value = event.clientX
  lineLeft.value = lineRef.value.offsetLeft
  lineWidth.value = lineRef.value.offsetWidth
  btnType.value = type

  document.addEventListener('mousemove', handleDrag)
  document.addEventListener('mouseup', stopDrag)
}

function stopDrag() {
  isDragging.value = false
  btnType.value = ''

  console.log(lineLeft.value)

  const leftRes = calculateMonitorData(Number.parseInt(lineRef.value.style.left))
  const widthRes = calculateMonitorData(Number.parseInt(lineRef.value.style.width))

  lineLeft.value = leftRes[0]
  lineWidth.value = widthRes[1]

  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('mouseup', stopDrag)
}

function handleDrag(event) {
  if (isDragging.value) {
    const diffX = event.clientX - startX.value
    if (Number.parseInt(lineRef.value.style.width) <= Number.parseInt(props.config.dateWidth))
      return false

    if (btnType.value === 'left') {
      const newLeft = lineLeft.value + diffX
      if (newLeft <= 0) {
        lineRef.value.style.left = '0px'
        return false
      }

      lineRef.value.style.left = `${newLeft}px`
      lineRef.value.style.width = `${lineWidth.value - diffX}px`
    }

    if (btnType.value === 'right')
      lineRef.value.style.width = `${lineWidth.value + diffX}px`
  }
}
</script>

<template>
  <div
    v-if="lineWidth" ref="lineRef" class="line doing absolute"
    :class="{ 'none-children': !task.children?.length }"
    :style="{ left: `${lineLeft}px`, width: `${lineWidth}px` }"
  >
    <div class="w-full flex items-center">
      <ResizeBtn ref="resizeBtnLeft" class="btn-resize" @mousedown="startDrag($event, 'left')" />
      <div class="flex-1 px-2 shrink-0 overflow-hidden whitespace-nowrap select-none">
        <!-- {{ task.title }} -->
        <!-- {{ task.children?.length || 0 }} {{ pressed }}/ {{ x }} -{{ y }} -{{ sourceType }} -->
        {{ lineLeft }}-{{ lineWidth }}
      </div>
      <ResizeBtn ref="resizeBtnRight" class="btn-resize" @mousedown="startDrag($event, 'right')" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.line {
  @apply h-8 rounded-full flex items-center min-w-[56px] cursor-grab;
  &.doing {
    @apply bg-[#d4edff] border border-[#d4edff] hover:border-[#80c6ff];
  }
}
.none-children {
  .btn-resize {
    @apply block;
  }
}
</style>
