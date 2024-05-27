<script setup>
const value = ref([])
</script>

<template>
  <Button
    outlined
    class="shrink-0 space-x-2 h-7"
    severity="secondary"
    plain
    :pt="{
      root: {
        class: ['text-stone-800'],
      },
    }"
  >
    <span class="icon-[lucide--filter]" />
    <span>筛选</span>
    <span>{{ value.length }}个条件</span>
  </Button>
</template>
