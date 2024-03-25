<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
})
const { users } = storeToRefs(useSettingsStore())

const value = ref(props.data.uids)
const input = ref('')

const filterUsers = computed(() => {
  if (!input.value)
    return users.value.filter(item => item.status !== 0)
  return users.value
    .filter(item => item.realname.includes(input.value) && item.status !== 0)
})

async function changeValue(uid) {
  const { data: res } = await http.post('/issue/update/user', {
    iid: props.data.iid,
    uid,
  })
  if (res.code !== 200)
    value.value = value.value.filter(item => item !== uid)
}

// const handleInput = debounce(async () => {
//   filterUsers.value = input.value ? users.value.filter(item => item.realname.includes(input.value)) : [...users.value]
// }, 3000)
</script>

<template>
  <el-dropdown trigger="click" :hide-on-click="false" class="w-full px-[6px]">
    <div class="flex items-center justify-between w-full ">
      <div class="flex items-center relative pl-2">
        <template v-for="uid in value?.slice(0, 5)" :key="uid">
          <UserAvatar
            :uid="uid" :size="28"
            class="border border-2 border-transparent hover:border-blue-500 -ml-2 z-0 hover:z-10"
          />
        </template>
        <div v-if="value?.length > 5" class="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full">
          +{{ value?.length - 5 }}
        </div>
      </div>
      <span class="icon-[lucide--chevron-down] text-gray-400 hover:bg-gray-800" />
    </div>
    <template #dropdown>
      <el-dropdown-menu class="w-64">
        <div class="py-1">
          <div class="text-xs font-semibold mb-1 px-1">
            选择用户
          </div>
          <div>
            <el-input v-model="input" class="w-full" placeholder="搜索用户" clearable @input="filterUsers">
              <template #prefix>
                <span class="icon-[lucide--search]" />
              </template>
            </el-input>
          </div>
        </div>
        <div class="max-h-64 overflow-y-auto">
          <el-checkbox-group v-model="value">
            <el-dropdown-item v-for="item in filterUsers.filter(item => item.value !== 0)" :key="item.value">
              <el-checkbox :label="item.uid" class="!h-6" @change="changeValue(item.uid)">
                <div class="flex items-center space-x-1">
                  <UserAvatar :uid="item.uid" :size="24" />
                  <div class="text-stone-600">
                    {{ item.realname }}
                  </div>
                </div>
              </el-checkbox>
            </el-dropdown-item>
          </el-checkbox-group>
        </div>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
