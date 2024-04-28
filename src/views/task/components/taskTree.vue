<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['taskEnter', 'taskLeave'])

const tree = ref(null)

const { task_columns } = storeToRefs(useUserStore())

function handleNodeClick(data) {
  console.log(props.data)

  console.log(tree.value.getNode(data))
}
</script>

<template>
  <div>
    <div class="text-[#737577] text-xs">
      <div class="flex items-center h-8 " />
      <div class="flex items-center h-[34px] border-y border-y-[#dfe5eb]">
        <div class="flex-1 px-2">
          任务内容
        </div>
        <div class="w-28 px-2">
          预估天数
        </div>
        <div class="w-28 px-2">
          开始日期
        </div>
      </div>
    </div>
    <el-tree
      ref="tree"
      :data="data"
      :props="{
        children: 'children',
        label: 'title',
      }"
      node-key="gid"
      default-expand-all
      :expand-on-click-node="false"
      draggable
      @node-click="handleNodeClick"
    >
      <template #default="{ node, data }">
        <div class="flex items-center justify-end w-full h-6">
          <div class="flex-1">
            {{ data.title }}
          </div>
          <div class="w-28 px-2">
            预估天数
          </div>
          <div class="w-28 px-2">
            <GlobalColumnDate v-model="data.start_time" :date="data" class="px-0" />
          </div>
        </div>
      </template>
    </el-tree>
  </div>
</template>
