<script setup>
const taskStore = useTaskStore()
const { payload } = storeToRefs(taskStore)

onMounted(async () => {
  await taskStore.getTasks()
})
</script>

<template>
  <div class="app-container bg-white border rounded-md">
    <div class="flex items-center justify-between h-12 shrink-0 px-5">
      <div class="text-lg font-semibold">
        工程进度
      </div>
      <div class="flex items-center space-x-2">
        <IconField icon-position="left">
          <InputIcon>
            <i class="icon-[lucide--search]" />
          </InputIcon>
          <InputText v-model="payload.key" placeholder="标题或描述" />
        </IconField>
        <Button label="树形" icon="icon-[lucide--list-tree]" outlined severity="secondary" />
        <GlobalCreate />
      </div>
    </div>

    <RouterView />
  </div>
</template>
