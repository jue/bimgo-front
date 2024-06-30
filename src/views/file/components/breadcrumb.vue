<script setup>
const props = defineProps({
  dirId: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:dirId'])
const route = useRoute()
const router = useRouter()
const dataList = ref([])

const value = ref(props.dirId)

async function getDataList() {
  dataList.value = [{ dir_id: '', dir_name: '全部文件' }]
  if (!value.value)
    return false

  const { data: res } = await http.post('/uffile/folder/up', {
    dir_id: value.value || '',
  })
  if (res.code === 200)
    dataList.value.push(...res.data)
}

function setDirID(id) {
  value.value = id
  emit('update:dirId', id)
  getDataList()
}

onMounted(() => {
  getDataList()
})

// 监听路由
watch(() => props.dirId, () => {
  value.value = props.dirId
  getDataList()
})
</script>

<template>
  <div class="flex items-center h-10 shrink-0">
    <el-button v-if="dataList.length > 1" link type="primary" class="text-xs" @click="setDirID('')">
      返回上一级
    </el-button>
    <el-divider v-if="dataList.length > 1" direction="vertical" />
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in dataList" :key="item.dir_id" class="text-xs">
        <span :class="{ 'font-medium text-zinc-800': dataList.length === 1, 'text-emerald-500': index <= dataList.length - 2 }" class="cursor-pointer" @click="setDirID(item.dir_id)">{{ item.dir_name }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
