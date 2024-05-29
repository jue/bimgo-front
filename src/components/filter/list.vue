<script setup>
const props = defineProps({
  cate: {
    type: String,
    default: 'task',
  },
})

const { payload } = storeToRefs(useIssueStore())

const menuRef = ref(null)
const items = ref([
  {
    label: '筛选预置',
    items: [
      {
        label: '所有任务',
        value: 'all',
        icon: '',
        command: () => {
          payload.value.list = 'all'
          useIssueStore().getIssues()
        },
      },
      {
        label: '我的任务',
        value: 'mine',
        icon: '',
        command: () => {
          payload.value.list = 'mine'
          useIssueStore().getIssues()
        },
      },
    ],
  },
])

const labelText = computed(() => {
  return items.value[0].items.find(item => item.value === payload.value.list)?.label
})

function toggle(event) {
  menuRef.value.toggle(event)
}
</script>

<template>
  <Button icon="icon-[lucide--filter]" :label="labelText" text @click="toggle" />
  <Menu ref="menuRef" :model="items" popup>
    <template #item="{ item }">
      <np-menu-item :label="item.label" :icon="payload.list === item.value ? 'icon-[lucide--check]' : ''" :divider="item.divider" :danger="item.danger" />
    </template>
  </Menu>
</template>
