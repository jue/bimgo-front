<script setup>
const taskStore = useTaskStore()
const { payload } = storeToRefs(taskStore)

onMounted(async () => {
  await taskStore.getTasks()
})
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="flex items-center justify-between h-12 shrink-0 px-5">
      <div class="flex items-center h-11 shrink-0">
        <div class="space-x-5">
          <Button icon="icon-[lucide--plus]" />
          <Button icon="icon-[lucide--plus]" size="small" />
          <Button icon="icon-[lucide--plus]" size="small" label="默认按钮" plain />
          <Button icon="icon-[lucide--plus]" size="large" severity="danger" />
        </div>
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
        <GlobalUserAvatar class="mr-2" />
      </div>
    </div>

    <RouterView />
  </div>
</template>
