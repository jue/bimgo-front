<script setup>
const props = defineProps({
  node: {
    type: Object,
    default: () => {},
  },
  level: {
    type: Number,
    default: 0,
  },
})

const width = computed(() => props.level * 20)

const drag = ref(null)
// 拖拽源
</script>

<template>
  <div
    ref="drag"
    class="space-y-1 np-tree-node"
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

      class="my-1"
      :style="{ 'padding-left': `${width}px` }"
    >
      <div class="bg-gray-100 p-1 rounded-md flex items-center cursor-move select-none">
        <span class="icon-[lucide--grip-vertical]" /> <span>{{ node.title }}-{{ node.gid }} - {{ level }}</span>
      </div>
      <template v-if="node?.children && node.children.length > 0">
        <Node
          v-for="subNode in node?.children"
          :key="subNode.gid"
          :node="subNode"
          :level="level + 1"
        />
      </template>
    </div>

    <!-- 下标记符 -->
    <div
      class="np-tree-cursor np-tree-cursor--after"
      :style="{
        '--depth': level,
      }"
    />
  </div>
</template>
