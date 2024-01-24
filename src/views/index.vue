<script setup>
const name = ref('World')
</script>

<template>
  <h1 class="text-3xl font-bold underline">
    Hello {{ name }}! <span class="icon-[mdi--bell-outline] hover:icon-hover-[mdi--bell-off]" />
  </h1>
</template>
