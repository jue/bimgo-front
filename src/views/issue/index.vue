<script setup>
import Table from './components/table.vue'
import GroupBy from './components/GroupBy.vue'

const router = useRouter()

const tableRef = ref(null)

const form = reactive({
  key: '',
  key_field: '',
  sort_field: '',
  sort: '',
  groupby_field: '',
})

function getIssues() {
  tableRef.value.getIssues(form)
}
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="px-5 space-x-3 flex items-center justify-between h-12 shrink-0">
      <div class="flex items-center space-x-4">
        <div class="inline-flex items-center h-8 bg-gray-200/70 p-0.5 rounded-lg shrink-0">
          <div class="flex items-center space-x-1 px-4 bg-white rounded-lg h-full cursor-pointer">
            <span class="icon-[lucide--table-2]" />
            <span>表格</span>
          </div>
          <el-tooltip content="未开放" placement="top">
            <div
              class="flex items-center space-x-1 px-4 rounded-lg h-full cursor-pointer text-zinc-600 hover:text-blue-600"
            >
              <span class="icon-[lucide--square-kanban]" />
              <span>看板</span>
            </div>
          </el-tooltip>
          <el-tooltip content="未开放" placement="top">
            <div
              class="flex items-center space-x-1 px-4 rounded-lg h-full cursor-pointer text-zinc-600 hover:text-blue-600"
            >
              <span class="icon-[lucide--square-kanban]" />
              <span>日历</span>
            </div>
          </el-tooltip>
        </div>
        <div class="flex items-center">
          <GroupBy v-model="form.groupby_field" />
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <el-input v-model="form.key" placeholder="按问题名搜索" clearable class="w-80">
          <template #prefix>
            <span class="icon-[lucide--list-filter] text-gray-500" />
          </template>
        </el-input>
        <el-tooltip content="存档问题">
          <el-button class="h-8 w-8 p-0" @click="router.push('/issue/archive')">
            <span class="icon-[lucide--archive]" />
          </el-button>
        </el-tooltip>
        <IssuesAdd @close="getIssues" />
      </div>
    </div>
    <Table ref="tableRef" :form="form" />
    <!-- <pre>
      {{ form }}
    </pre> -->
  </div>
</template>

<route>
  {
    meta: {
      title: '问题列表',
    },
  }
</route>
