<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  size: {
    type: Number,
    default: 24,
  },
  shape: {
    type: String as PropType<'circle' | 'square'>,
    default: '',
  },
})

const iconSize = computed(() => Math.min(props.size * 0.667, 16))

const buttonClasses = computed(() => ({
  'px-0': props.shape,
  'rounded-full': props.shape === 'circle',
  'px-2': !props.shape,
}))

const buttonStyle = computed(() => ({
  height: `${props.size}px`,
  width: (props.shape === 'circle' || props.shape === 'square') ? `${props.size}px` : 'auto',
}))
</script>

<template>
  <button
    class="inline-flex items-center justify-center rounded-lg active:bg-opacity-75 select-none overflow-hidden space-x-1"
    :class="[buttonClasses]" :style="buttonStyle"
  >
    <Icon v-if="icon" :name="icon" :size="iconSize" />
    <slot />
  </button>
</template>
