<script setup>
import { nanoid } from 'nanoid'

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  cate: {
    type: String,
    default: 'issue',
  },
  status: {
    type: String,
    default: 'active',
  },
})
const emit = defineEmits(['add', 'update'])
const uploadInput = ref(null)

function initInput(visible) {
  if (visible)
    uploadInput.value.value = null
}

const files = ref([])

async function uploader(event) {
  emit('add', {
    file_name: event.target.files[0].name,
    file_type: 'loading',
    file_size: formatSize(event.target.files[0].size),
  })

  // 在props.files里插入临时数据
  files.value.push({
    file_name: event.target.files[0].name,
    file_type: 'loading',
    file_size: formatSize(event.target.files[0].size),
  })

  const formData = new FormData()
  formData.append('id', props.id)
  formData.append('cate', props.cate)
  formData.append('status', props.status)
  formData.append('file', event.target.files[0])

  const { data: res } = await http.post('/file/upload', formData)
  if (res.code === 200) {
    uploadInput.value.value = null

    files.value[files.value.length - 1] = res.data

    emit('update', res.data)
  }
  else {
    emit('update', {
      file_name: event.target.files[0].name,
      file_type: 'error',
      file_size: formatSize(event.target.files[0].size),
    })
    ElMessage.error('上传失败')
  }
}
</script>

<template>
  <el-dropdown trigger="click" @visible-change="initInput">
    <slot name="default">
      <el-button type="primary" text class="px-1">
        <div class="flex items-center">
          <span class="icon-[lucide--plus]" />
          <span>添加文件</span>
        </div>
      </el-button>
    </slot>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="uploadInput.click()">
          <span class="icon-[lucide--upload] mr-2" />
          <span>上传文件</span>
        </el-dropdown-item>
        <el-dropdown-item>
          <span class="icon-[lucide--box] mr-2" />
          <span>从网盘选择</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <input ref="uploadInput" accept="*/*" type="file" class="hidden" @change="uploader">
</template>
