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
  disabledDate: Function, // disabledDate
})

const { Calendar } = DatePicker

const value = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  value.value = val
})

function handleDateClick(val) {
  console.log(val)
}
</script>

<template>
  <el-dropdown trigger="click">
    <span>{{ value }}</span>
    <template #dropdown>
      <el-dropdown-menu>
        <Calendar
          :get-classes="np"
          :value="new Date(value)"
          :default-value="new Date(value)"
          :disabled-date="disabledDate"
          @update:value="handleDateClick"
        />
        <div class="flex items-center space-x-5 px-3">
          <button class="btn" @click="clear">
            清空
          </button>
          <button class="btn btn-primary" @click="confirm">
            确定
          </button>
        </div>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss">
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
