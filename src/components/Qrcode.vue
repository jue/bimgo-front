<script setup>
import QrcodeVue from 'qrcode.vue'

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  size: {
    type: Number,
    default: 500,
  },
})

const value = ref(props.text)

watch(() => props.text, (val) => {
  value.value = val
})
</script>

<template>
  <QrcodeVue :value="value" :size="size" level="H" />
</template>
