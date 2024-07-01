<script setup>
import { useDialog } from 'primevue/usedialog'

const dialog = useDialog()
const Invitation = defineAsyncComponent(() => import('@/components/user/Invitation.vue'))
const { getStateLabel, getContractorsLabel } = useSettingsStore()
const route = useRoute()

const settingsStore = useSettingsStore()
const { contractors } = storeToRefs(settingsStore)

const loading = ref(true)
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
  status: [],
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

// 改变用户状态
async function changeUserStatus(uid, status) {
  const { data: res } = await http.post('/user/info/update', {
    uid,
    status,
  })
  if (res.code === 200)
    getUsers()
}

async function getUsers() {
  loading.value = true
  const { data: res } = await http.post('/user/list', form)
  if (res.code === 200) {
    userData.value = res.data
    form.total = res.total
  }

  loading.value = false
}

const contractor = ref({})
async function getContractorDetail() {
  const { data: res } = await http.post('/contractor/detail', {
    contractor_id: route.query.contractor,
  })
  contractor.value = res.data
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

  if (route.query.contractor)
    getContractorDetail()
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

defineExpose({
  getUsers,
})

function handleInvitation() {
  dialog.open(Invitation, {
    props: {
      header: '邀请人员加入',
      modal: true,
    },
  })
}

function statusType(val) {
  if (val === 1)
    return 'primary'

  else if (val === 2)
    return 'danger'

  else if (val === 3)
    return 'warning'
}
</script>

<template>
  <div class="app-container">
    <div class="px-4">
      <div class="h-12 flex items-center justify-between">
        <div class="flex items-center">
          <div class="text-lg font-semibold shrink-0 mr-2">
            <span>成员列表</span> <span class="text-zinc-500">({{ form.total }})</span>
          </div>
          <el-button class="w-full text-xs" text type="primary" @click="handleInvitation">
            <span class="icon-[lucide--user-round-plus] mr-1" />
            邀请新的使用者
          </el-button>
        </div>

        <div class="flex items-center space-x-2">
          <el-select v-model="form.status" multiple placeholder="用户状态" class="!max-w-60 !min-w-40" @change="searchByKey">
            <el-option label="活跃" :value="1" />
            <el-option label="禁用" :value="2" />
            <el-option label="未激活" :value="3" />
          </el-select>
          <el-input v-model="form.key" placeholder="按名称或手机号搜索" clearable class="!w-80 shrink-0" @input="searchByKey">
            <template #prefix>
              <i class="icon-[lucide--search]" />
            </template>
          </el-input>
        </div>
      </div>
      <!-- <div v-if="route.query.contractor">
        <pre>
          {{ contractor }}
        </pre>
      </div> -->
    </div>

    <div class="flex-1 w-full">
      <el-table
        ref="multipleTableRef" v-loading="loading" row-key="id" highlight-current-row height="100%"
        :data="userData" stripe @selection-change="handleSelectionChange" @current-change="handleCurrentChange"
      >
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
          }" width="120"
        />
        <el-table-column prop="group" label="承包单位" show-overflow-tooltip>
          <template #default="scope">
            <span v-for="(item, index) in scope.row.user_contractors" :key="item.contractor_id">
              {{ getContractorsLabel(item.contractor_id)?.contractor_name }}<span
                v-if="index < scope.row.user_contractors.length - 1"
              >, </span>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="statusType(scope.row.status)">
              {{ getStateLabel('userStatus', scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="300">
          <template #default="scope">
            <div class="flex items-center space-x-0 w-full justify-end" @click.stop="">
              <el-button v-if="scope.row.status === 3" size="small" text type="primary" class="px-1" @click="changeUserStatus(scope.row.uid, 1)">
                激活
              </el-button>

              <el-button v-if="scope.row.status === 2" size="small" text type="primary" class="px-1" @click="changeUserStatus(scope.row.uid, 1)">
                启用
              </el-button>

              <el-button v-if="scope.row.status === 1" size="small" text type="danger" class="px-1" @click="changeUserStatus(scope.row.uid, 2)">
                禁用
              </el-button>

              <user-select-group v-model="scope.row.group" :uid="scope.row.uid">
                <el-button size="small" text type="primary" class="px-1">
                  关联系统分组
                </el-button>
              </user-select-group>
              <user-select-contractor
                v-model="scope.row.user_contractors" :contractors="contractors"
                :uid="scope.row.uid"
              >
                <el-button size="small" text type="primary" class="px-1">
                  关联承包商
                </el-button>
              </user-select-contractor>
              <!-- <el-dropdown class="ml-2" trigger="click" @click.stop="">
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
              </el-dropdown> -->
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="py-1 flex justify-end h-12 px-4">
      <el-pagination
        v-model:current-page="form.page" v-model:page-size="form.pageSize" background
        :total="form.total" layout="total, prev, pager, next" @current-change="getUsers"
      />
    </div>

    <el-drawer
      v-model="drawerVisible" title="用户信息" :with-header="false" :modal="true"
      @close="multipleTableRef.setCurrentRow()"
    >
      <user-info :uid="currentRow?.uid || ''" />
    </el-drawer>
  </div>
</template>
