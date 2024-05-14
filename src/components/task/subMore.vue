<script setup>
import Button from 'primevue/button'

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  cate: {
    type: String,
    default: 'task',
  },
})

const emit = defineEmits(['uploaded'])

const op = ref(null)
function toggle(event) {
  op.value.toggle(event)
}

const options = ref([
  {
    label: '新窗口打开',
    value: 'open',
  },
  {
    label: '复制链接',
    value: 'copy',
  },
  {
    label: '更改父任务',
    value: 'update',
  },
  {
    label: '删除',
    value: 'delete',
  },
])

const value = ref('')

// 选择上传
const uploadInput = ref(null)

function hangleChange() {
  if (value.value === 'local') {
    uploadInput.value.click()
  }
  else {
    // 弹出网盘文件
    console.log('弹出网盘文件', value.value)
  }
}

// 本地上传
const loading = ref(false)
const files = ref([])
async function uploader(event) {
  loading.value = true
  // 在files里插入临时数据
  files.value.push({
    file_name: event.target.files[0].name,
    file_type: 'loading',
    file_size: formatSize(event.target.files[0].size),
  })

  const formData = new FormData()
  formData.append('id', props.id)
  formData.append('cate', props.cate)
  formData.append('file', event.target.files[0])

  const { data: res } = await http.post('/file/upload', formData)
  if (res.code === 200) {
    ElMessage.success('上传成功')
    uploadInput.value.value = null

    files.value[files.value.length - 1] = res.data

    emit('uploaded', res.data)
  }
  else {
    files.value.pop()
    ElMessage.error('上传失败')
  }
  loading.value = false
}

function handleShow(val) {
  console.log(val)
}
</script>

<template>
  <np-dropdown @show="handleShow" @hide="handleShow">
    <Button icon="icon-[lucide--ellipsis]" size="small" text plain />
    <template #menu>
      <np-dropdown-item label="新窗口打开" />
      <np-dropdown-item label="新窗口打开" icon />
      <np-dropdown-item label="新窗口打开" icon="icon-[lucide--external-link]" />
      <np-dropdown-item label="复制链接" icon="icon-[lucide--link]" />
      <np-dropdown-item label="更改父任务" icon="icon-[lucide--list-tree]" />
      <np-dropdown-item label="删除" icon="icon-[lucide--trash]" danger />
    </template>
  </np-dropdown>
</template>
