<script setup>
const props = defineProps({
  dataList: {
    type: Object,
    default: () => ({}),
  },
})

const { cate } = storeToRefs(useTaskStore())

const subTasks = computed(() => props.dataList.children)

// const data = ref(props.dataList)
// watch(() => props.dataList, () => {
//   data.value = props.dataList
// }, { deep: true })

const subTaskRef = ref(null)
</script>

<template>
  <div class="px-4 flex flex-col h-full">
    <div class="shrink-0">
      <div class="flex items-center justify-between pt-3">
        <div><span class="text-gray-400 cursor-pointer hover:text-blue-400">#8</span></div>
        <div />
      </div>
      <FieldTitleView :task="dataList?.task" />
    </div>

    <div class="space-y-5 flex-1 overflow-y-auto">
      <!-- 标题/描述区域 -->
      <FieldDescription v-if="dataList?.task" v-model="dataList.task.description" :data="dataList?.task" />

      <!-- 附件区域 -->
      <div>
        <div class="flex items-center py-3">
          <span class="text-base font-bold">附件</span>
          <Divider layout="vertical" class="!h-4 !p-0 !mx-3" />
          <UploadButton :id="dataList?.task?.gid" cate="task" @uploaded="dataList.files.push({ ...$event })" />
        </div>

        <!-- 附件列表 -->
        <FileList :files="dataList?.files" @deleted="dataList.files.splice(dataList.files.indexOf($event), 1)" />
      </div>

      <!-- 子任务 -->
      <div v-if="cate === 'task'">
        <div class="flex items-center py-3">
          <span class="text-base font-bold">子任务</span>
          <Divider layout="vertical" class="!h-4 !p-0 !mx-3" />
          <Button icon="icon-[lucide--plus]" size="small" plain text @click="subTaskRef.openEdit()" />
        </div>

        <TaskSub :id="dataList?.task?.gid" ref="subTaskRef" :sub-task="subTasks" />
      </div>

      <!-- 关联的模型 -->
      <div>
        <div class="flex justify-between items-center py-3">
          <span class="text-base font-bold">关联模型</span>
          <Button v-tooltip.bottom="'全屏'" icon="icon-[lucide--maximize]" size="small" plain text />
        </div>

        <Placeholder />
      </div>

      <!-- 操作日志 -->
      <div>
        <div class="flex items-center py-3">
          <span class="text-base font-bold">活动日志</span>
        </div>

        <Comment :id="dataList?.task?.gid" :cate="cate" />
      </div>

      <!-- 结束 -->
    </div>
    <div class="shrink-0 py-5">
      <CommentSection :id="dataList?.task?.gid" :cate="cate" />
    </div>
    <!-- 结束 -->
  </div>
</template>
