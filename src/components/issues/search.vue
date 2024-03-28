<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['update:modelValue', 'search', 'input'])
const { issue_columns } = storeToRefs(useUserStore())
const value = ref(props.modelValue)
const inputRef = ref(null)
const isFocus = ref(false)

function isIssueColumnLabel(str) {
  const labels = Object.values(issue_columns.value).map(column => column.label)
  return labels.includes(str)
}
function getValue() {
  const index = value.value.indexOf(':')

  if (index !== -1 && isIssueColumnLabel(value.value.substring(0, index))) {
    return {
      field: `${value.value.substring(0, index)}:`,
      value: value.value.substring(index + 1),
    }
  }
  else {
    return {
      field: '',
      value: value.value,
    }
  }
}

function handleInput() {
  emit('update:modelValue', value.value)
  emit('input', value.value)
}

watch(() => props.modelValue, (val) => {
  value.value = val
  inputRef.value.focus()
})
</script>

<template>
  <div class="w-full flex items-center space-x-2">
    <div
      class="h-8 flex items-center border rounded-lg px-3 space-x-2 flex-1"
      :class="{ 'ring ring-2 ring-blue-600': isFocus }"
    >
      <span class="icon-[lucide--list-filter] text-gray-500" />
      <div class="relative flex flex-1 h-full cursor-text">
        <div class="absolute h-full inline-flex items-center z-10 bg-white">
          <span class="text-gray-500">{{ getValue().field }}</span>
          <span>{{ getValue().value }}</span>
        </div>
        <input
          ref="inputRef" v-model="value" class="w-full h-full bg-transparent outline-none relative z-0 caret-black"
          placeholder="按问题名搜索" @input="handleInput" @focus="isFocus = true" @blur="isFocus = false"
        >
      </div>
      <div class="flex items-center">
        <el-tooltip v-if="value" content="清除" placement="top">
          <np-button text icon="circle-x" shape="square" @click="value = ''" />
        </el-tooltip>
      </div>
    </div>
    <!-- <div class="flex items-center space-x-2">
      <np-button :size="32" class="px-4">
        取消
      </np-button>
      <np-button :size="32" class="px-4 !bg-blue-600 text-white" @click="emit('search')">
        搜索
      </np-button>
    </div> -->
  </div>
</template>
