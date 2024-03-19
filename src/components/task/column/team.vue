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
const { contractors, getContractorsLabel } = useSettingsStore()
const value = ref(props.modelValue)

async function changeValue(val) {
  const { data: res } = await http.post('/task/team/update', {
    tid: props.task.tid,
    contractor_id: val,
  })
  if (res.code === 200)
    emit('update:modelValue', val)

  else
    value.value = props.modelValue
}

watch(
  () => props.modelValue,
  (val) => {
    value.value = val
  },
)
</script>

<template>
  <pre>
    {{ contractors }}
  </pre>
  <el-dropdown trigger="click">
    <div>{{ getContractorsLabel(value)?.contractor_name || '待分配' }}</div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in contractors" :key="item.contractor_id" :disabled="value === item.contractor_id"
          @click="changeValue(item.contractor_id)"
        >
          <div class="flex items-center">
            <div>{{ item.contractor_name }}</div>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
