<script lang="ts" setup>
import useGanttHeader from '../../composables/useGanttHeader'
import useGanttWidth from '../../composables/useGanttWidth'
import useInView from '../../composables/useInView'
import useSlotsBox from '../../composables/useSlotsBox'
import useStyle from '../../composables/useStyle'
import useToday from '../../composables/useToday'
import useLinks from '../../composables/useLinks'
import LinkPath from '../../components/links/LinkPath.vue'
import Linking from '../../components/links/Linking.vue'
import useElement from '../../composables/useElement'
import type { XDate } from '../../models/param/date'
import RowVue from './Row.vue'

const { $slotsBox } = useSlotsBox()
const { bodyHeight, $styleBox } = useStyle()
const { ganttWidth, ganttColumnWidth, headerShowUnit, currentMillisecond }
  = useGanttWidth()
const { inView } = useInView()
const { todayLeft, showToday } = useToday()
const { ganttHeader } = useGanttHeader()
const { $links } = useLinks()
const { ganttBodyRef } = useElement()

function calcLeft(date: XDate) {
  const start = ganttHeader.start?.clone()
  start?.startOf(headerShowUnit.value)

  date.startOf(headerShowUnit.value)
  return (
    (date.intervalTo(start) / currentMillisecond.value) * ganttColumnWidth.value
  )
}
</script>

<template>
  <div
    ref="ganttBodyRef"
    class="xg-gantt-body bg-gray-50 relative"
    :style="{ height: bodyHeight, width: `${ganttWidth}px` }"
  >
    <!-- 滑动条 -->
    <template v-for="d in inView" :key="d.uuid">
      <RowVue :data="d" class="xg-gantt-row" :render-style="false" long-press>
        <component :is="$slotsBox.slider" :data="d" />
      </RowVue>
    </template>

    <!-- 连线 -->
    <svg class="xg-gantt-body-line-wrap" :style="{ width: `${ganttWidth}px` }">
      <LinkPath v-for="link in $links.links" :key="link.uuid" :link="link" />

      <Linking />
    </svg>

    <!-- 行样式 -->
    <template v-for="d in inView" :key="d.uuid">
      <RowVue :data="d" />
    </template>

    <!-- 周末 -->
    <template v-for="(date, i) in ganttHeader.datesByUnit" :key="i">
      <div
        class="xg-gantt-body-date-line border-l"
        :class="{ weekend: date.isWeekend() }"
        :style="{
          width: `${ganttColumnWidth}px`,
          left: `${ganttColumnWidth * i}px`,
        }"
      />
    </template>

    <!-- 今天 -->
    <div
      v-if="showToday"
      class="xg-gantt-body-date-line today"
      :style="{
        width: `${ganttColumnWidth}px`,
        left: `${todayLeft}px`,
        backgroundColor: $styleBox.bodyStyle?.todayColor || '#87CEFA',
      }"
    />

    <!-- 节假日 -->
    <template v-for="holidays in $styleBox.holidays">
      <div
        v-for="date in holidays.date"
        :key="date.toString()"
        class="xg-gantt-body-date-line holiday"
        :style="{
          width: `${ganttColumnWidth}px`,
          left: `${calcLeft(date)}px`,
          backgroundColor: holidays.color,
        }"
      />
    </template>
  </div>
</template>

<style lang="scss">
.xg-gantt-body {
  position: relative;
  z-index: 9;

  .xg-gantt-row {
    z-index: 9;
  }

  .xg-gantt-body-line-wrap {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 5;
    pointer-events: none;
  }

  .xg-gantt-body-date-line {
    z-index: 2;
    height: 100%;
    position: absolute;
    top: 0;
    opacity: 0.6;
    pointer-events: none;
  }
}
.weekend {
  background-image: repeating-linear-gradient(135deg, transparent, transparent 2px, #efefef 2px, #efefef 4px);
}
</style>
