<script setup>
import Row from './Row.vue'

defineProps({
  group: Object,
  columns: Array,
  id: Boolean,
  size: Number,
  border: Boolean,
  options: Object,
  colspan: Number,
})

const show = ref(true)
</script>

<template>
  <tr :style="{ height: `${size}px` }">
    <td class="px-2 relative">
      <span class="h-full flex items-center justify-center -mx-2 px-2">
        <span class="icon-[lucide--chevron-down] cursor-pointer" />
      </span>
    </td>
    <td :colspan="colspan - 1" class="px-2 relative">
      <slot name="group-th" :group="group">
        <span class="h-full flex items-center -mx-2 px-2">{{ group.value }}</span>
      </slot>
    </td>
  </tr>
  <template v-if="show">
    <Row
      v-for="(row, index) in group.rows" :id="id" :key="index" :row="row" :columns="columns" :index="index"
      :size="size" :border="border" :options="options" class="hover:bg-gray-100"
    >
      <template #id-td="{ row, column, index }">
        <slot name="id-td" :column="column" :row="row" :index="index" />
      </template>
      <template v-for="column in columns" #[`${column[options.value]}-data`]="{ row, column, index }">
        <slot :name="`${column[options.value]}-data`" :column="column" :row="row" :index="index" />
      </template>
    </Row>
  </template>
</template>
