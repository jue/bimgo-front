<script setup>
const props = defineProps({
  contractor_id: {
    type: String,
    default: '',
  },
  size: {
    type: Number,
    default: 28,
  },
})
const { contractors } = storeToRefs(useSettingsStore())
const info = contractors.value.find(item => item.contractor_id === props.contractor_id)
</script>

<template>
  <el-image
    :src="info.logo || ''" fit="cover"
    :style="{ width: `${size}px`, height: `${size}px` }"
    class="shrink-0"
  >
    <template #error>
      <div
        class="h-full w-full flex items-center justify-center text-white rounded-lg select-none"
        :style="{
          'background-color': info.color,
          'font-size': `${size * 0.4}px`,
          'padding': `${size * 0.1}px`,
        }"
      >
        <span v-if="info.contractor_name">{{ info.contractor_name.slice(0, 2) }}</span>
        <span v-else class="icon-[lucide--users]" style="font-size: inherit;" />
      </div>
    </template>
  </el-image>
</template>
