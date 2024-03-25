<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
})

const emit = defineEmits(['refresh'])

const visible = ref(false)

function visibleChange(params) {
  visible.value = params
}

function handleClick(type) {
  const text = type === 'archive' ? '归档' : '删除'
  ElMessageBox.confirm(`确定要${text}吗?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const { data: res } = await http.post('/issue/update/status', {
      status: type,
      iid: props.data.iid,
    })
    if (res.code === 200) {
      visible.value = false
      emit('refresh')
    }
  }).catch(() => {

  })
}
</script>

<template>
  <el-dropdown trigger="click" placement="bottom-start" @visible-change="visibleChange">
    <span class="w-8 hidden items-center justify-center group-hover:flex cursor-pointer" :class="{ '!flex': visible }">
      <Icon name="circle-chevron-down" size="16" class="text-gray-600" />
    </span>
    <template #dropdown>
      <el-dropdown-menu class="w-48">
        <el-dropdown-item @click="handleClick('archive')">
          <div class="flex items-center">
            <span class="icon-[lucide--archive] mr-2" />
            <span>归档</span>
          </div>
        </el-dropdown-item>
        <el-dropdown-item @click="handleClick('delete')">
          <div class="flex items-center text-red-500">
            <span class="icon-[lucide--trash] mr-2" />
            <span>删除</span>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
