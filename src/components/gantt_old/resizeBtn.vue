<template>
  <div class="btn">
    <span class="btn-icon" />
  </div>
</template>

<style lang="scss" scoped>
.btn {
  @apply items-center px-1 hidden;
  &-icon {
    @apply icon-[lucide--grip-vertical] text-xs text-[#97c0d4] cursor-ew-resize;
  }
}
</style>
