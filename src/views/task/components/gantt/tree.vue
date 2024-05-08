<script setup>
import ColumnOption from '../columnOption.vue'
import TreeItem from './treeItem.vue'

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const selectedCell = ref({
  gid: null, // 行gid
  field: null, // Column field name
})

provide('updateSelectedCell', (newVal) => {
  selectedCell.value = newVal
  delete selectedCell.value.gid
})

function handleCellClick(event) {
  selectedCell.value = event
}

// 获取columns
const { task_columns } = storeToRefs(useUserStore())
const filterColumns = computed(() => {
  return task_columns.value.filter(item => item.show)
})

// const data = ref(props.tasks)
// watch(() => props.tasks, (val) => {
//   data.value = val
// }, { deep: true })

// 过滤掉所有gid为null的对象
function filterTasks(tasks) {
  return tasks.filter((task) => {
    if (!task.gid)
      return false

    if (task.children && task.children.length > 0)
      task.children = filterTasks(task.children)

    return true
  })
}
provide('filterTasks', () => {
  filterTasks(data.value)
})

const treeRef = ref(null)
onClickOutside(treeRef, () => {
  selectedCell.value = {
    gid: null,
    field: null,
  }
})
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
          :class="{ 'pr-10': index === 0 }"
        />
      </div>
      <div class="flex items-center divide-x">
        <div class="w-10 h-8 flex items-center justify-center shrink-0 border-b">
          <ColumnOption />
        </div>
        <div
          v-for="column in filterColumns" :key="column.value"
          :style="{ 'min-width': `${column.width}px` }"
          class="text-xs h-8 flex items-center px-2 border-b"
        >
          {{ column.label }}
        </div>
      </div>
      <div class="min-h-40">
        <!-- 如果data为空，显示空提示 -->
        <div
          v-if="tasks.length === 0"
          class="flex items-center justify-center text-gray-400 text-xs h-40"
        >
          暂无数据
        </div>
        <template v-else>
          <TreeItem
            :tasks="tasks"
            :columns="filterColumns"
            :selected-cell="selectedCell"
            @cell:select="handleCellClick"
          />
        </template>
      </div>
    </div>
  </div>
</template>
