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
  return props.level * 28 + (children <= 0 ? 28 : 0) + 8
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
      class="h-10 border-b shrink-0"
      :style="{ width: `${column.width}px` }"
      @click="$emit('cell:select', { gid: task.gid, field: column.value })"
    >
      <div
        class="inset-0 flex flex-nowrap items-center w-full h-full relative rounded-[1px]"
        :class="{ 'focus': selectedCell?.gid === task.gid && selectedCell?.field === column.value, 'pr-2': index === 0 }"
        :style="{ 'padding-left': `${index === 0 ? tabWith : 0}px` }"
      >
        <div
          v-if="task.children && task.children.length > 0 && index === 0"
          class="transform transition-transform duration-200 w-7 h-7 cursor-pointer rounded flex items-center justify-center"
          :style="{ transform: hideChildren ? 'rotate(-90deg)' : 'rotate(0deg)' }"
        >
          <div class="flex items-center justify-center w-5 h-5 rounded hover:bg-gray-100">
            <span class="icon-[lucide--chevron-down]" @click="handleToggle(task.gid)" />
          </div>
        </div>

        <FieldTitle v-if="column.value === 'title'" v-model="task[column.value]" :data="task" open-detail />
        <FieldUids v-else-if="column.value === 'uids'" v-model="task[column.value]" :data="task" class="!shadow-none !ring-0 bg-transparent" />
        <FieldStatus v-else-if="column.value === 'status'" v-model="task[column.value]" :data="task" class="!shadow-none !ring-0 bg-transparent" />
        <FieldPriority v-else-if="column.value === 'priority'" v-model="task[column.value]" :data="task" class="!shadow-none !ring-0 bg-transparent" />
        <FieldDate v-else-if="column.value === 'start_time'" v-model="task[column.value]" field="start_time" :data="task" />
        <FieldDate v-else-if="column.value === 'end_time'" v-model="task[column.value]" field="end_time" :data="task" />
        <FieldDate v-else-if="column.value === 'done_time'" v-model="task[column.value]" field="done_time" :data="task" />
        <User v-else-if="column.value === 'uid'" :uid="task[column.value]" class="px-2" />
        <span v-else>
          {{ task[column.value] }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .focus {
    @apply  outline outline-1 outline-green-600 hover:outline-green-600 bg-white ;
    &:after {
      content: '';
      @apply bg-white absolute border border-green-600 w-2 h-2 rounded-full bottom-0 right-0 translate-x-1/2 translate-y-1/2 z-50;
    }
  }
</style>
