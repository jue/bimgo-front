<script setup>
defineEmits(['show', 'hide'])
const op = ref(null)

function toggle(event) {
  op.value.toggle(event)
}

function show(event) {
  op.value.show(event)
}

function hide() {
  if (op.value)
    op.value.hide()
}

defineExpose({
  toggle,
  show,
  hide,
})
</script>

<template>
  <div class="inline">
    <div class="w-full cursor-pointer" @click="show">
      <slot @click="show" />
    </div>
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
      <div class="box-shadow rounded-md p-1 min-w-44 space-y-0.5">
        <slot name="menu" />
      </div>
    </OverlayPanel>
  </div>
</template>
