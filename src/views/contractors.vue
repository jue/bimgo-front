<script setup>
import More from './contractors/components/more.vue'

const settingsStore = useSettingsStore()
const { defaultUserGroup, getContractors } = settingsStore
const { contractors } = storeToRefs(settingsStore)

const router = useRouter()
const route = useRoute()
const routerViewRef = ref(null)

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
</script>

<template>
  <div class="flex flex-1 px-4 space-x-4">
    <div class="w-60 shrink-0">
      <div class="flex items-center justify-between h-12 px-3">
        <div class="font-bold text-base">
          用户组
        </div>
      </div>

      <div>
        <div
          class="px-3 h-[34px] flex items-center hover:bg-gray-100 cursor-pointer rounded-md"
          :class="{ 'bg-gray-100 text-blue-600': activeGroup === 'all' }" @click="selectGroup('all')"
        >
          所有使用者
        </div>
        <div class="text-xs text-gray-400 px-3 pt-5 pb-2">
          系统分组
        </div>
        <div class="space-y-1">
          <div
            v-for="item in defaultUserGroup" :key="item.value"
            class="px-3 h-[34px] flex items-center hover:bg-gray-100 cursor-pointer rounded-md"
            :class="{ 'bg-gray-100 text-blue-600': item.value === activeGroup }" @click="selectGroup(item.value)"
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
            class="pr-2 pl-1 h-[34px] flex items-center hover:bg-gray-100 cursor-pointer rounded-md group"
            :class="{ 'bg-gray-100 text-blue-600': item.contractor_id === activeGroup }"
            @click="selectContractor(item.contractor_id)"
          >
            <div class="flex-1 flex items-center space-x-1">
              <AvatarTeam :contractor_id="item.contractor_id" />
              <div>{{ item.contractor_name }}</div>
            </div>
            <More :team="item" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1">
      <RouterView ref="routerViewRef" />
    </div>
  </div>
</template>
