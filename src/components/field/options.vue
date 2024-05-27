<script setup>
const props = defineProps({
  cate: {
    type: String,
    default: 'task',
  },
})
const { issue_columns_v2, task_columns } = storeToRefs(useUserStore())

const options = computed(() => {
  if (props.cate === 'issue')
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
  const option = options.value.find(val => val.value === item.value)
  option.show = !option.show

  await http.post('/issue/column/update', {
    data: {
      [item.value]: {
        show: option.show,
      },
    },
  })
}
</script>

<template>
  <div>
    <Button icon="icon-[lucide--plus]" text plain size="small" @click="toggle" />
    <OverlayPanel ref="opRef">
      <Menu ref="menuRef" :model="splitFields">
        <template #submenuheader="{ item }">
          <span class="text-gray-400 text-xs font-bold h-7">{{ item.label }}</span>
        </template>
        <template #item="{ item }">
          <div class="py-1.5 px-2 cursor-pointer rounded-md flex items-center select-none w-full space-x-2" @click="columnShow(item)">
            <span class="w-4 h-4" :class="{ 'icon-[lucide--check]': item.show }" />
            <span class="w-4 h-4 text-slate-600" :class="{ [item.icon]: !!item.icon }" />
            <span>
              {{ item.label }}</span>
          </div>
        </template>
      </Menu>
    </OverlayPanel>
    <!-- <Menu id="overlay_menu" ref="menuRef" :model="options" :popup="true" /> -->
  </div>
</template>
