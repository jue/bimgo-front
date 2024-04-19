<script setup>
import dayjs from 'dayjs'
import More from './more.vue'
import { formatSize } from '@/lib/utils.js'

const emit = defineEmits(['update:selection'])

const route = useRoute()
const router = useRouter()

const dir_id = ref(route.query.dir_id || '')
const loading = ref(false)
const multipleTableRef = ref(null)

const dataList = ref([])
const inputRef = ref(null)
const input = ref('')
async function getDataList() {
  loading.value = true
  const { data: res } = await http.post('/uffile/file_list', {
    dir_id: dir_id.value,
    key: route.query.key || '',
  })
  if (res.code === 200)
    dataList.value = res.data

  loading.value = false
}

onMounted(() => {
  getDataList()
})

function clearEdit() {
  dataList.value.map((item) => {
    delete item.edit
  })
}

// 添加文件夹
function addFolder() {
  if (!dataList.value.some(item => item.edit === 'create_folder')) {
    dataList.value.unshift({
      file_type: 'folder',
      file_size: 0,
      edit: 'create_folder',
    })

    nextTick(() => {
      inputRef.value.focus()
    })
  }
}

// 取消新建文件夹
function cancelAddFolder(row, index) {
  if (row.edit === 'create_folder')
    dataList.value.splice(index, 1)

  if (row.edit === 'edit_file_name' || row.edit === 'edit_folder_name')
    delete row.edit

  input.value = ''
}

async function submitName(row) {
  if (!input.value)
    return false

  // 创建文件夹
  if (row.edit === 'create_folder') {
    const { data: res } = await http.post('/uffile/folder/create', {
      dir_name: input.value,
      parent_dir_id: dir_id.value,
    })

    if (res.code === 200) {
      row.dir_name = res.data.dir_name
      row.dir_id = res.data.dir_id
      row.updated_at = res.data.updated_at

      input.value = ''
      clearEdit()
    }
  }

  if (row.edit === 'edit_folder_name') {
    const { data: res } = await http.post('/uffile/folder/rename', {
      dir_id: row.dir_id,
      dir_name: input.value,
    })

    if (res.code === 200) {
      row.dir_name = input.value
      input.value = ''
      clearEdit()
    }
  }

  if (row.edit === 'edit_file_name') {
    const { data: res } = await http.post('/uffile/file/rename', {
      file_id: row.file_id,
      file_name: input.value,
    })

    if (res.code === 200) {
      row.file_name = input.value
      input.value = ''
      clearEdit()
    }
  }
}

function handleClickFile(row) {
  if (row?.edit)
    return false

  // 如果是文件夹，进入文件夹
  if (row.dir_name) {
    router.replace({
      query: {
        dir_id: row.dir_id,
      },
    })
  }
}

defineExpose({
  addFolder,
  getDataList,
  handleDelete,
})

// 监听路由
watch(() => route.query.dir_id, () => {
  dir_id.value = route.query.dir_id
  getDataList()
}, { deep: true })

// 操作重命名
function handleRename(row) {
  clearEdit()

  row.edit = row.file_name ? 'edit_file_name' : 'edit_folder_name'
  input.value = row.dir_name || row.file_name
  nextTick(() => {
    inputRef.value.focus()
  })
}

// 删除文件或文件夹
async function handleDelete(arr) {
  const dataArr = extractID(arr)

  ElMessageBox.confirm(
    `确定删除所选的文件吗?`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    },
  )
    .then(async () => {
      const { data: res } = await http.post('/uffile/delete', dataArr)
      if (res.code === 200) {
        ElMessage.success('删除成功')

        dataArr.dir_ids.forEach((id) => {
          const index = dataList.value.findIndex(item => item.dir_id === id)
          dataList.value.splice(index, 1)
        })

        dataArr.file_ids.forEach((id) => {
          const index = dataList.value.findIndex(item => item.file_id === id)
          dataList.value.splice(index, 1)
        })
      }
    })
    .catch(() => {
    })
}

function handleSelectionChange(selection) {
  emit('update:selection', selection)
}
</script>

<template>
  <el-table ref="multipleTableRef" v-loading="loading" :data="dataList" fixed empty-text="当前列表为空" @selection-change="handleSelectionChange">
    <el-table-column type="selection" />
    <el-table-column prop="file_name" label="文件名" min-width="300" show-overflow-tooltip>
      <template #default="scope">
        <div class="flex items-center w-full space-x-3" @click="handleClickFile(scope.row)">
          <FileIcon
            :type="scope.row?.file_type || 'folder'"
            class="h-8 shrink-0 cursor-pointer !p-1 bg-transparent"
          />
          <div class="flex-1 whitespace-nowrap overflow-hidden text-ellipsis hover:text-blue-500 cursor-pointer" :title="scope.row?.dir_name || scope.row?.file_name">
            <div v-if="scope.row?.edit === 'create_folder' || scope.row?.edit === 'edit_file_name' || scope.row?.edit === 'edit_folder_name'" class="flex items-center space-x-2" @click.stop>
              <el-input ref="inputRef" v-model="input" size="small" class="w-1/2" placeholder="请输入" @keyup.enter="submitName(scope.row)" />
              <el-button class="w-6 h-6" type="primary" size="small" @click.stop="submitName(scope.row)">
                <span class="icon-[lucide--check]" />
              </el-button>
              <el-button class="w-6 h-6" type="primary" size="small" @click.stop="cancelAddFolder(scope.row, scope.$index)">
                <span class="icon-[lucide--x]" />
              </el-button>
            </div>
            <template v-else>
              {{ scope.row?.dir_name || scope.row?.file_name }}
            </template>
          </div>
          <div v-if="!scope.row?.edit" class="operation shrink-0 hidden">
            <el-button text class="w-6 h-6 p-0" title="下载">
              <span class="icon-[lucide--download] text-blue-600" />
            </el-button>
            <el-button text class="w-6 h-6 p-0" title="删除" @click.stop="handleDelete([scope.row])">
              <span class="icon-[lucide--trash-2] text-blue-600" />
            </el-button>
            <el-button text class="w-6 h-6 p-0" title="重命名" @click.stop="handleRename(scope.row)">
              <span class="icon-[lucide--text-cursor-input] text-blue-600" />
            </el-button>
            <el-button text class="w-6 h-6 p-0" title="移动">
              <span class="icon-[lucide--move] text-blue-600" />
            </el-button>
          </div>
        </div>

        <!-- <div class="flex items-center cursor-pointer text-gray-500 relative w-full hidden" @click="handleClickFile(scope.row)">
          <div class="flex items-center space-x-3 flex-1 w-full relative z-10">
            <FileIcon
              :type="scope.row?.file_type || 'folder'"
              class="h-8 shrink-0 cursor-pointer !p-1 bg-transparent"
            />

            <div v-if="scope.row?.edit === 'create_folder' || scope.row?.edit === 'edit_file_name' || scope.row?.edit === 'edit_folder_name'" class="flex items-center space-x-2" @click.stop>
              <el-input ref="inputRef" v-model="input" size="small" @keyup.enter="submitName(scope.row)" />
              <el-button class="w-6 h-6" type="primary" size="small" @click.stop="submitName(scope.row)">
                <span class="icon-[lucide--check]" />
              </el-button>
              <el-button class="w-6 h-6" type="primary" size="small" @click.stop="cancelAddFolder(scope.row, scope.$index)">
                <span class="icon-[lucide--x]" />
              </el-button>
            </div>

            <div v-else class="flex-1 shrink-0 whitespace-nowrap overflow-hidden text-ellipsis hover:text-blue-500" :title="scope.row?.dir_name || scope.row?.file_name">
              {{ scope.row?.dir_name || scope.row?.file_name }}
            </div>
          </div>

          <div class="operation items-center bg-[#f5f7fa] z-20 flex px-3 space-x-2" @click.stop>
            <el-button text class="w-6 h-6 p-0">
              <span class="icon-[lucide--download] text-blue-600" />
            </el-button>
            <el-button text class="w-6 h-6 p-0" @click.stop="handleDelete([scope.row])">
              <span class="icon-[lucide--trash-2] text-blue-600" />
            </el-button>
            <el-button text class="w-6 h-6 p-0" title="重命名" @click.stop="handleRename(scope.row)">
              <span class="icon-[lucide--text-cursor-input] text-blue-600" />
            </el-button>
            <el-button text class="w-6 h-6 p-0">
              <span class="icon-[lucide--move] text-blue-600" />
            </el-button>
          </div>
        </div> -->
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
</template>

<style lang="scss" scoped>
:deep(){
  .el-table__row {
    &:hover {
      .operation {
        @apply flex;
      }
    }
  }
  .cell {
    @apply h-full flex items-center;
  }
}
</style>
