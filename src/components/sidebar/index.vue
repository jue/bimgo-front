<script setup>
const { sideWidth, sideCollapsed } = storeToRefs(useSettingsStore())
</script>

<template>
  <div
    class="shrink-0 flex flex-col h-screen bg-[#181f38]"
    :style="{ width: `${sideWidth}px`, transition: 'width 0.3s' }"
  >
    <div class="h-14 flex items-center justify-between px-2">
      <Logo class="w-12 fill-white" />
    </div>

    <el-scrollbar class="flex-1 h-full w-full">
      <div v-if="!sideCollapsed" class="divide-y divide-[#323f5e]">
        <div class="px-2 space-y-[1px] py-2">
          <SearchButton />
          <div
            class="flex items-center space-x-2 text-neutral-300 cursor-pointer h-8 px-2 rounded-lg hover:text-white hover:bg-[#323f5e]"
          >
            <span class="icon-[lucide--bell]" />
            <div>收件箱</div>
          </div>
          <div
            class="flex items-center space-x-2 text-neutral-300 cursor-pointer h-8 px-2 rounded-lg hover:text-white hover:bg-[#323f5e]"
          >
            <span class="icon-[lucide--check-circle]" />
            <div>已分配给我的</div>
          </div>
        </div>
        <div class="px-2 space-y-[1px] py-2">
          <div class="flex items-center text-neutral-300 px-2 h-6 mb-2 text-xs">
            收藏
          </div>
          <div
            class="flex items-center space-x-2 text-neutral-50 cursor-pointer h-8 px-2 rounded-lg hover:text-white hover:bg-[#323f5e]"
          >
            <span class="icon-[lucide--star]" />
            <div>收藏内容</div>
          </div>
        </div>

        <div class="px-2 space-y-[1px] py-2">
          <div class="flex items-center text-neutral-300 px-2 h-6 mb-2 text-xs">
            功能
          </div>
          <RouterLink to="/task">
            <div
              class="flex items-center space-x-2 text-neutral-50 cursor-pointer h-8 px-2 rounded-lg hover:text-white hover:bg-[#323f5e]"
            >
              <span class="icon-[lucide--list-todo]" />
              <div>工程进度</div>
            </div>
          </RouterLink>
          <RouterLink to="/issue">
            <div
              class="flex items-center space-x-2 text-neutral-50 cursor-pointer h-8 px-2 rounded-lg hover:text-white hover:bg-[#323f5e]"
            >
              <span class="icon-[lucide--circle-dot]" />
              <div>问题汇总</div>
            </div>
          </RouterLink>
          <div
            class="flex items-center space-x-2 text-neutral-50 cursor-pointer h-8 px-2 rounded-lg hover:text-white hover:bg-[#323f5e]"
          >
            <span class="icon-[lucide--file-spreadsheet]" />
            <div>工程报告</div>
          </div>
          <div
            class="flex items-center space-x-2 text-neutral-50 cursor-pointer h-8 px-2 rounded-lg hover:text-white hover:bg-[#323f5e]"
          >
            <span class="icon-[lucide--file-box]" />
            <div>文档管理</div>
          </div>
        </div>

        <div class="px-2 space-y-[1px] py-2">
          <div class="flex items-center text-neutral-300 px-2 h-6 mb-2 text-xs">
            人员管理
          </div>
          <RouterLink to="/contractors">
            <div
              class="flex items-center space-x-2 text-neutral-50 cursor-pointer h-8 px-2 rounded-lg hover:text-white hover:bg-[#323f5e]"
            >
              <span class="icon-[lucide--users]" />
              <div>
                承包单位
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </el-scrollbar>
    <div class="p-2 border-t border-t-[#323f5e]">
      <UserInvitation class="w-full">
        <template #default="{ toggleDialog }">
          <el-button class="w-full text-xs" color="#2d3a59" @click="toggleDialog">
            <span class="icon-[lucide--user-round-plus] mr-1" />
            邀请新的使用者
          </el-button>
        </template>
      </UserInvitation>
    </div>
  </div>
</template>
