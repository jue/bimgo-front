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

const viewData = ref([
  {
    label: '按默认查看',
    value: 'default',
  },
  {
    label: '按结束日期排序',
    value: 'end_time',
  },
  {
    label: '按优先级排序',
    value: 'priority',
  },
  {
    label: '按执行团队查看',
    value: 'contractor_id',
  },
  {
    label: '按状态排序',
    value: 'status',
  },
])

const text = ref('按默认查看')
function selectSort(obj) {
  props.form.sort = obj.value
  text.value = obj.label
}
</script>

<template>
  <div class="flex items-center space-x-4">
    <el-input v-model="form.key" placeholder="按任务名搜索" class="w-64" clearable>
      <template #prefix>
        <i class="icon-[lucide--search]" />
      </template>
    </el-input>

    <np-dropdown>
      <div class="flex items-center space-x-1 hover:text-blue-500">
        <span class="icon-[lucide--rows]" />
        <span class="shrink-0">{{ text }}</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in viewData" :key="item.value" @click="selectSort(item)">
            <div class="flex items-center mr-2 w-4">
              <span v-if="form.sort === item.value" class="icon-[lucide--check] text-blue-600" />
            </div>
            <span>{{ item.label }}</span>
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
