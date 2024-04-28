<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'issue', // issue 任务 task 任务
  },
})

const value = defineModel()

const isShow = ref(false)
const { task_columns, issue_columns_v2 } = storeToRefs(useUserStore())
const optionList = computed(() => {
  if (props.type === 'issue')
    return issue_columns_v2.value.find(item => item.value === 'priority').options
  else
    return task_columns.value.find(item => item.value === 'priority').options
})

const itemValue = computed(() => {
  return optionList.value.find(item => item.value === value.value)
})
</script>

<template>
  <Dropdown
    v-model="value" :options="optionList" option-value="value" option-label="label" placeholder="未指定"
    class="w-full !py-0 bg-transparent !ring-0 !shadow-none hover:bg-gray-100"
    input-class="flex items-center"
    :class="{ '!bg-gray-100': isShow }"
    @show="isShow = true"
    @hide="isShow = false"
  >
    <template #value="scope">
      <!-- <div>{{ scope.value }}</div> -->
      <div
        class="text-xs border h-6 flex items-center px-2 rounded-full"
        :style="{ borderColor: `${itemValue?.color}`, backgroundColor: `${itemValue?.color}10`, color: `${itemValue?.color}` }"
      >
        {{ itemValue?.label }}
      </div>
    </template>
    <template #option="scope">
      <div class="flex space-x-2 w-full">
        <div class="w-4 h-4 flex items-center justify-center">
          <span v-if="value === scope.option.value" class="icon-[lucide--check]" />
        </div>
        <div
          class="w-3.5 h-3.5 rounded-full border-2"
          :style="{ borderColor: `${scope.option?.color}`, backgroundColor: `${scope.option?.color}10` }"
        />
        <div class="leading-none space-y-1 flex-1">
          <div>{{ scope.option.label }}</div>
          <div class="text-xs text-gray-400">
            {{ scope.option.desc }}
          </div>
        </div>
      </div>
    </template>
  </Dropdown>
</template>
