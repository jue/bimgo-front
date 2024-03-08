<script setup>
const props = defineProps({
  form: {
    type: Object,
    default: () => ({
      key: '',
      sort: 'default',
    }),
  },
})
</script>

<template>
  <div class="flex items-center space-x-4">
    <el-input v-model="form.key" placeholder="按任务名搜索" class="w-64" clearable />

    <np-dropdown>
      <div class="flex items-center space-x-1 hover:text-blue-500">
        <span class="icon-[lucide--rows]" />
        <span class="shrink-0">分组查看</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <span class="icon-[lucide--check] mr-2 text-blue-600" />
            <span>按默认查看</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span class="icon-[lucide--check] mr-2 text-blue-600" />
            <span>按完成时间查看</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span class="icon-[lucide--check] mr-2 text-blue-600" />
            <span>按执行团队查看</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span class="icon-[lucide--check] mr-2 text-blue-600" />
            <span>按状态查看</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </np-dropdown>

    <np-dropdown>
      <div class="flex items-center space-x-1 hover:text-blue-500">
        <span class="icon-[lucide--text-cursor-input]" />
        <span class="shrink-0">字段</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <span class="icon-[lucide--check] mr-2 text-blue-600" />
            <span>按默认查看</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span class="icon-[lucide--check] mr-2 text-blue-600" />
            <span>按完成时间查看</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span class="icon-[lucide--check] mr-2 text-blue-600" />
            <span>按执行团队查看</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span class="icon-[lucide--check] mr-2 text-blue-600" />
            <span>按状态查看</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </np-dropdown>
  </div>
</template>
