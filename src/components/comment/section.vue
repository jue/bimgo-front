<script setup>
const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  cate: {
    type: String,
    default: 'issue',
  },
})

const { user } = storeToRefs(useUserStore())

const textareaRef = ref(null)
const value = ref('')
const isFocus = ref(false)
</script>

<template>
  <div class="w-full flex items-start space-x-3">
    <UserAvatar :uid="user?.uid" :size="32" shape="square" />
    <div
      class="flex-1 bg-gray-100 py-2 px-3 rounded-lg outline-[3px] outline-blue-100 border border-transparent"
      :class="{ 'outline border-blue-400 bg-white': isFocus }"
    >
      <el-input
        ref="textareaRef" v-model="value" type="textarea" :autosize="{ minRows: 2 }" placeholder="尝试上传文件并添加评论…"
        @focus="isFocus = true" @blur="isFocus = false"
      />
      <div class="flex items-center justify-between">
        <np-button icon="paperclip" class="hover:bg-gray-200 opacity-60" shape="square" />
        <el-button type="primary" :disabled="!value">
          提交
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep() {
  .el-textarea__inner {
    @apply p-0 resize-none shadow-none rounded-none bg-transparent;
  }
}
</style>
