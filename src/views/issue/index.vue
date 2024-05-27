<script setup>
import Table from './components/table.vue'
import GroupBy from './components/GroupBy.vue'

const router = useRouter()

const para = reactive({
  status: ['todo', 'doing'],
})

// 以下是主要程序
const { payload, issues } = storeToRefs(useIssueStore())

async function getIssuesData() {
  const issueStore = useIssueStore()
  await issueStore.getIssues()
}

onMounted(() => {
  getIssuesData()
})
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="px-5 space-x-3 flex items-center justify-between min-h-12 shrink-0">
      <div class="flex items-center space-x-2">
        <!-- <FilterBtn cate="isuue" /> -->
        <!-- <InputText v-model="payload.key" type="text" class="w-80" placeholder="按问题名搜索" /> -->
        <!-- <FilterStatus v-model="para.status" cate="issue" />
        <FilterUids v-model="para.uids" cate="issue" /> -->
      </div>
      <div class="flex items-center space-x-4">
        <IssuesAdd @close="getIssues" />
      </div>
    </div>
    <ScrollPanel class="h-10 flex-1">
      <Table />
    </ScrollPanel>

    <pre>{{ payload }}</pre>
    <!-- <pre>
      {{ issues }}
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
