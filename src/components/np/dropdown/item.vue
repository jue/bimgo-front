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
})
</script>

<template>
  <div
    class="py-1.5 px-2 cursor-pointer rounded-md flex items-center"
    :class="{ 'text-red-500 hover:bg-red-50': danger, 'hover:bg-stone-100': !danger }"
  >
    <span v-if="icon !== null" :class="{ [icon]: !!icon, 'w-4 h-4': !icon }" class="mr-2" />
    <span>{{ label }}</span>
  </div>
</template>
