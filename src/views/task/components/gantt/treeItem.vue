<script setup>
import { VueDraggable } from 'vue-draggable-plus'
import TreeLine from './treeLine.vue'

const props = defineProps({
  tasks: {
    type: Array,
    default: () => ([]),
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  level: {
    type: Number,
    default: 0,
  },
  selectedCell: {
    type: Object,
    default: () => ({}),
  },
})

const gid = inject('gid')
const unexpandedKeys = inject('unexpandedKeys')

const tasks = ref(props.tasks)
const updateData = inject('updateData')

function onStart(event) {
  console.log('onStart::', event)
  event.item.style.backgroundColor = '#ffffff22'
}

function onEnd(event) {
  updateData(tasks.value)
}
</script>

<template>
  <VueDraggable
    v-model="tasks"
    class="drag-area"
    tag="ul"
    group="g1"
    handle=".drag-button"
    :force-fallback="true"
    :fallback-on-body="false"
    @start="onStart"
    @end="onEnd"
  >
    <li v-for="(task, index) in tasks" :key="index" class="w-fit">
      <TreeLine :task="task" :level="level" :columns="columns" :selected-cell="selectedCell" @cell:select="$emit('cell:select', $event)" />
      <!-- 这里递归children -->
      <template v-if="task.children && task.children.length > 0 && !unexpandedKeys.includes(task.gid)">
        <TreeItem
          v-model="task.children"
          :tasks="task.children"
          :columns="columns"
          :level="level + 1"
          :selected-cell="selectedCell"
          @cell:select="$emit('cell:select', $event)"
        />
      </template>
    </li>
  </VueDraggable>
</template>

<style lang="scss" scoped>
.sortable-chosen{
  @apply border border-blue-500;
}
.sortable-ghost {
  @apply text-red-500
}
.sortable-drag {
  @apply bg-yellow-500
}
</style>
