<script setup>
defineProps({
  label: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: null,
  },
  danger: {
    type: Boolean,
    default: false,
  },
  divider: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div
    class="relative w-full bg-white"
    :class="{ 'pt-0.5': divider }"
  >
    <template v-if="divider">
      <div class="h-px bg-stone-200 absolute -right-1 -left-1 " />
    </template>
    <div
      :href="href"
      class="py-1.5 px-2 cursor-pointer rounded-md flex items-center select-none w-full relative"
      :class="{ 'text-red-500 hover:bg-red-50': danger, 'hover:bg-gray-100': !danger, 'mt-1': divider }"
    >
      <slot>
        <span v-if="icon !== null" :class="{ [icon]: !!icon, 'w-4 h-4': !icon }" class="mr-2" />
        <span>{{ label }}</span>
      </slot>
    </div>
  </div>
</template>

<style>
.divider {
  &:before {
    content: '';
    @apply absolute h-px -top-1 -left-1 -right-1 bg-stone-200;
  }
}
</style>
