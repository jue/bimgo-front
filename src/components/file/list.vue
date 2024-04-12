<script setup>
const props = defineProps({
  files: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="grid grid-cols-2 gap-2">
    <FileItem v-for="(file, index) in files" :key="index" :file="file" />
  </div>
</template>
