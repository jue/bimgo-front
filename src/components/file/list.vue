<script setup>
const props = defineProps({
  files: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['deleted'])

function deletedFile(file) {
  // props.files.splice(props.files.indexOf(file), 1)
  emit('deleted', file)
}
</script>

<template>
  <div v-if="files.length" class="grid grid-cols-2 gap-2">
    <FileItem v-for="(file, index) in files" :key="index" :file="file" @deleted="deletedFile(file)" />
  </div>
  <div v-else class="flex items-center justify-center h-10 border border-dashed rounded">
    <span class="text-gray-400">没有附件</span>
  </div>
</template>
