<script setup>
const props = defineProps({
  id: {
    type: String,
    default: '',
  },
})

const files = ref([])

const { user } = storeToRefs(useUserStore())
const { cate } = storeToRefs(useTaskStore())

const textareaRef = ref(null)
const value = ref('')
const isFocus = ref(false)

function addFile(file) {
  files.value.push(file)
}

function updateFile(file) {
  const index = files.value.findIndex(item => item.file_name === file.file_name)
  if (index !== -1) {
    if (file.file_type === 'error') {
      setTimeout(() => {
        files.value.splice(index, 1)
      }, 1000)
    }
    else {
      files.value[index] = file
    }
  }
}

function deleteFile(file) {
  const index = files.value.findIndex(item => item.file_name === file.file_name)
  if (index !== -1)
    files.value.splice(index, 1)
}

async function handleSubmit() {
  const { data: res } = await http.post('/logs/create', {
    id: props.id,
    cate: cate.value,
    content: value.value,
    files: files.value,
  })

  if (res.code === 200) {
    ElMessage.success('评论成功')
    value.value = ''
    files.value = []

    const { getLogs } = useLogsStore()
    getLogs(props.id, cate.value)
  }
}
</script>

<template>
  <div class="w-full">
    <div class="pl-11">
      <div class="flex flex-wrap">
        <span
          v-for="(file, index) in files" :key="index"
          class="bg-gray-100 rounded-lg px-2 py-1 mr-2 mb-2 inline-flex items-center"
        >
          <span>{{ file.file_name }}</span>
          <el-tooltip :content="file.file_type === 'loading' ? '上传中' : '删除'">
            <span
              v-if="file.file_type === 'loading'"
              class="icon-[lucide--loader-circle] ml-2 text-blue-400 cursor-pointer animate-spin"
            />
            <span v-else class="icon-[lucide--x] ml-2 text-red-400 cursor-pointer" @click="deleteFile(file)" />

          </el-tooltip>
        </span>
      </div>
    </div>
    <div class="w-full flex items-start space-x-3">
      <UserAvatar :uid="user?.uid" :size="32" shape="square" />
      <div class="flex-1 space-y-3">
        <div
          class="w-full bg-gray-100 py-2 px-3 rounded-lg border border-gray-100 focus:bg-yellow-200"
          :class="{ '!border-green-600 ring-2 ring-green-100 bg-white': isFocus }"
          @click="textareaRef?.focus()"
        >
          <Textarea
            ref="textareaRef"
            v-model="value"
            class="w-full h-full !bg-transparent !shadow-none !ring-0 !p-0 resize-none"
            auto-resize
            placeholder="尝试上传文件并添加评论…"
            @focus="isFocus = true"
            @blur="isFocus = false"
          />
          <div class="flex items-end justify-between">
            <div class="space-x-1 flex items-center">
              <UploadButton :id="id" :cate="cate" status="no-status" @add="addFile" @update="updateFile">
                <Button icon="icon-[lucide--paperclip]" class="opacity-80" plain text size="small" />
              </UploadButton>
              <!-- <Button icon="icon-[lucide--at-sign]" class="opacity-80" plain text size="small" /> -->
            </div>
            <div>
              <Button label="发送" icon="icon-[lucide--send]" :disabled="!value && files.length === 0" @click.stop="handleSubmit" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep() {
  .el-textarea__inner {
    @apply p-0 resize-none shadow-none rounded-none bg-transparent;
  }
}
</style>
