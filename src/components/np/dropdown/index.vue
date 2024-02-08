<script setup>
const show = ref(false)
</script>

<template>
  <el-dropdown trigger="click" @visible-change="(v) => (show = v)">
    <div :class="{ 'text-blue-500': show }">
      <slot />
    </div>
    <template #dropdown>
      <slot name="dropdown" />
    </template>
  </el-dropdown>
</template>
