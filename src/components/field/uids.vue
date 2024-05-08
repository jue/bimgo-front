<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const { users } = storeToRefs(useSettingsStore())

const value = ref(props.modelValue)
watch(() => props.modelValue, (val) => {
  value.value = val
})

const isShow = ref(false)
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
    class="w-full"
    @show="isShow = true"
    @hide="isShow = false"
  >
    <template #value="slotProps">
      <div v-if="slotProps.value && slotProps.value.length" class="px-4">
        <AvatarGroup v-if="slotProps.value.length > 2" size="small">
          <UserAvatar v-for="uid in slotProps.value.slice(0, 5)" :key="uid" class="mr-2" :uid="uid" />
          <Avatar v-if="slotProps.value.length > 5" :label="`+${slotProps.value.length - 5}`" shape="circle" size="small" />
        </AvatarGroup>
        <div v-else class="-mx-4 space-x-1">
          <User v-for="uid in slotProps.value" :key="uid" :uid="uid" />
        </div>
      </div>
      <span v-else class="flex items-center">
        <Avatar icon="icon-[lucide--user]" class="mr-2" shape="circle" size="small" />{{ slotProps.placeholder }}
      </span>
    </template>

    <template #option="scope">
      <div class="flex items-center">
        <User :uid="scope.option.uid" />
      </div>
    </template>
    <template #footer>
      <div class="py-2 px-3">
        已选择 <b>{{ value ? value.length : 0 }}</b> 位用户
      </div>
    </template>
  </MultiSelect>
</template>
