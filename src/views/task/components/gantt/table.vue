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
</script>

<template>
  <div class="overflow-auto flex-1">
    <table class="table-fixed border-collapse relative">
      <colgroup>
        <col class="min-w-10" style="padding: 0; height: 32px;">
        <col v-for="column in task_columns" :key="column.prop" :style="{ 'min-width': `${column.width}px` }" style="padding: 0; height: 32px;">
      </colgroup>

      <thead>
        <tr>
          <td class="h-8" :colspan="task_columns.length + 1" />
          <!-- <td v-for="(column, index) in task_columns" :key="index" /> -->
        </tr>
        <tr>
          <td class="h-8">
            <div class="flex items-center justify-center">
              <ColumnOption />
            </div>
          </td>
          <td v-for="(column, index) in task_columns" :key="index" class="relative">
            <div class="inset-0 px-2 flex flex-nowrap text-xs items-center text-[#00021bf8]">
              {{ column.label }}
            </div>
          </td>
        </tr>
      </thead>
      <tbody>
        <Row
          v-for="(task, index) in data"
          :id="task.id"
          :key="index"
          :task="task"
          :columns="task_columns"
        />
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
