<script setup>
import ColumnOption from '../columnOption.vue'
import Row from './row.vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})

// 获取columns
const { task_columns } = storeToRefs(useUserStore())

const gid = inject('gid')
const data = inject('data', [])
const filterColumns = computed(() => {
  return task_columns.value.filter(item => item.show)
})

const selectedCell = ref({
  gid: null, // 行gid
  field: null, // Column field name
})

const tableRef = ref(null)
onClickOutside(tableRef, () => {
  selectedCell.value = {
    index: null,
    field: null,
  }
})

function handleCellClick(event) {
  selectedCell.value = event
}
</script>

<template>
  <div class="overflow-auto flex-1">
    <table ref="tableRef" class="table-fixed border-collapse relative">
      <colgroup>
        <col class="min-w-10" style="padding: 0; height: 32px;">
        <col v-for="column in filterColumns" :key="column.prop" :style="{ 'min-width': `${column.width}px` }" style="padding: 0; height: 32px;">
      </colgroup>

      <thead>
        <tr>
          <td class="h-8" :colspan="filterColumns.length + 1" />
          <!-- <td v-for="(column, index) in task_columns" :key="index" /> -->
        </tr>
        <tr>
          <td class="h-8">
            <div class="flex items-center justify-center">
              <ColumnOption />
            </div>
          </td>
          <td v-for="(column, index) in filterColumns" :key="index" class="relative">
            <div class="inset-0 px-2 flex flex-nowrap text-xs items-center text-[#00021bf8]">
              {{ column.label }}
            </div>
          </td>
        </tr>
      </thead>
      <tbody>
        <!-- 如果data为空，显示空提示 -->
        <tr v-if="data.length === 0">
          <td class="h-40" :colspan="filterColumns.length + 1">
            <div class="flex items-center justify-center h-8">
              <span class="text-gray-400 text-xs">暂无数据</span>
            </div>
          </td>
        </tr>
        <template v-else>
          <Row
            v-for="(task, index) in data"
            :id="task.id"
            :key="index"
            :task="task"
            :columns="filterColumns"
            :selected-cell="selectedCell"
            @cell:select="handleCellClick"
          />
        </template>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
table,
th,
td,
tr {
  @apply p-0 box-border;
}
td{
  @apply border min-h-8;
}
</style>
