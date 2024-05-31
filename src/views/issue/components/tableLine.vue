<script setup>
import dayjs from 'dayjs'

const props = defineProps({
  cate: {
    type: String,
    default: 'task',
  },
  columns: {
    type: Array,
    default: () => [],
  },
  tasks: {
    type: Array,
    default: () => [],
  },
  selectedCell: {
    type: Object,
    default: () => {},
  },
})

// 行选择器
const cellGids = ref([])

// 当前选中的单元格
const selectedCell = ref({
  gid: null, // 行gid
  field: null, // Column field name
})

const cellRef = ref(null)
onClickOutside(cellRef, () => {
  selectedCell.value = {
    gid: null,
    field: null,
  }
})

function handleSelectCell(obj) {
  if (obj.field === 'id') {
    selectedCell.value = {
      gid: null,
      field: null,
    }
    return
  }
  selectedCell.value = obj
}
</script>

<template>
  <div v-if="tasks.length">
    <div v-for="(task, task_index) in tasks" :key="task_index" ref="cellRef" class="flex divide-x w-fit min-w-full border-b first:border-t">
      <div
        v-for="(column, index) in columns"
        :key="index"
        class=" h-[38px] flex items-center shrink-0 relative"
        :class="{ focus: selectedCell.gid === task.gid && selectedCell.field === column.value }"
        :style="{ width: `${column.width}px` }"
        @click="handleSelectCell({ gid: task.gid, field: column.value })"
      >
        <FieldTitle v-if="column.value === 'title'" v-model="task[column.value]" :data="task" open-detail cate="issue" class="px-2" />
        <FieldUids v-else-if="column.value === 'uids'" v-model="task[column.value]" :data="task" class="!shadow-none !ring-0 bg-transparent" cate="issue" />
        <FieldStatus v-else-if="column.value === 'status'" v-model="task[column.value]" :data="task" class="!shadow-none !ring-0 bg-transparent" cate="issue" />
        <FieldPriority v-else-if="column.value === 'priority'" v-model="task[column.value]" :data="task" class="!shadow-none !ring-0 bg-transparent" cate="issue" />
        <FieldDate v-else-if="column.value === 'start_time'" v-model="task[column.value]" field="start_time" :data="task" class="!shadow-none !ring-0 bg-transparent" cate="issue" />
        <FieldDate v-else-if="column.value === 'end_time'" v-model="task[column.value]" field="end_time" :data="task" class="!shadow-none !ring-0 bg-transparent" cate="issue" />
        <FieldDate v-else-if="column.value === 'done_time'" v-model="task[column.value]" field="done_time" :data="task" class="!shadow-none !ring-0 bg-transparent" cate="issue" />
        <div v-else-if="column.value === 'id'" class="flex items-center justify-center w-10">
          <Checkbox v-model="cellGids" :value="task.gid" />
        </div>
        <User v-else-if="column.value === 'uid'" :uid="task[column.value]" class="px-2" />
        <span v-else-if="column.value === 'created_at'" class="px-2">
          {{ dayjs(task[column.value]).format('YYYY-MM-DD HH:mm') }}
        </span>
        <span v-else>
          {{ task[column.value] }}
        </span>
      </div>
    </div>
  </div>
  <div v-else class="flex items-center justify-center h-20 text-gray-400 border-b">
    暂无数据
  </div>
</template>

<style lang="scss" scoped>
  .focus {
    @apply  outline outline-2 -outline-offset-2 outline-blue-500 bg-white rounded ;
    // &:after {
    //   content: '';
    //   @apply bg-white absolute border-2 border-green-500 w-2 h-2 rounded-full bottom-0 right-0 translate-x-1/2 translate-y-1/2 z-50;
    // }
  }
</style>
