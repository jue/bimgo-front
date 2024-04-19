<script setup>
import Breadcrumb from './breadcrumb.vue'

const props = defineProps({
  selections: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['moved'])

const route = useRoute()

const show = ref(false)
const dir_id = ref('')

const folderDataList = ref([])
const lastFolders = ref(false)

function open() {
  show.value = true
  dir_id.value = ''
  getFolderDataList()
}

async function getFolderDataList() {
  const { data: res } = await http.post('/uffile/folder_list', {
    dir_id: dir_id.value,
  })

  if (res.code === 200) {
    lastFolders.value = !res.data.length
    const selections = props.selections.map(item => item.dir_id)
    const resDatas = res.data

    const filteredResDatas = resDatas.filter(item => !selections.includes(item.dir_id))

    folderDataList.value = filteredResDatas
  }
}

function handleClickFolder(id) {
  dir_id.value = id
}

defineExpose({ open })

watch(() => dir_id.value, () => {
  getFolderDataList()
})

async function handleMove() {
  const { data: res } = await http.post('/uffile/move', {
    dir_id: dir_id.value,
    ...extractID(props.selections),
  })

  if (res.code === 200) {
    ElMessage.success('移动成功')
    show.value = false
    emit('moved')
  }
}
</script>

<template>
  <el-dialog v-model="show" title="" width="650px" destroy-on-close :show-close="false">
    <div class="flex flex-col h-96">
      <div class="flex items-center justify-between h-12 -mt-6 shrink-0">
        <span class="font-medium">移动到</span>
        <el-button text class="w-6 h-6 p-0 rounded-full" @click="show = false">
          <span class="icon-[lucide--x]" />
        </el-button>
      </div>
      <div class="h-10 bg-gray-100 -mx-6 px-6 shrink-0">
        <Breadcrumb :dir-id="dir_id" @update:dir-id="dir_id = $event" />
      </div>
      <div class="-mx-6 overflow-y-auto py-1 h-full">
        <template v-for="folder in folderDataList" :key="folder.dir_id">
          <div class="flex items-center h-[50px] hover:bg-gray-100 px-6 cursor-pointer space-x-2" @click="handleClickFolder(folder.dir_id)">
            <FileIcon
              type="folder"
              class="h-8 shrink-0 cursor-pointer !p-1 bg-transparent"
            />
            <div class="flex-1 whitespace-nowrap overflow-hidden text-ellipsis hover:text-blue-500">
              {{ folder.dir_name }}
            </div>
          </div>
        </template>

        <div v-if="lastFolders" class="h-full flex flex-col items-center justify-center">
          <FileIcon
            type="folder"
            class="h-[90px] w-[90px] shrink-0 cursor-pointer !p-1 bg-transparent"
          />
          <div class="text-gray-400">
            移动到此文件夹
          </div>
        </div>

        <div v-if="folderDataList.length === 0" class="h-full flex flex-col items-center justify-center">
          <span class="icon-[lucide--folder-x] h-[90px] w-[90px] text-gray-400" />
          <div class="text-gray-400">
            没有可被移动的目标文件珍
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer space-x-5">
        <el-button text bg class="rounded-full" @click="show = false">取消</el-button>
        <el-button type="primary" class="rounded-full" :disabled="dir_id === (route.query.dir_id || '') ?? !lastFolders" @click="handleMove"> 移动到此 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
