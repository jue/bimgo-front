<script setup>
import { defineProps, defineSlots, useSlots } from 'vue'

defineProps({
  row: Object,
  columns: Array,
  index: Number,
  id: Boolean,
  columnAttribute: String,
  size: Number,
  border: Boolean,
  options: Object,
})
</script>

<template>
  <tr :class="{ 'divide-x': border }" :style="{ height: `${size}px` }">
    <td v-if="id" class="text-left relative px-3">
      <slot name="id-td" :column="column" :row="row" :index="index">
        <span>{{ index + 1 }}</span>
      </slot>
    </td>
    <td v-for="(column, subIndex) in columns" :key="subIndex" nowrap class="text-left relative px-3">
      <slot :name="`${column[options.value]}-data`" :column="column" :row="row" :index="index">
        <span class="h-full flex items-center -mx-3 px-3">
          {{ row[column[options.value]] }}
        </span>
      </slot>
    </td>
  </tr>
</template>
