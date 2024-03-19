<script setup>
import VuePdfEmbed from 'vue-pdf-embed'
import { downloadFile } from '@/lib/index'
import 'vue-pdf-embed/dist/style/index.css'

const props = defineProps({
  file: {
    type: Object,
    default: () => {},
  },
})
const { project } = useSettingsStore()
function isImage(file) {
  const type = file.file_type
  return type.startsWith('image/')
}

const show = ref(false)
const fileUrl = ref('')
async function preview() {
  show.value = true
  const { data: res } = await http.post('/file/url', {
    fid: props.file.fid,
  })
  if (res.code === 200)
    fileUrl.value = `${project.file_url}${res.data.path}?_upt=${res.data.upt}`
}

function close() {
  show.value = false
  fileUrl.value = ''
}
</script>

<template>
  <div
    class="w-14 h-10 border rounded-lg flex items-center justify-center bg-gray-100 bg-cover bg-center bg-no-repeat cursor-pointer preview"
    :style="{ 'background-image': `url(${project.file_url}${file.path}?_upt=${file.upt})` }" @click="preview"
  >
    <span v-if="file.file_type === 'loading'" class="icon-[lucide--loader-2] animate-spin text-primary" />
    <FileIcon v-else-if="!isImage(file)" class="h-7" :type="file.file_type" />
  </div>
  <el-dialog v-model="show" fullscreen :show-close="false" class="!p-0 !rounded-none" append-to-body>
    <template #header>
      <div class="flex items-center justify-between h-14 px-3">
        <div class="space-y-1">
          <div class="font-bold">
            {{ file.file_name }}
          </div>
          <div class="text-xs text-gray-500">
            {{ file.file_size }}
          </div>
        </div>
        <div>
          <el-tooltip content="下载">
            <el-button text class="w-8 h-8" @click="downloadFile(file.fid)">
              <span class="icon-[lucide--download]" />
            </el-button>
          </el-tooltip>

          <el-tooltip content="关闭">
            <el-button text class="w-8 h-8" @click="close">
              <span class="icon-[lucide--x]" />
            </el-button>
          </el-tooltip>
        </div>
      </div>
    </template>
    <div class="h-full flex overflow-auto">
      <div class="flex-1 flex items-center justify-center p-10">
        <!-- 预览图片 -->
        <el-image v-if="file.file_type.startsWith('image/')" class="h-full" :src="fileUrl" />
        <!-- 预览pdf -->
        <VuePdfEmbed
          v-else-if="file.file_type.startsWith('application/pdf')" :source="fileUrl" class="w-2/3"
          :text-layer="false"
        />
        <div v-else>
          <div class="text-lg">
            没有可用预览
          </div>
          <div class="text-sm text-gray-400">
            下载并在您的电脑上打开此文件
          </div>
          <div class="flex items-center mt-10 space-x-40">
            <div class="flex items-center space-x-2">
              <div
                class="w-14 h-10 rounded-lg flex items-center justify-center bg-gray-100 bg-cover bg-center bg-no-repeat cursor-pointer preview"
                :style="{ 'background-image': `url(${project.file_url}${file.path}?_upt=${file.upt})` }"
                @click="preview"
              >
                <span v-if="file.file_type === 'loading'" class="icon-[lucide--loader-2] animate-spin text-primary" />
                <FileIcon v-else-if="!isImage(file)" class="h-7" :type="file.file_type" />
              </div>
              <div class="flex-1 shrink-0">
                <div>{{ file.file_name }}</div>
                <div class="text-xs text-gray-500">
                  {{ file.file_size }}
                </div>
              </div>
            </div>
            <div>
              <el-tooltip content="下载">
                <el-button type="primary" @click="downloadFile(file.fid)">
                  下载文件
                </el-button>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
