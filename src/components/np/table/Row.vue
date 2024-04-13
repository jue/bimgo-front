<script setup>
import { defineProps, defineSlots, useSlots } from 'vue'

const props = defineProps({
  row: Object,
  columns: Array,
  index: Number,
  id: Boolean,
  columnAttribute: String,
  size: Number,
  border: Boolean,
  options: Object,
  selectedCell: Object,
})

const emit = defineEmits(['hover', 'mouseleave'])

function onMouseEnter(event) {
  emit('hover', {
    event,
    row: props.row,
    index: props.index,
  })
}

function onMouseLeave(event) {
  emit('mouseleave', {
    event,
    row: props.row,
    index: props.index,
  })
}
</script>

<template>
  <tr
    :class="{ 'divide-x': border }" :style="{ height: `${size}px` }" class="group" @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <td v-if="id" class="relative">
      <div class="absolute inset-0 px-2">
        <slot name="id-td" :column="column" :row="row" :index="index">
          <span>{{ index + 1 }}</span>
        </slot>
      </div>
    </td>
    <td
      v-for="(column, subIndex) in columns" :key="subIndex" nowrap class="relative"
      :class="{ focus: selectedCell?.index === index && selectedCell?.field === column[options.value] }"
      @click="$emit('cell:select', { index, field: column[options.value] })"
    >
      <div class="absolute inset-0 px-2">
        <slot :name="`${column[options.value]}-data`" :column="column" :row="row" :index="index">
          <span class="h-full flex items-center -mx-2 px-2">
            {{ row[column[options.value]] }}
          </span>
        </slot>
      </div>
    </td>
  </tr>
</template>

<style lang="scss" scoped>
.focus{
  @apply rounded outline outline-blue-600 outline-2 -outline-offset-2;
}
</style>
