<script setup>
const props = defineProps({
  uid: {
    type: String,
    default: '',
  },
})
const { users } = storeToRefs(useSettingsStore())
const info = computed(() => users.value.find(item => item.uid === props.uid))
</script>

<template>
  <span class="shrink-0">{{ info?.realname || '' }}</span>
</template>
