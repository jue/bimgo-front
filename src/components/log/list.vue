<script setup>
import dayjs from 'dayjs'

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  cate: {
    type: String,
    default: 'issue',
  },
})

const { issue_columns } = storeToRefs(useUserStore())

const dataList = ref([])
const isLoading = ref(false)

async function getDataList() {
  isLoading.value = true
  const { data: res } = await http.post('/logs/list', {
    id: props.id,
    cate: props.cate,
  })
  dataList.value = res.code === 200 ? res.data : [] // 处理潜在错误

  isLoading.value = false
}

// onMounted(() => {
//   getDataList()
// })

watch(() => props.id, () => {
  getDataList()
})

function getItem(field, value) {
  return issue_columns[field]?.options.find(item => item.value === value)
}
</script>

<template>
  <div class="w-full overflow-y-auto space-y-4">
    <div v-for="(item, index) in dataList" :key="index" class="flex space-x-4">
      <UserAvatar :uid="item.uid" :size="32" shape="square" />
      <div class="space-y-1">
        <div class="space-x-2">
          <span class="font-medium">
            <UserName :uid="item.uid" />
          </span>
          <span class="text-gray-400 text-xs">{{ dayjs(item.created_at).format('MM月DD日') }}</span>
        </div>
        <div class="space-y-2 text-gray-500">
          <!-- 日志列表开始 -->
          <div
            v-for="(log, log_index) in item.children" :key="log_index" class="flex items-center"
            @click="console.log(log)"
          >
            <div v-if="log.action === 'add'" class="flex-1">
              添加了新问题 <span class="text-zinc-800">{{ log.content?.newVal }}</span>
            </div>

            <div v-if="log.action === 'update'" class="flex items-center">
              <template v-if="log.content?.field === 'uids'">
                <span v-if="log.content?.action === 'add'" class="text-zinc-800">添加</span>
                <span v-if="log.content?.action === 'delete'" class="text-red-500">移除</span>
                了成员
                <span class="text-zinc-800 px-1 inline-flex items-center space-x-0.5">
                  <UserAvatar :uid="log.content?.newVal" :size="18" />
                  <UserName :uid="log.content?.newVal" />
                </span>
              </template>
              <template v-else>
                将<span>{{ issue_columns[log.content?.field]?.label }}</span>变更为<span class="text-zinc-800 px-1">
                  <template v-if="issue_columns[log.content?.field].options">
                    <div
                      class="text-xs border h-6 flex items-center px-2 rounded-full" :style="{
                        borderColor: `${issue_columns[log.content?.field].options.find(item => item.value
                          === log.content?.newVal)?.color}`,
                        backgroundColor: `${issue_columns[log.content?.field].options.find(item => item.value
                          === log.content?.newVal)?.color}10`,
                        color: `${issue_columns[log.content?.field].options.find(item => item.value
                          === log.content?.newVal)?.color}` }"
                    >
                      {{ issue_columns[log.content?.field].options.find(item => item.value
                        === log.content?.newVal)?.label }}
                    </div>
                  </template>
                  <template v-else>{{ log.content?.newVal }}</template>
                </span>
              </template>
            </div>
            <span class="text-xs text-gray-400/75 ml-4">{{ dayjs(log.created_at).format('hh:mm') }}</span>
          </div>
          <!-- 日志列表结束 -->
        </div>
      </div>
    </div>
  </div>
</template>
