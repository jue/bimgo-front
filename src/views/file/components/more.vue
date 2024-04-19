<script setup>
const show = ref(false)

function visibleChange(visible) {
  show.value = visible
}
</script>

<template>
  <div class="operation absolute -right-3 top-0 bottom-0 items-center bg-[#f5f7fa] z-20 hidden px-3 space-x-2" :class="{ flex: show }" @click.stop>
    <el-button text class="w-6 h-6 p-0">
      <span class="icon-[lucide--download] text-blue-600" />
    </el-button>
    <el-button text class="w-6 h-6 p-0">
      <span class="icon-[lucide--trash-2] text-blue-600" />
    </el-button>
    <el-button text class="w-6 h-6 p-0">
      <span class="icon-[lucide--text-cursor-input] text-blue-600" />
    </el-button>
    <el-dropdown @visible-change="visibleChange">
      <el-button text class="w-6 h-6 p-0">
        <span class="icon-[lucide--ellipsis] text-blue-600" />
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <span class="icon-[lucide--copy] mr-2" />
            <span>复制</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span class="icon-[lucide--move] mr-2" />
            <span>移动</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
