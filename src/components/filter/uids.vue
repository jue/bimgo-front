<script setup>
const props = defineProps({
  cate: {
    type: String,
    default: 'task',
  },
})

const { users } = storeToRefs(useSettingsStore())

const value = defineModel()
</script>

<template>
  <MultiSelect
    v-model="value"
    :options="users"
    filter
    option-label="realname"
    option-value="uid"
    placeholder="未指定"
    display="comma"
    variant="filled"
    filter-placeholder="搜索用户"
    highlight-on-select
    class="w-full items-center group"
  >
    <template #value="slotProps">
      <div
        v-if="value?.length > 0"
        class="px-4 flex items-center"
      >
        <AvatarGroup>
          <UserAvatar v-for="uid in value.slice(0, 5)" :key="uid" class="mr-2 last:mr-0" :uid="uid" />
          <Avatar v-if="value.length > 5" :label="`+${value.length - 5}`" shape="circle" size="small" />
        </AvatarGroup>
      </div>
      <span
        v-else
        class="flex items-center space-x-1"
        :class="{
          '!-mx-2 !pr-0': inline,
        }"
      >
        <Avatar icon="icon-[lucide--user]" shape="circle" size="small" />
        <span v-if="!inline">{{ slotProps.placeholder }}</span>
      </span>
    </template>

    <template #option="scope">
      <div class="flex items-center">
        <User :uid="scope.option.uid" />
      </div>
    </template>
  </MultiSelect>
</template>
