<script setup>
const visible = ref(false)
const route = useRoute()
function open() {
  visible.value = true
}

const type = computed(() => {
  return route.fullPath.startsWith('/task') ? 'task' : 'issue'
})
</script>

<template>
  <div class="flex items-center">
    <Button label="创建任务" icon="icon-[lucide--plus]" @click="open" />
    <Dialog v-model:visible="visible" modal maximizable class="!w-11/12 !max-w-[1360px] !p-0 !top-auto min-h-[500px]" dismissable-mask>
      <template #container="{ closeCallback }">
        <div class="bg-white rounded-lg">
          <GlobalView action="create" :type="type" @close="closeCallback" />
        </div>
      </template>
    </Dialog>
  </div>
</template>
