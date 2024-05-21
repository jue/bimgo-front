<script setup>
import ColumnOption from '../columnOption.vue'
import TreeItem from './treeItem.vue'

const { tasks } = storeToRefs(useTaskStore())

const selectedCell = ref({
  gid: null, // 行gid
  field: null, // Column field name
})

provide('updateSelectedCell', (newVal) => {
  selectedCell.value = newVal
  if (!newVal.gid) {
    // 如果gid是null 就删除掉
    delete selectedCell.value.gid
  }
})

function handleCellClick(event) {
  selectedCell.value = event
}

// 获取columns
const { task_columns } = storeToRefs(useUserStore())
const filterColumns = computed(() => {
  return task_columns.value.filter(item => item.show)
})

const treeRef = ref(null)
onClickOutside(treeRef, () => {
  selectedCell.value = {
    gid: null,
    field: null,
  }
})

// 以下信息为开发信息
const tmpTask = ref([])
</script>

<template>
  <div class="overflow-auto flex-1 text-[#00021bf8]">
    <div ref="treeRef">
      <!-- header -->
      <div class="flex items-center">
        <div class="w-10 h-8 flex items-center justify-center shrink-0 border-b" />
        <div
          v-for="(column, index) in filterColumns" :key="index"
          :style="{ 'min-width': `${column.width}px` }"
          class="text-xs h-8 flex items-center px-2 border-b"
        />
      </div>
      <div class="flex items-center divide-x">
        <div class="w-10 h-8 flex items-center justify-center shrink-0 border-b">
          <ColumnOption />
        </div>
        <div
          v-for="(column, index) in filterColumns" :key="index"
          :style="{ 'min-width': `${column.width}px` }"
          class="text-xs h-8 flex items-center px-2 border-b"
          :class="{ 'pl-9': index === 0 }"
        >
          {{ column.label }}
        </div>
      </div>
      <!-- 如果data为空，显示空提示 -->
      <div
        v-if="tasks.length === 0"
        class="flex items-center justify-center text-gray-400 text-xs h-40 border-b"
      >
        暂无数据
      </div>
      <template v-else>
        <TreeItem
          :tasks="tasks"
          :columns="filterColumns"
          :selected-cell="selectedCell"
          @cell:select="handleCellClick"
          @dev="tmpTask = $event"
        />
      </template>
    </div>
    <pre>
      {{ tmpTask }}
    </pre>
  </div>
</template>
