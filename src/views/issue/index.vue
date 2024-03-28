<script setup>
const input = ref('')
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
        <el-input v-model="input" placeholder="按问题名搜索" clearable class="w-80">
          <template #prefix>
            <span class="icon-[lucide--list-filter] text-gray-500" />
          </template>
        </el-input>
      </div>
      <div class="flex items-center space-x-4">
        <el-tooltip content="添加问题">
          <np-button icon="plus" shape="square" />
        </el-tooltip>
        <el-dropdown>
          <span class="icon-[lucide--more-horizontal]" />
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
    <Issues />
  </div>
</template>
