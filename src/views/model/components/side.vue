<script setup>
const items = ref([
  {
    label: '预览',
    icon: 'icon-[lucide--eye]',
    to: { name: 'model' },
  },
  {
    label: '快照',
    icon: 'icon-[lucide--list]',
    to: { name: 'models' },
  },
])

// 构建状态
const taskStatus = ref('all')
</script>

<template>
  <div class="w-72 border-r shrink-0">
    <TabView>
      <TabPanel header="预览">
        <div class="py-3 px-4 space-y-3">
          <div class="flex items-center">
            <RadioButton v-model="taskStatus" input-id="all" name="task" value="all" />
            <label for="all" class="ml-2">所有</label>
          </div>

          <div class="flex items-center">
            <RadioButton v-model="taskStatus" input-id="todo" name="task" value="todo" />
            <label for="todo" class="ml-2">新建</label>
          </div>
          <div class="flex items-center">
            <RadioButton v-model="taskStatus" input-id="doing" name="task" value="doing" />
            <label for="doing" class="ml-2">进行中</label>
          </div>
          <div class="flex items-center">
            <RadioButton v-model="taskStatus" input-id="done" name="task" value="done" />
            <label for="done" class="ml-2">已完成</label>
          </div>
        </div>
      </TabPanel>
      <TabPanel header="快照">
        <p class="m-0">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
          ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
        </p>
      </TabPanel>
    </TabView>
  </div>
</template>
