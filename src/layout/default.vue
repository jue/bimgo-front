<template>
  <div class="min-h-screen flex">
    <Sidebar />
    <div class="flex flex-col flex-1 rounded-l-2xl bg-white" style="width: calc(100vw - 256px);">
      <Topbar />
      <RouterView />
    </div>
  </div>
</template>
