<script setup>
import dayjs from 'dayjs'

const props = defineProps({
  form: {
    type: Object,
    default: () => ({}),
  },
})
const { sideWidth } = storeToRefs(useSettingsStore())
const { issue_columns } = storeToRefs(useUserStore())

const loading = ref(false)

const tableRef = ref(null)
const filterData = ref([])

const selectedCell = ref({
  index: null, // Row index
  field: null, // Column field name
})

onClickOutside(tableRef, (event) => {
  selectedCell.value = {
    index: null,
    field: null,
  }
})

async function getIssues(params = props.form) {
  loading.value = true
  filterData.value = []
  const { data: res } = await http.post('/issue/list', params)
  if (res.code === 200)
    filterData.value = res.data

  setTimeout(() => {
    loading.value = false
  }, 800)
}

function isDelay(data) {
  return false
}

onMounted(() => {
  getIssues()
})

const fetchData = debounce(() => {
  getIssues()
}, 800)

watch(() => props.form.key, (val) => {
  fetchData(val)
})
</script>

<template>
  <div>
    <!-- <div class="py-3 px-4">
      <IssuesSearch v-model="form.key" @input="fetchData" />
    </div> -->

    <el-scrollbar :style="{ width: `calc(100vw - ${sideWidth}px)` }">
      <!-- header -->
      <div class="min-w-fit max-w-full">
        <div class="flex h-10 divide-x border-y">
          <div class="shrink-0 w-16" />
          <template v-for="(column, index) in issue_columns" :key="index">
            <div v-if="column.show" :style="{ width: `${column.width}px` }" class="h-full shrink-0">
              <div class="cell flex items-center justify-between px-2 text-[#485776] w-full h-full text-xs font-medium">
                <span>{{ column.label }}</span>
                <IssuesColumnOption
                  v-if="index !== 'title'" :data="{ ...column, value: index }" :form="form"
                  @update:form="getIssues()"
                />
              </div>
            </div>
          </template>
          <div class="flex-1">
            <div class="cell flex items-center text-[#485776] w-full h-full px-1">
              <IssuesSetcolums />
            </div>
          </div>
        </div>
      </div>

      <!-- body -->
      <div class="min-w-fit max-w-full divide-y border-b">
        <template v-if="filterData.length > 0">
          <div
            v-for="(item, index) in filterData" :key="index" ref="tableRef"
            class="flex h-10 divide-x hover:bg-gray-100 group" :class="{ 'bg-red-100': isDelay(item) }"
            @click="deselectAllCells"
          >
            <div class=" shrink-0 w-16 flex items-center px-2">
              <div class="flex flex-1">
                <IssuesColumnMore :data="item" />
              </div>
              <div class="w-4 h-8 flex items-center justify-center text-gray-500">
                {{ index + 1 }}
              </div>
            </div>
            <template v-for="(column, value) in issue_columns" :key="value">
              <div
                v-if="column.show" :style="{ width: `${column.width}px` }" class="td"
                :class="{ focus: selectedCell?.index === index && selectedCell?.field === value }"
                @click="selectedCell = { index, field: value }"
              >
                <div class="cell">
                  <IssuesColumnTitle v-if="value === 'title'" :data="item " />
                  <IssuesColumnStatus v-else-if="value === 'status'" :data="item" />
                  <IssuesColumnPriority v-else-if="value === 'priority'" :data="item" />
                  <IssuesColumnUser v-else-if="value === 'uids'" :data="item" />
                  <IssuesColumnDate
                    v-else-if="value === 'end_time' || value === 'done_time'" :data="item"
                    :field="value"
                  />
                  <template v-else-if="value === 'uid'">
                    <div class="flex items-center px-[6px]">
                      <UserAvatar :uid="item[value]" :size="24" />
                      <UserName :uid="item[value]" />
                    </div>
                  </template>
                  <template v-else-if="value === 'created_at'">
                    <div class="px-[6px]">
                      {{ dayjs(item[value]).format('YYYY-MM-DD HH:mm') }}
                    </div>
                  </template>
                  <template v-else>
                    {{ item[value] }}
                  </template>
                </div>
              </div>
            </template>
            <div class="flex-1 min-w-11" />
          </div>
        </template>
        <div v-else class="h-32 flex items-center justify-center">
          <span v-if="loading" class="icon-[lucide--loader-circle] text-gray-400 text-3xl animate-spin" />
          <span v-else class="text-gray-400">没有数据</span>
        </div>
      </div>
    </el-scrollbar>
    <IssuesAdd @refresh="getIssues" />
  </div>
</template>

<style lang="scss" scoped>
.cell{
  @apply flex items-center text-[#1f2328] w-full h-full relative rounded-[2px];

}
.td{
  @apply h-full shrink-0 relative;

  .cell {
    @apply border border-2 border-transparent;
  }
  &.focus .cell {
    @apply border border-2 border-blue-600 bg-white;
    &:after {
      @apply content-[''] absolute -right-1 -bottom-1 w-2 h-2 bg-blue-600 z-50;
    }
  }
}
</style>
