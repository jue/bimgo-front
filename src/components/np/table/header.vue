<script setup>
import { defineProps, useSlots } from 'vue'

defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  size: {
    type: Number,
    default: 40,
  },
  border: {
    type: Boolean,
    default: false,
  },
  id: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Object,
    default: () => {
      return {
        label: 'label',
        value: 'value',
        idWidth: '40',
      }
    },
  },
})
</script>

<template>
  <tr :class="{ 'divide-x': border }" :style="{ height: `${size}px` }">
    <th v-if="id" class="relative break" nowrap :style="{ 'min-width': `${options?.idWidth}px` }">
      <div class="absolute inset-0 px-2">
        <slot name="id-th">
          <span class="h-full flex items-center -mx-2 px-2">
            序号
          </span>
        </slot>
      </div>
    </th>
    <th
      v-for="(column, index) in columns" :key="index" nowrap class="text-left px-2 relative"
      :style="{ 'min-width': `${column?.width || 200}px`, 'max-width': `${column?.width || 200}px` }"
    >
      <div class="absolute inset-0 px-2">
        <slot :name="`${column[options.value]}-header`" :column="column">
          <span class="h-full flex items-center -mx-2 px-2">
            {{ column[options.label] }}
          </span>
        </slot>
      </div>
    </th>
  </tr>
</template>
