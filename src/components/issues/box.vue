<script setup>
const drawerVisible = ref(false)
const issuesDetailRef = ref(null)
function open(data) {
  drawerVisible.value = true
  nextTick(() => {
    issuesDetailRef.value.getTaskDetail(data.iid)
  })
}

defineExpose({
  open,
})
</script>

<template>
  <el-drawer
    v-model="drawerVisible" title="用户信息" :with-header="false" :modal="true" :append-to-body="true" size="950"
    custom-class="np-drawer"
  >
    <div class="flex flex-col h-full">
      <div class="flex items-center justify-between h-14 border-b px-4">
        <div>
          问题
        </div>
        <div>
          <el-tooltip content="关闭">
            <el-button text class="w-8 h-8" @click="drawerVisible = false">
              <span class="icon-[lucide--x]" />
            </el-button>
          </el-tooltip>
        </div>
      </div>
      <IssuesDetail ref="issuesDetailRef" />
    </div>
  </el-drawer>
</template>
