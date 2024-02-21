<script setup>
import { formatDate } from '@/lib/index'

// 从你的日期工具文件中导入 formatDate 函数

const props = defineProps({
  uid: {
    type: String,
    required: true,
  },
})

const { getStateLabel } = useSettingsStore()
const isEdit = ref(false)

const { uid } = toRefs(props)
const user = ref({})
async function getUserInfo() {
  const { data: res } = await http.post('/user/info', {
    uid: uid.value,
  })
  if (res.code === 200)
    user.value = res.data
}

watch(uid, () => {
  isEdit.value = false
  if (uid.value)
    getUserInfo()
}, { immediate: true })
</script>

<template>
  <div class="flex flex-col space-y-6">
    <div class="text-center mt-2">
      <el-avatar :src="user?.avatar" :size="90" class="border">
        <div class="text-5xl">
          {{ user?.realname?.charAt(0) }}
        </div>
      </el-avatar>
    </div>
    <div class="text-center !mt-2">
      <div class="text-xl font-medium">
        {{ user?.realname }}
      </div>
      <!-- <div class="text-gray-500/60">
        加入日期 {{ formatDate(user?.created_at) }}
      </div> -->
    </div>
    <div v-if="!isEdit">
      <div class="space-y-4 text-xs">
        <div class="flex items-center">
          <div class="text-gray-500/60 ml-2 w-1/3">
            使用者类型
          </div>
          <div class="flex-1 flex items-center space-x-4">
            <span>{{ getStateLabel('defaultUserGroup', user?.group) }}</span>
            <span class="icon-[lucide--edit] text-gray-400" />
          </div>
        </div>
        <div class="flex items-center">
          <div class="text-gray-500/60 ml-2 w-1/3">
            手机号
          </div>
          <div class="flex-1">
            {{ user?.mobile }}
          </div>
        </div>
        <div class="flex items-center">
          <div class="text-gray-500/60 ml-2 w-1/3">
            所属承包单位
          </div>
          <div class="flex-1">
            {{ formatDate(user?.created_at) }}
          </div>
        </div>
        <div class="flex items-center">
          <div class="text-gray-500/60 ml-2 w-1/3">
            加入时间
          </div>
          <div class="flex-1">
            {{ formatDate(user?.created_at) }}
          </div>
        </div>
      </div>

      <div class="flex items-center space-x-4 mt-5">
        <el-button bg text @click="isEdit = !isEdit">
          编辑资料
        </el-button>
        <el-button type="danger">
          删除
        </el-button>
      </div>
    </div>

    <UserInfoEdit
      v-else
      :user="user"
      @cancel="isEdit = !isEdit"
    />
  </div>
</template>
