<script setup>
import DatePicker from 'vue-datepicker-next'
import 'vue-datepicker-next/index.css'
import 'vue-datepicker-next/locale/zh-cn'
import { formatDate } from '@/lib/index'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  field: {
    type: String,
    default: '',
  },
})

const value = ref(props.data[props.field])
const datePicker = ref(null)

function handleOpen() {
  open.value = true
}

const isPassTime = computed(() => {
  // 根据更新后的值计算 isPassTime
  return calculateIsPassTime(value.value)
})

function calculateIsPassTime(date) {
  // if (props.field === 'end_time' && date === null)
  //   return false

  if (!props.data.end_time)
    return false

  const endTime = new Date(props.data.end_time).setHours(0, 0, 0, 0)
  const doneTime = new Date(date).setHours(0, 0, 0, 0)
  return doneTime > endTime
}

async function handleChange(val) {
  const { data: res } = await http.post('/issue/update/date', {
    iid: props.data.iid,
    field: props.field,
    date: val,
  })

  if (res.code === 200) {
    value.value = val
    // 使用计算属性更新 isPassTime
    isPassTime.value = calculateIsPassTime(value.value)
  }
}

watch(() => props.data[props.field], (val) => {
  if (props.field === 'end_time')
    console.log(props.field, val, props.data.end_time, props.data.title)

  value.value = val
  // 使用计算属性更新 isPassTime
  // isPassTime.value = calculateIsPassTime(value.value)
})
</script>

<template>
  <div class="h-full w-full flex">
    <DatePicker
      ref="datePicker" v-model:value="value" :placeholder="placeholder" type="date" value-type="YYYY-MM-DD"
      :editable="false" popup-class="!mt-1" @change="handleChange"
    >
      <template #icon-calendar>
        <span class="icon-[lucide--calendar]" />
      </template>
      <template #input>
        <div
          class="flex items-center cursor-pointer h-full px-[6px]"
          :class="{ 'text-red-500': isPassTime && field === 'done_time' }" @click="handleOpen"
        >
          {{ formatDate(value) }}
        </div>
      </template>
    </DatePicker>
  </div>
</template>

<style scoped lang="scss">
:deep(){
  .mx-datepicker {
    @apply w-full;
    .mx-input-wrapper {
      @apply w-full h-full;
    }
  }
}
</style>
