<script setup>
import dayjs from 'dayjs'

const props = defineProps({
  action: {
    type: String,
    default: 'create', // view 查看 create 创建
  },
  cate: {
    type: String,
    default: 'issue', // issue 任务 task 任务
  },
})

const emit = defineEmits(['refresh', 'close'])

const data = ref({
  title: '',
  description: '',
  priority: 1,
  status: 'todo',
  uids: [],
})
const nextCreate = ref(false)

async function createData() {
  const url = props.cate === 'issue' ? '/issue/create' : '/task/create'

  const { data: res } = await http.post(url, data.value)
  if (res.code === 200) {
    if (!nextCreate.value) { emit('close') }

    else {
      data.value = {
        title: '',
        description: '',
        priority: 1,
        status: 'todo',
        uids: [],
      }
    }
  }
}
</script>

<template>
  <div class="flex min-h-[800px] rounded-lg overflow-hidden">
    <div class="flex-1 py-4 px-6 flex flex-col w-2/3 space-y-5">
      <div class="font-medium">
        {{ action === 'view' ? '查看' : '创建' }}{{ type === 'issue' ? '问题' : '任务' }}
      </div>

      <GlobalColumnTitle v-model="data.title" class="text-xl w-full" size="large" />
      <!-- 仅task任务显示 -->
      <div v-if="action === 'view'" class="flex items-center space-x-2">
        <el-button plain class="h-7">
          <div class="flex items-center space-x-1 text-[13px] text-neutral-600">
            <span class="icon-[lucide--edit] text-[13px]" />
            <span>编辑描述</span>
          </div>
        </el-button>
        <el-button plain class="h-7">
          <div class="flex items-center space-x-1 text-[13px] text-neutral-600">
            <span class="icon-[lucide--upload] text-[13px]" />
            <span>上传附件</span>
          </div>
        </el-button>
        <el-button plain class="h-7">
          <div class="flex items-center space-x-1 text-[13px] text-neutral-600">
            <span class="icon-[lucide--upload] text-[13px]" />
            <span>分解任务</span>
          </div>
        </el-button>
        <el-button plain class="h-7">
          <div class="flex items-center space-x-1 text-[13px] text-neutral-600">
            <span class="icon-[lucide--upload] text-[13px]" />
            <span>关联模型</span>
          </div>
        </el-button>
      </div>
      <div class="flex-1 break-words">
        <np-editor v-if="action === 'create'" v-model="data.description" />
        <template v-else>
          <div v-html="data.description" />
        </template>

        <pre>{{ data }}</pre>
      </div>
      <div class="flex items-center space-x-3">
        <Button :label="`创建${type === 'task' ? '任务' : '问题'}`" raised severity="secondary" @click="createData" />

        <Button label="取消" raised severity="secondary" outlined @click="emit('close')" />

        <div class="flex items-center space-x-1">
          <InputSwitch v-model="nextCreate" />
          <div class="text-neutral-500">
            继续创建下一个
          </div>
        </div>
      </div>
    </div>
    <div class="border-l bg-gray-50/80 w-1/3 min-w-60 pr-6 pl-4 py-4 space-y-2 shrink-0">
      <div class="space-y-1 py-2">
        <div class="text-gray-400 text-xs font-medium px-3">
          执行人
        </div>
        <GlobalColumnUids v-model="data.uids" class="h-10" />
      </div>

      <div class="space-y-1 py-3">
        <div class="text-gray-400 text-xs font-medium px-3">
          状态
        </div>
        <GlobalColumnStatus v-model="data.status" :type="type" class="h-10" />
      </div>

      <div class="space-y-1 py-3">
        <div class="text-gray-400 text-xs font-medium px-3">
          优先级
        </div>
        <GlobalColumnPriority v-model="data.priority" :type="type" class="h-10 flex items-center" />
      </div>

      <div class="space-y-1 py-3">
        <div class="text-gray-400 text-xs font-medium px-2">
          开始日期
        </div>
        <GlobalColumnDate v-model="data.start_time" field="start_time" :data="data" class="h-10 !w-full hover:bg-gray-100 rounded-md" />
      </div>

      <div v-if="type === 'task'" class="space-y-1 py-3">
        <div class="text-gray-400 text-xs font-medium px-2">
          结束日期
        </div>
        <GlobalColumnDate v-model="data.end_time" field="end_time" :data="data" class="h-10 !w-full hover:bg-gray-100 rounded-md" />
      </div>

      <template v-if="action !== 'create'">
        <div class="space-y-1 py-2">
          <div class="text-gray-400 text-xs font-medium px-2">
            实际完成日期
          </div>
          <IssuesItemDate v-model="data.done_time" field="done_time" :data="data" class="hover:bg-gray-100 px-2 !h-10 rounded-lg" />
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
            <UserName :uid="data.uid" />
          </span>于 {{ dayjs(data.created_time).format('YYYY-MM-DD HH:mm') }} 创建
        </div>
      </template>

      <!-- end -->
    </div>
  </div>
</template>
