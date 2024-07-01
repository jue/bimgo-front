<script setup>
import { useDialog } from 'primevue/usedialog'

const dialog = useDialog()
const Invitation = defineAsyncComponent(() => import('@/components/user/Invitation.vue'))

const { sideWidth, sideCollapsed } = storeToRefs(useSettingsStore())
const { changeSideCollapsed } = useSettingsStore()
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

function handleInvitation() {
  dialog.open(Invitation, {
    props: {
      header: '邀请人员加入',
      modal: true,
    },
  })
}
</script>

<template>
  <div
    class="shrink-0 flex flex-col h-screen]"
    :style="{ width: `${sideWidth}px`, transition: 'width 0.2s' }"
  >
    <template v-if="!sideCollapsed">
      <div class="h-14 flex items-center px-2 justify-between shrink-0 bg-white box-shadow-bottom">
        <router-link to="/" class="flex items-center space-x-2">
          <Logo class="w-12" />
        </router-link>
        <span v-tooltip.bottom="'收起侧边栏'" class="icon-[lucide--panel-left-close] text-neutral-400 text-xl cursor-pointer" @click="changeSideCollapsed()" />
      </div>
      <div class="app-container">
        <div class="app-body">
          <div class="px-4 space-y-1 py-4">
            <SearchButton class="mb-5" />
            <div
              class="flex items-center space-x-2 text-neutral-700 cursor-pointer h-8 px-2 rounded-lg hover:text-neutral-900 hover:bg-neutral-500/10"
            >
              <span class="icon-[lucide--bell]" />
              <div>收件箱</div>
            </div>
            <div
              class="flex items-center space-x-2 text-neutral-700 cursor-pointer h-8 px-2 rounded-lg hover:text-neutral-900 hover:bg-neutral-500/10"
            >
              <span class="icon-[lucide--check-circle]" />
              <div>已分配给我的</div>
            </div>
          </div>
          <div v-for="(cate, index) in menus" :key="index" class="px-4 space-y-[8px] py-3">
            <div class="flex items-center text-neutral-400 px-3 h-6 mb-2 text-xs">
              {{ cate.label }}
            </div>
            <div class="space-y-1">
              <RouterLink v-for="menu in cate.children" :key="menu.path" :to="menu.path" class="block">
                <div
                  class="flex items-center space-x-2 text-neutral-700 cursor-pointer h-8 px-3 rounded-lg hover:text-neutral-900 hover:bg-neutral-500/10"
                  :class="{ 'bg-neutral-500/10': route.fullPath.startsWith(menu.path) }"
                >
                  <Icon :name="menu.icon" :size="16" />
                  <div>{{ menu.name }}</div>
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="h-14 flex items-center px-4">
          <Button class="w-full text-xs" severity="contrast" @click="handleInvitation">
            <span class="icon-[lucide--user-round-plus] mr-1" />
            邀请新的使用者
          </Button>
        </div>
      </div>
    </template>
  </div>
</template>
