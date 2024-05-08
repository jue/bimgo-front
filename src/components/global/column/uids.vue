<script setup>
import Avatar from 'primevue/avatar'
import AvatarGroup from 'primevue/avatargroup'

const { users } = storeToRefs(useSettingsStore())
const value = defineModel()

const isShow = ref(false)
</script>

<template>
  <MultiSelect
    v-model="value" :options="users" filter option-label="realname" option-value="uid" placeholder="未指定" display="comma" variant="filled" filter-placeholder="搜索用户"
    :class="{ '!bg-gray-100': isShow }"
    class="w-full flex items-center bg-transparent !ring-0 !shadow-none hover:bg-gray-100"
    highlight-on-select
    @show="isShow = true"
    @hide="isShow = false"
  >
    <!-- <template #dropdownicon="scope">
      <span class="icon-[lucide--chevron-down]" />
    </template> -->
    <template #value="slotProps">
      <div v-if="slotProps.value && slotProps.value.length" class="px-4">
        <AvatarGroup size="small">
          <UserAvatar v-for="uid in slotProps.value.slice(0, 5)" :key="uid" class="mr-2" :uid="uid" />
          <Avatar v-if="slotProps.value.length > 5" :label="`+${slotProps.value.length - 5}`" shape="circle" />
        </AvatarGroup>
      </div>
      <span v-else class="flex items-center">
        <Avatar icon="icon-[lucide--user]" class="mr-2" shape="circle" />{{ slotProps.placeholder }}
      </span>
    </template>

    <template #option="scope">
      <div class="flex items-center">
        <UserAvatar class="mr-2 !w-6 !h-6" :uid="scope.option.uid" />
        {{ scope.option.realname }}
      </div>
    </template>
    <template #footer>
      <div class="py-2 px-3">
        已选择 <b>{{ value ? value.length : 0 }}</b> 位用户
      </div>
    </template>
  </MultiSelect>
</template>
