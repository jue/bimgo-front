<script setup>
import { inject, ref } from 'vue'

const { tableWidth } = storeToRefs(useTaskStore())
const { setTableWidth } = useTaskStore()

const isResizing = ref(false)
const startX = ref(0)
const initialWidth = ref(0)

function startResize(e) {
  isResizing.value = true
  startX.value = e.clientX
  initialWidth.value = tableWidth.value
  document.addEventListener('mousemove', resize)
  document.addEventListener('mouseup', stopResize)
}

function resize(e) {
  if (isResizing.value) {
    const deltaX = e.clientX - startX.value

    if (initialWidth.value + deltaX > 400)
      setTableWidth(initialWidth.value + deltaX)
  }
}

function stopResize() {
  isResizing.value = false
  document.removeEventListener('mousemove', resize)
  document.removeEventListener('mouseup', stopResize)
}
</script>

<template>
  <div
    class="border border-blue-50 hover:border-blue-400 cursor-ew-resize"
    @mousedown="startResize($event)"
  />
</template>
