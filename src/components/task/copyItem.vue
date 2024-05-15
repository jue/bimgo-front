<script setup>
const props = defineProps({
  task: {
    type: Object,
    default: () => {},
  },
  cate: {
    type: String,
    default: 'task',
  },
})
const { copy, copied } = useClipboard()

const url = computed(() => {
  if (props.cate === 'task')
    return `${location.origin}/task/detail?gid=${props.task.gid}`
  if (props.cate === 'issue')
    return `${location.origin}/issue/detail?gid=${props.task.gid}`
})
</script>

<template>
  <np-dropdown-item :label="copied ? '已复制' : '复制链接'" :icon="copied ? 'icon-[lucide--check]' : 'icon-[lucide--copy]'" :class="{ 'text-green-500': copied }" @click.stop="copy(url)" />
</template>
