<script lang="ts">
import type { Ref } from 'vue'
import { computed, defineComponent, onMounted, ref, useSlots } from 'vue'
import { flow, isBoolean, isFunction, isNumber } from 'lodash'
import Variables from '../../constants/vars'
import useData from '../../composables/useData'
import useGanttHeader from '../../composables/useGanttHeader'
import useGanttWidth from '../../composables/useGanttWidth'
import useDrag from '../../composables/useDrag'
import useParam from '../../composables/useParam'
import useStyle from '../../composables/useStyle'
import { baseUnit, day } from '../../utils/date'
import useEvent from '../../composables/useEvent'
import type { MoveSliderInternalData } from '../../typings/data'
import useLinks from '../../composables/useLinks'
import useElement from '../../composables/useElement'
import useSlotsBox from '../../composables/useSlotsBox'
import sliderProps from './props'

export default defineComponent({
  name: Variables.name.slider,
})
</script>

<script setup lang="ts">
const props = defineProps(sliderProps)
const slots = useSlots()
const { $param } = useParam()
const { $styleBox } = useStyle()
const { isValidSlots } = useSlotsBox()

const height = computed(() => {
  if (typeof props.height === 'number')
    return `${props.height}px`

  if (!/[^0-9.]+/.test(props.height))
    return `${Number.parseFloat(props.height)}px`

  return props.height
})

const bgColor = computed(() => {
  return props?.bgColor || '#eca710'
})

const { toRowData, getProp } = useData()
const originData = computed(
  () => props.label || getProp(props.data!, props.prop, props.emptyData),
)

// #region 计算滑块位置
const { ganttHeader } = useGanttHeader()
const { ganttColumnWidth, currentMillisecond } = useGanttWidth()
const sliderLeft = computed(
  () =>
    (props.data!.start.intervalTo(ganttHeader.start)
    / currentMillisecond.value)
    * ganttColumnWidth.value,
)

const sliderWidth = computed(
  () =>
    (props.data!.end.intervalTo(props.data?.start) / currentMillisecond.value)
    * ganttColumnWidth.value,
)
// #endregion

// #region 移动滑块
function calcMove(p: boolean | ((data: RowData) => boolean)) {
  if (isBoolean(p))
    return p
  if (isFunction(p))
    return p(toRowData(props.data!))

  return false
}

const canMove = computed(() => {
  return calcMove(props.move)
})
const disableMove = ref(false)
function handleDisableMove() {
  disableMove.value = true
}

onMounted(() => {
  document.addEventListener('pointerup', () => {
    disableMove.value = false
  })
})

// 移动过的对象数组
const { EmitMoveSlider } = useEvent()
let movedData: MoveSliderInternalData[] = []
function EmitMove() {
  movedData.unshift({
    row: props.data!,
    old: {
      start: startDate!.date,
      end: endDate!.date,
    },
  })
  EmitMoveSlider(
    movedData.map(item => ({ row: item.row.data, old: item.old })),
  )
  movedData = []
}

let startDate = props.data?.start.clone()
function setStart(x: number) {
  const d = startDate!.getOffset(
    (x / ganttColumnWidth.value) * currentMillisecond.value,
  )

  if (props.moveByUnit)
    d.startOf(baseUnit(ganttHeader.unit), startDate!)

  if (
    !props.moveByUnit
    || Math.abs(props.data!.start.intervalTo(d) / currentMillisecond.value)
    * ganttColumnWidth.value
    >= ganttColumnWidth.value
  )
    props.data?.setStart(d, ganttHeader.unit, props.linkedResize, movedData)

  return x
}

let endDate = props.data?.end.clone()
function setEnd(x: number) {
  const d = endDate!.getOffset(
    (x / ganttColumnWidth.value) * currentMillisecond.value,
  )

  if (props.moveByUnit)
    d.endOf(baseUnit(ganttHeader.unit), endDate!)

  if (
    !props.moveByUnit
    || Math.abs(props.data!.end.intervalTo(d) / currentMillisecond.value)
    * ganttColumnWidth.value
    >= ganttColumnWidth.value
  )
    props.data?.setEnd(d, ganttHeader.unit, props.linkedResize, movedData)
}

const sliderRef = ref(null) as Ref<HTMLElement | null>
const { onDrag } = useDrag()
onDrag(sliderRef, {
  disabled: () => !canMove.value || disableMove.value,
  reset: true,

  onStart: () => {
    startDate = props.data?.start.clone()
    endDate = props.data?.end.clone()
  },

  onMove: flow(setStart, setEnd),
  onEnd: EmitMove,
})
// #endregion

// #region 左滑块移动
const canResizeLeft = computed(() => {
  return canMove.value && calcMove(props.resizeLeft)
})
function onResizeLeftDown() {
  handleDisableMove()
}
const resizeLeftRef = ref(null) as Ref<HTMLElement | null>
onDrag(resizeLeftRef, {
  reset: true,

  onStart: () => {
    startDate = props.data?.start.clone()
  },

  onMove: setStart,
  onEnd: EmitMove,
})
// #endregion

// #region 右滑块移动
const canResizeRight = computed(() => {
  return canMove.value && calcMove(props.resizeRight)
})
function onResizeRightDown() {
  handleDisableMove()
}
const resizeRightRef = ref(null) as Ref<HTMLElement | null>
onDrag(resizeRightRef, {
  reset: true,

  onStart: () => {
    endDate = props.data?.end.clone()
  },

  onMove: setEnd,
  onEnd: EmitMove,
})
// #endregion

// #region outAnchor
function onOutAnchorDown(e: PointerEvent) {
  handleDisableMove()
}

const { setLinking, linking, $links } = useLinks()
const { ganttBodyRef } = useElement()
const { rowHeight } = useStyle()
const outAnchorRef = ref(null) as Ref<HTMLElement | null>
const startPos = { x: 0, y: 0 }
onDrag(outAnchorRef, {
  reset: true,
  disabled: () => !outAnchorRef.value && !props.allowLink,

  onStart: (pos) => {
    startPos.x = (ganttBodyRef.value?.getBoundingClientRect().x ?? 0) - pos.x
    startPos.y = (ganttBodyRef.value?.getBoundingClientRect().y ?? 0) - pos.y

    const _sp = {
      x: sliderLeft.value + sliderWidth.value + 10,
      y: ((props.data?.flatIndex ?? 0) + 0.5) * rowHeight.value,
    }
    setLinking({
      isLinking: true,
      startRow: props.data,
      startPos: _sp,
      endPos: _sp,
    })
  },

  onMove: (x, pos) => {
    setLinking({ endPos: { x: pos.x - startPos.x, y: pos.y - startPos.y } })
  },

  onFinally: () => {
    setLinking({ isLinking: false })
  },
})

// 最后抛出添加连线事件
const { EmitAddLink } = useEvent()
function onPointerUp() {
  if (!props.allowLink)
    return

  if (linking.startRow) {
    const link = $links.createLink(linking.startRow, props.data!)
    if (link) {
      EmitAddLink(
        link,
        { from: linking.startRow.data, to: props.data!.data },
        _link => $links.addLink(_link, linking.startRow!, props.data!),
      )
    }

    setLinking({ startRow: null, endRow: null })
  }
}
// #endregion

// #region progress
const progressValue = computed(() => {
  let v = props.data?.progress ?? 0
  if (v > 1)
    v = 1
  else if (v < 0)
    v = 0

  // 显示方式，默认整数
  if (isNumber(props.progressDecimal)) {
    let fixed = Math.floor(props.progressDecimal)
    if (fixed < 0)
      fixed = 0
    else if (fixed > 10)
      fixed = 10
    return (v * 100).toFixed(fixed)
  }

  return props.progressDecimal ? (v * 100).toFixed(2) : Math.floor(v * 100)
})
// #endregion
</script>

<template>
  <div
    ref="sliderRef"
    class="xg-slider" :class="[{ 'xg-slider-drag': canMove }]"
    :style="{
      left: `${sliderLeft}px`,
      width: `${sliderWidth}px`,
      maxHeight: `${$styleBox.rowHeight}px`,
      height,
      top:
        height === '100%'
        || (!/%$/.test(height) && parseFloat(height) >= $styleBox.rowHeight)
          ? 0
          : `calc(calc(100% - ${height}) / 2)`,
    }"
    @click.stop
    @pointerup="onPointerUp"
  >
    <div class="xg-slider-block h-full">
      <!-- 滑块主体 -->
      <slot
        v-if="isValidSlots(slots.content, props.data)"
        name="content"
        v-bind="toRowData(props.data)"
      />
      <div
        v-else
        class="xg-slider-content bg-[#d4edff] rounded-full h-full"
      >
        <slot
          v-if="isValidSlots(slots.default, props.data)"
          v-bind="toRowData(props.data)"
        />

        <div
          v-else-if="props.prop || props.label"
          class="slider-text"
          :style="{ 'justify-content': props.alignment }"
        >
          {{
            props.dateFormat
              ? day(originData).format(props.dateFormat)
              : originData
          }}
        </div>

        <!-- progress -->
        <div
          v-if="props.progress"
          class="xg-slider-progress" :class="[
            { 'xg-slider-progress__default': !props.progressColor },
          ]"
          :style="{
            width: `${progressValue}%`,
            backgroundColor: props.progressColor || bgColor,
          }"
        >
          {{ progressValue }}%
        </div>
      </div>

      <!-- 左滑块 -->
      <div
        v-if="canResizeLeft"
        ref="resizeLeftRef"
        class="xg-slider-resize left"
        @pointerdown.stop="onResizeLeftDown"
      >
        <slot
          v-if="isValidSlots(slots.left, props.data)"
          name="left"
          v-bind="toRowData(props.data)"
        />
        <div
          v-else
          class="resize-chunk flex items-center justify-center w-4"
        >
          <span class="icon-[lucide--grip-vertical] text-[#737577] text-xs" />
        </div>
      </div>

      <!-- 右滑块 -->
      <div
        v-if="canResizeRight"
        ref="resizeRightRef"
        class="xg-slider-resize right"
        @pointerdown.stop="onResizeRightDown"
      >
        <slot
          v-if="isValidSlots(slots.right, props.data)"
          name="right"
          v-bind="toRowData(props.data)"
        />
        <div
          v-else
          class="resize-chunk flex items-center justify-center w-4"
        >
          <span class="icon-[lucide--grip-vertical] text-[#737577] text-xs" />
        </div>
      </div>
    </div>

    <!-- 创建连线的按钮 -->
    <div
      v-if="props.allowLink"
      ref="outAnchorRef"
      class="xg-slider-anchor out-anchor" :class="[
        {
          'xg-slider-anchor__show': $param.hoverItem?.uuid === props.data?.uuid,
        },
      ]"
      :style="{ borderColor: bgColor }"
      @pointerdown="onOutAnchorDown"
    />
  </div>
</template>

<style lang="scss">
.xg-slider {
  position: absolute;
  transition: filter 0.2s;
  pointer-events: auto;
  @apply rounded-full overflow-hidden border border-transparent;

  .xg-slider-block {
    overflow: hidden;
    position: relative;
    font-size: 12px;
    height: 100%;

    .xg-slider-content {
      border-radius: 4px;
      height: 100%;
      padding: 0 12px;

      .slider-text {
        height: 100%;
        display: flex;
        align-items: center;
      }
    }

    .xg-slider-progress {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      opacity: 0.6;
      transition: width 0.2s;
      text-align: right;
      font-size: 10px;
      border-radius: 4px;
    }

    .xg-slider-progress__default {
      filter: grayscale(1);
    }

    .xg-slider-resize {
      height: 100%;
      position: absolute;
      top: 0;
      z-index: 1;
      cursor: ew-resize;

      .resize-chunk {
        height: 100%;
        transition: filter 0.2s;
      }
    }

    .xg-slider-resize.left {
      left: 0;
      cursor: ew-resize;

      .resize-chunk {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
    }

    .xg-slider-resize.right {
      right: 0;
      cursor: ew-resize;

      .resize-chunk {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
  }

  &:hover {
    // filter: brightness(1.2);
    @apply border-blue-400;

    .xg-slider-progress__default {
      filter: grayscale(1) brightness(1.2);
    }

    .xg-slider-resize {
      .resize-chunk {
        opacity: 1;

        &:hover {
          filter: brightness(0.8) sepia(1);
        }
      }
    }
  }

  .xg-slider-anchor {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #fff;
    border: 2px solid black;
    position: absolute;
    top: calc(50% - 4px);
    cursor: pointer;
    opacity: 0;
    transition: transform 0.2s, opacity 0.2s;

    &:hover {
      transform: scale(1.5);
    }
  }

  .xg-slider-anchor__show {
    opacity: 1;
  }

  .out-anchor {
    right: -12px;
  }
}

.xg-slider.xg-slider-drag {
  cursor: grab;
}
</style>
