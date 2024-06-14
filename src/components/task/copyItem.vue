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
  <np-dropdown-item v-if="copied" label="已复制" icon="icon-[lucide--check]" class="!text-green-500" />
  <np-dropdown-item v-else label="复制链接" icon="icon-[lucide--copy]" @click="copy(url)" />
</template>
