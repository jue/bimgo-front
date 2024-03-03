<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  row: {
    type: Object,
    default: () => {},
  },
})
const emit = defineEmits(['update:modelValue'])

const input = ref(null)
const isEdit = ref(false)
const value = ref('')

async function updateDescription() {
  const { data: res } = await http.post('/task/description/update', {
    tid: props.row.tid,
    description: value.value,
  })
  if (res.code === 200) {
    isEdit.value = false
    emit('update:modelValue', value.value)
  }
}

function changeEdit() {
  isEdit.value = !isEdit.value
  if (isEdit.value) {
    value.value = props.modelValue
    nextTick(() => {
      input.value.focus()
    })
  }
}

watch(isEdit, () => {
  if (!isEdit.value)
    value.value = props.modelValue
})
</script>

<template>
  <span>
    <div v-if="!isEdit" class=" flex items-center min-h-9 cursor-pointer" :class="{ 'text-zinc-800': modelValue }" @click="changeEdit">
      {{ modelValue || '待添加' }}
    </div>
    <div v-else class="w-full">
      <el-input ref="input" v-model="value" :autosize="{ minRows: 5, maxRows: 10 }" type="textarea" placeholder="请输入" class="w-full" />
      <div class="flex justify-end py-2">
        <el-button type="info" text @click="isEdit = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateDescription">
          保存
        </el-button>
      </div>
    </div>
  </span>
</template>
