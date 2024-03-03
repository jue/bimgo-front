<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  prop: {
    type: String,
    default: '',
  },
  row: {
    type: Object,
    default: () => { },
  },
})
const emit = defineEmits(['update:modelValue'])
const { config } = useUserStore()
const isEdit = ref(false)

const value = ref(props.modelValue)

const isPassTime = computed(() => {
  const today = new Date().setHours(0, 0, 0, 0) // 获取当天的开始日期
  const targetDate = new Date(value.value).setHours(0, 0, 0, 0) // 获取目标日期的开始日期
  return targetDate < today
})

const datePicker = ref(null)

function changeEdit() {
  isEdit.value = !isEdit.value
  if (isEdit.value) {
    nextTick(() => {
      datePicker.value.handleOpen()
    })
  }
}
const isNull = ref('')
async function saveValue(val) {
  if (isNull.value === null)
    return

  isNull.value = val

  const { data: res } = await http.post('/task/time/update', {
    prop: props.prop,
    tid: props.row.tid,
    time: value.value,
  })
  if (res.code === 200)
    emit('update:modelValue', value.value)
  else
    value.value = props.modelValue

  isNull.value = props.modelValue
}

function disabledDate(date) {
  if (props.prop === 'end_time' && props.row.start_time)
    return date < new Date(props.row.start_time) - 86400000 // 减一天的毫秒数

  if (props.prop === 'start_time' && props.row.end_time)
    return date > new Date(props.row.end_time)

  return false
}

const isCalendarVisible = ref(false)
function changeVisible(val) {
  isCalendarVisible.value = !val

  if (!val)
    isEdit.value = false
}
</script>

<template>
  <div class="w-full">
    <div v-if="!isEdit" :class="{ 'text-red-500': isPassTime && prop === 'end_time' && value }" class="flex items-center" @click="changeEdit">
      {{ value || '待设置' }}
    </div>
    <!-- <el-input v-else ref="datePicker" v-model="value" placeholder="请输入" clearable @change="changeValue" /> -->
    <el-date-picker
      v-else
      ref="datePicker"
      v-model="value"
      :size="config.task_table.size" type="date" class="-mx-3" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
      :disabled-date="disabledDate"
      placeholder="选择日期"
      :editable="false"
      @blur="isEdit = false"
      @change="saveValue"
      @visible-change="changeVisible"
    />
  </div>
</template>

<style scoped lang="scss">
:deep() {
  .el-input__prefix {
    display: none;
  }
}
</style>
