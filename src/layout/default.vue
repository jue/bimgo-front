<script setup>
const { sideWidth } = storeToRefs(useSettingsStore())
</script>

<template>
  <div class="h-screen flex">
    <Sidebar />
    <div class="h-screen flex flex-col" :style="{ width: `calc(100vw - ${sideWidth}px)` }">
      <Topbar />
      <div class="flex-1 overflow-y-auto">
        <RouterView />
      </div>
    </div>
  </div>
</template>
