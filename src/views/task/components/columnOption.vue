<script setup>
const { task_columns } = storeToRefs(useUserStore())
const op = ref(null)

console.log(task_columns.value)

const isShow = ref(false)

function toggle(event) {
  op.value.toggle(event)
}

async function handleUpdate(val, column) {
  await http.post('/task/column/update', {
    data: {
      [column.value]: {
        show: val,
      },
    },
  })
}
</script>

<template>
  <div class="icon-[lucide--settings] cursor-pointer" :class="{ 'text-blue-400': isShow }" @click="toggle" />
  <OverlayPanel ref="op" @show="isShow = true" @hide="isShow = false">
    <div class="space-y-3 p-4">
      <div v-for="(column, index) in task_columns" :key="index" class="flex items-center space-x-2">
        <Checkbox v-model="column.show" :binary="true" :disabled=" column.value === 'title'" @update:model-value="handleUpdate($event, column)" /> <span>{{ column.label }}</span>
      </div>
    </div>
  </OverlayPanel>
</template>
