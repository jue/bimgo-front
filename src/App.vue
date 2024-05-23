<script setup>
import Toast from 'primevue/toast'
import DynamicDialog from 'primevue/dynamicdialog'
import ConfirmDialog from 'primevue/confirmdialog'
</script>

<template>
  <Toast position="bottom-right" />
  <ConfirmDialog />
  <DynamicDialog />

  <RouterView />
</template>
