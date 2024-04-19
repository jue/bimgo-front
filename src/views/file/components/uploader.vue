<script setup>
const emit = defineEmits(['uploaded'])
const route = useRoute()
const uploadInput = ref(null)
const loading = ref(false)
function seletFile() {
  uploadInput.value.click()
}

async function uploader(event) {
  loading.value = true
  const formData = new FormData()
  formData.append('file', event.target.files[0])
  formData.append('dir_id', route.query.dir_id || '')

  const { data: res } = await http.post('/uffile/upload', formData)
  if (res.code === 200)
    emit('uploaded', res.data)

  uploadInput.value.value = null
  loading.value = false
}
</script>

<template>
  <el-button type="primary" bg :loading="loading" :disabled="loading" class="rounded-full" @click="seletFile">
    <div class="space-x-2 flex items-center">
      <span v-if="!loading" class="icon-[lucide--file-plus-2]" />
      <span>上传文件</span>
    </div>
  </el-button>
  <input ref="uploadInput" accept="*/*" type="file" class="hidden" @change="uploader">
</template>
