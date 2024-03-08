<script setup>
const { sideWidth } = storeToRefs(useSettingsStore())
const { config } = useUserStore()

const tasks = ref([])
const taskDetail = ref(null)
const taskTable = ref(null)

async function getTaskList() {
  const { data: res } = await http.post('/task/list')
  if (res.code === 200)
    tasks.value = res.data
}

function openTaskDetail(data) {
  taskTable.value.setCurrentRow(data)
  taskDetail.value.open(data.tid)
}

function addNewTask(data) {
  tasks.value.push(data)
}

function addValueToKeys(jsonData) {
  const keys = Object.keys(jsonData)
  const result = keys.map((key) => {
    const newObj = { ...jsonData[key], value: key }
    return newObj
  })
  return result
}

onMounted(() => {
  getTaskList()
})
</script>

<template>
  <div class=" overflow-x-auto" :style="{ width: `calc(100vw - ${sideWidth}px)` }">
    <NpTable ref="taskTable" :columns="addValueToKeys(config.task_table.column)" :data="tasks" />
  </div>
</template>

<style lang="scss" scoped>
.th-cell, .cell {
  @apply flex items-center min-h-10 px-1;
  white-space: nowrap; // 当宽度变小时，不换行
}
</style>
