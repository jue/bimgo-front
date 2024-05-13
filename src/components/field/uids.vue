<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  data: {
    type: Object,
    default: () => ({}),
  },
  cate: {
    type: String,
    default: 'task',
  },
  inline: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const { users } = storeToRefs(useSettingsStore())

const value = ref(props.modelValue)
watch(() => props.modelValue, (val) => {
  value.value = val
})

const apiUpdateUrl = computed(() => {
  if (props.cate === 'task')
    return '/task/update/uids'

  if (props.cate === 'issue')
    return '/issue/update/uids'
})

const isShow = ref(false)

async function handleChange() {
  return false
}

async function handleHide() {
  isShow.value = false
  if (props.data.gid)
    saveData()
  else
    emit('update:modelValue', value.value)
}

async function saveData() {
  const { data: res } = await http.post(apiUpdateUrl.value, {
    uids: value.value,
    gid: props.data.gid,
  })
  if (res.code === 200)
    emit('update:modelValue', value.value)
  else
    value.value = props.modelValue
}
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
    :pt="{
      trigger: {
        class: [
          'hidden',
          { ' !inline-flex': isShow && !inline, 'group-hover:inline-flex': !inline },
        ],
      },
    }"
    @show="isShow = true"
    @hide="handleHide"
    @change="handleChange"
  >
    <template #value="slotProps">
      <div
        v-if="slotProps.value && slotProps.value.length"
        class="px-4"
        :class="{
          '!-mx-3 !pr-0': inline,
        }"
      >
        <AvatarGroup>
          <UserAvatar v-for="uid in slotProps.value.slice(0, 5)" :key="uid" class="mr-2" :uid="uid" size="small" />
          <Avatar v-if="slotProps.value.length > 5" :label="`+${slotProps.value.length - 5}`" shape="circle" size="small" />
        </AvatarGroup>
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
