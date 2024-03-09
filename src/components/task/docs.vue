<script setup>
import { formatDate } from '@/lib/index'

const props = defineProps({
  tid: {
    type: String,
    default: '',
  },
  task: {
    type: Object,
    default: () => ({}),
  },
  files: {
    type: Array,
    default: () => [],
  },
})
const uploadInput = ref(null)
const filesTableRef = ref(null)

async function uploader(event) {
  const files = event.target.files

  const formData = new FormData()
  formData.append('tid', props.tid)
  formData.append('file', files[0])

  const { data: res } = await http.post('/file/upload', formData)
  if (res.code === 200) {
    ElMessage.success('上传成功')
    uploadInput.value.value = null
  }
}

function initInput(visible) {
  if (visible)
    uploadInput.value.value = null
}

async function downloadFile(fid) {
  const { data: res } = await http.post('/file/download', {
    fid,
  })
  if (res.code === 200)
    window.open(res.data)
}
</script>

<template>
  <div>
    <div>
      <el-table ref="filesTableRef" :data="files" :show-header="false" class="border-none">
        <el-table-column type="selection" width="45" />
        <el-table-column prop="file_name" label="文件名">
          <template #default="scope">
            <div class="flex items-center space-x-2 group">
              <div class="w-14 h-10 border rounded-lg flex items-center justify-center bg-gray-100">
                <Icon class="h-7" :type="scope.row.file_type" />
              </div>
              <div>
                <div>{{ scope.row.file_name }}</div>
                <div class="text-xs text-gray-500">
                  {{ scope.row.file_size }}
                </div>
              </div>
              <div class="invisible group-hover:visible">
                <el-tooltip content="下载">
                  <el-button text bg class="w-8 h-8" @click.stop="downloadFile(scope.row.fid)">
                    <span class="icon-[lucide--download] cursor-pointer text-blue-500 text-lg" />
                  </el-button>
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="realname" label="创建人" width="100">
          <template #default="scope">
            {{ scope.row.realname || scope.row.nickname }}
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="日期" width="120">
          <template #default="scope">
            {{ formatDate(scope.row.created_at) }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dropdown trigger="click" :visible-change="initInput">
      <el-button type="primary" text class="px-1">
        <div class="flex items-center">
          <span class="icon-[lucide--plus]" />
          <span>添加文件</span>
        </div>
      </el-button>
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
  </div>
</template>
