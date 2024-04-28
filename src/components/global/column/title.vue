<script setup>
defineProps({
  placeholder: {
    type: String,
    default: '请输入',
  },
})
const value = defineModel()
</script>

<template>
  <InputText v-model="value" type="text" class="w-full" :placeholder />
</template>
