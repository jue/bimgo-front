<script setup>
const { payload_issue: payload } = storeToRefs(useTaskStore())
const { getTasks } = useTaskStore()

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
          getTasks()
        },
      },
      {
        label: '我的任务',
        value: 'mine',
        icon: '',
        command: () => {
          payload.value.list = 'mine'
          getTasks()
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
  <Button
    icon="icon-[lucide--filter]" :label="labelText" text
    class="text-zinc-800 hover:bg-transparent hover:text-blue-400"
    :class="{ '!text-blue-400': payload.list !== 'all' }"
    @click="toggle"
  />
  <Menu ref="menuRef" :model="items" popup>
    <template #item="{ item }">
      <np-menu-item :label="item.label" :icon="payload.list === item.value ? 'icon-[lucide--check]' : ''" :divider="item.divider" :danger="item.danger" />
    </template>
  </Menu>
</template>
