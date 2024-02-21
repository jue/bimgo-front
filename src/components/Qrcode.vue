<script setup>
import * as QRCode from 'easyqrcodejs'

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

const qrcodeElement = ref(null)
let qrCodeInstance = null

function createOrUpdateQRCode(text) {
  if (qrCodeInstance) {
    qrCodeInstance.clear() // 清除旧的二维码
    qrCodeInstance.makeCode(text) // 生成新的二维码
  }
  else {
    qrCodeInstance = new QRCode(qrcodeElement.value, {
      text,
      width: props.size,
      height: props.size,
    })
  }
}

// watch(() => props.text, (text) => {
//   console.log(text)
//   createOrUpdateQRCode(text)
// })

onMounted(() => {
  createOrUpdateQRCode(props.text)
})

onBeforeUnmount(() => {
  if (qrCodeInstance)
    qrCodeInstance.clear()
})

// 不需要在onMounted中初始化，因为watch已经处理了初始值
</script>

<template>
  <span ref="qrcodeElement" />
</template>
