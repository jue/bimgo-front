<script setup>
const props = defineProps({
  tid: {
    type: String,
    default: '',
  },
  subTask: {
    type: Array,
    default: () => [],
  },
  task: {
    type: Object,
    default: () => {},
  },
})

const emit = defineEmits(['to'])

const isEdit = ref(false)
const title = ref('')
const input = ref(null)

function changeEdit() {
  isEdit.value = true
  nextTick(() => {
    input.value.focus()
  })
}

function deleteTask(data) {
  ElMessageBox.confirm(
    `确定删除 ${data.title} 吗？`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    },
  )
    .then(async () => {
      const { data: res } = await http.post('/task/delete', {
        tid: data.tid,
      })
      if (res.code === 200)
        props.subTask.splice(props.subTask.findIndex(item => item.tid === data.tid), 1)
    })
    .catch(() => {
    })
}

// 添加子任务
async function addSubTask() {
  if (!title.value)
    return false

  const { data: res } = await http.post('/task/add', {
    title: title.value,
    parent_id: props.task.tid,
  })

  if (res.code === 200) {
    props.subTask.push(res.data)
    title.value = ''
    isEdit.value = false
  }
}
</script>

<template>
  <div class="max-w-lg w-full space-y-3">
    <div v-if="subTask.length" class="space-y-1">
      <div v-for="item in subTask" :key="item.tid" class="flex items-center space-x-2">
        <TaskColumnStatus v-model="item.status" :row="item" />
        <div class="flex-1 px-2 min-h-8 rounded-md flex items-center cursor-pointer hover:bg-gray-100" @click="emit('to', item.tid)">
          {{ item.title }}
        </div>
        <div class="flex items-center space-x-2 text-gray-400">
          <div>
            <NpDatapicker v-model="item.start_time" :task="item" prop="start_time" class="-mx-2" placeholder="开始日期" />
          </div><div>-</div><div>
            <NpDatapicker v-model="item.end_time" :task="item" prop="end_time" class="-mx-2" placeholder="结束日期" />
          </div>
          <el-dropdown trigger="click">
            <el-button class="h-8 w-8" text>
              <span class="icon-[lucide--chevron-down]" />
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="emit('to', item.tid)">
                  <span class="icon-[lucide--plus-circle] mr-2 opacity-0" />
                  <span>查看任务详细</span>
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <span class="icon-[lucide--edit] mr-2" />
                  <span>编辑</span>
                </el-dropdown-item>
                <el-dropdown-item class="!text-red-500" @click="deleteTask(item)">
                  <span class="icon-[lucide--trash] mr-2" />
                  <span>删除</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div>
      <div v-if="isEdit" class=" flex items-start space-x-2">
        <div class="space-x-2 flex-1">
          <el-input ref="input" v-model="title" placeholder="请输入任务名" />
          <div class="flex justify-end py-2">
            <el-button type="info" text @click="isEdit = false">
              取消
            </el-button>
            <el-button :disabled="!title" :type="title ? 'primary' : 'info'" @click="addSubTask">
              保存
            </el-button>
          </div>
        </div>

        <!-- <el-tooltip content="结束日期">
          <el-button type="primary" text class="h-8 w-8">
            <span class="icon-[lucide--calendar]" />
          </el-button>
        </el-tooltip> -->
      </div>
      <el-button type="primary" text class="px-1" @click="changeEdit">
        <div class="flex items-center">
          <span class="icon-[lucide--plus]" />
          <span>添加子任务</span>
        </div>
      </el-button>
    </div>
  </div>
</template>
