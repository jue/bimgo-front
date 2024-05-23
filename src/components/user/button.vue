<script setup>
const { user } = useUserStore()
const router = useRouter()

function logout() {
  ElMessageBox.confirm(
    '确定退出登陆吗？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    },
  ).then(async () => {
    await useUserStore().logout()
    router.push({ path: '/login' })
  }).catch(() => {

  })
}
</script>

<template>
  <np-dropdown class="block w-full">
    <div class="flex items-center justify-between space-x-1 w-full px-2">
      <!-- <UserAvatar :uid="user?.uid" :size="32" /> -->
      <User :uid="user?.uid" :size="32" />
      <span class="icon-[lucide--chevrons-up-down]" />
    </div>
    <template #menu>
      <UserInvitation class="w-full">
        <template #default="{ toggleDialog }">
          <np-dropdown-item label="邀请用户" icon="icon-[lucide--user-plus]" @click.stop="toggleDialog" />
        </template>
      </UserInvitation>
      <!-- <np-dropdown-item label="邀请用户" icon="icon-[lucide--user-plus]" /> -->
      <np-dropdown-item label="我的信息" icon="icon-[lucide--user]" divider />
      <np-dropdown-item label="设置" icon="icon-[lucide--settings]" />
      <np-dropdown-item label="退出登陆" icon="icon-[lucide--log-out]" danger @click="logout()" />
    </template>
  </np-dropdown>
</template>
