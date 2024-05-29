<script setup>
import dayjs from 'dayjs'

const props = defineProps({
  tasks: {
    type: Array,
    default: () => [],
  },
})

const { issue_columns_v2 } = storeToRefs(useUserStore())
const columns = computed(() => {
  return [
    {
      label: '#',
      value: 'id',
      width: 40,
      show: true,
    },
    ...issue_columns_v2.value,
    {
      label: '操作',
      value: 'op',
      width: 80,
      show: true,
    },
  ].filter(item => item.show)
})

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

// 行选择器
const cellGids = ref([])
</script>

<template>
  <div class="overflow-x-auto divide-y last:border-b relative">
    <div class="border-y flex divide-x w-fit overflow-x-auto min-w-full">
      <div v-for="(column, index) in columns" :key="index" class=" h-[34px] flex items-center px-2 shrink-0 text-xs font-semibold text-[#636c76]" :style="{ width: `${column.width}px` }">
        <template v-if="column.value === 'op'">
          <FieldOptions cate="issue" />
        </template>
        <template v-else>
          {{ column.label }}
        </template>
      </div>
    </div>
    <div v-for="task in tasks" ref="cellRef" :key="task.gid" class="flex divide-x w-fit min-w-full">
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
    <CreateData cate="issue" />
  </div>
</template>

<style lang="scss" scoped>
  .focus {
    @apply  outline outline-2 -outline-offset-2 outline-green-500 bg-white rounded ;
    // &:after {
    //   content: '';
    //   @apply bg-white absolute border-2 border-green-500 w-2 h-2 rounded-full bottom-0 right-0 translate-x-1/2 translate-y-1/2 z-50;
    // }
  }
</style>
