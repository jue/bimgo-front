<script setup>
const props = defineProps({
  dataList: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<template>
  <div class="px-4">
    <div class="flex items-center justify-between pt-3">
      <div><span class="text-gray-300 cursor-pointer hover:text-blue-400">#8</span></div>
      <div />
    </div>

    <!-- 标题区域 -->
    <div v-if="dataList && dataList.task" class="pt-2">
      <FieldTitleView :task="dataList?.task" />
      <FieldDescription v-model="dataList.task.description" :data="dataList?.task" />
    </div>
  </div>
</template>
