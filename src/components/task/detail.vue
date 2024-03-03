<script setup>
const emit = defineEmits(['refresh', 'update:title'])
const drawerVisible = ref(false)
const task = ref({
  descendants: [],
  task: {},
  children: [],
})
const morebutton = ref(null)

async function getTaskDetail(id) {
  const { data: res } = await http.post('/task/detail', {
    tid: id,
  })
  if (res.code === 200)
    task.value = res.data
}

function open(id) {
  drawerVisible.value = true
  getTaskDetail(id)
}

defineExpose({
  open,
})

const updateTitle = debounce(async () => {
  const { data: res } = await http.post('/task/title/update', {
    tid: task.value.task.tid,
    title: task.value.task.title,
  })
  if (res.code === 200)
    ElMessage.success('更新成功')
}, 800)

function disabledDateStart(data) {
  return task.value.task.end_time && data > new Date(task.value.task.end_time)
}

function disabledDateEnd(data) {
  return task.value.task.start_time && data < new Date(task.value.task.start_time) - 86400000
}
</script>

<template>
  <el-drawer v-model="drawerVisible" title="用户信息" :with-header="false" :modal="true" :append-to-body="true" size="800" custom-class="np-drawer">
    <div class="flex flex-col h-full">
      <div class="flex items-center justify-between h-14 border-b px-4">
        <div>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in task.descendants.slice(0, -1)" :key="item.tid" class="!cursor-pointer" @click="getTaskDetail(item.tid)">
              {{ item.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="space-x-1">
          <el-tooltip content="复制链接">
            <el-button text class="w-8 h-8">
              <span class="icon-[lucide--link]" />
            </el-button>
          </el-tooltip>

          <el-dropdown ref="morebutton" trigger="click">
            <el-button text class="w-8 h-8">
              <span class="icon-[lucide--more-horizontal]" />
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <span class="icon-[lucide--star] mr-2" />
                  <span>收藏</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span class="icon-[lucide--trash] mr-2" />
                  <span>移到回收站</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span class="icon-[lucide--list-tree] mr-2" />
                  <span>转为子任务</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span class="icon-[lucide--git-graph] mr-2" />
                  <span>设置前置任务</span>
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <span class="icon-[lucide--printer] mr-2" />
                  <span>打印</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <el-tooltip content="关闭">
            <el-button text class="w-8 h-8" @click="drawerVisible = false">
              <span class="icon-[lucide--x]" />
            </el-button>
          </el-tooltip>
        </div>
      </div>

      <div class="px-4 py-2">
        <el-tooltip content="点击编辑">
          <el-input
            v-model="task.task.title" placeholder="请输入" size="large" class="text-xl shadow-none task-title"
            @input="updateTitle"
          />
        </el-tooltip>
      </div>

      <div class="py-2 px-7 text-gray-400 space-y-2">
        <div class="flex items-center min-h-9">
          <div class="w-44 flex items-center space-x-2">
            <span class="icon-[lucide--check-square-2]" />
            <div>状态</div>
          </div>
          <div>
            <TaskColumnStatus v-model="task.task.status" :row="task.task" />
          </div>
        </div>

        <div class="flex items-center min-h-9">
          <div class="w-44 flex items-center space-x-2">
            <span class="icon-[lucide--users]" />
            <div>执行团队</div>
          </div>
          <div>
            待领取
          </div>
        </div>

        <div class="flex items-center min-h-9">
          <div class="w-44 flex items-center space-x-2">
            <span class="icon-[lucide--flag]" />
            <div>优先级</div>
          </div>
          <div>
            <TaskColumnPriority v-model="task.task.priority" :row="task.task" />
          </div>
        </div>

        <div class="flex items-center min-h-9">
          <div class="w-44 flex items-center space-x-2">
            <span class="icon-[lucide--calendar]" />
            <div>执行日期</div>
          </div>
          <div class="flex items-center space-x-2">
            <div>
              <NpDatapicker v-model="task.task.start_time" :disabled-date="disabledDateStart" :task="task.task" prop="start_time" class="-mx-2" placeholder="设置开始日期" />
            </div>
            <div>-</div>
            <div>
              <NpDatapicker v-model="task.task.end_time" :disabled-date="disabledDateEnd" :task="task.task" prop="end_time" class="-mx-2" placeholder="设置结束日期" />
            </div>
          </div>
        </div>

        <div class="flex items-center min-h-9">
          <div class="w-44 flex items-center space-x-2">
            <span class="icon-[lucide--calendar-check]" />
            <div>实际完工日期</div>
          </div>
          <div class="flex items-center space-x-2">
            <div>
              <NpDatapicker v-model="task.task.done_time" :task="task.task" prop="done_time" class="-mx-2" placeholder="设置实际完工日期" />
            </div>
          </div>
        </div>

        <div class="flex items-start min-h-9">
          <div class="w-44 flex items-center space-x-2 min-h-9">
            <span class="icon-[lucide--file-text]" />
            <span>备注</span>
          </div>
          <div class="flex-1">
            <TaskColumnDescription v-model="task.task.description" :row="task.task" />
          </div>
        </div>
      </div>

      <div class="px-7 py-2 space-y-2">
        <div class="flex items-center">
          <div class="text-md font-medium">
            子任务
          </div>
        </div>
        <div class="border border-gray-200 p-2 rounded-md">
          <TaskSub :tid="task.task.tid" :task="task.task" :sub-task="task.children" @to="getTaskDetail" />
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<style scoped lang="scss">
:deep(.task-title){
  .el-input__wrapper {
    @apply shadow-none hover:bg-gray-100;
  }
}
</style>
