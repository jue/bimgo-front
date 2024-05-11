<script setup>
import dayjs from 'dayjs'

const props = defineProps({
  cate: {
    type: String,
    default: 'task',
  },
  action: {
    type: String,
    default: 'view',
  },
})

const dataList = ref([])

const apiUrl = computed(() => {
  if (props.cate === 'task')
    return '/task/detail'
  if (props.cate === 'issue')
    return '/issue/detail'
})

// 根据gid获取数据
async function getData(id) {
  const { data: res } = await http.post(apiUrl.value, {
    gid: id,
  })

  if (res.code === 200)
    dataList.value = res.data
}

defineExpose({ getData })
</script>

<template>
  <div class="flex h-full">
    <div class="flex-1">
      <PanelView :data-list="dataList" />
    </div>
    <div class="w-80 border-l bg-gray-50/80 p-4">
      <PanelSide :task="dataList.task" />
      <div class="flex items-center text-gray-400 text-xs mt-10 border-t py-4">
        该问题由 <span class="flex items-center">
          <User :uid="dataList?.task?.uid" />
        </span>于 {{ dayjs(dataList?.task?.created_time).format('YYYY-MM-DD HH:mm') }} 创建
      </div>
    </div>
  </div>
</template>
