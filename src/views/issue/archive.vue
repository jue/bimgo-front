<script setup>
import dayjs from 'dayjs'

const router = useRouter()

const form = reactive({
  key: '',
})

const dataList = ref([])
const iids = ref([])

async function getDataList() {
  const { data: res } = await http.post('/issue/list/archive', form)
  if (res.code === 200) {
    dataList.value = res.data
    iids.value = res.data.map(item => item.iid)
  }
}

const fetchData = debounce(() => {
  getDataList()
}, 800)

onMounted(() => {
  getDataList()
})

const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedIssues = ref([])

function handleCheckAllChange(val) {
  checkedIssues.value = val ? iids.value : []
  isIndeterminate.value = false
}

function handleClick(type, issue) {
  const text = type === 'restore' ? '恢复' : '删除'
  const statusVal = type === 'restore' ? JSON.parse(issue.log[0]?.content)?.oldVal : 'delete'

  ElMessageBox.confirm(`确定要${text}吗?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const { data: res } = await http.post('/issue/update/status', {
      status: statusVal,
      iid: issue.iid,
    })
    if (res.code === 200)
      getDataList()
  }).catch(() => {

  })
}
</script>

<template>
  <div>
    <div class="h-12">
      <div class="flex items-center px-5">
        <el-button text @click="router.push('/issue')">
          <span class="icon-[lucide--arrow-left]" />
          <span>返回</span>
        </el-button>
      </div>
    </div>

    <div class="max-w-[1000px] w-full mx-auto">
      <div>
        <el-input v-model="form.key" placeholder="按问题名搜索" clearable class="w-full" @input="fetchData">
          <template #prefix>
            <span class="icon-[lucide--list-filter] text-gray-500" />
          </template>
        </el-input>
      </div>

      <div class="py-5">
        <div class="border rounded-lg">
          <div class="flex items-center bg-gray-100 h-12 px-4 rounded-t-lg">
            <div class="w-5">
              <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange" />
            </div>
            <div class="flex items-center p-2">
              <span>{{ dataList.length }}</span> <span class="font-medium">条存档问题</span>
            </div>
          </div>

          <div v-for="item in dataList" :key="item.iid" class="flex items-center px-4 border-t">
            <div class="w-5">
              <el-checkbox />
            </div>
            <div class="flex-1 p-2">
              <div class="space-y-0.5">
                <div class="text-gray-600">
                  {{ item.title }}
                </div>
                <div class="text-xs flex items-center text-gray-400">
                  <span>该问题于</span>
                  <UserName :uid="item.log[0]?.uid" />
                  <span>于{{ dayjs(item.created_time).format('YYYY-MM-DD HH:mm') }}存档</span>
                </div>
              </div>
            </div>

            <el-dropdown trigger="click">
              <el-button text class="w-6 h-6 p-0">
                <span class="icon-[lucide--ellipsis]" />
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleClick('restore', item)">
                    <span class="icon-[lucide--archive-restore] mr-2" />
                    <span>恢复</span>
                  </el-dropdown-item>
                  <el-dropdown-item class="!text-red-500" @click="handleClick('delete', item)">
                    <span class="icon-[lucide--trash] mr-2" />
                    <span>删除</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
