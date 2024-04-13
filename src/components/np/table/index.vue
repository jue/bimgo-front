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
        idWidth: '40',
      }
    },
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

// const emit = defineEmits(['hover', 'mouseleave'])

const colspan = computed(() => {
  return props.columns.length + (props.id ? 1 : 0)
})

const selectedCell = ref({
  index: null, // Row index
  field: null, // Column field name
})

function handleCellClick(event) {
  selectedCell.value = event
}

const tableRef = ref(null)
onClickOutside(tableRef, () => {
  selectedCell.value = {
    index: null,
    field: null,
  }
})

const defaultOptions = ref({
  label: 'label',
  value: 'value',
  idWidth: '40',
})

const allOptions = computed(() => {
  return {
    ...defaultOptions.value,
    ...props.options,
  }
})
</script>

<template>
  <div class="relative overflow-x-auto">
    <table ref="tableRef" class="min-w-full border-collapse divide-y table-fixed">
      <!-- 表头部分 -->
      <thead>
        <TableHeader :id="id" :columns="columns" :size="size" :border="border" :options="allOptions">
          <template #id-th>
            <slot name="id-th" />
          </template>
          <template v-for="column in columns" #[`${column[allOptions.value]}-header`]="{ column }">
            <slot :name="`${column[allOptions.value]}-header`" :column="column" />
          </template>
        </TableHeader>
      </thead>
      <tbody class="divide-y">
        <tr v-if="!rows.length" class="h-8 text-center text-gray-300">
          <td :colspan="colspan">
            <slot name="empty">
              <div class="flex items-center justify-center text-gray-400 min-h-20">
                <span v-if="loading" />
                <span v-else>暂无数据</span>
              </div>
            </slot>
          </td>
        </tr>
        <template v-else>
          <template v-if="tree && rows.length">
            <template v-for="(group, groupIndex) in rows" :key="groupIndex">
              <TreeItem
                :id="id" :group="group" :columns="columns" :size="size" :border="border" :options="allOptions"
                :colspan="colspan" :selected-cell="selectedCell"
              >
                <template #id-td="{ row, column, index }">
                  <slot name="id-td" :column="column" :row="row" :index="index" />
                </template>
                <template v-for="column in columns" #[`${column[allOptions.value]}-data`]="{ row, column, index }">
                  <slot :name="`${column[allOptions.value]}-data`" :column="column" :row="row" :index="index" />
                </template>

                <template #group-th="{ group }">
                  <slot name="group-th" :group="group" />
                </template>
              </TreeItem>
            </template>
          </template>

          <template v-else>
            <Row
              v-for="(row, index) in rows" :id="id" :key="index" :row="row" :columns="columns" :index="index"
              :options="allOptions" :size="size" :border="border" class="hover:bg-gray-100"
              :selected-cell="selectedCell" @hover="($event) => $emit('hover', $event)"
              @mouseleave="($event) => $emit('mouseleave', $event)" @cell:select="handleCellClick"
            >
              <template #id-td="{ row, column, index }">
                <slot name="id-td" :column="column" :row="row" :index="index" />
              </template>
              <template v-for="column in columns" #[`${column[allOptions.value]}-data`]="{ row, column, index }">
                <slot :name="`${column[allOptions.value]}-data`" :column="column" :row="row" :index="index" />
              </template>
            </Row>
          </template>
        </template>
      </tbody>
    </table>
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-white/60">
      <span class="icon-[lucide--loader] animate-spin" :style="{ 'margin-top': `${size}px` }" />
    </div>
  </div>
</template>
