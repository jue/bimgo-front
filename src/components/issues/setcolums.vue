<script setup>
const { issue_columns } = storeToRefs(useUserStore())
async function columnShow(val) {
  issue_columns.value[val].show = !issue_columns.value[val].show
  await http.post('/issue/column/update', {
    data: {
      [val]: {
        show: issue_columns.value[val].show,
      },
    },
  })
}
</script>

<template>
  <el-dropdown trigger="click" :hide-on-click="false">
    <div class="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-200/60 rounded-lg">
      <span class="icon-[lucide--plus]" />
    </div>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(column, value) in issue_columns" :key="value" :disabled="value === 'title'"
          @click="columnShow(value)"
        >
          <div class="flex items-center">
            <div class="mr-2 flex items-center w-4 h-4">
              <span v-if="column.show" class="icon-[lucide--check] " />
            </div>
            <span>{{ column.label }}</span>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
