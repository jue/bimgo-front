<script setup>
const props = defineProps({
  dataList: {
    type: Object,
    default: () => ({}),
  },
})

const subTasks = computed(() => props.dataList.children)

// const data = ref(props.dataList)
// watch(() => props.dataList, () => {
//   data.value = props.dataList
// }, { deep: true })

const subTaskRef = ref(null)
</script>

<template>
  <div class="px-4">
    <div class="flex items-center justify-between pt-3">
      <div><span class="text-gray-400 cursor-pointer hover:text-blue-400">#8</span></div>
      <div />
    </div>

    <div class="space-y-4">
      <!-- 标题/描述区域 -->
      <div v-if="dataList && dataList.task" class="pt-2">
        <FieldTitleView :task="dataList?.task" />

        <div class="flex items-center py-2 mb-3 border-b space-x-3">
          <UploadButton :id="dataList?.task?.gid" cate="task" @uploaded="dataList.files.push({ ...$event })">
            <Button label="上传附件" icon="icon-[lucide--plus]" outlined severity="secondary" size="small" />
          </UploadButton>
          <Button label="分解任务" icon="icon-[lucide--list-tree]" outlined severity="secondary" size="small" @click="subTaskRef.openEdit()" />
        </div>

        <FieldDescription v-model="dataList.task.description" :data="dataList?.task" />
      </div>

      <!-- 附件区域 -->
      <div v-if="dataList?.files?.length">
        <div class="flex items-center py-3">
          <span class="text-base font-bold">附件</span>
          <Divider layout="vertical" class="!h-4 !p-0 !mx-3" />
          <UploadButton :id="dataList?.task?.gid" cate="task" @uploaded="dataList.files.push({ ...$event })" />
        </div>

        <!-- 附件列表 -->
        <FileList :files="dataList?.files" @deleted="dataList.files.splice(dataList.files.indexOf($event), 1)" />
      </div>

      <!-- 子任务 -->
      <div>
        <div class="flex items-center py-3">
          <span class="text-base font-bold">子任务</span>
          <Divider layout="vertical" class="!h-4 !p-0 !mx-3" />
          <Button icon="icon-[lucide--plus]" size="small" plain text @click="subTaskRef.openEdit()" />
        </div>

        <!-- 附件列表 -->
        <TaskSub :id="dataList?.task?.gid" ref="subTaskRef" :task="dataList?.task" :sub-task="subTasks" />
      </div>
    </div>

    <!-- 结束 -->
  </div>
</template>
