<script setup>
import DatePicker from 'vue-datepicker-next'
import 'vue-datepicker-next/index.css'
import 'vue-datepicker-next/locale/zh-cn.es'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  field: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '请选择日期',
  },
})
const open = ref(false)
const value = defineModel()

const datePicker = ref(null)

function handleOpen() {
  open.value = true
}

function handleChange(val) {
  value.value = val
  open.value = false
}

function handleRemove() {
  value.value = null
  open.value = false
}

onClickOutside(datePicker, () => {
  open.value = false
})
</script>

<template>
  <DatePicker
    ref="datePicker" v-model:value="value" :placeholder="placeholder" type="date" value-type="YYYY-MM-DD"
    :editable="false" popup-class="!mt-1 np-datepicker" :clearable="false" :open="open" @change="handleChange"
  >
    <template #icon-calendar>
      <span class="icon-[lucide--calendar]" />
    </template>
    <template #input>
      <div
        class="flex items-center cursor-pointer h-10 px-3"
        @click="handleOpen"
      >
        <span v-if="value">{{ value }}</span>
        <span v-else class="text-gray-400 w-full">{{ placeholder }}</span>
      </div>
    </template>
    <template #footer>
      <div class="flex items-center justify-between px-2 space-x-2">
        <Button label="清除" outlined class="w-24" severity="info" @click="handleRemove" />
        <Button label="确定" class="w-24" severity="info" @click="handleConfirm" />
      </div>
    </template>
  </DatePicker>
</template>
