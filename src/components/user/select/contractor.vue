<script setup>
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  contractors: {
    type: Array,
    default: () => [],
  },
  uid: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])
const value = ref(props.modelValue)

async function selectContractor(val) {
  const existingIndex = value.value.findIndex(item => item.contractor_id === val)

  const { data: res } = await http.post('/user/contractor/update', { contractor_id: val, uid: props.uid })
  if (res.code === 200) {
    if (existingIndex !== -1) {
      value.value.splice(existingIndex, 1)
    }
    else {
      value.value.push({
        uid: props.uid,
        contractor_id: val,
        is_leader: 0,
      })
    }

    // value.value = val
    emit('update:modelValue', value)
  }
}
</script>

<template>
  <el-dropdown trigger="click">
    <slot />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in contractors" :key="item.contractor_id" @click="selectContractor(item.contractor_id)">
          <div class="flex items-center justify-between w-full space-x-4">
            <div class="flex-1">
              {{ item.contractor_name }}
            </div>
            <div v-if="value.some(vItem => vItem.contractor_id === item.contractor_id)" class="icon-[lucide--check] text-xs text-blue-500" />
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
