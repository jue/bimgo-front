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
  if (res.code === 200)
    filterData.value = res.data

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
</script>

<template>
  <div>
    <np-table
      id :columns="columnsConfig" :rows="filterData" border class="border-y" :loading="loading"
      :tree="!!form.groupby_field"
    >
      <template #id-th>
        <div class="text-right">
          #
        </div>
      </template>
      <template #id-td="{ row, column, index }">
        <div class=" shrink-0 flex items-center relative space-x-2 -mx-3 px-2">
          <div class="flex flex-1 w-6">
            <IssuesColumnMore :data="row" @refresh="getIssues" />
          </div>
          <div class="w-4 h-8 flex items-center justify-center text-gray-500">
            {{ index + 1 }}
          </div>
        </div>
      </template>

      <template v-for="(column) in columnsConfig.filter(item => item.value !== 'op')" #[`${column.value}-header`]>
        <div
          v-if="column.value !== 'title'" :key="column.value"
          class="cell flex items-center justify-between w-full h-full text-xs font-medium"
        >
          <span>{{ column.label }}</span>
          <IssuesColumnOption :data="column" :form="form" @update:form="getIssues()" />
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
        <IssuesSetcolums />
      </template>

      <template #title-data="{ row }">
        <IssuesColumnTitle :data="row" />
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
        <div class="flex items-center">
          <UserAvatar :uid="row.uid" :size="24" />
          <UserName :uid="row.uid" />
        </div>
      </template>
      <template #created_at-data="{ row }">
        <div class="flex items-center">
          {{ dayjs(row.created_at).format('YYYY-MM-DD HH:mm') }}
        </div>
      </template>
    </np-table>
    <IssuesAdd @refresh="getIssues" />
  </div>
</template>
