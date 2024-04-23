<script setup>
const emit = defineEmits(['close'])
const show = ref(false)
function open() {
  show.value = true
}

defineExpose({ open })

function close() {
  emit('close')
  show.value = false
}
</script>

<template>
  <div class="inline-flex">
    <el-button type="primary" @click="open">
      <div class="flex items-center space-x-1">
        <span class="icon-[lucide--plus]" />
        <span>创建问题</span>
      </div>
    </el-button>
    <el-dialog v-model="show" title="" width="auto" class="w-11/12 max-w-[1360px] !p-0 !top-auto" :show-close="false" append-to-body z-index="100" destroy-on-close>
      <IssuesView @close="close" />
    </el-dialog>
  </div>
</template>
