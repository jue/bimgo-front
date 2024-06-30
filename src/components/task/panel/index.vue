<script setup>
import dayjs from 'dayjs'

const props = defineProps({
  action: {
    type: String,
    default: 'view',
  },
})
const { cate } = storeToRefs(useTaskStore())
const { getLogs } = useLogsStore()

const dataList = ref([])

const apiUrl = computed(() => {
  if (cate.value === 'task')
    return '/task/detail'
  if (cate.value === 'issue')
    return '/issue/detail'
})

// 根据gid获取数据
async function getData(id) {
  const { data: res } = await http.post(apiUrl.value, {
    gid: id,
  })

  if (res.code === 200)
    dataList.value = res.data
    // getLogs(id, cate.value)
}

defineExpose({ getData })
</script>

<template>
  <div class="flex h-full">
    <div class="flex-1">
      <TaskPanelView :data-list="dataList" :cate="cate" />
    </div>
    <div class="w-56 border-l bg-gray-50/80 p-4 shrink-0">
      <TaskPanelSide :task="dataList.task" />
      <div class=" text-gray-400 text-xs mt-10 border-t py-4">
        该问题由
        <User :uid="dataList?.task?.uid" />
        <!-- <UserName :uid="dataList?.task?.uid" /> -->
        于 {{ dayjs(dataList?.task?.created_time).format('YYYY-MM-DD HH:mm') }} 创建
      </div>
    </div>
  </div>
</template>
