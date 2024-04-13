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
  selectedCell: Object,
})

const show = ref(true)
const selectedCell = ref({
  index: null, // Row index
  field: null, // Column field name
})
function handleCellClick(event) {
  console.log(event)
  selectedCell.value = event
}

const tableRef = ref(null)
onClickOutside(tableRef, () => {
  selectedCell.value = {
    index: null,
    field: null,
  }
})
</script>

<template>
  <tr :style="{ height: `${size}px` }">
    <td class="relative">
      <div class="absolute inset-0 px-2">
        <span class="h-full flex items-center justify-center -mx-2 px-2">
          <el-button class="w-6 h-6 p-0" text @click="show = !show">
            <span class="icon-[lucide--chevron-down] cursor-pointer " :class="{ '-rotate-90': !show }" />
          </el-button>
        </span>
      </div>
    </td>
    <td :colspan="colspan - 1" class="relative">
      <div class="absolute inset-0 px-2">
        <slot name="group-th" :group="group">
          <span class="h-full flex items-center -mx-2 px-2">{{ group.value }}</span>
        </slot>
      </div>
    </td>
  </tr>
  <Row
    v-for="(row, index) in group.rows" :id="id" :key="index" :row="row" :columns="columns" :show="show"
    :index="index" :size="size" :border="border" :options="options" class="hover:bg-gray-100"
    @cell:select="handleCellClick"
  >
    <template #id-td="{ row, column, index }">
      <slot name="id-td" :column="column" :row="row" :index="index" />
    </template>
    <template v-for="column in columns" #[`${column[options.value]}-data`]="{ row, column, index }">
      <slot :name="`${column[options.value]}-data`" :column="column" :row="row" :index="index" />
    </template>
  </Row>
</template>
