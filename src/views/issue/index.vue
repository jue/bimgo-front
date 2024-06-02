<script setup>
import Panel from 'primevue/panel'

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
const { payload_issue: payload, tasks } = storeToRefs(taskStore)

onMounted(async () => {
  await taskStore.getTasks()
})
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="px-5 space-x-3 flex items-center justify-between min-h-12 shrink-0">
      <div class="flex items-center space-x-2">
        <!-- <SelectButton v-model="viewType" :options="viewOptions" option-label="label" option-value="value" /> -->
        <!-- <FilterBtn cate="isuue" /> -->
        <!-- <InputText v-model="payload.key" type="text" class="w-80" placeholder="按问题名搜索" /> -->
        <!-- <FilterStatus v-model="para.status" cate="issue" />
        <FilterUids v-model="para.uids" cate="issue" /> -->

        <FilterList cate="issue" />
        <FilterGroup cate="issue" />
      </div>
      <div class="flex items-center space-x-4">
        <!-- <IssuesAdd @close="getIssues" /> -->
      </div>
    </div>
    <ScrollPanel class="h-10 flex-1">
      <np-tree-header />
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

          <!-- <template #footer>
            <CreateData cate="issue" class="border-none" />
          </template> -->
          </Panel>
        </div>
      </template>
      <template v-else>
        <template v-for="(task, index) in tasks" :key="index">
          <np-tree-line :task="task" />
        </template>
      </template>
    </ScrollPanel>
    <!-- <np-tree /> -->

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
