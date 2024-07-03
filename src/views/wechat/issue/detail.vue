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
  <div class="app-container">
    <div class="text-2xl">
      {{ dataList?.task?.title }}
    </div>
    <div class="py-2">
      <FieldStatus v-model="dataList.task.status" class="h-10" :data="dataList.task" />
    </div>
    <!-- <FieldStatus v-model="dataList?.task?.status" class="h-10" :data="dataList?.task" /> -->
    <div class="app-body">
      <div class="border border-emerald-400 rounded-md">
        <div class="bg-emerald-400 text-white px-4 py-2 font-semibold">
          问题描述
        </div>
        <div class="p-2 leading-relaxed" v-html="dataList?.task?.description" />
      </div>

      <!-- 操作日志 -->
      <div>
        <div class="flex items-center py-3">
          <span class="text-base font-bold">活动日志</span>
        </div>

        <Comment :id="dataList?.task?.gid" :cate="cate" />
      </div>
    </div>

    <div class="shrink-0 py-5">
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
