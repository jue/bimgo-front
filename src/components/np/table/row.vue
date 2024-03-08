<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  columns: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div :style="{ paddingLeft: `${item.level * 20}px` }" class="table-row">
    <div
      v-for="(column, columnIndex) in columns" :key="columnIndex" :style="{ width: `${column.width || 100}px` }"
      class="table-cell"
    >
      {{ item[column.value] }}
    </div>
    <template v-if="item.children">
      <np-table-row v-for="child in item.children" :key="child.tid" :item="child" :columns="columns" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.table-row {
  display: flex;
}

.table-cell {
  border: 1px solid #ccc;
  padding: 5px;
  box-sizing: border-box;
}
</style>
