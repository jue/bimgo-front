<script setup>
const props = defineProps({
  uid: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['refresh'])
const input = ref(null)
const title = ref('')
const isEdit = ref(true)

function add() {
  isEdit.value = true
  title.value = ''
  nextTick(() => {
    input.value.focus()
  })
}

async function handleEnter() {
  if (!title.value.trim())
    return false

  const { data: res } = await http.post('/task/add', { title: title.value })
  if (res.code === 200) {
    isEdit.value = false
    emit('refresh', {
      ...res.data,
    })
  }
}
</script>

<template>
  <div class="w-full hover:bg-[#f5f7fa] h-10 flex items-center">
    <el-button v-if="!isEdit" text type="primary" class="px-1" @click="add">
      <div class="flex items-center space-x-1">
        <span class="icon-[lucide--plus]" />
        <span>新任务</span>
      </div>
    </el-button>

    <el-input v-else ref="input" v-model="title" placeholder="请输入" class="w-full" clearable autofocus @blur="isEdit = false" @keyup.enter="handleEnter">
      <template #suffix>
        <span class="icon-[lucide--corner-down-left] text-gray-400 text-base" />
      </template>
    </el-input>
  </div>
</template>
