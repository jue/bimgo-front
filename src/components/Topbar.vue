<script setup>
const { changeSideCollapsed } = useSettingsStore()
const { sideCollapsed } = storeToRefs(useSettingsStore())
</script>

<template>
  <div class="flex items-center justify-between h-14 px-5">
    <div>
      <el-tooltip :content="sideCollapsed ? '展开侧边栏' : '收起侧边栏'" placement="right" :hide-after="0">
        <el-button text class="w-8 h-8" @click="changeSideCollapsed()">
          <span :class="{ '!icon-[lucide--menu]': sideCollapsed }" class="icon-[lucide--chevron-left] text-xl opacity-80 hover:opacity-100" />
        </el-button>
      </el-tooltip>
    </div>
    <div>
      <User />
    </div>
  </div>
</template>
