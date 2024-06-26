<script setup>
import { nanoid } from 'nanoid'
import dayjs from 'dayjs'

const router = useRouter()

function toEdit(val) {
  const rid = val || nanoid()
  router.push(`/report/edit?rid=${rid}`)
}

const loading = ref(false)
const dataList = ref({
  data: [],
  total: 0,
})

const payload = reactive({
  page: 1,
  pageSize: 10,
})

// 获取所有执行列表
async function getDataList() {
  loading.value = true
  const { data: res } = await http.post('/report/list', payload)
  if (res.code === 200) {
    dataList.value.data = res.data
    dataList.value.total = res.total
  }

  loading.value = false
}

onMounted(() => {
  getDataList()
})

// 多选
const selection = ref([])
function handleSelectionChange(val) {
  selection.value = val.map(item => item.rid)
}

// 切页
function handleCurrentChange(val) {
  payload.page = val
  getDataList()
}

// 删除日报
function handleDelete(val) {
  const arr = toRaw(val)

  ElMessageBox.confirm(
    '确定删除所选的报告吗?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    },
  ).then(async () => {
    const { data: res } = await http.post('/report/delete', {
      rids: arr,
    })
    if (res.code === 200) {
      ElMessage.success('删除成功')
      getDataList()
    }
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}
</script>

<template>
  <div class="app-container w-[1000px]">
    <div class="flex items-center justify-between box-shadow-bottom h-12 px-5">
      <div class="font-bold">
        工程报告 ({{ dataList.total }})
      </div>
      <div class="flex items-center space-x-2">
        <template v-if="selection.length">
          <span><span class="font-bold">{{ selection.length }}</span>个项目已选择</span>
          <el-button
            label="批量删除"
            type="danger"
            @click="handleDelete(selection)"
          >
            <span class="icon-[lucide--trash-2]" />
            批量删除
          </el-button>
        </template>

        <Button v-else label="创建报告" icon="icon-[lucide--plus]" @click="toEdit('')" />
      </div>
    </div>
    <div class="app-body">
      <el-table
        v-loading="loading"
        :data="dataList.data"
        :style="{ width: '100%' }"
        max-height="100%"
        stripe
        empty-text="没有相关报告数据"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="40" />
        <el-table-column prop="title" label="报告标题" />
        <el-table-column prop="type" label="报告类型">
          <template #default="{ row }">
            <FieldReporttype :reporttype="row.type" />
          </template>
        </el-table-column>
        <el-table-column label="创建人">
          <template #default="{ row }">
            <User :uid="row.uid" />
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间">
          <template #default="{ row }">
            {{ dayjs(row.created_at).format('YYYY-MM-DD HH:mm') }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <div
              class="space-x-1 flex items-center"
            >
              <el-button text type="primary" @click="toEdit(row.rid)">
                编辑
              </el-button>
              <el-button text type="danger" @click="handleDelete([row.rid])">
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="flex items-center justify-end box-shadow-top h-12 px-5">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :total="dataList.total"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
