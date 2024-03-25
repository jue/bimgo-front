<script setup>
const props = defineProps({
  tid: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="pl-[6px] h-full flex items-center">
    <span v-if="tid" class="icon-[lucide--circle-dot] text-green-600" />
    <span v-else class="icon-[lucide--circle-dashed] text-gray-400" />
  </div>
  <!-- <el-dropdown>
    <div class="pl-[6px] h-full flex items-center">
      <span v-if="tid" class="icon-[lucide--circle-dot] text-green-600" />
      <span v-else class="icon-[lucide--circle-dashed] text-gray-400" />
    </div>
    <template #dropdown>
      <div>没有关联任务</div>
    </template>
  </el-dropdown> -->
</template>
