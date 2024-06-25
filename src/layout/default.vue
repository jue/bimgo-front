<script setup>
const { sideWidth } = storeToRefs(useSettingsStore())
</script>

<template>
  <div class="h-screen flex  bg-[#f3f6fd]">
    <LayoutSide />
    <div class="app-container" :style="{ width: `calc(100vw - ${sideWidth}px)` }">
      <LayoutNav />
      <el-scrollbar class="app-body bg-white my-4 mr-4 rounded-md">
        <RouterView />
      </el-scrollbar>
    </div>
  </div>

  <!-- <div class="h-screen flex">
    <div class="h-screen flex flex-col" :style="{ width: `calc(100vw - ${sideWidth}px)` }">
      <Topbar />
      <div class="flex-1 overflow-y-auto py-4 pr-4 bg-red-500">
        <div class="bg-white">
          <RouterView />
        </div>
      </div>
    </div>
  </div> -->
</template>
