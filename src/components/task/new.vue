<script setup>
const emit = defineEmits(['refresh'])

const title = ref('')
const isEdit = ref(false)

function add() {
  isEdit.value = true
  title.value = ''
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
  <div class="px-11 hover:bg-[#f5f7fa] h-10 flex items-center">
    <el-button v-if="!isEdit" text type="primary" class="px-1" @click="add">
      <div class="flex items-center space-x-1">
        <span class="icon-[lucide--plus]" />
        <span>新任务</span>
      </div>
    </el-button>

    <el-input v-else v-model="title" placeholder="请输入" class="w-80" clearable autofocus @blur="isEdit = false" @keyup.enter="handleEnter">
      <template #suffix>
        <span class="icon-[lucide--corner-down-left] text-gray-400 text-base" />
      </template>
    </el-input>
  </div>
</template>
