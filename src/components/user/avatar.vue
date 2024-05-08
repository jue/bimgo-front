<script setup>
import Avatar from 'primevue/avatar'

const props = defineProps({
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
const { users } = storeToRefs(useSettingsStore())
const info = computed(() => users.value.find(item => item.uid === props.uid))
</script>

<template>
  <Avatar :image="info?.avatar ? info.avatar : ''" :shape="shape" :label="!info?.avatar ? info?.realname.slice(0, 1) : ''" :size="size" />
</template>
