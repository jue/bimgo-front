<script setup>
const key = ref('')

const userData = [
  {
    name: '向南',
    mobile: '13148407990',
    group: '管理员',
    status: '活跃',
  },
  {
    name: '向南',
    mobile: '13148407990',
    group: '管理员',
    status: '活跃',
  },
  {
    name: '向南',
    mobile: '13148407990',
    group: '管理员',
    status: '活跃',
  },
  {
    name: '向南',
    mobile: '13148407990',
    group: '管理员',
    status: '活跃',
  },
]

const drawerVisible = ref(false)

// 单选
function handleCurrentChange(val) {
  console.log(val)
  drawerVisible.value = true
}

// 多选
function handleSelectionChange() {

}
</script>

<template>
  <div>
    <div class="px-11">
      <div class="h-11 flex items-center justify-between">
        <div class="text-xl font-bold">
          <span>管理员</span> <span class="text-zinc-500">(3)</span>
        </div>
      </div>
      <div class="mt-3 flex items-center space-x-4">
        <el-input v-model="key" placeholder="按名称或手机号搜索" clearable class="!w-80">
          <template #prefix>
            <i class="icon-[lucide--search]" />
          </template>
        </el-input>
        <el-dropdown>
          <div class="flex items-center space-x-1 hover:text-blue-500">
            <span class="icon-[lucide--filter]" />
            <span class="shrink-0">筛选</span>
          </div>
          <template #dropdown>
            <el-dropdown-item>
              <span class="icon-[lucide--user-plus] mr-2" />jjj
            </el-dropdown-item>
          </template>
        </el-dropdown>
        <el-dropdown>
          <div class="flex items-center space-x-1 hover:text-blue-500">
            <span class="icon-[lucide--flip-horizontal]" />
            <span class="shrink-0">字段</span>
          </div>
          <template #dropdown>
            <el-dropdown-item>
              <span class="icon-[lucide--user-plus] mr-2" />jjj
            </el-dropdown-item>
          </template>
        </el-dropdown>
      </div>
    </div>

    <div class="mt-5">
      <el-table ref="multipleTableRef" highlight-current-row :data="userData" stripe style="width: 100%" @selection-change="handleSelectionChange" @current-change="handleCurrentChange">
        <el-table-column type="selection" width="40" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="mobile" label="手机号" />
        <el-table-column prop="group" label="使用者类型" />
        <el-table-column prop="status" label="状态" />
      </el-table>
    </div>

    <el-drawer v-model="drawerVisible" title="I am the title" :with-header="false" :modal="true">
      <span>Hi there!</span>
    </el-drawer>
  </div>
</template>
