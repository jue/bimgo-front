<script setup>
const props = defineProps({
  cate: {
    type: String,
    default: 'task',
  },
})

const { tasks } = storeToRefs(useTaskStore())
function convertToTreeNode(item) {
  return {
    key: item.gid,
    label: item.title,
    data: item,
    children: item.children ? item.children.map(convertToTreeNode) : [],
  }
}

const treeNodes = computed(() => {
  if (props.cate === 'task')
    return tasks.value.map(convertToTreeNode)
  if (props.cate === 'issue')
    return tasks
})

const visible = ref(false)

const selectNode = ref({})

const gid = ref('')
const parent_gid = ref('')
// 打开对话框
function open(id) {
  gid.value = id
  visible.value = true
}

defineExpose({
  open,
})

function handleNodeSelect(node) {
  console.log(node)
  selectNode.value = node
  parent_gid.value = node.key
}

function handleNoNodeSelect() {
  selectNode.value = {}
  parent_gid.value = ''
}
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal header="移动任务"
  >
    <Tree
      v-model:selection-keys="parent_gid"
      :value="treeNodes"
      selection-mode="single"
      class="w-full md:w-30rem"
      filter
      filter-by="label"
      filter-placeholder="搜索任务"
      :pt="{
        root: {
          class: ['!p-0 !ring-0'],
        },
      }"
      @node-select="handleNodeSelect"
      @node-unselect="handleNoNodeSelect"
    />
    <div class="mt-4 flex items-center">
      <div>你选择的父任务是：</div>
      <div>{{ selectNode.label }}</div>
    </div>

    <!-- <pre>{{ parent_gid }} // {{ gid }}</pre> -->
    <div class="flex items-center justify-end space-x-3 mt-4">
      <Button label="确定选择" @click="visible = false" />
      <Button label="取消" plain @click="visible = false" />
    </div>
  </Dialog>
</template>
