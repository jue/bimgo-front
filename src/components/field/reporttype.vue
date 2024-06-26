<script setup>
const props = defineProps({
  reporttype: {
    type: String,
    default: 'daily',
  },
})

const info = computed(() => {
  if (props.reporttype === 'daily') {
    return {
      type: 'primary',
      label: '日报',
    }
  }

  if (props.reporttype === 'weekly') {
    return {
      type: 'warning',
      label: '周报',
    }
  }

  if (props.reporttype === 'monthly') {
    return {
      type: 'danger',
      label: '月报',
    }
  }
})
</script>

<template>
  <el-tag :type="info?.type">
    {{ info?.label }}
  </el-tag>
</template>
