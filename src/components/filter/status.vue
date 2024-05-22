<script setup>
const props = defineProps({
  cate: {
    type: String,
    default: 'task',
  },
})
const value = defineModel()
const { task_columns, issue_columns_v2 } = storeToRefs(useUserStore())

const optionList = computed(() => {
  if (props.cate === 'issue')
    return issue_columns_v2.value.find(item => item.value === 'status')?.options
  else
    return task_columns.value.find(item => item.value === 'status')?.options
})

function getValue(val) {
  return optionList.value.find(item => item.value === val)
}
</script>

<template>
  <MultiSelect
    v-model="value"
    :options="optionList"
    option-value="value"
    option-label="label"
    placeholder="未指定"
    display="chip"
    filter
    filter-placeholder="搜索状态"
    :pt="{
      root: ({ props, state }) => ({
        class: [
          '!ring-0 border border-dashed hover:bg-gray-100',
        ],
      }),
      label: ({ props }) => ({ class: ['!py-1'] }),
      trigger: {
        class: ['hidden'],
      },
    }"
  >
    <!-- 值显示模板 -->
    <template #value="{ value, placeholder }">
      <div class="flex items-center space-x-1">
        <span class="icon-[lucide--circle-plus] text-gray-500 text-[13px]" />
        <span class="text-gray-500">状态</span>
        <Divider v-if="value.length" layout="vertical" />
        <template v-for="item in value" :key="item">
          <div
            class="text-xs h-6 flex items-center px-2 rounded"
            :style="{ borderColor: `${getValue(item)?.color}`, backgroundColor: `${getValue(item)?.color}20`, color: `${getValue(item)?.color}` }"
          >
            {{ getValue(item)?.label }}
          </div>
        </template>
      </div>
    </template>

    <!-- 底模板 -->
    <!-- <template #footer>
      <div>清除</div>
    </template> -->
  </MultiSelect>
</template>
