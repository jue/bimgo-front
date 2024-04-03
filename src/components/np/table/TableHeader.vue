<script setup>
import { defineProps, useSlots } from 'vue'

defineProps({
  columns: Array,
  size: Number,
  border: Boolean,
  id: Boolean,
  options: Object,
})
</script>

<template>
  <tr :class="{ 'divide-x': border }" :style="{ height: `${size}px` }">
    <th v-if="id" class="text-left px-2 relative break" nowrap :style="{ 'min-width': `${options?.idWidth}px` }">
      <slot name="id-th">
        <span class="h-full flex items-center -mx-2 px-2">
          序号
        </span>
      </slot>
    </th>
    <th
      v-for="(column, index) in columns" :key="index" nowrap class="text-left px-2 relative"
      :style="{ 'min-width': `${column?.width}px`, 'max-width': `${column?.width}px` }"
    >
      <slot :name="`${column[options.value]}-header`" :column="column">
        <span class="h-full flex items-center -mx-2 px-2">
          {{ column[options.label] }}
        </span>
      </slot>
    </th>
  </tr>
</template>
