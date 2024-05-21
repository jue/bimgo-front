<script setup>
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

const emit = defineEmits(['dev'])

const gid = inject('gid')
const unexpandedKeys = inject('unexpandedKeys')

const tasks = ref(props.tasks)
watch(() => props.tasks, () => {
  tasks.value = props.tasks
}, { deep: true })

document.body.ondrop = function (event) {
  event.preventDefault()
  event.stopPropagation()
}

// 当前被拖动的任务
const draggedTask = ref(null)
const currentDropTarget = ref(null)

function handleDragStart(event, task, index) {
  draggedTask.value = { task, index }
  event.dataTransfer.effectAllowed = 'move'
  event.currentTarget.style.opacity = '0.4'
}

function handleDragEnd(event) {
  event.currentTarget.style.opacity = '1'
  console.log(event.currentTarget)
  if (currentDropTarget.value)
    currentDropTarget.value.classList.remove('drag-over', 'drag-over-before', 'drag-over-after')

  draggedTask.value = null
  currentDropTarget.value = null
}

function handleDragOver(event, task) {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'move'

  const targetElement = event.currentTarget
  const targetRect = targetElement.getBoundingClientRect()

  const dropY = event.clientY - targetRect.top

  targetElement.classList.remove('drag-over', 'drag-over-before', 'drag-over-after')

  if (dropY <= 10)
    targetElement.classList.add('drag-over-before')

  if (dropY > 10 && dropY < targetRect.height - 10)
    targetElement.classList.add('drag-over')

  if (dropY >= targetRect.height - 10)
    targetElement.classList.add('drag-over-after')

  currentDropTarget.value = targetElement
}

function handleDrop(event, targetTask) {
  event.preventDefault()
  if (currentDropTarget.value)
    currentDropTarget.value.classList.remove('drag-over', 'drag-over-before', 'drag-over-after')

  if (!draggedTask.value || draggedTask.value.task === targetTask)
    return

  const dragged = draggedTask.value.task
  const draggedIndex = draggedTask.value.index
  const targetIndex = tasks.value.indexOf(targetTask)

  const targetRect = event.target.getBoundingClientRect()
  const dropY = event.clientY - targetRect.top
  const dropPosition = dropY / targetRect.height

  tasks.value.splice(draggedIndex, 1)
  if (dropPosition < 0.25) {
    // Drop before target
    tasks.value.splice(targetIndex, 0, dragged)
  }
  else if (dropPosition > 0.75) {
    // Drop after target
    tasks.value.splice(targetIndex + 1, 0, dragged)
  }
  else {
    // Drop as child
    if (!targetTask.children)
      targetTask.children = []

    targetTask.children.push(dragged)
  }

  draggedTask.value = null
  currentDropTarget.value = null
}
</script>

<template>
  <ul>
    <li
      v-for="(task, index) in tasks"
      :id="task.id"
      :key="index"
      class="uf-block w-fit relative"
      draggable="true"
      :gid="task.gid"
      :parent_gid="task.parent_gid"
      @dragstart.stop="handleDragStart($event, task, index)"
      @dragend.stop="handleDragEnd"
      @dragover.stop="handleDragOver($event, task)"
      @drop.stop="handleDrop($event, task)"
    >
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
