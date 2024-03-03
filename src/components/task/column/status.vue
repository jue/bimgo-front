<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
    default: 1,
  },
  row: {
    type: Object,
    default: () => ({}),
  },
})
const emit = defineEmits(['update:modelValue'])
const { taskStatus } = storeToRefs(useSettingsStore())

const value = ref(props.modelValue)
const itemValue = ref(taskStatus.value.find(item => item.value === value.value))

async function changeValue(val) {
  const { data: res } = await http.post('/task/status/update', {
    tid: props.row.tid,
    status: val,
  })
  if (res.code === 200) {
    itemValue.value = taskStatus.value.find(item => item.value === val)
    emit('update:modelValue', val)
  }
  else {
    value.value = props.modelValue
  }
}

watch(() => props.modelValue, (val) => {
  value.value = val
  itemValue.value = taskStatus.value.find(item => item.value === val)
})
</script>

<template>
  <el-dropdown trigger="click">
    <div class="flex items-center h-6 px-1 rounded-md" :style="{ backgroundColor: `${itemValue?.color}30` }">
      <div class="w-1 h-3.5 rounded-md mr-1" :style="{ backgroundColor: `${itemValue?.color}` }" />
      <div>
        {{ itemValue.label }}
      </div>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in taskStatus.filter(item => item.value !== 0)" :key="item.value" :disabled="value === item.value" @click="changeValue(item.value)">
          <div class="flex items-center">
            <div class="w-3.5 h-3.5 rounded-sm mr-1" :style="{ backgroundColor: `${item.color}` }" />
            <div>{{ item.label }}</div>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
