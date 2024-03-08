<script setup>
const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => [],
  },

})

// 默认宽度
const defaultWidth = 100

// function startResize(index, event) {
//   isResizing.value = true
//   resizeIndex.value = index
//   startX.value = event.pageX
//   startWidth.value = props.columns[index].width || 100
// }

// function handleResize(event) {
//   if (!isResizing.value)
//     return

//   const widthDelta = event.pageX - startX.value
//   props.columns[resizeIndex.value].width = startWidth.value + widthDelta
// }

// function stopResize() {
//   isResizing.value = false
// }
</script>

<template>
  <div class="table">
    <!-- 表头 -->
    <div class="thead">
      <div class="tr">
        <div
          v-for="(column, index) in columns" :key="index" :style="{ width: `${column.width}px` }"
          class="th"
        >
          {{ column.label }}
        </div>
      </div>
    </div>

    <!-- 表体 -->
    <template v-for="item in data" :key="item.tid">
      <np-table-row :columns="columns" :item="item" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.table {
  display: grid;
}

.tr {
  display: contents;
}

/* 让.tr作为虚拟容器，不实际生成盒模型 */
.th,
.td {
  display: block;
  /* 或者其他必要的样式 */
}
</style>
