<script setup>
const visible = ref(false)
function open() {
  visible.value = true
}
</script>

<template>
  <Dialog v-model:visible="visible" modal>
    <div>这里是内容</div>
  </Dialog>
</template>
