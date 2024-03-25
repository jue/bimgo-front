<script setup>
const { changeSideCollapsed } = useSettingsStore()
const { sideCollapsed } = storeToRefs(useSettingsStore())
</script>

<template>
  <div class="flex items-center justify-between h-14 px-5">
    <div class="flex items-center space-x-4">
      <Logo v-if="sideCollapsed" class="w-12" />
      <el-tooltip :content="sideCollapsed ? '展开侧边栏' : '收起侧边栏'" placement="right" hide-after="0" :show-arrow="false">
        <el-button text class="w-8 h-8" @click="changeSideCollapsed()">
          <span
            :class="{ '!icon-[lucide--panel-left-open]': sideCollapsed }"
            class="icon-[lucide--panel-left-close] text-xl opacity-80 hover:opacity-100"
          />
        </el-button>
      </el-tooltip>
    </div>
    <div>
      <UserButton />
    </div>
  </div>
</template>
