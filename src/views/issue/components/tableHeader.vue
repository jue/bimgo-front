<script setup>
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
</template>
