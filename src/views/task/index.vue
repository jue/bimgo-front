<script setup>
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import TaskTree from './components/taskTree.vue'

import Gantt from './components/ganntt/index.vue'

const gantt = ref(null)

const form = reactive({
  type: 'tree',
  key: '',
  sort: 'default',
})

const data = ref([
  {
    id: 1,
    gid: 'wz6GVxdqDOXmVyqcTaqpq',
    title: '项目A',
    description: '这是项目A的描述',
    parent_gid: null,
    previous_id: null,
    priority: 2,
    progress: 0.3,
    start_time: '2024-04-01',
    end_time: '2024-06-30',
    done_time: null,
    budget: 10000,
    status: 'doing',
    contractor_id: 'team1',
    uids: ['user1', 'user2'],
    sort: 1,
    uid: 'user1',
    children: [
      {
        id: 2,
        gid: 'yB1bCVwmZp4PCoFVUQXCm',
        title: '子任务A1',
        description: '这是项目A的子任务A1',
        parent_gid: 'wz6GVxdqDOXmVyqcTaqpq',
        previous_id: null,
        priority: 1,
        progress: 0.5,
        start_time: '2024-04-01',
        end_time: '2024-05-15',
        done_time: null,
        budget: 2000,
        status: 'doing',
        contractor_id: 'team1',
        uids: ['user1'],
        sort: 1,
        uid: 'user2',
        children: [
          {
            id: 2,
            gid: 'yB1bCVwmZp4PCoFVUQXCm',
            title: '子任务A1',
            description: '这是项目A的子任务A1',
            parent_gid: 'wz6GVxdqDOXmVyqcTaqpq',
            previous_id: null,
            priority: 1,
            progress: 0.5,
            start_time: '2024-04-01',
            end_time: '2024-05-15',
            done_time: null,
            budget: 2000,
            status: 'doing',
            contractor_id: 'team1',
            uids: ['user1'],
            sort: 1,
            uid: 'user2',
            children: [],
          },
          {
            id: 3,
            gid: 'zxcvbnmqwertyuioplkj',
            title: '子任务A2',
            description: '这是项目A的子任务A2',
            parent_gid: 'wz6GVxdqDOXmVyqcTaqpq',
            previous_id: 'yB1bCVwmZp4PCoFVUQXCm',
            priority: 1,
            progress: 0.2,
            start_time: '2024-05-16',
            end_time: '2024-06-30',
            done_time: null,
            budget: 3000,
            status: 'doing',
            contractor_id: 'team1',
            uids: ['user2'],
            sort: 2,
            uid: 'user2',
            children: [],
          },
        ],
      },
      {
        id: 3,
        gid: 'zxcvbnmqwertyuioplkj',
        title: '子任务A2',
        description: '这是项目A的子任务A2',
        parent_gid: 'wz6GVxdqDOXmVyqcTaqpq',
        previous_id: 'yB1bCVwmZp4PCoFVUQXCm',
        priority: 1,
        progress: 0.2,
        start_time: '2024-05-16',
        end_time: '2024-06-30',
        done_time: null,
        budget: 3000,
        status: 'doing',
        contractor_id: 'team1',
        uids: ['user2'],
        sort: 2,
        uid: 'user2',
        children: [],
      },
    ],
  },
  {
    id: 4,
    gid: 'eN7xzMECuqnYbbp48czUN',
    title: '项目B',
    description: '这是项目B的描述',
    parent_gid: null,
    previous_id: null,
    priority: 3,
    progress: 0.8,
    start_time: '2024-03-01',
    end_time: '2024-05-31',
    done_time: null,
    budget: 15000,
    status: 'doing',
    contractor_id: 'team2',
    uids: ['user3', 'user4'],
    sort: 2,
    uid: 'user3',
    children: [
      {
        id: 5,
        gid: 'swK9zMdNRoSbZXtXhVypS',
        title: '子任务B1',
        description: '这是项目B的子任务B1',
        parent_gid: 'eN7xzMECuqnYbbp48czUN',
        previous_id: null,
        priority: 2,
        progress: 1,
        start_time: '2024-03-01',
        end_time: '2024-04-15',
        done_time: '2024-04-10',
        budget: 5000,
        status: 'done',
        contractor_id: 'team2',
        uids: ['user3'],
        sort: 1,
        uid: 'user4',
        children: [],
      },
      {
        id: 6,
        gid: 'hjklqwertyzxcvbnm',
        title: '子任务B2',
        description: '这是项目B的子任务B2',
        parent_gid: 'eN7xzMECuqnYbbp48czUN',
        previous_id: 'swK9zMdNRoSbZXtXhVypS',
        priority: 2,
        progress: 0.6,
        start_time: '2024-04-16',
        end_time: '2024-05-31',
        done_time: null,
        budget: 6000,
        status: 'doing',
        contractor_id: 'team2',
        uids: ['user3', 'user4'],
        sort: 2,
        uid: 'user4',
        children: [],
      },
    ],
  },
  {
    id: 7,
    gid: 'asdfghjklzxcvbnm',
    title: '项目C',
    description: '这是项目C的描述',
    parent_gid: null,
    previous_id: null,
    priority: 1,
    progress: 0.4,
    start_time: '2024-04-01',
    end_time: '2024-07-31',
    done_time: null,
    budget: 20000,
    status: 'doing',
    contractor_id: 'team3',
    uids: ['user5', 'user6'],
    sort: 3,
    uid: 'user5',
    children: [
      {
        id: 8,
        gid: 'qwertyuiopasdfghjkl',
        title: '子任务C1',
        description: '这是项目C的子任务C1',
        parent_gid: 'asdfghjklzxcvbnm',
        previous_id: null,
        priority: 1,
        progress: 0.3,
        start_time: '2024-04-01',
        end_time: '2024-05-31',
        done_time: null,
        budget: 8000,
        status: 'doing',
        contractor_id: 'team3',
        uids: ['user5'],
        sort: 1,
        uid: 'user6',
        children: [],
      },
    ],
  },
])

async function getTaskList() {
  const { data: res } = await getTaskData(form)
  if (res.code === 200)
    data.value = res.data
}

onMounted(() => {
  // getTaskList()
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
