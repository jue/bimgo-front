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
  text: {
    type: Boolean,
    default: false,
  },
})

const buttonClasses = computed(() => ({
  'rounded-full overflow-hidden': props.shape === 'circle',
  'rounded-lg px-1': !props.shape || props.shape === 'square',
  'bg-none': props.text,
  'bg-gray-100': !props.text,
  'hover:bg-gray-100': props.text,
}))

const buttonStyle = computed(() => ({
  height: `${props.size}px`,
  width: (props.shape === 'circle' || props.shape === 'square') ? `${props.size}px` : 'auto',
}))
</script>

<template>
  <div
    class="inline-flex items-center justify-center cursor-pointer active:bg-opacity-75 select-none"
    :class="[buttonClasses, $attrs.class]" :style="buttonStyle"
  >
    <Icon v-if="icon" :name="icon" />
    <span class="shrink-0">
      <slot />
    </span>
  </div>
</template>
