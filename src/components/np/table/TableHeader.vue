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
    <th v-if="id" class="text-left px-3 relative break" nowrap :style="{ width: `${options?.idWidth}px` }">
      <slot name="id-th">
        <span class="h-full flex items-center -mx-3 px-3">
          序号
        </span>
      </slot>
    </th>
    <th
      v-for="(column, index) in columns" :key="index" nowrap class="text-left px-3 relative"
      :style="{ width: `${column?.width}px` }"
    >
      <slot :name="`${column[options.value]}-header`">
        <span class="h-full flex items-center -mx-3 px-3">
          {{ column[options.label] }}
        </span>
      </slot>
    </th>
  </tr>
</template>
