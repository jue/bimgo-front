<script setup>
import dayjs from 'dayjs'

const emit = defineEmits(['refresh', 'close'])

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

function handleClick(type) {
  const text = type === 'archive' ? '归档' : '删除'
  ElMessageBox.confirm(`确定要${text}吗?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const { data: res } = await http.post('/issue/update/status', {
      status: type,
      iid: iid.value,
    })
    if (res.code === 200)
      emit('close')
  }).catch(() => {

  })
}
</script>

<template>
  <div class="flex space-x-4 px-4 h-full">
    <div class="flex-1 flex flex-col">
      <div class="py-4">
        <IssuesColumnInput :data="issueData" class="text-xl" />
      </div>
      <el-scrollbar class="flex-1">
        <div class="flex-1 flex flex-col space-y-5">
          <div>
            <IssuesColumnDescription :data="issueData" />

            <!-- <np-editor v-model="issueData.description" />
            {{ issueData.description || '' }}
            <span class="text-gray-400 cursor-pointer">些问题还没有描述，点击添加。</span> -->
          </div>

          <file-list :id="issueData.iid" cate="issue" />
          <LogList :id="issueData.iid" cate="issue" />
        </div>
      </el-scrollbar>
      <div class="pt-4 pb-8">
        <CommentSection :id="issueData.iid" cate="issue" />
      </div>
    </div>

    <div class="w-72 shrink-0 space-y-2">
      <div class="space-y-1 border-b py-2">
        <div class="text-gray-400 text-xs font-medium px-2">
          执行人
        </div>
        <IssuesColumnUser :data="issueData" class="hover:bg-gray-100 px-2 h-10 rounded-lg" />
      </div>

      <div class="space-y-1 border-b py-2">
        <div class="text-gray-400 text-xs font-medium px-2">
          状态
        </div>
        <IssuesColumnStatus :data="issueData" class="hover:bg-gray-100 px-2 h-10 rounded-lg" />
      </div>

      <div class="space-y-1 border-b py-2">
        <div class="text-gray-400 text-xs font-medium px-2">
          优先级
        </div>
        <IssuesColumnPriority :data="issueData" class="hover:bg-gray-100 px-2 h-10 rounded-lg" />
      </div>

      <div class="space-y-1 border-b py-2">
        <div class="text-gray-400 text-xs font-medium px-2">
          期望结束日期
        </div>
        <IssuesColumnDate field="end_time" :data="issueData" class="hover:bg-gray-100 px-2 !h-10 rounded-lg" />
      </div>

      <div class="space-y-1 border-b py-2">
        <div class="text-gray-400 text-xs font-medium px-2">
          实际完成日期
        </div>
        <IssuesColumnDate field="done_time" :data="issueData" class="hover:bg-gray-100 px-2 !h-10 rounded-lg" />
      </div>

      <div class="space-y-1 py-2">
        <button
          class="h-7 px-2 w-full flex items-center justify-start text-left hover:bg-gray-100"
          @click="handleClick('archive')"
        >
          <span class="icon-[lucide--archive] mr-2" />
          <span>归档</span>
        </button>

        <button
          class="h-7 px-2 w-full flex items-center justify-start  text-left text-red-500 hover:bg-red-50 hover:text-red-500"
          @click="handleClick('delete')"
        >
          <span class="icon-[lucide--trash] mr-2" />
          <span>删除</span>
        </button>
      </div>

      <div class="flex items-center text-gray-400 text-xs">
        该问题由 <span class="flex items-center">
          <UserName :uid="issueData.uid" />
        </span>于 {{ dayjs(issueData.created_time).format('YYYY-MM-DD HH:mm') }} 创建
      </div>

      <!-- end -->
    </div>
  </div>
</template>
