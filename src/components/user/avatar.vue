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
})
const { users } = storeToRefs(useSettingsStore())
const info = users.value.find(item => item.uid === props.uid)
</script>

<template>
  <el-image
    :src="info?.avatar || ''" fit="cover" :style="{ width: `${size}px`, height: `${size}px` }"
    class="shrink-0 rounded-full overflow-hidden border"
  >
    <template #error>
      <div
        class="h-full w-full flex items-center justify-center text-white rounded-full select-none bg-black" :style="{
          'background-color': info?.color,
          'font-size': `${size * 0.55}px`,
          'padding': `${size * 0.1}px`,
        }"
      >
        <span v-if="info?.realname">{{ info?.realname.slice(0, 1) }}</span>
        <span v-else class="icon-[lucide--users]" :style="{ 'font-size': `${size * 0.3}px` }" />
      </div>
    </template>
  </el-image>
</template>
