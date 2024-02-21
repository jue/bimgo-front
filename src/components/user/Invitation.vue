<script setup>
const visible = ref(false)
const url = ref('')
const source = ref('')
const { copy, copied } = useClipboard({ source })

const projectName = useSettingsStore().project.name
const api_url = useSettingsStore().project.api_url

function toggleDialog() {
  visible.value = !visible.value
}

defineExpose({ open: toggleDialog })

const userStore = useUserStore()

onMounted(() => {
  url.value = `${location.origin}/invitation/${userStore.user.uid}`
  source.value = `点击链接一起加入BIMGO ${url.value}`
})
</script>

<template>
  <div class="inline-block">
    <slot :toggle-dialog="toggleDialog">
      <el-button type="primary" text class="ml-2" @click="toggleDialog">
        <span class="icon-[lucide--user-round-plus] mr-1" />
        邀请新的使用者
      </el-button>
    </slot>
    <el-dialog v-model="visible" :title="`邀请人员加入${projectName}`" append-to-body width="300px">
      <div class="space-y-3 py-5">
        <div class="w-40 mx-auto">
          <Qrcode :text="url" class="mx-auto block text-center" size="160" />
        </div>
        <div class="text-center">
          <el-button link type="primary" @click="copy(source)">
            <template v-if="copied">
              <span class="icon-[lucide--clipboard-check]" />复制成功
            </template>
            <span v-else>复制邀请链接，分享给微信好友</span>
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
