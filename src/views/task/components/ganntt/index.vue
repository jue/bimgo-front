<script setup>
import XGantt from './exports/root'
import XGanttColumn from './exports/column'
import XGanttSlider from './exports/slider'

defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})

function handleMove({ level }) {
  return level !== 1
}
</script>

<template>
  <XGantt
    :data="data"
    data-id="gid"
    start-key="start_time"
    end-key="end_time"
    expand-all
    highlight-date
    locale="zh-cn"
    draggable
    gantt-column-size="large"
    row-height="40"
    slider-into-view
    border-color="#0f0"
  >
    <XGanttColumn prop="title" label="标题" width="150">
      <template #default="{ row }">
        <div>
          {{ row.title }}
        </div>
      </template>
    </XGanttColumn>
    <XGanttColumn prop="description" width="300" />
    <XGanttColumn prop="start_time" width="100" />
    <XGanttColumn prop="end_time" width="100" />

    <XGanttSlider
      prop="start_time"
      date-format="MM-dd H:mm:s"
      empty-data=""
      :move="handleMove"
      :resize-left="true"
      :resize-right="true"
      :linked-resize="true"
      :progress="false"
      progress-decimal
      move-by-unit
    >
      <template #default="row">
        <div>{{ row.title }}</div>
      </template>
      <!-- <template #content="{ row, level }">
        <div v-if="level === 1" class="slider-level-one" />
      </template> -->
      <!-- <template #left>
        <div style="background-color: #123456; width: 5px; height: 10px" />
      </template>
      <template #right>
        <div style="background-color: #123456; width: 5px; height: 10px" />
      </template> -->
    </XGanttSlider>
  </XGantt>
</template>

<style lang="scss" scoped>
.slider-level-one {
  background-color: #123456;
  height: 5px;
  position: relative;
}

.slider-level-one::before {
  content: '';
  position: absolute;
  left: 0px;
  height: 0px;
  width: 0px;
  border-style: solid;
  border-left-width: 0px;
  border-right-width: 5px;
  border-top-width: 5px;
  border-bottom-width: 10px;
  border-left-color: transparent;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-right-color: #123456;
}

.slider-level-one::after {
  content: '';
  position: absolute;
  right: 0px;
  height: 0px;
  width: 0px;
  border-style: solid;
  border-left-width: 5px;
  border-right-width: 0px;
  border-top-width: 5px;
  border-bottom-width: 10px;
  border-left-color: #123456;
  border-top-color: #123456;
  border-bottom-color: transparent;
  border-right-color: transparent;
}
</style>
