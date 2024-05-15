<script setup>
const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  subTask: {
    type: Array,
    default: () => [],
  },
})

const isEdit = ref(false)
// 输入input
const inputRef = ref(null)

function openEdit() {
  isEdit.value = true
  nextTick(() => {
    inputRef.value.focus()
  })
}

defineExpose({
  openEdit,
})

const value = ref('')

async function saveData() {
  if (!value.value)
    return false

  const { data: res } = await http.post('/task/add', {
    title: value.value,
    parent_gid: props.id,
  })

  if (res.code === 200) {
    value.value = ''
    isEdit.value = false
    props.subTask.push(res.data)
    useTaskStore().getTasks()
  }
}

function handleCancel() {
  isEdit.value = false
  value.value = ''
}

function handleDeleted(task) {
  props.subTask.splice(props.subTask.indexOf(task), 1)
}
</script>

<template>
  <!-- 测试用例 -->
  <!-- <TaskTimeline /> -->

  <div>
    <div v-if="subTask.length" class="box-shadow divide-y rounded">
      <div v-for="(task, index) in subTask" :key="index" class="flex items-center h-10 px-2 justify-between hover:bg-gray-100/70 cursor-pointer">
        <div class="space-x-3  rounded-lg">
          <span class="text-sm text-gray-400">#{{ task?.id }}</span>
          <span>{{ task.title }}</span>
        </div>

        <div class=" rounded-lg flex items-center space-x-2">
          <FieldPriority v-model="task.priority" :data="task" class="!shadow-none !ring-0 !px-0 bg-transparent" inline />
          <FieldStatus v-model="task.status" :data="task" class="!shadow-none !ring-0 !px-0 bg-transparent" inline />
          <FieldUids v-model="task.uids" :data="task" class="!shadow-none !ring-0 !px-0 !py-0 bg-transparent" inline />
          <TaskSubMore :task="task" @deleted="handleDeleted" />
        </div>
      </div>
    </div>
    <div v-else class="flex items-center justify-center h-10 border border-dashed rounded">
      <span class="text-gray-400">没有子任务</span>
    </div>
    <!-- 添加任务 -->
    <div v-if="isEdit" class="border mt-3 rounded-lg h-9 pr-2 pl-4 flex items-center">
      <input ref="inputRef" v-model="value" autofocus placeholder="输入新的任务名" class="w-full" @keyup.enter="saveData()">
      <div class="shrink-0 space-x-2">
        <Button label="创建" severity="secondary" class="text-xs h-6" @click="saveData()" />
        <Button label="取消" severity="secondary" plain outlined class="text-xs h-6" @click.stop="handleCancel" />
      </div>
    </div>
    <TaskSelect v-model="value" />
  </div>
</template>
