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
const inputRef = ref(null)

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

// 打开选择框
function handleShow() {
  isShow.value = true
  value.value = props.modelValue
}

async function handleChange() {
  return false
}

async function handleSave() {
  inputRef.value.hide()
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
  if (res.code === 200) {
    emit('update:modelValue', value.value)
    const { getLogs } = useLogsStore()
    getLogs(props.data.gid, props.cate)
  }
  else { value.value = props.modelValue }
}

// 取消选择
function handleCancel() {
  inputRef.value.hide()
  isShow.value = false
  value.value = props.modelValue
}
</script>

<template>
  <MultiSelect
    ref="inputRef"
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
    @show="handleShow"
    @hide="handleHide"
    @change="handleChange"
  >
    <template #value="slotProps">
      <div
        v-if="modelValue.length > 0"
        class="px-4 flex items-center"
        :class="{
          '!-mx-2 !pr-0': inline,
        }"
      >
        <AvatarGroup>
          <UserAvatar v-for="uid in modelValue.slice(0, 5)" :key="uid" class="mr-2 last:mr-0" :uid="uid" />
          <Avatar v-if="modelValue.length > 5" :label="`+${modelValue.length - 5}`" shape="circle" size="small" />
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
    <template #footer>
      <div class="flex items-center justify-between p-2 px-3 space-x-2">
        <Button label="取消" class="w-24" outlined @click="handleCancel" />
        <Button label="确定" class="w-24" @click="handleSave" />
      </div>
    </template>
  </MultiSelect>
</template>
