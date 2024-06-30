<script setup>
const router = useRouter()
const viewType = ref('table')
const viewOptions = ref([
  {
    label: '表格',
    value: 'table',
  },
  {
    label: '看板',
    value: 'kanban',
  },
])

const taskStore = useTaskStore()
const { payload_issue: payload, tasks, openedGid, cate, selectedGids } = storeToRefs(taskStore)

onMounted(async () => {
  await taskStore.getTasks()
})

function handleDelete(val) {
  const arr = toRaw(val)

  ElMessageBox.confirm(
    '确定删除所选的问题吗?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    },
  ).then(async () => {
    const { data: res } = await http.post('/issue/delete', {
      gids: arr,
    })
    if (res.code === 200) {
      ElMessage.success('删除成功')
      selectedGids.value = []
      taskStore.getTasks()
    }
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}
</script>

<template>
  <div class="app-container bg-white border rounded-md">
    <div class="px-5 space-x-3 flex items-center justify-between min-h-12 shrink-0">
      <div class="text-lg font-semibold">
        问题列表
      </div>
      <div class="flex items-center space-x-4">
        <template v-if="selectedGids.length">
          <span><span class="font-bold">{{ selectedGids.length }}</span>个项目已选择</span>
          <el-button
            type="danger"
            @click="handleDelete(selectedGids)"
          >
            <span class="icon-[lucide--trash-2]" />
            <span>批量删除</span>
          </el-button>
          <el-button
            type="into"
            @click="selectedGids = []"
          >
            <!-- <span class="icon-[lucide--trash-2]" /> -->
            <span>取消全选</span>
          </el-button>
        </template>

        <template v-else>
          <FilterList cate="issue" />
          <FilterGroup cate="issue" />
        </template>
      </div>
    </div>

    <div class="app-body">
      <np-tree-header />
      <div v-if="!tasks.length" class="flex items-center justify-center text-gray-400 text-xs h-40">
        没有相关的数据
      </div>

      <template v-if="payload.groupby_field">
        <div class="space-y-4">
          <Panel
            v-for="(item, index) in tasks"
            :key="index"
            :header="item.value"
            toggleable
            :pt="{
              root: {
                class: '',
              },
              header: {
                class: 'flex-row-reverse h-10 !bg-gray-50',
              },
              togglericon: {
                class: 'w-3 h-3 text-zinc-400',
              },
            }"
          >
            <template v-for="(row, index) in item.rows" :key="index">
              <np-tree-line :task="row" />
            </template>

            <template #header>
              <div class="flex items-center w-full px-2">
                <FilterGroupName :group="item" />
              </div>
            </template>
          </Panel>
        </div>
      </template>
      <template v-else>
        <template v-for="(task, index) in tasks" :key="index">
          <np-tree-line :task="task" />
        </template>
      </template>
    </div>
    <CreateData cate="issue" class="border-t" />
  </div>
</template>

<route>
  {
    meta: {
      title: '问题列表',
    },
  }
</route>
