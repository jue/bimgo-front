<script setup>
const invitationRef = ref(null)
function openInvitation() {
  invitationRef.value.open()
}
</script>

<template>
  <el-dropdown trigger="click">
    <Avatar>
      <AvatarImage src="/logo.svg" alt="@radix-vue" />
      <AvatarFallback>向南</AvatarFallback>
    </Avatar>
    <template #dropdown>
      <el-dropdown-menu>
        <UserInvitation class="w-full">
          <template #default="{ toggleDialog }">
            <el-dropdown-item @click="toggleDialog">
              <span class="icon-[lucide--user-plus] mr-2" />
              <span>邀请用户</span>
            </el-dropdown-item>
          </template>
        </UserInvitation>
        <el-dropdown-item divided>
          <span class="icon-[lucide--user] mr-2" />
          <span>我的信息</span>
        </el-dropdown-item>
        <el-dropdown-item>
          <span class="icon-[lucide--settings] mr-2" />
          <span>设置</span>
        </el-dropdown-item>
        <el-dropdown-item>
          <span class="icon-[lucide--log-out] mr-2" />
          <span>退出登陆</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <!-- <UserInvitation ref="invitationRef" /> -->
</template>
