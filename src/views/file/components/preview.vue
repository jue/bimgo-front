<script setup>
import VuePdfEmbed from 'vue-pdf-embed'
import 'vue-pdf-embed/dist/style/index.css'
import { downloadFile, formatSize } from '@/lib/file.js'

const show = ref(false)
const file = ref({})

async function open(file_path) {
  show.value = true
  const { data: res } = await getFileInfo(file_path)
  if (res.code === 200)
    file.value = res.data
}

defineExpose({
  open,
})

function close() {
  show.value = false
}
</script>

<template>
  <el-dialog v-model="show" fullscreen :show-close="false" class="!p-0 !rounded-none" append-to-body>
    <template #header>
      <div class="flex items-center justify-between h-14 px-3 bg-white border-b">
        <div class="flex items-center space-x-2">
          <FileIcon :type="file?.file_type" class="h-10 shrink-0 cursor-pointer !p-1 bg-transparent" />
          <div class="space-y-0.5">
            <div class="font-bold text-[15px]">
              {{ file?.file_name }}
            </div>
            <div class="text-xs text-gray-500">
              {{ formatSize(file?.file_size) }}
            </div>
          </div>
        </div>
        <div>
          <el-button disabled>
            分享文件
          </el-button>
          <el-button color="#2c2c2c" @click="downloadFile(file)">
            下载文件
          </el-button>

          <el-tooltip content="关闭">
            <el-button text class="w-8 h-8" @click="close">
              <span class="icon-[lucide--x]" />
            </el-button>
          </el-tooltip>
        </div>
      </div>
    </template>
    <div class="h-full flex overflow-auto bg-gray-100">
      <div class="flex-1 flex items-center justify-center p-10">
        <!-- 预览图片 -->
        <el-image v-if="file?.file_type?.startsWith('image/')" :src="file.fileUrl" class="max-h-[100%] max-w-[100%]" />
        <!-- 预览pdf -->
        <VuePdfEmbed
          v-else-if="file?.file_type?.startsWith('application/pdf')" :source="file.fileUrl" class="w-2/3 h-auto"
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
              <FileIcon :type="file?.file_type" class="h-11 shrink-0 cursor-pointer" />
              <div class="flex-1 shrink-0">
                <div>{{ file?.file_name }}</div>
                <div class="text-xs text-gray-500">
                  {{ file?.file_size }}
                </div>
              </div>
            </div>
            <div>
              <el-button type="primary" @click="downloadFile(file)">
                下载文件
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
