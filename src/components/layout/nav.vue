<script setup>
const { changeSideCollapsed } = useSettingsStore()
const { sideCollapsed } = storeToRefs(useSettingsStore())

const route = useRoute()
</script>

<template>
  <div class="h-14 flex items-center justify-between px-4 bg-white box-shadow-bottom">
    <div class="flex items-center space-x-4">
      <Button v-if="sideCollapsed" v-tooltip="'展开侧边栏'" plain text class="ring-0" @click="changeSideCollapsed()">
        <span class="icon-[lucide--menu] text-xl" />
      </Button>

      <!-- <div v-if="route.meta?.title" class="text-xl font-medium">
        {{ route.meta?.title }}
      </div> -->
    </div>

    <div class="flex items-center space-x-4">
      <!-- <SplitButton
        label="创建事项"
        :model="items"
        class="shrink-0"
        :pt="{
          button: {
            root: {
              class: ['!border-b-4 border-green-600 !ring-0 !rounded-none !rounded-l-md px-3'],
            },
          },
          menubutton: {
            root: {
              class: ['!border-b-4 border-green-600 !ring-0 !rounded-none !rounded-r-md px-3 border-l'],
            },
          },
        }"
        @click="save"
      /> -->
      <UserMenu />
    </div>
  </div>
</template>
