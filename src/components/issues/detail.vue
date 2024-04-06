<script setup>
import dayjs from 'dayjs'

const route = useRoute()

const iid = ref(route.query.iid || '')
const issueData = ref({})

async function getTaskDetail(id = '') {
  if (id)
    iid.value = id

  const { data: res } = await http.post('/issue/detail', {
    iid: iid.value,
  })
  if (res.code === 200)
    issueData.value = res.data
}

onMounted(() => {
  if (iid.value)
    getTaskDetail(iid.value)
})

defineExpose({
  getTaskDetail,
})
</script>

<template>
  <div class="flex flex-col h-full max-w-[750px]">
    <div class="flex items-center justify-between h-14 px-4">
      <div class="text-xl">
        {{ issueData.title }}
      </div>
      <div>
        <np-button icon="pen" shape="square" class="hover:bg-gray-100" />
      </div>
    </div>

    <div class="py-2 px-7 space-y-2">
      <div class="flex items-center min-h-9">
        <div class="w-44 flex items-center space-x-2 text-gray-400">
          <span class="icon-[lucide--check-square-2]" />
          <div>状态</div>
        </div>
        <div class="min-w-48">
          <IssuesColumnStatus :data="issueData" />
        </div>
      </div>

      <div class="flex items-center min-h-9">
        <div class="w-44 flex items-center space-x-2 text-gray-400">
          <span class="icon-[lucide--users]" />
          <div>执行人</div>
        </div>
        <div class="min-w-48 flex items-center">
          <IssuesColumnUser :data="issueData" />
        </div>
      </div>

      <div class="flex items-center min-h-9">
        <div class="w-44 flex items-center space-x-2 text-gray-400">
          <span class="icon-[lucide--users]" />
          <div>
            优先级
          </div>
        </div>
        <div class="min-w-48">
          <IssuesColumnPriority :data="issueData" />
        </div>
      </div>

      <div class="flex items-center min-h-9">
        <div class="w-44 flex items-center space-x-2 text-gray-400">
          <span class="icon-[lucide--calendar]" />
          <div>
            期望结束日期
          </div>
        </div>
        <div class="min-w-48 h-9">
          <IssuesColumnDate :data="issueData" field="end_time" />
        </div>
      </div>

      <div class="flex items-center min-h-9">
        <div class="w-44 flex items-center space-x-2 text-gray-400">
          <span class="icon-[lucide--calendar-check]" />
          <div>
            实际完成日期
          </div>
        </div>
        <div class="min-w-48 h-9">
          <IssuesColumnDate :data="issueData" field="done_time" class="min-w-40" />
        </div>
      </div>

      <div class="flex items-center min-h-9">
        <div class="w-44 flex items-center space-x-2 text-gray-400">
          <span class="icon-[lucide--user]" />
          <div>
            创建人
          </div>
        </div>
        <div class="flex items-center min-w-48">
          <UserAvatar :uid="issueData.uid" :size="24" />
          <UserName :uid="issueData.uid" />
        </div>
      </div>

      <div class="flex items-center min-h-9">
        <div class="w-44 flex items-center space-x-2 text-gray-400">
          <span class="icon-[lucide--clock-7]" />
          <div>
            创建时间
          </div>
        </div>
        <div class="flex items-center min-w-48">
          {{ dayjs(issueData.created_at).format('YYYY-MM-DD HH:mm') }}
        </div>
      </div>

      <!-- 分割线 -->
    </div>
    <pre>
      {{ issueData }}
    </pre>
  </div>
</template>

<style scoped lang="scss">
:deep(.task-title) {
  .el-input__wrapper {
    @apply shadow-none hover:bg-gray-100;
  }
}
</style>
