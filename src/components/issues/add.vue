<script setup>
const emit = defineEmits(['refresh'])
const title = ref('')
const input = ref(null)
const placeholder = ref('添加新问题')

function inputFocus() {
  placeholder.value = '请输入问题，键入#选择相应的任务'
}
async function addIssue() {
  if (!title.value)
    return

  const { data: res } = await http.post('/issue/add', { title: title.value })
  if (res.code === 200) {
    emit('refresh', res.data)
    title.value = ''
    input.value.blur()
  }
}
</script>

<template>
  <div class="flex text-[#656d76] py-[2px] border-b pr-0.5">
    <div class="w-16 flex justify-end" />
    <div class="flex-1">
      <el-input
        ref="input" v-model="title" :placeholder="placeholder" clearable class="h-10"
        @focus="inputFocus"
        @blur="placeholder = '添加新问题'"
        @keyup.enter="addIssue"
      >
        <template #prefix>
          <span class="icon-[lucide--plus]" />
        </template>
      </el-input>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(){
  .el-input__wrapper {
    @apply rounded-none shadow-none;
    &.is-focus {
      @apply ring ring-2 ring-blue-500;
    }
  }
}
</style>
