<script setup>
const { sideWidth } = storeToRefs(useSettingsStore())
const { config } = useUserStore()

const tasks = ref([])
const taskDetail = ref(null)
const taskTable = ref(null)

async function getTaskList() {
  const { data: res } = await http.post('/task/list')
  if (res.code === 200)
    tasks.value = res.data
}

function openTaskDetail(data) {
  taskTable.value.setCurrentRow(data)
  taskDetail.value.open(data.tid)
}

function addNewTask(data) {
  tasks.value.push(data)
}

onMounted(() => {
  getTaskList()
})
</script>

<template>
  <pre>
    {{ loading }}
  </pre>
  <div :style="{ width: `calc(100vw - ${sideWidth}px)` }" class="task-table-wrapper">
    <el-table
      ref="taskTable" v-loading="loading" :data="tasks" row-key="tid" tree-props="{children: 'children'}"
      default-expand-all :style="{ width: '100%' }" :border="config.task_table.border"
      :stripe="config.task_table.stripe" :size="config.task_table.size" flexible scrollbar-always-on
      highlight-current-row @current-change="handleCurrentChange"
    >
      <el-table-column type="index" width="42" fixed="left" />
      <!-- <el-table-column type="selection" width="42" fixed="left" /> -->
      <el-table-column
        prop="title" label="任务名" :width="config.task_table.column.title.width" class-name="task-title"
        fixed="left"
      >
        <template #default="scope">
          <task-column-title
            v-if="scope.row.title" :title="scope.row.title" :row="scope.row"
            @click="openTaskDetail(scope.row)" @edit="openTaskDetail(scope.row)" @refresh="getTaskList"
          />
        </template>
      </el-table-column>
      <!-- <el-table-column prop="title" label="任务名" :min-width="config.task_table.column.title.minWidth" class-name="task-title">
        <template #default="scope">
          <task-column-title :title="scope.row.title" @click="openTaskDetail(scope.row.tid)" />
        </template>
      </el-table-column> -->
      <el-table-column prop="contractor_id" label="执行团队" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <task-column-status v-if="scope.row.tid" v-model="scope.row.status" :row="scope.row" />
        </template>
      </el-table-column>
      <el-table-column prop="start_time" label="开始日期" width="150">
        <template #default="scope">
          <NpDatapicker
            v-if="scope.row.tid" v-model="scope.row.start_time" :task="scope.row" prop="start_time"
            placeholder="待设置"
          />
        </template>
      </el-table-column>
      <el-table-column prop="end_time" label="结束日期" width="150">
        <template #default="scope">
          <NpDatapicker v-model="scope.row.end_time" :task="scope.row" prop="end_time" placeholder="待设置" />
        </template>
      </el-table-column>
      <el-table-column prop="done_time" label="实际完工日期" width="150">
        <template #default="scope">
          <NpDatapicker v-model="scope.row.done_time" :task="scope.row" prop="done_time" placeholder="" />
        </template>
      </el-table-column>
      <el-table-column prop="previous_id" label="前置任务" />
      <el-table-column prop="priority" label="优先级" width="200">
        <template #default="scope">
          <task-column-priority v-model="scope.row.priority" :row="scope.row" />
        </template>
      </el-table-column>
      <el-table-column prop="progress" label="进度" />
      <el-table-column prop="budget" label="预算" />
    </el-table>
    <TaskNew @refresh="addNewTask" />
    <TaskDetail ref="taskDetail" />
  </div>
</template>

<style scoped lang="scss">
:deep(){
  .el-scrollbar__bar {
    display: none;
  }
  .el-table--default{
    .el-table__cell {
      padding: 0;
    }
    .cell {
      @apply flex items-center min-h-10;
    }
  }

  td.task-title {
    .cell {
      @apply relative border border-white rounded-md border-opacity-0 hover:border-blue-400;
      &:hover{
        .more {
          @apply opacity-100;
        }
      }
    }
  }
}
</style>
