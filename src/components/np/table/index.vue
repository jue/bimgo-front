<script setup>
import TableHeader from './TableHeader.vue'
import Row from './Row.vue'
import TreeItem from './TreeItem.vue'

const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  rows: {
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
  tree: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Object,
    default: () => {
      return {
        label: 'label',
        value: 'value',
      }
    },
  },
})

const colspan = computed(() => {
  return props.columns.length + (props.id ? 1 : 0)
})
</script>

<template>
  <div class="relative overflow-x-auto">
    <table class="min-w-full border-collapse divide-y table-fixed">
      <!-- 表头部分 -->
      <thead>
        <TableHeader :id="id" :columns="columns" :size="size" :border="border" :options="options">
          <template #id-th>
            <slot name="id-th" />
          </template>
          <template v-for="column in columns" #[`${column[options.value]}-header`]>
            <slot :name="`${column[options.value]}-header`" />
          </template>
        </TableHeader>
      </thead>
      <tbody class="divide-y">
        <tr v-if="!rows.length" class="h-8 text-center text-gray-300">
          <td :colspan="colspan">
            <slot name="empty">
              <div class="flex items-center justify-center text-gray-400 min-h-20">
                暂无数据
              </div>
            </slot>
          </td>
        </tr>
        <template v-else>
          <template v-if="tree">
            <TreeItem />
          </template>

          <template v-else>
            <Row
              v-for="(row, index) in rows" :id="id" :key="index" :row="row" :columns="columns" :index="index"
              :options="options" :size="size" :border="border" class="hover:bg-gray-100"
            >
              <template #id="{ row, column, index }">
                <slot name="id-td" :column="column" :row="row" :index="index" />
              </template>
              <template v-for="column in columns" #[`${column[options.value]}-data`]="{ row, column, index }">
                <slot :name="`${column[options.value]}-data`" :column="column" :row="row" :index="index" />
              </template>
            </Row>
          </template>
        </template>
      </tbody>
    </table>
  </div>
</template>
