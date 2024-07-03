<script setup>
const { cate } = storeToRefs(useTaskStore())

const route = useRoute()
const dataList = ref({
  task: {},
  files: [],
})

async function getDataList(gid) {
  const { data: res } = await http.post('/issue/detail', { gid })
  if (res?.code === 200)
    dataList.value = res.data
}

onMounted(() => {
  getDataList(route.query.gid)
})
</script>

<template>
  <div class="app-container h-screen">
    <!-- <div class="h-12 flex items-center justify-between border-b px-2">
      <Logo class="h-10" />
      <UserAvatar :uid="dataList?.task?.uid" :size="32" />
    </div> -->
    <div class="text-2xl py-3 px-4">
      {{ dataList?.task?.title }}
    </div>
    <div class="border-b flex items-center justify-between pb-3 px-4">
      <div class="text-gray-400">
        变更状态：
      </div>
      <FieldStatus v-model="dataList.task.status" class="!w-fit !ring-0 !shadow-none !h-fit" :cate="cate" :data="dataList.task" />
    </div>

    <div class="app-body py-2 px-4">
      <div class="border border-emerald-400 rounded-md overflow-hidden">
        <div class="bg-emerald-400 text-white px-4 py-2 font-semibold">
          问题描述
        </div>
        <div v-if="dataList?.task?.description" class="p-2 leading-relaxed" v-html="dataList?.task?.description" />
        <div v-else class="text-center text-gray-400 p-2">
          没有问题描述性内容<br>如有疑问请联系相关负责人
        </div>
      </div>

      <!-- 操作日志 -->
      <div>
        <div class="flex items-center py-3">
          <span class="text-base font-bold">活动日志</span>
        </div>

        <Comment :id="dataList?.task?.gid" :cate="cate" />
      </div>
    </div>

    <!-- <div class="py-2">
      <FieldStatus v-model="dataList.task.status" class="h-10" :data="dataList.task" />
    </div> -->
    <!-- <FieldStatus v-model="dataList?.task?.status" class="h-10" :data="dataList?.task" /> -->

    <div class="shrink-0 py-5 px-4 border-t">
      <CommentSection :id="dataList?.task?.gid" :cate="cate" />
    </div>
  </div>
</template>

<route>
  {
    meta: {
      layout: 'wechat',
    },
  }
</route>
