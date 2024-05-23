<script setup>
import { useConfirm } from 'primevue/useconfirm'
import Menu from 'primevue/menu'
import ConfirmDialog from 'primevue/confirmdialog'

import { useDialog } from 'primevue/usedialog'

const dialog = useDialog()

const { user } = useUserStore()
const router = useRouter()
const confirm = useConfirm()

const Invitation = defineAsyncComponent(() => import('@/components/user/Invitation.vue'))

const items = ref([
  {
    label: '邀请用户',
    value: 'invite',
    icon: 'icon-[lucide--user-plus]',
    command: () => {
      dialog.open(Invitation, {
        props: {
          header: '邀请人员加入',
          modal: true,
        },
      })
    },
  },
  {
    divider: true,
    label: '我的信息',
    icon: 'icon-[lucide--user]',
  },
  {
    label: '设置',
    icon: 'icon-[lucide--settings]',
  },
  {
    label: '退出',
    danger: true,
    icon: 'icon-[lucide--log-out]',
    command: () => {
      confirm.require({
        group: 'headless',
        message: '确定退出登陆吗？',
        header: '提示',
        accept: async () => {
          await useUserStore().logout()
          router.push({ path: '/login' })
        },
        reject: () => {
        },
      })
    },
  },
])
const menuRef = ref(null)
function toggle(event) {
  menuRef.value.toggle(event)
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between space-x-1 w-full cursor-pointer" @click="toggle">
      <UserAvatar :uid="user?.uid" :size="32" />
      <span class="icon-[lucide--chevrons-up-down]" />
    </div>
    <Menu ref="menuRef" :model="items" :popup="true">
      <template #item="{ item }">
        <np-menu-item :label="item.label" :icon="item.icon" :divider="item.divider" :danger="item.danger" />
      </template>
    </Menu>
  </div>

  <ConfirmDialog group="headless" class="!w-80">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="flex flex-col text-center items-center p-5 bg-white rounded-md ">
        <div class="w-10 h-10 border flex items-center justify-center rounded-full">
          <i class="icon-[lucide--user] " />
        </div>
        <!-- <span class="font-bold text-2xl block mb-2">{{ message.header }}</span> -->
        <p class="my-3 text-base">
          {{ message.message }}
        </p>
        <div class="flex justify-center gap-2 mt-4 space-x-5">
          <Button label="取消" outlined @click="rejectCallback" />
          <Button label="确定" @click="acceptCallback" />
        </div>
      </div>
    </template>
  </ConfirmDialog>
</template>
