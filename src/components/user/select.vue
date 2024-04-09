<script setup>
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue'])

const users = ref([])

async function getUserList() {
  const { data: res } = await http.post('/user/list', {
    pageSize: 4,
  })
  if (res.code === 200)
    users.value = res.data
}

const value = ref(props.modelValue)

onMounted(() => {
  getUserList()
})

function selectUser(val) {
  const existingIndex = value.value.findIndex(uid => uid === val)
  if (existingIndex !== -1)
    value.value.splice(existingIndex, 1)

  else
    value.value.push(val)

  emit('update:modelValue', value.value)
}

function getUserInfo(uid) {
  return users.value.find(user => user.uid === uid)
}

watch(() => props.modelValue, (val) => {
  value.value = val
})
</script>

<template>
  <div class="flex items-center">
    <div v-if="value.length" class="flex items-center flex-wrap">
      <div v-for="(uid, index) in value" :key="index" class="group relative">
        <div class="flex items-center shrink-0 mr-2 mb-2 group-hover:bg-gray-200 rounded-full ">
          <el-image :src="getUserInfo(uid)?.avatar" fit="cover" class="w-8 h-8 rounded-full">
            <template #error>
              <div class="bg-gray-300 flex items-center justify-center text-white h-full">
                {{ (getUserInfo(uid)?.realname || getUserInfo(uid)?.nickname)?.slice(0, 1) }}
              </div>
            </template>
          </el-image>
          <div class="space-y-1 px-2">
            <div class="leading-none">
              {{ getUserInfo(uid)?.realname || getUserInfo(uid)?.nickname }}
            </div>
            <!--  -->
          </div>
        </div>
        <div
          class="absolute right-1 -top-1 h-4 w-4 hidden group-hover:flex items-center justify-center rounded-full bg-[#bfbfbf] hover:!bg-black close cursor-pointer"
          @click.stop="selectUser(uid)"
        >
          <span class="text-xs text-white icon-[lucide--x]" />
        </div>
      </div>
    </div>
    <el-dropdown
      v-if="users.filter(user => !value.includes(user.uid)).length " trigger="click"
    >
      <div class="text-blue-600 h-8 flex items-center mb-2">
        <span v-if="!value.length">添加成员</span>
        <el-tooltip v-else content="添加更多">
          <span class="icon-[lucide--plus]" />
        </el-tooltip>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="user in users.filter(user => !value.includes(user.uid))" :key="user.uid"
            @click="selectUser(user.uid)"
          >
            <div class="flex items-center justify-between w-full space-x-4">
              <el-image :src="getUserInfo(user.uid)?.avatar" fit="cover" class="w-8 h-8 rounded-full">
                <template #error>
                  <div class="bg-gray-300 flex items-center justify-center text-white h-full">
                    {{ (getUserInfo(user.uid)?.realname || getUserInfo(user.uid)?.nickname).slice(0, 1) }}
                  </div>
                </template>
              </el-image>
              <div class="flex-1">
                <div>
                  {{ user.realname || user.nickname }}
                </div>
                <div class="text-xs text-gray-500">
                  {{ getUserInfo(user.uid)?.mobile }}
                </div>
              </div>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
