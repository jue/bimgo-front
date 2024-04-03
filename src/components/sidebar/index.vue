<script setup>
const { sideWidth, sideCollapsed } = storeToRefs(useSettingsStore())
const route = useRoute()
const menus = ref([
  {
    label: '功能',
    children: [
      {
        icon: 'layout-dashboard',
        name: '控制面板',
        path: '/dashborad',
      },
      {
        icon: 'torus',
        name: '模型预览',
        path: '/model',
      },
      {
        icon: 'list-todo',
        name: '工程进度',
        path: '/task',
      },
      {
        icon: 'bug',
        name: '问题处理',
        path: '/issue',
      },
      {
        icon: 'file-spreadsheet',
        name: '工程报告',
        path: '/report',
      },
      {
        icon: 'file-box',
        name: '文档管理',
        path: '/file',
      },
    ],
  },
  {
    label: '人员单位',
    children: [
      {
        icon: 'users',
        name: '人员管理',
        path: '/contractors',
      },
    ],
  },

])
</script>

<template>
  <div
    class="shrink-0 flex flex-col h-screen bg-[#181f38]"
    :style="{ width: `${sideWidth}px`, transition: 'width 0.2s' }"
  >
    <div class="h-14 flex items-center justify-between px-2">
      <Logo class="w-12 fill-white" />
      <UserButton v-if="!sideCollapsed" />
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
        <!-- <div class="px-2 space-y-[1px] py-2">
          <div class="flex items-center text-neutral-300 px-2 h-6 mb-2 text-xs">
            收藏
          </div>
          <div
            class="flex items-center space-x-2 text-neutral-50 cursor-pointer h-8 px-2 rounded-lg hover:text-white hover:bg-[#323f5e]"
          >
            <span class="icon-[lucide--star]" />
            <div>收藏内容</div>
          </div>
        </div> -->

        <div v-for="(cate, index) in menus" :key="index" class="px-2 space-y-[8px] py-2">
          <div class="flex items-center text-neutral-300 px-2 h-6 mb-2 text-xs">
            {{ cate.label }}
          </div>
          <div class="space-y-1">
            <RouterLink v-for="menu in cate.children" :key="menu.path" :to="menu.path" class="block">
              <div
                class="flex items-center space-x-2 text-neutral-50 cursor-pointer h-8 px-2 rounded-lg hover:text-white hover:bg-[#323f5e]"
                :class="{ 'text-white bg-[#323f5e]': route.fullPath.startsWith(menu.path) }"
              >
                <Icon :name="menu.icon" :size="16" />
                <div>{{ menu.name }}</div>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </el-scrollbar>
    <div v-if="!sideCollapsed" class="p-2 border-t border-t-[#323f5e]">
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
