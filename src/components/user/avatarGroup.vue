<script setup>
import Avatar from 'primevue/avatar'

const props = defineProps({
  uids: {
    type: Array,
    default: () => [],
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
const infos = computed(() => props.uids.map(uid => users.value.find(item => item.uid === uid)))
</script>

<template>
  <div class="inline-flex items-center">
    <template v-for="(info, index) in infos" :key="index">
      <Avatar
        v-if="typeof props.size === 'number'"
        :image="info?.avatar ? info.avatar : ''"
        :shape="shape"
        :label="!info?.avatar ? info?.realname.slice(0, 1) : ''"
        :style="{ width: `${size}px`, height: `${size}px` }"
        class="-ml-1.5 first:ml-0 cursor-pointer ring-white z-0 hover:z-10 hover:ring-1"
      />
      <Avatar
        v-else
        v-tooltip.bottom="info?.realname"
        :size="props.size" :image="info?.avatar ? info.avatar : ''"
        :shape="shape"
        :label="!info?.avatar ? info?.realname.slice(0, 1) : ''"
        class="-ml-1.5 first:ml-0 cursor-pointer ring-white z-0 hover:z-10 hover:ring-1"
      />
    </template>
  </div>
</template>
