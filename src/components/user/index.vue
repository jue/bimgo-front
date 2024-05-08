<script setup>
import Avatar from 'primevue/avatar'

defineProps({
  uid: {
    type: String,
    default: '',
  },
  shape: {
    type: String,
    default: 'circle',
  },
  size: {
    type: String,
    default: 'small',
  },
})
</script>

<template>
  <div class="inline-flex items-center space-x-1">
    <UserAvatar :uid="uid" :shape="shape" :size="size" />
    <UserName :uid="uid" />
  </div>
</template>
