<script setup>
import dayjs from 'dayjs'
import { onMounted, watch } from 'vue'

const props = defineProps({
  form: {
    type: Object,
    default: () => ({}),
  },
})

const { issue_columns } = storeToRefs(useUserStore())
const { issuePriority } = storeToRefs(useSettingsStore())
const issueStatus = issue_columns.value.status.options
const columnsConfig = ref([])

// const columnsConfig = [...objectToArray(issue_columns.value), {
//   label: '操作',
//   value: 'op',
//   show: true,
// }].filter(item => item.show)

const loading = ref(false)
const filterData = ref([])

async function getIssues(params = props.form) {
  loading.value = true
  const { data: res } = await http.post('/issue/list', params)
  if (res.code === 200) {
    filterData.value = []
    filterData.value = res.data
  }

  setTimeout(() => {
    loading.value = false
  }, 800)
}

onMounted(() => {
  updateColumnsConfig()

  getIssues()
})

const fetchData = debounce(() => {
  getIssues()
}, 800)

function updateColumnsConfig() {
  columnsConfig.value = [...objectToArray(issue_columns.value), {
    label: '操作',
    value: 'op',
    show: true,
  }].filter(item => item.show)
}

watch(() => props.form.key, (val) => {
  fetchData(val)
})

watch(() => props.form.groupby_field, (val) => {
  fetchData(val)
})

watch(() => issue_columns, () => {
  updateColumnsConfig()
}, {
  deep: true,
})

const issueDetailRef = ref(null)
</script>

<template>
  <div>
    <np-table
      id :columns="columnsConfig" :rows="filterData" border class="border-y" :loading="loading"
      :tree="!!form.groupby_field" :options="{
        idWidth: 68,
      }"
    >
      <template #id-th>
        <div class="flex items-center justify-end h-full">
          #
        </div>
      </template>
      <template #id-td="{ row, column, index }">
        <div class=" shrink-0 flex items-center relative space-x-2 h-full">
          <div class="flex flex-1 w-6">
            <IssuesColumnMore :data="row" @refresh="getIssues" />
          </div>
          <div class="w-4 h-8 flex items-center justify-center text-gray-500">
            {{ index + 1 }}
          </div>
        </div>
      </template>

      <template v-for="(column) in columnsConfig.filter(item => (item.value !== 'op'))" #[`${column.value}-header`]>
        <div :key="column.value" class="cell flex items-center justify-between w-full h-full text-xs font-medium">
          <span>{{ column.label }}</span>
          <IssuesColumnOption v-if="column.value !== 'title'" :data="column" :form="form" @update:form="getIssues()" />
        </div>
      </template>

      <!-- <template #uids-header="{ column }">
        <div class="cell flex items-center justify-between text-[#485776] w-full h-full text-xs font-medium">
          <span>{{ column.label }}</span>
          <IssuesColumnOption
            v-if="index !== 'title'" :data="{ ...column, value: index }" :form="form"
            @update:form="getIssues()"
          />
        </div>
      </template> -->

      <template #op-header="{ row, column, index }">
        <div class="h-full flex items-center">
          <IssuesSetcolums />
        </div>
      </template>

      <template #title-data="{ row }">
        <IssuesColumnTitle :data="row" @show="issueDetailRef.open(row)" />
      </template>

      <template #status-data="{ row }">
        <IssuesColumnStatus :data="row" />
      </template>
      <template #priority-data="{ row }">
        <IssuesColumnPriority :data="row" />
      </template>
      <template #uids-data="{ row }">
        <IssuesColumnUser :data="row" />
      </template>

      <template #end_time-data="{ row }">
        <IssuesColumnDate :data="row" field="end_time" />
      </template>
      <template #done_time-data="{ row }">
        <IssuesColumnDate :data="row" field="done_time" />
      </template>

      <template #uid-data="{ row }">
        <div class="flex items-center h-full">
          <UserAvatar :uid="row.uid" :size="24" />
          <UserName :uid="row.uid" />
        </div>
      </template>
      <template #created_at-data="{ row }">
        <div class="flex items-center h-full">
          {{ dayjs(row.created_at).format('YYYY-MM-DD HH:mm') }}
        </div>
      </template>

      <template #group-th="{ group }">
        <div class="inline-flex items-center space-x-2 h-full">
          <!-- 执行人 -->
          <div v-if="group.lable === 'uid'" class="flex items-center space-x-1">
            <UserAvatar :uid="group.value" :size="24" />
            <div class="text-stone-600">
              <UserName :uid="group.value" />
            </div>
          </div>

          <!-- 问题状态 -->
          <div v-if="group.lable === 'status'" class="flex items-center space-x-1">
            <div
              class="w-3.5 h-3.5 rounded-full border border-2"
              :style="{ borderColor: `${issueStatus.find(item => item.value === group.value)?.color}`, backgroundColor: `${issueStatus.find(item => item.value === group.value)?.color}10` }"
            />
            <div>{{ issueStatus.find(item => item.value === group.value)?.label }}</div>
          </div>

          <!-- 优选级 -->
          <div v-if="group.lable === 'priority'" class="flex items-center space-x-1">
            <div
              class="w-3.5 h-3.5 rounded-full border border-2"
              :style="{ borderColor: `${issuePriority.find(item => item.value === group.value)?.color}`, backgroundColor: `${issueStatus.find(item => item.value === group.value)?.color}10` }"
            />
            <div>{{ issuePriority.find(item => item.value === group.value)?.label }}</div>
          </div>

          <!-- 期望结束日期、实际完成日期、创建日期 -->
          <div
            v-if="group.lable === 'end_time' || group.lable === 'done_time' || group.lable === 'created_at'"
            class="flex items-center"
          >
            {{ group.value ? dayjs(group.value).format('YYYY-MM-DD') : '-' }}
          </div>

          <span
            class="text-xs text-gray-500 w-4 h-4 bg-gray-200 rounded-full flex justify-center items-center font-semibold"
          >{{
            group?.rows?.length }}</span>
        </div>
      </template>
    </np-table>
    <IssuesAdd2 @refresh="getIssues" />
    <IssuesBox ref="issueDetailRef" @close="getIssues" />
  </div>
</template>
