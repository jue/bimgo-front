<script setup>
import DatePicker from 'vue-datepicker-next'
import 'vue-datepicker-next/index.css'
import 'vue-datepicker-next/locale/zh-cn'

const props = defineProps({
  modelValue: {
    type: Array,
    default: null,
  },
  type: {
    type: String,
    default: 'date',
  },
  format: {
    type: String,
    default: 'YYYY-MM-DD',
  },
  range: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '请选择日期',
  },
  separator: {
    type: String,
    default: '-',
  },
  editable: {
    type: Boolean,
    default: false,
  },
  disabledDate: Function, // disabledDate
  clearable: {
    type: Boolean,
    default: false,
  },
  prop: {
    type: String,
    default: '',
  },
  task: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['update:modelValue', 'clear'])
const datePicker = ref(null)

const value = ref(props.modelValue)

const isPassTime = computed(() => {
  const today = new Date().setHours(0, 0, 0, 0) // 获取当天的开始日期
  const targetDate = new Date(value.value).setHours(0, 0, 0, 0) // 获取目标日期的开始日期
  return targetDate < today
})

async function handleClear() {
  const { data: res } = await http.post('/task/time/clear', {
    prop: props.prop,
    tid: props.task.tid,
  })
  if (res.code === 200)
    emit('update:modelValue', null)
}
function handleOpen() {
  open.value = true
}

async function handleChange(val) {
  value.value = val
  const { data: res } = await http.post('/task/time/update', {
    prop: props.prop,
    tid: props.task.tid,
    time: val,
  })
  if (res.code === 200)
    emit('update:modelValue', value.value)
}

watch(() => props.modelValue, (val) => {
  value.value = val
})
</script>

<template>
  <div class="np-datepicker">
    <DatePicker
      ref="datePicker"
      v-model:value="value"
      :placeholder="placeholder"
      :type="type"
      value-type="format"
      :format="format"
      :disabled-date="disabledDate"
      :editable="editable"
      :clearable="clearable"
      popup-class="np-datepicker"
      @change="handleChange"
    >
      <template #icon-calendar>
      <!-- <span class="icon-[lucide--calendar]" /> -->
      </template>
      <template #input>
        <div class="flex items-center cursor-pointer" @click="handleOpen">
          <span v-if="value" class="text-gray-600 relative group">
            <div class="absolute right-0 top-0 h-4 w-4 hidden group-hover:flex items-center justify-center rounded-full bg-[#bfbfbf] translate-x-1 -translate-y-1 hover:!bg-blue-600 close" @click.stop="handleClear">
              <span class="text-xs text-white icon-[lucide--x]" />
            </div>
            <div class="h-8 px-2 flex items-center rounded-full group-hover:bg-gray-100 text" :class="{ 'text-red-500': isPassTime && prop === 'end_time' && value }">{{ value }}</div>
          </span>
          <span v-else class="text-gray-400 px-2">
            {{ placeholder }}
          </span>
        </div>
      </template>
    </DatePicker>
  </div>
</template>

<style scoped lang="scss">
:deep(){
  .mx-datepicker {
    @apply w-auto;
  }
  .mx-datepicker-footer {
    @apply border-none;
  }
  .mx-calendar-content .cell.active {
    @apply rounded-md;
  }
}

.close:hover {
  & ~ .text {
    @apply ring-1 ring-blue-600;
  }
}
.btn {
  @apply flex-1 h-9 text-[#1b9aee] border border-[#1b9aee]/40;
  &:hover {
    @apply bg-[#1b9aee]/10;
  }
  &-primary {
    @apply bg-[#1b9aee] text-white;
    &:hover {
      @apply bg-[#0171c2];
    }
  }
}
</style>
