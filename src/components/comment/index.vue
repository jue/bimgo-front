<script setup>
import dayjs from 'dayjs'

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  cate: {
    type: String,
    default: '',
  },
})

const { logs } = storeToRefs(useLogsStore())
const { getLogs } = useLogsStore()

const { issue_columns, task_columns } = storeToRefs(useUserStore())

const columns = computed(() => {
  if (props.cate === 'issue')
    return issue_columns.value
  if (props.cate === 'task')
    return task_columns.value
})

// 所需要查询的action类型
const action = ref('all')

async function getDataByAction(val) {
  if (val === action.value)
    return

  action.value = val
}

watch(() => props.id, async () => {
  getLogs(props.id, props.cate)
})

const cateText = computed(() => {
  if (props.cate === 'task')
    return '任务'
  if (props.cate === 'issue')
    return '问题'
})

const logData = computed(() => {
  if (action.value === 'all')
    return logs.value

  if (action.value === 'logs')
    return logs.value.filter(item => item.action !== 'comment')

  if (action.value === 'comment')
    return logs.value.filter(item => item.action === 'comment')
})
</script>

<template>
  <div>
    <div class="flex items-cente space-x-3">
      <div
        class="text-gray-500 h-6 px-2 flex items-center justify-center rounded cursor-pointer text-xs"
        :class="{ 'font-bold bg-gray-100 text-stone-800': action === 'all' }"
        @click="getDataByAction('all')"
      >
        全部
      </div>
      <div
        class="text-gray-500 h-6 px-2 flex items-center justify-center rounded cursor-pointer text-xs"
        :class="{ 'font-bold bg-gray-100 text-stone-800': action === 'logs' }"
        @click="getDataByAction('logs')"
      >
        只看日志
      </div>
      <div
        class="text-gray-500 h-6 px-2 flex items-center justify-center rounded cursor-pointer text-xs"
        :class="{ 'font-bold bg-gray-100 text-stone-800': action === 'comment' }"
        @click="getDataByAction('comment')"
      >
        只看评论
      </div>
    </div>
    <div class="py-5 w-full overflow-y-auto space-y-4">
      <template v-if="logData.length">
        <div v-for="(item, index) in logData" :key="index" class="flex space-x-4">
          <UserAvatar :uid="item.uid" shape="square" :size="32" />
          <div class="space-y-1 flex-1">
            <div class="space-x-2">
              <span class="font-medium">
                <UserName :uid="item.uid" />
              </span>
              <span class="text-gray-400 text-xs">{{ dayjs(item.created_at).format('MM月DD日') }}</span>
            </div>
            <div class="space-y-2 text-gray-500">
              <!-- 日志开始 -->
              <div v-for="(log, log_index) in item.children" :key="log_index" class="flex items-center">
                <!-- add时 -->
                <div v-if="log.action === 'add'" class="flex-1">
                  添加了新{{ cateText }} <span class="text-zinc-800">{{ log.content?.newVal }}</span>
                </div>

                <!-- update时 -->
                <div v-if="log.action === 'update'" class="flex items-center">
                  <!-- 更新执行人 -->
                  <template v-if="log.content?.field === 'uids'">
                    更新了执行人
                    <span class="text-zinc-800 px-1 inline-flex items-center space-x-0.5">
                      <UserAvatarGroup v-if="log.content?.newVal.length" :uids="log.content?.newVal" />
                      <span v-else>空</span>
                    </span>
                  </template>

                  <template v-else>
                    <span v-if="log.content?.field === 'description'">
                      更新了{{ cateText }}描述
                    <!-- <span class="italic text-gray-300 text-xs">(仅管理员可见)</span> -->
                    </span>
                    <template v-else>
                      <template v-if="log.content?.newVal === 'archive'">
                        <span class="font-medium text-zinc-900">归档了该{{ cateText }}</span>
                      </template>
                      <template v-else-if="log.content?.newVal === 'delete'">
                        <span class="text-red-500">删除了该{{ cateText }}</span>
                      </template>
                      <template v-else>
                        将<span>{{ columns.find(item => item.value === log.content?.field)?.label }}</span>变更为<span class="text-zinc-800 px-1">
                          <template v-if="columns.find(item => item.value === log.content?.field)?.options">
                            <div
                              class="text-xs h-6 flex items-center px-2 rounded" :style="{
                                borderColor: `${columns.find(item => item.value === log.content?.field)?.options.find(item => item.value
                                  === log.content?.newVal)?.color}`,
                                backgroundColor: `${columns.find(item => item.value === log.content?.field)?.options.find(item => item.value
                                  === log.content?.newVal)?.color}10`,
                                color: `${columns.find(item => item.value === log.content?.field)?.options.find(item => item.value
                                  === log.content?.newVal)?.color}` }"
                            >
                              {{ columns.find(item => item.value === log.content?.field)?.options.find(item => item.value
                                === log.content?.newVal)?.label }}
                            </div>
                          </template>
                          <template v-else>{{ log.content?.newVal || '空' }}</template>
                        </span>
                      </template>
                    </template>
                  </template>
                </div>

                <div v-if="log.action === 'upload'" class="flex-1 space-y-1">
                  <div>添加了新内容:</div>
                  <div v-if="log.content?.newVal" class="px-4 py-3 bg-gray-100 rounded-lg">
                    {{ log.content?.newVal }}
                  </div>
                  <div v-if="log.content?.files?.length" class="px-4 py-3 bg-gray-100 rounded-lg">
                    <FileList :files="log.content?.files" @deleted="getLogs(id, cate)" />
                  </div>
                </div>

                <div v-if="log.action === 'remove'" class="flex-1 space-y-1">
                  <div>删除了文件:</div>
                  <div v-if="log.content?.newVal" class="px-4 py-3 bg-gray-100 rounded-lg">
                    {{ log.content?.newVal }}
                  </div>
                  <div v-if="log.content?.files?.length" class="px-4 py-3 bg-gray-100 rounded-lg">
                    <FileList :files="log.content?.files" @deleted="getLogs(id, cate)" />
                  </div>
                </div>

                <span class="text-xs text-gray-400/75 ml-4">{{ dayjs(log.created_at).format('hh:mm') }}</span>
              </div>
            <!-- 日志结束 -->
            </div>
          </div>
        </div>
      </template>
      <div v-else class="flex items-center justify-center h-10 border border-dashed rounded">
        <span class="text-gray-400">暂无日志</span>
      </div>
      <!-- <pre>
        {{ logs }}
      </pre> -->
    </div>
  </div>
</template>
