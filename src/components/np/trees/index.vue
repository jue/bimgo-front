<script setup>
const { tasks } = storeToRefs(useTaskStore())

const nodes = ref(null)
</script>

<template>
  <div
    class="np-tree"
    @mousemove="onMousemoveHandler"
    @mouseleave="onMouseleaveHandler"
    @dragend="onDragendHandler(null, $event)"
  >
    <div ref="nodes" class="tree-nodes-list">
      <np-tree-node v-for="node in tasks" :key="node.gid" :node="node" />
    </div>
  </div>
</template>
