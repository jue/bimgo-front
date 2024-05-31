<script setup>
// 原始数据
const { task_columns, issue_columns_v2 } = storeToRefs(useUserStore())

// 当前的任务数据
const { cate, columns } = storeToRefs(useTaskStore())

const options = computed(() => {
  if (cate.value === 'issue')
    return issue_columns_v2.value
  else
    return task_columns.value
})

const splitFields = computed(() => {
  const result = [
    {
      label: '显示字段',
      items: [],
    },
    {
      label: '隐藏字段',
      items: [],
    },
  ]

  options.value.forEach((item) => {
    if (item.show)
      result[0].items.push(item)
    else
      result[1].items.push(item)
  })

  return result
})

// 下拉菜单选项
const menuRef = ref(null)
const opRef = ref(null)

function toggle(event) {
  opRef.value.toggle(event)
}

async function columnShow(item) {
  const column = columns.value.find(val => val.value === item.value)
  column.show = !column.show

  await http.post(`/${cate.value}/column/update`, {
    data: {
      [item.value]: {
        show: column.show,
      },
    },
  })
}
</script>

<template>
  <div class="inline-block" @click="toggle">
    <slot>
      <Button icon="icon-[lucide--settings]" text plain size="small" />
    </slot>
  </div>
  <OverlayPanel ref="opRef">
    <Menu ref="menuRef" :model="splitFields">
      <template #submenuheader="{ item }">
        <span class="text-gray-400 text-xs font-bold h-7">{{ item.label }}</span>
      </template>
      <template #item="{ item }">
        <div class="py-1.5 px-2 cursor-pointer rounded-md flex items-center select-none w-full space-x-2" @click="columnShow(item)">
          <span class="w-4 h-4" :class="{ 'icon-[lucide--check]': item.show }" />
          <!-- <span class="w-4 h-4 text-slate-600" :class="{ [item.icon]: !!item.icon }" /> -->
          <span>
            {{ item.label }}</span>
        </div>
      </template>
    </Menu>
  </OverlayPanel>
</template>
