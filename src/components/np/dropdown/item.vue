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
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String,
    default: '_self',
  },
  divider: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])
function handleClick(event) {
  emit('click', event)
}
</script>

<template>
  <template v-if="divider">
    <div class="h-px bg-stone-200 border-t -mx-1" />
  </template>
  <component
    :is="href ? 'a' : 'div'"
    :href="href"
    :target="href ? target : undefined"
    class="py-1.5 px-2 cursor-pointer rounded-md flex items-center select-none w-full"
    :class="{ 'text-red-500 hover:bg-red-50': danger, 'hover:bg-stone-100': !danger }"
    @click="handleClick($event)"
  >
    <slot>
      <span v-if="icon !== null" :class="{ [icon]: !!icon, 'w-4 h-4': !icon }" class="mr-2" />
      <span>{{ label }}</span>
    </slot>
  </component>
</template>
