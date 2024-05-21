<script setup>
const props = defineProps({
  nodes: {
    type: Array,
    default: () => ([]),
  },
  level: {
    type: Number,
    default: 0,
  },
})

const instance = getCurrentInstance()

// 节点缩进值
const width = computed(() => props.level * 20)

// 是否拖拽中
const isDragging = ref(false)

// 是否按下鼠标
const mouseIsDown = ref(false)

// 是否根节点
const isRoot = computed(() => !props.level)

function getParent() {
  if (instance.parent)
    return instance.parent.proxy
  else
    return null
}

function getRoot() {
  let currentInstance = instance
  while (currentInstance.parent)
    currentInstance = currentInstance.parent

  return currentInstance.proxy
}

function onNodeMousedownHandler(event, node) {
  if (event.button)
    return false

  if (!isRoot.value) {
    getRoot().onNodeMousedownHandler(event, node)
    return
  }

  mouseIsDown.value = true
}
function onNodeMouseupHandler(event, node) {
  // console.log(event, node)
}
</script>

<template>
  <div
    class="np-tree"
    @mousemove="onMousemoveHandler"
    @mouseleave="onMouseleaveHandler"
    @dragend="onDragendHandler(null, $event)"
  >
    <div ref="nodes" class="tree-nodes-list">
      <!-- 节点列表开始 -->

      <div
        v-for="(node, index) in nodes"
        :key="index"
        class="np-tree-node"
      >
        <!-- 上标记符 -->
        <div
          class="np-tree-cursor np-tree-cursor--before"
          :style="{
            '--depth': level,
          }"
          @dragover.prevent
        />

        <!-- 节点 -->
        <div
          class="np-tree-node-item min-h-10 bg-gray-100 my-0.5 rounded flex items-center select-none"
          :style="{
            'padding-left': `${width}px`,
          }"
          @mousedown="onNodeMousedownHandler($event, node)"
          @mouseup="onNodeMouseupHandler($event, node)"
          @contextmenu="emitNodeContextmenu(node, $event)"
          @dblclick="emitNodeDblclick(node, $event)"
          @click="emitNodeClick(node, $event)"
          @dragover="onExternalDragoverHandler(node, $event)"
          @drop="onExternalDropHandler(node, $event)"
        >
          <!-- 显示节点内容 -->
          <!-- <span>{{ node.title }}-{{ node.gid }} - {{ level }}</span> -->
          <div>{{ mouseIsDown }}//{{ node?.title }}</div>
        </div>
        <template v-if="node?.children && node.children.length > 0">
          <Uftree
            :nodes="node?.children"
            :level="level + 1"
          />
        </template>

        <!-- 下标记符 -->
        <div
          class="np-tree-cursor np-tree-cursor--after"
          :style="{
            '--depth': level,
          }"
          @dragover.prevent
        />
      </div>
      <!-- 节点列表结束 -->
    </div>
  </div>
</template>
