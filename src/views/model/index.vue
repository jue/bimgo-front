<script setup>
import Side from './components/side.vue'
</script>

<template>
  <div class="app-container relative border-y">
    <div class="flex h-full">
      <Side />
      <Bim />
    </div>
  </div>
</template>

<route>
  {
    meta: {
      title: '模型预览',
    },
  }
</route>
