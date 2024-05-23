<script setup>
const visible = ref(false)
const { copy, copied } = useClipboard()

// const projectName = useSettingsStore().project.name
// const api_url = useSettingsStore().project.api_url

const userStore = useUserStore()

const url = ref(`${location.origin}/invitation/${userStore.user.uid}`)
const source = ref(`点击链接一起加入BIMGO ${url.value}`)
</script>

<template>
  <div class="space-y-3 py-5">
    <div class="w-40 mx-auto">
      <Qrcode :text="url" class="mx-auto block text-center" size="160" />
    </div>
    <div class="text-center">
      <Button text plain severity="secondary" class="!ring-0" @click="copy(source)">
        <template v-if="copied">
          <span class="icon-[lucide--clipboard-check]" />复制成功
        </template>
        <span v-else>复制邀请链接，分享给微信好友</span>
      </Button>
    </div>
  </div>
</template>
