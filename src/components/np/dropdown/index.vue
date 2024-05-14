<script setup>
import Menu from './menu.vue'
import Item from './item.vue'

const show = ref(false)

const op = ref(null)
function toggle(event) {
  op.value.toggle(event)
}
</script>

<template>
  <div class="inline-block">
    <div class="inline-block" @click="toggle">
      <slot />
    </div>
    <OverlayPanel
      ref="op"
      :pt="{
        root: {
          class: ['shadow-none border-none'],
        },
      }"
      @show="$emit('show', true)"
      @hide="$emit('show', false)"
    >
      <Menu @click="toggle">
        <slot name="menu" />
      </Menu>
    </OverlayPanel>

    <input ref="uploadInput" accept="*/*" type="file" class="hidden" @change="uploader">
  </div>
</template>
