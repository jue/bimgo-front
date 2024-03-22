<script setup>
const { sideWidth } = storeToRefs(useSettingsStore())
</script>

<template>
  <div class="min-h-screen flex">
    <Sidebar />
    <div class=" min-h-screen" :style="{ width: `calc(100vw - ${sideWidth}px)` }">
      <Topbar />
      <RouterView />
    </div>
  </div>
</template>
