<script setup>
const settingsStore = useSettingsStore()
const defaultUserGroup = settingsStore.defaultUserGroup

const activeGroup = ref(0)
function selectGroup(id) {
  activeGroup.value = id
}
</script>

<template>
  <div class="flex flex-1 px-4 space-x-4">
    <div class="w-60">
      <div class="flex items-center justify-between h-12 px-3">
        <div class="font-bold text-base">
          用户组
        </div>
      </div>

      <div>
        <div
          class="px-3 h-[34px] flex items-center hover:bg-gray-100 cursor-pointer rounded-md"
          :class="{ 'bg-gray-100 text-blue-600': activeGroup === 0 }"
          @click="selectGroup(0)"
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
            :class="{ 'bg-gray-100 text-blue-600': item.value === activeGroup }"
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
            <el-button circle size="small">
              <span class="icon-[lucide--plus]" />
            </el-button>
          </el-tooltip>
        </div>
        <div class="text-xs text-gray-400 px-3 pt-5 pb-2">
          单位列表
        </div>
        <div class="space-y-1">
          <div
            v-for="item in defaultUserGroup" :key="item.value"
            class="px-3 h-[34px] flex items-center hover:bg-gray-100 cursor-pointer rounded-md"
            :class="{ 'bg-gray-100 text-blue-600': item.value === activeGroup }"
            @click="selectGroup(item.value)"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1">
      <RouterView />
    </div>
  </div>
</template>
