<script setup>
const { changeSideCollapsed } = useSettingsStore()
</script>

<template>
  <div class="h-14 flex items-center justify-between px-2 bg-white border-b">
    <Logo class="w-10" />
    <span v-tooltip="'收起侧边栏'" class="icon-[lucide--panel-left-close] text-neutral-400 text-xl cursor-pointer" @click="changeSideCollapsed()" />
  </div>
</template>
