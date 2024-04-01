<script setup>
import Table from './components/table.vue'
import GroupBy from './components/GroupBy.vue'

const issuesRef = ref(null)

const form = reactive({
  key: '',
  key_field: '',
  sort_field: '',
  sort: '',
  groupby_field: '',
})
</script>

<template>
  <div class="flex flex-col">
    <div class="flex items-center justify-between px-4 mb-5">
      <div class="flex items-center h-11 text-xl shrink-0">
        问题列表
      </div>
    </div>
    <div class="px-5 space-x-3 flex items-center justify-between mb-3">
      <div class="flex items-center space-x-4">
        <div class="inline-flex items-center h-8 bg-gray-200/70 p-0.5 rounded-lg shrink-0">
          <div class="flex items-center space-x-1 px-4 bg-white rounded-lg h-full cursor-pointer">
            <span class="icon-[lucide--table-2]" />
            <span>表格</span>
          </div>
          <el-tooltip content="未开放" placement="top">
            <div
              class="flex items-center space-x-1 px-4 rounded-lg h-full cursor-pointer text-zinc-600 hover:text-blue-600"
            >
              <span class="icon-[lucide--square-kanban]" />
              <span>看板</span>
            </div>
          </el-tooltip>
        </div>
        <div class="flex items-center">
          <np-button icon="plus" text class="bg-none hover:text-blue-500" size="32">
            <span>添加问题</span>
          </np-button>
          <GroupBy />
          <el-dropdown>
            <np-button icon="more-horizontal" text class="bg-none hover:text-blue-500" size="32" />
            <template #dropdown>
              <el-dropdown-menu class="w-48">
                <el-dropdown-item>
                  <div class="flex items-center w-full">
                    <span class="icon-[lucide--plus-circle] mr-2" />
                    <span>添加问题</span>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <el-input v-model="form.key" placeholder="按问题名搜索" clearable class="w-80">
          <template #prefix>
            <span class="icon-[lucide--list-filter] text-gray-500" />
          </template>
        </el-input>
      </div>
    </div>
    <Table :form="form" />
    <pre>
      {{ form }}
    </pre>
    <span class="text-blue-600">蓝色</span>
  </div>
</template>
