<script setup>
const props = defineProps({
  task: {
    type: Object,
    default: () => ({}),
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
})
const gid = inject('gid')

const unexpandedKeys = inject('unexpandedKeys')

const tabWith = computed(() => {
  const children = props.task.children || 0
  return props.level * 20 + (children <= 0 ? 20 : 0)
})

const hideChildren = computed(() => unexpandedKeys.value.includes(props.task.gid))
function handleToggle(gid) {
  hideChildren.value = !hideChildren.value

  const index = unexpandedKeys.value.indexOf(gid)
  if (index > -1)
    unexpandedKeys.value.splice(index, 1)
  else
    unexpandedKeys.value.push(gid)
}

function handleSetGid(id) {
  gid.value = id
}
</script>

<template>
  <tr :class="{ 'bg-[#ebf6ff]/50': task.gid === gid }" @mouseenter="handleSetGid(task.gid)" @mouseleave="handleSetGid('')">
    <td class="p-0 h-8">
      <div class="flex items-center justify-center">
        <span class="text-[#485776] text-xs">{{ task.id }}</span>
      </div>
    </td>
    <td
      v-for="(column, index) in columns"
      :key="index"
      class="relative"
    >
      <div
        class="inset-0 px-2 flex flex-nowrap items-center text-[#00021bf8]"
        :style="{ 'margin-left': `${index === 0 ? tabWith : 0}px` }"
      >
        <span v-if="task.children && task.children.length > 0 && index === 0" class="transform transition-transform duration-200 mr-1" :style="{ transform: hideChildren ? 'rotate(-90deg)' : 'rotate(0deg)' }">
          <svg class="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" @click="handleToggle(task.gid)">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
        {{ task[column.value] }}
      </div>
    </td>
  </tr>
  <template v-if="task.children && task.children.length > 0 && !hideChildren">
    <Row
      v-for="(childTask, childIndex) in task.children"
      :key="childIndex"
      :task="childTask"
      :columns="columns"
      :level="level + 1"
    />
  </template>
</template>

<style lang="scss" scoped>
table,
th,
td,
tr {
  @apply p-0 box-border;
}
td{
  @apply border h-8;
}
</style>
