<script setup>
defineEmits(['show', 'hide'])

const op = ref(null)

function toggle(event) {
  op.value.toggle(event)
}

function show() {
  op.value.show()
}

function hide() {
  op.value.hide()
}

defineExpose({
  toggle,
  show,
  hide,
})
</script>

<template>
  <OverlayPanel
    ref="op"
    :pt="{
      root: {
        class: ['shadow-none border-none'],
      },
    }"
    @show="$emit('show', true)"
    @hide="$emit('hide', false)"
    @click="hide"
  >
    <div class="box-shadow rounded-md p-1 min-w-40 space-y-0.5">
      <slot />
    </div>
  </OverlayPanel>
</template>
