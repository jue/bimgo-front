<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  task: {
    type: Object,
    default: () => ({}),
  },
})
const emit = defineEmits(['update:modelValue'])
const settingsStore = useSettingsStore()
const { getContractorsLabel } = useSettingsStore()
const { contractors } = storeToRefs(settingsStore)

const loading = ref(false)

const value = ref(props.modelValue)
const contractorsAddRef = ref(null)
const contractorsRef = ref(null)

async function changeValue(val) {
  loading.value = true
  contractorsRef.value?.handleClose()
  const { data: res } = await http.post('/task/team/update', {
    tid: props.task.tid,
    contractor_id: val,
  })
  if (res.code === 200)
    emit('update:modelValue', val)

  else
    value.value = props.modelValue

  setTimeout(() => {
    loading.value = false
  }, 800)
}

watch(
  () => props.modelValue,
  (val) => {
    value.value = val
  },
)

async function handleClear() {
  const { data: res } = await http.post('/task/team/clear', {
    tid: props.task.tid,
  })
  if (res.code === 200) {
    value.value = null
    emit('update:modelValue', null)
  }
}
</script>

<template>
  <!-- <pre>
    {{ contractors }}
  </pre> -->
  <el-dropdown ref="contractorsRef" trigger="click" :hide-on-click="false">
    <div v-if="value" class="relative group">
      <div
        class="absolute z-10 right-0 top-0 h-4 w-4 hidden group-hover:flex items-center justify-center rounded-full bg-[#bfbfbf] translate-x-1 -translate-y-1 hover:!bg-blue-600 close"
        @click.stop="handleClear"
      >
        <span class="text-xs text-white icon-[lucide--x]" />
      </div>
      <div class="w-full relative z-0 group-hover:bg-gray-100 text rounded-lg overflow-hidden p-[1px]">
        <div class="flex items-center space-x-1">
          <AvatarTeam :contractor_id="value" /> <span class="shrink-0">{{ getContractorsLabel(value)?.contractor_name
            || '' }}</span>
          <span v-if="loading" class="icon-[lucide--loader] animate-spin text-blue-400" />
        </div>
      </div>
    </div>
    <div v-else>
      待分配
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in contractors" :key="item.contractor_id" :disabled="value === item.contractor_id"
          @click="changeValue(item.contractor_id)"
        >
          <div class="flex items-center space-x-1">
            <AvatarTeam :contractor_id="item.contractor_id" :size="24" />
            <div>{{ item.contractor_name }}</div>
          </div>
        </el-dropdown-item>
        <el-dropdown-item divided class="focus:bg-transparent" @click="contractorsAddRef.open()">
          <el-button link type="primary">
            <div class="flex items-center space-x-1">
              <span class="icon-[lucide--user-plus]" />
              <span>创建团队</span>
            </div>
          </el-button>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <ContractorsAdd ref="contractorsAddRef" @refresh="contractorsRef.handleOpen()" />
</template>

<style scoped lang="scss">
.close:hover {
  &~.text {
    @apply ring-1 ring-blue-600;
  }
}
</style>
