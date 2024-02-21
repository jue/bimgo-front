<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  uid: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const { defaultUserGroup } = useSettingsStore()

const value = ref(props.modelValue)

async function selectGroup(val) {
  if (val !== value.value) {
    const { data: res } = await http.post('/user/info/update', { group: val, uid: props.uid })
    if (res.code === 200) {
      value.value = val
      emit('update:modelValue', value)
    }
  }
}
</script>

<template>
  <el-dropdown trigger="click">
    <slot />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in defaultUserGroup" :key="item.value" @click="selectGroup(item.value)">
          <div class="flex items-center justify-between w-full">
            <div class="flex-1">
              {{ item.label }}
            </div>
            <div v-if="item.value === value" class="icon-[lucide--check] text-xs text-blue-500" />
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
