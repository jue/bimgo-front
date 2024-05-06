<template>
  <div>
    <div class="flex space-x-5 p-4">
      <div v-for="i in 4" :key="i" class="flex-1 px-4 py-3 border rounded-lg">
        <div class="text-gray-400 font-semibold">
          人员数
        </div>
        <div class="py-3">
          <div class="font-bold text-2xl">
            34,789
          </div>
        </div>
        <div class="text-xs text-gray-400">
          数据截止到今天
        </div>
      </div>
    </div>

    <div class="flex space-x-5 p-4">
      <div v-for="i in 2" :key="i" class="flex-1 px-4 py-3 border rounded-lg">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <div class="icon-[lucide--pie-chart]" />
            <div class="font-semibold">
              任务统计
            </div>
          </div>
          <div class="card flex justify-content-center">
            <ButtonGroup>
              <Button label="今日" icon="icon-[lucide--pie-chart]" outlined severity="success" />
              <Button label="今日" icon="icon-[lucide--pie-chart]" outlined />
            </ButtonGroup>
          </div>
        </div>
      </div>
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
