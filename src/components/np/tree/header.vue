<script setup>
const taskStore = useTaskStore()
const { cate, columns } = storeToRefs(taskStore)

// 获取columns
const { task_columns, issue_columns_v2 } = storeToRefs(useUserStore())
const filterColumns = computed(() => {
  if (cate.value === 'task') {
    return [
      {
        label: '',
        value: 'id',
        width: 40,
        show: true,
      },
      ...task_columns.value,
      {
        label: '',
        value: 'op',
        width: 80,
        show: true,
      },
    ]
  }

  if (cate.value === 'issue') {
    return [
      {
        label: '',
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
    ]
  }
})

onMounted(() => {
  taskStore.setColumns(filterColumns.value)
})
</script>

<template>
  <div class="min-w-full w-fit border-y">
    <div v-if="cate === 'task'" class="flex items-center border-b">
      <div
        v-for="(column, index) in columns.filter(item => item.show)" :key="index"
        :style="{ width: `${column.width}px` }"
        class="text-xs h-8 flex items-center px-2"
      />
    </div>
    <div class="flex items-center divide-x">
      <div
        v-for="(column, index) in columns.filter(item => item.show)" :key="index"
        :style="{ width: `${column.width}px` }"
        class="text-xs h-8 flex items-center px-2 shrink-0 text-zinc-500"
      >
        <!-- cate为task、column.value为id时 -->
        <FieldOptions v-if="cate === 'task' && column.value === 'id'" />
        <FieldOptions v-if="cate === 'issue' && column.value === 'op'">
          <Button icon="icon-[lucide--plus]" text plain size="small" />
        </FieldOptions>
        <span v-else>{{ column.label }}</span>
      </div>
    </div>
  </div>
</template>
