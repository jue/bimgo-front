<script setup>
defineProps({
  team: {
    type: Object,
    required: true,
  },
})
const { getContractors } = useSettingsStore()
const contractorsAddRef = ref(null)
const show = ref(false)

function visibleChange(visible) {
  show.value = visible
}

function editContractor(data = null) {
  contractorsAddRef.value.open(data)
}

function deleteContractor(data) {
  ElMessageBox.confirm(
    `确定删除 ${data.contractor_name} 吗？`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    },
  )
    .then(async () => {
      const { data: res } = await http.post('/contractor/delete', {
        contractor_id: data.contractor_id,
      })
      if (res.code === 200) {
        getContractors()
        ElMessage.success('删除成功')
      }
    })
    .catch(() => {
    })
}

function refreshPage() {
  console.log('refreshPage')
  // router.replace(router.currentRoute.value.fullPath)
}
</script>

<template>
  <div class="opacity-0 group-hover:opacity-100 flex items-center" :class="{ 'opacity-100': show }">
    <el-dropdown trigger="click" @visible-change="visibleChange">
      <span class="icon-[lucide--more-vertical]" @click.stop />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="editContractor(team)">
            <span class="icon-[lucide--edit] mr-2" /> 编辑
          </el-dropdown-item>
          <el-dropdown-item @click="deleteContractor(team)">
            <div class="flex items-center text-red-500">
              <span class="icon-[lucide--trash] mr-2" /> 删除
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <ContractorsAdd ref="contractorsAddRef" @refresh="refreshPage" />
  </div>
</template>
