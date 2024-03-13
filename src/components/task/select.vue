<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['update:modelValue'])
const { taskStatus } = storeToRefs(useSettingsStore())
const tasks = ref([])
const taskName = ref('')
const filterTasks = ref([])
const key = ref('')
async function getTasks(val) {
  if (!val) {
    filterTasks.value = []
    key.value = ''
  }
  else {
    filterTasks.value = tasks.value
  }
}

function handleInput(value) {
  filterTasks.value = value ? tasks.value.filter(task => task.title.includes(value)) : [...tasks.value]
}

function getStatusItem(val) {
  return taskStatus.value.find(item => item.value === val)
}

function getTaskName(val) {
  taskName.value = tasks.value.find(item => item.tid === val)?.title
}

function selectTask(val) {
  getTaskName(val)
  emit('update:modelValue', val)
}

onMounted(async () => {
  const { data: res } = await http.post('/task/list', {
    type: 'list',
  })
  if (res.code === 200) {
    tasks.value = res.data
    filterTasks.value = res.data
  }
})

watch(
  () => props.modelValue,
  (val) => {
    getTaskName(val)
  },
)
</script>

<template>
  <el-dropdown trigger="click" placement="bottom-start" @visible-change="getTasks">
    <slot v-if="$slots.default" />
    <div v-else class="text-blue-600 h-8 flex items-center">
      {{ taskName || '选择任务' }}
    </div>
    <template #dropdown>
      <div class="p-1">
        <el-input v-model="key" clearable placeholder="按任务名搜索" @input="handleInput" />
      </div>
      <el-dropdown-menu class="min-w-64 space-y-1 max-h-56 overflow-y-auto">
        <el-dropdown-item v-for="item in filterTasks" :key="item.tid" @click="selectTask(item.tid)">
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center flex-1 shrink-0">
              <div class="icon-[lucide--clipboard-check] mr-2" />
              <div>{{ item.title }}</div>
            </div>
            <div
              class="flex items-center h-6 px-1 rounded-md"
              :style="{ backgroundColor: `${getStatusItem(item.status)?.color}30` }"
            >
              <div
                class="w-1 h-3.5 rounded-md mr-1"
                :style="{ backgroundColor: `${getStatusItem(item.status)?.color}` }"
              />
              <div>
                {{ getStatusItem(item.status).label }}
              </div>
            </div>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
