<script setup>
import Panel from 'primevue/panel'
import TableHeader from './tableHeader.vue'
import TableLine from './tableLine.vue'

const props = defineProps({
  tasks: {
    type: Array,
    default: () => [],
  },
})

const { issue_columns_v2 } = storeToRefs(useUserStore())
const { payload } = storeToRefs(useIssueStore())
const columns = computed(() => {
  return [
    {
      label: '#',
      value: 'id',
      width: 40,
      show: true,
    },
    ...issue_columns_v2.value,
    {
      label: '操作',
      value: 'op',
      width: 80,
      show: true,
    },
  ].filter(item => item.show)
})
</script>

<template>
  <div class="overflow-x-auto relative">
    <TableHeader />
    <template v-if="payload.groupby_field">
      <div class="space-y-4">
        <Panel
          v-for="(item, index) in tasks"
          :key="index"
          :header="item.value"
          toggleable
          :pt="{
            root: {
              class: '',
            },
            header: {
              class: 'flex-row-reverse h-10 !bg-gray-50',
            },
            togglericon: {
              class: 'w-3 h-3 text-zinc-400',
            },
          }"
        >
          <TableLine cate="issue" :columns="columns" :tasks="item.rows" />

          <template #header>
            <div class="flex items-center w-full px-2">
              <FilterGroupName :group="item" />
            </div>
          </template>

          <!-- <template #footer>
            <CreateData cate="issue" class="border-none" />
          </template> -->
        </Panel>
      </div>
    </template>
    <template v-else>
      <TableLine cate="issue" :columns="columns" :tasks="tasks" />
    </template>
    <CreateData cate="issue" />
  </div>
</template>
