<script setup>
const show = ref(false)
</script>

<template>
  <el-dropdown trigger="click" @visible-change="(v) => (show = v)">
    <np-button
      icon="gallery-vertical-end" text class="bg-none hover:text-blue-500" :class="{ 'text-blue-500': show }"
    >
      <span>分组</span>
    </np-button>
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
</template>
