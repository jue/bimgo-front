<script setup>
const columns = ref([
  {
    label: '问题名',
    value: 'title',
    width: 500,
    type: 'string',
    show: true,
  },
  {
    label: '执行人',
    value: 'uids',
    width: 200,
    type: 'array',
    show: true,
  },
  {
    label: '问题状态',
    value: 'status',
    width: 120,
    type: 'option',
    show: true,
  },
  {
    label: '优先级',
    value: 'priority',
    width: 120,
    type: 'option',
    show: true,
  },
  {
    label: '期望结束日期',
    value: 'end_time',
    width: 200,
    type: 'date',
    show: true,
  },
  {
    label: '实际完成日期',
    value: 'done_time',
    width: 200,
    type: 'date',
    show: true,
  },
  {
    label: '创建人',
    value: 'uid',
    width: 200,
    type: 'option',
    show: true,
  },
  {
    label: '创建时间',
    value: 'created_at',
    width: 150,
    type: 'date',
    show: true,
  },
])

const data = ref([])
// const params = {
//   groupby_field: 'status',
// }
const params = {}
async function getIssues() {
  filterData.value = []
  const { data: res } = await http.post('/issue/list', params)
  if (res.code === 200)
    data.value = res.data
}

onMounted(async () => {
  await getIssues()
})
</script>

<template>
  <div class=" space-y-5 p-5">
    <div class="w-full">
      <h2>表格</h2>
      <np-table id :columns="columns" :rows="data" :size="40" class="border" border tree>
        <template #id-th>
          <span>乡村爱情</span>
        </template>

        <template #title-header>
          谢广坤
        </template>
        <template #uids-header>
          刘能
        </template>

        <!-- 自定义行号列 -->
        <template #id-td="{ index }">
          <span>{{ index + 100 }}</span>
        </template>

        <!-- 自定义 uids 列 -->
        <template #uids-data="{ row, column, index }">
          {{ row.uids }}#uids-data
        </template>

        <template #status-data="{ row, column, index }">
          {{ row.status }}#status-data
        </template>
      </np-table>
    </div>
    <div>
      <h2>头像</h2>
      <AvatarTeam contractor_id="b0188398-c36b-44f9-8373-c3e50da82526" :size="32" />
    </div>
    <div>
      <h2>用户选择</h2>
      <IssuesColumnUser :data="{}" class="border" />
    </div>
    <div>
      <h2>lucide图标</h2>
      <!-- <Icon name="circle-chevron-down" /> -->
      <Icon name="CircleChevronDown" class="text-red-500 w-24 h-24" stroke-width="1" />
    </div>

    <div class="space-x-5">
      <np-button :size="32" shape="square" icon="plus" />
      <np-button :size="64" shape="circle" icon="plus" class="bg-yellow-600" />
      <np-button :size="64" icon="plus">
        默认按钮
      </np-button>
      <np-button :size="64" icon="plus" text class="bg-yellow-600 text-red-500" shape="circle">
        默认按钮
      </np-button>
    </div>
  </div>
</template>
