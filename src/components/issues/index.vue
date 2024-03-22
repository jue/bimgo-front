<script setup>
const props = defineProps({
  form: {
    type: Object,
    default: () => ({}),
  },
})
const { sideWidth } = storeToRefs(useSettingsStore())
const { issue_columns } = storeToRefs(useUserStore())
const key = ref('')
const loading = ref(false)

const issuesData = ref([])

async function getIssues() {
  loading.value = true
  const { data: res } = await http.post('/issue/list', props.form)
  if (res.code === 200)
    issuesData.value = res.data

  setTimeout(() => {
    loading.value = false
  }, 800)
}

onMounted(() => {
  getIssues()
})
</script>

<template>
  <div>
    <div class="py-3 px-4">
      <div class="flex space-x-2">
        <el-input v-model="key" placeholder="按问题关键字搜索" clearable>
          <template #prefix>
            <span class="icon-[lucide--list-filter]" />
          </template>
        </el-input>
        <el-button type="primary">
          搜索
        </el-button>
      </div>
    </div>

    <div class="overflow-x-auto w-full" :style="{ width: `calc(100vw - ${sideWidth}px)` }">
      <!-- header -->
      <div class="min-w-fit max-w-full">
        <div class="flex h-10 divide-x border-y">
          <div class="shrink-0 w-16" />
          <template v-for="(column, index) in issue_columns" :key="index">
            <div v-if="column.show" :style="{ width: `${column.width}px` }" class="h-full shrink-0">
              <div class="cell flex items-center px-2 text-[#485776] w-full h-full text-xs font-medium">
                {{ column.label }}
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
        <div v-for="(item, index) in issuesData" :key="index" class="flex h-10 divide-x hover:bg-gray-100">
          <div class=" shrink-0 w-16">
            {{ index + 1 }}
          </div>
          <template v-for="(column, value) in issue_columns" :key="value">
            <div v-if="column.show" :style="{ width: `${column.width}px` }" class="td">
              <div class="cell">
                {{ item[value] }}
              </div>
            </div>
          </template>
          <div class="flex-1 min-w-11" />
        </div>
      </div>

      <IssuesAdd @refresh="getIssues" />
    </div>

    <div class="flex">
      <pre>{{ issue_columns }}</pre>
      <pre>{{ issuesData }}</pre>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cell{
  @apply flex items-center px-[6px] text-[#1f2328] w-full h-full relative;
}
.td{
  @apply p-0.5 h-full shrink-0;
  &:hover{
    @apply bg-blue-600;
    .cell {
      @apply bg-gray-100;
    }
  }
}
</style>
