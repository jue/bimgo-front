<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const { defaultUserGroup } = useSettingsStore()

const value = ref(props.modelValue)

function onChange() {
  emit('update:modelValue', value.value)
}
</script>

<template>
  <!-- <div class="group w-full"> -->
  <el-select v-model="value" placeholder="请选择" @change="onChange">
    <el-option v-for="item in defaultUserGroup" :key="item.value" :label="item.label" :value="item.value">
      <div class="py-2">
        <div>{{ item.label }}</div>
        <div class="text-xs">
          {{ item.description }}
        </div>
      </div>
    </el-option>
    <template #footer>
      <el-link href="#" target="_blank" :underline="false">
        <span class="icon-[lucide--external-link] mr-1" />  查看所有权限
      </el-link>
    </template>
  </el-select>
  <!-- </div> -->
</template>

<style scoped lang="scss">
.el-select-dropdown__item {
  @apply h-auto leading-7;
  .text-xs {
    @apply text-gray-400/80;
  }
  &.is-selected {
    .text-xs {
      @apply text-blue-500;
    }
  }
}
</style>
