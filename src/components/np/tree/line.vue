<script setup>
import dayjs from 'dayjs'

const props = defineProps({
  task: {
    type: Object,
    default: () => {},
  },
  level: {
    type: Number,
    default: 0,
  },
})

const { cate, columns, selectedGids, hoverGid } = storeToRefs(useTaskStore())

const tabWith = computed(() => {
  const children = props.task.children || 0
  return props.level * 28 + (children <= 0 ? 36 : 8)
})

// 当前选中的单元格
const selectedCell = ref({
  gid: null, // 行gid
  field: null, // Column field name
})

const cellRef = ref(null)
onClickOutside(cellRef, () => {
  selectedCell.value = {
    gid: null,
    field: null,
  }
})

function handleSelectCell(obj) {
  if (obj.field === 'id') {
    selectedCell.value = {
      gid: null,
      field: null,
    }
    return
  }
  selectedCell.value = obj
}

// 当前的任务数据
const { unexpandedKeys } = storeToRefs(useTaskStore())

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
    ref="cellRef"
    class="flex divide-x w-fit min-w-full border-b"
    :class="{ 'bg-[#ebf6ff]/50': task.gid === hoverGid }"
    @mouseenter="hoverGid = task.gid"
    @mouseleave="hoverGid = ''"
  >
    <div
      v-for="(column, index) in columns.filter(item => item.show)"
      :key="index"
      class="flex items-center shrink-0 relative h-10"
      :class="{
        'focus': selectedCell.gid === task.gid && selectedCell.field === column.value,
        'justify-center': column.value === 'id',
        'px-2': column.value === 'title',
      }"
      :style="{
        'width': `${column.width}px`,
        'padding-left': `${cate === 'task' ? (column.value === 'title' ? tabWith : 0) : (column.value === 'title' ? 8 : 0)}px`,
      }"
      @click="handleSelectCell({ gid: task.gid, field: column.value })"
    >
      <div
        v-if="task.children && task.children.length > 0 && column.value === 'title'"
        class="transform transition-transform duration-200 w-7 h-7 cursor-pointer rounded flex items-center justify-center"
        :style="{ transform: hideChildren ? 'rotate(-90deg)' : 'rotate(0deg)' }"
      >
        <div class="flex items-center justify-center w-5 h-5 rounded hover:bg-gray-100">
          <span class="icon-[lucide--chevron-down]" @click="handleToggle(task.gid)" />
        </div>
      </div>

      <FieldTitle v-if="column.value === 'title'" v-model="task[column.value]" :data="task" open-detail :cate="cate" />
      <FieldUids v-else-if="column.value === 'uids'" v-model="task[column.value]" :data="task" class="!shadow-none !ring-0 bg-transparent" :cate="cate" />
      <FieldStatus v-else-if="column.value === 'status'" v-model="task[column.value]" :data="task" class="!shadow-none !ring-0 bg-transparent" :cate="cate" />
      <FieldPriority v-else-if="column.value === 'priority'" v-model="task[column.value]" :data="task" class="!shadow-none !ring-0 bg-transparent" :cate="cate" />
      <FieldDate v-else-if="column.value === 'start_time'" v-model="task[column.value]" field="start_time" :data="task" class="!shadow-none !ring-0 bg-transparent" :cate="cate" />
      <FieldDate v-else-if="column.value === 'end_time'" v-model="task[column.value]" field="end_time" :data="task" class="!shadow-none !ring-0 bg-transparent" :cate="cate" />
      <FieldDate v-else-if="column.value === 'done_time'" v-model="task[column.value]" field="done_time" :data="task" class="!shadow-none !ring-0 bg-transparent" :cate="cate" />
      <template v-else-if="column.value === 'id'">
        <Checkbox v-model="selectedGids" :value="task.gid" />
      </template>
      <User v-else-if="column.value === 'uid'" :uid="task[column.value]" class="px-2" />
      <span v-else-if="column.value === 'created_at'" class="px-2">
        {{ dayjs(task[column.value]).format('YYYY-MM-DD HH:mm') }}
      </span>
      <span v-else>
        {{ task[column.value] }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .focus {
    @apply  outline outline-1 -outline-offset-1 outline-green-500 bg-white rounded-sm;
    &:after {
      content: '';
      @apply bg-white absolute border border-green-600 w-2 h-2 rounded-full bottom-0 right-0 translate-x-1/2 translate-y-1/2 z-50;
    }
  }
</style>

<!-- <style lang="scss" scoped>
  .focus {
    @apply  outline outline-1 outline-green-600 hover:outline-green-600 bg-white ;
    &:after {
      content: '';
      @apply bg-white absolute border border-green-600 w-2 h-2 rounded-full bottom-0 right-0 translate-x-1/2 translate-y-1/2 z-50;
    }
  }
</style> -->
