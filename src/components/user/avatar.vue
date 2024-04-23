<script setup>
const props = defineProps({
  uid: {
    type: String,
    default: '',
  },
  size: {
    type: Number,
    default: 28,
  },
  shape: {
    type: String,
    default: 'circle',
  },
})
const { users } = storeToRefs(useSettingsStore())
const info = ref(users.value.find(item => item.uid === props.uid))

watch(() => props.uid, () => {
  info.value = users.value.find(item => item.uid === props.uid)
}, { immediate: true })
</script>

<template>
  <el-avatar
    :src="info?.avatar || ''" fit="cover" :size="size" class="shrink-0 overflow-hidden"
    :shape="shape"
  >
    <template #default>
      <div
        class="h-full w-full flex items-center justify-center text-white select-none bg-black/70" :style="{
          'background-color': info?.color,
          'font-size': `${size * 0.55}px`,
          'padding': `${size * 0.1}px`,
        }"
      >
        <span v-if="info?.realname">{{ info?.realname.slice(0, 1) }}</span>
        <span v-else class="icon-[lucide--user]" :style="{ 'font-size': `${size * 0.55}px` }" />
      </div>
    </template>
  </el-avatar>
</template>
