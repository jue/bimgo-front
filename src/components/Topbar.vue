<script setup>
const { changeSideCollapsed } = useSettingsStore()
const { sideCollapsed } = storeToRefs(useSettingsStore())

const route = useRoute()
</script>

<template>
  <div class="flex items-center justify-between h-16 px-5 shrink-0 shadow">
    <div class="flex items-center space-x-4">
      <!-- <Logo v-if="sideCollapsed" class="w-12" /> -->
      <el-tooltip :content="sideCollapsed ? '展开侧边栏' : '收起侧边栏'" placement="right" hide-after="0" :show-arrow="false">
        <el-button text class="w-8 h-8" @click="changeSideCollapsed()">
          <span
            :class="{ '!icon-[lucide--menu]': sideCollapsed }"
            class="icon-[lucide--panel-left-close] text-xl opacity-80 hover:opacity-100"
          />
        </el-button>
      </el-tooltip>
      <div v-if="route.meta?.title" class="text-xl font-medium">
        {{ route.meta?.title }}
      </div>
    </div>
    <div>
      <np-button class="bg-zinc-900 text-white" size="32">
        <div class="flex items-center space-x-1">
          <span class="icon-[lucide--plus]" />
          <span>创建</span>
        </div>
      </np-button>
    </div>
  </div>
</template>
