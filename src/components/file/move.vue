<script setup>
const props = defineProps({
  files: {
    type: Array,
    default: () => [],
  },
})
const emit = defineEmits(['update:files'])
const form = reactive({
  type: 'move',
  fids: [],
  tid: '',
})
const show = ref(false)
function open() {
  show.value = true
  form.tid = ''
}
function close() {
  show.value = false
}

defineExpose({ open, close })

async function handleFileMove() {
  if (!form.tid) {
    ElMessage.warning('请选择目标任务')
    return
  }

  if (!props.files.length) {
    ElMessage.warning('请选择要移动的文件')
    return
  }

  form.fids = props.files.map(item => item.fid)

  const { data: res } = await http.post('/file/move', form)
  if (res.code === 200) {
    ElMessage.success('操作成功')
    emit('update:files')
    close()
  }
}
</script>

<template>
  <el-dialog v-model="show" title="移动或复制文件" width="350px">
    <div class="space-y-4">
      <div>
        <el-radio-group v-model="form.type">
          <el-radio label="move">
            移动{{ files.length }}个文件
          </el-radio>
          <el-radio label="copy">
            复制文件
          </el-radio>
        </el-radio-group>
      </div>
      <div>
        <div class="font-bold">
          选择目标任务
        </div>
        <div>
          <TaskSelect v-model="form.tid" />
        </div>
      </div>
      <el-divider />
      <div class="text-sm text-gray-600/65">
        <span v-if="form.type === 'move'">文件将被移动，此操作无法撤销</span>
        <span v-if="form.type === 'copy'">评论不会随文件一起复制。</span>
      </div>
    </div>
    <template #footer>
      <div>
        <el-button @click="show = false">
          取消
        </el-button>
        <el-button type="primary" @click="handleFileMove">
          {{ form.type === 'move' ? '移动' : '复制' }}文件
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
