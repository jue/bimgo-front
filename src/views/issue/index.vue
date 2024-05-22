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

const para = reactive({
  status: ['todo', 'doing'],
})

function getIssues() {
  tableRef.value.getIssues(form)
}
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="px-5 space-x-3 flex items-center justify-between h-12 shrink-0">
      <div class="flex items-center space-x-2">
        <InputText v-model="form.key" type="text" class="w-80" placeholder="按问题名搜索" />
        <FilterStatus v-model="para.status" cate="issue" />
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
