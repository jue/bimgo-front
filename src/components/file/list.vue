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
  <div class="grid grid-cols-2 gap-2">
    <FileItem v-for="(file, index) in files" :key="index" :file="file" @deleted="deletedFile(file)" />
  </div>
</template>
