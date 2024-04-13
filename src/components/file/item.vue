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
  <div class="border rounded-lg p-2 flex items-center bg-white">
    <FilePreview class="shrink-0" :file="file" />
    <div class="flex-1 overflow-hidden whitespace-nowrap text-ellipsis px-2" :title="file.file_name">
      <div class="text-sm">
        {{ file.file_name }}
      </div>
      <div class="text-xs text-gray-400">
        {{ file.file_size }}
      </div>
    </div>
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
  </div>
</template>
