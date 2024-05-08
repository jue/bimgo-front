<script setup>
import DragBtn from './dragBtn.vue'

const props = defineProps({
  task: {
    type: Object,
    default: () => ({}),
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

const tabWith = computed(() => {
  const children = props.task.children || 0
  return props.level * 22 + (children <= 0 ? 22 : 0)
})

const gid = inject('gid')

const filterColumns = computed(() => {
  return props.columns.filter(item => item.show)
})

const unexpandedKeys = inject('unexpandedKeys')
const hideChildren = computed(() => unexpandedKeys.value.includes(props.task.gid))
function handleToggle(gid) {
  hideChildren.value = !hideChildren.value

  const index = unexpandedKeys.value.indexOf(gid)
  if (index > -1)
    unexpandedKeys.value.splice(index, 1)
  else
    unexpandedKeys.value.push(gid)
}
</script>

<template>
  <div
    :class="{ 'bg-[#ebf6ff]/50': task.gid === gid }"
    class="flex items-center divide-x select-none"
    @mouseenter="gid = task.gid"
    @mouseleave="gid = ''"
  >
    <div class="w-10 h-10 flex items-center justify-center shrink-0 border-b">
      <DragBtn v-if="task.gid === gid" />
      <span v-else class="text-[#485776] text-xs">{{ task.id }}</span>
    </div>
    <div
      v-for="(column, index) in filterColumns"
      :key="index"
      class="text-xs h-10 flex items-center border-b shrink-0 overflow-hidden"
      :style="{ width: `${column.width}px` }"
      :class="{ focus: selectedCell?.gid === task.gid && selectedCell?.field === column.value }"
      @click="$emit('cell:select', { gid: task.gid, field: column.value })"
    >
      <div
        class="inset-0 px-2 flex flex-nowrap items-center w-full"
        :style="{ 'margin-left': `${index === 0 ? tabWith : 0}px` }"
      >
        <span v-if="task.children && task.children.length > 0 && index === 0" class="transform transition-transform duration-200 mr-1" :style="{ transform: hideChildren ? 'rotate(-90deg)' : 'rotate(0deg)' }">
          <svg class="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" @click="handleToggle(task.gid)">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>

        <FieldTitle v-if="column.value === 'title'" v-model="task[column.value]" :data="task" />
        <span v-else>
          {{ task[column.value] }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.focus{
  @apply rounded outline outline-green-400 outline-2 -outline-offset-2;
}
</style>
