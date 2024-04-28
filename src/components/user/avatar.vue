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
})
const { users } = storeToRefs(useSettingsStore())
const info = computed(() => users.value.find(item => item.uid === props.uid))
</script>

<template>
  <Avatar :image="info?.avatar || ''" :shape="shape">
    <template #default>
      <span v-if="!info?.avatar && info?.realname" class="text-neutral-900">{{ info?.realname.slice(0, 1) }}</span>
    </template>
  </Avatar>
</template>
