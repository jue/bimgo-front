<script setup>
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import TaskTree from './components/taskTree.vue'

import Gantt from './components/gantt/index.vue'

const gantt = ref(null)

const form = reactive({
  type: 'tree',
  key: '',
  sort: 'default',
})

const data = ref([])
provide('data', data)
provide('updateData', (newData) => {
  console.log(newData)
  data.value = newData
})

async function getTaskList() {
  const { data: res } = await getTaskData(form)
  if (res.code === 200)
    data.value = res.data
}
provide('getTaskList', getTaskList)

onMounted(() => {
  getTaskList()
})
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex items-center justify-between h-12 shrink-0 px-5">
      <div class="flex items-center h-11 shrink-0" />
      <!-- <TaskFilter :form="form" /> -->
      <div class="flex items-center space-x-2">
        <IconField icon-position="left">
          <InputIcon>
            <i class="icon-[lucide--search]" />
          </InputIcon>
          <InputText v-model="form.key" placeholder="标题或描述" />
        </IconField>
        <Button label="树形" icon="icon-[lucide--list-tree]" outlined severity="secondary" />
        <GlobalCreate />
        <GlobalUserAvatar class="mr-2" />
      </div>
    </div>
    <div class="h-full overflow-y-auto">
      <Gantt :data="data" />
      <!-- <pre>{{ data }}</pre> -->

      <!-- <Splitter>
        <SplitterPanel>
          <TaskTree :data="data" />
        </SplitterPanel>
        <SplitterPanel class="overflow-x-auto">
          <Gannt :tasks="data" />
        </SplitterPanel>
      </Splitter> -->
    </div>

    <!-- <task-table :form="form" /> -->
  </div>
</template>

<route>
  {
    meta: {
      title: '工程进度',
    },
  }
</route>
