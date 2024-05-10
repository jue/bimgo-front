<script setup>
import dayjs from 'dayjs'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  data: {
    type: Object,
    default: () => ({}),
  },
  cate: {
    type: String,
    default: 'task',
  },
  field: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const value = ref(props.modelValue ? new Date(props.modelValue) : '')
watch(() => props.modelValue, (val) => {
  value.value = val ? new Date(val) : ''
})

const op = ref(false)
function toggle(event) {
  op.value.toggle(event)
}

const apiUpdateUrl = computed(() => {
  if (props.cate === 'task')
    return `/task/update/time`
  if (props.cate === 'issue')
    return `/issue/update/time`
})

const apiClearUrl = computed(() => {
  if (props.cate === 'task')
    return `/task/time/clear`
  if (props.cate === 'issue')
    return `/issue/time/clear`
})

const getTaskList = inject('getTaskList')

function handleChange() {
  if (props.data.gid)
    saveData()
  else
    emit('update:modelValue', dayjs(value.value).format('YYYY-MM-DD'))

  op.value.hide()
}

async function saveData() {
  const { data: res } = await http.post(apiUpdateUrl.value, {
    field: props.field,
    gid: props.data.gid,
    time: dayjs(value.value).format('YYYY-MM-DD'),
  })

  if (res.code === 200) {
    emit('update:modelValue', dayjs(value.value).format('YYYY-MM-DD'))
    getTaskList()
  }
  else { value.value = props.modelValue ? new Date(props.modelValue) : '' }
}

// 清除日期
async function clear() {
  const { data: res } = await http.post(apiClearUrl.value, {
    field: props.field,
    gid: props.data.gid,
  })

  if (res.code === 200) {
    emit('update:modelValue', '')
    getTaskList()
  }
  else { value.value = props.modelValue ? new Date(props.modelValue) : '' }

  op.value.hide()
}
</script>

<template>
  <div class="px-3 w-full h-full flex items-center" @click="toggle">
    {{ modelValue || '' }}
  </div>
  <OverlayPanel
    ref="op"
    :pt="{
      content: {
        class: 'p-0',
      },
    }"
  >
    <Calendar
      v-model="value"
      inline
      :pt="{
        root: {
          class: 'shadow-none',
        },
      }"
    >
      <template #footer>
        <div class="flex items-center justify-between">
          <Button label="清除" class="w-24" outlined @click="clear" />
          <Button label="确定" class="w-24" :disabled="!value || dayjs(value).format('YYYY-MM-DD') === '0000-00-00' || dayjs(value).format('YYYY-MM-DD') === modelValue" @click="handleChange" />
        </div>
      </template>
    </Calendar>
    <!-- {{ dayjs(value).format('YYYY-MM-DD') }} // {{ dayjs('2024-05-16', "YYYY-MM-DD") }} -->
  </OverlayPanel>
</template>
