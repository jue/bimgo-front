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
    type: [String, Number],
    default: 'small',
  },
})
const { users } = storeToRefs(useSettingsStore())
const info = computed(() => users.value.find(item => item.uid === props.uid))
</script>

<template>
  <!-- <Avatar :image="info?.avatar ? info.avatar : ''" :shape="shape" :label="!info?.avatar ? info?.realname.slice(0, 1) : ''" :size="size" /> -->

  <Avatar
    v-if="typeof props.size === 'number'"
    :image="info?.avatar ? info.avatar : ''"
    :shape="shape"
    :label="!info?.avatar ? info?.realname.slice(0, 1) : ''"
    :style="{ width: `${size}px`, height: `${size}px` }"
  />
  <Avatar
    v-else
    :size="props.size"
    :image="info?.avatar ? info.avatar : ''" :shape="shape" :label="!info?.avatar ? info?.realname.slice(0, 1) : ''"
  />
</template>
