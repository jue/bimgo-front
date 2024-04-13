<script setup>
import { downloadFile } from '@/lib/index'

const props = defineProps({
  file: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['deleted'])

function deleteFiles() {
  ElMessageBox.confirm(
    `确定删除 ${props.file.file_name} 吗？`,
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      // type: 'warning',
    },
  )
    .then(async () => {
      const { data: res } = await deleteFile([props.file.fid])
      if (res.code === 200) {
        ElMessage.success('删除成功')
        emit('deleted')
      }
    })
    .catch(() => {
    })
}
</script>

<template>
  <div class="border rounded-lg bg-white relative overflow-hidden" :class="{ 'border-red-200': !file.status }">
    <div class="flex items-center p-2 relative z-10">
      <FilePreview class="shrink-0" :file="file" />
      <div class="flex-1 overflow-hidden whitespace-nowrap text-ellipsis px-2" :title="file.file_name">
        <div class="text-sm">
          {{ file.file_name }}
        </div>
        <div class="text-xs text-gray-400">
          {{ file.file_size }}
        </div>
      </div>
      <template v-if="file.status">
        <el-tooltip content="下载">
          <el-button
            text class="w-6 h-6 p-0" :disabled="!file.status || file.file_type === 'loading'"
            @click="downloadFile(file.fid)"
          >
            <span class="icon-[lucide--download] text-sm" />
          </el-button>
        </el-tooltip>
        <el-dropdown trigger="click" class="ml-0.5" :disabled="!file.status || file.file_type === 'loading'">
          <el-button text class="w-6 h-6 p-0" :disabled="!file.status || file.file_type === 'loading'">
            <span class="icon-[lucide--more-vertical] text-sm" />
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <!-- <el-dropdown-item>
            <span class="icon-[lucide--eye] mr-2" />
            <span>预览</span>
          </el-dropdown-item> -->
              <el-dropdown-item @click="deleteFiles">
                <div class="text-red-500 flex items-center">
                  <span class="icon-[lucide--trash] mr-2" />
                  <span>删除</span>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </div>
    <div
      v-if="!file.status"
      class="flex absolute top-0 bottom-0 right-0 left-0 z-50 bg-gray-50/50 items-center justify-end p-2"
    >
      <span class="text-xs text-red-400">已删除</span>
    </div>
  </div>
</template>
