<script setup>
import Menu from './menu.vue'

defineEmits(['show', 'hide'])

const menuRef = ref(null)
</script>

<template>
  <div @click="menuRef.toggle">
    <slot />
  </div>
  <Menu
    ref="menuRef"
    @show="$emit('show', true)"
    @hide="$emit('hide', false)"
  >
    <slot name="menu" />
  </Menu>
</template>
