<template>
  <div class="min-h-screen flex bg-[#f3f6fd]">
    <Sidebar />
    <div class="flex flex-col flex-1 rounded-l-2xl bg-white">
      <Topbar />
      <RouterView />
    </div>
  </div>
</template>
