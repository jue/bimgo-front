<script setup>
import dayjs from 'dayjs'
import { formatSize } from '@/lib/utils.js'

const route = useRoute()
const dir_id = ref(route.query.dir_id || '')

const dataList = ref([])
const inputRef = ref(null)
const dir_name = ref('')
async function getDataList() {
  const { data: res } = await http.post('/uffile/file_list', {
    dir_id: dir_id.value,
    key: route.query.key || '',
  })
  if (res.code === 200)
    dataList.value = res.data
}

onMounted(() => {
  getDataList()
})

// 添加文件夹
function addFolder() {
  if (!dataList.value.some(item => item.status === 'new')) {
    dataList.value.unshift({
      file_type: 'folder',
      file_size: 0,
      status: 'new',
    })

    nextTick(() => {
      inputRef.value.focus()
    })
  }
}

// 取消新建文件夹
function cancelAddFolder(index) {
  dataList.value.splice(index, 1)
  dir_name.value = ''
}

async function createFolder(row) {
  const { data: res } = await http.post('/uffile/folder/create', {
    dir_name: dir_name.value,
    parent_dir_id: dir_id.value,
  })

  if (res.code === 200) {
    row.status = 'active'
    row.file_name = res.data.dir_name
    row.updated_at = res.data.updated_at

    dir_name.value = ''
  }
}

defineExpose({
  addFolder,
  getDataList,
})
</script>

<template>
  <div>
    <el-table :data="dataList" fixed>
      <el-table-column type="selection" />
      <el-table-column prop="file_name" label="文件名" min-width="300">
        <template #default="scope">
          <div class="flex items-center space-x-3">
            <FileIcon
              :type="scope.row?.file_type || 'folder'"
              class="h-5 shrink-0 cursor-pointer !p-0 bg-transparent"
            />

            <div v-if="scope.row?.status === 'new'" class="flex items-center space-x-2  shrink-0">
              <el-input ref="inputRef" v-model="dir_name" size="small" />
              <el-button class=" w- h-7" type="primary" size="small" @click="createFolder(scope.row)">
                <span class="icon-[lucide--check]" />
              </el-button>
              <el-button class=" w-6 h-6" type="primary" size="small" @click="cancelAddFolder(scope.$index)">
                <span class="icon-[lucide--x]" />
              </el-button>
            </div>
            <div v-else class="whitespace-nowrap text-gray-500 cursor-pointer hover:text-blue-400 text-xs">
              {{ scope.row?.dir_name || scope.row?.file_name }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="update_at" label="修改时间" sortable width="250">
        <template #default="scope">
          <span class="text-gray-500">{{ dayjs(scope.row?.updated_at).format('YYYY-MM-DD HH:mm') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="file_size" label="文件大小" sortable width="250">
        <template #default="scope">
          <span class="text-gray-500">{{ scope.row?.file_size ? formatSize(scope.row?.file_size) : '-' }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
