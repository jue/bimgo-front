<script setup>
const { sideWidth } = storeToRefs(useSettingsStore())
</script>

<template>
  <el-container>
    <!-- <LayoutHead /> -->
    <el-header class="box-shadow-bottom">
      <LayoutTopbar />
    </el-header>
    <el-container>
      <LayoutSide />
      <el-container>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </el-container>

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
