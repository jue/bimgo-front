<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  row: {
    type: Object,
    default: () => {},
  },
})
const emit = defineEmits(['edit', 'refresh'])

const isExpanded = ref(false)

function visibleChange(val) {
  isExpanded.value = val
}

function deleteTask(data) {
  ElMessageBox.confirm(
    `确定删除 ${data.title} 吗？`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    },
  )
    .then(async () => {
      const { data: res } = await http.post('/task/delete', {
        tid: data.tid,
      })
      if (res.code === 200)
        emit('refresh')
    })
    .catch(() => {
    })
}
</script>

<template>
  <div
    class="flex items-center flex-1 justify-between group w-full  h-full cursor-pointer -mx-3 px-3 rounded-l"
  >
    <div>{{ title }}</div>
    <el-dropdown trigger="click" @visible-change="visibleChange">
      <div class="more h-6 w-6 rounded-md opacity-0 flex items-center justify-center bg-gray-200/85" :class="{ 'opacity-100': isExpanded }" @click.stop="handleClick">
        <span class="icon-[lucide--more-horizontal]" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="emit('edit', row.tid)">
            <span class="icon-[lucide--plus-circle] mr-2 opacity-0" />
            <span>查看任务详细</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span class="icon-[lucide--plus-circle] mr-2" />
            <span>添加子任务</span>
          </el-dropdown-item>
          <el-dropdown-item class="!text-red-500" @click="deleteTask(row)">
            <span class="icon-[lucide--trash] mr-2" />
            <span>删除</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
