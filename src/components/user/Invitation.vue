<script setup>
const visible = ref(false)
function open() {
  visible.value = true
}

defineExpose({ open })
</script>

<template>
  <el-dialog v-model="visible" title="邀请人员加入JUE">
    <span>
      It should be noted that the content will not be aligned in center by
      default
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">Cancel</el-button>
        <el-button type="primary" @click="visible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
