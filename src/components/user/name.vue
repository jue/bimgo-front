<script setup>
const props = defineProps({
  uid: {
    type: String,
    default: '',
  },
})
const { users } = storeToRefs(useSettingsStore())
const value = users.value.find(item => item.uid === props.uid)
</script>

<template>
  <span>{{ value?.realname }}</span>
</template>
