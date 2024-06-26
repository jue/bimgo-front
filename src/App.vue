<script setup>
import Toast from 'primevue/toast'
import DynamicDialog from 'primevue/dynamicdialog'
import ConfirmDialog from 'primevue/confirmdialog'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const locale = ref(zhCn)
</script>

<template>
  <Toast position="bottom-right" />
  <ConfirmDialog />
  <DynamicDialog />

  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>
