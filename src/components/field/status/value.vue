<script setup>
const props = defineProps({
  value: {
    type: Object,
    default: () => {},
  },
  cate: {
    type: String,
    default: 'task',
  },
})

const { issue_columns_v2, task_columns } = storeToRefs(useUserStore())
const itemValue = computed(() => {
  if (props.cate === 'issue')
    return issue_columns_v2.value.find(item => item.value === 'status').options.find(item => item.value === props.value)
  else
    return task_columns.value.find(item => item.value === 'status').options.find(item => item.value === props.value)
})
</script>

<template>
  <div
    class="text-xs h-6 flex items-center px-2 rounded"
    :class="{ ' -mx-2': inline }"
    :style="{ borderColor: `${itemValue?.color}`, backgroundColor: `${itemValue?.color}20`, color: `${itemValue?.color}` }"
  >
    {{ itemValue?.label }}
  </div>
</template>
