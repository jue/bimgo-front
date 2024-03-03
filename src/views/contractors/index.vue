<script setup>
const { getStateLabel, getContractorsLabel } = useSettingsStore()
const route = useRoute()

const settingsStore = useSettingsStore()
const { contractors } = storeToRefs(settingsStore)

const userData = ref([])
const multipleTableRef = ref(null)

const drawerVisible = ref(false)
const form = reactive({
  key: '',
  page: 1,
  pageSize: 20,
  total: 0,
  group: route.query.group,
  contractor_id: route.query.contractor,
})

const currentRow = ref({
  uid: '',
})

// 单选
function handleCurrentChange(val) {
  // drawerVisible.value = true
  currentRow.value = val
}

// 多选
function handleSelectionChange() {

}

async function getUsers() {
  const { data: res } = await http.post('/user/list', form)
  if (res.code === 200) {
    userData.value = res.data
    form.total = res.total
  }
}

const searchByKey = debounce(async () => {
  getUsers()
}, 800)

function deleteUser(data) {
  ElMessageBox.confirm(
    `确定删除 ${data.realname || data.nickname} 吗？`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    },
  )
    .then(async () => {
      const { data: res } = await http.post('/user/delete', {
        uid: data.uid,
      })
      if (res.code === 200)
        getUsers()
    })
    .catch(() => {
    })
}

onMounted(() => {
  getUsers()
})

onBeforeRouteUpdate((to, from, next) => {
  if (to.query.contractor)
    form.contractor_id = to.query.contractor
  else
    delete form.contractor_id

  if (to.query.group)
    form.group = to.query.group
  else
    delete form.group

  if (form.group === 'all')
    delete form.group

  getUsers()

  next()
})
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="px-11">
      <div class="h-11 flex items-center justify-between">
        <div class="text-xl font-bold">
          <span>成员列表</span> <span class="text-zinc-500">({{ form.total }})</span>
          <user-invitation />
        </div>
      </div>
      <div class="mt-3 flex items-center space-x-4">
        <el-input v-model="form.key" placeholder="按名称或手机号搜索" clearable class="!w-80" @input="searchByKey">
          <template #prefix>
            <i class="icon-[lucide--search]" />
          </template>
        </el-input>
        <!-- <np-dropdown>
          <div class="flex items-center space-x-1 hover:text-blue-500">
            <span class="icon-[lucide--filter]" />
            <span class="shrink-0">筛选</span>
          </div>
          <template #dropdown>
            <el-dropdown-item>
              <span class="icon-[lucide--user-plus] mr-2" />jjj
            </el-dropdown-item>
          </template>
        </np-dropdown>
        <el-dropdown>
          <div class="flex items-center space-x-1 hover:text-blue-500">
            <span class="icon-[lucide--flip-horizontal]" />
            <span class="shrink-0">字段</span>
          </div>
          <template #dropdown>
            <el-dropdown-item>
              <span class="icon-[lucide--user-plus] mr-2" />jjj
            </el-dropdown-item>
          </template>
        </el-dropdown> -->
      </div>
    </div>

    <div class="mt-5 flex-1 w-full">
      <el-table ref="multipleTableRef" row-key="id" highlight-current-row height="100%" :data="userData" stripe @selection-change="handleSelectionChange" @current-change="handleCurrentChange">
        <el-table-column type="selection" width="40" />
        <el-table-column prop="realname" label="姓名" width="100">
          <template #default="scope">
            <div class="flex items-center space-x-1">
              <el-avatar :src="scope.row.avatar" :size="24">
                {{ scope.row.realname?.charAt(0) }}
              </el-avatar>
              <span>{{ scope.row.realname || scope.row.nickname }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" width="120" />

        <el-table-column
          prop="group" label="使用者类型" :formatter="(row, column, cellValue, index) => {
            if (cellValue) {
              return getStateLabel('defaultUserGroup', cellValue)
            }
            return '无'
          }"
          width="120"
        />
        <el-table-column prop="group" label="承包单位" show-overflow-tooltip>
          <template #default="scope">
            <span v-for="(item, index) in scope.row.user_contractors" :key="item.contractor_id">
              {{ getContractorsLabel(item.contractor_id)?.contractor_name }}<span v-if="index < scope.row.user_contractors.length - 1">, </span>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            {{ getStateLabel('userStatus', scope.row.status) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="200">
          <template #default="scope">
            <div class="flex items-center space-x-0" @click.stop="">
              <user-select-group v-model="scope.row.group" :uid="scope.row.uid">
                <el-button size="small" text type="primary" class="px-1">
                  关联系统分组
                </el-button>
              </user-select-group>
              <user-select-contractor v-model="scope.row.user_contractors" :contractors="contractors" :uid="scope.row.uid">
                <el-button size="small" text type="primary" class="px-1" :disabled="scope.row.group !== 'contractor'">
                  关联承包商
                </el-button>
              </user-select-contractor>
              <el-dropdown class="ml-2" trigger="click" @click.stop="">
                <el-button size="small" text type="primary" class="px-1">
                  <span class="icon-[lucide--more-vertical]" />
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item class="!text-red-500" @click="deleteUser(scope.row)">
                      删除
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="py-1 flex justify-end">
      <el-pagination
        v-model:current-page="form.page"
        v-model:page-size="form.pageSize"
        background
        small
        :total="form.total"
        layout="total, prev, pager, next"
        @current-change="getUsers"
      />
    </div>

    <el-drawer v-model="drawerVisible" title="用户信息" :with-header="false" :modal="true" @close="multipleTableRef.setCurrentRow()">
      <user-info :uid="currentRow?.uid || ''" />
    </el-drawer>
  </div>
</template>
