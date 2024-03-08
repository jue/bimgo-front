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
  <div class=" overflow-x-auto" :style="{ width: `calc(100vw - ${sideWidth}px)` }">
    <div class="np-table">
      <div class="np-table-row np-table-row-th">
        <div />
        <div
          v-for="(item, key) in config.task_table.column" :key="key" class="np-table-cell min-w-24"
          :class="{ 'w-[300px] sticky left-0 z-10': key === 'title' }"
        >
          <div class="np-cell text-[#485776]">
            {{ item.label }}
          </div>
        </div>
        <div>+</div>
      </div>
      <div v-for="(row, index) in tasks" :key="row.tid" class="np-table-row np-table-row-td">
        <div class="w-[56px] np-table-cell">
          <div class="np-cell justify-center text-gray-400">
            {{ index + 1 }}
          </div>
        </div>
        <div
          v-for="(item, key) in config.task_table.column" :key="key" class="np-table-cell"
          :class="{ 'w-[300px] sticky left-0 z-10': key === 'title' }"
          :style="{ width: item.minWidth }"
        >
          <div v-if="row.title && key === 'title'" class="np-cell">
            <task-column-title
              :title="row.title" :row="row" @click="openTaskDetail(row)" @edit="openTaskDetail(row)"
              @refresh="getTaskList"
            />
          </div>

          <div v-if="row.title && key === 'start_time'" class="np-cell">
            <NpDatapicker v-model="row.start_time" :task="row" prop="start_time" placeholder="待设置" />
          </div>

          <!-- <div v-else class="np-cell">
            {{ row[key] }}
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.np-table {
  @apply table leading-none;
  .np-table-row {
    @apply table-row;
    .np-table-cell {
      @apply table-cell border-b bg-white;
        vertical-align: middle;
      .np-cell {
        @apply flex items-center min-h-10 px-1;
      }
    }

    &.np-table-row-td {
      @apply hover:bg-[#edf1f6];
      .np-table-cell {
        .np-cell {
          @apply border border-transparent hover:border-[#028260];
        }
      }

    }
  }
}
</style>
