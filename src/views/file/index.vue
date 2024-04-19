<script setup>
import Uploader from './components/uploader.vue'
import FileList from './components/fileList.vue'
import Breadcrumb from './components/breadcrumb.vue'
import FolderDialog from './components/folderDialog.vue'

const route = useRoute()
const router = useRouter()

const key = ref('')

const fileListRef = ref(null)
const selections = ref([])

const folderDialogRef = ref(null)

function addFolder() {
  fileListRef.value.addFolder()
}

function updateSelection(data) {
  selections.value = data
}

function openFolderDialog() {
  folderDialogRef.value.open()
}
</script>

<template>
  <div class="flex flex-col h-full px-4 py-4">
    <div class="flex items-center justify-between py-1 shrink-0">
      <div v-if="selections.length" class="flex items-center">
        <el-button-group>
          <el-button class="rounded-full" type="primary" plain @click="openFolderDialog">
            <div class="space-x-2 flex items-center">
              <span class="icon-[lucide--move]" />
              <span>移动</span>
            </div>
          </el-button>
          <el-button class="rounded-full" type="danger" plain @click="fileListRef.handleDelete(selections)">
            <div class="space-x-2 flex items-center">
              <span class="icon-[lucide--trash-2]" />
              <span>删除</span>
            </div>
          </el-button>
          <!-- <el-button class="rounded-full" type="primary" plain @click="selections = []">
            <div class="space-x-2 flex items-center">
              <span
                class="icon-[lucide--circle-x]"
              />
              <span>取消</span>
            </div>
          </el-button> -->
        </el-button-group>
      </div>
      <div v-else class="flex items-baseline space-x-3">
        <Uploader @uploaded="fileListRef.getDataList()" />
        <el-button text bg class="rounded-full" @click="addFolder">
          <div class="space-x-2 flex items-center">
            <span class="icon-[lucide--folder-plus]" />
            <span>新建文件夹</span>
          </div>
        </el-button>
      </div>
      <div>
        <el-input v-model="key" placeholder="搜索我的文件" clearable class="w-80 !rounded-full bg-[#f5f7fa]">
          <template #prefix>
            <span class="icon-[lucide--search] text-gray-500" />
          </template>
        </el-input>
      </div>
    </div>
    <Breadcrumb v-if="!key" :dir-id="route.query.dir_id" @update:dir-id="router.push({ name: 'file', query: { dir_id: $event } })" />
    <div v-else class="flex items-center h-10 shrink-0">
      <span>搜索：</span>
      <el-tag type="primary" closable disable-transitions round @close="key = ''">
        {{ key }}
      </el-tag>
    </div>
    <!-- 文件列表 -->
    <FileList ref="fileListRef" :keyword="key" @update:selection="updateSelection" />
    <FolderDialog ref="folderDialogRef" :selections="selections" @moved="fileListRef.getDataList()" />
  </div>
</template>

<style scoped lang="scss">
:deep(){
  .el-input__wrapper {
    @apply bg-transparent text-gray-500 shadow-none;
  }
}
</style>
