<template>
  <div class="bg-white rounded-lg py-20">
    <div class="text-center space-y-2">
      <span class="icon-[lucide--alert-circle] text-5xl text-red-500" />
      <div class="text-gray-400">
        出错了，请联系管理员
      </div>
    </div>
  </div>
</template>

<route>
  {
    meta: {
      layout: 'wechat',
    },
    name: 'wechat-error'
  }
</route>
