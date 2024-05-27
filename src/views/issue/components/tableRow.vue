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
      width: 80,
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
</script>

<template>
  <div class="overflow-x-auto divide-y border-b">
    <div v-for="task in tasks" :key="task.gid" class="flex divide-x w-fit min-w-full">
      <div v-for="(column, index) in columns" :key="index" class=" h-[34px] flex items-center shrink-0" :style="{ width: `${column.width}px` }">
        <FieldTitle v-if="column.value === 'title'" v-model="task[column.value]" :data="task" open-detail cate="issue" />
        <FieldUids v-else-if="column.value === 'uids'" v-model="task[column.value]" :data="task" class="!shadow-none !ring-0 bg-transparent" cate="issue" />
        <FieldStatus v-else-if="column.value === 'status'" v-model="task[column.value]" :data="task" class="!shadow-none !ring-0 bg-transparent" cate="issue" />
        <FieldPriority v-else-if="column.value === 'priority'" v-model="task[column.value]" :data="task" class="!shadow-none !ring-0 bg-transparent" cate="issue" />
        <FieldDate v-else-if="column.value === 'start_time'" v-model="task[column.value]" field="start_time" :data="task" class="!shadow-none !ring-0 bg-transparent" cate="issue" />
        <FieldDate v-else-if="column.value === 'end_time'" v-model="task[column.value]" field="end_time" :data="task" class="!shadow-none !ring-0 bg-transparent" cate="issue" />
        <FieldDate v-else-if="column.value === 'done_time'" v-model="task[column.value]" field="done_time" :data="task" class="!shadow-none !ring-0 bg-transparent" cate="issue" />
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
</template>
