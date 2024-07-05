<script setup>
import C1 from './components/c1.vue'
import C2 from './components/c2.vue'

const data1 = ref([
  {
    name: '人员数',
    active: 9,
    total: 10,
  },
  {
    name: '任务统计',
    active: 12,
    total: 47,
  },
  {
    name: '问题处理',
    active: 124,
    total: 167,
  },
])
</script>

<template>
  <div>
    <div class="flex space-x-5 p-4">
      <div v-for="(item, index) in data1" :key="index" class="flex-1 px-4 py-3 border rounded-lg">
        <div class="text-gray-400 font-semibold">
          {{ item.name }}
        </div>
        <div class="py-3">
          <span class="font-bold text-3xl mr-0.5">
            {{ item.active }}
          </span>
          <span class="text-gray-400">/{{ item.total }}</span>
        </div>
        <div class="text-xs text-gray-400">
          数据截止到今天
        </div>
      </div>
    </div>

    <div class="flex space-x-5 p-4">
      <C1 />
      <C2 />
    </div>
  </div>
</template>

<route>
  {
    meta: {
      title: '仪表盘',
    },
  }
</route>
