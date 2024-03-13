<script setup>
import { downloadFile, formatDate } from '@/lib/index'

const props = defineProps({
  tid: {
    type: String,
    default: '',
  },
})

const files = ref([])

const { project } = useSettingsStore()

const uploadInput = ref(null)
const filesTableRef = ref(null)

async function uploader(event) {
  // 在props.files里插入临时数据
  files.value.push({
    file_name: event.target.files[0].name,
    file_type: 'loading',
    file_size: formatSize(event.target.files[0].size),
  })

  const formData = new FormData()
  formData.append('tid', props.tid)
  formData.append('file', event.target.files[0])

  const { data: res } = await http.post('/file/upload', formData)
  if (res.code === 200) {
    ElMessage.success('上传成功')
    uploadInput.value.value = null

    files.value[files.value.length - 1] = res.data
  }
  else {
    files.value.pop()
    ElMessage.error('上传失败')
  }
}

function initInput(visible) {
  if (visible)
    uploadInput.value.value = null
}

const seletFiles = ref([])
const fileMoveRef = ref(null)

function handleSelectionChange(selection) {
  seletFiles.value = selection
}

// 获取当前任务关联的文件
async function getFiles() {
  const { data: res } = await http.post('/file/list', {
    tid: props.tid,
  })
  if (res.code === 200)
    files.value = res.data
}

watch(() => props.tid, () => {
  getFiles()
})

onMounted(() => {
  if (props.tid)
    getFiles()
})

// 删除文件
function deleteFiles() {
  ElMessageBox.confirm(
    `如果这些文件包含评论或版本，这些评论或版本也将会删除。`,
    `确定删除 ${seletFiles.value.length} 个文件吗？`,
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      // type: 'warning',
    },
  )
    .then(async () => {
      const { data: res } = await http.post('/file/delete', {
        fids: seletFiles.value.map(item => item.fid),
      })
      if (res.code === 200) {
        getFiles()
        ElMessage.success('删除成功')
      }
    })
    .catch(() => {
    })
}
</script>

<template>
  <div class="space-y-2 files-wrapper">
    <el-table
      v-if="files.length" ref="filesTableRef" :data="files" :show-header="false" class="border-none"
      :max-height="300" @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="45" />
      <el-table-column prop="file_name" label="文件名">
        <template #default="scope">
          <div class="flex items-center space-x-2 group">
            <FilePreview class="shrink-0" :file="scope.row" />
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
      <el-table-column prop="created_at" label="日期" width="150">
        <template #default="scope">
          {{ formatDate(scope.row.created_at) }}
        </template>
      </el-table-column>
    </el-table>
    <div class="flex items-center justify-between">
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
      <div v-if="seletFiles.length" class="flex items-center">
        <el-button type="primary" text class="px-1" @click="fileMoveRef.open()">
          <div class="flex items-center space-x-1">
            <span class="icon-[lucide--copy]" />
            <span>移动/复制</span>
          </div>
        </el-button>
        <!-- <el-button type="primary" text class="px-1" @click="downloadFile">
          <div class="flex items-center space-x-1">
            <span class="icon-[lucide--download]" />
            <span>下载</span>
          </div>
        </el-button> -->
        <el-button type="primary" text class="px-1 !text-red-500" @click="deleteFiles">
          <div class="flex items-center space-x-1">
            <span class="icon-[lucide--trash]" />
            <span>删除</span>
          </div>
        </el-button>
      </div>
    </div>
    <FileMove ref="fileMoveRef" :files="seletFiles" @update:files="getFiles" />

    <input ref="uploadInput" accept="*/*" type="file" class="hidden" @change="uploader">
  </div>
</template>
