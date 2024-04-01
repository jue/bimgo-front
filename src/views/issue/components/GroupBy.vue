<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['update:modelValue'])

const { issue_columns } = storeToRefs(useUserStore())
const columnsConfig = objectToArray(issue_columns.value)
const show = ref(false)
</script>

<template>
  <el-dropdown trigger="click" @visible-change="(v) => (show = v)">
    <np-button
      icon="gallery-vertical-end" text class="bg-none hover:text-blue-500"
      :class="{ 'text-blue-500': modelValue }"
    >
      <span>分组</span>
    </np-button>
    <template #dropdown>
      <el-dropdown-menu class="w-48">
        <el-dropdown-item @click="emit('update:modelValue', '')">
          <div class="flex items-center w-full">
            <div class="mr-2 flex items-center justify-center w-4">
              <span v-if="modelValue === ''" class="icon-[lucide--check]" />
            </div>
            <span>无</span>
          </div>
        </el-dropdown-item>
        <el-dropdown-item
          v-for="column in columnsConfig" :key="column.value"
          @click="emit('update:modelValue', column.value)"
        >
          <div class="flex items-center w-full">
            <div class="mr-2 flex items-center justify-center w-4">
              <span v-if="modelValue === column.value" class="icon-[lucide--check]" />
            </div>
            <span>{{ column.label }}</span>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
