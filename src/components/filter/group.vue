<script setup>
const props = defineProps({
  cate: {
    type: String,
    default: 'task',
  },
})

const { payload } = storeToRefs(useIssueStore())
const { issue_columns_v2, task_columns } = storeToRefs(useUserStore())

const options = computed(() => {
  if (props.cate === 'issue')
    return issue_columns_v2.value
  else
    return task_columns.value
})

const menuRef = ref(null)
const items = ref([
  {
    label: '分组方式',
    value: 'groupby_field',
    items: [
      {
        label: '无',
        value: '',
      },
      ...toRaw(options.value).map(item => ({
        ...item,
        command: () => {
          payload.value.groupby_field = item.value
          useIssueStore().getIssues()
        },
      })),
    ],
  },
  // {
  //   label: '排列方式',
  //   value: 'groupby_order',
  //   items: [
  //     {
  //       label: '默认',
  //       value: '',
  //     },
  //     {
  //       label: '升序',
  //       value: 'asc',
  //     },
  //     {
  //       label: '降序',
  //       value: 'desc',
  //     },
  //   ],
  // },
])
console.log(items.value)

const overlayVisible = ref(false)
function toggle(event) {
  menuRef.value.toggle(event)
}
</script>

<template>
  <Button icon="icon-[lucide--group]" label="分组" text class="hover:bg-transparent hover:text-blue-400" :class="{ 'text-blue-400': overlayVisible }" @click="toggle" />
  <Menu ref="menuRef" :model="items" popup>
    <template #item="{ item }">
      <np-menu-item :label="item.label" :icon="payload.groupby_field === item.value ? 'icon-[lucide--check]' : ''" :divider="item.divider" :danger="item.danger" />
    </template>
  </Menu>
  <!-- <OverlayPanel ref="menuRef">
    <Listbox v-model="payload.groupby_field" :options="items" option-label="label" option-value="value" option-group-label="label" option-group-children="items">
      <template #optiongroup="{ option }">
        <div class="flex align-items-center">
          {{ option.label }}
        </div>
      </template>

      <template #option="{ option: item }">
        {{ item.label }}
        <np-menu-item :label="item.label" :icon="payload.groupby_field === item.value ? 'icon-[lucide--check]' : ''" :divider="item.divider" :danger="item.danger" />
      </template>
    </Listbox>
  </OverlayPanel> -->
</template>
