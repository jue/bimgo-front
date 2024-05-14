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

const value = ref(props.modelValue)
watch(() => props.modelValue, (val) => {
  value.value = val
})

const apiUpdateUrl = computed(() => {
  if (props.cate === 'task')
    return '/task/update/status'

  if (props.cate === 'issue')
    return '/issue/update/status'
})

const { task_columns, issue_columns_v2 } = storeToRefs(useUserStore())
const optionList = computed(() => {
  if (props.cate === 'issue')
    return issue_columns_v2.value.find(item => item.value === 'status')?.options
  else
    return task_columns.value.find(item => item.value === 'status')?.options
})

const itemValue = computed(() => {
  return optionList.value.find(item => item.value === value.value)
})

const isShow = ref(false)

const loading = ref(false)
function handleChange() {
  isShow.value = false

  if (props.data.gid)
    saveData()
  else
    emit('update:modelValue', value.value)
}

async function saveData() {
  loading.value = true
  const { data: res } = await http.post(apiUpdateUrl.value, {
    status: value.value,
    gid: props.data.gid,
  })
  if (res.code === 200)
    emit('update:modelValue', value.value)
  else
    value.value = props.modelValue

  loading.value = false
}
</script>

<template>
  <Dropdown
    v-model="value"
    :options="optionList"
    option-value="value"
    option-label="label"
    placeholder="未指定"
    class="w-full group"
    input-class="flex items-center"
    :pt="{
      trigger: {
        class: [
          'hidden',
          { ' !inline-flex': isShow && !inline, 'group-hover:inline-flex': !inline },
        ],
      },
    }"
    :loading="loading"
    @show="isShow = true"
    @hide="isShow = false"
    @change="handleChange"
  >
    <template #value="scope">
      <!-- <div>{{ scope.value }}</div> -->
      <div
        class="text-xs h-6 flex items-center px-2 rounded"
        :class="{ ' -mx-2': inline }"
        :style="{ borderColor: `${itemValue?.color}`, backgroundColor: `${itemValue?.color}20`, color: `${itemValue?.color}` }"
      >
        {{ itemValue?.label }}
      </div>
    </template>
    <template #option="scope">
      <div class="flex space-x-2 w-full">
        <div class="w-4 h-4 flex items-center justify-center">
          <span v-if="value === scope.option.value" class="icon-[lucide--check]" />
        </div>
        <div
          class="w-3.5 h-3.5 rounded-full border-2"
          :style="{ borderColor: `${scope.option?.color}`, backgroundColor: `${scope.option?.color}10` }"
        />
        <div class="leading-none space-y-1 flex-1">
          <div>{{ scope.option.label }}</div>
          <div class="text-xs text-gray-400">
            {{ scope.option.desc }}
          </div>
        </div>
      </div>
    </template>
  </Dropdown>
</template>
