<script setup>
const props = defineProps({
  tasks: {
    type: Array,
    default: () => ([]),
  },
  level: {
    type: Number,
    default: 0,
  },
})

const { unexpandedKeys } = storeToRefs(useTaskStore())
</script>

<template>
  <ul>
    <li
      v-for="(task, index) in tasks"
      :key="index"
      class="uf-block w-fit relative min-w-full"
    >
      <!-- <np-tree-line :task="task" :level="level" /> -->
      <np-tree-line :task="task" :level="level" />
      <!-- 这里递归children -->
      <template v-if="task.children && task.children.length > 0 && !unexpandedKeys.includes(task.gid)">
        <Item
          :tasks="task.children"
          :level="level + 1"
        />
      </template>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.drag-over {
  &::after {
    @apply absolute left-0.5 right-0 top-0 bottom-0 h-10;
    content: '';
    @apply outline outline-1 outline-blue-600 -outline-offset-1 bg-transparent rounded;
  }
}

.drag-over-before {
  &::after {
    @apply absolute left-0.5 right-0 top-0 bottom-0 h-0.5;
    content: '';
    @apply outline outline-1 outline-blue-600 -outline-offset-1 bg-transparent rounded;
  }
}

.drag-over-after {
  &::after {
    @apply absolute left-0.5 right-0 top-10 bottom-0 h-0.5;
    content: '';
    @apply outline outline-1 outline-blue-600 -outline-offset-1 bg-transparent rounded;
  }
}
</style>
