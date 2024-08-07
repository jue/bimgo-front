<script setup>
const settingsStore = useSettingsStore()
const { defaultUserGroup, getContractors } = settingsStore
const { contractors } = storeToRefs(settingsStore)

const router = useRouter()
const route = useRoute()

const activeGroup = ref(route.query.group || route.query.contractor || 'all')

const contractorsAddRef = ref(null)
// const contractors = ref([])
function selectGroup(id) {
  if (id === activeGroup.value)
    return
  activeGroup.value = id
  router.push({ name: 'contractors', query: { group: id } })
}

function selectContractor(val) {
  if (val !== activeGroup.value) {
    activeGroup.value = val
    router.push({ name: 'contractors', query: { contractor: val } })
  }
}

function editContractor(data = null) {
  contractorsAddRef.value.open(data)
}

function deleteContractor(data) {
  ElMessageBox.confirm(
    `确定删除 ${data.contractor_name} 吗？`,
    '提示',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    },
  )
    .then(async () => {
      const { data: res } = await http.post('/contractor/delete', {
        contractor_id: data.contractor_id,
      })
      if (res.code === 200) {
        getContractors()
        ElMessage.success('删除成功')
      }
    })
    .catch(() => {
    })
}
</script>

<template>
  <div class="app-container flex-row bg-white border border-l-0">
    <div class="w-60 shrink-0 px-2 border-r">
      <div class="flex items-center justify-between h-12 px-2">
        <div class="font-bold text-base">
          用户组
        </div>
      </div>

      <div>
        <div class="text-xs text-gray-400 px-3 pt-5 pb-2">
          系统分组
        </div>

        <div class="space-y-1">
          <div
            class="px-3 h-[34px] flex items-center hover:bg-gray-100 cursor-pointer rounded-md"
            :class="{ 'bg-gray-100 text-emerald-500': activeGroup === 'all' }"
            @click="selectGroup('all')"
          >
            所有用户
          </div>
          <div
            v-for="item in defaultUserGroup" :key="item.value"
            class="px-3 h-[34px] flex items-center hover:bg-gray-100 cursor-pointer rounded-md"
            :class="{ 'bg-gray-100 text-emerald-500': item.value === activeGroup }"
            @click="selectGroup(item.value)"
          >
            {{ item.label }}
          </div>
        </div>
      </div>

      <div class="mt-10">
        <div class="flex items-center justify-between h-12 px-3">
          <div class="font-bold text-base">
            承包单位
          </div>
          <el-tooltip content="添加承包单位">
            <el-button circle size="small" @click="editContractor('')">
              <span class="icon-[lucide--plus]" />
            </el-button>
          </el-tooltip>
        </div>
        <div class="text-xs text-gray-400 px-3 pt-5 pb-2">
          单位列表
        </div>
        <div class="space-y-1">
          <div
            v-for="item in contractors" :key="item.value"
            class="px-3 h-[34px] flex items-center hover:bg-gray-100 cursor-pointer rounded-md group"
            :class="{ 'bg-gray-100 text-emerald-500': item.contractor_id === activeGroup }"
            @click="selectContractor(item.contractor_id)"
          >
            <div class="flex-1">
              {{ item.contractor_name }}
            </div>
            <div class="opacity-0 group-hover:opacity-100 flex items-center">
              <el-dropdown trigger="click">
                <span class="icon-[lucide--more-vertical]" />
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="editContractor(item)">
                      <span class="icon-[lucide--edit] mr-2" /> 编辑
                    </el-dropdown-item>
                    <el-dropdown-item @click="deleteContractor(item)">
                      <div class="flex items-center text-red-500">
                        <span class="icon-[lucide--trash] mr-2" /> 删除
                      </div>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1">
      <RouterView />
    </div>
  </div>

  <ContractorsAdd ref="contractorsAddRef" />
</template>
