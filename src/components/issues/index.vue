<script setup>
import dayjs from 'dayjs'

const { sideWidth } = storeToRefs(useSettingsStore())
const { issue_columns } = storeToRefs(useUserStore())

const form = reactive({
  key: '',
  key_field: '',
  field: '',
  sort: '',
})

const loading = ref(false)

const tableRef = ref(null)
const issuesData = ref([])
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

async function getIssues() {
  loading.value = true
  const { data: res } = await http.post('/issue/list', form)
  if (res.code === 200) {
    issuesData.value = res.data
    filterData.value = res.data
  }

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

function filterAndSort(params) {
  // 参数校验
  if (!params || !params.hasOwnProperty('key') || !params.hasOwnProperty('key_field')
    || !params.hasOwnProperty('field') || !params.hasOwnProperty('sort'))
    throw new Error('参数错误')

  // 根据 key_field 模糊筛选
  const filteredIssues = issuesData.value.filter((issue) => {
    if (!params.key_field)
      return true
    const keyValue = issue[params.key]
    return keyValue.includes(params.key_field)
  })

  // 根据 field 排序
  if (params.field && params.sort) {
    filteredIssues.sort((a, b) => {
      const valueA = a[params.field]
      const valueB = b[params.field]
      if (params.sort === 'asc')
        return valueA > valueB ? 1 : -1
      else if (params.sort === 'desc')
        return valueA < valueB ? 1 : -1

      return 0
    })
  }
  filterData.value = filteredIssues
  console.log(filteredIssues)

  return filteredIssues
}

function getFieldType(field) {
  // 判断字段类型
  if (/[\u4E00-\u9FA5]/.test(field))
    return 'chinese'
  else if (/^[a-zA-Z]+$/.test(field))
    return 'english'
  else if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(field))
    return 'date'
  else if (/^\d+$/.test(field))
    return 'number'

  return 'string'
}

function filterAndSort2(params) {
  // 参数校验
  if (!params || !params.hasOwnProperty('key') || !params.hasOwnProperty('key_field')
    || !params.hasOwnProperty('field') || !params.hasOwnProperty('sort'))
    throw new Error('参数错误')

  // 获取字段类型
  const type = getFieldType(params.field)

  // 根据 key_field 模糊筛选
  const filteredData = issuesData.value.filter((issue) => {
    if (!params.key_field)
      return true
    const keyValue = issue[params.key].toLowerCase()
    return keyValue.includes(params.key_field.toLowerCase())
  })

  // 根据字段类型进行排序
  if (params.field && params.sort) {
    filteredData.sort((a, b) => {
      let valueA = a[params.field]
      let valueB = b[params.field]

      // 处理日期格式
      if (type === 'date') {
        valueA = new Date(valueA)
        valueB = new Date(valueB)
      }

      // 处理数字格式
      if (type === 'number') {
        valueA = Number.parseFloat(valueA)
        valueB = Number.parseFloat(valueB)
      }

      // 忽略大小写
      if (type === 'chinese' || type === 'english') {
        valueA = valueA.toLowerCase()
        valueB = valueB.toLowerCase()
      }

      if (params.sort === 'asc')
        return valueA > valueB ? 1 : -1
      else if (params.sort === 'desc')
        return valueA < valueB ? 1 : -1

      return 0
    })
  }

  filterData.value = filteredData

  return filteredData
}
</script>

<template>
  <div>
    <!-- <div class="py-3 px-4">
      <IssuesSearch v-model="form.key" @input="filterAndSort(form)" />
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
                  :data="{ ...column, value: index }" :form="form"
                  @update:form="filterAndSort(form)"
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
