<script setup>
import Uploader from './components/uploader.vue'
import FileList from './components/fileList.vue'

const form = reactive({
  key: '',
})

const fileListRef = ref(null)

function addFolder() {
  fileListRef.value.addFolder()
}
</script>

<template>
  <div class="px-4">
    <div class="flex items-center justify-between h-10">
      <div class="flex items-baseline space-x-3">
        <Uploader @uploaded="fileListRef.getDataList()" />
        <el-button text bg @click="addFolder">
          <div class="space-x-2 flex items-center">
            <span class="icon-[lucide--folder-plus]" />
            <span>新建文件夹</span>
          </div>
        </el-button>
      </div>
      <div>
        <el-input v-model="form.key" placeholder="搜索我的文件" clearable class="w-80">
          <template #prefix>
            <span class="icon-[lucide--search] text-gray-500" />
          </template>
        </el-input>
      </div>
    </div>

    <div class="flex items-center h-10 ">
      <el-button link type="primary" class="text-xs">
        返回上一级
      </el-button>
      <el-divider direction="vertical" />
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }" class="text-xs">
          全部文件
        </el-breadcrumb-item>
        <el-breadcrumb-item class="text-xs">
          <a href="/">文件目录</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 文件列表 -->
    <FileList ref="fileListRef" />
  </div>
</template>
